const router = window.DriveDocsRouter.createSpaRouter({
  onChange: ({ url, prevUrl, type }) => console.log(type, prevUrl, '->', url),
});
router.start();
