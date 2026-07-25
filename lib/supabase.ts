import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { PatientRecord, Priority } from "@/lib/data"

// Client Supabase standard.
// L'URL du projet est fournie par défaut ; la clé anonyme est lue depuis
// la variable d'environnement NEXT_PUBLIC_SUPABASE_ANON_KEY.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://lqbptgmuvwcrfilvwgxw.supabase.co"

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""

// Vrai uniquement lorsque la clé anonyme est configurée : permet à l'interface
// de basculer proprement sur les données locales tant que Supabase n'est pas connecté.
export const isSupabaseConfigured = SUPABASE_ANON_KEY.length > 0

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null

// Forme des lignes de la table `patients` (snake_case côté base).
type PatientRow = {
  id: string
  name: string
  age: number
  sex: "H" | "F"
  blood_type: string
  reason: string
  department: string
  last_visit: string
  priority: Priority
  allergies: string[] | null
  physician: string
  heart_rate: number
  blood_pressure: string
  temperature: number
  oxygen: number
}

export function rowToPatient(row: PatientRow): PatientRecord {
  return {
    id: row.id,
    name: row.name,
    age: row.age,
    sex: row.sex,
    bloodType: row.blood_type,
    reason: row.reason,
    department: row.department,
    lastVisit: row.last_visit,
    priority: row.priority,
    allergies: row.allergies ?? [],
    physician: row.physician,
    vitals: {
      heartRate: row.heart_rate,
      bloodPressure: row.blood_pressure,
      temperature: row.temperature,
      oxygen: row.oxygen,
    },
  }
}

export function patientToRow(p: PatientRecord): PatientRow {
  return {
    id: p.id,
    name: p.name,
    age: p.age,
    sex: p.sex,
    blood_type: p.bloodType,
    reason: p.reason,
    department: p.department,
    last_visit: p.lastVisit,
    priority: p.priority,
    allergies: p.allergies,
    physician: p.physician,
    heart_rate: p.vitals.heartRate,
    blood_pressure: p.vitals.bloodPressure,
    temperature: p.vitals.temperature,
    oxygen: p.vitals.oxygen,
  }
}

// Récupère les dossiers patients depuis Supabase (ou null si non configuré / erreur).
export async function fetchPatients(): Promise<PatientRecord[] | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("last_visit", { ascending: false })
  if (error || !data) {
    console.log("[v0] fetchPatients Supabase error:", error?.message)
    return null
  }
  return (data as PatientRow[]).map(rowToPatient)
}

// Insère un nouveau dossier patient dans Supabase.
export async function insertPatient(patient: PatientRecord): Promise<boolean> {
  if (!supabase) return false
  const { error } = await supabase.from("patients").insert(patientToRow(patient))
  if (error) {
    console.log("[v0] insertPatient Supabase error:", error.message)
    return false
  }
  return true
}
