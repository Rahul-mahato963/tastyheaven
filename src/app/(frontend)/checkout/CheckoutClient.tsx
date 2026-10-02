'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { readCart, writeCart, type CartLine } from '../CartActions'

type Props = { esewaNumber: string }

export function CheckoutClient({ esewaNumber }: Props) {
  const [cart, setCart] = useState<CartLine[]>([])
  const [error, setError] = useState('')
  const [orderId, setOrderId] = useState<string | number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const isDemoNumber = esewaNumber === '9800000000'

  useEffect(() => setCart(readCart()), [])

  function changeQuantity(id: string, delta: number) {
    const next = cart.map((line) => line.id === id ? { ...line, quantity: line.quantity + delta } : line)
      .filter((line) => line.quantity > 0)
    writeCart(next)
    setCart(next)
  }

  async function placeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const form = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.get('customerName'),
          phone: form.get('phone'),
          deliveryAddress: form.get('deliveryAddress'),
          paymentReference: form.get('paymentReference'),
          items: cart.map(({ id, quantity }) => ({ id, quantity })),
        }),
      })
      const result = await response.json() as { error?: string; orderId?: string | number }
      if (!response.ok || !result.orderId) throw new Error(result.error || 'Could not place this order.')
      writeCart([])
      setCart([])
      setOrderId(result.orderId)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not place this order.')
    } finally {
      setSubmitting(false)
    }
  }

  const total = cart.reduce((sum, line) => sum + line.price * line.quantity, 0)
  const money = (amount: number) => `रु. ${amount.toLocaleString('en-IN')}`

  if (orderId) return <section className="border-t border-[#e5d9c2] py-8">
    <h2 className="font-display text-3xl">Order received</h2>
    <p>Your order number is <strong>#{orderId}</strong>. We have saved your eSewa reference for the restaurant to verify.</p>
    <p className="text-sm text-[#766c61]">The restaurant will confirm payment before preparing your order.</p>
    <Link className="mt-4 inline-block bg-[#781d1c] px-4 py-3 text-sm text-white" href="/">Back to menu</Link>
  </section>

  if (!cart.length) return <section className="border-t border-[#e5d9c2] py-8">
    <h2 className="font-display text-2xl">Your bag is empty</h2>
    <Link className="mt-3 inline-block text-sm font-semibold text-[#781d1c] underline underline-offset-4" href="/">Browse the menu</Link>
  </section>

  return <div className="grid gap-9 border-t border-[#e5d9c2] py-8 lg:grid-cols-[1fr_1.1fr]">
    <section>
      <h2 className="mt-0 font-display text-2xl">Your order</h2>
      <ul className="m-0 list-none divide-y divide-[#e5d9c2] p-0">
        {cart.map((line) => <li className="flex items-center justify-between gap-3 py-4" key={line.id}>
          <div><p className="m-0 font-semibold">{line.name}</p><p className="mb-0 mt-1 text-sm text-[#766c61]">{money(line.price * line.quantity)}</p></div>
          <div className="flex items-center gap-3">
            <button className="size-8 border border-[#d8c8ab]" onClick={() => changeQuantity(line.id, -1)} aria-label={`Remove one ${line.name}`}>−</button>
            <span className="min-w-4 text-center">{line.quantity}</span>
            <button className="size-8 border border-[#d8c8ab]" onClick={() => changeQuantity(line.id, 1)} aria-label={`Add one ${line.name}`}>+</button>
          </div>
        </li>)}
      </ul>
      <p className="flex justify-between border-t border-[#e5d9c2] pt-4 text-lg font-bold"><span>Total</span><span>{money(total)}</span></p>
    </section>

    <section>
      <h2 className="mt-0 font-display text-2xl">Pay with eSewa</h2>
      {isDemoNumber ? <div className="mb-5 border border-[#c77c47] bg-[#fff5e8] p-4 text-sm">
        <strong>Set your payment number before taking orders.</strong>
        <p className="mb-2 mt-1">The current number is a demo placeholder. Replace it with your real eSewa number in Store settings.</p>
        <Link className="font-semibold underline underline-offset-4" href="/admin/globals/store-settings">Open Store settings</Link>
      </div> : <div className="mb-5 border border-[#e5d9c2] p-4">
        <p className="mb-1 text-xs text-[#766c61]">Send exactly {money(total)} to this eSewa number:</p>
        <p className="m-0 text-2xl font-bold text-[#781d1c]">{esewaNumber}</p>
        <p className="mb-0 mt-2 text-xs text-[#766c61]">After paying in the eSewa app, enter the transaction reference below. Payment is verified manually by the restaurant.</p>
      </div>}
      <form className="grid gap-4" onSubmit={placeOrder}>
        <label className="grid gap-1.5 text-sm">Your name<input className="border border-[#d8c8ab] bg-white px-3 py-2.5" name="customerName" autoComplete="name" required maxLength={100} /></label>
        <label className="grid gap-1.5 text-sm">Phone number<input className="border border-[#d8c8ab] bg-white px-3 py-2.5" name="phone" type="tel" autoComplete="tel" required maxLength={30} /></label>
        <label className="grid gap-1.5 text-sm">Delivery address<textarea className="border border-[#d8c8ab] bg-white px-3 py-2.5" name="deliveryAddress" autoComplete="street-address" required maxLength={500} rows={3} /></label>
        <label className="grid gap-1.5 text-sm">eSewa transaction reference<input className="border border-[#d8c8ab] bg-white px-3 py-2.5" name="paymentReference" required maxLength={100} /></label>
        {error && <p className="m-0 text-sm text-red-700" role="alert">{error}</p>}
        <button className="bg-[#781d1c] px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={submitting || isDemoNumber}>
          {submitting ? 'Placing order…' : `Place order · ${money(total)}`}
        </button>
      </form>
    </section>
  </div>
}
