'use client'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Zap,
  Package,
  Store,
  BarChart3,
  ScanBarcode,
  ScanLine,
  Users,
  Link2,
  ShieldCheck,
  Clock,
  Receipt,
  CircleCheckBig,
  ArrowRight,
  Check,
  Monitor,
  Tag,
  Tags,
  Scroll,
  Wrench,
  GraduationCap,
  Headphones,
  Truck,
  Sparkles,
  Building2,
  ShoppingBag,
  Pill,
  Utensils,
  Hammer,
  BookOpen,
  Cpu,
  Mail,
  Phone,
  User,
  MessageSquare,
  Send,
  ShoppingCart,
  Repeat,
  Calendar,
  HelpCircle,
} from 'lucide-react'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || '50212345678'
const WA_LINK = `https://api.whatsapp.com/send?phone=${WHATSAPP}`
const ELEVENTA_DOWNLOAD_URL = process.env.NEXT_PUBLIC_ELEVENTA_DOWNLOAD_URL || '#'

const BUNDLE_PRICE = 'Q 17,500'

const catalog = [
  {
    id: 'hp-prodesk',
    brand: 'HP',
    name: 'Computadora empresarial',
    tagline: 'HP ProDesk i7',
    description: 'Mini torre de clase empresarial con procesador Intel Core i7. Configuración adaptable al uso del negocio. Diseñada para operación continua.',
    price: 'Q 5,700',
    image: '/catalog/hp-prodesk.jpeg',
    imageFit: 'cover' as const,
    imagePosition: 'center',
    icon: Monitor,
    badge: 'Workstation',
    category: 'hardware',
  },
  {
    id: '3nstar-receipt',
    brand: '3nStar',
    name: 'Impresora de tickets',
    tagline: 'Térmica 80mm para FEL',
    description: 'Impresora térmica 3nStar de 80mm. Corte automático, alta velocidad de impresión. Compatible con Eleventa y EleFEL.',
    price: 'Q 1,200',
    image: '/catalog/3nstar-thermal-80mm.jpeg',
    imageFit: 'cover' as const,
    imagePosition: 'left center',
    icon: Receipt,
    badge: 'Más vendido',
    category: 'hardware',
  },
  {
    id: '3nstar-label',
    brand: '3nStar',
    name: 'Impresora de etiquetas',
    tagline: 'Etiquetas de productos',
    description: 'Impresora térmica de etiquetas 3nStar. Ideal para imprimir códigos de barras, precios y etiquetas de productos a granel.',
    price: 'Q 1,500',
    image: '/catalog/3nstar-label.png',
    imageFit: 'contain' as const,
    imagePosition: 'center',
    icon: Tag,
    category: 'hardware',
  },
  {
    id: '3nstar-scanner-hf',
    brand: '3nStar',
    name: 'Lector manos libres',
    tagline: 'Omnidireccional de sobremesa',
    description: 'Lector de códigos de barras 3nStar manos libres. Lectura omnidireccional a alta velocidad. Ideal para cajas con alto volumen.',
    price: 'Q 1,400',
    image: '/catalog/3nstar-scanner-handsfree.jpeg',
    imageFit: 'cover' as const,
    imagePosition: 'left center',
    icon: ScanBarcode,
    category: 'hardware',
  },
  {
    id: '3nstar-scanner-hh',
    brand: '3nStar',
    name: 'Lector tipo pistola',
    tagline: 'Handheld con cable USB',
    description: 'Lector de códigos de barras 3nStar de mano. Conexión USB plug-and-play. Perfecto para inventarios y cajas adicionales.',
    price: 'Q 500',
    image: '/catalog/3nstar-scanner-handheld.jpeg',
    imageFit: 'cover' as const,
    imagePosition: 'left center',
    icon: ScanLine,
    category: 'hardware',
  },
  {
    id: 'paper-thermal',
    brand: '3nStar',
    name: 'Papel térmico',
    tagline: '100 rollos',
    description: 'Pack de 100 rollos de papel térmico. Compatible con todas las impresoras térmicas de tickets. Disponible por pack o suscripción mensual.',
    price: 'Q 1,200',
    image: '/catalog/paper-thermal.png',
    imageFit: 'contain' as const,
    imagePosition: 'center',
    icon: Scroll,
    badge: 'Recompra recurrente',
    category: 'consumible',
  },
  {
    id: 'labels-thermal',
    brand: '3nStar',
    name: 'Etiquetas térmicas',
    tagline: '150 rollos',
    description: 'Pack de 150 rollos de etiquetas térmicas adhesivas. Compatible con la impresora de etiquetas 3nStar. Disponible por pack o suscripción mensual.',
    price: 'Q 2,500',
    image: '/catalog/labels-thermal.png',
    imageFit: 'contain' as const,
    imagePosition: 'center',
    icon: Tags,
    badge: 'Recompra recurrente',
    category: 'consumible',
  },
  {
    id: 'eleventa-license',
    brand: 'Eleventa',
    name: 'Licencia Eleventa Multicaja',
    tagline: 'Licencia oficial',
    description: 'Licencia oficial de Eleventa Multicaja para operar el punto de venta. Perpetua, sin mensualidades ocultas.',
    price: 'Q 1,800',
    image: '/catalog/eleventa-license.png',
    imageFit: 'contain' as const,
    imagePosition: 'center',
    icon: Cpu,
    badge: 'Software',
    category: 'software',
  },
  {
    id: 'infile-setup',
    brand: 'Infile',
    name: 'Setup Infile (FEL)',
    tagline: 'Alta y configuración',
    description: 'Alta y configuración en la plataforma de Infile, integración con Eleventa y pruebas de certificación ante la SAT de Guatemala.',
    price: 'Q 1,200',
    image: '/catalog/infile-setup.png',
    imageFit: 'contain' as const,
    imagePosition: 'center',
    icon: ShieldCheck,
    badge: 'Servicio',
    category: 'servicio',
  },
]

