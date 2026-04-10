import { supabase } from './supabase'

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
  const { data, error } = await supabase
    .from('licenses')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as License[]
}

export async function getLicenseByKey(key: string): Promise<License | undefined> {
  const { data, error } = await supabase
    .from('licenses')
    .select('*')
    .eq('license_key', key)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return (data as License) ?? undefined
}

export async function getLicenseById(id: number): Promise<License | undefined> {
  const { data, error } = await supabase
    .from('licenses')
    .select('*')
    .eq('id', id)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return (data as License) ?? undefined
}

export async function createLicense(data: {
  client_name: string
  client_email?: string
  client_phone?: string
  expires_at: string
  notes?: string
}): Promise<License> {
  const licenseKey = generateLicenseKey()

  const { data: created, error } = await supabase
    .from('licenses')
    .insert({
      license_key: licenseKey,
      client_name: data.client_name,
      client_email: data.client_email || '',
      client_phone: data.client_phone || '',
      status: 'active',
      expires_at: data.expires_at,
      notes: data.notes || '',
    })
    .select()
    .single()

  if (error) throw error
  return created as License
}

export async function updateLicenseStatus(id: number, status: 'active' | 'inactive') {
  const { error } = await supabase
    .from('licenses')
    .update({ status })
    .eq('id', id)

  if (error) throw error
}

export async function renewLicense(id: number, days: number = 30) {
  const license = await getLicenseById(id)
  if (!license) return

  const base = new Date(license.expires_at) > new Date()
    ? new Date(license.expires_at)
    : new Date()
  base.setDate(base.getDate() + days)

  const { error } = await supabase
    .from('licenses')
    .update({ expires_at: base.toISOString(), status: 'active' })
    .eq('id', id)

  if (error) throw error
}

export async function deleteLicense(id: number) {
  const { error } = await supabase
    .from('licenses')
    .delete()
    .eq('id', id)

  if (error) throw error
}

function generateLicenseKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const seg = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `EFEL-${seg()}-${seg()}-${seg()}`
}
