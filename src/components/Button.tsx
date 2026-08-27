import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex h-12 items-center justify-center rounded-[6px] px-6 text-sm font-medium transition-colors duration-200";
const variants = {
  primary: "bg-ink text-ivory hover:bg-ink/90",
  secondary: "border border-ink/25 text-ink hover:border-ink/50",
};

export function Button({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
