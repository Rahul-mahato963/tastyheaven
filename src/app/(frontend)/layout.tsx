import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Neighborhood restaurants and fresh favorites delivered to your door.',
  title: 'Tasty Heaven | Good food, right on time',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="min-h-screen bg-paper font-sans text-ink">{children}</body>
    </html>
  )
}
