'use client'

import { useEffect, useState } from 'react'

export type CartLine = { id: string; name: string; price: number; quantity: number }

const cartKey = 'tasty-heaven:cart'
const cartEvent = 'tasty-heaven:cart-change'

export function readCart(): CartLine[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(cartKey) || '[]') as CartLine[]
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export function writeCart(lines: CartLine[]) {
  window.localStorage.setItem(cartKey, JSON.stringify(lines))
  window.dispatchEvent(new Event(cartEvent))
}

export function CartCount() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const updateCount = () => setCount(readCart().reduce((sum, line) => sum + line.quantity, 0))
    updateCount()
    window.addEventListener(cartEvent, updateCount)
    return () => window.removeEventListener(cartEvent, updateCount)
  }, [])

  return <span aria-live="polite" aria-atomic="true" className="ml-2">{count}</span>
}

export function AddToBagButton({ itemId, itemName, price }: { itemId: string; itemName: string; price: number }) {
  const [added, setAdded] = useState(false)

  function addItem() {
    const lines = readCart()
    const existing = lines.find((line) => line.id === itemId)
    writeCart(existing
      ? lines.map((line) => line.id === itemId ? { ...line, quantity: line.quantity + 1 } : line)
      : [...lines, { id: itemId, name: itemName, price, quantity: 1 }])
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1200)
  }

  return <button className="mt-2 cursor-pointer border border-[#781d1c] px-2.5 py-1 text-xs font-semibold text-[#781d1c] transition-colors hover:bg-[#781d1c] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#781d1c]" type="button" onClick={addItem} aria-label={added ? `${itemName} added to bag` : `Add ${itemName} to bag`}>
    {added ? 'Added' : 'Add to bag'}
  </button>
}
