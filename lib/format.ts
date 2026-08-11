const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return brl.format(value);
}

/** "12x de R$ 942 sem juros" — parcela arredondada pra cima */
export function installmentLabel(price: number, parts = 12): string {
  return `${parts}x de ${brl.format(Math.ceil(price / parts))} sem juros`;
}
