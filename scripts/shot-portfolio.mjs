import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { chromium } from "playwright";

// Uso: node scripts/shot-portfolio.mjs [saida.png]
const OUT = process.argv[2] ?? ".artifacts/loja-de-iphone.png";
mkdirSync(dirname(OUT), { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("https://loja-de-iphone-demo.vercel.app", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await p.waitForFunction(
  () => {
    const v = document.querySelector("video");
    return v && v.readyState >= 3 && v.duration > 1;
  },
  { timeout: 20000 },
);

await p.evaluate(() => {
  const hero = document.querySelector("section[aria-label='Apresentação da loja']");
  const total = hero.getBoundingClientRect().height - window.innerHeight;
  window.scrollTo(0, total * 0.66);
});

// headless não repinta um vídeo pausado só porque currentTime mudou — a
// prop atualiza, mas o frame decodificado no compositor fica atrás. Forçar
// play()+pause() por uma volta do rAF garante que o frame seja de fato
// decodificado e desenhado antes do screenshot.
await p.evaluate(
  () =>
    new Promise((resolve) => {
      const v = document.querySelector("video");
      if (!v || !v.requestVideoFrameCallback) return resolve();
      v.requestVideoFrameCallback(() => resolve());
      v.play()
        .then(() => v.pause())
        .catch(() => resolve());
    }),
);
// dá tempo do contador "+N iPhones entregues" (1.8s) terminar de contar
await p.waitForTimeout(2000);
await p.screenshot({ path: OUT });
await b.close();
console.log("OK", OUT);
