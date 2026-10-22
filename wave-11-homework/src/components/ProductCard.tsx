import type { Product } from "../types/product";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-xl my-4 border border-gray-200 bg-white shadow-sm">
      <div className="relative">
        <img
          className="aspect-square w-full bg-gray-100 object-contain"
          src={product.thumbnail}
          alt={product.title}
        ></img>
        {product.stock < 10 && (
          <span className="absolute border top-2 left-2 rounded-xl bg-yellow-100 px-2 py-1 text-sm text-yellow-800 font-bold">
            Low stock
          </span>
        )}
      </div>
      <div className="p-3">
        {product.brand && (
          <p className="text-md text-gray-500 font-bold uppercase">
            {product.brand}
          </p>
        )}
        <h2 className="mt-1 text-lg font-bold">{product.title}</h2>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-green-700">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">★ {product.rating.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
};
