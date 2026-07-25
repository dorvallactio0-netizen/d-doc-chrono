"use client"

import { useState } from "react"
import {
  UserPlus,
  HeartPulse,
  Gauge,
  Thermometer,
  Wind,
  Droplet,
  Stethoscope,
  TriangleAlert,
  Check,
} from "lucide-react"
import { type PatientRecord, type Priority, priorityLabels } from "@/lib/data"
import { usePatients } from "@/components/patients-store"
import { cn } from "@/lib/utils"

const departments = [
  "Cardiologie",
  "Orthopédie",
  "Gynécologie",
  "Endocrinologie",
  "Neurologie",
  "Pédiatrie",
  "Urgences",
]

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

function todayLabel() {
  return new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })
}

export function NewPatientForm({ onCreated }: { onCreated?: () => void }) {
  const { addPatient } = usePatients()
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    name: "",
    age: "",
    sex: "F" as "H" | "F",
    bloodType: "O+",
    department: "Urgences",
    priority: "standard" as Priority,
    physician: "Dr. H. Lefebvre",
    reason: "",
    allergies: "",
    heartRate: "",
    bloodPressure: "",
    temperature: "",
    oxygen: "",
  })

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const seq = Math.floor(Math.random() * 9000 + 1000)
    const record: PatientRecord = {
      id: `P-${seq}`,
      name: form.name.trim() || "Patient sans nom",
      age: Number(form.age) || 0,
      sex: form.sex,
      bloodType: form.bloodType,
      reason: form.reason.trim() || "Motif non renseigné",
      department: form.department,
      lastVisit: todayLabel(),
      priority: form.priority,
      allergies: form.allergies
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      physician: form.physician.trim() || "Non attribué",
      vitals: {
        heartRate: Number(form.heartRate) || 0,
        bloodPressure: form.bloodPressure.trim() || "—",
        temperature: Number(form.temperature) || 0,
        oxygen: Number(form.oxygen) || 0,
      },
    }
    await addPatient(record)
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onCreated?.()
    }, 900)
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
      <section className="rounded-xl border border-border bg-card shadow-sm">
        <header className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Nouveau dossier patient</h2>
            <p className="text-sm text-muted-foreground">
              Renseignez l&apos;identité et les constantes d&apos;admission
            </p>
          </div>
        </header>

        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <Field label="Nom complet" required>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Ex. Marie Durand"
              className={inputClass}
            />
          </Field>

          <Field label="Âge" required>
            <input
              required
              type="number"
              min={0}
              max={130}
              value={form.age}
              onChange={(e) => update("age", e.target.value)}
              placeholder="Ex. 45"
              className={inputClass}
            />
          </Field>

          <Field label="Sexe">
            <div className="flex gap-2">
              {(["F", "H"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => update("sex", s)}
                  className={cn(
                    "flex-1 rounded-lg border py-2 text-sm font-medium transition-colors",
                    form.sex === s
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input text-muted-foreground hover:bg-secondary",
                  )}
                >
                  {s === "F" ? "Femme" : "Homme"}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Groupe sanguin" icon={Droplet}>
            <select
              value={form.bloodType}
              onChange={(e) => update("bloodType", e.target.value)}
              className={inputClass}
            >
              {bloodTypes.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Field>

          <Field label="Service" icon={Stethoscope}>
            <select
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
              className={inputClass}
            >
              {departments.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </Field>

          <Field label="Médecin référent">
            <input
              value={form.physician}
              onChange={(e) => update("physician", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Priorité de triage">
            <div className="flex gap-2">
              {(Object.keys(priorityLabels) as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => update("priority", p)}
                  className={cn(
                    "flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors",
                    form.priority === p
                      ? p === "urgent"
                        ? "border-destructive bg-destructive/10 text-destructive"
                        : p === "prioritaire"
                          ? "border-chart-3 bg-chart-3/10 text-chart-3"
                          : "border-primary bg-primary/10 text-primary"
                      : "border-input text-muted-foreground hover:bg-secondary",
                  )}
                >
                  {priorityLabels[p]}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Allergies connues" hint="séparées par des virgules">
            <input
              value={form.allergies}
              onChange={(e) => update("allergies", e.target.value)}
              placeholder="Ex. Pénicilline, Latex"
              className={inputClass}
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Motif de consultation" required>
              <textarea
                required
                value={form.reason}
                onChange={(e) => update("reason", e.target.value)}
                rows={2}
                placeholder="Décrivez le motif d'admission…"
                className={cn(inputClass, "resize-none")}
              />
            </Field>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card shadow-sm">
        <header className="flex items-center gap-2 border-b border-border px-5 py-4">
          <HeartPulse className="h-4.5 w-4.5 text-primary" />
          <h3 className="font-semibold text-foreground">Constantes de santé</h3>
        </header>
        <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <VitalField
            icon={HeartPulse}
            label="Fréq. cardiaque"
            unit="bpm"
            value={form.heartRate}
            onChange={(v) => update("heartRate", v)}
            type="number"
            placeholder="72"
          />
          <VitalField
            icon={Gauge}
            label="Tension"
            unit="mmHg"
            value={form.bloodPressure}
            onChange={(v) => update("bloodPressure", v)}
            placeholder="120/80"
          />
          <VitalField
            icon={Thermometer}
            label="Température"
            unit="°C"
            value={form.temperature}
            onChange={(v) => update("temperature", v)}
            type="number"
            placeholder="37.0"
          />
          <VitalField
            icon={Wind}
            label="Saturation O₂"
            unit="%"
            value={form.oxygen}
            onChange={(v) => update("oxygen", v)}
            type="number"
            placeholder="98"
          />
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <TriangleAlert className="h-4 w-4 text-chart-3" />
          Vérifiez les constantes avant enregistrement.
        </p>
        <button
          type="submit"
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-95",
            saved ? "bg-chart-2" : "bg-primary hover:scale-[1.02]",
          )}
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" /> Dossier enregistré
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" /> Créer le dossier
            </>
          )}
        </button>
      </div>
    </form>
  )
}

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"

function Field({
  label,
  children,
  required,
  hint,
  icon: Icon,
}: {
  label: string
  children: ReactNodeType
  required?: boolean
  hint?: string
  icon?: typeof Droplet
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
        {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
        {label}
        {required && <span className="text-destructive">*</span>}
        {hint && <span className="font-normal text-xs text-muted-foreground">({hint})</span>}
      </span>
      {children}
    </label>
  )
}

function VitalField({
  icon: Icon,
  label,
  unit,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  icon: typeof Droplet
  label: string
  unit: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-3">
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-1">
        <input
          type={type}
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-w-0 bg-transparent font-mono text-lg font-semibold text-foreground outline-none placeholder:text-muted-foreground/50"
        />
        <span className="shrink-0 text-xs text-muted-foreground">{unit}</span>
      </div>
    </div>
  )
}

type ReactNodeType = React.ReactNode
