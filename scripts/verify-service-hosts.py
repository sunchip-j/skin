"""Production Host/SEO/content regression checks (stdlib only).

Run against next start, not next dev. Optional --record-before / --before
captures and compares visible skin HTML and non-service Host behavior.
"""
import argparse
import http.client
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self, body):
        super().__init__()
        self.links, self.ids, self.canonicals, self.meta = [], set(), [], {}
        self.feed(body)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'):
            self.ids.add(a['id'])
        if tag == 'a' and a.get('href'):
            self.links.append(a['href'])
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonicals.append(a.get('href'))
        if tag == 'meta':
            self.meta[a.get('name') or a.get('property')] = a.get('content')


args_parser = argparse.ArgumentParser()
args_parser.add_argument('--port', type=int, default=3108)
args_parser.add_argument('--record-before', type=Path)
args_parser.add_argument('--before', type=Path)
args = args_parser.parse_args()
types = [a+b+c+d for a in 'do' for b in 'sr' for c in 'pn' for d in 'wt']
service = ['/', '/guide'] + [f'/skin-type/{t}' for t in types] + [f'/skin-type/{t}/products' for t in types]
editorial = ['/company', '/about', '/privacy', '/guides/four-dimensions', '/guides/how-to-use-results', '/story/why-we-built-skin-type']
functional = ['/survey', '/result', '/play/skin-type', '/play/skin-type/survey', '/play/skin-type/products']
cache = {}


def get(host, path):
    key = host, path
    if key not in cache:
        connection = http.client.HTTPConnection('127.0.0.1', args.port, timeout=15)
        connection.request('GET', path, headers={'Host': host})
        response = connection.getresponse()
        cache[key] = response.status, dict(response.getheaders()), response.read().decode()
        connection.close()
    return cache[key]


def body_html(body):
    body = re.sub(r'<head\b[^>]*>.*?</head>', '', body, flags=re.S)
    body = re.sub(r'<script\b[^>]*>.*?</script>', '', body, flags=re.S)
    body = re.sub(r'<(?:meta|link)\b[^>]*>', '', body)
    # React useId identifiers are render-tree details, not visible UI.
    return re.sub(r'«[^»]*»', 'REACT_ID', body)


paths = service + editorial + functional + ['/robots.txt', '/sitemap.xml', '/missing-page', '/ilina-home', '/ads.txt']
snapshot = {}
for host in ['skin.ilina.kr', 'memorina.ilina.kr']:
    for path in paths:
        status, headers, body = get(host, path)
        snapshot[host+path] = dict(status=status, location=headers.get('location'), body=body_html(body))
if args.record_before:
    args.record_before.write_text(json.dumps(snapshot, ensure_ascii=False))
    print(f'Recorded {len(snapshot)} pre-change body/status/redirect responses.')
    raise SystemExit()
if args.before:
    before = json.loads(args.before.read_text())
    for key in before:
        # Search metadata intentionally changes. Body/design/redirects do not.
        if key.endswith('/sitemap.xml') or key.endswith('/robots.txt'):
            continue
        expected = {**before[key], 'body': body_html(before[key]['body'])}
        assert snapshot[key] == expected, f'Visible/behavior regression: {key}'
    print('PASS skin and other Host rendered body/status/redirect regression (SEO changes excluded).')

for host in ['ilina.kr', 'skin.ilina.kr']:
    for path in service + ['/play/skin-type']:
        status, headers, body = get(host, path)
        assert status == 200, (host, path, status)
        page = Page(body)
        canonical = 'https://ilina.kr' + ('' if path in ['/', '/play/skin-type'] else path)
        assert [c.rstrip('/') for c in page.canonicals] == [canonical], (host, path, page.canonicals)
        assert page.meta.get('og:url', '').rstrip('/') == canonical, (host, path, page.meta.get('og:url'))
        assert 'rel="canonical"' not in headers.get('link', ''), (host, path, 'conflicting HTTP canonical')
        assert 'noindex' not in page.meta.get('robots', ''), (host, path)
    for path in ['/survey', '/result', '/play/skin-type/products']:
        status, _, body = get(host, path)
        assert status == 200 and 'noindex' in Page(body).meta.get('robots', ''), (host, path)
    for path in ['/missing-page', '/skin-type/invalid', '/skin-type/invalid/products']:
        status, _, body = get(host, path)
        assert status == 404 and 'noindex' in Page(body).meta.get('robots', ''), (host, path, status)
    status, headers, _ = get(host, '/play/skin-type/survey?source=test')
    assert status == 307 and headers.get('location') == '/survey', (host, headers)
    _, _, robots = get(host, '/robots.txt')
    assert f'Sitemap: https://{host}/sitemap.xml' in robots
    assert 'Disallow: /survey' not in robots
    _, _, sitemap = get(host, '/sitemap.xml')
    urls = [element.text for element in ET.fromstring(sitemap).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    expected = {'https://ilina.kr'+('' if p == '/' else p) for p in service+editorial} if host == 'ilina.kr' else {'https://skin.ilina.kr/about', 'https://skin.ilina.kr/privacy'}
    assert {url.rstrip('/') for url in urls} == expected, (host, urls)
    for url in urls:
        status, _, body = get(host, urlsplit(url).path or '/')
        assert status == 200 and [c.rstrip('/') for c in Page(body).canonicals] == [url.rstrip('/')], url
    print(f'PASS {host}: shared canonical/OG, noindex, 404, redirects, robots and {len(urls)} self-canonical sitemap URLs.')

for path in editorial:
    status, _, body = get('ilina.kr', path)
    assert status == 200 and Page(body).canonicals == ['https://ilina.kr'+path], path
    assert Page(body).meta.get('og:url') == 'https://ilina.kr'+path, path

# Crawl the actual public navigation, including fragment targets. Do not rely
# on the sitemap alone to claim users can discover the service/content.
queue, visited = ['/'], set()
while queue:
    path = queue.pop(0)
    if path in visited:
        continue
    visited.add(path)
    status, _, body = get('ilina.kr', path)
    assert status == 200, ('broken navigation', path, status)
    page = Page(body)
    for href in page.links:
        url = urlsplit(href)
        if url.scheme or url.netloc or not href.startswith('/'):
            continue
        target = url.path or '/'
        target_status, _, target_body = get('ilina.kr', target)
        assert target_status in [200, 307, 308], ('broken link', path, href, target_status)
        if url.fragment:
            assert url.fragment in Page(target_body).ids, ('broken fragment', path, href)
        if target_status == 200 and target not in visited:
            queue.append(target)
assert set(service+editorial+['/survey', '/play/skin-type']) <= visited, sorted(set(service+editorial)-visited)
assert 'id="method"' in get('ilina.kr', '/about')[2]
assert 'id="recommendations"' in get('ilina.kr', '/about')[2]
assert '<details' in get('ilina.kr', '/privacy')[2]
assert get('ilina.kr', '/ads.txt')[2] == get('skin.ilina.kr', '/ads.txt')[2]
for host, path, location in [
    ('www.ilina.kr', '/result?source=test', 'https://ilina.kr/result?source=test'),
    ('ilina.kr', '/ilina-home?source=test', 'https://ilina.kr/company?source=test'),
    ('ilina.kr', '/service-entry/guide?source=test', 'https://ilina.kr/guide?source=test'),
]:
    status, headers, _ = get(host, path)
    assert status == 308 and headers.get('location') == location, (host, path, headers)
print(f'PASS root navigation: {len(visited)} reachable public pages, internal links/fragments, preserved policy, ads.txt, www/internal redirects.')
