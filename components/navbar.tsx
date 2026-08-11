"use client";

import { useEffect, useState } from "react";
import { store } from "@/config/store";
import { contactMessage, whatsappUrl } from "@/lib/whatsapp";
import { useCart } from "@/components/cart-context";

const links = [
  { href: "#iphones", label: "iPhones" },
  { href: "#mac", label: "Mac" },
  { href: "#ipad", label: "iPad" },
  { href: "#acessorios", label: "Acessórios" },
  { href: "#a-loja", label: "A Loja" },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,box-shadow,border-color] duration-500 ${
        scrolled
          ? "glass shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "border-b border-transparent bg-white/55 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <a
          href="#"
          className="text-[13px] font-semibold tracking-[0.18em] text-ink"
          onClick={() => setMenuOpen(false)}
        >
          {store.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl(contactMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-black/5 md:block"
          >
            WhatsApp
          </a>

          <button
            type="button"
            onClick={openCart}
            className="relative rounded-full p-2 transition-colors hover:bg-black/5"
            aria-label={`Abrir sacola (${count} ${count === 1 ? "item" : "itens"})`}
          >
            <BagIcon />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-black/5 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0.5 h-px w-5 bg-ink transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[7.5px] h-px w-5 bg-ink transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute bottom-0.5 left-0 h-px w-5 bg-ink transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* menu mobile */}
      <div
        className={`glass fixed inset-x-0 top-16 bottom-0 z-30 flex flex-col px-8 pt-10 transition-[opacity,transform] duration-400 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="border-b border-black/5 py-5 text-2xl font-medium tracking-[-0.02em] text-ink"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {link.label}
          </a>
        ))}
        <a
          href={whatsappUrl(contactMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 rounded-full bg-ink py-4 text-center text-sm font-medium text-white"
          onClick={() => setMenuOpen(false)}
        >
          Falar no WhatsApp
        </a>
      </div>
    </header>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden>
      <path
        d="M3 6h12l-.85 11.08A2 2 0 0 1 12.16 19H5.84a2 2 0 0 1-1.99-1.92L3 6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M6 8V4.5a3 3 0 0 1 6 0V8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
