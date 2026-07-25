import { Users, Clock, FolderHeart, Siren, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    label: "Patients en file",
    value: "4",
    trend: "+2",
    up: true,
    icon: Users,
    accent: "text-primary bg-primary/10",
  },
  {
    label: "Attente moyenne",
    value: "19 min",
    trend: "-6 min",
    up: false,
    icon: Clock,
    accent: "text-chart-2 bg-chart-2/10",
  },
  {
    label: "Dossiers actifs",
    value: "128",
    trend: "+12",
    up: true,
    icon: FolderHeart,
    accent: "text-chart-5 bg-chart-5/10",
  },
  {
    label: "Urgences en cours",
    value: "1",
    trend: "Critique",
    up: true,
    icon: Siren,
    accent: "text-destructive bg-destructive/10",
    danger: true,
  },
]

export function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const Trend = stat.up ? TrendingUp : TrendingDown
        return (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", stat.accent)}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-medium",
                  stat.danger
                    ? "text-destructive"
                    : stat.up
                      ? "text-chart-2"
                      : "text-muted-foreground",
                )}
              >
                {!stat.danger && <Trend className="h-3.5 w-3.5" />}
                {stat.trend}
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}
