import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Home, Zap, Workflow, Database, Shield, Sparkles } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { InteractiveCard } from "@/components/interactive-card"

export default function Overview() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="PCR Email AI Agent"
        description="Intelligent property inspection scheduling system powered by AI - automatically processes booking requests, extracts data from multiple sources, and matches inspections with qualified inspectors using advanced algorithms."
        icon={Home}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <InteractiveCard
          title="System Purpose"
          icon={<Sparkles className="w-5 h-5" />}
          description="Automated end-to-end inspection booking"
        >
          <p className="text-muted-foreground leading-relaxed">
            An intelligent automation system designed to automatically process incoming property inspection booking
            requests via email, extract property details from multiple sources, and schedule inspections with qualified
            inspectors using a sophisticated 11-step matching algorithm.
          </p>
        </InteractiveCard>

        <InteractiveCard
          title="Technology Stack"
          icon={<Database className="w-5 h-5" />}
          description="Modern, scalable architecture"
        >
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="transition-transform hover:scale-105">
              Python 3.12
            </Badge>
            <Badge variant="secondary" className="transition-transform hover:scale-105">
              Flask 3.0
            </Badge>
            <Badge variant="secondary" className="transition-transform hover:scale-105">
              Supabase
            </Badge>
            <Badge variant="secondary" className="transition-transform hover:scale-105">
              Google Gemini AI
            </Badge>
            <Badge variant="secondary" className="transition-transform hover:scale-105">
              Gmail API
            </Badge>
            <Badge variant="secondary" className="transition-transform hover:scale-105">
              Google Calendar
            </Badge>
            <Badge variant="secondary" className="transition-transform hover:scale-105">
              Playwright
            </Badge>
          </div>
        </InteractiveCard>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Workflow className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-bold">How It Works</h2>
        </div>
        <div className="grid gap-4">
          {[
            {
              step: 1,
              title: "Monitors Gmail",
              desc: "Real-time monitoring via Google Pub/Sub push notifications for property inspection booking requests",
              color: "from-blue-500 to-blue-600",
            },
            {
              step: 2,
              title: "Extracts Data",
              desc: "Pulls information from emails, attachments (PDF/Word/Excel), and external platforms (TAPI, PropertyTree)",
              color: "from-purple-500 to-purple-600",
            },
            {
              step: 3,
              title: "Schedules Inspections",
              desc: "Uses 11-step algorithm matching inspectors by qualifications (40% geography, 35% workload, 25% locality)",
              color: "from-green-500 to-green-600",
            },
            {
              step: 4,
              title: "Creates Calendar Events",
              desc: "Generates Google Calendar events and sends invitations to assigned inspectors",
              color: "from-orange-500 to-orange-600",
            },
            {
              step: 5,
              title: "Generates AI Responses",
              desc: "Creates contextual email replies using Google Gemini and sends via Gmail API",
              color: "from-pink-500 to-pink-600",
            },
            {
              step: 6,
              title: "Tracks Everything",
              desc: "Maintains comprehensive audit trail in Supabase PostgreSQL database",
              color: "from-indigo-500 to-indigo-600",
            },
          ].map((item, index) => (
            <div
              key={item.step}
              className="flex gap-4 p-5 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {item.step}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-bold">Key Features</h2>
        </div>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Email Processing & Intent Classification",
            "Intelligent Data Extraction (AI + OCR)",
            "11-Step Scheduling Algorithm",
            "Google Calendar Integration",
            "TAPI Platform Scraping",
            "PropertyTree Integration",
            "PDF/Word/Excel Processing",
            "Image OCR (Gemini Vision)",
            "Multi-Request Handling",
            "Property Manager Preferences",
            "Automated Email Responses",
            "Comprehensive Audit Logging",
          ].map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 animate-fade-in group"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <InteractiveCard
        title="Quick Navigation"
        icon={<Zap className="w-5 h-5" />}
        description="Jump to the section you need"
        className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20"
      >
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { href: "/quick-start", label: "Quick Start Guide", desc: "Get up and running in 5 minutes" },
            { href: "/architecture", label: "System Architecture", desc: "Understand the system design" },
            { href: "/api-reference", label: "API Documentation", desc: "Complete endpoint reference" },
            { href: "/scheduling", label: "Scheduling Algorithm", desc: "11-step inspector matching" },
            { href: "/setup", label: "Setup & Deployment", desc: "Complete deployment guide" },
            { href: "/troubleshooting", label: "Troubleshooting", desc: "Common issues and solutions" },
          ].map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between p-4 bg-card rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group border border-border hover:border-primary/50 animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div>
                <div className="font-semibold text-primary mb-1">{link.label}</div>
                <div className="text-xs text-muted-foreground">{link.desc}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Link>
          ))}
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="System Information"
        description="Critical deployment details"
        className="border-amber-200 dark:border-amber-800/50 bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-950/30"
      >
        <div className="grid gap-4 md:grid-cols-2 text-sm">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[140px] text-amber-900 dark:text-amber-100">Project Status:</span>
              <Badge className="bg-green-500 text-white">Production</Badge>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[140px] text-amber-900 dark:text-amber-100">
                Geographic Coverage:
              </span>
              <span className="text-muted-foreground">Australia-wide (primarily WA)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[140px] text-amber-900 dark:text-amber-100">Inspection Types:</span>
              <span className="text-muted-foreground">PCR, Final, Routine</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[140px] text-amber-900 dark:text-amber-100">Property Types:</span>
              <span className="text-muted-foreground">Residential, Commercial, Industrial</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[140px] text-amber-900 dark:text-amber-100">Default Timezone:</span>
              <span className="text-muted-foreground">Australia/Perth (UTC+8)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[140px] text-amber-900 dark:text-amber-100">Version:</span>
              <Badge variant="outline">1.0.0</Badge>
            </div>
          </div>
        </div>
      </InteractiveCard>
    </div>
  )
}
