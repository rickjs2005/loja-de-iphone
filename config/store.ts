/**
 * Dados da loja — troque aqui para adaptar o site a outro cliente
 * sem tocar em nenhum componente.
 */
export const store = {
  name: "LOJA DE IPHONE",
  shortName: "Loja de iPhone",
  tagline: "iPhones novos e seminovos, com garantia da loja.",

  whatsapp: {
    // formato internacional, só dígitos — usado no wa.me
    number: "5533987654321",
    display: "+55 33 98765-4321",
  },

  instagram: {
    handle: "@lojadeiphone",
    url: "https://instagram.com/lojadeiphone",
    followers: "12,4 mil",
  },

  address: {
    street: "Rua Vicente de Flores de Fucio, 288",
    city: "Santana do Manhuaçu",
    state: "MG",
    cep: "36940-000",
  },

  hours: "Seg a Sáb · 9h às 18h",

  legal: "Produtos e preços apresentados nesta demonstração são ilustrativos.",
} as const;

export const fullAddress = `${store.address.street}, ${store.address.city} - ${store.address.state}, ${store.address.cep}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=15&output=embed`;
