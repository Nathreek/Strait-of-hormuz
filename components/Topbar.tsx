import Link from "next/link";

const NAV = [
  { href: "/", label: "Operation Deck" },
  { href: "/reroute", label: "Rerouter" },
  { href: "/marketplace", label: "Alternatives" },
  { href: "/hedge", label: "Hedge" },
  { href: "/product-explanation", label: "Product Explanation" },
];

export default function Topbar() {
  return (
    <div className="md:hidden sticky top-0 z-10 bg-abyss/95 backdrop-blur border-b border-steel/20 px-4 py-3">
      <div className="flex items-center gap-2 mb-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M3 17 L12 4 L21 17" stroke="#E0932C" strokeWidth="1.6" fill="none" />
          <circle cx="12" cy="17" r="2.4" fill="#E0932C" />
        </svg>
        <span className="font-display font-semibold text-chart text-sm">
          Hormuz Shield
        </span>
      </div>
      <nav className="flex gap-4 overflow-x-auto text-xs font-mono text-mist">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="whitespace-nowrap hover:text-signal">
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