const bundleIncludes = [
  { icon: Monitor, label: 'HP ProDesk i7', detail: 'Computadora principal' },
  { icon: Receipt, label: '3nStar Térmica 80mm', detail: 'Impresora de tickets' },
  { icon: Tag, label: '3nStar Etiquetas', detail: 'Impresora de etiquetas' },
  { icon: ScanBarcode, label: 'Scanner hands-free', detail: 'Lector omnidireccional' },
  { icon: ScanLine, label: 'Scanner manual', detail: 'Lector portátil USB' },
  { icon: Scroll, label: 'Rollos de papel térmico', detail: 'Suministro inicial' },
  { icon: Tags, label: 'Rollos de etiquetas', detail: 'Suministro inicial' },
  { icon: Cpu, label: 'Eleventa Multicaja', detail: 'Licencia oficial' },
  { icon: ShieldCheck, label: 'EleFEL + Infile FEL', detail: 'Configurado y listo' },
  { icon: Wrench, label: 'Instalación en sitio', detail: 'Técnico certificado' },
  { icon: GraduationCap, label: 'Capacitación incluida', detail: 'Para todo tu equipo' },
  { icon: Headphones, label: 'Soporte post-venta', detail: 'WhatsApp directo' },
]

const services = [
  {
    icon: Wrench,
    title: 'Instalación en sitio',
    desc: 'Un técnico visita tu local, instala los equipos, configura la red y prueba cada componente antes de entregar.',
    badge: 'Incluido en paquete',
    alsoStandalone: true,
  },
  {
    icon: GraduationCap,
    title: 'Capacitación completa',
    desc: 'Entrenamos a tu equipo en el uso diario de Eleventa y EleFEL. Incluye manuales y sesión práctica con ventas reales.',
    badge: 'Incluido en paquete',
    alsoStandalone: true,
  },
  {
    icon: ShieldCheck,
    title: 'Configuración FEL',
    desc: 'Alta y configuración en la plataforma de Infile, integración con Eleventa y pruebas de certificación ante la SAT.',
    badge: 'Incluido en paquete',
    alsoStandalone: true,
  },
  {
    icon: Headphones,
    title: 'Soporte post-venta',
    desc: 'Canal directo de WhatsApp con tiempos de respuesta garantizados. Asistencia remota y visitas en caso de falla crítica.',
    badge: 'Servicio continuo',
    alsoStandalone: false,
  },
]

