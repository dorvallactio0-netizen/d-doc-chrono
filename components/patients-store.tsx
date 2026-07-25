"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { patients as seedPatients, type PatientRecord } from "@/lib/data"
import { isSupabaseConfigured, fetchPatients, insertPatient } from "@/lib/supabase"

type PatientsContextValue = {
  patients: PatientRecord[]
  addPatient: (patient: PatientRecord) => Promise<void>
  source: "supabase" | "local"
  loading: boolean
}

const PatientsContext = createContext<PatientsContextValue | null>(null)

export function PatientsProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<PatientRecord[]>(seedPatients)
  const [source, setSource] = useState<"supabase" | "local">("local")
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    ;(async () => {
      const remote = await fetchPatients()
      if (cancelled) return
      if (remote && remote.length > 0) {
        setPatients(remote)
        setSource("supabase")
      }
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const addPatient = useCallback(async (patient: PatientRecord) => {
    // Optimiste : on affiche immédiatement, puis on persiste si Supabase est branché.
    setPatients((prev) => [patient, ...prev])
    if (isSupabaseConfigured) {
      await insertPatient(patient)
    }
  }, [])

  return (
    <PatientsContext.Provider value={{ patients, addPatient, source, loading }}>
      {children}
    </PatientsContext.Provider>
  )
}

export function usePatients() {
  const ctx = useContext(PatientsContext)
  if (!ctx) throw new Error("usePatients doit être utilisé dans un PatientsProvider")
  return ctx
}
