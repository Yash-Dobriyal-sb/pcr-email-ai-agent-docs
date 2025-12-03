"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Zap,
  Cpu,
  Calendar,
  Mail,
  Layers,
  Star,
  Code,
  Database,
  FileText,
  Settings,
  AlertTriangle,
  GitPullRequest,
  ChevronRight,
  Sparkles,
} from "lucide-react"

const navigation = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Quick Start", href: "/quick-start", icon: Zap },
  { name: "Architecture", href: "/architecture", icon: Cpu },
  { name: "Scheduling Algorithm", href: "/scheduling", icon: Calendar },
  { name: "Email Processing", href: "/email-processing", icon: Mail },
  { name: "Services Layer", href: "/services", icon: Layers },
  { name: "Features", href: "/features", icon: Star },
  { name: "API Reference", href: "/api-reference", icon: Code },
  { name: "Database Schema", href: "/database", icon: Database },
  { name: "File Documentation", href: "/file-docs", icon: FileText },
  { name: "Setup & Deployment", href: "/setup", icon: Settings },
  { name: "Troubleshooting", href: "/troubleshooting", icon: AlertTriangle },
  { name: "Future Improvements", href: "/improvements", icon: GitPullRequest },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col z-40">
        {/* Enhanced sidebar styling with glassmorphism and gradient accents */}
        <div className="flex flex-col flex-grow border-r border-border bg-sidebar/95 backdrop-blur-xl overflow-y-auto shadow-sm custom-scrollbar">
          <div className="flex items-center flex-shrink-0 px-6 py-8">
            <div className="flex items-center gap-3.5 group cursor-pointer">
              {/* Animated logo container */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-chart-3 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 group-hover:scale-105 transition-all duration-300">
                P
              </div>
              <div>
                <h1 className="text-sm font-bold text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors">
                  PCR Email AI Agent
                </h1>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">
                  Docs v1.0
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            <div className="px-2 mb-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">
              Navigation
            </div>
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative overflow-hidden",
                    isActive
                      ? "text-primary bg-primary/10 shadow-sm"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                  )}
                >
                  {/* Active indicator pill */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                  )}

                  <div className="flex items-center z-10">
                    <item.icon
                      className={cn(
                        "mr-3 h-4 w-4 flex-shrink-0 transition-colors duration-200",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                      )}
                    />
                    {item.name}
                  </div>
                  {/* Subtle chevron only on hover or active */}
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 transition-all duration-200 opacity-0 -translate-x-2",
                      (isActive || "group-hover:opacity-100 group-hover:translate-x-0") && "opacity-100 translate-x-0",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="p-4 mt-auto">
            {/* Interactive "Help" card at bottom of sidebar */}
            <div className="rounded-xl bg-gradient-to-br from-sidebar-accent to-background border border-border/50 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold text-foreground">Pro Tip</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-mono">
                  Cmd+K
                </kbd>{" "}
                to search the documentation quickly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
