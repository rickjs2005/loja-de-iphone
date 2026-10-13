[Português](README.pt-BR.md)

# Loja de iPhone — commercial demo

iPhone e-commerce demo (built to pitch to store owners): scroll-driven unboxing video hero, catalog of iPhones/Mac/iPad/accessories, client-side cart, lead checkout with a conditional trade-in field, and conversion through WhatsApp. The UI is in Brazilian Portuguese.

> **Type:** commercial demo (fictional store) · **Demo:** https://loja-de-iphone-demo.vercel.app
>
> Demo project, **not affiliated with Apple Inc.** Apple, iPhone, iPad, Mac, AirPods and Apple Watch are trademarks of Apple Inc. Store name, WhatsApp, Instagram, address, products and prices are illustrative.

![Loja de iPhone home page](docs/screenshots/loja-de-iphone.webp)

## Features

- Hero with an unboxing video tied to scroll on desktop (looping autoplay on mobile).
- Catalog with 21 products (iPhone, Mac, iPad and accessories), category filters, product modal and 12-installment pricing.
- Client-side bag persisted in `localStorage`.
- Lead checkout (name, WhatsApp and an optional trade-in iPhone with model/battery) that builds a structured message and opens WhatsApp (`wa.me`).
- Instagram section, store section (with an embedded Google Maps map) and a floating WhatsApp button.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · ESLint. Playwright (dev) for the visual check scripts.

## Run locally

Prerequisites: Node.js 20.9+ and npm.

```bash
npm ci
npm run dev      # http://localhost:3000
```

No environment variables are required.

## Scripts

| Script          | Description               |
| --------------- | ------------------------- |
| `npm run dev`   | development server        |
| `npm run build` | production build          |
| `npm run start` | serve the production build |
| `npm run lint`  | ESLint                    |

## Adapting it for a client

All swappable content lives outside the components:

| What                                        | Where                                                   |
| ------------------------------------------- | ------------------------------------------------------- |
| Name, WhatsApp, Instagram, address, hours   | `config/store.ts`                                       |
| Products, prices, descriptions              | `data/products.ts`                                      |
| Product photos                              | `public/images/products/`                               |
| Instagram photos                            | `public/images/instagram/`                              |
| Storefront photo                            | `public/images/store/fachada.webp`                      |
| Hero video                                  | `public/videos/iphone-unboxing.mp4`                     |
| Poster/OG                                   | `public/images/hero-poster.jpg`, `public/images/og.jpg` |

The WhatsApp number in `config/store.ts` is a fictional, invalid number and the Instagram entry is a placeholder — replace them with the client's real data.

> The hero video is scrubbed by scroll: re-encode any new video with
> `ffmpeg -i in.mp4 -an -c:v libx264 -preset slow -crf 26 -g 1 -pix_fmt yuv420p -movflags +faststart out.mp4`
> (`-g 1` makes every frame a keyframe; without it seeking stutters).

## Structure

```
app/          layout, page and global styles
components/   sections (hero, products, bag, checkout, Instagram, store, footer)
config/       store data (store.ts)
data/         product catalog
lib/          price formatting and WhatsApp message builders
public/       images and video
scripts/      Playwright visual check scripts
```

## Visual check

```bash
npm run build && npx next start -p 3199
node scripts/verifica.mjs http://localhost:3199
```

Saves desktop + mobile screenshots of every section (including the hero at 5 scroll positions and the bag → checkout → WhatsApp flow) to `.artifacts/` (git-ignored). Requires Playwright browsers (`npx playwright install chromium`).

## Limitations

- No backend, payments or inventory: an order ends as a WhatsApp message.
- `npm run lint` reports 3 pre-existing errors from the `react-hooks/set-state-in-effect` rule; CI only runs `npm ci` and `npm run build`.

## Media credits

Origin of the unboxing video (`public/videos/iphone-unboxing.mp4`) and of the product, Instagram and storefront photos: not documented.

## Security

See [SECURITY.md](SECURITY.md).

## License

No license has been chosen yet; all rights reserved by the author.
