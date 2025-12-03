import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Mail,
  Calendar,
  Database,
  Brain,
  FileText,
  LinkIcon,
  Users,
  AlertCircle,
  Clock,
} from "lucide-react"

export default function Features() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <Badge className="mb-4" variant="secondary">
          Feature Overview
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Core Features</h1>
        <p className="text-xl text-muted-foreground">Comprehensive capabilities of the PCR Email AI Agent</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            icon: Mail,
            title: "Email Processing",
            color: "blue",
            features: [
              "Real-time Gmail monitoring via Pub/Sub",
              "Thread-based email retrieval",
              "HTML and plain text support",
              "Automatic email labeling",
              "Smart reply generation",
            ],
          },
          {
            icon: Brain,
            title: "AI Intent Classification",
            color: "purple",
            features: [
              "Booking request detection",
              "Rescheduling identification",
              "Cancellation handling",
              "Update requests processing",
              "Multi-request parsing",
            ],
          },
          {
            icon: FileText,
            title: "Document Processing",
            color: "green",
            features: [
              "PDF text extraction (OCR)",
              "Word document parsing",
              "Excel/CSV data extraction",
              "Image text recognition",
              "Max 25MB file support",
            ],
          },
          {
            icon: LinkIcon,
            title: "External Integration",
            color: "amber",
            features: [
              "TAPI platform scraping",
              "PropertyTree data extraction",
              "Document link downloading",
              "Web page content extraction",
              "Playwright automation",
            ],
          },
          {
            icon: Calendar,
            title: "Calendar Management",
            color: "red",
            features: [
              "Google Calendar sync",
              "Event creation/updates",
              "Inspector invitations",
              "Webhook notifications",
              "Multi-calendar support",
            ],
          },
          {
            icon: Users,
            title: "Inspector Matching",
            color: "indigo",
            features: [
              "Qualification filtering",
              "Geographic scoring (40%)",
              "Workload balancing (35%)",
              "Locality optimization (25%)",
              "Property manager preferences",
            ],
          },
          {
            icon: Database,
            title: "Database Operations",
            color: "teal",
            features: [
              "Comprehensive CRUD API",
              "Complex query support",
              "RLS policy enforcement",
              "Audit trail logging",
              "Real-time data sync",
            ],
          },
          {
            icon: AlertCircle,
            title: "Error Handling",
            color: "rose",
            features: [
              "Automatic retry logic",
              "Slack alert integration",
              "Detailed error logging",
              "Graceful degradation",
              "Token refresh handling",
            ],
          },
          {
            icon: Clock,
            title: "Business Rules",
            color: "cyan",
            features: [
              "Business day validation",
              "Holiday checking (AU)",
              "Work hours enforcement",
              "Capacity management",
              "Time slot optimization",
            ],
          },
        ].map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900`}>
                    <Icon className={`w-6 h-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Detailed Feature Breakdown</h2>

        <Card>
          <CardHeader>
            <CardTitle>Email Processing & AI Classification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Real-Time Monitoring</h4>
              <p className="text-sm text-muted-foreground">
                Uses Google Pub/Sub push notifications to monitor Gmail inbox in real-time. When an email arrives, a
                webhook is triggered instantly, eliminating the need for polling and ensuring immediate processing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Intent Classification</h4>
              <p className="text-sm text-muted-foreground">
                Powered by Google Gemini AI, the system analyzes email content to determine the sender's intent:
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                <li>
                  <strong>booking_request</strong> - New inspection scheduling
                </li>
                <li>
                  <strong>rescheduling</strong> - Change existing booking date/time
                </li>
                <li>
                  <strong>cancellation</strong> - Cancel scheduled inspection
                </li>
                <li>
                  <strong>update_details</strong> - Modify property information
                </li>
                <li>
                  <strong>customer_service</strong> - General inquiries
                </li>
                <li>
                  <strong>multi_request</strong> - Multiple bookings in one email
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Extraction</h4>
              <p className="text-sm text-muted-foreground">
                AI-powered extraction of structured data from unstructured email text including property address,
                bedrooms/bathrooms, inspection type, preferred dates, special instructions, and contact information.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document & Attachment Processing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Multi-Format Support</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Comprehensive document processing with intelligent fallbacks:
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="p-3 bg-muted/50 rounded border border-border">
                  <p className="font-medium text-sm mb-1">PDF Files</p>
                  <p className="text-xs text-muted-foreground">
                    Convert pages to images → OCR with Gemini Vision → Extract text
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded border border-border">
                  <p className="font-medium text-sm mb-1">Word Documents</p>
                  <p className="text-xs text-muted-foreground">Convert to image → OCR extraction → Text parsing</p>
                </div>
                <div className="p-3 bg-muted/50 rounded border border-border">
                  <p className="font-medium text-sm mb-1">Excel/CSV</p>
                  <p className="text-xs text-muted-foreground">Parse data directly or convert to image for OCR</p>
                </div>
                <div className="p-3 bg-muted/50 rounded border border-border">
                  <p className="font-medium text-sm mb-1">Images</p>
                  <p className="text-xs text-muted-foreground">Direct OCR with Gemini Vision API</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">OCR Technology</h4>
              <p className="text-sm text-muted-foreground">
                Uses Google Gemini Vision API for optical character recognition with automatic retry logic (3 attempts)
                for rate limit handling and exponential backoff strategy.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intelligent Scheduling System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">11-Step Algorithm</h4>
              <p className="text-sm text-muted-foreground">
                Sophisticated multi-factor scoring system that evaluates inspectors based on qualifications, geographic
                proximity (40%), workload balance (35%), and same-day locality (25%). Property manager preferences
                provide an additional +20 point bonus.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Time Slot Optimization</h4>
              <p className="text-sm text-muted-foreground">
                Intelligent time slot selection considers business hours (9 AM - 5 PM), existing bookings, inspector
                availability, and priority windows (8 AM - 6 PM for urgent requests). Uses 30-minute intervals for
                optimal scheduling density.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Business Rule Enforcement</h4>
              <p className="text-sm text-muted-foreground">
                Validates all bookings against Australian holidays (WA calendar), weekend restrictions, inspector
                certifications, property type compatibility, and daily capacity limits.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
