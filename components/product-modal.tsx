"use client";

import { useEffect } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/cart-context";

export default function ProductModal() {
  const { selected, closeProduct, addItem } = useCart();

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProduct();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, closeProduct]);

  const isIphone = selected?.category === "iphone";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center md:items-center ${
        selected ? "" : "pointer-events-none"
      }`}
      aria-hidden={!selected}
    >
      {/* backdrop */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fechar"
        onClick={closeProduct}
        className={`absolute inset-0 bg-black/25 backdrop-blur-[2px] transition-opacity duration-400 ${
          selected ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={selected?.name}
        className={`glass relative w-full max-w-3xl overflow-hidden rounded-t-3xl bg-white/90 shadow-[0_32px_80px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:rounded-3xl ${
          selected
            ? "translate-y-0"
            : "translate-y-full md:translate-y-8 md:scale-[0.98] md:opacity-0"
        }`}
      >
        {selected && (
          <div className="grid max-h-[88svh] overflow-y-auto md:max-h-none md:grid-cols-2 md:overflow-visible">
            <div className="relative aspect-square md:aspect-auto md:min-h-[480px]">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col p-6 md:p-8">
              {isIphone && selected.condition && (
                <span
                  className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                    selected.condition === "new"
                      ? "bg-ink text-white"
                      : "border border-black/10 bg-white text-ink"
                  }`}
                >
                  {selected.condition === "new" ? "Novo" : "Seminovo"}
                </span>
              )}

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
                {selected.name}
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                {selected.variant}
                {isIphone && typeof selected.batteryHealth === "number" && (
                  <> · Bateria {selected.batteryHealth}%</>
                )}
              </p>

              <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
                {selected.description}
              </p>

              {selected.specs && (
                <ul className="mt-5 space-y-2 border-t border-black/5 pt-5">
                  {selected.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2 text-[13px] text-ink-soft">
                      <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                      {spec}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                <span className="text-xl font-semibold">{formatPrice(selected.price)}</span>
                <button
                  type="button"
                  onClick={() => addItem(selected, true)}
                  className="rounded-full bg-ink px-7 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  Adicionar à sacola
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={closeProduct}
          aria-label="Fechar"
          className="glass absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-white"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
