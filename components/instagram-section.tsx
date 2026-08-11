import Image from "next/image";
import { store } from "@/config/store";
import Reveal from "@/components/reveal";

const posts = [
  { src: "/images/instagram/post-5.webp", alt: "iPhone 17 Pro lacrado na bancada da loja" },
  { src: "/images/instagram/post-1.webp", alt: "Detalhe do módulo de câmeras em titânio" },
  { src: "/images/instagram/post-3.webp", alt: "iPhone em titânio azul na mão, dentro da loja" },
  { src: "/images/instagram/post-6.webp", alt: "Retirando o plástico do iPhone novo" },
  { src: "/images/instagram/post-2.webp", alt: "Fones, carregador MagSafe e cabo sobre linho" },
  { src: "/images/instagram/post-4.webp", alt: "Prateleiras da loja com caixas de iPhone" },
];

export default function InstagramSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-lg font-semibold tracking-[0.08em] text-white"
              >
                LI
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.02em]">
                  {store.instagram.handle}
                </h2>
                <p className="mt-0.5 text-[13px] text-ink-soft">
                  {store.instagram.followers} seguidores · {store.address.city}
                </p>
              </div>
            </div>
            <a
              href={store.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-full px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-white"
            >
              Ver Instagram
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-3 gap-1.5 md:gap-2">
          {posts.map((post, i) => (
            <Reveal key={post.src} delay={Math.min(i, 5) * 50}>
              <a
                href={store.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-lg md:rounded-xl"
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 768px) 33vw, 384px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
