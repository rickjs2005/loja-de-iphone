[English](README.md)

# Loja de iPhone — demo comercial

E-commerce de iPhones (demo para apresentação a clientes): hero com vídeo de unboxing controlado pelo scroll, catálogo de iPhones/Mac/iPad/acessórios, carrinho no frontend, checkout de lead com campo condicional de repasse e conversão via WhatsApp.

> **Tipo:** demo comercial (loja fictícia) · **Demo:** https://loja-de-iphone-demo.vercel.app
>
> Projeto de demonstração, **sem afiliação com a Apple Inc.** Apple, iPhone, iPad, Mac, AirPods e Apple Watch são marcas da Apple Inc. Nome da loja, WhatsApp, Instagram, endereço, produtos e preços são ilustrativos.

![Página inicial da Loja de iPhone](docs/screenshots/loja-de-iphone.webp)

## Funcionalidades

- Hero com vídeo de unboxing ligado ao scroll no desktop (autoplay em loop no mobile).
- Catálogo com 21 produtos (iPhone, Mac, iPad e acessórios), filtros por categoria, modal de produto e parcelamento em 12x.
- Sacola no frontend, persistida em `localStorage`.
- Checkout de lead (nome, WhatsApp e iPhone opcional para repasse com modelo/bateria) que gera uma mensagem estruturada e abre o WhatsApp (`wa.me`).
- Seções de Instagram, loja (com mapa do Google Maps incorporado) e botão flutuante de WhatsApp.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · ESLint. Playwright (dev) para os scripts de verificação visual.

## Rodar localmente

Pré-requisitos: Node.js 20.9+ e npm.

```bash
npm ci
npm run dev      # http://localhost:3000
```

Não há variáveis de ambiente.

## Scripts

| Script          | Descrição                    |
| --------------- | ---------------------------- |
| `npm run dev`   | servidor de desenvolvimento  |
| `npm run build` | build de produção            |
| `npm run start` | servidor do build            |
| `npm run lint`  | ESLint                       |

## Adaptar para um cliente

Todo o conteúdo trocável fica fora dos componentes:

| O quê                                         | Onde                                                    |
| --------------------------------------------- | ------------------------------------------------------- |
| Nome, WhatsApp, Instagram, endereço, horário  | `config/store.ts`                                       |
| Produtos, preços, descrições                  | `data/products.ts`                                      |
| Fotos de produto                              | `public/images/products/`                               |
| Fotos do Instagram                            | `public/images/instagram/`                              |
| Fachada da loja                               | `public/images/store/fachada.webp`                      |
| Vídeo do hero                                 | `public/videos/iphone-unboxing.mp4`                     |
| Poster/OG                                     | `public/images/hero-poster.jpg`, `public/images/og.jpg` |

O WhatsApp em `config/store.ts` é um número fictício e inválido, e o Instagram é um placeholder — troque pelos dados reais do cliente.

> O vídeo do hero é controlado pelo scroll: re-encode qualquer vídeo novo com
> `ffmpeg -i in.mp4 -an -c:v libx264 -preset slow -crf 26 -g 1 -pix_fmt yuv420p -movflags +faststart out.mp4`
> (`-g 1` = todo frame vira keyframe; sem isso o seek engasga).

## Estrutura

```
app/          layout, página e estilos globais
components/   seções (hero, produtos, sacola, checkout, Instagram, loja, rodapé)
config/       dados da loja (store.ts)
data/         catálogo de produtos
lib/          formatação de preço e montagem das mensagens de WhatsApp
public/       imagens e vídeo
scripts/      scripts Playwright de verificação visual
```

## Verificação visual

```bash
npm run build && npx next start -p 3199
node scripts/verifica.mjs http://localhost:3199
```

Gera screenshots desktop + mobile das seções (incluindo o hero em 5 posições e o fluxo sacola → checkout → WhatsApp) em `.artifacts/` (ignorado pelo git). Requer os navegadores do Playwright (`npx playwright install chromium`).

## Limitações

- Sem backend, pagamento ou estoque: o pedido termina em uma mensagem de WhatsApp.
- `npm run lint` acusa 3 erros pré-existentes da regra `react-hooks/set-state-in-effect`; o CI roda apenas `npm ci` e `npm run build`.

## Créditos de mídia

Origem do vídeo de unboxing (`public/videos/iphone-unboxing.mp4`) e das fotos de produto, Instagram e fachada: não documentada.

## Segurança

Veja [SECURITY.md](SECURITY.md).

## Licença

Ainda não há licença definida; todos os direitos reservados ao autor.
