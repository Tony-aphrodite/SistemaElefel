import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EleFEL — Facturación Electrónica para Eleventa',
  description: 'Sistema de Facturación Electrónica (FEL) integrado con Eleventa. Emite facturas electrónicas certificadas por Infile de forma automática desde tu punto de venta.',
  keywords: 'EleFEL, FEL, facturación electrónica, Eleventa, Guatemala, Infile, DTE',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  )
}
