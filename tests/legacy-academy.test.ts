import test from "node:test";
import assert from "node:assert/strict";
import nextConfig from "../next.config.ts";

test("legacy academy pages redirect to available routes", async () => {
  assert.ok(nextConfig.redirects);
  const redirects = await nextConfig.redirects();
  const expected = [
    ["/Apps/academy", "/tools"],
    ["/Apps/academy/bible-study", "/arcade/bible-quiz"],
    ["/Apps/academy/games/code-matrix", "/arcade"],
    ["/Apps/academy/games/matrix-of-conscience", "/arcade"],
    ["/Apps/academy/games/powershell-defense", "/arcade"],
    ["/Apps/academy/games/seven-stars", "/bible-study/seven-stars"],
    ["/Apps/academy/games/signal-operations", "/arcade"],
    ["/Apps/academy/vim-defense", "/arcade/vim-defender"],
  ] as const;

  for (const [source, destination] of expected) {
    for (const path of [source, `${source}/index.html`]) {
      assert.ok(
        redirects.some((redirect) =>
          redirect.source === path && redirect.destination === destination && redirect.permanent === false
        ),
        path,
      );
    }
  }
  assert.ok(
    redirects.some((redirect) =>
      redirect.source === "/Apps/academy/games/matrix-of-conscience/matrix-act-iv.html" &&
      redirect.destination === "/arcade" &&
      redirect.permanent === false
    ),
  );
});
