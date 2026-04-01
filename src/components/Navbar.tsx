"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Pakker", href: "#pakker" },
  { label: "Sådan virker det", href: "#hvordan" },
  { label: "Om mig", href: "#om" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-gray-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-bold tracking-tight text-white">
          AI Business Upgrade
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Book en gratis demo
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-400 transition-colors hover:text-white md:hidden"
          aria-label={open ? "Luk menu" : "Åbn menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/5 bg-gray-950/95 px-6 pb-6 pt-4 backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-gray-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-blue-400"
          >
            Book en gratis demo
          </a>
        </div>
      )}
    </nav>
  );
}
