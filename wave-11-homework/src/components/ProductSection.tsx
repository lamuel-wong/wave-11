import type { Product } from "../types/product.ts";
import { ProductGrid } from "./ProductGrid";

export const ProductSection = ({
  title,
  count,
  products,
}: {
  title: string;
  count: number;
  products: Product[];
}) => {
  return (
    <section className="mb-12">
      <h2 className="mt-1 text-2xl font-bold">
        {title} <span className="text-lg font-normal text-gray-500">({count})</span>
      </h2>
      <ProductGrid products={products} />
      {/* {products.length > 0 && (
        <div>
          <hr className="my-4 border-0 border-t border-dashed border-gray-300" />
        </div>
      )} */}
    </section>
  );
};
