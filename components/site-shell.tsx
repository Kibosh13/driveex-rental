"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Equipment } from "@/lib/site-data";
import { assetPath } from "@/lib/asset-path";

const navigation = [
  ["Каталог", "/catalog"],
  ["Услуги", "/services"],
  ["Объекты", "/projects"],
  ["О компании", "/about"],
  ["Контакты", "/contacts"],
];

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center" aria-label="DriveEX — главная">
      <img
        src={assetPath("/driveex-logo-cropped.png")}
        alt="DriveEX"
        className={`h-auto w-[158px] object-contain sm:w-[196px] ${inverted ? "drop-shadow-[0_3px_10px_rgba(0,0,0,.28)]" : ""}`}
      />
    </Link>
  );
}

function LeadForm({ equipmentName }: { equipmentName?: string }) {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="grid min-h-64 place-items-center border-2 border-brand bg-[#fff9df] p-7 text-center">
        <div>
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand"><Check className="h-7 w-7" /></span>
          <h3 className="mt-5 text-2xl font-black tracking-[-0.04em]">Заявка принята</h3>
          <p className="mt-2 text-muted-foreground">Перезвоним, уточним объект и подготовим расчёт.</p>
        </div>
      </div>
    );
  }
  return (
    <form className="grid gap-3" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
      <input className="field" aria-label="Ваше имя" placeholder="Ваше имя" required />
      <input className="field" aria-label="Телефон" placeholder="+7 (___) ___-__-__" inputMode="tel" required />
      <textarea className="field min-h-24 resize-none" aria-label="Описание задачи" defaultValue={equipmentName ? `Интересует ${equipmentName}` : ""} placeholder="Что нужно сделать и где находится объект?" />
      <Button type="submit" className="h-12 rounded-none bg-brand text-base font-extrabold text-ink hover:bg-brand-dark">
        Получить расчёт <ArrowRight />
      </Button>
      <p className="text-xs leading-5 text-muted-foreground">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</p>
    </form>
  );
}

export function InlineLeadForm({ equipmentName }: { equipmentName?: string }) {
  return <LeadForm equipmentName={equipmentName} />;
}

