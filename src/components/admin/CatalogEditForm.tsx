"use client";

import { useState } from "react";
import type { Bouquet } from "@/lib/types";

export function CatalogEditForm({ bouquet }: { bouquet: Bouquet }) {
  const [name, setName] = useState(bouquet.name);
  const [shortDescription, setShortDescription] = useState(
    bouquet.shortDescription,
  );
  const [description, setDescription] = useState(bouquet.description);
  const [basePrice, setBasePrice] = useState(String(bouquet.basePrice));
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-[560px] flex-col gap-5"
    >
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 h-12 w-full rounded-[6px] border border-ink/20 bg-white px-3 text-sm text-ink"
        />
      </div>

      <div>
        <label
          htmlFor="shortDescription"
          className="text-sm font-medium text-ink"
        >
          Short description
        </label>
        <input
          id="shortDescription"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="mt-1 h-12 w-full rounded-[6px] border border-ink/20 bg-white px-3 text-sm text-ink"
        />
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium text-ink">
          Full description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-[6px] border border-ink/20 bg-white px-3 py-2 text-sm text-ink"
        />
      </div>

      <div>
        <label htmlFor="basePrice" className="text-sm font-medium text-ink">
          Base price (₱)
        </label>
        <input
          id="basePrice"
          type="number"
          min="0"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          className="mt-1 h-12 w-full max-w-[160px] rounded-[6px] border border-ink/20 bg-white px-3 text-sm text-ink"
        />
      </div>

      <div className="rounded-[6px] border border-ink/10 bg-soft-beige/40 p-4 text-sm text-ink/70">
        Sizes ({bouquet.sizes.length}) and add-ons ({bouquet.addOns.length})
        aren&rsquo;t editable here yet — that comes with the real catalog
        backend.
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="inline-flex h-12 items-center rounded-[6px] bg-ink px-6 text-sm font-medium text-ivory transition-colors duration-200 hover:bg-ink/90"
        >
          Save changes
        </button>
        {saved && (
          <p className="text-sm text-ink/50">
            Not actually saved — no catalog backend connected yet.
          </p>
        )}
      </div>
    </form>
  );
}
