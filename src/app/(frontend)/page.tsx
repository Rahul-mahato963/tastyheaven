import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { AddToBagButton, CartCount } from './CartActions'
import { fallbackDishes, menuImage, type MenuItem } from './menu-data'

export const dynamic = 'force-dynamic'

async function loadMenu() {
  try {
    const payload = await getPayload({ config: await config })
    const result = await payload.find({
      collection: 'menu-items',
      where: { isAvailable: { equals: true } },
      limit: 100,
      sort: 'name',
      depth: 1,
    })
    return result.docs as MenuItem[]
  } catch {
    return []
  }
}

export default async function HomePage() {
  const menu = await loadMenu()
  const dishes = menu.length ? menu : fallbackDishes
  const groups = new Map<string, MenuItem[]>()

  for (const dish of dishes) {
    const fallbackGroup = 'group' in dish && typeof dish.group === 'string' ? dish.group : 'Menu favorites'
    const groupName = typeof dish.category === 'object' && dish.category?.name ? dish.category.name : fallbackGroup
    groups.set(groupName, [...(groups.get(groupName) || []), dish])
  }

  const groupEntries = [...groups.entries()]

  return (
    <div className="min-h-screen bg-[#fbf8ef] text-[#29231e]">
      <header className="sticky top-0 z-10 border-b border-[#e5d9c2] bg-[#fbf8ef]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
<Link
  className="inline-flex flex-col items-center font-display text-xl font-bold leading-tight text-[#781d1c] sm:text-2xl"
  href="/"
>
  Tasty Heaven
  <span className="text-sm font-normal">Restaurant</span>
</Link>          <nav className="flex items-center gap-4 text-sm sm:gap-7" aria-label="Main navigation">
            <a className="hidden sm:block" href="#menu">Menu</a>
            <Link href="/admin/collections/menu-items">Manage menu</Link>
            <Link className="bg-[#781d1c] px-3 py-2 text-white" href="/checkout">Bag <CartCount /></Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <section className="border-b border-[#e5d9c2] py-10 sm:py-14">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 className="m-0 font-display text-4xl leading-tight sm:text-5xl">Good food, made fresh.</h1>
              <p className="mb-0 mt-3 text-sm text-[#766c61]">Tea, snacks, momo and much more.</p>
            </div>
            <p className="mb-1 text-sm font-semibold text-[#781d1c]">All prices in NPR</p>
          </div>
          <nav className="mt-7 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" aria-label="Menu categories">
            {groupEntries.map(([name]) => <a className="shrink-0 border border-[#d8c8ab] px-3 py-2 text-xs transition-colors hover:border-[#781d1c] hover:text-[#781d1c]" href={`#${encodeURIComponent(name)}`} key={name}>{name}</a>)}
          </nav>
        </section>

        <div id="menu">
          {groupEntries.map(([name, items]) => <section className="border-b border-[#e5d9c2] py-8 sm:py-10" id={name} key={name}>
            <h2 className="mb-5 mt-0 font-display text-2xl sm:text-3xl">{name}</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-4">
              {items.map((dish) => <article className="menu-card" key={dish.id}>
                  <Link className="menu-card-link" href={`/menu/${dish.id}`} aria-label={`View ${dish.name}`}>
                    <div className="menu-card-image" style={{ backgroundImage: `url('${menuImage(dish)}')` }} role="img" aria-label={dish.name} />
                    <div className="flex min-h-[55px] items-start justify-between gap-2 px-3 pt-3">
                      <h3 className="m-0 text-sm font-semibold leading-snug sm:text-base">{dish.name}</h3>
                      <strong className="shrink-0 text-sm text-[#781d1c]">रु. {Number(dish.price).toLocaleString('en-IN')}</strong>
                    </div>
                  </Link>
                  <div className="px-3 pb-3"><AddToBagButton itemId={String(dish.id)} itemName={dish.name} price={Number(dish.price)} /></div>
                </article>)}
            </div>
          </section>)}
        </div>
      </main>

      <footer className="border-t border-[#e5d9c2]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-xs text-[#766c61] sm:px-8">
          <span className="font-display text-base font-bold text-[#781d1c]">Tasty Heaven</span>
          <Link className="underline underline-offset-2" href="/admin/collections/menu-items">Manage menu items</Link>
          <span>© 2026 Tasty Heaven</span>
        </div>
      </footer>
    </div>
  )
}
