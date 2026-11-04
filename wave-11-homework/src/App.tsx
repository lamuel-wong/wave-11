import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { CartPanel } from "./components/CartPanel";
import { products } from "./data/products";
import type { CartItem } from "./types/cart";
import { ProductSection } from "./components/ProductSection";
import { SearchBar } from "./components/SearchBar";
import { StatsBar } from "./components/StatsBar";
import { groupByCategory } from "./utils/groupByCategory";
import { Footer } from "./components/Footer";
import type { Product } from "./types/product";

function App() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [favouriteIds, setFavouriteIds] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartPanelToggle, setCartPanelToggle] = useState<boolean>(false);

  const under20 = products.filter((product) => product.price < 20);
  const topRated = products.filter(
    (product) => product.rating >= 4.5 && product.stock > 0,
  );
  const furniture = products.filter(
    (product) => product.category === "furniture",
  );
  const luxury = products.filter((product) => product.price > 5000);
  const groupedProducts = groupByCategory(products);

  const onToggleFavourites = (id: number) => {
    setFavouriteIds(
      favouriteIds.includes(id)
        ? favouriteIds.filter((productId) => productId !== id)
        : [...favouriteIds, id],
    );
  };

  const addToCart = (product: Product) => {
    // Update cart if item exists, else add item
    const found = cart.find((item) => item.product.id === product.id);
    if (found) {
      if (found.product.stock > found.quantity) {
        setCart(
          cart.map((item) =>
            item === found ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        );
      }
    } else if (product.stock > 0) {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeItem = (productId: number) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const deductItem = (productId: number) => {
    const found = cart.find((item) => item.product.id === productId);
    if (found) {
      if (found.quantity > 1) {
        setCart(
          cart.map((item) =>
            item === found ? { ...item, quantity: item.quantity - 1 } : item,
          ),
        );
      } else {
        removeItem(found.product.id);
      }
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <Navbar
        theme={theme}
        setTheme={setTheme}
        favouriteCount={favouriteIds.length}
        cartCount={cartCount}
        onOpenCart={() => setCartPanelToggle(true)}
      />
      <main className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900 dark:text-gray-100">
        <SearchBar
          search={search}
          onSearchChange={setSearch}
          favouriteIds={favouriteIds}
          onToggleFavourites={onToggleFavourites}
          cart={cart}
          addToCart={addToCart}
        />

        <CartPanel
        isCartOpen={cartPanelToggle}
          onClose={() => setCartPanelToggle(false)}
          cartCount={cartCount}
          cart={cart}
          addToCart={addToCart}
          deductItem={deductItem}
          removeItem={removeItem}
        />

        {search.trim().length === 0 && (
          <>
            <StatsBar products={products} />

            <ProductSection
              title="Deals under $20"
              products={under20}
              count={under20.length}
              favouriteIds={favouriteIds}
              onToggleFavourites={onToggleFavourites}
              cart={cart}
              addToCart={addToCart}
            />
            <ProductSection
              title="Top Rated"
              products={topRated}
              count={topRated.length}
              favouriteIds={favouriteIds}
              onToggleFavourites={onToggleFavourites}
              cart={cart}
              addToCart={addToCart}
            />
            <ProductSection
              title="Furniture"
              products={furniture}
              count={furniture.length}
              favouriteIds={favouriteIds}
              onToggleFavourites={onToggleFavourites}
              cart={cart}
              addToCart={addToCart}
            />
            <ProductSection
              title="Luxury (over $5,000)"
              products={luxury}
              count={luxury.length}
              favouriteIds={favouriteIds}
              onToggleFavourites={onToggleFavourites}
              cart={cart}
              addToCart={addToCart}
            />

            <h2 className="mt-1 text-2xl font-bold">Shop by Category</h2>
            {Object.entries(groupedProducts).map(
              ([category, categoryProducts]) => {
                return (
                  <ProductSection
                    key={category}
                    title={
                      category[0].toUpperCase() +
                      category.slice(1).toLowerCase()
                    }
                    products={categoryProducts}
                    count={categoryProducts.length}
                    favouriteIds={favouriteIds}
                    onToggleFavourites={onToggleFavourites}
                    cart={cart}
                    addToCart={addToCart}
                  />
                );
              },
            )}
          </>
        )}
      </main>
      <Footer companyName="SummitGear Market" />
    </div>
  );
}

export default App;
