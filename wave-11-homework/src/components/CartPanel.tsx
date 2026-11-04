import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";
import { EmptyState } from "./EmptyState";
export const CartPanel = ({
  isCartOpen,
  onClose,
  cartCount,
  cart,
  addToCart,
  deductItem,
  removeItem,
}: {
  isCartOpen: boolean;
  onClose: () => void;
  cartCount: number;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  deductItem: (productId: number) => void;
  removeItem: (productId: number) => void;
}) => {
  const cartSubtotal = cart.reduce(
    (acc, item) => (acc += item.quantity * item.product.price),
    0,
  );

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-gray-950/45 transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        aria-label="Your cart"
        inert={!isCartOpen}
        className={`fixed inset-y-0 right-0 z-50 flex h-dvh w-full max-w-lg flex-col border-l border-gray-200 bg-white text-gray-950 shadow-2xl transition-transform duration-300 motion-reduce:transition-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <h2 className="text-xl font-bold">
            Your cart <span>({cartCount})</span>
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={onClose}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 sm:px-6">
          {cartCount > 0 ? (
            cart.map((item) => {
              return (
                <div key={item.product.id}>
                  <div
                    className="flex gap-3 border-b border-gray-100 py-5 dark:border-gray-800"
                  >
                    <img
                      className="size-16 shrink-0 self-start rounded-xl bg-slate-100 object-contain sm:size-18 dark:bg-gray-800"
                      src={item.product.thumbnail}
                      alt={item.product.title}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold sm:text-base">
                        {item.product.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        ${item.product.price.toFixed(2)} each
                        {item.quantity >= item.product.stock && (
                          <span className="font-semibold text-amber-700 dark:text-amber-400">
                            {" "}
                            · max reached
                          </span>
                        )}
                      </p>
                      <div className="mt-2 inline-flex items-center overflow-hidden rounded-lg border border-slate-300 dark:border-gray-600">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.product.title}`}
                          onClick={() => deductItem(item.product.id)}
                          className="size-8 cursor-pointer text-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          −
                        </button>
                        <span className="flex h-8 min-w-9 items-center justify-center border-x border-slate-300 px-2 text-sm font-bold dark:border-gray-600">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.product.title}`}
                          onClick={() => addToCart(item.product)}
                          disabled={item.quantity >= item.product.stock}
                          className="size-8 cursor-pointer text-lg font-bold enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-slate-300 dark:enabled:hover:bg-gray-800 dark:disabled:text-gray-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold sm:text-base">
                        ${(item.quantity * item.product.price).toFixed(2)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="mt-3 cursor-pointer text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState message="Your cart is empty" icon="🛒" description="Add something you love from the shop."/>
          )}
        </div>
        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-gray-200 bg-white px-6 py-6 text-lg font-bold dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
          <h2>Subtotal</h2>
          <p>${cartSubtotal.toFixed(2)}</p>
        </div>
      </aside>
    </>
  );
};
