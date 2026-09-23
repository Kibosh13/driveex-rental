"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  LayoutGrid,
  Menu,
  Phone,
  Search,
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { equipment, services, type Equipment } from "@/lib/site-data";
import { assetPath } from "@/lib/asset-path";

const rentalGroups = [
  {
    title: "Землеройная техника",
    links: [
      ["Экскаваторы", "/catalog?category=excavators"],
      ["Экскаваторы-погрузчики", "/catalog?category=excavators"],
      ["Мини-экскаваторы", "/catalog?category=excavators"],
      ["Бульдозеры", "/catalog?category=excavators"],
    ],
  },
  {
    title: "Погрузочная и подъёмная",
    links: [
      ["Фронтальные погрузчики", "/catalog?category=loaders"],
      ["Автокраны", "/catalog?category=cranes"],
      ["Манипуляторы", "/catalog?category=transport"],
      ["Автовышки", "/catalog?category=cranes"],
    ],
  },
  {
    title: "Дорожная и грузовая",
    links: [
      ["Дорожные катки", "/catalog?category=road"],
      ["Самосвалы", "/catalog?category=transport"],
      ["Тралы", "/catalog?category=transport"],
      ["Длинномеры", "/catalog?category=transport"],
    ],
  },
];

const aboutLinks = [
  ["О компании", "/about"],
  ["Наши объекты", "/projects"],
  ["Условия аренды", "/price-list"],
  ["Контакты", "/contacts"],
];

type CatalogMegaSection = {
  id: string;
  title: string;
  href: string;
  links: [string, string][];
  equipmentSlugs?: string[];
  serviceSlugs?: string[];
};

const catalogMegaSections: CatalogMegaSection[] = [
  {
    id: "earthmoving",
    title: "Землеройная техника",
    href: "/catalog?category=excavators",
    links: [["Экскаваторы", "/catalog?category=excavators"], ["Экскаваторы-погрузчики", "/catalog?category=excavators"], ["Мини-экскаваторы", "/catalog?category=excavators"], ["Бульдозеры", "/catalog?category=excavators"]],
    equipmentSlugs: ["jcb-3cx", "hitachi-zx200"],
  },
  {
    id: "loaders",
    title: "Погрузочная техника",
    href: "/catalog?category=loaders",
    links: [["Фронтальные погрузчики", "/catalog?category=loaders"], ["Телескопические погрузчики", "/catalog?category=loaders"], ["Мини-погрузчики", "/catalog?category=loaders"]],
    equipmentSlugs: ["hyundai-hl740", "volvo-l120"],
  },
  {
    id: "lifting",
    title: "Грузоподъёмная техника",
    href: "/catalog?category=cranes",
    links: [["Автокраны", "/catalog?category=cranes"], ["Манипуляторы", "/catalog?category=transport"], ["Автовышки", "/catalog?category=cranes"]],
    equipmentSlugs: ["xcmg-qy25k", "kamaz-kanglim"],
  },
  {
    id: "transport",
    title: "Грузовой транспорт",
    href: "/catalog?category=transport",
    links: [["Самосвалы", "/catalog?category=transport"], ["Тралы", "/catalog?category=transport"], ["Длинномеры", "/catalog?category=transport"], ["Манипуляторы", "/catalog?category=transport"]],
    equipmentSlugs: ["kamaz-6520", "kamaz-kanglim"],
  },
  {
    id: "road",
    title: "Дорожная техника",
    href: "/catalog?category=road",
    links: [["Грунтовые катки", "/catalog?category=road"], ["Дорожные фрезы", "/catalog?category=road"], ["Асфальтоукладчики", "/catalog?category=road"]],
    equipmentSlugs: ["bomag-bw213"],
  },
  {
    id: "services",
    title: "Услуги спецтехники",
    href: "/services",
    links: services.map((service) => [service.title, `/services#${service.slug}`] as [string, string]),
    serviceSlugs: ["earthworks", "demolition", "lifting"],
  },
];

