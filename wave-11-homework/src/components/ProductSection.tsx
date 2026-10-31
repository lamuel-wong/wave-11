import type { Product } from "../types/product.ts";
import { ProductGrid } from "./ProductGrid";

export const ProductSection = ({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) => {
  const visibleProducts = products.slice(0, 4);
  const remainingProducts = products.length - visibleProducts.length;
  return (
    <section className="mb-12">
      <h2 className="mt-1 text-2xl font-bold">{title}</h2>
      <ProductGrid products={visibleProducts} />
      {remainingProducts > 0 && (
        <div>
          <hr className="my-4 border-0 border-t border-dashed border-gray-300" />
          <p className="text-center text-sm italic text-gray-400">... {remainingProducts} more products continue in this list</p>
        </div>
      )}
    </section>
  );
};
