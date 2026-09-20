export type Equipment = {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  image: string;
  price: number;
  hourPrice: number;
  minimum: string;
  specs: [string, string][];
  description: string;
};

export const equipment: Equipment[] = [
  {
    slug: "jcb-3cx",
    name: "Экскаватор-погрузчик JCB 3CX",
    category: "excavators",
    categoryLabel: "Экскаваторы-погрузчики",
    image: "/excavator-work.jpg",
    price: 25000,
    hourPrice: 3125,
    minimum: "Заказ от 8 часов",
    specs: [["Объём ковша", "1 м³"], ["Глубина копания", "5,46 м"], ["Масса", "8,1 т"], ["Мощность", "92 л.с."]],
    description: "Универсальная машина для земляных, погрузочных и планировочных работ на городских объектах.",
  },
  {
    slug: "hitachi-zx200",
    name: "Гусеничный экскаватор Hitachi ZX200",
    category: "excavators",
    categoryLabel: "Экскаваторы",
    image: "/hero-excavator.jpg",
    price: 22000,
    hourPrice: 2750,
    minimum: "Заказ от 8 часов",
    specs: [["Объём ковша", "1 м³"], ["Глубина копания", "6,67 м"], ["Масса", "20,4 т"], ["Мощность", "168 л.с."]],
    description: "Производительный экскаватор для разработки котлованов, траншей и перемещения грунта.",
  },
  {
    slug: "hyundai-hl740",
    name: "Фронтальный погрузчик Hyundai HL740",
    category: "loaders",
    categoryLabel: "Погрузчики",
    image: "/excavator-work.jpg",
    price: 18000,
    hourPrice: 2250,
    minimum: "Заказ от 8 часов",
    specs: [["Объём ковша", "2,1 м³"], ["Высота выгрузки", "2,9 м"], ["Масса", "12 т"], ["Мощность", "145 л.с."]],
    description: "Подходит для погрузки сыпучих материалов, расчистки площадок и планировки территории.",
  },
  {
    slug: "xcmg-qy25k",
    name: "Автокран XCMG QY25K",
    category: "cranes",
    categoryLabel: "Автокраны",
    image: "/crane-truck.jpg",
    price: 24000,
    hourPrice: 3000,
    minimum: "Заказ от 8 часов",
    specs: [["Грузоподъёмность", "25 т"], ["Длина стрелы", "38 м"], ["Высота подъёма", "46 м"], ["Колёсная формула", "6×4"]],
    description: "Манёвренный автокран для монтажа конструкций, разгрузки оборудования и высотных работ.",
  },
  {
    slug: "kamaz-kanglim",
    name: "Манипулятор КАМАЗ Kanglim",
    category: "transport",
    categoryLabel: "Манипуляторы",
    image: "/crane-truck.jpg",
    price: 19800,
    hourPrice: 2475,
    minimum: "Заказ от 8 часов",
    specs: [["Борт", "10 т"], ["Стрела", "7 т"], ["Вылет стрелы", "20 м"], ["Платформа", "6,2 м"]],
    description: "Перевозит и самостоятельно загружает стройматериалы, бытовки и оборудование.",
  },
  {
    slug: "volvo-l120",
    name: "Фронтальный погрузчик Volvo L120",
    category: "loaders",
    categoryLabel: "Погрузчики",
    image: "/hero-excavator.jpg",
    price: 21000,
    hourPrice: 2625,
    minimum: "Заказ от 8 часов",
    specs: [["Объём ковша", "3,3 м³"], ["Грузоподъёмность", "5 т"], ["Масса", "18 т"], ["Мощность", "245 л.с."]],
    description: "Мощный погрузчик для интенсивной работы на складах, карьерах и крупных стройплощадках.",
  },
  {
    slug: "bomag-bw213",
    name: "Грунтовый каток Bomag BW213",
    category: "road",
    categoryLabel: "Дорожная техника",
    image: "/excavator-work.jpg",
    price: 17000,
    hourPrice: 2125,
    minimum: "Заказ от 8 часов",
    specs: [["Рабочая масса", "13 т"], ["Ширина вальца", "2,13 м"], ["Амплитуда", "1,9 мм"], ["Мощность", "130 л.с."]],
    description: "Уплотнение грунта, щебня и оснований при дорожном строительстве и благоустройстве.",
  },
  {
    slug: "kamaz-6520",
    name: "Самосвал КАМАЗ 6520",
    category: "transport",
    categoryLabel: "Самосвалы",
    image: "/crane-truck.jpg",
    price: 16000,
    hourPrice: 2000,
    minimum: "Заказ от 8 часов",
    specs: [["Грузоподъёмность", "20 т"], ["Объём кузова", "12 м³"], ["Колёсная формула", "6×4"], ["Мощность", "400 л.с."]],
    description: "Вывоз грунта и строительного мусора, доставка песка, щебня и других сыпучих материалов.",
  },
];

export const categoryFilters = [
  ["all", "Вся техника"],
  ["excavators", "Экскаваторы"],
  ["loaders", "Погрузчики"],
  ["cranes", "Краны"],
  ["transport", "Перевозка"],
  ["road", "Дорожная техника"],
] as const;

export const services = [
  { slug: "earthworks", title: "Земляные работы", text: "Котлованы, траншеи, планировка и обратная засыпка.", icon: "excavator" },
  { slug: "demolition", title: "Снос и демонтаж", text: "Разбор зданий и конструкций с вывозом отходов.", icon: "demolition" },
  { slug: "transport", title: "Перевозка техники", text: "Тралы и низкорамные платформы по Москве и России.", icon: "transport" },
  { slug: "waste", title: "Вывоз грунта", text: "Погрузка, перевозка и утилизация с документами.", icon: "waste" },
  { slug: "roads", title: "Дорожные работы", text: "Подготовка основания, укладка и уплотнение покрытий.", icon: "roads" },
  { slug: "lifting", title: "Подъёмные работы", text: "Монтаж конструкций и разгрузка оборудования.", icon: "lifting" },
];
