(() => {
  const selection = window.getSelection()?.toString().trim() ?? "";
  return selection.slice(0, 8000);
})();
