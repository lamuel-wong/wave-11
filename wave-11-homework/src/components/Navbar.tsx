const links = [
  { label: "Shop", href: "/" },
  { label: "Favorites", href: "/favorites" },
  { label: "Cart", href: "/cart" },
];

export const Navbar = ({
  theme,
  setTheme,
}: {
  theme: ("light" | "dark");
  setTheme: (value: "light" | "dark") => void;
}) => {
  return (
    <nav className="flex items-center justify-between bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center gap-2 text-green-800 font-bold dark:text-emerald-300">
        <h1 className="text-3xl font-bold">SummitGear Market</h1>
      </div>
      <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <button
          className="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
          onClick={() =>
            theme === "light" ? setTheme("dark") : setTheme("light")
          }
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};
