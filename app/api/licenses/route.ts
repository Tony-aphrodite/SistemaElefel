import { NextRequest, NextResponse } from 'next/server'
import { getAllLicenses, createLicense } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

async function authenticate() {
  const token = cookies().get('auth_token')?.value
  if (!token) return false
  const payload = await verifyToken(token)
  return !!payload
}

export async function GET() {
  if (!await authenticate()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  return NextResponse.json(getAllLicenses())
}

export async function POST(req: NextRequest) {
  if (!await authenticate()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await req.json()
  const { client_name, client_email, client_phone, months = 1, notes } = body

  if (!client_name) {
    return NextResponse.json({ error: 'El nombre del cliente es obligatorio' }, { status: 400 })
  }

  const expires = new Date()
  expires.setMonth(expires.getMonth() + Number(months))

  const license = createLicense({
    client_name,
    client_email,
    client_phone,
    expires_at: expires.toISOString(),
    notes,
  })

  return NextResponse.json(license, { status: 201 })
}
