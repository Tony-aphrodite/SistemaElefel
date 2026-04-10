'use client'
import { useState } from 'react'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || '50212345678'
const WA_LINK = `https://wa.me/${WHATSAPP}`
const DOWNLOAD_URL = process.env.NEXT_PUBLIC_DOWNLOAD_URL || '#'

const features = [
  {
    icon: '⚡',
    title: 'Emisión Instantánea',
    desc: 'Genera y certifica facturas electrónicas DTE en segundos directamente desde Eleventa, sin pasos adicionales.',
  },
  {
    icon: '🔗',
    title: 'Integración con Eleventa',
    desc: 'Se conecta automáticamente a tu base de datos de Eleventa. No modifica nada, solo lee las ventas.',
  },
  {
    icon: '✅',
    title: 'Certificado por Infile',
    desc: 'Usa la plataforma FEEL de Infile, certificador autorizado por la SAT de Guatemala.',
  },
  {
    icon: '🖨️',
    title: 'Impresión Automática',
    desc: 'Imprime el ticket FEL en tu impresora térmica automáticamente al certificar cada factura.',
  },
  {
    icon: '🔄',
    title: 'Régimen General y PEQ',
    desc: 'Compatible con Régimen General y Pequeño Contribuyente. Configura tu tipo de contribuyente fácilmente.',
  },
  {
    icon: '📂',
    title: 'Respaldo en PDF y XML',
    desc: 'Guarda cada factura en PDF y XML localmente para tus archivos contables y auditorías.',
  },
]

const plans = [
  {
    name: 'Mensual',
    price: 'Q 299',
    period: '/mes',
    highlight: false,
    features: [
      'Sistema EleFEL completo',
      'Certificación Infile incluida',
      'Soporte por WhatsApp',
      'Actualizaciones incluidas',
      'Régimen General y PEQ',
    ],
  },
  {
    name: 'Semestral',
    price: 'Q 249',
    period: '/mes',
    highlight: true,
    badge: 'Más popular',
    features: [
      'Todo lo del plan Mensual',
      'Ahorra Q 300 al año',
      'Soporte prioritario',
      'Configuración incluida',
      'Facturado cada 6 meses',
    ],
  },
  {
    name: 'Anual',
    price: 'Q 199',
    period: '/mes',
    highlight: false,
    badge: 'Mejor valor',
    features: [
      'Todo lo del plan Semestral',
      'Ahorra Q 1,200 al año',
      'Capacitación incluida',
      'Migración de datos',
      'Facturado anualmente',
    ],
  },
]

