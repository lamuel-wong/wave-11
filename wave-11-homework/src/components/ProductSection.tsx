import type { Product } from "../types/product.ts";
import { ProductGrid } from "./ProductGrid";
import type { CartItem } from "../types/cart.ts";

export const ProductSection = ({
  title = "",
  count,
  products,
  favouriteIds,
  onToggleFavourites,
  cart,
  addToCart,
}: {
  title?: string;
  count: number;
  products: Product[];
  favouriteIds: number[];
  onToggleFavourites: (id: number) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
}) => {
  return (
    <section className="mb-12">
      {title && (
        <h2 className="mt-1 text-2xl font-bold">
          {title}
          <span className="text-lg font-normal text-gray-500"> ({count})</span>
        </h2>
      )}
      <ProductGrid
        products={products}
        favouriteIds={favouriteIds}
        onToggleFavourites={onToggleFavourites}
        cart={cart}
        addToCart={addToCart}
      />
      {/* {products.length > 0 && (
        <div>
          <hr className="my-4 border-0 border-t border-dashed border-gray-300" />
        </div>
      )} */}
    </section>
  );
};
