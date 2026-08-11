import { fullAddress, store } from "@/config/store";
import { contactMessage, whatsappUrl } from "@/lib/whatsapp";

const nav = [
  { href: "#iphones", label: "iPhones" },
  { href: "#mac", label: "Mac" },
  { href: "#ipad", label: "iPad" },
  { href: "#acessorios", label: "Acessórios" },
  { href: "#a-loja", label: "A Loja" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <p className="text-[13px] font-semibold tracking-[0.18em]">{store.name}</p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ink-soft">
              {store.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:gap-16">
            <nav aria-label="Seções do site" className="flex flex-col gap-2.5">
              {nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-2.5 text-[13px] text-ink-soft">
              <a
                href={store.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink"
              >
                {store.instagram.handle}
              </a>
              <a
                href={whatsappUrl(contactMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink"
              >
                {store.whatsapp.display}
              </a>
              <p className="max-w-52 leading-relaxed">{fullAddress}</p>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-black/5 pt-6 text-[11px] text-ink-soft/80">
          {store.legal}
        </p>
      </div>
    </footer>
  );
}
