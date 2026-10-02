import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { AddToBagButton, CartCount } from '../../CartActions'
import { fallbackDishes, menuImage, type MenuItem } from '../../menu-data'

export const dynamic = 'force-dynamic'

async function getDish(id: string): Promise<MenuItem | undefined> {
  const fallback = fallbackDishes.find((dish) => dish.id === id)
  if (fallback) return fallback
  if (!/^\d+$/.test(id)) return undefined

  try {
    const payload = await getPayload({ config: await config })
    const dish = await payload.findByID({ collection: 'menu-items', id: Number(id), depth: 1 })
    return dish.isAvailable ? dish as MenuItem : undefined
  } catch {
    return undefined
  }
}

export default async function MenuItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const dish = await getDish(id)
  if (!dish) notFound()
  const photo = menuImage(dish)
  const category = typeof dish.category === 'object' ? dish.category?.name : undefined

  return <div className="min-h-screen bg-[#fbf8ef] text-[#29231e]">
    <header className="border-b border-[#e5d9c2]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        <Link className="font-display text-xl font-bold text-[#781d1c]" href="/">Tasty Heaven</Link>
        <Link className="bg-[#781d1c] px-3 py-2 text-sm text-white" href="/checkout">Bag <CartCount /></Link>
      </div>
    </header>
    <main className="mx-auto grid max-w-5xl gap-8 px-4 py-8 sm:grid-cols-2 sm:gap-12 sm:px-8 sm:py-14">
      <div className="aspect-[1.1] bg-[#e8dfcf] bg-cover bg-center sm:aspect-square" style={{ backgroundImage: `url('${photo}')` }} role="img" aria-label={dish.name} />
      <div className="self-center">
        <Link className="text-sm text-[#766c61] underline underline-offset-4" href="/">&larr; Back to menu</Link>
        {category && <p className="mb-2 mt-8 text-xs font-bold uppercase tracking-[0.12em] text-[#a44a27]">{category}</p>}
        <h1 className="mb-3 mt-8 font-display text-4xl leading-tight sm:text-5xl">{dish.name}</h1>
        {dish.description && <p className="text-sm leading-6 text-[#766c61]">{dish.description}</p>}
        <p className="my-6 text-xl font-semibold text-[#781d1c]">रु. {Number(dish.price).toLocaleString('en-IN')}</p>
        <AddToBagButton itemId={String(dish.id)} itemName={dish.name} price={Number(dish.price)} />
        <p className="mt-5"><Link className="text-sm font-semibold text-[#781d1c] underline underline-offset-4" href="/checkout">Go to checkout</Link></p>
      </div>
    </main>
  </div>
}
