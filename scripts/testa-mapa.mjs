import { chromium } from "playwright";

const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1440, height: 900 } });
await pagina.goto("http://localhost:3199", { waitUntil: "domcontentloaded" });
await pagina.evaluate(() => document.getElementById("a-loja")?.scrollIntoView());
// espera generosa pro iframe do Google Maps carregar
await pagina.waitForTimeout(8000);
const info = await pagina.evaluate(() => {
  const f = document.querySelector("iframe[title^='Mapa']");
  return f ? { src: f.src.slice(0, 90) } : null;
});
console.log(JSON.stringify(info));
await pagina.screenshot({ path: ".artifacts/mapa-teste.png" });
await navegador.close();
