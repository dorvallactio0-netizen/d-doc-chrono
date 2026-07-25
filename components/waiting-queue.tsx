"use client"

import { useState } from "react"
import { Clock, DoorOpen, Check, CircleDot } from "lucide-react"
import { queue as initialQueue, type QueueStatus } from "@/lib/data"
import { PriorityBadge } from "@/components/priority-badge"
import { cn } from "@/lib/utils"

const statusMeta: Record<QueueStatus, { label: string; className: string; icon: typeof CircleDot }> = {
  en_attente: {
    label: "En attente",
    className: "text-muted-foreground bg-secondary",
    icon: Clock,
  },
  en_consultation: {
    label: "En consultation",
    className: "text-primary bg-primary/10",
    icon: DoorOpen,
  },
  termine: {
    label: "Terminé",
    className: "text-chart-2 bg-chart-2/10",
    icon: Check,
  },
}

export function WaitingQueue({ limit }: { limit?: number }) {
  const [entries] = useState(initialQueue)
  const order = { urgent: 0, prioritaire: 1, standard: 2 }
  const sorted = [...entries]
    .filter((e) => e.status !== "termine")
    .sort((a, b) => order[a.priority] - order[b.priority] || b.waitedMinutes - a.waitedMinutes)

  const shown = limit ? sorted.slice(0, limit) : sorted

  return (
    <section className="flex flex-col rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="font-semibold text-foreground">File d'attente</h2>
          <p className="text-sm text-muted-foreground">{sorted.length} patients en attente de prise en charge</p>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground sm:inline-flex">
          <CircleDot className="h-3 w-3 text-chart-2" />
          Triage automatique
        </span>
      </div>

      <ul className="divide-y divide-border">
        {shown.map((entry, index) => {
          const meta = statusMeta[entry.status]
          const StatusIcon = meta.icon
          return (
            <li key={entry.id} className="flex items-center gap-4 px-5 py-3.5">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-semibold",
                  entry.status === "en_consultation"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {index + 1}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-foreground">{entry.name}</p>
                  <span className="font-mono text-xs text-muted-foreground">{entry.ticket}</span>
                </div>
                <p className="truncate text-sm text-muted-foreground">
                  {entry.reason} · {entry.age} ans
                </p>
              </div>

              <div className="hidden text-right sm:block">
                <p className="inline-flex items-center gap-1 font-mono text-sm text-foreground">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  {entry.waitedMinutes} min
                </p>
                <p className="text-xs text-muted-foreground">{entry.room}</p>
              </div>

              <PriorityBadge priority={entry.priority} className="hidden md:inline-flex" />

              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                  meta.className,
                )}
              >
                <StatusIcon className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">{meta.label}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
