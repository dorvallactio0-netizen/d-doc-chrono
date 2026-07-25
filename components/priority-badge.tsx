import { cn } from "@/lib/utils"
import { priorityLabels, type Priority } from "@/lib/data"

const styles: Record<Priority, string> = {
  urgent: "bg-destructive/10 text-destructive border-destructive/30",
  prioritaire: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  standard: "bg-secondary text-secondary-foreground border-border",
}

export function PriorityBadge({
  priority,
  className,
}: {
  priority: Priority
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[priority],
        className,
      )}
    >
      {priority === "urgent" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-destructive" />
        </span>
      )}
      {priorityLabels[priority]}
    </span>
  )
}
