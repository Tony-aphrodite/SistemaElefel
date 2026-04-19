'use client'
import { useState } from 'react'
import {
  Zap,
  Package,
  Store,
  BarChart3,
  ScanBarcode,
  Users,
  Printer,
  Database,
  Link2,
  ShieldCheck,
  Clock,
  TrendingUp,
  Receipt,
  CircleCheckBig,
  ArrowRight,
  Check,
  Banknote,
  Boxes,
  Monitor,
} from 'lucide-react'

// NOTA: Todos los datos de esta página son PLACEHOLDER para demo visual.
// Reemplazar con información real cuando el cliente la proporcione.
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || '50212345678'
const WA_LINK = `https://api.whatsapp.com/send?phone=${WHATSAPP}`
const ELEVENTA_DOWNLOAD_URL = process.env.NEXT_PUBLIC_ELEVENTA_DOWNLOAD_URL || '#'

const features = [
  {
    icon: Zap,
    title: 'Punto de venta ágil',
    desc: 'Cobra en segundos con una interfaz diseñada para cajeros. Atajos de teclado, búsqueda rápida y teclado numérico táctil optimizado.',
  },
  {
    icon: Package,
    title: 'Control total de inventario',
    desc: 'Gestiona miles de productos con stock mínimo, alertas de reabastecimiento, lotes, fechas de vencimiento y ajustes de inventario.',
  },
  {
    icon: Store,
    title: 'Múltiples sucursales',
    desc: 'Administra varias tiendas desde un solo lugar. Transferencias entre sucursales, stock consolidado y reportes por ubicación.',
  },
  {
    icon: BarChart3,
    title: 'Reportes en tiempo real',
    desc: 'Ventas por hora, productos más vendidos, rentabilidad, comparativos por periodo. Exporta a Excel o PDF con un clic.',
  },
  {
    icon: ScanBarcode,
    title: 'Lector de códigos de barras',
    desc: 'Compatible con cualquier lector USB o Bluetooth. Genera etiquetas de código de barras propias para productos a granel.',
  },
  {
    icon: Users,
    title: 'Clientes y fidelización',
    desc: 'Base de clientes con historial, crédito, descuentos especiales y programa de puntos integrado para fomentar la recompra.',
  },
  {
    icon: Printer,
    title: 'Hardware universal',
    desc: 'Funciona con impresoras térmicas 58mm/80mm, cajones de dinero, básculas, visores de cliente y pantallas táctiles.',
  },
  {
    icon: Database,
    title: 'Base de datos robusta',
    desc: 'Firebird SQL confiable, respaldos automáticos programables y sincronización en la nube opcional para proteger tus datos.',
  },
  {
    icon: Link2,
    title: 'Integración nativa con EleFEL',
    desc: 'Conecta con nuestro módulo de Facturación Electrónica FEL para emitir DTEs certificados ante la SAT automáticamente.',
  },
]

const plans = [
  {
    name: 'Básica',
    price: 'Q 1,500',
    period: 'pago único',
    subtitle: 'Ideal para negocios pequeños',
    highlight: false,
    features: [
      '1 terminal de venta',
      'Inventario ilimitado',
      'Reportes estándar',
      'Soporte por WhatsApp',
      'Actualizaciones gratis 1 año',
    ],
  },
  {
    name: 'Profesional',
    price: 'Q 2,800',
    period: 'pago único',
    subtitle: 'Para negocios en crecimiento',
    highlight: true,
    badge: 'Más popular',
    features: [
      'Hasta 3 terminales',
      'Todos los reportes avanzados',
      'Programa de fidelización',
      'Soporte prioritario',
      'Actualizaciones gratis 2 años',
      'Capacitación incluida',
    ],
  },
  {
    name: 'Multi-sucursal',
    price: 'Q 5,500',
    period: 'pago único',
    subtitle: 'Para cadenas y empresas',
    highlight: false,
    badge: 'Empresarial',
    features: [
      'Terminales ilimitadas',
      'Sucursales ilimitadas',
      'Sincronización en la nube',
      'Reportes consolidados',
      'Soporte dedicado 24/7',
      'Migración de datos incluida',
    ],
  },
]

const steps = [
  { num: '1', title: 'Descarga Eleventa', desc: 'Descarga el instalador directamente desde nuestro sitio o contáctanos para recibir el enlace.' },
  { num: '2', title: 'Elige tu plan', desc: 'Escríbenos por WhatsApp para elegir la licencia que mejor se adapte a tu negocio.' },
  { num: '3', title: 'Instala y configura', desc: 'Te ayudamos a configurar productos, precios, impuestos y personalizar la pantalla de venta.' },
  { num: '4', title: 'Comienza a vender', desc: 'Empieza a cobrar desde el primer día. Capacitación para cajeros incluida.' },
]

