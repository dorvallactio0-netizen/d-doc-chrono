"use client"

import { useState } from "react"
import {
  Search,
  Droplet,
  Stethoscope,
  CalendarClock,
  TriangleAlert,
  HeartPulse,
  Gauge,
  Thermometer,
  Wind,
  ChevronRight,
} from "lucide-react"
import { type PatientRecord } from "@/lib/data"
import { usePatients } from "@/components/patients-store"
import { PriorityBadge } from "@/components/priority-badge"
import { cn } from "@/lib/utils"

export function MedicalRecords({ compact = false }: { compact?: boolean }) {
  const { patients, source, loading } = usePatients()
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(patients[0].id)

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toLowerCase().includes(query.toLowerCase()) ||
      p.department.toLowerCase().includes(query.toLowerCase()),
  )

  const selected = patients.find((p) => p.id === selectedId) ?? patients[0]

  return (
    <section className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="font-semibold text-foreground">Dossiers médicaux</h2>
          <p className="text-sm text-muted-foreground">{patients.length} patients enregistrés</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
            source === "supabase"
              ? "bg-chart-2/15 text-chart-2"
              : "bg-secondary text-muted-foreground",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              loading ? "bg-chart-3 animate-pulse" : source === "supabase" ? "bg-chart-2" : "bg-muted-foreground",
            )}
          />
          {loading ? "Connexion…" : source === "supabase" ? "Supabase" : "Données locales"}
        </span>
      </div>

      <div className={cn("grid", compact ? "lg:grid-cols-1" : "lg:grid-cols-[1.1fr_1fr]")}>
        <div className="border-border p-4 lg:border-r">
          <div className="relative mb-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrer par nom, ID ou service…"
              className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>

          <ul className="space-y-2">
            {filtered.map((patient) => (
              <li key={patient.id}>
                <button
                  onClick={() => setSelectedId(patient.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                    patient.id === selectedId
                      ? "border-primary/40 bg-primary/5"
                      : "border-border hover:bg-secondary",
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                    {initials(patient.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium text-foreground">{patient.name}</p>
                      <span className="font-mono text-xs text-muted-foreground">{patient.id}</span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{patient.reason}</p>
                  </div>
                  <PriorityBadge priority={patient.priority} />
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="py-8 text-center text-sm text-muted-foreground">
                Aucun dossier ne correspond à la recherche.
              </li>
            )}
          </ul>
        </div>

        {!compact && <RecordDetail patient={selected} />}
      </div>
    </section>
  )
}

function RecordDetail({ patient }: { patient: PatientRecord }) {
  const vitals = [
    { icon: HeartPulse, label: "Fréq. cardiaque", value: `${patient.vitals.heartRate} bpm` },
    { icon: Gauge, label: "Tension", value: patient.vitals.bloodPressure },
    { icon: Thermometer, label: "Température", value: `${patient.vitals.temperature} °C` },
    { icon: Wind, label: "Saturation O₂", value: `${patient.vitals.oxygen} %` },
  ]

  return (
    <div className="p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
          {initials(patient.name)}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
            <PriorityBadge priority={patient.priority} />
          </div>
          <p className="text-sm text-muted-foreground">
            {patient.age} ans · {patient.sex === "F" ? "Femme" : "Homme"} ·{" "}
            <span className="font-mono">{patient.id}</span>
          </p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3">
        <Info icon={Droplet} label="Groupe sanguin" value={patient.bloodType} />
        <Info icon={Stethoscope} label="Service" value={patient.department} />
        <Info icon={CalendarClock} label="Dernière visite" value={patient.lastVisit} />
        <Info icon={Stethoscope} label="Médecin référent" value={patient.physician} />
      </dl>

      <div className="mt-4 rounded-lg border border-border bg-secondary/50 p-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Motif de consultation
        </p>
        <p className="mt-1 text-sm text-foreground">{patient.reason}</p>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Constantes
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {vitals.map((v) => {
            const Icon = v.icon
            return (
              <div key={v.label} className="rounded-lg border border-border bg-background p-3">
                <Icon className="h-4 w-4 text-primary" />
                <p className="mt-1.5 font-mono text-sm font-semibold text-foreground">{v.value}</p>
                <p className="text-xs text-muted-foreground">{v.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-chart-3/30 bg-chart-3/10 p-3">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-chart-3" />
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-chart-3">Allergies</p>
          <p className="text-sm text-foreground">
            {patient.allergies.length > 0 ? patient.allergies.join(", ") : "Aucune connue"}
          </p>
        </div>
      </div>
    </div>
  )
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Droplet
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-border p-3">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
}
