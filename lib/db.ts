import fs from 'fs'
import path from 'path'

const DB_PATH = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'licenses.json')

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

interface DB {
  next_id: number
  licenses: License[]
}

function readDb(): DB {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(DB_PATH)) {
    const empty: DB = { next_id: 1, licenses: [] }
    fs.writeFileSync(DB_PATH, JSON.stringify(empty, null, 2), 'utf-8')
    return empty
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) as DB
}

function writeDb(db: DB) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8')
}

export function getAllLicenses(): License[] {
  return readDb().licenses.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

export function getLicenseByKey(key: string): License | undefined {
  return readDb().licenses.find(l => l.license_key === key)
}

export function getLicenseById(id: number): License | undefined {
  return readDb().licenses.find(l => l.id === id)
}

export function createLicense(data: {
  client_name: string
  client_email?: string
  client_phone?: string
  expires_at: string
  notes?: string
}): License {
  const db = readDb()
  const license: License = {
    id: db.next_id++,
    license_key: generateLicenseKey(),
    client_name: data.client_name,
    client_email: data.client_email || '',
    client_phone: data.client_phone || '',
    status: 'active',
    created_at: new Date().toISOString(),
    expires_at: data.expires_at,
    notes: data.notes || '',
  }
  db.licenses.push(license)
  writeDb(db)
  return license
}

export function updateLicenseStatus(id: number, status: 'active' | 'inactive') {
  const db = readDb()
  const license = db.licenses.find(l => l.id === id)
  if (license) { license.status = status; writeDb(db) }
}

export function renewLicense(id: number, days: number = 30) {
  const db = readDb()
  const license = db.licenses.find(l => l.id === id)
  if (!license) return
  const base = new Date(license.expires_at) > new Date() ? new Date(license.expires_at) : new Date()
  base.setDate(base.getDate() + days)
  license.expires_at = base.toISOString()
  license.status = 'active'
  writeDb(db)
}

export function deleteLicense(id: number) {
  const db = readDb()
  db.licenses = db.licenses.filter(l => l.id !== id)
  writeDb(db)
}

function generateLicenseKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `EFEL-${seg()}-${seg()}-${seg()}`
}
