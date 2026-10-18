/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node CommonJS verification tool. */
/* Local Chrome CDP flow check. Defaults: app 3108, Chrome 9338. */
const fs = require('node:fs');
const assert = require('node:assert/strict');
const WebSocket = require('next/dist/compiled/ws');
const delay = ms => new Promise(r => setTimeout(r, ms));
const baseline = process.argv.includes('--baseline');
const target = awaitTarget();
async function awaitTarget() {
  return (await (await fetch('http://127.0.0.1:9338/json')).json()).find(t => t.type === 'page');
}
(async () => {
 const ws = new WebSocket((await target).webSocketDebuggerUrl);
 await new Promise(r => ws.once('open', r));
 let id = 0; const waiting = new Map();
 ws.on('message', data => { const msg = JSON.parse(data); if (msg.id) { const p = waiting.get(msg.id); waiting.delete(msg.id); if (msg.error) p.reject(msg.error); else p.resolve(msg.result); }});
 const call = (method, params = {}) => new Promise((resolve, reject) => { const n = ++id; waiting.set(n, {resolve,reject}); ws.send(JSON.stringify({id:n,method,params})); });
 const evaluate = async expression => { const r = await call('Runtime.evaluate', {expression,returnByValue:true,awaitPromise:true}); if(r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails)); return r.result.value; };
 const until = async expression => { for(let n=0;n<100;n++) { if(await evaluate(expression)) return; await delay(100); } throw Error('Timed out: '+expression); };
 await call('Page.enable'); await call('Runtime.enable');
 await call('Emulation.setDeviceMetricsOverride', {width:390,height:844,deviceScaleFactor:1,mobile:false});
 const hosts = baseline ? ['skin.ilina.kr'] : ['ilina.kr','skin.ilina.kr'];
 const snapshots = {};
 for (const host of hosts) {
  const origin = `http://${host}:3108`;
  const nav = async path => { await call('Page.navigate',{url:origin+path}); await until('document.readyState === "complete"'); await delay(150); assert.equal(await evaluate('location.origin'),origin); };
  const snap = async name => { await delay(100); snapshots[name] = await evaluate('document.body.innerText'); const shot = await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true}); fs.writeFileSync(`/private/tmp/ilina-root-${baseline?'before':'after'}-${host}-${name}.png`,Buffer.from(shot.data,'base64')); };
  await nav('/'); await evaluate('sessionStorage.clear()'); await snap('home');
  await nav('/result'); await until('location.pathname === "/survey"');
  await nav('/play/skin-type/products'); await until('location.pathname === "/survey"');
  await nav('/');
  await evaluate('document.querySelector(\'a[href="/survey"]\').click()');
  await until('location.pathname === "/survey" && document.body.innerText.includes("1 / 33")');
  await snap('survey');
  for(let question=1;question<=33;question++) {
   await until(`document.body.innerText.includes(${JSON.stringify(question+' / 33')})`);
   await evaluate('document.querySelector("section button").click()');
  }
  await evaluate('[...document.querySelectorAll("button")].find(b=>b.textContent.trim()==="결과 보기").click()');
  await until('location.pathname === "/result" && document.body.innerText.includes("추천 제품 보기")');
  assert.equal(await evaluate('location.origin'),origin);
  const stored = await evaluate('JSON.parse(sessionStorage.getItem("ilina.skin-type.result.v1"))');
  assert.match(stored.code,/^[DO][SR][PN][WT]$/); assert.equal(Object.keys(stored.scores).length,4);
  await snap('result');
  await call('Page.reload'); await until('document.body.innerText.includes("추천 제품 보기")');
  assert.deepEqual(await evaluate('JSON.parse(sessionStorage.getItem("ilina.skin-type.result.v1"))'),stored);
  await evaluate('document.querySelector(\'a[href="/play/skin-type/products"]\').click()');
  await until('location.pathname === "/play/skin-type/products" && document.body.innerText.includes("맞춤 제품 추천")');
  assert.equal(await evaluate('location.origin'),origin);
  assert.ok(await evaluate('document.querySelectorAll(\'a[href*="oliveyoung.co.kr"]\').length')>0);
  await snap('products');
  await evaluate('[...document.querySelectorAll("button")].find(b=>b.textContent.includes("결과로 돌아가기")).click()');
  await until('location.pathname === "/result" && document.body.innerText.includes("추천 제품 보기")');
  await evaluate('document.querySelector(\'a[href="/"]\').click()');
  await until('location.pathname === "/"');
  console.log('PASS browser:',host,'33 questions, result, refresh, products, return, restart; origin retained.',stored.code);
  if(host==='skin.ilina.kr') {
   const path=process.env.ILINA_BROWSER_BASELINE || '/private/tmp/ilina-root-browser-baseline.json';
   if(baseline) fs.writeFileSync(path,JSON.stringify(snapshots));
   else if(fs.existsSync(path)) { const before=JSON.parse(fs.readFileSync(path)); for(const key of Object.keys(before)) assert.equal(snapshots[key],before[key], 'Skin UI text changed: '+key); console.log('PASS: skin UI text matches pre-change baseline at all four screens.'); }
  }
  if(!baseline) {
   const {dimensions} = require('../features/skin-type/data/questions.json');
   const codes = Object.keys(require('../features/skin-type/data/results.json').results);
   for(const code of codes) {
    const scores = Object.fromEntries(dimensions.map((d,i)=>{ const threshold=d.thresholds.find(t=>t.result===code[i]); return [d.id,(threshold.min+threshold.max)/2]; }));
    await evaluate(`sessionStorage.setItem("ilina.skin-type.result.v1", ${JSON.stringify(JSON.stringify({version:1,code,scores}))})`);
    await nav('/result');
    await until(`document.body.innerText.includes(${JSON.stringify(code)}) && document.body.innerText.includes("추천 제품 보기")`);
    await evaluate(`document.querySelector('a[href="/play/skin-type/products"]').click()`);
    await until(`location.pathname === "/play/skin-type/products" && document.body.innerText.includes(${JSON.stringify(code+' 맞춤 제품 추천')})`);
    assert.equal(await evaluate('location.origin'),origin);
    assert.ok(await evaluate(`document.querySelectorAll('a[href*="oliveyoung.co.kr"]').length`)>0,code);
   }
   console.log('PASS browser:',host,'all 16 result and session recommendation screens render with product links.');
  }
 }
 if(!baseline) {
  const nav = async path => { await call('Page.navigate',{url:'http://ilina.kr:3108'+path}); await until(`location.pathname === ${JSON.stringify(path)} && document.readyState === "complete"`); await delay(150); };
  await nav('/');
  await evaluate(`document.querySelector('button[aria-label="바우만 피부 타입 안내 열기"]').focus(); document.activeElement.click()`);
  await until(`!!document.querySelector('[role="dialog"]')`);
  assert.equal(await evaluate('document.activeElement.getAttribute("aria-label")'),'닫기');
  assert.ok(await evaluate(`document.getElementById(document.querySelector('[role="dialog"]').getAttribute('aria-labelledby'))?.textContent.includes('바우만')`));
  for(const modifiers of [0,8]) {
   await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9,modifiers});
   assert.ok(await evaluate(`document.querySelector('[role="dialog"]').contains(document.activeElement)`));
  }
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
  await until(`!document.querySelector('[role="dialog"]')`);
  assert.equal(await evaluate('document.activeElement.getAttribute("aria-label")'),'바우만 피부 타입 안내 열기');
  const paths=['/','/guide','/about','/privacy','/company','/guides/four-dimensions','/guides/how-to-use-results','/story/why-we-built-skin-type','/survey','/result','/play/skin-type/products','/skin-type/dsnt/products'];
  for(const width of [320,390,768,1440]) {
   await call('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:false});
   for(const path of paths) {
    await nav(path);
    assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth+1'),`horizontal overflow ${width} ${path}`);
    assert.equal(await evaluate('document.querySelectorAll("main").length'),1,`main landmark ${path}`);
    assert.equal(await evaluate('document.querySelectorAll("h1").length'),1,`heading ${path}`);
    const ax=await call('Accessibility.getFullAXTree');
    const unnamed=ax.nodes.filter(n=>!n.ignored && ['button','link'].includes(n.role?.value) && !n.name?.value?.trim());
    assert.equal(unnamed.length,0,`unnamed controls ${width} ${path}`);
    if(width===320 && ['/','/guide','/about','/privacy'].includes(path)) {
     const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
     fs.writeFileSync(`/private/tmp/ilina-review-320-${path.replaceAll('/','')||'home'}.png`,Buffer.from(shot.data,'base64'));
    }
   }
  }
  console.log('PASS root keyboard dialog: accessible name, focus trap, Escape and focus restoration.');
  console.log('PASS 48 viewport/page checks (320/390/768/1440): no horizontal overflow, main/h1 landmarks, named controls.');
 }
 ws.close();
})().catch(e => { console.error(e); process.exit(1); });