const steps = [
  { num: '1', title: 'Contáctanos', desc: 'Escríbenos por WhatsApp para solicitar tu licencia y elegir tu plan.' },
  { num: '2', title: 'Realiza tu pago', desc: 'Paga por transferencia bancaria o el método que prefieras.' },
  { num: '3', title: 'Recibe tu licencia', desc: 'Te enviamos tu clave de licencia y el instalador por WhatsApp.' },
  { num: '4', title: '¡Listo para facturar!', desc: 'Instala EleFEL, activa tu licencia y empieza a emitir facturas.' },
]

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [verifyKey, setVerifyKey] = useState('')
  const [verifyResult, setVerifyResult] = useState<{ status: string; name?: string; expires?: string } | null>(null)
  const [verifying, setVerifying] = useState(false)

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setVerifying(true)
    setVerifyResult(null)
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: verifyKey }),
      })
      const data = await res.json()
      setVerifyResult(data)
    } catch {
      setVerifyResult({ status: 'error' })
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2">
              <span className="text-2xl font-black text-gradient">EleFEL</span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {['Características', 'Precios', 'Cómo funciona', 'Contacto'].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, '-').replace(/é/g, 'e').replace(/ó/g, 'o')}`}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Obtener licencia
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            {['Características', 'Precios', 'Cómo funciona', 'Contacto'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, '-').replace(/é/g, 'e').replace(/ó/g, 'o')}`}
                className="block text-sm font-medium text-gray-700 hover:text-blue-600 py-1"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full text-center hover:bg-blue-700"
            >
              Obtener licencia
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="gradient-hero text-white pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full mb-6">
                Certificado por Infile · SAT Guatemala
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Facturación<br />
                <span className="text-gradient">Electrónica FEL</span><br />
                para Eleventa
              </h1>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Emite facturas electrónicas certificadas automáticamente desde tu punto de venta Eleventa. Sin procesos manuales. Sin complicaciones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={DOWNLOAD_URL}
                  className="bg-white text-blue-700 font-bold px-8 py-4 rounded-full text-center hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Descargar EleFEL
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white/40 text-white font-bold px-8 py-4 rounded-full text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon /> Consultar por WhatsApp
                </a>
              </div>
            </div>

            {/* Hero card */}
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 bg-green-500/20 border border-green-400/30 rounded-xl p-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="text-white font-semibold text-sm">Factura certificada</p>
                    <p className="text-green-200 text-xs">Serie A · No. 00000123 · Q 250.00</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Facturas hoy', value: '47' },
                    { label: 'Total', value: 'Q 12,450' },
                    { label: 'Pendientes', value: '0' },
                    { label: 'Estado', value: 'Activo' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-white font-bold text-xl">{stat.value}</p>
                      <p className="text-blue-200 text-xs">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-blue-200 text-xs mb-1">Último DTE certificado</p>
                  <p className="text-white font-mono text-sm">UUID-7f3a2b1c-...</p>
                  <p className="text-green-300 text-xs mt-1">hace 2 minutos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="caracteristicas" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Todo lo que necesitas para facturar
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              EleFEL se conecta a Eleventa y hace todo el trabajo por ti, desde leer la venta hasta entregar el DTE certificado.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="como-funciona" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">¿Cómo funciona?</h2>
            <p className="text-gray-500 text-lg">Empieza a facturar en 4 simples pasos</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-3/4 w-1/2 h-0.5 bg-blue-100 z-0" />
                )}
                <div className="relative z-10 w-20 h-20 rounded-full bg-blue-600 text-white text-2xl font-black flex items-center justify-center mx-auto mb-4 shadow-lg">
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
      <section id="precios" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Planes y precios</h2>
            <p className="text-gray-500 text-lg">Elige el plan que mejor se adapte a tu negocio</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map(plan => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  plan.highlight
                    ? 'bg-blue-600 text-white shadow-2xl scale-105'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                }`}
              >
                {plan.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full ${
                    plan.highlight ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-600 text-white'
                  }`}>
                    {plan.badge}
                  </span>
                )}
                <h3 className={`font-bold text-lg mb-4 ${plan.highlight ? 'text-blue-100' : 'text-gray-500'}`}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className={plan.highlight ? 'text-blue-200' : 'text-blue-500'}>✓</span>
                      <span className={plan.highlight ? 'text-blue-50' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center font-bold py-3 rounded-full transition-colors ${
                    plan.highlight
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Elegir plan
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">
            * Pagos por transferencia bancaria o enlace de pago. Contáctanos por WhatsApp para más información.
          </p>
        </div>
      </section>

      {/* ── LICENSE VERIFY ── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-3">Verificar licencia</h2>
          <p className="text-gray-500 text-sm mb-8">¿Ya tienes una licencia? Verifica su estado aquí.</p>
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={verifyKey}
              onChange={e => setVerifyKey(e.target.value.toUpperCase())}
              placeholder="EFEL-XXXX-XXXX-XXXX"
              className="flex-1 border border-gray-200 rounded-full px-5 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 text-center sm:text-left"
              required
            />
            <button
              type="submit"
              disabled={verifying}
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {verifying ? 'Verificando…' : 'Verificar'}
            </button>
          </form>
          {verifyResult && (
            <div className={`mt-4 p-4 rounded-xl text-sm font-medium ${
              verifyResult.status === 'active'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : verifyResult.status === 'inactive'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : verifyResult.status === 'not_found'
                ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                : 'bg-gray-50 text-gray-700 border border-gray-200'
            }`}>
              {verifyResult.status === 'active' && (
                <p>✅ Licencia activa · Cliente: <strong>{verifyResult.name}</strong> · Vence: <strong>{verifyResult.expires}</strong></p>
              )}
              {verifyResult.status === 'inactive' && <p>⛔ Licencia desactivada. Contacta a soporte.</p>}
              {verifyResult.status === 'expired' && <p>⏰ Licencia vencida. Renueva tu suscripción.</p>}
              {verifyResult.status === 'not_found' && <p>❌ Licencia no encontrada. Verifica la clave ingresada.</p>}
              {verifyResult.status === 'error' && <p>Error de conexión. Intenta de nuevo.</p>}
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT / CTA ── */}
      <section id="contacto" className="gradient-hero py-20 px-4 sm:px-6 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">¿Listo para empezar?</h2>
          <p className="text-blue-100 text-lg mb-10">
            Contáctanos ahora y te ayudamos a configurar EleFEL para tu negocio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full transition-colors shadow-lg text-lg"
            >
              <WhatsAppIcon size={24} /> Escribir por WhatsApp
            </a>
            <a
              href={DOWNLOAD_URL}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
            >
              Descargar gratis
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-2xl font-black text-gradient">EleFEL</span>
            <p className="text-xs mt-1">Facturación Electrónica para Eleventa · Guatemala</p>
          </div>
          <div className="text-xs text-center sm:text-right">
            <p>Certificado por <span className="text-white font-semibold">Infile</span> · Autorizado SAT Guatemala</p>
            <p className="mt-1">© {new Date().getFullYear()} EleFEL · Todos los derechos reservados</p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP BUTTON ── */}
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
