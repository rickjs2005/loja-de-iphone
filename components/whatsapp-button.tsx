"use client";

import { contactMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "@/components/checkout-form";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl(contactMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="glass group fixed bottom-5 right-5 z-40 flex h-12 items-center overflow-hidden rounded-full text-ink shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-[box-shadow,transform] duration-300 hover:scale-[1.04] hover:shadow-[0_12px_36px_rgba(0,0,0,0.16)]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center">
        <WhatsAppGlyph className="h-5 w-5 text-[#25D366]" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap pr-0 text-[13px] font-medium transition-[max-width,padding] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-32 group-hover:pr-4 max-md:hidden">
        WhatsApp
      </span>
    </a>
  );
}
