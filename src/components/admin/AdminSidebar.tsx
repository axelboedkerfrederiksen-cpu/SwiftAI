"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Building2, Gauge, LayoutDashboard } from "lucide-react";

const links = [
  { href: "/admin", label: "Overblik", icon: LayoutDashboard },
  { href: "/admin/virksomheder", label: "Virksomheder", icon: Building2 },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/driftstatus", label: "Driftstatus", icon: Gauge },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-gray-800 bg-gray-950/80 p-4 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:p-6">
      <p className="mb-6 text-lg font-semibold text-white">Admin</p>
      <nav className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-blue-500/20 text-blue-300"
                  : "text-gray-300 hover:bg-gray-900 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
