"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Operation Deck" },
  { href: "/reroute", label: "Rerouter" },
  { href: "/marketplace", label: "Alternatives" },
  { href: "/hedge", label: "Hedge" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-steel/20 bg-abyss2/60">
      <div className="px-5 pt-6 pb-5 border-b border-steel/20">
        <div className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 17 L12 4 L21 17" stroke="#E0932C" strokeWidth="1.6" fill="none" />
            <circle cx="12" cy="17" r="2.4" fill="#E0932C" />
          </svg>
          <span className="font-display font-semibold text-chart tracking-tight text-[15px]">
            Hormuz Shield
          </span>
        </div>
        <p className="label-eyebrow text-mist mt-2">Continuity Ops Console</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-signal/10 text-signal border-l-2 border-signal"
                  : "text-mist border-l-2 border-transparent hover:text-chart hover:bg-steel/10"
              }`}
            >
              <span className="font-body">{item.label}</span>
            </Link>
          );
        })}
      </nav>


    </aside>
  );
}