const industries = [
  { icon: Store, name: 'Tiendas y abarroterías' },
  { icon: Banknote, name: 'Farmacias' },
  { icon: Boxes, name: 'Ferreterías' },
  { icon: Receipt, name: 'Restaurantes y cafeterías' },
  { icon: Package, name: 'Librerías y papelerías' },
  { icon: Monitor, name: 'Tiendas de electrónicos' },
]

const stats = [
  { icon: TrendingUp, value: '+5,000', label: 'Negocios en Guatemala' },
  { icon: Clock, value: '24/7', label: 'Soporte técnico' },
  { icon: ShieldCheck, value: '100%', label: 'Compatible con SAT' },
  { icon: Zap, value: '< 2 seg', label: 'Tiempo por venta' },
]

export default function EleventaPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/eleventa" className="flex items-center gap-2">
              <span className="text-2xl font-black text-gray-900">
                Eleventa<span className="text-orange-500">.</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'Características', href: '#caracteristicas' },
                { label: 'Precios', href: '#precios' },
                { label: 'Cómo funciona', href: '#como-funciona' },
                { label: 'EleFEL', href: '/' },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Solicitar licencia
              </a>
            </div>

            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            {[
              { label: 'Características', href: '#caracteristicas' },
              { label: 'Precios', href: '#precios' },
              { label: 'Cómo funciona', href: '#como-funciona' },
              { label: 'EleFEL', href: '/' },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                className="block text-sm font-medium text-gray-700 hover:text-orange-600 py-1"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-full text-center hover:bg-orange-600"
            >
              Solicitar licencia
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white pt-24 pb-20 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-semibold px-3 py-1 rounded-full mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                Distribuidor oficial autorizado
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                El punto de venta<br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  más usado
                </span><br />
                en Guatemala
              </h1>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Eleventa es el sistema POS más confiable del mercado guatemalteco. Inventario, ventas, reportes y facturación electrónica en un solo sistema.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={ELEVENTA_DOWNLOAD_URL}
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-colors shadow-lg shadow-orange-500/30"
                >
                  Descargar Eleventa
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
                >
                  <WhatsAppIcon /> Hablar con ventas
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex items-center gap-6 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <CircleCheckBig className="w-4 h-4 text-emerald-400" />
                  Licencia perpetua
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheckBig className="w-4 h-4 text-emerald-400" />
                  Sin mensualidades
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheckBig className="w-4 h-4 text-emerald-400" />
                  Soporte local
                </div>
              </div>
            </div>

            {/* Hero visual: POS mockup */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Main card — sale in progress */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 text-gray-900">
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">VENTA #2048</p>
                      <p className="text-sm font-bold text-gray-900">Caja Principal · Nelson</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                      EN CURSO
                    </span>
                  </div>

                  <div className="space-y-3 mb-5">
                    {[
                      { name: 'Coca-Cola 2L', qty: 2, price: 'Q 32.00' },
                      { name: 'Pan francés', qty: 12, price: 'Q 18.00' },
                      { name: 'Huevos cartón 30u', qty: 1, price: 'Q 45.50' },
                      { name: 'Leche Dos Pinos 1L', qty: 3, price: 'Q 42.75' },
                    ].map(item => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-gray-400 font-mono text-xs w-6 text-right">{item.qty}×</span>
                          <span className="text-gray-700 truncate">{item.name}</span>
                        </div>
                        <span className="text-gray-900 font-semibold tabular-nums">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span className="tabular-nums">Q 124.78</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>IVA (12%)</span>
                      <span className="tabular-nums">Q 13.47</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-gray-100">
                      <span className="text-sm font-bold text-gray-900">TOTAL</span>
                      <span className="text-2xl font-black text-gray-900 tabular-nums">Q 138.25</span>
                    </div>
                  </div>

                  <button className="mt-5 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-xl text-sm shadow-md">
                    COBRAR · F12
                  </button>
                </div>

                {/* Floating badge — connected with EleFEL */}
                <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Con EleFEL conectado</p>
                    <p className="text-sm font-bold text-gray-900">DTE certificado automático</p>
                  </div>
                </div>

                {/* Floating badge — top left */}
                <div className="absolute -top-4 -left-4 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-slate-300 text-xs font-semibold">Sistema operando</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-white border-b border-gray-100 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-50 mb-3">
                <s.icon className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-gray-900">{s.value}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="caracteristicas" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              CARACTERÍSTICAS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Todo lo que necesitas para<br />administrar tu negocio
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Eleventa combina simplicidad de uso con herramientas profesionales de gestión comercial.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div
                key={f.title}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                  <f.icon className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              INDUSTRIAS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Para cualquier tipo de negocio
            </h2>
            <p className="text-gray-500 text-lg">Miles de comercios en Guatemala ya confían en Eleventa</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map(ind => (
              <div
                key={ind.name}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-gray-50 hover:bg-orange-50 hover:scale-105 transition-all cursor-default"
              >
                <ind.icon className="w-8 h-8 text-gray-600 mb-3" />
                <p className="text-xs sm:text-sm font-semibold text-gray-700">{ind.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="como-funciona" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              PROCESO
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Empieza en 4 pasos</h2>
            <p className="text-gray-500 text-lg">Desde la descarga hasta tu primera venta en menos de un día</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-3/4 w-1/2 h-0.5 bg-orange-200 z-0" />
                )}
                <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white text-2xl font-black flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
                  {step.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="precios" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              PRECIOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Licencias perpetuas</h2>
            <p className="text-gray-500 text-lg">Paga una vez y úsalo para siempre. Sin mensualidades ocultas.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map(plan => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-slate-900 to-zinc-900 text-white shadow-2xl scale-105 border-2 border-orange-400'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-200'
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full ${
                      plan.highlight ? 'bg-orange-400 text-orange-900' : 'bg-slate-900 text-white'
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}
                <h3 className={`font-bold text-lg mb-1 ${plan.highlight ? 'text-orange-300' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mb-4 ${plan.highlight ? 'text-slate-400' : 'text-gray-500'}`}>
                  {plan.subtitle}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className={`text-sm ml-2 ${plan.highlight ? 'text-slate-400' : 'text-gray-400'}`}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          plan.highlight ? 'text-orange-400' : 'text-orange-500'
                        }`}
                      />
                      <span className={plan.highlight ? 'text-slate-200' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center font-bold py-3 rounded-full transition-colors ${
                    plan.highlight
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Solicitar esta licencia
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">
            Pagos por transferencia bancaria. Te enviamos el comprobante y la clave de activación por WhatsApp.
          </p>
        </div>
      </section>

      {/* ── CROSS-SELL: ELEFEL BUNDLE ── */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  <Link2 className="w-3.5 h-3.5" />
                  Solución completa
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
                  Combina Eleventa con<br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    EleFEL FEL
                  </span>
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Emite facturas electrónicas certificadas por la SAT de Guatemala automáticamente desde cada venta de Eleventa. Sin procesos manuales.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    'Certificación automática vía Infile',
                    'Compatible con Régimen General y PEQ',
                    'Impresión FEL en tickets térmicos',
                    'Respaldo en PDF y XML',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CircleCheckBig className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full transition-colors"
                >
                  Conocer EleFEL
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-sm">
                      E
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500" />
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xs">
                      FEL
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500" />
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                      <CircleCheckBig className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Venta Eleventa</span>
                      <span className="text-emerald-300">Registrada</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>XML generado</span>
                      <span className="text-emerald-300">OK</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Firma digital</span>
                      <span className="text-emerald-300">OK</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Certificación SAT</span>
                      <span className="text-emerald-300">Autorizado</span>
                    </div>
                    <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-700">
                      <span>DTE impreso</span>
                      <span className="text-emerald-300">Cliente</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs mt-4 font-mono text-center">Tiempo total: 2.4s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 py-20 px-4 sm:px-6 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
            ¿Listo para modernizar tu negocio?
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
            Contáctanos y te asesoramos en la elección de la licencia correcta, instalación y configuración inicial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-colors shadow-lg shadow-orange-500/30 text-lg"
            >
              <WhatsAppIcon size={22} /> Escribir por WhatsApp
            </a>
            <a
              href={ELEVENTA_DOWNLOAD_URL}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-lg"
            >
              Descargar Eleventa
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-2xl font-black text-white">
              Eleventa<span className="text-orange-500">.</span>
            </span>
            <p className="text-xs mt-1">Punto de Venta · Distribuidor oficial en Guatemala</p>
          </div>
          <div className="text-xs text-center sm:text-right">
            <p>
              ¿Buscas Facturación Electrónica?{' '}
              <a href="/" className="text-white font-semibold hover:text-orange-400 transition-colors">
                Conoce EleFEL
              </a>
            </p>
            <p className="mt-1">© {new Date().getFullYear()} Todos los derechos reservados</p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        title="Contactar por WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </a>
    </div>
  )
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
