import { BotanicalIcon } from "./BotanicalIcon";

const aspectClasses = {
  portrait: "aspect-[4/5]",
  wide: "aspect-[3/2]",
  square: "aspect-square",
} as const;

export function PlaceholderPhoto({
  aspect = "portrait",
  label = "Product photography — pending",
  className = "",
}: {
  aspect?: keyof typeof aspectClasses;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative ${aspectClasses[aspect]} overflow-hidden rounded-[10px] border border-ink/10 bg-gradient-to-br from-soft-beige to-champagne/60 ${className}`}
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center ">
        <BotanicalIcon className="h-12 w-8 text-taupe/70" />
        <p className="text-xs font-medium tracking-[0.08em] text-taupe/80 uppercase">
          {label}
        </p>
      </div>
    </div>
  );
}
