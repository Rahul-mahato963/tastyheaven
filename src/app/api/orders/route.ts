import { getPayload } from 'payload'

import config from '@/payload.config'
import { fallbackDishes } from '@/app/(frontend)/menu-data'

type SubmittedLine = { id: unknown; quantity: unknown }

function cleanText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json() as Record<string, unknown>
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const customerName = cleanText(body.customerName, 100)
  const phone = cleanText(body.phone, 30)
  const deliveryAddress = cleanText(body.deliveryAddress, 500)
  const paymentReference = cleanText(body.paymentReference, 100)
  const lines = Array.isArray(body.items) ? body.items as SubmittedLine[] : []

  if (!customerName || !phone || !deliveryAddress || !paymentReference || !lines.length || lines.length > 50) {
    return Response.json({ error: 'Please complete all order and payment fields.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: await config })
    const resolvedItems = []

    for (const line of lines) {
      const id = cleanText(line.id, 80)
      const quantity = Number(line.quantity)
      if (!id || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        return Response.json({ error: 'One or more cart items are invalid.' }, { status: 400 })
      }

      const fallback = fallbackDishes.find((dish) => String(dish.id) === id)
      let item: { id: number | string; name: string; price: number; isAvailable?: boolean | null } | undefined
      if (fallback) {
        item = fallback
      } else if (/^\d+$/.test(id)) {
        try {
          const doc = await payload.findByID({ collection: 'menu-items', id: Number(id), depth: 0 })
          if (doc.isAvailable) item = doc
        } catch {
          item = undefined
        }
      }

      if (!item) return Response.json({ error: 'A menu item is unavailable. Refresh the menu and try again.' }, { status: 400 })
      resolvedItems.push({ itemId: id, name: item.name, quantity, unitPrice: Number(item.price) })
    }

    const total = resolvedItems.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
    const order = await payload.create({
      collection: 'orders',
      overrideAccess: false,
      data: {
        customerName,
        phone,
        deliveryAddress,
        items: resolvedItems,
        total,
        paymentReference,
        paymentStatus: 'reference-submitted',
        orderStatus: 'new',
      },
    })

    return Response.json({ orderId: order.id }, { status: 201 })
  } catch {
    return Response.json({ error: 'We could not save the order. Please try again or contact the restaurant.' }, { status: 503 })
  }
}
