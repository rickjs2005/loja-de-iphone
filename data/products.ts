export type Category = "iphone" | "mac" | "ipad" | "accessory";

export type Product = {
  id: string;
  category: Category;
  name: string;
  /** capacidade, tamanho ou subcategoria exibida logo abaixo do nome */
  variant?: string;
  condition?: "new" | "used";
  /** 0–100, só para iPhones */
  batteryHealth?: number;
  price: number;
  description: string;
  image: string;
  /** linhas extras exibidas no modal do produto */
  specs?: string[];
};

export const products: Product[] = [
  // ── iPhones ──────────────────────────────────────────────
  {
    id: "iphone-17-pro-max",
    category: "iphone",
    name: "iPhone 17 Pro Max",
    variant: "256 GB",
    condition: "new",
    batteryHealth: 100,
    price: 11299,
    description:
      "O topo de linha. Tela de 6,9”, chip A19 Pro e a câmera mais avançada que já colocamos na vitrine.",
    image: "/images/products/iphone-17-pro-max.webp",
    specs: ["Lacrado, com nota fiscal", "Garantia Apple de 1 ano", "Tela Super Retina XDR de 6,9”"],
  },
  {
    id: "iphone-17-pro",
    category: "iphone",
    name: "iPhone 17 Pro",
    variant: "256 GB",
    condition: "new",
    batteryHealth: 100,
    price: 9999,
    description:
      "Desempenho profissional, corpo em titânio e câmera tripla de 48 MP. O favorito de quem trabalha com o celular.",
    image: "/images/products/iphone-17-pro.webp",
    specs: ["Lacrado, com nota fiscal", "Garantia Apple de 1 ano", "Tela Super Retina XDR de 6,3”"],
  },
  {
    id: "iphone-17-air",
    category: "iphone",
    name: "iPhone 17 Air",
    variant: "256 GB",
    condition: "new",
    batteryHealth: 100,
    price: 8799,
    description:
      "O iPhone mais fino já feito. Quase não pesa na mão — e não deve nada no desempenho.",
    image: "/images/products/iphone-17-air.webp",
    specs: ["Lacrado, com nota fiscal", "Garantia Apple de 1 ano", "5,6 mm de espessura"],
  },
  {
    id: "iphone-17",
    category: "iphone",
    name: "iPhone 17",
    variant: "256 GB",
    condition: "new",
    batteryHealth: 100,
    price: 7499,
    description:
      "A nova geração pra quem quer o essencial bem feito: tela de 120 Hz, câmera dupla e bateria pro dia inteiro.",
    image: "/images/products/iphone-17.webp",
    specs: ["Lacrado, com nota fiscal", "Garantia Apple de 1 ano", "Tela de 6,3” com ProMotion"],
  },
  {
    id: "iphone-16-pro",
    category: "iphone",
    name: "iPhone 16 Pro",
    variant: "256 GB",
    condition: "used",
    batteryHealth: 96,
    price: 5999,
    description:
      "Seminovo revisado, sem marcas de uso. Desempenho Pro por um preço que faz sentido.",
    image: "/images/products/iphone-16-pro.webp",
    specs: ["Revisado peça a peça", "90 dias de garantia da loja", "Acompanha cabo e caixa"],
  },
  {
    id: "iphone-16",
    category: "iphone",
    name: "iPhone 16",
    variant: "128 GB",
    condition: "new",
    batteryHealth: 100,
    price: 4999,
    description:
      "Lacrado, com nota e garantia Apple. O melhor custo-benefício da linha atual.",
    image: "/images/products/iphone-16.webp",
    specs: ["Lacrado, com nota fiscal", "Garantia Apple de 1 ano", "Botão de Ação e câmera de 48 MP"],
  },
  {
    id: "iphone-15-pro",
    category: "iphone",
    name: "iPhone 15 Pro",
    variant: "256 GB",
    condition: "used",
    batteryHealth: 89,
    price: 4699,
    description:
      "Titânio, câmera tripla e muito fôlego pra anos de uso. Revisado e testado ponto a ponto.",
    image: "/images/products/iphone-15-pro.webp",
    specs: ["Revisado peça a peça", "90 dias de garantia da loja", "Acompanha cabo e caixa"],
  },
  {
    id: "iphone-15",
    category: "iphone",
    name: "iPhone 15",
    variant: "128 GB",
    condition: "used",
    batteryHealth: 92,
    price: 3499,
    description:
      "A porta de entrada da linha, com Dynamic Island e USB-C. Seminovo impecável.",
    image: "/images/products/iphone-15.webp",
    specs: ["Revisado peça a peça", "90 dias de garantia da loja", "Acompanha cabo e caixa"],
  },

  // ── Mac ──────────────────────────────────────────────────
  {
    id: "macbook-air",
    category: "mac",
    name: "MacBook Air 13”",
    variant: "M4 · 16 GB · 256 GB",
    price: 9499,
    description:
      "Silencioso, leve e absurdamente rápido. A máquina certa pra estudar, trabalhar e levar pra todo lado.",
    image: "/images/products/macbook-air.webp",
    specs: ["Chip Apple M4", "16 GB de memória unificada", "SSD de 256 GB", "Até 18h de bateria"],
  },
  {
    id: "macbook-pro",
    category: "mac",
    name: "MacBook Pro 14”",
    variant: "M4 Pro · 24 GB · 512 GB",
    price: 17499,
    description:
      "Pra quem edita, compila e renderiza. Tela Liquid Retina XDR e potência de sobra pra projeto pesado.",
    image: "/images/products/macbook-pro.webp",
    specs: ["Chip Apple M4 Pro", "24 GB de memória unificada", "SSD de 512 GB", "Tela Liquid Retina XDR"],
  },

  // ── iPad ─────────────────────────────────────────────────
  {
    id: "ipad",
    category: "ipad",
    name: "iPad",
    variant: "128 GB · Wi-Fi",
    price: 3299,
    description: "O iPad de todo dia: aula, série, desenho e anotação num aparelho só.",
    image: "/images/products/ipad.webp",
    specs: ["Tela Liquid Retina de 11”", "Wi-Fi 6", "Compatível com Apple Pencil"],
  },
  {
    id: "ipad-mini",
    category: "ipad",
    name: "iPad mini",
    variant: "128 GB · Wi-Fi",
    price: 4799,
    description: "Cabe na mão e no bolso do casaco. O tamanho perfeito pra ler e anotar.",
    image: "/images/products/ipad-mini.webp",
    specs: ["Tela de 8,3”", "Wi-Fi 6E", "Compatível com Apple Pencil Pro"],
  },
  {
    id: "ipad-air",
    category: "ipad",
    name: "iPad Air 11”",
    variant: "128 GB · Wi-Fi",
    price: 5799,
    description: "O equilíbrio da linha: chip M3, leve e pronto pra produtividade séria.",
    image: "/images/products/ipad-air.webp",
    specs: ["Chip Apple M3", "Tela Liquid Retina de 11”", "Compatível com Apple Pencil Pro"],
  },
  {
    id: "ipad-pro",
    category: "ipad",
    name: "iPad Pro 11”",
    variant: "256 GB · Wi-Fi + Cellular",
    price: 10999,
    description: "Tela OLED, chip M5 e desempenho de notebook num tablet finíssimo.",
    image: "/images/products/ipad-pro.webp",
    specs: ["Chip Apple M5", "Tela Ultra Retina XDR", "Wi-Fi 7 + 5G"],
  },

  // ── Acessórios ───────────────────────────────────────────
  {
    id: "airpods-pro",
    category: "accessory",
    name: "AirPods Pro 3",
    variant: "Fones",
    price: 2199,
    description: "Cancelamento de ruído que desliga o mundo. O par que mais sai da loja.",
    image: "/images/products/airpods-pro.webp",
    specs: ["Cancelamento ativo de ruído", "Áudio espacial", "Estojo com carregamento MagSafe"],
  },
  {
    id: "airpods",
    category: "accessory",
    name: "AirPods 4",
    variant: "Fones",
    price: 1299,
    description: "O dia a dia sem fio: pareou, tocou. Ajuste aberto e confortável.",
    image: "/images/products/airpods.webp",
    specs: ["Chip H2", "Estojo com carregamento USB-C", "Resistência a suor e água"],
  },
  {
    id: "apple-watch",
    category: "accessory",
    name: "Apple Watch Series 11",
    variant: "Relógios",
    price: 3999,
    description: "Saúde, treino e notificação no pulso — combinando com o resto do setup.",
    image: "/images/products/apple-watch.webp",
    specs: ["GPS", "Caixa de alumínio de 46 mm", "Monitoramento de saúde completo"],
  },
  {
    id: "apple-watch-ultra",
    category: "accessory",
    name: "Apple Watch Ultra 3",
    variant: "Relógios",
    price: 8999,
    description: "Titânio, 36 horas de bateria e GPS de precisão pra treino sério.",
    image: "/images/products/apple-watch-ultra.webp",
    specs: ["Caixa de titânio de 49 mm", "Até 36h de bateria", "Resistência de mergulho a 40 m"],
  },
  {
    id: "magsafe",
    category: "accessory",
    name: "Carregador MagSafe",
    variant: "Carregadores",
    price: 399,
    description: "Encostou, carregou. Alinhamento magnético perfeito, todas as noites.",
    image: "/images/products/magsafe.webp",
    specs: ["Carregamento sem fio de até 25 W", "Cabo USB-C integrado de 1 m"],
  },
  {
    id: "carregador-usb-c",
    category: "accessory",
    name: "Adaptador 20 W + cabo USB-C",
    variant: "Cabos e adaptadores",
    price: 249,
    description: "O combo que resolve: carga rápida pra iPhone e iPad com cabo trançado.",
    image: "/images/products/carregador-usb-c.webp",
    specs: ["Adaptador USB-C de 20 W", "Cabo trançado de 1 m"],
  },
];

export const iphones = products.filter((p) => p.category === "iphone");
export const macs = products.filter((p) => p.category === "mac");
export const ipads = products.filter((p) => p.category === "ipad");
export const accessories = products.filter((p) => p.category === "accessory");
