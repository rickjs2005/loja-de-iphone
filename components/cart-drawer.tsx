"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/cart-context";
import CheckoutForm from "@/components/checkout-form";

export default function CartDrawer() {
  const { items, subtotal, isCartOpen, closeCart, setQty, removeItem } = useCart();
  const [step, setStep] = useState<"cart" | "lead">("cart");

  // sempre reabre na etapa do carrinho
  useEffect(() => {
    if (isCartOpen) setStep("cart");
  }, [isCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCartOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isCartOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isCartOpen}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fechar sacola"
        onClick={closeCart}
        className={`absolute inset-0 bg-black/25 backdrop-blur-[2px] transition-opacity duration-400 ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* bottom sheet no mobile, drawer lateral no desktop */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sacola"
        className={`glass absolute inset-x-0 bottom-0 flex max-h-[92svh] flex-col rounded-t-3xl bg-white/90 shadow-[0_-16px_60px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          md:inset-x-auto md:inset-y-0 md:right-0 md:max-h-none md:w-[420px] md:rounded-none md:border-l md:border-black/5 md:shadow-[-24px_0_80px_rgba(0,0,0,0.12)]
          ${isCartOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full md:translate-y-0"}`}
      >
        <header className="flex items-center justify-between border-b border-black/5 px-6 py-5">
          <h2 className="text-base font-semibold tracking-[-0.01em]">
            {step === "cart" ? "Sua sacola" : "Antes de finalizar"}
          </h2>
          <button
            type="button"
            onClick={step === "cart" ? closeCart : () => setStep("cart")}
            className="rounded-full px-3 py-1.5 text-[13px] text-ink-soft transition-colors hover:bg-black/5 hover:text-ink"
          >
            {step === "cart" ? "Fechar" : "Voltar"}
          </button>
        </header>

        {step === "cart" ? (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 py-16 text-center">
                  <p className="text-sm text-ink-soft">Sua sacola está vazia.</p>
                  <a
                    href="#iphones"
                    onClick={closeCart}
                    className="text-sm font-medium text-ink underline underline-offset-4"
                  >
                    Ver iPhones
                  </a>
                </div>
              ) : (
                <ul className="divide-y divide-black/5">
                  {items.map(({ product, qty }) => (
                    <li key={product.id} className="flex gap-4 py-5">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-black/5">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium leading-tight">{product.name}</p>
                            <p className="mt-0.5 text-[12px] text-ink-soft">{product.variant}</p>
                          </div>
                          <p className="text-sm font-medium">
                            {formatPrice(product.price * qty)}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="glass flex items-center rounded-full">
                            <button
                              type="button"
                              onClick={() => setQty(product.id, qty - 1)}
                              className="px-3 py-1 text-sm text-ink-soft transition-colors hover:text-ink"
                              aria-label={`Diminuir quantidade de ${product.name}`}
                            >
                              −
                            </button>
                            <span className="min-w-5 text-center text-[13px] font-medium">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(product.id, qty + 1)}
                              className="px-3 py-1 text-sm text-ink-soft transition-colors hover:text-ink"
                              aria-label={`Aumentar quantidade de ${product.name}`}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="text-[12px] text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-black/5 px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">Subtotal</span>
                  <span className="text-lg font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-1 text-[12px] text-ink-soft">
                  Você finaliza o atendimento pelo WhatsApp, do seu jeito.
                </p>
                <button
                  type="button"
                  onClick={() => setStep("lead")}
                  className="mt-4 w-full rounded-full bg-ink py-3.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99]"
                >
                  Finalizar compra
                </button>
              </footer>
            )}
          </>
        ) : (
          <CheckoutForm />
        )}
      </aside>
    </div>
  );
}
