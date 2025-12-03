import type React from "react"
import { AlertCircle, CheckCircle2, Info, XCircle, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  type?: "default" | "info" | "warning" | "danger" | "success" | "tip"
  title?: string
  children: React.ReactNode
  className?: string
}

const icons = {
  default: Info,
  info: Info,
  warning: AlertCircle,
  danger: XCircle,
  success: CheckCircle2,
  tip: Lightbulb,
}

const styles = {
  default: "bg-muted/50 border-border text-foreground",
  info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
  warning: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
  danger: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100",
  success: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
  tip: "bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800 text-violet-900 dark:text-violet-100",
}

export function Callout({ type = "default", title, children, className }: CalloutProps) {
  const Icon = icons[type]

  return (
    <div
      className={cn(
        "my-6 rounded-xl border p-4 shadow-sm flex gap-3 transition-all hover:shadow-md",
        styles[type],
        className,
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="space-y-1">
        {title && <h5 className="font-medium leading-none tracking-tight">{title}</h5>}
        <div className="text-sm opacity-90 leading-relaxed [&>p:last-child]:mb-0">{children}</div>
      </div>
    </div>
  )
}
