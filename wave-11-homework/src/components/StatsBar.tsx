import type { Product } from "../types/product";

export const StatsBar = ({ products }: { products: Product[] }) => {
  const totalStock = products.reduce((acc, product) => acc + product.stock, 0);

  const totalInventoryValue = products.reduce(
    (acc, product) => acc + product.price * product.stock,
    0,
  );

  const averageRating =
    products.length > 0
      ? products.reduce((acc, product) => acc + product.rating, 0) /
        products.length
      : 0;

  const lowStockProducts = products.reduce(
    (acc, product) => (product.stock < 10 ? acc + 1 : acc),
    0,
  );

  return (
    <div className="flex flex-col gap-4 mb-8 md:flex-row">
      <div className="w-full overflow-hidden rounded-xl p-6 border border-gray-200 bg-white shadow-sm">
        <h2 className="text-md text-gray-500 font-bold uppercase">
          Units in Stock
        </h2>
        <p className="mt-1 text-2xl font-bold">
          {totalStock.toLocaleString("en-US")}
        </p>
      </div>
      <div className="w-full overflow-hidden rounded-xl p-6 border border-gray-200 bg-white shadow-sm">
        <h2 className="text-md text-gray-500 font-bold uppercase">
          Inventory Value
        </h2>
        <p className="mt-1 text-2xl font-bold">
          {totalInventoryValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <div className="w-full overflow-hidden rounded-xl p-6 border border-gray-200 bg-white shadow-sm">
        <h2 className="text-md text-gray-500 font-bold uppercase">
          Average Rating
        </h2>
        <p className="mt-1 text-2xl font-bold">★ {averageRating.toFixed(1)}</p>
      </div>
      <div className="w-full overflow-hidden rounded-xl p-6 border border-gray-200 bg-white shadow-sm">
        <h2 className="text-md text-gray-500 font-bold uppercase">Low Stock</h2>
        <p className="mt-1 text-2xl font-bold text-amber-700">
          {lowStockProducts} products
        </p>
      </div>
    </div>
  );
};
