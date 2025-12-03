import type { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  title: string
  description: string
  icon?: LucideIcon
}

export function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
  return (
    <div className="mb-10 pb-8 border-b border-border animate-slide-in">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground shadow-lg animate-scale-in">
            <Icon className="h-7 w-7" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">{title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{description}</p>
        </div>
      </div>
    </div>
  )
}
