// This is your storefront. Each ticket adds a piece to it.
// Start with tickets/day-1/1.1-product-type-and-card.md
import { Navbar } from "./components/Navbar";
import { products } from "./data/products";
import { ProductSection } from "./components/ProductSection";
import { Footer } from "./components/Footer";
import { StatsBar } from "./components/StatsBar";
import { groupByCategory } from "./utils/groupByCategory";

function App() {
  const groupedProducts = groupByCategory(products);
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 p-8">
        <StatsBar products={products} />

        <h2 className="mt-1 text-2xl font-bold">Shop by Category</h2>
        {Object.entries(groupedProducts).map(([category, categoryProducts]) => {
          return (
            <ProductSection
              key={category}
              title={category[0].toUpperCase() + category.slice(1).toLowerCase()}
              count={categoryProducts.length}
              products={categoryProducts}
            />
          );
        })}

      </main>
      <Footer companyName="SummitGear Market" />
    </>
  );
}

export default App;
