"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import ProductCard from "@/components/product-card";
import Reveal from "@/components/reveal";

type Filter = "all" | "new" | "used";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "new", label: "Novos" },
  { value: "used", label: "Seminovos" },
];

export default function ProductSection({
  id,
  title,
  subtitle,
  products,
  withConditionFilter = false,
  columns = 3,
  tinted = false,
}: {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
  /** filtros Todos / Novos / Seminovos (só na seção de iPhones) */
  withConditionFilter?: boolean;
  /** colunas no desktop */
  columns?: 2 | 3 | 4;
  /** fundo off-white pra dar ritmo entre seções */
  tinted?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = withConditionFilter
    ? products.filter((p) => filter === "all" || p.condition === filter)
    : products;

  const desktopCols =
    columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

  return (
    <section id={id} className={`scroll-mt-16 ${tinted ? "bg-surface" : "bg-white"}`}>
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-[2.6rem]">
            {title}
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
            {subtitle}
          </p>
        </Reveal>

        {withConditionFilter && (
          <Reveal className="mt-8">
            <div
              className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:px-0"
              role="group"
              aria-label="Filtrar por condição"
            >
              {filters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  aria-pressed={filter === f.value}
                  className={`shrink-0 rounded-full px-5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    filter === f.value
                      ? "bg-ink text-white"
                      : "glass text-ink-soft hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        <div className={`mt-10 grid grid-cols-2 gap-3 md:gap-6 ${desktopCols}`}>
          {visible.map((product, i) => (
            <Reveal key={product.id} delay={Math.min(i, 3) * 60}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
