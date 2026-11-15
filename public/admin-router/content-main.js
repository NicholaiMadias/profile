(() => {
  if (window.__driveDocsHistoryPatched) return;
  window.__driveDocsHistoryPatched = true;
  const emit = (type) => window.dispatchEvent(new CustomEvent('__spa_nav__', {
    detail: { url: location.href, type, ts: Date.now() },
  }));
  for (const type of ['pushState', 'replaceState']) {
    const original = history[type];
    history[type] = function (...args) {
      const result = original.apply(this, args);
      emit(type);
      return result;
    };
  }
  window.addEventListener('popstate', () => emit('popstate'));
})();
