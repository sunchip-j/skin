/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node CommonJS verification tool. */
// Local: next start on 3108, isolated Chrome CDP on 9338 with Host resolver.
// Production: --production, isolated Chrome CDP on 9339 without Host resolver.
// --record-seo records production SEO before deployment without running flows.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const WebSocket = require('next/dist/compiled/ws');
const { dimensions } = require('../features/skin-type/data/questions.json');
const codes = Object.keys(require('../features/skin-type/data/results.json').results);
const production = process.argv.includes('--production');
const recordSeo = process.argv.includes('--record-seo');
const seoFile = '/private/tmp/ilina-products-return-seo-before.json';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function connect(url) {
  const socket = new WebSocket(url);
  await new Promise((resolve, reject) => { socket.once('open', resolve); socket.once('error', reject); });
  let nextId = 0;
  const pending = new Map();
  socket.on('message', data => {
    const message = JSON.parse(data);
    if (!message.id) return;
    const promise = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) promise.reject(Error(JSON.stringify(message.error)));
    else promise.resolve(message.result);
  });
  return {
    call(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = ++nextId;
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    close() { socket.close(); },
  };
}

(async () => {
  const version = await (await fetch(`http://127.0.0.1:${production ? 9339 : 9338}/json/version`)).json();
  const browser = await connect(version.webSocketDebuggerUrl);
  const { browserContextId } = await browser.call('Target.createBrowserContext');
  const seo = {};
  try {
    for (const host of ['ilina.kr', 'skin.ilina.kr']) {
      const origin = production ? `https://${host}` : `http://${host}:3108`;
      const { targetId } = await browser.call('Target.createTarget', { url: 'about:blank', browserContextId });
      const targets = await (await fetch(`http://127.0.0.1:${production ? 9339 : 9338}/json`)).json();
      const page = await connect(targets.find(target => target.id === targetId).webSocketDebuggerUrl);
      const evaluate = async expression => {
        const result = await page.call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
        assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
        return result.result.value;
      };
      const until = async expression => {
        for (let retry = 0; retry < 200; retry++) {
          if (await evaluate(expression)) return;
          await delay(100);
        }
        throw Error(`Timed out (${host}): ${expression}`);
      };
      const navigate = async path => {
        await page.call('Page.navigate', { url: origin + path });
        await until(`location.href === ${JSON.stringify(origin + path)} && document.readyState === 'complete'`);
      };
      const clickReturn = async path => {
        await until(`!![...document.querySelectorAll('button')].find(b => b.textContent.includes('결과로 돌아가기'))`);
        await delay(150); // Wait for hydration before the first interaction.
        await evaluate(`[...document.querySelectorAll('button')].find(b => b.textContent.includes('결과로 돌아가기')).click()`);
        await until(`location.origin === ${JSON.stringify(origin)} && location.pathname === ${JSON.stringify(path)}`);
        assert.notEqual(await evaluate('location.href'), 'about:blank');
      };
      await page.call('Page.enable');
      await navigate('/');
      const seoPaths = ['/', '/guide', '/about', '/privacy', '/robots.txt', '/sitemap.xml', ...codes.flatMap(code => [`/skin-type/${code.toLowerCase()}`, `/skin-type/${code.toLowerCase()}/products`])];
      for (const path of seoPaths) {
        seo[host + path] = await evaluate(`(async () => {
          const response = await fetch(${JSON.stringify(path)}, {cache: 'no-store'});
          const body = await response.text();
          const doc = new DOMParser().parseFromString(body, 'text/html');
          return { status: response.status,
            canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
            robots: doc.querySelector('meta[name="robots"]')?.getAttribute('content') ?? null,
            og: doc.querySelector('meta[property="og:url"]')?.getAttribute('content') ?? null,
            text: ${JSON.stringify(path.endsWith('.txt') || path.endsWith('.xml'))} ? body : null };
        })()`);
        assert.equal(seo[host + path].status, 200, host + path);
      }
      if (!recordSeo) {
        for (const code of codes) {
          // Fresh about:blank target reproduces the original failure's history.
          // No session result exists, regardless of the page's prior history.
          await navigate('/');
          await evaluate('sessionStorage.clear()');
          await page.call('Page.navigate', { url: 'about:blank' });
          await until('location.href === "about:blank"');
          await navigate(`/skin-type/${code.toLowerCase()}/products`);
          await clickReturn(`/skin-type/${code.toLowerCase()}`);
          await until(`document.querySelector('h1')?.textContent.includes(${JSON.stringify(code)})`);
        }
        console.log(`PASS ${host}: all 16 public products return to matching type; no about:blank escape.`);

        // Real 33-question flow, not a seeded result.
        await navigate('/');
        await evaluate('sessionStorage.clear()');
        await evaluate(`document.querySelector('a[href="/survey"]').click()`);
        for (let question = 1; question <= 33; question++) {
          await until(`document.body.innerText.includes(${JSON.stringify(question + ' / 33')})`);
          await evaluate('document.querySelector("section button").click()');
        }
        await evaluate(`[...document.querySelectorAll('button')].find(b => b.textContent.trim() === '결과 보기').click()`);
        await until('location.pathname === "/result" && document.body.innerText.includes("추천 제품 보기")');
        const result = await evaluate('sessionStorage.getItem("ilina.skin-type.result.v1")');
        assert.ok(result);
        await evaluate(`document.querySelector('a[href="/play/skin-type/products"]').click()`);
        await clickReturn('/result');
        await until('document.body.innerText.includes("추천 제품 보기")');
        await page.call('Page.reload');
        await until('document.body.innerText.includes("추천 제품 보기")');
        assert.equal(await evaluate('sessionStorage.getItem("ilina.skin-type.result.v1")'), result);
        // The public URL also returns to /result when a valid result is saved.
        await navigate(`/skin-type/${JSON.parse(result).code.toLowerCase()}/products`);
        await clickReturn('/result');
        console.log(`PASS ${host}: 33 questions -> result -> session products -> result; refresh and public URL with saved result.`);

        // All types with saved results, plus a malformed session fallback.
        for (const code of codes) {
          const scores = Object.fromEntries(dimensions.map((dimension, index) => {
            const threshold = dimension.thresholds.find(item => item.result === code[index]);
            return [dimension.id, (threshold.min + threshold.max) / 2];
          }));
          await evaluate(`sessionStorage.setItem('ilina.skin-type.result.v1', ${JSON.stringify(JSON.stringify({version:1,code,scores}))})`);
          await navigate(`/skin-type/${code.toLowerCase()}/products`);
          await clickReturn('/result');
          await until(`document.body.innerText.includes(${JSON.stringify(code)}) && document.body.innerText.includes('추천 제품 보기')`);
        }
        await evaluate(`sessionStorage.setItem('ilina.skin-type.result.v1', 'invalid')`);
        await navigate('/skin-type/dsnt/products');
        await clickReturn('/skin-type/dsnt');
        console.log(`PASS ${host}: all 16 saved-result returns and malformed-session fallback.`);
      }
      page.close();
      await browser.call('Target.closeTarget', { targetId });
    }
    if (recordSeo) {
      fs.writeFileSync(seoFile, JSON.stringify(seo));
      console.log(`Recorded ${Object.keys(seo).length} production SEO responses: ${seoFile}`);
    } else if (fs.existsSync(seoFile)) {
      assert.deepEqual(seo, JSON.parse(fs.readFileSync(seoFile)), 'Canonical/OG/robots/sitemap changed');
      console.log(`PASS: ${Object.keys(seo).length} canonical/OG/robots/sitemap responses unchanged from production baseline.`);
    }
  } finally {
    await browser.call('Target.disposeBrowserContext', { browserContextId });
    browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
