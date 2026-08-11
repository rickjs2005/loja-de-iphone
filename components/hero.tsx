"use client";

import { useEffect, useRef, useState } from "react";
import { store } from "@/config/store";
import { contactMessage, whatsappUrl } from "@/lib/whatsapp";
import CountUp from "@/components/count-up";

const VIDEO_SRC = "/videos/iphone-unboxing.mp4";
const POSTER_SRC = "/images/hero-poster.jpg";

/**
 * Hero cinematográfico: o vídeo do unboxing é controlado pelo scroll.
 * A seção tem ~2.8 viewports de altura; enquanto o palco fica preso,
 * o progresso da rolagem vira currentTime do vídeo (com amortecimento).
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || videoFailed) return;

    // mobile ou reduced-motion: sem scrub — autoplay em loop.
    // (iOS não decodifica frame de vídeo sem play(); scrub por currentTime
    // deixa o hero em branco no aparelho real. Lição do ALVA.)
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (!desktop || reducedMotion) {
      video.loop = true;
      const retry = () => video.play().catch(() => {});
      video.play().catch(() => {
        // autoplay bloqueado (ex.: modo economia de bateria) — poster segura
        // a cena e o primeiro toque destrava o vídeo
        window.addEventListener("touchstart", retry, { once: true, passive: true });
      });
      return () => window.removeEventListener("touchstart", retry);
    }

    let target = 0;
    let current = -1;
    let raf = 0;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      target = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    };

    const tick = () => {
      // amortecimento: o vídeo persegue o alvo suavemente
      current = current < 0 ? target : current + (target - current) * 0.14;
      const duration = video.duration;
      if (Number.isFinite(duration) && duration > 0) {
        video.currentTime = current * Math.max(0, duration - 0.05);
      }
      // zoom quase imperceptível conforme a caixa abre — dá vida cinematográfica
      video.style.transform = `scale(${1 + current * 0.04})`;
      raf = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion, videoFailed]);

  return (
    <section
      ref={sectionRef}
      className={
        // o pin de 280vh só existe no desktop — no mobile o vídeo roda em
        // loop e a página segue direto pro catálogo
        reducedMotion ? "relative" : "relative md:h-[280vh]"
      }
      aria-label="Apresentação da loja"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-white">
        {/* mídia: full-bleed no mobile, painel vertical no desktop */}
        <div
          className="absolute inset-0 md:inset-auto md:right-[6vw] md:top-1/2 md:-translate-y-1/2
            md:h-[84vh] md:aspect-[1080/1916] md:rounded-[28px] md:overflow-hidden
            md:shadow-[0_24px_80px_rgba(0,0,0,0.16)] md:ring-1 md:ring-black/10"
        >
          {videoFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={POSTER_SRC}
              alt="iPhone 17 Pro lacrado sobre a bancada da loja"
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              muted
              playsInline
              preload="auto"
              onError={() => setVideoFailed(true)}
            />
          )}
          {/* scrim inferior só no mobile, pra segurar o texto */}
          <div className="absolute inset-x-0 bottom-0 h-[58svh] bg-gradient-to-t from-white via-white/85 via-40% to-transparent md:hidden" />
        </div>

        {/* texto editorial */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 md:inset-auto md:left-[7vw] md:top-1/2 md:-translate-y-1/2 md:max-w-md md:p-0">
          <p className="hero-rise text-[11px] font-medium uppercase tracking-[0.28em] text-ink-soft">
            Novos e seminovos · Garantia da loja
          </p>
          <h1
            className="hero-rise mt-4 text-4xl font-semibold leading-[1.06] tracking-[-0.03em] md:text-[3.4rem]"
            style={{ animationDelay: "120ms" }}
          >
            Seu próximo iPhone começa aqui.
          </h1>
          <p
            className="hero-rise mt-4 max-w-sm text-[15px] leading-relaxed text-ink-soft"
            style={{ animationDelay: "240ms" }}
          >
            Lacrado na caixa ou seminovo revisado — testado, garantido e pronto
            pra sair da loja com você.
          </p>
          <div className="hero-rise mt-8 flex items-center gap-3" style={{ animationDelay: "360ms" }}>
            <a
              href="#iphones"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Ver iPhones
            </a>
            <a
              href={whatsappUrl(contactMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-full px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-white"
            >
              Falar no WhatsApp
            </a>
          </div>
          <p
            className="hero-rise mt-6 text-[12px] text-ink-soft"
            style={{ animationDelay: "480ms" }}
          >
            <CountUp to={store.stats.devicesSold} prefix="+" duration={1800} /> iPhones
            entregues · Desde {store.stats.since}
          </p>
        </div>

        {/* dica de rolagem — o scroll abre a caixa */}
        {!reducedMotion && !videoFailed && (
          <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-ink-soft md:flex">
            <span>Role — a caixa abre</span>
            <span aria-hidden className="inline-block h-6 w-px animate-pulse bg-ink-soft/50" />
          </div>
        )}
      </div>

      {/* leitores de tela: contexto da loja */}
      <span className="sr-only">{store.tagline}</span>
    </section>
  );
}
