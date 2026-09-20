import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, FileText, Fuel, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, RequestDialog, SiteFooter, SiteHeader } from "@/components/site-shell";
import { equipment } from "@/lib/site-data";
import { assetPath } from "@/lib/asset-path";

export function generateStaticParams() {
  return equipment.map((item) => ({ slug: item.slug }));
}

export default async function EquipmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = equipment.find((entry) => entry.slug === slug);
  if (!item) notFound();
  const related = equipment.filter((entry) => entry.category === item.category && entry.slug !== item.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="bg-white py-12 md:py-16">
        <div className="shell">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-ink"><ArrowLeft className="h-4 w-4" /> Назад в каталог</Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative min-h-[420px] overflow-hidden bg-zinc-100 md:min-h-[570px]"><img src={assetPath(item.image)} alt={item.name} className="absolute inset-0 h-full w-full object-cover" /><span className="absolute left-5 top-5 bg-brand px-4 py-2 text-xs font-black uppercase">В наличии</span></div>
            <div>
              <p className="eyebrow">{item.categoryLabel}</p>
              <h1 className="mt-3 text-[clamp(2.4rem,5vw,4.7rem)] font-black leading-[.94] tracking-[-.055em]">{item.name}</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">{item.description}</p>
              <dl className="mt-8 grid grid-cols-2 border-l border-t border-silver-dark/60">
                {item.specs.map(([label, value]) => <div key={label} className="border-b border-r border-silver-dark/60 p-4"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="mt-1 text-xl font-black">{value}</dd></div>)}
              </dl>
              <div className="mt-7 border-l-4 border-brand bg-silver p-6"><p className="text-sm text-muted-foreground">Стоимость смены</p><p className="mt-1 text-4xl font-black text-brand-blue">от {item.price.toLocaleString("ru-RU")} ₽</p><p className="mt-2 text-sm text-muted-foreground">{item.minimum}. Итоговая цена зависит от адреса и условий работы.</p></div>
              <RequestDialog equipmentName={item.name}><Button className="mt-6 h-14 w-full rounded-none bg-brand text-base font-black text-ink hover:bg-brand-dark">Заказать технику</Button></RequestDialog>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-silver-dark/50 bg-silver py-12"><div className="shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{[[Fuel, "Топливо включено"], [Truck, "Доставка на объект"], [ShieldCheck, "Техника исправна"], [FileText, "Полный комплект документов"]].map(([Icon, label]) => { const FeatureIcon = Icon as typeof Check; return <div key={label as string} className="flex items-center gap-4 font-black"><span className="grid h-12 w-12 place-items-center bg-brand"><FeatureIcon /></span>{label as string}</div>; })}</div></section>
      {related.length > 0 && <section className="bg-white py-20"><div className="shell"><p className="eyebrow">Похожие модели</p><h2 className="section-title">Можно сравнить</h2><div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{related.map((entry) => <ProductCard key={entry.slug} item={entry} />)}</div></div></section>}
      <SiteFooter />
    </main>
  );
}
