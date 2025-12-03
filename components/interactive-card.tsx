"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface InteractiveCardProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  icon?: ReactNode
}

export function InteractiveCard({ title, description, children, className, icon }: InteractiveCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 animate-fade-in group",
        className,
      )}
    >
      <CardHeader>
        <div className="flex items-start gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold mb-1.5">{title}</CardTitle>
            {description && <CardDescription className="text-base">{description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
