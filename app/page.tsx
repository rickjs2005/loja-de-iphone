import { accessories, ipads, iphones, macs } from "@/data/products";
import { CartProvider } from "@/components/cart-context";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ProductSection from "@/components/product-section";
import ProductModal from "@/components/product-modal";
import CartDrawer from "@/components/cart-drawer";
import WhatsAppButton from "@/components/whatsapp-button";
import InstagramSection from "@/components/instagram-section";
import StoreSection from "@/components/store-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />

        <ProductSection
          id="iphones"
          title="Escolha seu iPhone"
          subtitle="Novos lacrados ou seminovos revisados — todos com bateria conferida e garantia da loja."
          products={iphones}
          withConditionFilter
          columns={4}
        />

        <ProductSection
          id="mac"
          title="Mac"
          subtitle="Desempenho pra trabalhar, criar e estudar — do dia a dia ao projeto pesado."
          products={macs}
          columns={2}
          tinted
        />

        <ProductSection
          id="ipad"
          title="iPad"
          subtitle="A tela que vira caderno, estúdio e cinema."
          products={ipads}
          columns={4}
        />

        <ProductSection
          id="acessorios"
          title="Acessórios"
          subtitle="Fones, relógios e carga rápida — o que completa o seu setup."
          products={accessories}
          columns={3}
          tinted
        />

        <InstagramSection />
        <StoreSection />
      </main>

      <Footer />
      <ProductModal />
      <CartDrawer />
      <WhatsAppButton />
    </CartProvider>
  );
}
