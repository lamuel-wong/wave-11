const links = [
  { label: "Shop", href: "/" },
  { label: "Favorites", href: "/favorites" },
  { label: "Cart", href: "/cart" },
];

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center gap-2 text-green-800 font-bold">
        <h1 className="text-3xl font-bold">SummitGear Market</h1>
      </div>
      <div className="flex items-center gap-6 text-sm text-gray-600">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};
