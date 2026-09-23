import { Check, Quote, ShieldCheck, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, RequestDialog, SiteFooter, SiteHeader } from "@/components/site-shell";
import { assetPath } from "@/lib/asset-path";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero eyebrow="О компании" title="Отвечаем за технику и результат" text="С 2015 года обеспечиваем строительные и промышленные объекты техникой с экипажем по Москве и Московской области." />

      <section className="bg-white py-20">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">DriveEX</p>
            <h2 className="section-title">Не просто аренда, а рабочая система</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">Держим технику на собственной базе, сами обслуживаем парк и планируем логистику. Поэтому понимаем реальное состояние каждой машины и можем быстро заменить её при неисправности.</p>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">Один менеджер сопровождает заказ от первого расчёта до закрывающих документов.</p>
            <RequestDialog><Button className="mt-8 h-13 rounded-xl bg-brand px-7 font-black text-ink hover:bg-brand-dark">Обсудить сотрудничество</Button></RequestDialog>
          </div>
          <img src={assetPath("/crane-truck.jpg")} alt="Парк спецтехники компании" className="min-h-[500px] w-full rounded-2xl object-cover" />
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="shell grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {[["10 лет", "на рынке аренды"], ["200+", "машин в парке"], ["45", "опытных операторов"], ["24/7", "диспетчерская служба"]].map(([value, label]) => <div key={label} className="bg-ink p-7"><b className="text-4xl font-black text-brand">{value}</b><p className="mt-2 text-white/55">{label}</p></div>)}
        </div>
      </section>

      <section id="team" className="bg-white py-20">
        <div className="shell">
          <p className="eyebrow">Команда</p>
          <h2 className="section-title">Руководство компании</h2>
          <div className="mt-10 grid overflow-hidden rounded-3xl bg-silver lg:grid-cols-[.82fr_1.18fr]">
            <div className="relative min-h-[480px] overflow-hidden">
              <img src={assetPath("/general-director.jpg")} alt="Генеральный директор DriveEX" className="absolute inset-0 h-full w-full object-cover object-top" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
              <span className="w-fit rounded-full bg-brand px-4 py-2 text-xs font-black uppercase tracking-[.1em] text-ink">Генеральный директор</span>
              <h3 className="mt-6 text-4xl font-black tracking-[-.05em]">Имя Фамилия</h3>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Руководит развитием компании, отвечает за качество сервиса, состояние автопарка и выполнение обязательств перед заказчиками.</p>
              <div className="mt-8 flex items-start gap-4 rounded-2xl bg-white p-6"><Quote className="h-8 w-8 shrink-0 text-brand-blue" /><p className="leading-7 text-muted-foreground">Текст о профессиональном опыте и подходе руководителя добавим после согласования финального содержания.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-silver py-20">
        <div className="shell">
          <p className="eyebrow">Принципы работы</p>
          <h2 className="section-title">На чём держится сервис</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[[ShieldCheck, "Надёжность", "Проверяем машину перед подачей и держим резерв на случай замены."], [Users, "Ответственность", "Не перекладываем координацию операторов и логистику на заказчика."], [Wrench, "Собственная база", "Обслуживаем парк своими силами и контролируем техническое состояние."]].map(([Icon, title, text]) => { const FeatureIcon = Icon as typeof Check; return <div key={title as string} className="rounded-2xl border-t-4 border-brand bg-white p-7"><FeatureIcon className="h-8 w-8 text-brand-blue" /><h3 className="mt-7 text-2xl font-black">{title as string}</h3><p className="mt-3 leading-7 text-muted-foreground">{text as string}</p></div>; })}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
