import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";

export const ProductGrid = ({ products }: { products: Product[] }) => {
  if (products.length === 0) {
    return <EmptyState message="No products here yet"/>
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
