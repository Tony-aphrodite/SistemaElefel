import { NextRequest, NextResponse } from 'next/server'
import { updateLicenseStatus, renewLicense, deleteLicense, getLicenseById } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

async function authenticate() {
  const token = cookies().get('auth_token')?.value
  if (!token) return false
  return !!(await verifyToken(token))
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await authenticate()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const id = parseInt(params.id)
  const body = await req.json()
  const { action, months } = body

  const license = getLicenseById(id)
  if (!license) return NextResponse.json({ error: 'Licencia no encontrada' }, { status: 404 })

  if (action === 'activate') {
    updateLicenseStatus(id, 'active')
  } else if (action === 'deactivate') {
    updateLicenseStatus(id, 'inactive')
  } else if (action === 'renew') {
    renewLicense(id, (months || 1) * 30)
  } else {
    return NextResponse.json({ error: 'Acción inválida' }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!await authenticate()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const id = parseInt(params.id)
  deleteLicense(id)
  return NextResponse.json({ ok: true })
}
