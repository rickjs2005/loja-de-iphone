import { store } from "@/config/store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/data/products";

export type CartItem = { product: Product; qty: number };

export type Lead = {
  name: string;
  phone: string;
  hasTradeIn: boolean;
  tradeInModel?: string;
  tradeInBattery?: string;
};

export function whatsappUrl(message: string): string {
  return `https://wa.me/${store.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Mensagem simples do botão flutuante / CTAs genéricos */
export function contactMessage(): string {
  return "Olá! Vi o site de vocês e queria um atendimento.";
}

/** Mensagem estruturada do checkout, com carrinho + dados do lead */
export function checkoutMessage(lead: Lead, items: CartItem[], subtotal: number): string {
  const lines: string[] = ["Olá! Gostaria de atendimento para comprar:", ""];

  for (const { product, qty } of items) {
    const label = [product.name, product.variant].filter(Boolean).join(" ");
    const condition =
      product.condition === "new" ? " (novo)" : product.condition === "used" ? " (seminovo)" : "";
    lines.push(`- ${label}${condition} — ${qty}x — ${formatPrice(product.price * qty)}`);
  }

  lines.push("", `Total: ${formatPrice(subtotal)}`, "");
  lines.push("Meus dados:", `Nome: ${lead.name}`, `WhatsApp: ${lead.phone}`);

  if (lead.hasTradeIn) {
    lines.push("", "Tenho um iPhone para repassar:");
    if (lead.tradeInModel) lines.push(`Modelo: ${lead.tradeInModel}`);
    if (lead.tradeInBattery) lines.push(`Bateria: ${lead.tradeInBattery}%`);
  }

  return lines.join("\n");
}
