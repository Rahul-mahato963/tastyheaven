import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { CheckoutClient } from './CheckoutClient'

export const dynamic = 'force-dynamic'

export default async function CheckoutPage() {
  let esewaNumber = '9800000000'
  try {
    const payload = await getPayload({ config: await config })
    const settings = await payload.findGlobal({ slug: 'store-settings' })
    if (settings.esewaNumber) esewaNumber = settings.esewaNumber
  } catch {
    // The placeholder remains visible if store settings are not yet configured.
  }

  return <div className="min-h-screen bg-[#fbf8ef] text-[#29231e]">
    <header className="border-b border-[#e5d9c2]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        <Link className="font-display text-xl font-bold text-[#781d1c]" href="/">Tasty Heaven</Link>
        <Link className="text-sm" href="/">Menu</Link>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      <h1 className="mb-2 mt-0 font-display text-4xl">Checkout</h1>
      <p className="mb-8 mt-0 text-sm text-[#766c61]">Review your items and delivery details.</p>
      <CheckoutClient esewaNumber={esewaNumber} />
    </main>
    <footer className="border-t border-[#e5d9c2] py-5 text-center text-xs text-[#766c61]">Tasty Heaven · All prices in NPR</footer>
  </div>
}