const features = [
  {
    icon: Zap,
    title: 'Punto de venta ágil',
    desc: 'Cobra en segundos con interfaz diseñada para cajeros. Atajos de teclado y búsqueda rápida optimizada.',
  },
  {
    icon: Package,
    title: 'Control de inventario',
    desc: 'Stock mínimo, alertas de reabastecimiento, lotes, fechas de vencimiento y ajustes en tiempo real.',
  },
  {
    icon: Store,
    title: 'Múltiples sucursales',
    desc: 'Administra varias tiendas desde un solo lugar. Transferencias y reportes consolidados por ubicación.',
  },
  {
    icon: BarChart3,
    title: 'Reportes profesionales',
    desc: 'Ventas por hora, productos más vendidos, rentabilidad, comparativos. Exporta a Excel o PDF al instante.',
  },
  {
    icon: Users,
    title: 'Clientes y fidelización',
    desc: 'Base de clientes con historial, crédito, descuentos especiales y programa de puntos integrado.',
  },
  {
    icon: Link2,
    title: 'Facturación FEL integrada',
    desc: 'EleFEL emite DTEs certificados ante la SAT automáticamente desde cada venta. Sin procesos manuales.',
  },
]

const industries = [
  { icon: ShoppingBag, name: 'Tiendas y abarroterías' },
  { icon: Pill, name: 'Farmacias' },
  { icon: Hammer, name: 'Ferreterías' },
  { icon: Utensils, name: 'Restaurantes' },
  { icon: BookOpen, name: 'Librerías' },
  { icon: Building2, name: 'Comercios en general' },
]

const stats = [
  { icon: Package, value: '100%', label: 'Solución llave en mano' },
  { icon: Clock, value: '24h', label: 'Instalación tras compra' },
  { icon: ShieldCheck, value: 'SAT', label: 'Facturación FEL' },
  { icon: Headphones, value: 'Local', label: 'Soporte en Guatemala' },
]

const steps = [
  { num: '1', title: 'Contáctanos', desc: 'Escríbenos por WhatsApp o llena el formulario. Te asesoramos según tu tipo de negocio.' },
  { num: '2', title: 'Confirmación y pago', desc: 'Confirmas el paquete, pagas por transferencia bancaria y programamos la instalación.' },
  { num: '3', title: 'Instalación en sitio', desc: 'Visitamos tu local, instalamos todo el equipo, configuramos Eleventa, FEL y probamos cada componente.' },
  { num: '4', title: 'Capacitación y venta', desc: 'Capacitamos a tu equipo y acompañamos las primeras ventas para asegurar que todo funcione perfecto.' },
]

const supplyPlans = [
  {
    name: 'Ocasional',
    tagline: 'Compra cuando lo necesites',
    features: [
      'Pedido cuando lo solicites',
      'Sin compromiso mensual',
      'Entrega programada',
      'Precio regular por pack',
    ],
    cta: 'Cotizar pack',
    highlight: false,
  },
  {
    name: 'Mensual',
    tagline: 'Plan de reposición recurrente',
    features: [
      'Entrega mensual automática',
      'Precio preferencial',
      'Nunca te quedas sin papel',
      'Cancela cuando quieras',
    ],
    cta: 'Activar plan mensual',
    highlight: true,
    badge: 'Más conveniente',
  },
  {
    name: 'Volumen',
    tagline: 'Para múltiples sucursales',
    features: [
      'Descuento por volumen',
      'Distribución a varias ubicaciones',
      'Facturación consolidada',
      'Cuenta corporativa',
    ],
    cta: 'Consultar cuenta',
    highlight: false,
  },
]

const faqs = [
  {
    q: '¿El precio de Q 17,500 incluye todo?',
    a: 'Sí. Incluye la computadora HP ProDesk i7, impresora térmica, impresora de etiquetas, dos scanners 3nStar, suministros iniciales de papel y etiquetas, licencia Eleventa Multicaja, configuración de EleFEL con Infile, instalación en sitio y capacitación.',
  },
  {
    q: '¿Puedo comprar solo algunos equipos sin el paquete?',
    a: 'Claro. Todo el catálogo está disponible por separado. Escríbenos por WhatsApp con la lista de equipos que necesitas y te enviamos una cotización personalizada.',
  },
  {
    q: '¿Cómo funciona el plan de reposición de papel y etiquetas?',
    a: 'Puedes comprar por pack cuando lo necesites o activar un plan mensual con entrega automática y precio preferencial. Ideal para que nunca se detenga tu operación.',
  },
  {
    q: '¿La instalación y capacitación se cobran aparte?',
    a: 'Si compras el paquete completo, ambos están incluidos. Si prefieres contratarlos como servicio independiente (por ejemplo, para equipo que ya tienes), también lo ofrecemos por separado.',
  },
  {
    q: '¿Qué formas de pago aceptan?',
    a: 'Transferencia bancaria. Te compartimos los datos al confirmar el pedido y coordinamos fecha de instalación al recibir el pago.',
  },
  {
    q: '¿Cuánto tiempo tardan en entregar e instalar?',
    a: 'Normalmente entre 24 y 48 horas hábiles después de confirmado el pago, según disponibilidad en tu localidad.',
  },
]

