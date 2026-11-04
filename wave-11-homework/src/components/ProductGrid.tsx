import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";

export const ProductGrid = ({
  products,
  favouriteIds,
  onToggleFavourites,
  cart,
  addToCart,
}: {
  products: Product[];
  favouriteIds: number[];
  onToggleFavourites: (id: number) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
}) => {
  if (products.length === 0) {
    return <EmptyState message="No products here yet" />;
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => {
        const cartQuantity =
          cart.find((item) => item.product.id === product.id)?.quantity ?? 0;

        return (
          <ProductCard
            key={product.id}
            product={product}
            isFavourite={favouriteIds.includes(product.id)}
            onToggleFavourites={onToggleFavourites}
            cartQuantity={cartQuantity}
            addToCart={addToCart}
          />
        );
      })}
    </div>
  );
};
