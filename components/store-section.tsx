import Image from "next/image";
import { fullAddress, mapsEmbedUrl, mapsUrl, store } from "@/config/store";
import Reveal from "@/components/reveal";

export default function StoreSection() {
  return (
    <section id="a-loja" className="scroll-mt-16 bg-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-[2.6rem]">
            A loja, de perto.
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Atendimento de balcão, aparelho testado na sua frente e conversa sem
            pressa. Passa aqui.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:h-full md:aspect-auto md:min-h-[440px]">
              <Image
                src="/images/store/fachada.webp"
                alt={`Fachada da ${store.shortName} em ${store.address.city}`}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex h-full flex-col gap-6">
              <div className="glass rounded-3xl p-6 md:p-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-soft">
                  Endereço
                </p>
                <address className="mt-3 text-[15px] not-italic leading-relaxed">
                  {store.address.street}
                  <br />
                  {store.address.city} - {store.address.state}
                  <br />
                  CEP {store.address.cep}
                </address>
                <p className="mt-3 text-[13px] text-ink-soft">{store.hours}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  Como chegar
                </a>
              </div>

              <div className="relative min-h-40 flex-1 overflow-hidden rounded-3xl border border-black/5">
                <iframe
                  title={`Mapa — ${fullAddress}`}
                  src={mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full grayscale-[0.35] contrast-[0.95]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
