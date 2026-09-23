import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, RequestDialog, SiteFooter, SiteHeader } from "@/components/site-shell";
import { equipment } from "@/lib/site-data";

export default function PriceListPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero eyebrow="Стоимость аренды" title="Прайс-лист на спецтехнику" text="Ориентировочные цены за час и рабочую смену. Итоговая стоимость зависит от адреса объекта, срока аренды и условий работы." />
      <section className="bg-white py-16 md:py-20">
        <div className="shell">
          <div className="overflow-x-auto rounded-2xl border border-silver-dark/70">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead className="bg-ink text-white">
                <tr>{["Техника", "Категория", "За час", "За смену", "Минимальный заказ"].map((heading) => <th key={heading} className="border-r border-white/10 px-5 py-4 text-sm font-black uppercase tracking-[.06em] last:border-r-0">{heading}</th>)}</tr>
              </thead>
              <tbody>
                {equipment.map((item, index) => (
                  <tr key={item.slug} className={index % 2 ? "bg-silver/65" : "bg-white"}>
                    <td className="border-r border-t border-silver-dark/60 px-5 py-5"><Link href={`/catalog/${item.slug}`} className="font-black text-ink transition hover:text-brand-blue">{item.name}</Link></td>
                    <td className="border-r border-t border-silver-dark/60 px-5 py-5 text-sm text-muted-foreground">{item.categoryLabel}</td>
                    <td className="border-r border-t border-silver-dark/60 px-5 py-5 font-black text-brand-blue">{item.hourPrice.toLocaleString("ru-RU")} ₽</td>
                    <td className="border-r border-t border-silver-dark/60 px-5 py-5 font-black">{item.price.toLocaleString("ru-RU")} ₽</td>
                    <td className="border-t border-silver-dark/60 px-5 py-5 text-sm text-muted-foreground">{item.minimum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid gap-6 rounded-2xl bg-silver p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div><h2 className="text-2xl font-black tracking-[-.04em]">Нужен точный расчёт?</h2><p className="mt-2 text-muted-foreground">Учтём доставку, продолжительность смены, навесное оборудование и условия на площадке.</p><div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold"><span className="flex items-center gap-2"><Check className="h-4 w-4 text-brand-blue" />Цена фиксируется в договоре</span><span className="flex items-center gap-2"><Check className="h-4 w-4 text-brand-blue" />Расчёт без скрытых доплат</span></div></div>
            <RequestDialog><Button className="h-13 rounded-xl bg-brand px-7 text-base font-black text-ink hover:bg-brand-dark">Получить расчёт <ArrowRight /></Button></RequestDialog>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
