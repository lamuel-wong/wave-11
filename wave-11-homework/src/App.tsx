// This is your storefront. Each ticket adds a piece to it.
// Start with tickets/day-1/1.1-product-type-and-card.md
import { Navbar } from "./components/Navbar";
import { ProductGrid } from "./components/ProductGrid";
import { products } from "./data/products";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 p-8">
        <ProductGrid products={products} />
      </main>
      <Footer companyName="SummitGear Market" />
    </>
  );
}

export default App;