export function RequestDialog({ children, equipmentName }: { children: React.ReactNode; equipmentName?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md border-2 border-ink bg-white p-7 shadow-[10px_10px_0_#f5b800]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-[-0.04em]">Рассчитать аренду</DialogTitle>
          <DialogDescription className="text-base leading-6">Оставьте контакты и задачу. Менеджер уточнит детали и предложит технику.</DialogDescription>
        </DialogHeader>
        <div className="mt-2"><LeadForm equipmentName={equipmentName} /></div>
      </DialogContent>
    </Dialog>
  );
}

export function SiteHeader() {
  return (
    <>
      <div className="bg-ink text-white">
        <div className="shell flex min-h-10 items-center justify-between gap-4 text-sm">
          <p className="hidden text-white/70 md:block">Москва и Московская область</p>
          <div className="ml-auto flex items-center gap-5">
            <span className="hidden items-center gap-2 text-white/70 sm:flex"><Clock3 className="h-4 w-4 text-brand" /> На связи 24/7</span>
            <a className="font-bold transition-colors hover:text-brand" href="tel:+74951234567">+7 (495) 123-45-67</a>
          </div>
        </div>
      </div>
      <header className="relative z-40 border-b border-black/10 bg-white">
        <div className="shell flex h-[86px] items-center gap-8">
          <Logo />
          <nav className="ml-auto hidden items-center gap-7 text-[15px] font-bold lg:flex" aria-label="Основная навигация">
            {navigation.map(([label, href]) => <Link key={href} className="nav-link" href={href}>{label}</Link>)}
          </nav>
          <RequestDialog>
            <Button className="ml-auto hidden h-12 rounded-none bg-ink px-6 font-extrabold text-white hover:bg-brand hover:text-ink sm:inline-flex lg:ml-0">Заказать звонок</Button>
          </RequestDialog>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-lg" className="ml-auto rounded-none border-2 lg:hidden" aria-label="Открыть меню"><Menu /></Button>
            </SheetTrigger>
            <SheetContent className="border-l-2 border-ink bg-white p-0">
              <SheetHeader className="border-b border-black/10 p-6 text-left">
                <SheetTitle><Logo /></SheetTitle>
                <SheetDescription>Аренда спецтехники по Москве и области</SheetDescription>
              </SheetHeader>
              <nav className="grid px-6 py-4 text-xl font-black">
                {navigation.map(([label, href]) => (
                  <SheetClose key={href} asChild><Link className="flex items-center justify-between border-b border-black/10 py-4" href={href}>{label}<ChevronRight /></Link></SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-6">
                <a className="text-xl font-black" href="tel:+74951234567">+7 (495) 123-45-67</a>
                <p className="mt-1 text-sm text-muted-foreground">Круглосуточно, без выходных</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}

export function ProductCard({ item }: { item: Equipment }) {
  return (
    <article className="group flex h-full flex-col border border-black/12 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_#171717]">
      <Link href={`/catalog/${item.slug}`} className="relative block h-56 overflow-hidden bg-zinc-100">
        <img src={assetPath(item.image)} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 bg-brand px-3 py-1 text-xs font-black uppercase text-ink">В наличии</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-black uppercase tracking-[.1em] text-orange-600">{item.categoryLabel}</p>
        <h3 className="mt-2 min-h-14 text-xl font-black leading-tight tracking-[-0.03em]"><Link href={`/catalog/${item.slug}`}>{item.name}</Link></h3>
        <dl className="mt-4 grid gap-2 text-sm text-muted-foreground">
          {item.specs.slice(0, 2).map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt>{label}</dt><dd className="font-bold text-ink">{value}</dd></div>)}
        </dl>
        <div className="mt-auto pt-5">
          <p className="text-sm text-muted-foreground">от <b className="text-2xl font-black text-orange-600">{item.hourPrice.toLocaleString("ru-RU")}</b> ₽/час</p>
          <p className="mt-1 text-xs text-muted-foreground">{item.minimum}</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Button asChild variant="outline" className="rounded-none border-2 font-bold"><Link href={`/catalog/${item.slug}`}>Подробнее</Link></Button>
            <RequestDialog equipmentName={item.name}><Button className="rounded-none bg-ink font-bold text-white hover:bg-brand hover:text-ink">Заказать</Button></RequestDialog>
          </div>
        </div>
      </div>
    </article>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white md:py-24">
      <div className="absolute -right-12 top-0 h-full w-1/3 skew-x-[-12deg] bg-brand/90" />
      <div className="absolute -right-4 top-0 h-full w-1/4 skew-x-[-12deg] bg-white/10" />
      <div className="shell relative">
        <p className="text-sm font-black uppercase tracking-[.14em] text-brand">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(2.8rem,6vw,5.5rem)] font-black uppercase leading-[.9] tracking-[-.06em]">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-7 text-white/70">{text}</p>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.2fr_.8fr_.8fr_1fr]">
        <div><Logo inverted /><p className="mt-6 max-w-sm text-sm leading-6 text-white/55">Демонстрационная версия многостраничного сайта аренды спецтехники. Контент и контакты заменим после согласования.</p></div>
        <div><h3 className="font-black text-brand">Разделы</h3><div className="mt-4 grid gap-3 text-sm text-white/70">{navigation.map(([label, href]) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}</div></div>
        <div><h3 className="font-black text-brand">Техника</h3><div className="mt-4 grid gap-3 text-sm text-white/70"><Link href="/catalog">Экскаваторы</Link><Link href="/catalog">Погрузчики</Link><Link href="/catalog">Автокраны</Link><Link href="/catalog">Самосвалы</Link></div></div>
        <div><h3 className="font-black text-brand">Контакты</h3><div className="mt-4 grid gap-4 text-sm text-white/70"><a className="flex gap-3" href="tel:+74951234567"><Phone className="h-5 w-5 text-brand" />+7 (495) 123-45-67</a><a className="flex gap-3" href="mailto:info@stroytehnika.ru"><Mail className="h-5 w-5 text-brand" />info@stroytehnika.ru</a><span className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-brand" />Москва, ул. Строителей, 12</span></div></div>
      </div>
      <div className="border-t border-white/10"><div className="shell flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:justify-between"><span>© 2026 DriveEX</span><span>Информация не является публичной офертой</span></div></div>
    </footer>
  );
}
