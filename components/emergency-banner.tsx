"use client"

import { Siren, X, MapPin, HeartPulse } from "lucide-react"
import { emergencyCases } from "@/lib/data"

export function EmergencyBanner({ onDismiss }: { onDismiss: () => void }) {
  const active = emergencyCases[0]

  return (
    <div className="animate-in fade-in slide-in-from-top-2 overflow-hidden rounded-xl border border-destructive/40 bg-destructive/5">
      <div className="flex items-center gap-2 bg-destructive px-4 py-2 text-white">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
        </span>
        <Siren className="h-4 w-4" />
        <span className="text-sm font-semibold uppercase tracking-wide">
          Code rouge — Urgence vitale
        </span>
        <span className="ml-auto text-xs font-medium text-white/80">{active.triggeredAt}</span>
        <button
          onClick={onDismiss}
          aria-label="Acquitter l'alerte"
          className="rounded-md p-1 transition-colors hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="font-semibold text-foreground">
            {active.name}, {active.age} ans
          </p>
          <p className="text-sm text-muted-foreground">{active.condition}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-1.5 font-mono text-foreground">
            <HeartPulse className="h-4 w-4 text-destructive" />
            {active.vitals}
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {active.location}
          </span>
        </div>
        <button className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95">
          Prendre en charge
        </button>
      </div>
    </div>
  )
}
