"""Verify public scoring, adjacent types, and product disclosure on next start.

Run: python3 scripts/verify-content-readiness.py --port 3118
"""
import argparse
import http.client
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


class Document(HTMLParser):
    def __init__(self, body):
        super().__init__()
        self.links, self.text, self.hidden = [], [], 0
        self.feed(body)

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.hidden += 1
        if tag == 'a':
            self.links.append(dict(attrs))

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.hidden -= 1

    def handle_data(self, data):
        if not self.hidden:
            self.text.append(data)


parser = argparse.ArgumentParser()
parser.add_argument('--port', type=int, default=3118)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
products = json.loads((root / 'features/skin-type/data/skin-products.json').read_text())
evidence = json.loads((root / 'features/skin-type/data/product-evidence.json').read_text())
dimensions = json.loads((root / 'features/skin-type/data/questions.json').read_text())['dimensions']
active = [p for p in products if p['active']]
assert set(evidence) == {p['id'] for p in active}
assert len([p for p in active if urlsplit(p['oliveYoungUrl']).hostname == 'oy.run']) == 15


def get(host, path):
    connection = http.client.HTTPConnection('127.0.0.1', args.port, timeout=15)
    connection.request('GET', path, headers={'Host': host})
    response = connection.getresponse()
    assert response.status == 200, (host, path, response.status)
    document = Document(response.read().decode())
    connection.close()
    return document, ''.join(document.text)


types = [a+b+c+d for a in 'DO' for b in 'SR' for c in 'PN' for d in 'WT']
for host in ['ilina.kr', 'skin.ilina.kr']:
    _, text = get(host, '/about')
    for dimension in dimensions:
        minimum = sum(min(c['score'] for c in q['choices']) for q in dimension['questions'])
        maximum = sum(max(c['score'] for c in q['choices']) for q in dimension['questions'])
        assert f'{minimum}~{maximum}' in text
        reachable = {0}
        for question in dimension['questions']:
            assert question['text'] in text
            reachable = {s+c['score'] for s in reachable for c in question['choices']}
        for score in reachable:
            assert len([t for t in dimension['thresholds'] if t['min'] <= score <= t['max']]) == 1
    for code in types:
        document, text = get(host, '/skin-type/'+code.lower())
        for index, dimension in enumerate(dimensions):
            other = next(t['result'] for t in dimension['thresholds'] if t['result'] != code[index])
            neighbor = code[:index]+other+code[index+1:]
            assert any(a.get('href') == '/skin-type/'+neighbor.lower() for a in document.links)
        document, text = get(host, '/skin-type/'+code.lower()+'/products')
        assert '구매가 발생할 경우 일정액의 수수료' in text
        mapped = [p for p in active if any(r['skinType'] == code for r in p['recommendations'])]
        expected = {p['oliveYoungUrl'] for p in mapped if evidence[p['id']]['purchaseReady']}
        actual = {a['href'] for a in document.links if urlsplit(a.get('href', '')).hostname == 'oy.run'}
        assert actual == expected, (host, code, actual ^ expected)
        for p in mapped:
            assert evidence[p['id']]['basis'] in text
            assert evidence[p['id']]['caution'] in text
            if not evidence[p['id']]['purchaseReady']:
                assert all(a.get('href') != p['oliveYoungUrl'] for a in document.links)
        for link in document.links:
            if urlsplit(link.get('href', '')).hostname == 'oy.run':
                assert {'sponsored', 'noopener', 'noreferrer'} <= set(link.get('rel', '').split())
    print(f'PASS {host}: all 33 questions/ranges, reachable scores, 16 adjacent-type sets, 16 product pages/evidence/disclosures/affiliate links.')

_, text = get('ilina.kr', '/guides/how-to-use-results')
assert '7~10일' in text and '턱선이나 귀 뒤쪽' not in text
print('PASS evidence for all 17 active products, 15 curator links, two held purchase links, sourced product testing guidance.')
