import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Roboto } from "next/font/google";
import { Logo } from "@/components/Logo";
import { AdminNav } from "@/components/admin/AdminNav";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Floréa Admin",
  description: "Order and catalog management for Floréa.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory text-ink">
        <div className="border-b border-dusty-rose/40 bg-dusty-rose/10 px-4 py-2 text-center text-xs text-ink/70">
          Preview only — not connected to real orders or a real login yet.
        </div>

        <header className="border-b border-ink/10 bg-white">
          <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 md:px-8">
            <Link href="/admin/orders" className="flex items-center gap-3">
              <Logo variant="compact" className="scale-90" />
              <span className="text-sm font-medium text-ink/50">Admin</span>
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-ink/60 hover:text-ink"
            >
              &larr; Back to site
            </Link>
          </div>
        </header>

        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 py-6 md:flex-row md:gap-10 md:px-8 md:py-10">
          <aside className="md:w-48 md:flex-shrink-0">
            <AdminNav />
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
