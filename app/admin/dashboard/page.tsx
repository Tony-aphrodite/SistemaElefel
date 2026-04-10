'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface License {
  id: number
  license_key: string
  client_name: string
  client_email: string
  client_phone: string
  status: 'active' | 'inactive'
  created_at: string
  expires_at: string
  notes: string
}

function isExpired(expires_at: string) {
  return new Date(expires_at) < new Date()
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-GT', { day: '2-digit', month: 'short', year: 'numeric' })
}

function StatusBadge({ license }: { license: License }) {
  if (license.status === 'inactive') {
    return <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-semibold">Inactiva</span>
  }
  if (isExpired(license.expires_at)) {
    return <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-semibold">Vencida</span>
  }
  return <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">Activa</span>
}

export default function Dashboard() {
  const router = useRouter()
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [renewMonths, setRenewMonths] = useState<{ [id: number]: number }>({})
  const [form, setForm] = useState({
    client_name: '', client_email: '', client_phone: '', months: 1, notes: '',
  })
  const [saving, setSaving] = useState(false)

  const fetchLicenses = useCallback(async () => {
    const res = await fetch('/api/licenses')
    if (res.status === 401) { router.push('/admin'); return }
    setLicenses(await res.json())
    setLoading(false)
  }, [router])

  useEffect(() => { fetchLicenses() }, [fetchLicenses])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/licenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ client_name: '', client_email: '', client_phone: '', months: 1, notes: '' })
    setShowForm(false)
    setSaving(false)
    fetchLicenses()
  }

  async function handleAction(id: number, action: string, months?: number) {
    await fetch(`/api/licenses/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, months }),
    })
    fetchLicenses()
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`¿Eliminar licencia de "${name}"? Esta acción no se puede deshacer.`)) return
    await fetch(`/api/licenses/${id}`, { method: 'DELETE' })
    fetchLicenses()
  }

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/admin')
  }

  const filtered = licenses.filter(l =>
    l.client_name.toLowerCase().includes(search.toLowerCase()) ||
    l.license_key.includes(search.toUpperCase()) ||
    l.client_email.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total: licenses.length,
    active: licenses.filter(l => l.status === 'active' && !isExpired(l.expires_at)).length,
    expired: licenses.filter(l => isExpired(l.expires_at) && l.status === 'active').length,
    inactive: licenses.filter(l => l.status === 'inactive').length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-gradient">EleFEL</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500 font-medium">Panel de licencias</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-xs text-gray-400 hover:text-blue-600 hidden sm:inline">
              Ver sitio →
            </a>
            <button
              onClick={handleLogout}
              className="text-xs text-gray-500 hover:text-red-600 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: stats.total, color: 'text-gray-900', bg: 'bg-white' },
            { label: 'Activas', value: stats.active, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Vencidas', value: stats.expired, color: 'text-red-500', bg: 'bg-red-50' },
            { label: 'Inactivas', value: stats.inactive, color: 'text-gray-400', bg: 'bg-gray-100' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center shadow-sm border border-gray-100`}>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Buscar por nombre, correo o clave..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            + Nueva licencia
          </button>
        </div>

        {/* Create form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Nueva licencia</h3>
            <form onSubmit={handleCreate} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nombre del cliente *</label>
                <input
                  required
                  value={form.client_name}
                  onChange={e => setForm({ ...form, client_name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  value={form.client_email}
                  onChange={e => setForm({ ...form, client_email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Teléfono / WhatsApp</label>
                <input
                  value={form.client_phone}
                  onChange={e => setForm({ ...form, client_phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Duración (meses)</label>
                <select
                  value={form.months}
                  onChange={e => setForm({ ...form, months: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 6, 12].map(m => (
                    <option key={m} value={m}>{m} {m === 1 ? 'mes' : 'meses'}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Notas</label>
                <input
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="Plan mensual, pago pendiente, etc."
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2 flex gap-3 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2">
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 text-white font-semibold text-sm px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Creando…' : 'Crear licencia'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Licenses table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="text-center py-16 text-gray-400 text-sm">Cargando licencias…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              {search ? 'Sin resultados para tu búsqueda.' : 'No hay licencias todavía. Crea la primera.'}
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      {['Cliente', 'Clave de licencia', 'Estado', 'Vence', 'Creada', 'Acciones'].map(h => (
                        <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map(l => (
                      <tr key={l.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-gray-900">{l.client_name}</p>
                          {l.client_email && <p className="text-xs text-gray-400">{l.client_email}</p>}
                          {l.client_phone && <p className="text-xs text-gray-400">{l.client_phone}</p>}
                        </td>
                        <td className="px-4 py-3">
                          <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg font-mono">
                            {l.license_key}
                          </code>
                        </td>
                        <td className="px-4 py-3"><StatusBadge license={l} /></td>
                        <td className="px-4 py-3">
                          <span className={`text-xs ${isExpired(l.expires_at) ? 'text-red-500 font-semibold' : 'text-gray-600'}`}>
                            {formatDate(l.expires_at)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-400">{formatDate(l.created_at)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 flex-wrap">
                            {l.status === 'active' ? (
                              <button
                                onClick={() => handleAction(l.id, 'deactivate')}
                                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                Desactivar
                              </button>
                            ) : (
                              <button
                                onClick={() => handleAction(l.id, 'activate')}
                                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors"
                              >
                                Activar
                              </button>
                            )}
                            <div className="flex items-center gap-1">
                              <select
                                value={renewMonths[l.id] || 1}
                                onChange={e => setRenewMonths({ ...renewMonths, [l.id]: Number(e.target.value) })}
                                className="text-xs border border-gray-200 rounded-lg px-1 py-1"
                              >
                                {[1, 2, 3, 6, 12].map(m => (
                                  <option key={m} value={m}>{m}m</option>
                                ))}
                              </select>
                              <button
                                onClick={() => handleAction(l.id, 'renew', renewMonths[l.id] || 1)}
                                className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                Renovar
                              </button>
                            </div>
                            <button
                              onClick={() => handleDelete(l.id, l.client_name)}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-400 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="lg:hidden divide-y divide-gray-100">
                {filtered.map(l => (
                  <div key={l.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{l.client_name}</p>
                        {l.client_email && <p className="text-xs text-gray-400">{l.client_email}</p>}
                      </div>
                      <StatusBadge license={l} />
                    </div>
                    <code className="block text-xs bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-mono">
                      {l.license_key}
                    </code>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Vence: <span className={isExpired(l.expires_at) ? 'text-red-500 font-semibold' : ''}>{formatDate(l.expires_at)}</span></span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {l.status === 'active' ? (
                        <button onClick={() => handleAction(l.id, 'deactivate')} className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg">Desactivar</button>
                      ) : (
                        <button onClick={() => handleAction(l.id, 'activate')} className="text-xs px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">Activar</button>
                      )}
                      <button onClick={() => handleAction(l.id, 'renew', 1)} className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg">Renovar 1 mes</button>
                      <button onClick={() => handleDelete(l.id, l.client_name)} className="text-xs px-3 py-1.5 bg-red-50 text-red-500 rounded-lg">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400">
          {filtered.length} licencia{filtered.length !== 1 ? 's' : ''} mostrada{filtered.length !== 1 ? 's' : ''}
        </p>
      </main>
    </div>
  )
}
