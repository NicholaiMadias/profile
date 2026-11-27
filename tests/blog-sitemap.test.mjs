import assert from 'node:assert/strict';
import { glob } from 'node:fs/promises';
import test from 'node:test';
import sitemap from '../app/sitemap.ts';

test('the sitemap lists each published blog page exactly once', async () => {
  const pages = [];
  for await (const page of glob('*/page.tsx', { cwd: new URL('../app/blog/', import.meta.url) })) {
    pages.push('https://nicholai.online/blog/' + page.split(/[\\/]/)[0]);
  }
  const urls = sitemap().map(({ url }) => url).filter(url => url.includes('/blog/'));
  assert.deepEqual(urls.sort(), pages.sort());
});
