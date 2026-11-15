chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (details.frameId !== 0) return;
  chrome.tabs.sendMessage(details.tabId, {
    type: 'SPA_NAV_BACKGROUND', url: details.url, ts: Date.now(),
  }).catch(() => {});
}, { url: [{ hostEquals: 'drive.google.com' }, { hostEquals: 'docs.google.com' }] });
