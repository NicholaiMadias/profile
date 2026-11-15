(() => {
  const events = [];
  const byId = (id) => document.getElementById(id);
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const base = location.href.split('#')[0];
  let serial = 0;
  let running = false;
  const background = (url) => listeners.forEach(fn => fn({ type: 'SPA_NAV_BACKGROUND', url }));
  const router = window.DriveDocsRouter.createSpaRouter({
    debounceMs: 150,
    onChange(event) {
      events.push(event);
      const li = document.createElement('li');
      li.textContent = `${event.type}: ${event.prevUrl || '(initial)'} → ${event.url}`;
      byId('log').prepend(li);
      while (byId('log').children.length > 60) byId('log').lastElementChild.remove();
      byId('route').textContent = router.getUrl();
    },
  });
  const start = () => { router.start(); running = true; byId('status').textContent = 'Running'; };
  const stop = () => { router.stop(); running = false; byId('status').textContent = 'Stopped'; };
  const nextUrl = () => `${base}#route-${++serial}`;
  byId('start').onclick = start;
  byId('stop').onclick = stop;
  byId('push').onclick = () => history.pushState(null, '', nextUrl());
  byId('replace').onclick = () => history.replaceState(null, '', nextUrl());
  byId('same').onclick = () => { for (let i = 0; i < 10; i++) history.replaceState(null, '', location.href); };
  byId('background').onclick = () => setTimeout(() => background(`${base}#stale`), 200);
  byId('pageshow').onclick = () => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
  byId('clear').onclick = () => { events.length = 0; byId('log').replaceChildren(); };
  byId('regression').onclick = async () => {
    const buttons = [...document.querySelectorAll('button')];
    buttons.forEach(button => button.disabled = true);
    byId('result').textContent = 'Running checks…';
    const checks = [];
    const check = (name, pass) => { checks.push({ name, pass }); if (!pass) throw Error(name); };
    try {
      stop(); nativeReplace(null, '', `${base}#A`);
      const beforeInit = events.length;
      start(); start();
      check('Initialization and idempotent start', events.length === beforeInit + 1 && events.at(-1).type === 'init');
      let before = events.length;
      history.replaceState(null, '', `${base}#B`);
      history.replaceState(null, '', `${base}#A`);
      await wait(30); background(`${base}#B`); await wait(220);
      check('A → B → A with delayed stale background', events.length === before && router.getUrl() === `${base}#A`);
      history.replaceState(null, '', `${base}#B`);
      nativeReplace(null, '', `${base}#A`); await wait(220);
      check('Emit-time location guard', events.length === before);
      for (let i = 0; i < 10; i++) history.replaceState(null, '', location.href);
      await wait(220); check('Same-URL replace spam', events.length === before);
      history.replaceState(null, '', `${base}#C`); background(`${base}#C`);
      await wait(40); check('Background preserves replace debounce', events.length === before);
      await wait(180); check('MAIN/background deduplication', events.length === before + 1 && events.at(-1).type === 'replaceState');
      history.replaceState(null, '', `${base}#D`); stop(); await wait(220);
      check('Stop cancels pending work', events.length === before + 1);
      start(); check('Restart recovers current URL', events.at(-1).type === 'init' && router.getUrl() === location.href);
      before = events.length;
      nativeReplace(null, '', `${base}#E`);
      window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
      await wait(40); check('Persisted pageshow signal', events.length === before + 1 && events.at(-1).type === 'pageshow-bfcache');
      before = events.length;
      nativeReplace(null, '', `${base}#F`); window.dispatchEvent(new PopStateEvent('popstate'));
      await wait(40); check('Popstate deduplication', events.length === before + 1 && events.at(-1).type === 'popstate');
      byId('result').textContent = `PASS — ${checks.length} checks passed. Real extension-world and bfcache testing is still required.`;
    } catch (error) {
      byId('result').textContent = `FAIL — ${error.message}`;
    } finally {
      buttons.forEach(button => button.disabled = false);
      if (!running) start();
    }
  };
  start();
  window.addEventListener('pagehide', () => router.stop());
  window.addEventListener('pageshow', (event) => { if (event.persisted && running) router.start(); });
})();
