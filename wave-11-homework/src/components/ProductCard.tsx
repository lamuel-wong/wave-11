import type { Product } from "../types/product";

export const ProductCard = ({
  product,
  isFavourite,
  onToggleFavourites,
  cartQuantity,
  addToCart,
}: {
  product: Product;
  isFavourite: boolean;
  onToggleFavourites: (id: number) => void;
  cartQuantity: number;
  addToCart: (product: Product) => void;
}) => {
  let buttonLabel;
  if (cartQuantity >= product.stock) {
  buttonLabel = "Max in cart";
} else if (cartQuantity > 0) {
  buttonLabel = `Add to cart (${cartQuantity} in cart)`;
} else {
  buttonLabel = "Add to cart";
}
  return (
    <div className="w-full overflow-hidden rounded-xl my-4 border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="relative">
        <button
          aria-label={`Favourite ${product.title}`}
          aria-pressed={isFavourite}
          className="text-red-500 flex items-center justify-center cursor-pointer rounded-full px-3 py-2 h-10 w-10 bg-white border border-gray-300 px-3 py-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 absolute top-2 right-2"
          onClick={() => onToggleFavourites(product.id)}
        >
          {isFavourite ? "♥" : "♡"}
        </button>
        <img
          className="aspect-square w-full bg-gray-100 object-contain dark:bg-gray-700"
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
          <p className="text-lg font-bold text-green-700 dark:text-emerald-300">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ★ {product.rating.toFixed(1)}
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={cartQuantity >= product.stock}
            className="mt-4 w-full cursor-pointer rounded-xl bg-emerald-800 px-4 py-3 text-sm font-bold text-white transition-colors enabled:hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 dark:bg-emerald-400 dark:text-gray-950 dark:enabled:hover:bg-emerald-300 dark:focus-visible:outline-emerald-300 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
