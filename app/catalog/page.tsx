"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PageHero, ProductCard, SiteFooter, SiteHeader } from "@/components/site-shell";
import { categoryFilters, equipment } from "@/lib/site-data";

export default function CatalogPage() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => equipment.filter((item) => {
    const categoryMatch = category === "all" || item.category === category;
    const searchMatch = item.name.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && searchMatch;
  }), [category, query]);

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero eyebrow="Каталог" title="Спецтехника в аренду" text="Сравните характеристики и стоимость. Если не уверены в выборе, опишите задачу — мы подберём машину под условия объекта." />
      <section className="bg-white py-16">
        <div className="shell">
          <div className="grid gap-4 border-b border-black/10 pb-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="flex h-13 items-center gap-3 border-2 border-ink bg-white px-4 lg:max-w-xl">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 outline-none" placeholder="Найти технику по названию" aria-label="Поиск по каталогу" />
            </label>
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground"><SlidersHorizontal className="h-5 w-5" /> Найдено: {filtered.length}</div>
          </div>
          <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Категории техники">
            {categoryFilters.map(([value, label]) => <button key={value} onClick={() => setCategory(value)} className={category === value ? "task-chip task-chip-active" : "task-chip"}>{label}</button>)}
          </div>
          {filtered.length ? <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{filtered.map((item) => <ProductCard key={item.slug} item={item} />)}</div> : <div className="mt-12 border-2 border-dashed border-black/20 p-12 text-center"><h2 className="text-2xl font-black">Ничего не нашли</h2><p className="mt-2 text-muted-foreground">Попробуйте изменить запрос или выбрать другую категорию.</p></div>}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
