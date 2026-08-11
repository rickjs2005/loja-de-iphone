"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";
import { formatPrice, installmentLabel } from "@/lib/format";
import { useCart } from "@/components/cart-context";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addItem, openProduct } = useCart();
  const isIphone = product.category === "iphone";
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = useRef<HTMLElement>(null);
  const canTilt = useRef(false);

  useEffect(() => {
    canTilt.current =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // tilt 3D sutil seguindo o cursor — só desktop
  function handleMove(e: MouseEvent) {
    const el = cardRef.current;
    if (!el || !canTilt.current) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 3.5).toFixed(2)}deg) rotateY(${(px * 3.5).toFixed(2)}deg) translateY(-4px)`;
  }

  function handleLeave() {
    const el = cardRef.current;
    if (el) el.style.transform = "";
  }

  return (
    <article
      ref={cardRef}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-sm transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
      onClick={() => openProduct(product)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="card-spotlight relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {isIphone && product.condition === "used" && (
          <span className="glass absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink">
            Seminovo
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="text-[15px] font-semibold tracking-[-0.01em] md:text-base">
          {product.name}
        </h3>
        <p className="mt-0.5 text-[13px] text-ink-soft">
          {product.variant}
          {isIphone && typeof product.batteryHealth === "number" && (
            <> · Bateria {product.batteryHealth}%</>
          )}
        </p>

        <p className="mt-3 hidden text-[13px] leading-relaxed text-ink-soft md:line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex flex-1 flex-col justify-end gap-3 md:flex-row md:items-end md:justify-between md:gap-2">
          <div>
            <span className="text-[15px] font-semibold md:text-base">
              {formatPrice(product.price)}
            </span>
            <p className="mt-0.5 whitespace-nowrap text-[11px] text-ink-soft">
              {installmentLabel(product.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addItem(product);
              setAdded(true);
              if (timer.current) clearTimeout(timer.current);
              timer.current = setTimeout(() => setAdded(false), 1400);
            }}
            className="w-full rounded-full bg-ink px-4 py-2.5 text-[12px] font-medium text-white transition-transform duration-300 hover:scale-[1.04] active:scale-[0.97] md:w-auto md:py-2 md:text-[13px]"
          >
            {added ? "Adicionado ✓" : "Adicionar"}
          </button>
        </div>
      </div>
    </article>
  );
}
