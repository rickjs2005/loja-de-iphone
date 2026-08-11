"use client";

import { useState, type FormEvent } from "react";
import { formatPrice } from "@/lib/format";
import { checkoutMessage, whatsappUrl } from "@/lib/whatsapp";
import { useCart } from "@/components/cart-context";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-[border-color,box-shadow] duration-300 focus:border-black/30 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)]";

export default function CheckoutForm() {
  const { items, subtotal } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hasTradeIn, setHasTradeIn] = useState(false);
  const [tradeInModel, setTradeInModel] = useState("");
  const [tradeInBattery, setTradeInBattery] = useState("");
  const [touched, setTouched] = useState(false);

  const valid = name.trim().length >= 2 && phone.replace(/\D/g, "").length >= 10;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;

    const message = checkoutMessage(
      {
        name: name.trim(),
        phone: phone.trim(),
        hasTradeIn,
        tradeInModel: tradeInModel.trim() || undefined,
        tradeInBattery: tradeInBattery.trim() || undefined,
      },
      items,
      subtotal,
    );

    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
      <p className="text-sm leading-relaxed text-ink-soft">
        Precisamos de alguns dados para preparar seu atendimento.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="lead-name" className="mb-1.5 block text-[13px] font-medium">
            Nome
          </label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            placeholder="Como podemos te chamar?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="lead-phone" className="mb-1.5 block text-[13px] font-medium">
            Telefone / WhatsApp
          </label>
          <input
            id="lead-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(33) 90000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-black/10 bg-white/60 px-4 py-3.5 transition-colors hover:bg-white">
          <input
            type="checkbox"
            checked={hasTradeIn}
            onChange={(e) => setHasTradeIn(e.target.checked)}
            className="h-4 w-4 accent-black"
          />
          <span className="text-sm">Tenho um iPhone para repassar</span>
        </label>

        {/* campos condicionais com entrada suave */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            hasTradeIn ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="space-y-4 overflow-hidden">
            <div className="pt-1">
              <label htmlFor="trade-model" className="mb-1.5 block text-[13px] font-medium">
                Qual iPhone você pretende repassar?
              </label>
              <input
                id="trade-model"
                type="text"
                placeholder="iPhone 15 Pro"
                value={tradeInModel}
                onChange={(e) => setTradeInModel(e.target.value)}
                className={inputClass}
                tabIndex={hasTradeIn ? 0 : -1}
              />
            </div>
            <div>
              <label htmlFor="trade-battery" className="mb-1.5 block text-[13px] font-medium">
                Saúde da bateria
              </label>
              <input
                id="trade-battery"
                type="number"
                min={1}
                max={100}
                inputMode="numeric"
                placeholder="87"
                value={tradeInBattery}
                onChange={(e) => setTradeInBattery(e.target.value)}
                className={inputClass}
                tabIndex={hasTradeIn ? 0 : -1}
              />
            </div>
          </div>
        </div>
      </div>

      {touched && !valid && (
        <p className="mt-4 text-[13px] text-ink-soft">
          Preencha seu nome e um número de WhatsApp válido pra continuar.
        </p>
      )}

      <div className="mt-auto pt-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-ink-soft">
            {items.length} {items.length === 1 ? "produto" : "produtos"}
          </span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99]"
        >
          <WhatsAppGlyph className="h-4 w-4" />
          Continuar pelo WhatsApp
        </button>
        <p className="mt-3 text-center text-[11px] text-ink-soft">
          A conversa abre no seu WhatsApp — nada é enviado sem você.
        </p>
      </div>
    </form>
  );
}

export function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}
