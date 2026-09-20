import { ArrowUpRight } from "lucide-react";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";

const projects = [
  { title: "Разработка котлована для жилого комплекса", place: "Москва, САО", scope: "48 000 м³ грунта", image: "/hero-excavator.jpg" },
  { title: "Монтаж металлоконструкций складского комплекса", place: "Домодедово", scope: "4 автокрана в смену", image: "/crane-truck.jpg" },
  { title: "Подготовка площадки под промышленный объект", place: "Подольск", scope: "12 единиц техники", image: "/excavator-work.jpg" },
  { title: "Благоустройство территории бизнес-парка", place: "Красногорск", scope: "26 рабочих смен", image: "/hero-excavator.jpg" },
];

export default function ProjectsPage() {
  return <main className="min-h-screen bg-background"><SiteHeader /><PageHero eyebrow="Наши объекты" title="Техника в реальной работе" text="Примеры комплексных задач: земляные работы, подъём, перевозка и подготовка территорий." /><section className="bg-white py-20"><div className="shell grid gap-6 md:grid-cols-2">{projects.map((project, index) => <article key={project.title} className="group overflow-hidden border border-black/12"><div className="relative h-80 overflow-hidden"><img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute right-4 top-4 grid h-12 w-12 place-items-center bg-brand"><ArrowUpRight /></span></div><div className="grid gap-4 p-6 sm:grid-cols-[1fr_auto]"><div><p className="text-sm font-black uppercase tracking-[.1em] text-orange-600">Проект {String(index + 1).padStart(2, "0")}</p><h2 className="mt-2 text-2xl font-black leading-tight tracking-[-.04em]">{project.title}</h2><p className="mt-3 text-sm text-muted-foreground">{project.place}</p></div><p className="self-end border-l-2 border-brand pl-4 font-black">{project.scope}</p></div></article>)}</div></section><SiteFooter /></main>;
}
