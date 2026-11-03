import { products } from "../data/products";
import { ProductSection } from "./ProductSection";

export const SearchBar = ({
  search,
  onSearchChange,
  favouriteIds,
  onToggleFavourites,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  favouriteIds: number[];
  onToggleFavourites: (id: number) => void;
}) => {
  const searchResult = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute mb-4 inset-y-0 left-5 flex items-center text-xl"
        >
          🔍
        </span>
        <input
          type="search"
          aria-label="Search products"
          placeholder="Search products..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-2xl border-2 border-gray-300 bg-white mb-4 py-4 pr-5 pl-12 text-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:border-emerald-800 focus:ring-4 focus:ring-emerald-100 focus:outline-none dark:border-emerald-800 dark:bg-gray-800 dark:focus:ring-emerald-900"
        />
      </div>
      {search.trim().length > 0 && (
        <>
          <p className="mt-3 mb-6 text-sm text-gray-500">
            Showing {searchResult.length} of {products.length} products
          </p>
          <ProductSection
            count={searchResult.length}
            products={searchResult}
            favouriteIds={favouriteIds}
            onToggleFavourites={onToggleFavourites}
          ></ProductSection>{" "}
        </>
      )}
    </>
  );
};
