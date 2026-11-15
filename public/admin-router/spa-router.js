(() => {
  if (window.DriveDocsRouter) return;
  function createSpaRouter({ onChange, debounceMs = 150, ignoreSameUrl = true } = {}) {
    let current = location.href;
    let timer = null;
    let pending = null;
    let started = false;
    const recentMain = new Map();
    const allowedMain = new Set(['pushState', 'replaceState', 'popstate']);
    const schedule = (url, source) => {
      if (typeof url !== 'string' || !url) return;
      try { new URL(url); } catch { return; }
      const now = Date.now();
      for (const [key, ts] of recentMain) if (now - ts > 1000) recentMain.delete(key);
      if (ignoreSameUrl && url === current) {
        clearTimeout(timer);
        timer = null;
        pending = null;
        return;
      }
      if (source === 'pushState' || source === 'replaceState') recentMain.set(url, now);
      if (source === 'historyStateUpdated') {
        const ts = recentMain.get(url);
        if (ts !== undefined && now - ts < 700) return;
      }
      if (pending?.url === url) return;
      pending = { url, source };
      clearTimeout(timer);
      const delay = source === 'replaceState' ? debounceMs : 0;
      timer = setTimeout(() => {
        const p = pending;
        pending = null;
        timer = null;
        if (!started || !p || p.url !== location.href) return;
        if (ignoreSameUrl && p.url === current) return;
        const prev = current;
        current = p.url;
        onChange?.({ url: p.url, prevUrl: prev, type: p.source, ts: Date.now() });
      }, delay);
    };
    const onMainWorld = (event) => {
      const d = event?.detail;
      if (!d || typeof d.url !== 'string' || !allowedMain.has(d.type)) return;
      try { if (new URL(d.url).origin !== location.origin) return; } catch { return; }
      schedule(location.href, d.type);
    };
    const onBackground = (msg) => {
      if (msg?.type !== 'SPA_NAV_BACKGROUND') return;
      schedule(location.href, 'historyStateUpdated');
    };
    const onPopState = () => schedule(location.href, 'popstate');
    const onPageShow = (event) => schedule(location.href, event.persisted ? 'pageshow-bfcache' : 'pageshow');
    return {
      start() {
        if (started) return;
        started = true;
        window.addEventListener('__spa_nav__', onMainWorld);
        globalThis.chrome?.runtime?.onMessage?.addListener(onBackground);
        window.addEventListener('popstate', onPopState);
        window.addEventListener('pageshow', onPageShow);
        current = location.href;
        onChange?.({ url: current, prevUrl: null, type: 'init', ts: Date.now() });
      },
      stop() {
        if (!started) return;
        started = false;
        window.removeEventListener('__spa_nav__', onMainWorld);
        globalThis.chrome?.runtime?.onMessage?.removeListener(onBackground);
        window.removeEventListener('popstate', onPopState);
        window.removeEventListener('pageshow', onPageShow);
        clearTimeout(timer);
        timer = null;
        pending = null;
        recentMain.clear();
      },
      getUrl: () => current,
    };
  }
  window.DriveDocsRouter = { createSpaRouter };
})();
