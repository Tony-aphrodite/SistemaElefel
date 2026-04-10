import { getDb } from './neon'

export interface License {
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

export async function getAllLicenses(): Promise<License[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT * FROM licenses ORDER BY created_at DESC
  `
  return rows as License[]
}

export async function getLicenseByKey(key: string): Promise<License | undefined> {
  const sql = getDb()
  const rows = await sql`
    SELECT * FROM licenses WHERE license_key = ${key} LIMIT 1
  `
  return (rows[0] as License) ?? undefined
}

export async function getLicenseById(id: number): Promise<License | undefined> {
  const sql = getDb()
  const rows = await sql`
    SELECT * FROM licenses WHERE id = ${id} LIMIT 1
  `
  return (rows[0] as License) ?? undefined
}

export async function createLicense(data: {
  client_name: string
  client_email?: string
  client_phone?: string
  expires_at: string
  notes?: string
}): Promise<License> {
  const sql = getDb()
  const licenseKey = generateLicenseKey()

  const rows = await sql`
    INSERT INTO licenses (license_key, client_name, client_email, client_phone, status, expires_at, notes)
    VALUES (
      ${licenseKey},
      ${data.client_name},
      ${data.client_email || ''},
      ${data.client_phone || ''},
      'active',
      ${data.expires_at},
      ${data.notes || ''}
    )
    RETURNING *
  `
  return rows[0] as License
}

export async function updateLicenseStatus(id: number, status: 'active' | 'inactive') {
  const sql = getDb()
  await sql`
    UPDATE licenses SET status = ${status} WHERE id = ${id}
  `
}

export async function renewLicense(id: number, days: number = 30) {
  const license = await getLicenseById(id)
  if (!license) return

  const base = new Date(license.expires_at) > new Date()
    ? new Date(license.expires_at)
    : new Date()
  base.setDate(base.getDate() + days)

  const sql = getDb()
  await sql`
    UPDATE licenses SET expires_at = ${base.toISOString()}, status = 'active'
    WHERE id = ${id}
  `
}

export async function deleteLicense(id: number) {
  const sql = getDb()
  await sql`
    DELETE FROM licenses WHERE id = ${id}
  `
}

function generateLicenseKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const seg = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `EFEL-${seg()}-${seg()}-${seg()}`
}
