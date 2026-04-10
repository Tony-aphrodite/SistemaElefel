import { NextRequest, NextResponse } from 'next/server'
import { getLicenseByKey } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { key } = await req.json()

  if (!key || typeof key !== 'string') {
    return NextResponse.json({ status: 'error' }, { status: 400 })
  }

  const license = getLicenseByKey(key.trim().toUpperCase())

  if (!license) {
    return NextResponse.json({ status: 'not_found' })
  }

  if (license.status === 'inactive') {
    return NextResponse.json({ status: 'inactive' })
  }

  const now = new Date()
  const expires = new Date(license.expires_at)

  if (expires < now) {
    return NextResponse.json({ status: 'expired' })
  }

  return NextResponse.json({
    status: 'active',
    name: license.client_name,
    expires: expires.toLocaleDateString('es-GT', { day: '2-digit', month: 'long', year: 'numeric' }),
  })
}
