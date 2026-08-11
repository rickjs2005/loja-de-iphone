# Loja de iPhone — demo comercial

E-commerce premium de iPhones (demo para apresentação a clientes): hero com
vídeo de unboxing controlado pelo scroll, catálogo de iPhones/Mac/iPad/acessórios,
carrinho frontend, checkout de lead com campo condicional de repasse e conversão
via WhatsApp.

Stack: Next.js 16 · React · TypeScript · Tailwind CSS v4.

## Rodar

```bash
npm install
npm run dev
```

## Adaptar para um cliente

Todo o conteúdo trocável fica fora dos componentes:

| O quê                       | Onde                                    |
| --------------------------- | --------------------------------------- |
| Nome, WhatsApp, Instagram, endereço, horário | `config/store.ts`      |
| Produtos, preços, descrições | `data/products.ts`                     |
| Fotos de produto            | `public/images/products/`               |
| Fotos do Instagram          | `public/images/instagram/`              |
| Fachada da loja             | `public/images/store/fachada.webp`      |
| Vídeo do hero               | `public/videos/iphone-unboxing.mp4`     |
| Poster/OG                   | `public/images/hero-poster.jpg`, `public/images/og.jpg` |

O layout não precisa ser tocado.

> O vídeo do hero é scrubado pelo scroll: re-encode qualquer vídeo novo com
> `ffmpeg -i in.mp4 -an -c:v libx264 -preset slow -crf 26 -g 1 -pix_fmt yuv420p -movflags +faststart out.mp4`
> (`-g 1` = todo frame vira keyframe; sem isso o seek engasga).

## Verificação visual

```bash
npm run build && npx next start -p 3199
node scripts/verifica.mjs http://localhost:3199
```

Gera screenshots desktop + mobile de todas as seções (incluindo o scrub do
hero em 5 posições e o fluxo carrinho → checkout → WhatsApp) em `.artifacts/`.
