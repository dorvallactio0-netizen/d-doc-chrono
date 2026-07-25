"use client"

import { Siren, MapPin, HeartPulse, Phone, Ambulance, ClipboardCheck, ChevronRight, FileDown } from "lucide-react"
import { emergencyCases } from "@/lib/data"
import { exportEmergencyPdf } from "@/lib/export-emergency-pdf"
import { cn } from "@/lib/utils"

const protocol = [
  { step: "Évaluation ABCDE réalisée", done: true },
  { step: "Monitorage cardiaque en place", done: true },
  { step: "Voie veineuse posée", done: true },
  { step: "Bilan sanguin envoyé", done: false },
  { step: "Cardiologue de garde prévenu", done: false },
]

const contacts = [
  { label: "Réanimation", detail: "Poste 2140", icon: Phone },
  { label: "SMUR", detail: "Équipe disponible", icon: Ambulance },
  { label: "Cardiologie", detail: "Dr. Lefebvre — bip 88", icon: HeartPulse },
]

export function EmergencyView() {
  const active = emergencyCases[0]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Cas critique en cours · document exportable pour transmission
        </p>
        <button
          onClick={() => exportEmergencyPdf(active, protocol)}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
        >
          <FileDown className="h-4 w-4 text-primary" />
          Exporter le rapport PDF
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="overflow-hidden rounded-xl border border-destructive/40 bg-card shadow-sm">
        <div className="flex items-center gap-2 bg-destructive px-5 py-3 text-white">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          <Siren className="h-5 w-5" />
          <span className="font-semibold uppercase tracking-wide">Code rouge actif</span>
          <span className="ml-auto text-sm text-white/80">{active.triggeredAt}</span>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {active.name}, {active.age} ans
              </h2>
              <p className="text-sm text-muted-foreground">{active.condition}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold text-destructive">
              Niveau {active.level}
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-secondary/50 p-3">
              <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <HeartPulse className="h-3.5 w-3.5" /> Constantes
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-foreground">{active.vitals}</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/50 p-3">
              <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> Localisation
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">{active.location}</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
              <ClipboardCheck className="h-4 w-4 text-primary" /> Protocole d'urgence
            </p>
            <ul className="space-y-2">
              {protocol.map((item) => (
                <li
                  key={item.step}
                  className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5"
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full text-xs",
                      item.done
                        ? "bg-chart-2 text-white"
                        : "border border-border text-muted-foreground",
                    )}
                  >
                    {item.done ? "✓" : ""}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      item.done ? "text-muted-foreground line-through" : "text-foreground",
                    )}
                  >
                    {item.step}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button className="mt-5 w-full rounded-lg bg-destructive py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01] active:scale-95">
            Confirmer la prise en charge
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-semibold text-foreground">Contacts rapides</h3>
          <p className="text-sm text-muted-foreground">Coordonnez l'intervention</p>
          <ul className="mt-4 space-y-2">
            {contacts.map((c) => {
              const Icon = c.icon
              return (
                <li key={c.label}>
                  <button className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:bg-secondary">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{c.label}</p>
                      <p className="text-xs text-muted-foreground">{c.detail}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-semibold text-foreground">Disponibilité du service</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <Row label="Box de déchocage" value="1 / 2 libre" tone="ok" />
            <Row label="Lits de réanimation" value="3 disponibles" tone="ok" />
            <Row label="Bloc opératoire" value="Occupé" tone="warn" />
            <Row label="Sang O- en stock" value="Suffisant" tone="ok" />
          </dl>
        </div>
      </div>
      </div>
    </div>
  )
}

function Row({ label, value, tone }: { label: string; value: string; tone: "ok" | "warn" }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "inline-flex items-center gap-1.5 font-medium",
          tone === "ok" ? "text-chart-2" : "text-chart-3",
        )}
      >
        <span
          className={cn("h-2 w-2 rounded-full", tone === "ok" ? "bg-chart-2" : "bg-chart-3")}
        />
        {value}
      </dd>
    </div>
  )
}
