import type { SideItem } from "./types";

export const sideItems: SideItem[] = [
  {
    title: "Сайт", sub: [
      { href: '/users', title: "Пользователи" },
      { href: '/seo', title: "SEO" },
      {
        title: "Буриме", sub: [
          { href: '/users', title: "Пользователи" },
          { href: '/seo', title: "SEO" },
          { href: '/burime', title: "Буриме" },
        ]
      },
    ]
  },
  { href: '/users', title: "Пользователи" },
  { href: '/seo', title: "SEO" },
  { href: '/burime', title: "Буриме" },
]
