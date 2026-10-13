/**
 * Verificação visual completa.
 *
 * Desktop e mobile: scrub do hero em 5 posições + screenshot de cada seção +
 * fluxo carrinho→checkout→campos condicionais. Critério de aprovação é
 * humano: olhar as imagens em .artifacts/.
 *
 * Uso: node scripts/verifica.mjs [url]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const url = process.argv[2] ?? "http://localhost:3000";
const SAIDA = ".artifacts";

const navegador = await chromium.launch();
await mkdir(SAIDA, { recursive: true });

async function esperaVideoPronto(pagina) {
  await pagina.waitForFunction(
    () => {
      const v = document.querySelector("video");
      return v && v.readyState >= 3 && Number.isFinite(v.duration) && v.duration > 1;
    },
    { timeout: 30000 },
  );
}

async function scrub(pagina, prefixo, alturaViewport) {
  // altura total do hero = 280vh → região de scroll útil = 180vh
  const passos = [0, 0.25, 0.5, 0.75, 1];
  for (const p of passos) {
    const y = Math.round(1.8 * alturaViewport * p);
    await pagina.evaluate((py) => window.scrollTo(0, py), y);
    // dá tempo do amortecimento alcançar o alvo
    await pagina.waitForTimeout(900);
    await pagina.screenshot({ path: `${SAIDA}/${prefixo}-hero-${Math.round(p * 100)}.png` });
  }
}

async function secoes(pagina, prefixo) {
  for (const id of ["iphones", "mac", "ipad", "acessorios", "a-loja"]) {
    await pagina.evaluate((sel) => {
      document.getElementById(sel)?.scrollIntoView();
    }, id);
    await pagina.waitForTimeout(900);
    await pagina.screenshot({ path: `${SAIDA}/${prefixo}-${id}.png` });
  }
  // instagram fica entre acessorios e a-loja — captura via âncora do texto
  await pagina.evaluate(() => {
    const el = [...document.querySelectorAll("h2")].find((h) =>
      h.textContent?.includes("@sua.loja"),
    );
    el?.scrollIntoView({ block: "center" });
  });
  await pagina.waitForTimeout(900);
  await pagina.screenshot({ path: `${SAIDA}/${prefixo}-instagram.png` });
}

async function fluxoCarrinho(pagina, prefixo) {
  // adiciona 2 produtos
  await pagina.evaluate(() => document.getElementById("iphones")?.scrollIntoView());
  await pagina.waitForTimeout(600);
  const botoes = pagina.locator("#iphones article button", { hasText: "Adicionar" });
  await botoes.nth(0).click();
  await pagina.waitForTimeout(400);
  // o card dá feedback sem abrir o drawer — abre pela sacola da navbar
  await pagina.locator("header button[aria-label^='Abrir sacola']").click();
  await pagina.waitForTimeout(700);
  await pagina.screenshot({ path: `${SAIDA}/${prefixo}-carrinho.png` });

  // vai pro checkout
  await pagina.getByRole("button", { name: "Finalizar compra" }).click();
  await pagina.waitForTimeout(600);
  await pagina.screenshot({ path: `${SAIDA}/${prefixo}-checkout.png` });

  // marca o repasse pra revelar os campos condicionais
  await pagina.getByText("Tenho um iPhone para repassar").click();
  await pagina.waitForTimeout(700);
  await pagina.screenshot({ path: `${SAIDA}/${prefixo}-checkout-repasse.png` });

  // preenche e captura a URL do WhatsApp gerada
  await pagina.fill("#lead-name", "João Teste");
  await pagina.fill("#lead-phone", "(33) 98888-7777");
  await pagina.fill("#trade-model", "iPhone 15 Pro");
  await pagina.fill("#trade-battery", "87");
  const [popup] = await Promise.all([
    pagina.waitForEvent("popup", { timeout: 8000 }).catch(() => null),
    pagina.getByRole("button", { name: "Continuar pelo WhatsApp" }).click(),
  ]);
  if (popup) {
    console.log("WHATSAPP_URL:", popup.url());
    await popup.close();
  } else {
    console.log("WHATSAPP_URL: (popup não abriu)");
  }
}

// ── desktop ────────────────────────────────────────────────
{
  const pagina = await navegador.newPage({ viewport: { width: 1440, height: 900 } });
  await pagina.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await esperaVideoPronto(pagina);
  await pagina.waitForTimeout(500);
  await scrub(pagina, "desktop", 900);
  await secoes(pagina, "desktop");
  await fluxoCarrinho(pagina, "desktop");
  await pagina.close();
}

// ── mobile ─────────────────────────────────────────────────
{
  const pagina = await navegador.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  await pagina.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await esperaVideoPronto(pagina);
  await pagina.waitForTimeout(500);
  await scrub(pagina, "mobile", 844);
  await secoes(pagina, "mobile");
  await fluxoCarrinho(pagina, "mobile");
  await pagina.close();
}

await navegador.close();
console.log("OK — screenshots em", SAIDA);
