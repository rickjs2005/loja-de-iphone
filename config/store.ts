/**
 * Dados da loja — troque aqui para adaptar o site a outro cliente
 * sem tocar em nenhum componente.
 */
export const store = {
  name: "LOJA DE IPHONE",
  shortName: "Loja de iPhone",
  tagline: "iPhones novos e seminovos, com garantia da loja.",

  whatsapp: {
    // formato internacional, só dígitos — usado no wa.me.
    // Número fictício e inválido (demo): troque pelo WhatsApp real do cliente.
    number: "5511000000000",
    display: "(11) 0000-0000",
  },

  instagram: {
    handle: "@sua.loja",
    // Placeholder (demo): não aponta para nenhuma conta real.
    url: "https://www.instagram.com/",
    followers: "12,4 mil",
  },

  address: {
    street: "Centro",
    city: "Santana do Manhuaçu",
    state: "MG",
    cep: "36940-000",
  },

  hours: "Seg a Sáb · 9h às 18h",

  stats: {
    devicesSold: 300,
    since: "2019",
  },

  legal:
    "Demonstração fictícia, sem afiliação com a Apple Inc. Apple, iPhone, iPad, Mac, AirPods e Apple Watch são marcas da Apple Inc. Produtos, preços e contatos apresentados são ilustrativos.",
} as const;

export const fullAddress = `${store.address.street}, ${store.address.city} - ${store.address.state}, ${store.address.cep}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=15&output=embed`;