export default function EleventaPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormStatus('sending')
    try {
      await new Promise(r => setTimeout(r, 900))
      setFormStatus('sent')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/eleventa" className="flex items-center gap-2">
              <span className="text-2xl font-black text-gray-900">
                POS<span className="text-orange-500">Total</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-7">
              {[
                { label: 'Solución', href: '#solucion' },
                { label: 'Catálogo', href: '#catalogo' },
                { label: 'Reposición', href: '#reposicion' },
                { label: 'Servicios', href: '#servicios' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Contacto', href: '#contacto' },
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
                Cotizar ahora
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
              { label: 'Solución', href: '#solucion' },
              { label: 'Catálogo', href: '#catalogo' },
              { label: 'Reposición', href: '#reposicion' },
              { label: 'Servicios', href: '#servicios' },
              { label: 'FAQ', href: '#faq' },
              { label: 'Contacto', href: '#contacto' },
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
              Cotizar ahora
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white pt-24 pb-20 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-semibold px-3 py-1 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Paquete todo incluido · {BUNDLE_PRICE}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Abre tu punto<br />
                de venta con<br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  todo incluido
                </span>
              </h1>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Computadora, impresoras, lectores de código de barras, software Eleventa, facturación electrónica EleFEL e instalación completa. Una sola solución, un solo precio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#solucion"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-colors shadow-lg shadow-orange-500/30"
                >
                  Ver paquete completo
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

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <CircleCheckBig className="w-4 h-4 text-emerald-400" />
                  Instalación incluida
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheckBig className="w-4 h-4 text-emerald-400" />
                  Capacitación incluida
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheckBig className="w-4 h-4 text-emerald-400" />
                  Soporte local
                </div>
              </div>
            </div>

            {/* Hero visual: bundle quote preview */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-6 text-gray-900">
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">COTIZACIÓN</p>
                      <p className="text-sm font-bold text-gray-900">Solución POS Completa</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                      PROMOCIÓN
                    </span>
                  </div>

                  <div className="space-y-2.5 mb-5 text-sm">
                    {[
                      { label: 'HP ProDesk i7', detail: '1 unidad' },
                      { label: 'Impresoras 3nStar', detail: '2 unidades' },
                      { label: 'Scanners 3nStar', detail: '2 unidades' },
                      { label: 'Suministros iniciales', detail: 'Incluido' },
                      { label: 'Eleventa Multicaja', detail: 'Licencia' },
                      { label: 'EleFEL + Infile FEL', detail: 'Configurado' },
                      { label: 'Instalación + Capacitación', detail: 'En sitio' },
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-700 truncate">{item.label}</span>
                        </div>
                        <span className="text-gray-400 text-xs">{item.detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-bold text-gray-900">TOTAL</span>
                      <span className="text-3xl font-black text-gray-900 tabular-nums">{BUNDLE_PRICE}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 text-right">precio único · todo incluido</p>
                  </div>

                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 block w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center font-bold py-3 rounded-xl text-sm shadow-md hover:shadow-lg transition-shadow"
                  >
                    SOLICITAR COTIZACIÓN
                  </a>
                </div>

                <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Instalación en</p>
                    <p className="text-sm font-bold text-gray-900">24 horas</p>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-slate-300 text-xs font-semibold">Disponible hoy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
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

      {/* ── SOLUTION BUNDLE ── */}
      <section id="solucion" className="py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-orange-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              SOLUCIÓN LLAVE EN MANO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Todo lo que necesitas<br />en un solo paquete
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Olvídate de comprar equipos por separado, buscar instaladores o configurar software. Te entregamos tu punto de venta listo para empezar a vender.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-3 p-8 sm:p-10">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Este paquete incluye:</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {bundleIncludes.map(item => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-orange-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-zinc-900 p-8 sm:p-10 text-white flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-orange-400/20 text-orange-300 border border-orange-400/30 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    PRECIO ÚNICO
                  </span>
                  <div className="mb-2">
                    <span className="text-5xl sm:text-6xl font-black">{BUNDLE_PRICE}</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-6">
                    Pago único. Sin mensualidades ocultas. Licencia Eleventa Multicaja incluida.
                  </p>

                  <ul className="space-y-2 mb-8">
                    {[
                      'Transferencia bancaria aceptada',
                      'Entrega e instalación 24-48h',
                      'Garantía de fabricante',
                      'Soporte post-venta incluido',
                    ].map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-200">
                        <CircleCheckBig className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-4 rounded-full transition-colors shadow-lg"
                  >
                    Solicitar este paquete
                  </a>
                  <a
                    href="#contacto"
                    className="block w-full border-2 border-white/20 hover:bg-white/10 text-white text-center font-bold py-4 rounded-full transition-colors"
                  >
                    Enviar formulario
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section id="catalogo" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              CATÁLOGO INDIVIDUAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Equipos disponibles por separado
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              ¿Ya tienes computadora o necesitas solo una pieza específica? Todos los componentes del paquete están disponibles individualmente.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalog.map(item => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                  <CatalogImage
                    src={item.image}
                    alt={item.name}
                    Icon={item.icon}
                    fit={item.imageFit}
                    position={item.imagePosition}
                  />
                  {item.badge && (
                    <span className={`absolute top-3 right-3 text-white text-xs font-bold px-2.5 py-1 rounded-full ${
                      item.category === 'consumible'
                        ? 'bg-emerald-500'
                        : item.category === 'software'
                        ? 'bg-blue-600'
                        : item.category === 'servicio'
                        ? 'bg-indigo-600'
                        : 'bg-orange-500'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-bold px-2.5 py-1 rounded-full border border-gray-200">
                    {item.brand}
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-xs text-orange-600 font-semibold mb-1">{item.tagline}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400">Precio</p>
                      <p className={`font-black text-gray-900 ${item.price === 'Consultar precio' ? 'text-sm' : 'text-xl'}`}>
                        {item.price}
                      </p>
                    </div>
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Cotizar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-10 max-w-2xl mx-auto">
            Compra el paquete completo por {BUNDLE_PRICE} y recibe además instalación, capacitación y soporte post-venta sin costo adicional.
          </p>
        </div>
      </section>

      {/* ── SUPPLY REPLENISHMENT ── */}
      <section id="reposicion" className="py-20 px-4 sm:px-6 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Repeat className="w-3.5 h-3.5" />
              RECOMPRA RECURRENTE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Nunca te quedas sin papel
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Papel térmico y etiquetas disponibles por pack o en plan mensual. Elige la modalidad que mejor se adapta a tu negocio.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {supplyPlans.map(plan => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-2xl scale-105'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <div className="mb-4">
                  <h3 className={`text-lg font-black mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlight ? 'text-emerald-100' : 'text-gray-500'}`}>
                    {plan.tagline}
                  </p>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-emerald-200' : 'text-emerald-500'}`} />
                      <span className={plan.highlight ? 'text-emerald-50' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center font-bold py-3 rounded-full transition-colors ${
                    plan.highlight
                      ? 'bg-white text-emerald-700 hover:bg-emerald-50'
                      : 'bg-gray-900 text-white hover:bg-emerald-600'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 mb-1">Programa de cliente frecuente</p>
              <p className="text-sm text-gray-500">
                Los clientes con plan mensual reciben precio preferencial en papel térmico, etiquetas y accesorios. Pregúntanos por los beneficios.
              </p>
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors flex-shrink-0"
            >
              Más información
            </a>
          </div>
        </div>
      </section>

      {/* ── ELEVENTA FEATURES ── */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              SOFTWARE ELEVENTA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              El software más usado en Guatemala
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

          <div className="text-center mt-10">
            <a
              href={ELEVENTA_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold text-sm"
            >
              Descargar versión de prueba oficial de Eleventa
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="servicios" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              SERVICIOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Incluidos en el paquete o por separado
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Todos nuestros servicios vienen incluidos al comprar el paquete completo. También los ofrecemos como servicio independiente si solo necesitas una parte.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(s => (
              <div
                key={s.title}
                className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                  <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                    {s.badge}
                  </span>
                  {s.alsoStandalone && (
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-200">
                      También por separado
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              Contratar servicio individual
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              INDUSTRIAS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Para cualquier tipo de negocio
            </h2>
            <p className="text-gray-500 text-lg">Miles de comercios en Guatemala ya confían en esta solución</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map(ind => (
              <div
                key={ind.name}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-white hover:bg-orange-50 hover:scale-105 transition-all cursor-default border border-gray-100"
              >
                <ind.icon className="w-8 h-8 text-gray-600 mb-3" />
                <p className="text-xs sm:text-sm font-semibold text-gray-700">{ind.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="como-funciona" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              PROCESO
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Empezar es muy fácil</h2>
            <p className="text-gray-500 text-lg">De la cotización a tu primera venta en pocos días</p>
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

      {/* ── CROSS-SELL: ELEFEL ── */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  <Link2 className="w-3.5 h-3.5" />
                  Módulo incluido en el paquete
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
                  Facturación electrónica<br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    EleFEL FEL
                  </span>
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Emite facturas electrónicas certificadas por la SAT de Guatemala automáticamente desde cada venta de Eleventa. Incluido en tu paquete.
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
                  Conocer más sobre EleFEL
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

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              PREGUNTAS FRECUENTES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              ¿Tienes dudas?
            </h2>
            <p className="text-gray-500 text-lg">Respuestas a las preguntas más comunes de nuestros clientes</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left p-5 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900 text-sm sm:text-base pr-4">{faq.q}</span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg transition-transform ${
                    openFaq === idx ? 'rotate-45' : ''
                  }`}>
                    +
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contacto" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                CONTACTO
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
                Hablemos de tu negocio
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Cuéntanos sobre tu tipo de negocio y te recomendamos la mejor configuración. Sin compromiso.
              </p>

              <div className="space-y-5">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-green-400 hover:bg-green-50/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium">Respuesta más rápida</p>
                    <p className="text-base font-bold text-gray-900">WhatsApp directo</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200">
                  <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium">Por correo</p>
                    <p className="text-base font-bold text-gray-900">Completa el formulario</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium">Horario de atención</p>
                    <p className="text-base font-bold text-gray-900">Lun-Sáb · 8am a 6pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-orange-50/30 rounded-3xl p-6 sm:p-8 border border-gray-100">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Juan Pérez"
                      className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tu@correo.com"
                        className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="5555 5555"
                        className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    ¿Qué tipo de negocio tienes?
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Cuéntanos sobre tu negocio y qué necesitas..."
                      className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-orange-500/20"
                >
                  {formStatus === 'sending' ? (
                    <>Enviando…</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar mensaje
                    </>
                  )}
                </button>

                {formStatus === 'sent' && (
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium p-3 rounded-xl">
                    <CircleCheckBig className="w-5 h-5 flex-shrink-0" />
                    ¡Gracias! Te contactaremos muy pronto.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="text-red-600 text-sm">
                    Hubo un error. Por favor intenta por WhatsApp.
                  </div>
                )}

                <p className="text-xs text-gray-400 text-center pt-2">
                  Respondemos en menos de 24 horas hábiles.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 py-20 px-4 sm:px-6 text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
            ¿Listo para modernizar tu negocio?
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
            Paga una vez, recibe todo en 24 horas y empieza a vender. Así de simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-colors shadow-lg shadow-orange-500/30 text-lg"
            >
              <WhatsAppIcon size={22} /> Cotizar por WhatsApp
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-lg"
            >
              Completar formulario
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-2xl font-black text-white">
              POS<span className="text-orange-500">Total</span>
            </span>
            <p className="text-xs mt-1">Soluciones POS llave en mano · Guatemala</p>
          </div>
          <div className="text-xs text-center sm:text-right">
            <p>
              Distribuidor oficial de Eleventa · 3nStar · HP ·{' '}
              <a href="/" className="text-white font-semibold hover:text-orange-400 transition-colors">
                EleFEL
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

function CatalogImage({
  src,
  alt,
  Icon,
  fit = 'contain',
  position = 'center',
}: {
  src: string
  alt: string
  Icon: LucideIcon
  fit?: 'contain' | 'cover'
  position?: string
}) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return <Icon className="w-20 h-20 text-gray-300" strokeWidth={1.5} />
  }
  const fitClass = fit === 'cover' ? 'object-cover' : 'object-contain p-4'
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={{ objectPosition: position }}
      className={`w-full h-full ${fitClass}`}
    />
  )
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
