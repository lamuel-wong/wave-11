// This is your storefront. Each ticket adds a piece to it.
// Start with tickets/day-1/1.1-product-type-and-card.md
import { Navbar } from "./components/Navbar";
import { products } from "./data/products";
import { ProductSection } from "./components/ProductSection";
import { StatsBar } from "./components/StatsBar";
import { groupByCategory } from "./utils/groupByCategory";
import { Footer } from "./components/Footer";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar";



function App() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const under20 = products.filter((product) => product.price < 20);
  const topRated = products.filter(
    (product) => product.rating >= 4.5 && product.stock > 0,
  );
  const furniture = products.filter(
    (product) => product.category === "furniture",
  );
  const luxury = products.filter((product) => product.price > 5000);
  const groupedProducts = groupByCategory(products);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <Navbar theme={theme} setTheme={setTheme}/>
      <main className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900 dark:text-gray-100">
        <SearchBar search={search} onSearchChange={setSearch} />


        {search.trim().length === 0 && (
          <>
            <StatsBar products={products} />

            <ProductSection
              title="Deals under $20"
              products={under20}
              count={under20.length}
            />
            <ProductSection
              title="Top Rated"
              products={topRated}
              count={topRated.length}
            />
            <ProductSection
              title="Furniture"
              products={furniture}
              count={furniture.length}
            />
            <ProductSection
              title="Luxury (over $5,000)"
              products={luxury}
              count={luxury.length}
            />

            <h2 className="mt-1 text-2xl font-bold">Shop by Category</h2>
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => {
              return (
                <ProductSection
                  key={category}
                  title={
                    category[0].toUpperCase() + category.slice(1).toLowerCase()
                  }
                  count={categoryProducts.length}
                  products={categoryProducts}
                />
              );
            })}
          </>
        )}


      </main>
      <Footer companyName="SummitGear Market" />
    </div>
  );
}

export default App;
