import { Button } from "./Button";

export function ComingSoon({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto flex max-w-[640px] flex-col items-center px-6 py-28 text-center md:py-36">
      <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
        {eyebrow}
      </p>
      <h1 className="font-display mt-4 text-4xl font-medium text-ink md:text-5xl">
        {title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink/70">
        {description}
      </p>
      <div className="mt-8">
        <Button href="/">Back to home</Button>
      </div>
    </section>
  );
}
