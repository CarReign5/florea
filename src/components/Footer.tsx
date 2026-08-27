import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl tracking-wide">FLORÉA</p>
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
                <Link href="/shop" className="text-ivory/80 hover:text-ivory">
                  Shop collection
                </Link>
              </li>
              <li>
                <Link
                  href="/builder"
                  className="text-ivory/80 hover:text-ivory"
                >
                  Build your own
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
                <span className="text-ivory/50">
                  Contact details placeholder — confirm phone/email/socials
                </span>
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
