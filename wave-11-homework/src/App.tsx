// This is your storefront. Each ticket adds a piece to it.
// Start with tickets/day-1/1.1-product-type-and-card.md
import { Navbar } from "./components/Navbar";
import { products } from "./data/products";
import { ProductSection } from "./components/ProductSection";
import { Footer } from "./components/Footer";
import { StatsBar } from "./components/StatsBar";

const under20 = products.filter((product) => product.price < 20);
const topRated = products.filter((product) => product.rating >= 4.5 && product.stock > 0);
const furniture = products.filter((product) => product.category === "furniture");
const luxury = products.filter((product) => product.price > 5000);

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 p-8">
        <StatsBar products={products}/>
        <ProductSection title="Deals under $20" products={under20}/>
        <ProductSection title="Top Rated" products={topRated}/>
        <ProductSection title="Furniture" products={furniture}/>
        <ProductSection title="Luxury (over $5,000)" products={luxury}/>
      </main>
      <Footer companyName="SummitGear Market" />
    </>
  );
}

export default App;
