"use client";

import Link from "next/link";
import { ArrowRight, Building2, Construction, Drill, Hammer, Route, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, RequestDialog, SiteFooter, SiteHeader } from "@/components/site-shell";
import { services } from "@/lib/site-data";
import { assetPath } from "@/lib/asset-path";

const icons = [Construction, Hammer, Truck, Drill, Route, Building2];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero eyebrow="Услуги" title="Работы спецтехникой под ключ" text="Берём на себя технику, экипаж, логистику и документы. Для комплексных задач назначаем одного менеджера и собираем парк под график объекта." />
      <section className="bg-white py-20"><div className="shell grid gap-5 md:grid-cols-2 xl:grid-cols-3">{services.map((service, index) => { const Icon = icons[index]; return <article id={service.slug} key={service.slug} className="group scroll-mt-40 rounded-2xl border border-silver-dark/60 p-7 transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#0b4f93]"><span className="grid h-14 w-14 place-items-center rounded-xl bg-brand"><Icon className="h-7 w-7" /></span><h2 className="mt-8 text-2xl font-black tracking-[-.04em]">{service.title}</h2><p className="mt-3 min-h-14 leading-7 text-muted-foreground">{service.text}</p><RequestDialog><Button variant="outline" className="mt-7 h-11 rounded-xl border-2 font-black">Рассчитать работу <ArrowRight /></Button></RequestDialog></article>; })}</div></section>
      <section className="bg-silver py-20"><div className="shell grid gap-10 lg:grid-cols-2 lg:items-center"><div><p className="eyebrow">Комплексный подход</p><h2 className="section-title">Одна заявка вместо шести подрядчиков</h2><p className="mt-6 text-lg leading-8 text-muted-foreground">Соберём комплект техники под этапы проекта, согласуем подачу, замену машин и график операторов. Документы и коммуникация остаются в одном контуре.</p><Button asChild className="mt-8 h-13 rounded-xl bg-ink px-7 text-base font-black text-white hover:bg-brand hover:text-ink"><Link href="/contacts">Обсудить объект <ArrowRight /></Link></Button></div><img src={assetPath("/excavator-work.jpg")} alt="Земляные работы спецтехникой" className="min-h-[420px] w-full rounded-2xl object-cover" /></div></section>
      <SiteFooter />
    </main>
  );
}
