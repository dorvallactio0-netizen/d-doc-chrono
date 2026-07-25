"use client"

import { Search, Bell, Siren } from "lucide-react"
import type { View } from "@/components/app-sidebar"

const titles: Record<View, { title: string; subtitle: string }> = {
  dashboard: { title: "Tableau de bord", subtitle: "Vue d'ensemble du service en temps réel" },
  records: { title: "Dossiers médicaux", subtitle: "Consultez et gérez les dossiers patients" },
  new: { title: "Nouveau dossier", subtitle: "Enregistrez un patient et ses constantes" },
  queue: { title: "File d'attente", subtitle: "Suivi du triage et des consultations" },
  emergency: { title: "Alertes d'urgence", subtitle: "Cas critiques nécessitant une intervention" },
}

export function Topbar({
  view,
  onEmergency,
}: {
  view: View
  onEmergency: () => void
}) {
  const { title, subtitle } = titles[view]

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-border bg-background/80 px-4 py-3.5 backdrop-blur-sm md:px-6">
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-semibold text-foreground">{title}</h1>
        <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="relative hidden max-w-xs flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Rechercher un patient, un dossier…"
          className="w-full rounded-lg border border-input bg-card py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
      </div>

      <button
        aria-label="Notifications"
        className="relative rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-chart-3" />
      </button>

      <button
        onClick={onEmergency}
        className="inline-flex items-center gap-2 rounded-lg bg-destructive px-3 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-95"
      >
        <Siren className="h-4 w-4" />
        <span className="hidden sm:inline">Déclencher une urgence</span>
        <span className="sm:hidden">Urgence</span>
      </button>
    </header>
  )
}