const footerNavigation = [
  ["Аренда спецтехники", "/catalog"],
  ["Услуги", "/services"],
  ["Галерея", "/projects"],
  ["Прайс-лист", "/price-list"],
  ["О компании", "/about"],
  ["Контакты", "/contacts"],
];

const desktopTriggerClass = "h-10 rounded-xl bg-transparent px-2 text-[13px] font-extrabold text-ink hover:bg-silver hover:text-brand-blue focus:bg-silver data-[state=open]:bg-silver data-[state=open]:text-brand-blue xl:px-3 xl:text-sm";
const desktopLinkClass = "nav-link px-2 py-3 text-[13px] font-extrabold text-ink hover:text-brand-blue xl:px-3 xl:text-sm";
const submenuLinkClass = "block border-b border-silver-dark/40 py-2.5 text-sm font-semibold text-ink transition hover:border-brand hover:pl-1 hover:text-brand-blue";

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
      <div className="grid min-h-64 place-items-center rounded-2xl border-2 border-brand bg-[#eef5fb] p-7 text-center">
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
      <Button type="submit" className="h-12 rounded-xl bg-brand text-base font-extrabold text-ink hover:bg-brand-dark">
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
      <DialogContent className="max-w-md rounded-2xl border-2 border-brand-blue bg-white p-7 shadow-[10px_10px_0_#f36b21]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-[-0.04em]">Рассчитать аренду</DialogTitle>
          <DialogDescription className="text-base leading-6">Оставьте контакты и задачу. Менеджер уточнит детали и предложит технику.</DialogDescription>
        </DialogHeader>
        <div className="mt-2"><LeadForm equipmentName={equipmentName} /></div>
      </DialogContent>
    </Dialog>
  );
}

function HeaderEquipmentSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [activeCatalogSection, setActiveCatalogSection] = useState(catalogMegaSections[0].id);
  const normalizedQuery = query.trim().toLowerCase();
  const matches = normalizedQuery
    ? equipment.filter((item) => `${item.name} ${item.categoryLabel}`.toLowerCase().includes(normalizedQuery)).slice(0, 5)
    : [];
  const activeSection = catalogMegaSections.find((section) => section.id === activeCatalogSection) ?? catalogMegaSections[0];
  const featuredEquipment = equipment.filter((item) => activeSection.equipmentSlugs?.includes(item.slug));
  const featuredServices = services.filter((service) => activeSection.serviceSlugs?.includes(service.slug));

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsOpen(false);
    if (matches[0]) router.push(`/catalog/${matches[0].slug}`);
    else router.push(normalizedQuery ? `/catalog?q=${encodeURIComponent(query.trim())}` : "/catalog");
  }

  return (
    <div
      className="relative border-t border-silver-dark/50 bg-silver/80"
      onMouseLeave={() => setIsCatalogOpen(false)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setIsCatalogOpen(false); }}
    >
      <div className="shell flex min-h-16 items-center gap-2 py-2.5 sm:gap-5">
        <Button asChild className="h-11 shrink-0 gap-1.5 rounded-2xl bg-brand px-3 text-[13px] font-black text-ink shadow-[0_7px_18px_rgba(243,107,33,.28)] hover:bg-brand-dark sm:gap-2 sm:px-7 sm:text-sm">
          <Link href="/catalog" onMouseEnter={() => setIsCatalogOpen(true)} onFocus={() => setIsCatalogOpen(true)} aria-haspopup="menu" aria-expanded={isCatalogOpen}><LayoutGrid className="h-5 w-5" /> Каталог</Link>
        </Button>
        <form
          className="relative flex min-w-0 flex-1"
          role="search"
          onSubmit={submitSearch}
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setIsOpen(false); }}
        >
          <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-l-xl border-2 border-ink bg-white px-3 focus-within:border-brand-blue sm:gap-3 sm:px-4">
            <Search className="h-5 w-5 shrink-0 text-brand-blue" />
            <span className="sr-only">Найти технику в аренду</span>
            <input
              value={query}
              onChange={(event) => { setQuery(event.target.value); setIsOpen(true); }}
              onFocus={() => { if (normalizedQuery) setIsOpen(true); }}
              onKeyDown={(event) => { if (event.key === "Escape") setIsOpen(false); }}
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:font-normal placeholder:text-muted-foreground"
              placeholder="Экскаватор, кран, погрузчик…"
              aria-label="Найти технику в аренду"
              aria-autocomplete="list"
              aria-expanded={isOpen && Boolean(normalizedQuery)}
            />
          </label>
          <Button type="submit" className="h-11 rounded-r-xl bg-ink px-3 font-black text-white hover:bg-brand hover:text-ink sm:px-7"><span className="hidden sm:inline">Найти</span><ArrowRight className="h-4 w-4 sm:hidden" /></Button>
          {isOpen && normalizedQuery ? (
            <div className="absolute inset-x-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-silver-dark/70 bg-white shadow-[0_18px_45px_rgba(7,31,56,.2)]">
              {matches.length ? matches.map((item) => (
                <Link key={item.slug} href={`/catalog/${item.slug}`} onClick={() => setIsOpen(false)} className="grid gap-1 border-b border-silver-dark/50 px-4 py-3 transition last:border-b-0 hover:bg-silver sm:grid-cols-[1fr_auto] sm:items-center">
                  <span className="font-bold text-ink">{item.name}</span>
                  <span className="text-sm font-black text-brand-blue">от {item.hourPrice.toLocaleString("ru-RU")} ₽/час</span>
                </Link>
              )) : (
                <button type="submit" className="flex w-full items-center justify-between px-4 py-4 text-left font-bold hover:bg-silver">Искать «{query.trim()}» в каталоге <ArrowRight className="h-4 w-4" /></button>
              )}
            </div>
          ) : null}
        </form>
      </div>
      {isCatalogOpen ? (
        <div className="absolute inset-x-0 top-full z-[70] hidden border-t border-silver-dark/60 bg-white shadow-[0_25px_60px_rgba(7,31,56,.24)] lg:block" onMouseEnter={() => setIsCatalogOpen(true)}>
          <div className="shell grid min-h-[430px] grid-cols-[270px_1fr_390px] overflow-hidden rounded-b-2xl border-x border-b border-silver-dark/60 bg-white">
            <div className="bg-ink p-6 text-white">
              <p className="mb-4 text-xs font-black uppercase tracking-[.12em] text-brand">Основные разделы</p>
              <div className="grid gap-1">
                {catalogMegaSections.map((section) => (
                  <Link
                    key={section.id}
                    href={section.href}
                    onMouseEnter={() => setActiveCatalogSection(section.id)}
                    onFocus={() => setActiveCatalogSection(section.id)}
                    onClick={() => setIsCatalogOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-black transition ${activeSection.id === section.id ? "bg-brand text-ink" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
                  >
                    {section.title}<ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
              <Link href="/catalog" onClick={() => setIsCatalogOpen(false)} className="mt-5 flex items-center justify-between rounded-xl border border-white/25 px-4 py-3 text-sm font-black transition hover:border-brand hover:text-brand">Весь каталог <ArrowRight className="h-4 w-4" /></Link>
            </div>

            <div className="p-7">
              <p className="text-xs font-black uppercase tracking-[.12em] text-brand-blue">Подразделы</p>
              <h3 className="mt-2 text-2xl font-black tracking-[-.04em]">{activeSection.title}</h3>
              <div className="mt-6 grid grid-cols-2 gap-x-8">
                {activeSection.links.map(([label, href]) => <Link key={label} href={href} onClick={() => setIsCatalogOpen(false)} className="flex items-center justify-between border-b border-silver-dark/50 py-3 text-sm font-bold transition hover:border-brand hover:text-brand-blue">{label}<ChevronRight className="h-4 w-4" /></Link>)}
              </div>
              <div className="mt-8 rounded-2xl bg-silver p-5">
                <p className="font-black">Не знаете, что выбрать?</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">Опишите задачу — подберём машину, навесное оборудование и рассчитаем подачу.</p>
                <Link href="/contacts" onClick={() => setIsCatalogOpen(false)} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-blue">Получить консультацию <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>

            <div className="bg-silver p-6">
              <p className="text-xs font-black uppercase tracking-[.12em] text-brand-blue">Рекомендуем</p>
              <div className="mt-4 grid gap-4">
                {featuredEquipment.map((item) => (
                  <Link key={item.slug} href={`/catalog/${item.slug}`} onClick={() => setIsCatalogOpen(false)} className="group/card grid grid-cols-[112px_1fr] overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <img src={assetPath(item.image)} alt="" className="h-full min-h-28 w-full object-cover transition group-hover/card:scale-105" />
                    <span className="p-4"><b className="block text-sm leading-5 text-ink">{item.name}</b><span className="mt-2 block text-sm font-black text-brand-blue">от {item.hourPrice.toLocaleString("ru-RU")} ₽/час</span></span>
                  </Link>
                ))}
                {featuredServices.map((service) => (
                  <Link key={service.slug} href={`/services#${service.slug}`} onClick={() => setIsCatalogOpen(false)} className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <b className="text-base text-ink">{service.title}</b><span className="mt-2 block text-sm leading-6 text-muted-foreground">{service.text}</span><span className="mt-3 flex items-center gap-2 text-sm font-black text-brand-blue">Подробнее <ArrowRight className="h-4 w-4" /></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
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
      <header className="relative z-40 border-b border-silver-dark/60 bg-white">
        <div className="shell flex h-[86px] items-center gap-4 xl:gap-7">
          <Logo />
          <NavigationMenu viewport={false} className="ml-auto hidden h-full flex-none lg:flex" aria-label="Основная навигация">
            <NavigationMenuList className="h-full gap-0 xl:gap-1">
              <NavigationMenuItem className="flex h-full items-center">
                <NavigationMenuTrigger className={desktopTriggerClass}>Аренда спецтехники</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 mt-0 w-[780px] overflow-hidden rounded-2xl border border-silver-dark/70 border-t-4 border-t-brand bg-white p-0 shadow-[0_20px_55px_rgba(7,31,56,.2)] md:w-[780px]">
                  <div className="grid grid-cols-3 gap-8 p-7">
                    {rentalGroups.map((group) => (
                      <div key={group.title}>
                        <p className="mb-2 text-sm font-black text-brand-blue">{group.title}</p>
                        <div className="grid">
                          {group.links.map(([label, href]) => (
                            <NavigationMenuLink key={label} asChild><Link href={href} className={submenuLinkClass}>{label}</Link></NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <NavigationMenuLink asChild><Link href="/catalog" className="flex items-center justify-between bg-ink px-7 py-4 text-sm font-black text-white transition hover:bg-brand hover:text-ink">Вся техника и характеристики <ArrowRight className="h-4 w-4" /></Link></NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="flex h-full items-center">
                <NavigationMenuTrigger className={desktopTriggerClass}>Услуги</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 mt-0 w-[360px] rounded-2xl border border-silver-dark/70 border-t-4 border-t-brand bg-white p-5 shadow-[0_20px_55px_rgba(7,31,56,.2)] md:w-[360px]">
                  <p className="mb-2 text-sm font-black text-brand-blue">Работы спецтехникой</p>
                  <div className="grid grid-cols-2 gap-x-5">
                    {services.map((service) => <NavigationMenuLink key={service.slug} asChild><Link href={`/services#${service.slug}`} className={submenuLinkClass}>{service.title}</Link></NavigationMenuLink>)}
                  </div>
                  <NavigationMenuLink asChild><Link href="/services" className="mt-4 flex-row items-center justify-between gap-2 text-sm font-black text-brand-blue">Все услуги <ArrowRight className="h-4 w-4" /></Link></NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="flex h-full items-center"><NavigationMenuLink asChild><Link className={desktopLinkClass} href="/projects">Галерея</Link></NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem className="flex h-full items-center"><NavigationMenuLink asChild><Link className={desktopLinkClass} href="/price-list">Прайс-лист</Link></NavigationMenuLink></NavigationMenuItem>

              <NavigationMenuItem className="flex h-full items-center">
                <NavigationMenuTrigger className={desktopTriggerClass}>О компании</NavigationMenuTrigger>
                <NavigationMenuContent className="right-0 left-auto z-50 mt-0 w-[290px] rounded-2xl border border-silver-dark/70 border-t-4 border-t-brand bg-white p-5 shadow-[0_20px_55px_rgba(7,31,56,.2)] md:right-0 md:left-auto md:w-[290px]">
                  <p className="mb-2 text-sm font-black text-brand-blue">DriveEX</p>
                  <div className="grid">{aboutLinks.map(([label, href]) => <NavigationMenuLink key={label} asChild><Link href={href} className={submenuLinkClass}>{label}</Link></NavigationMenuLink>)}</div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="flex h-full items-center"><NavigationMenuLink asChild><Link className={desktopLinkClass} href="/contacts">Контакты</Link></NavigationMenuLink></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <RequestDialog>
            <Button className="ml-auto hidden h-12 min-w-[190px] rounded-xl bg-[#29d36b] px-8 font-extrabold text-ink shadow-[0_8px_22px_rgba(41,211,107,.26)] hover:bg-[#20b95c] sm:inline-flex lg:ml-0 lg:hidden xl:inline-flex">Заказать звонок</Button>
          </RequestDialog>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-lg" className="ml-auto rounded-xl border-2 lg:hidden" aria-label="Открыть меню"><Menu /></Button>
            </SheetTrigger>
            <SheetContent className="border-l-2 border-ink bg-white p-0">
              <SheetHeader className="border-b border-silver-dark/60 p-6 text-left">
                <SheetTitle><Logo /></SheetTitle>
                <SheetDescription>Аренда спецтехники по Москве и области</SheetDescription>
              </SheetHeader>
              <nav className="px-6 py-3 text-lg font-black">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="rental" className="border-silver-dark/60">
                    <AccordionTrigger className="py-4 text-lg font-black hover:no-underline">Аренда спецтехники</AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="grid gap-4">
                        {rentalGroups.map((group) => <div key={group.title}><p className="mb-1 text-xs font-black uppercase tracking-[.08em] text-brand-blue">{group.title}</p><div className="grid">{group.links.slice(0, 3).map(([label, href]) => <SheetClose key={`${group.title}-${label}`} asChild><Link href={href} className="py-2 text-base font-semibold text-muted-foreground">{label}</Link></SheetClose>)}</div></div>)}
                        <SheetClose asChild><Link href="/catalog" className="font-black text-brand-blue">Вся техника</Link></SheetClose>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="services" className="border-silver-dark/60">
                    <AccordionTrigger className="py-4 text-lg font-black hover:no-underline">Услуги</AccordionTrigger>
                    <AccordionContent className="grid pb-4">{services.map((service) => <SheetClose key={service.slug} asChild><Link href={`/services#${service.slug}`} className="py-2 text-base font-semibold text-muted-foreground">{service.title}</Link></SheetClose>)}</AccordionContent>
                  </AccordionItem>
                  <SheetClose asChild><Link className="flex items-center justify-between border-b border-silver-dark/60 py-4" href="/projects">Галерея<ChevronRight /></Link></SheetClose>
                  <SheetClose asChild><Link className="flex items-center justify-between border-b border-silver-dark/60 py-4" href="/price-list">Прайс-лист<ChevronRight /></Link></SheetClose>
                  <AccordionItem value="about" className="border-silver-dark/60">
                    <AccordionTrigger className="py-4 text-lg font-black hover:no-underline">О компании</AccordionTrigger>
                    <AccordionContent className="grid pb-4">{aboutLinks.map(([label, href]) => <SheetClose key={href} asChild><Link href={href} className="py-2 text-base font-semibold text-muted-foreground">{label}</Link></SheetClose>)}</AccordionContent>
                  </AccordionItem>
                  <SheetClose asChild><Link className="flex items-center justify-between border-b border-silver-dark/60 py-4" href="/contacts">Контакты<ChevronRight /></Link></SheetClose>
                </Accordion>
              </nav>
              <div className="mt-auto p-6">
                <a className="text-xl font-black" href="tel:+74951234567">+7 (495) 123-45-67</a>
                <p className="mt-1 text-sm text-muted-foreground">Круглосуточно, без выходных</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <HeaderEquipmentSearch />
      </header>
    </>
  );
}

export function ProductCard({ item }: { item: Equipment }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-silver-dark/60 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_#0b4f93]">
      <Link href={`/catalog/${item.slug}`} className="relative block h-56 overflow-hidden bg-zinc-100">
        <img src={assetPath(item.image)} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-black uppercase text-ink">В наличии</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-black uppercase tracking-[.1em] text-brand">{item.categoryLabel}</p>
        <h3 className="mt-2 min-h-14 text-xl font-black leading-tight tracking-[-0.03em]"><Link href={`/catalog/${item.slug}`}>{item.name}</Link></h3>
        <dl className="mt-4 grid gap-2 text-sm text-muted-foreground">
          {item.specs.slice(0, 2).map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt>{label}</dt><dd className="font-bold text-ink">{value}</dd></div>)}
        </dl>
        <div className="mt-auto pt-5">
          <p className="text-sm text-muted-foreground">от <b className="text-2xl font-black text-brand">{item.hourPrice.toLocaleString("ru-RU")}</b> ₽/час</p>
          <p className="mt-1 text-xs text-muted-foreground">{item.minimum}</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Button asChild variant="outline" className="rounded-xl border-2 font-bold"><Link href={`/catalog/${item.slug}`}>Подробнее</Link></Button>
            <RequestDialog equipmentName={item.name}><Button className="rounded-xl bg-ink font-bold text-white hover:bg-brand hover:text-ink">Заказать</Button></RequestDialog>
          </div>
        </div>
      </div>
    </article>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(115deg,#071f38_0%,#0a3767_58%,#0b4f93_100%)] py-20 text-white md:py-24">
      <div className="absolute -right-12 top-0 h-full w-1/3 skew-x-[-12deg] bg-brand/90" />
      <div className="absolute -right-4 top-0 h-full w-1/4 skew-x-[-12deg] bg-silver/20" />
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
        <div><h3 className="font-black text-brand">Разделы</h3><div className="mt-4 grid gap-3 text-sm text-white/70">{footerNavigation.map(([label, href]) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}</div></div>
        <div><h3 className="font-black text-brand">Техника</h3><div className="mt-4 grid gap-3 text-sm text-white/70"><Link href="/catalog">Экскаваторы</Link><Link href="/catalog">Погрузчики</Link><Link href="/catalog">Автокраны</Link><Link href="/catalog">Самосвалы</Link></div></div>
        <div><h3 className="font-black text-brand">Контакты</h3><div className="mt-4 grid gap-4 text-sm text-white/70"><a className="flex gap-3" href="tel:+74951234567"><Phone className="h-5 w-5 text-brand" />+7 (495) 123-45-67</a><a className="flex gap-3" href="mailto:info@stroytehnika.ru"><Mail className="h-5 w-5 text-brand" />info@stroytehnika.ru</a><span className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-brand" />Москва, ул. Строителей, 12</span></div></div>
      </div>
      <div className="border-t border-white/10"><div className="shell flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:justify-between"><span>© 2026 DriveEX</span><span>Информация не является публичной офертой</span></div></div>
    </footer>
  );
}
