function Sprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 37C5 37 7 25 15 19"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M15 19C15 19 21 17 23 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M15 19C15 19 9 17 7 13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <ellipse
        cx="24"
        cy="8"
        rx="2.8"
        ry="4.6"
        transform="rotate(35 24 8)"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <ellipse
        cx="17"
        cy="15"
        rx="2.2"
        ry="3.8"
        transform="rotate(52 17 15)"
        stroke="currentColor"
        strokeWidth="1"
      />
      <ellipse
        cx="8"
        cy="14"
        rx="1.9"
        ry="3.2"
        transform="rotate(-8 8 14)"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

function HeartHands({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 9.1c-.9-1.5-3-1.9-4.3-.6-1.3 1.3-1.1 3.2.2 4.4L12 16.6l4.1-3.7c1.3-1.2 1.5-3.1.2-4.4-1.3-1.3-3.4-.9-4.3.6Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 14.5c1.3 1.8 2.7 2.1 4 1.4M20.5 14.5c-1.3 1.8-2.7 2.1-4 1.4M5.5 13.2c-.2-2 .8-3.3 2.4-3.8M18.5 13.2c.2-2-.8-3.3-2.4-3.8"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

const sizes = {
  compact: {
    wordmark: "text-2xl md:text-3xl",
    tracking: "tracking-[0.08em]",
    sprig: "h-4 w-4 -top-2.5 -right-1",
  },
  full: {
    wordmark: "text-4xl md:text-5xl",
    tracking: "tracking-[0.1em]",
    sprig: "h-7 w-7 -top-4 -right-1.5",
  },
} as const;

export function Logo({
  variant = "compact",
  align = "center",
  className = "",
}: {
  variant?: keyof typeof sizes;
  align?: "center" | "start";
  className?: string;
}) {
  const size = sizes[variant];

  return (
    <span
      className={`inline-flex flex-col ${align === "center" ? "items-center" : "items-start"} ${className}`}
    >
      <span
        className={`font-display relative inline-block ${size.wordmark} ${size.tracking} font-medium text-taupe`}
      >
        FLOR
        <span className="relative inline-block">
          É
          <Sprig className={`absolute ${size.sprig} text-taupe`} />
        </span>
        A
      </span>

      {variant === "full" && (
        <>
          <span className="mt-2 text-[11px] font-medium tracking-[0.35em] text-taupe/80 uppercase">
            Flowers &amp; Gifts
          </span>
          <span className="mt-4 flex items-center gap-3 text-taupe/50">
            <span className="h-px w-10 bg-current" />
            <HeartHands className="h-4 w-4" />
            <span className="h-px w-10 bg-current" />
          </span>
        </>
      )}
    </span>
  );
}
