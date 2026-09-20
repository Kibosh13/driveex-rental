"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  HardHat,
  Route,
  Search,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InlineLeadForm, ProductCard, RequestDialog, SiteFooter, SiteHeader } from "@/components/site-shell";
import { equipment } from "@/lib/site-data";

const categories = [
  { name: "Экскаваторы", meta: "Гусеничные и колёсные", price: "от 14 000 ₽/смена", image: "/hero-excavator.jpg" },
  { name: "Экскаваторы-погрузчики", meta: "Для города и стройплощадки", price: "от 12 000 ₽/смена", image: "/excavator-work.jpg" },
  { name: "Автокраны", meta: "Грузоподъёмность до 100 т", price: "от 15 000 ₽/смена", image: "/crane-truck.jpg" },
  { name: "Фронтальные погрузчики", meta: "Ковш до 4,5 м³", price: "от 11 000 ₽/смена", image: "/excavator-work.jpg" },
];

const faqs = [
  ["Что входит в стоимость аренды?", "Работа техники на объекте, услуги опытного оператора, топливо и стандартный комплект документов. Доставка рассчитывается с учётом адреса и типа машины."],
  ["Какой минимальный срок аренды?", "Обычно одна рабочая смена — 8 часов. Для отдельных видов техники и срочных задач возможны другие условия."],
  ["Можно ли заказать технику сегодня?", "Да, если нужная машина свободна. Менеджер проверит наличие, маршрут и возможность подачи в выбранное время."],
  ["Работаете ли вы с НДС?", "Да. Работаем с юридическими и физическими лицами, предоставляем договор, счёт, акт и закрывающие документы."],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="relative min-h-[650px] bg-ink text-white">
        <div className="absolute inset-0">
          <img src="/hero-excavator.jpg" alt="Экскаватор на строительном объекте" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,18,20,.96)_0%,rgba(16,18,20,.84)_44%,rgba(16,18,20,.24)_78%,rgba(16,18,20,.1)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="shell relative grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[1.3fr_.7fr]">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap gap-2"><span className="tag">Собственный автопарк</span><span className="tag">Подача от 2 часов</span></div>
            <h1 className="max-w-3xl text-[clamp(3rem,6vw,6rem)] font-black uppercase leading-[.88] tracking-[-0.06em]">Техника, которая <span className="text-brand">работает</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-white/78 sm:text-xl">Аренда спецтехники с опытным оператором, топливом и доставкой на объект по Москве и области.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <RequestDialog><Button className="h-14 rounded-none bg-brand px-7 text-base font-black text-ink hover:bg-brand-dark">Подобрать технику <ArrowRight /></Button></RequestDialog>
              <Button asChild variant="outline" className="h-14 rounded-none border-white/30 bg-white/5 px-7 text-base font-bold text-white backdrop-blur hover:bg-white hover:text-ink"><Link href="/catalog"><Search /> Открыть каталог</Link></Button>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-1 gap-px bg-white/15 sm:grid-cols-3">
              {[["200+", "единиц техники"], ["10 лет", "работаем на объектах"], ["4,9", "рейтинг клиентов"]].map(([value, label]) => (
                <div key={label} className="bg-black/30 px-5 py-4 backdrop-blur-sm"><b className="text-2xl font-black text-brand">{value}</b><span className="mt-1 block text-sm text-white/65">{label}</span></div>
              ))}
            </div>
          </div>
          <aside className="hidden border-l-4 border-brand bg-white p-7 text-ink shadow-[14px_14px_0_rgba(245,184,0,.92)] lg:block">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Быстрый расчёт</p>
            <h2 className="mt-2 text-3xl font-black leading-tight tracking-[-0.04em]">Что нужно сделать на объекте?</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Опишите задачу — подберём машину и подготовим предварительную стоимость.</p>
            <div className="mt-6"><InlineLeadForm /></div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="shell">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="eyebrow">Каталог</p><h2 className="section-title">Техника под вашу задачу</h2></div>
            <Button asChild variant="outline" className="h-12 rounded-none border-2 px-6 font-black"><Link href="/catalog">Весь каталог <ArrowRight /></Link></Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <Link href="/catalog" key={category.name} className="group border border-black/12 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_#171717]">
                <div className="relative h-48 overflow-hidden bg-zinc-100"><img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-3 top-3 bg-brand px-3 py-1 text-xs font-black uppercase text-ink">В наличии</span></div>
                <div className="p-5"><h3 className="min-h-14 text-xl font-black leading-tight tracking-[-0.03em]">{category.name}</h3><p className="mt-2 text-sm text-muted-foreground">{category.meta}</p><p className="mt-5 text-lg font-black text-orange-600">{category.price}</p><span className="mt-5 flex items-center justify-between border-t border-black/10 pt-4 text-sm font-black">Смотреть технику <ArrowRight className="h-4 w-4" /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f3f4f3] py-16">
        <div className="shell grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {[[Truck, "Доставка точно в срок", "Согласуем маршрут и время подачи"], [HardHat, "Опытные операторы", "Стаж машинистов от 5 лет"], [Wrench, "Исправная техника", "Собственная ремонтная база"], [Check, "Всё включено", "Оператор, топливо и документы"]].map(([Icon, title, text]) => {
            const FeatureIcon = Icon as typeof Building2;
            return <div key={title as string} className="flex gap-4 border-l-2 border-brand pl-5"><FeatureIcon className="mt-1 h-7 w-7 shrink-0 text-orange-600" /><div><h3 className="font-black">{title as string}</h3><p className="mt-1 text-sm leading-5 text-muted-foreground">{text as string}</p></div></div>;
          })}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="shell">
          <div className="max-w-3xl"><p className="eyebrow">Популярная техника</p><h2 className="section-title">Готова выйти на объект</h2><p className="mt-5 text-lg leading-7 text-muted-foreground">Показываем ключевые характеристики и ориентировочную стоимость — без скрытых пунктов в карточке.</p></div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{equipment.slice(0, 4).map((item) => <ProductCard key={item.slug} item={item} />)}</div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white">
        <div className="shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><p className="text-sm font-black uppercase tracking-[.14em] text-brand">Как мы работаем</p><h2 className="mt-4 text-[clamp(2.5rem,5vw,4.6rem)] font-black uppercase leading-[.92] tracking-[-.06em]">От заявки до закрывающих документов</h2><p className="mt-6 text-lg leading-7 text-white/60">Один менеджер ведёт заказ, контролирует подачу и остаётся на связи во время работ.</p></div>
          <div className="grid gap-px bg-white/15 sm:grid-cols-2">
            {[["01", "Уточняем задачу", "Адрес, объём работ, сроки и условия въезда."], ["02", "Подбираем машину", "Проверяем доступность и рассчитываем стоимость."], ["03", "Подаём на объект", "Техника приезжает заправленной и с оператором."], ["04", "Закрываем заказ", "Предоставляем акт и полный комплект документов."]].map(([num, title, text]) => <div key={num} className="bg-ink p-7"><span className="text-3xl font-black text-brand">{num}</span><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-white/55">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f4f3] py-20">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[500px] overflow-hidden"><img src="/excavator-work.jpg" alt="Работа спецтехники на городском объекте" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute bottom-0 left-0 max-w-sm bg-brand p-6 text-ink"><b className="text-4xl font-black">2 400+</b><p className="mt-1 font-bold">заказов выполнено за прошлый год</p></div></div>
          <div><p className="eyebrow">Надёжный подрядчик</p><h2 className="section-title">Берём объект под контроль</h2><p className="mt-6 text-lg leading-8 text-muted-foreground">Работаем с подрядчиками, девелоперами, промышленными предприятиями и частными заказчиками. Если задача требует несколько видов техники, организуем комплексную подачу и единый документооборот.</p><ul className="mt-8 grid gap-4 text-base font-bold"><li className="flex gap-3"><ShieldCheck className="h-6 w-6 text-orange-600" />Техника проходит осмотр перед каждой сменой</li><li className="flex gap-3"><Route className="h-6 w-6 text-orange-600" />Логистику согласуем до подтверждения заявки</li><li className="flex gap-3"><Check className="h-6 w-6 text-orange-600" />Цена фиксируется в договоре</li></ul><Button asChild className="mt-9 h-13 rounded-none bg-ink px-7 text-base font-black text-white hover:bg-brand hover:text-ink"><Link href="/about">Подробнее о компании <ArrowRight /></Link></Button></div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="shell grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="eyebrow">Вопросы</p><h2 className="section-title">Что важно знать до заказа</h2><p className="mt-5 text-muted-foreground">Не нашли ответ? Опишите задачу — менеджер перезвонит и всё рассчитает.</p><RequestDialog><Button className="mt-7 h-12 rounded-none bg-brand px-6 font-black text-ink hover:bg-brand-dark">Задать вопрос <ArrowRight /></Button></RequestDialog></div>
          <Accordion className="border-t-2 border-ink" type="single" collapsible>
            {faqs.map(([question, answer], index) => <AccordionItem key={question} value={`item-${index}`}><AccordionTrigger className="py-6 text-base font-black hover:no-underline">{question}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 text-base leading-7 text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>

      <section className="bg-brand py-14">
        <div className="shell flex flex-col justify-between gap-6 lg:flex-row lg:items-center"><div><p className="text-sm font-black uppercase tracking-[.14em]">Нужна техника?</p><h2 className="mt-2 text-3xl font-black tracking-[-.04em] md:text-5xl">Рассчитаем заказ за 15 минут</h2></div><RequestDialog><Button className="h-14 rounded-none bg-ink px-8 text-base font-black text-white hover:bg-white hover:text-ink">Получить расчёт <ArrowRight /></Button></RequestDialog></div>
      </section>
      <SiteFooter />
    </main>
  );
}
