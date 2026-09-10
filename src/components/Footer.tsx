import Link from "next/link";
import { Logo } from "./Logo";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14.5 8.5h2V5.8c-.35-.05-1.55-.15-2.95-.15-2.92 0-4.55 1.78-4.55 4.05v2.3H6.7v3.1h2.3V21h3.2v-5.9h2.6l.4-3.1h-3V9.95c0-.9.25-1.45 1.3-1.45Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16.2" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Logo variant="full" align="start" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">
              Handmade fuzzy-wire and crochet flowers, made slowly and given
              meaningfully. Based in General Santos City, Philippines.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-ivory/50 uppercase">
              Shop
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/" className="text-ivory/80 hover:text-ivory">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-ivory/80 hover:text-ivory">
                  Shop collection
                </Link>
              </li>
              <li>
                <Link
                  href="/#story"
                  className="text-ivory/80 hover:text-ivory"
                >
                  Our story
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-ivory/50 uppercase">
              Get in touch
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ivory/80">
              <li>General Santos City, Philippines</li>
              <li>
                <a href="tel:+639169588445" className="hover:text-ivory">
                  0916 958 8445
                </a>
              </li>
              <li>
                <a
                  href="mailto:floreaflowersandgifts@gmail.com"
                  className="hover:text-ivory"
                >
                  floreaflowersandgifts@gmail.com
                </a>
              </li>
              <li className="text-ivory/60">7am &ndash; 10pm &middot; Message us anytime</li>
              <li className="flex gap-4 pt-1">
                <a
                  href="https://www.facebook.com/official.florea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-ivory"
                >
                  <FacebookIcon className="h-4 w-4" />
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/floreaofficial.gensan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-ivory"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-ivory/15 pt-6 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Floréa. All rights reserved.</p>
          <p>Made by hand, given with meaning.</p>
        </div>
      </div>
    </footer>
  );
}
