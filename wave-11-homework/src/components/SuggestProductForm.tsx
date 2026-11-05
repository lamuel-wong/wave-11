import { useState } from "react";
import type { FormEvent } from "react";
import { products } from "../data/products";
import { groupByCategory } from "../utils/groupByCategory";

type Suggestion = {
  name: string;
  category: string;
  reason: string;
};

export const SuggestProductForm = () => {
  const groupedProducts = groupByCategory(products);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const maxChar = 200;
  const [errors, setErrors] = useState({ name: "", reason: "" });

  const [form, setForm] = useState<Suggestion>({
    name: "",
    category: "",
    reason: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = {
      name: !form.name.trim() ? "Enter a product name." : "",
      reason: !form.reason.trim() ? "Enter a reason." : "",
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.reason) return;

    setSuggestions([...suggestions, form]);
    setForm({ name: "", category: "", reason: "" });
  };

  const fieldClass = (error = "") =>
    `mt-2 block w-full rounded-xl border px-3 py-3 font-normal text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-2 dark:text-gray-100 ${
      error
        ? "border-red-500 bg-red-50 focus:ring-red-200 dark:border-red-400 dark:bg-red-950/30 dark:focus:ring-red-900"
        : "border-gray-300 bg-white focus:border-emerald-700 focus:ring-emerald-100 dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-emerald-900"
    }`;

  return (
    <div className="mx-auto my-8 w-full max-w-3xl text-gray-950 dark:text-gray-100">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-2xl font-bold">Suggest a product</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Tell us what you'd like to see in the store.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {(errors.name || errors.reason) && (
            <p
              role="alert"
              className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
            >
              Please complete the highlighted fields below.
            </p>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              Product name
              <input
                type="text"
                placeholder="e.g. Camping tent"
                value={form.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "suggestion-name-error" : undefined
                }
                className={fieldClass(errors.name)}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <span
                  id="suggestion-name-error"
                  className="mt-2 block text-sm text-red-600 dark:text-red-400"
                >
                  {errors.name}
                </span>
              )}
            </label>
            <label className="block text-sm font-semibold">
              Category
              <select
                className={fieldClass()}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {Object.keys(groupedProducts).map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold">
              Why should we carry it?
              <textarea
                rows={4}
                className={`${fieldClass(errors.reason)} resize-y`}
                aria-invalid={Boolean(errors.reason)}
                aria-describedby={
                  errors.reason ? "suggestion-reason-error" : undefined
                }
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                maxLength={maxChar}
              />
              {errors.reason && (
                <span
                  id="suggestion-reason-error"
                  className="mt-2 block text-sm text-red-600 dark:text-red-400"
                >
                  {errors.reason}
                </span>
              )}
            </label>
            <p className="mt-2 text-right text-sm tabular-nums text-gray-500 dark:text-gray-400">
              {form.reason.length} / {maxChar}
            </p>
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-emerald-800 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:bg-emerald-400 dark:text-gray-950 dark:hover:bg-emerald-300"
          >
            Submit suggestion
          </button>
        </form>
      </section>
      {suggestions.length > 0 && (
        <section
          className="mt-8"
          aria-labelledby="submitted-suggestions-heading"
        >
          <h2 id="submitted-suggestions-heading" className="text-xl font-bold">
            Suggestions ({suggestions.length})
          </h2>
          <ul className="mt-4 space-y-3">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="break-words font-semibold">
                    {suggestion.name}
                  </h3>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-gray-700 dark:text-gray-300">
                    {suggestion.category || "Uncategorized"}
                  </span>
                </div>
                <p className="mt-2 whitespace-pre-wrap break-words text-sm text-gray-600 dark:text-gray-300">
                  {suggestion.reason}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
