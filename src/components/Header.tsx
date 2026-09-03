import Link from "next/link";
import { CartIndicator } from "./CartIndicator";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/shop", label: "Shop collection" },
  { href: "/#story", label: "Our story" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-ivory/95 backdrop-blur-sm">
      <div className="relative mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 md:px-10">
        <Link href="/" aria-label="Floréa home">
          <Logo variant="compact" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CartIndicator />
          <Link
            href="/shop"
            className="hidden h-12 items-center rounded-[6px] bg-ink px-5 text-sm font-medium text-ivory transition-colors duration-200 hover:bg-ink/90 sm:inline-flex"
          >
            Order now
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
