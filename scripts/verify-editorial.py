"""Check the published shape of the editorial hub against a local next start."""
import argparse
import http.client
import json
import re
from pathlib import Path
from html import unescape

parser = argparse.ArgumentParser()
parser.add_argument('--port', type=int, default=3118)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
articles = json.loads((root / 'features/skin-content/articles.json').read_text())
slugs = {a['slug'] for a in articles}
assert len(slugs) == len(articles)


def get(host, path):
    conn = http.client.HTTPConnection('127.0.0.1', args.port, timeout=15)
    conn.request('GET', path, headers={'Host': host})
    response = conn.getresponse()
    body = response.read().decode()
    conn.close()
    assert response.status == 200, (host, path, response.status)
    return body


home = get('ilina.kr', '/')
assert '다음 선택을 차분하게' in home
assert 'href="/survey"' in home
assert 'href="/about#scoring"' in home
for article in articles:
    assert f'href="/learn/{article["slug"]}"' in home
    sources = {s['id']: s for s in article['sources']}
    ids = {s['id'] for s in article['sections']}
    assert len(ids) == len(article['sections'])
    assert set(article['related']) <= slugs
    for section in article['sections']:
        assert set(section['sourceIds']) <= sources.keys()
        if 'table' in section:
            assert all(len(row) == len(section['table']['columns']) for row in section['table']['rows'])
    for host in ['ilina.kr', 'skin.ilina.kr']:
        body = get(host, '/learn/'+article['slug'])
        assert len(re.findall(r'<h1\b', body)) == 1
        assert len(re.findall(r'<main\b', body)) == 1
        assert f'https://ilina.kr/learn/{article["slug"]}' in body
        assert 'noindex' not in body.split('</head>')[0]
        assert 'oy.run' not in body
        scripts = re.findall(r'<script type="application/ld\+json">(.*?)</script>', body)
        assert len(scripts) == 1
        schema = json.loads(scripts[0])
        assert schema['headline'] == article['title']
        assert schema['author']['name'] == 'ILINA'
        assert schema['dateModified'] == article['updatedAt']
        for section in article['sections']:
            assert f'id="{section["id"]}"' in body
            for paragraph in section['paragraphs']:
                assert paragraph in unescape(body)
        for source in article['sources']:
            assert source['url'] in unescape(body)
print(f'PASS editorial home, {len(articles)} articles on both hosts: source references, tables, original paragraphs in initial HTML, canonical, Article schema, no affiliate links, reading links.')
