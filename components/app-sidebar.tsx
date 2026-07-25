"use client"

import {
  Activity,
  LayoutDashboard,
  FolderHeart,
  Users,
  Siren,
  UserPlus,
  CalendarDays,
  Settings,
  Stethoscope,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type View = "dashboard" | "records" | "new" | "queue" | "emergency"

const nav: { id: View; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { id: "records", label: "Dossiers médicaux", icon: FolderHeart },
  { id: "new", label: "Nouveau dossier", icon: UserPlus },
  { id: "queue", label: "File d'attente", icon: Users, badge: 4 },
  { id: "emergency", label: "Alertes d'urgence", icon: Siren, badge: 1 },
]

const secondary = [
  { label: "Planning", icon: CalendarDays },
  { label: "Équipe", icon: Stethoscope },
  { label: "Paramètres", icon: Settings },
]

export function AppSidebar({
  active,
  onSelect,
}: {
  active: View
  onSelect: (view: View) => void
}) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
          <Activity className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <p className="font-mono text-sm font-semibold tracking-tight">D.Doc.Chrono</p>
          <p className="text-xs text-sidebar-foreground/60">Poste de soins</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
          Navigation
        </p>
        {nav.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge ? (
                <span
                  className={cn(
                    "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                    item.id === "emergency"
                      ? "bg-destructive text-white"
                      : isActive
                        ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                        : "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          )
        })}

        <p className="px-3 pb-2 pt-6 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
          Gestion
        </p>
        {secondary.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground">
            HL
          </div>
          <div className="flex-1 leading-tight">
            <p className="text-sm font-medium">Dr. H. Lefebvre</p>
            <p className="text-xs text-sidebar-foreground/60">Médecin urgentiste</p>
          </div>
          <button
            aria-label="Se déconnecter"
            className="rounded-md p-1.5 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
