import { AlertDescription } from "@/components/ui/alert"
import { Alert } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Brain, FileText, LinkIcon, Calendar } from "lucide-react"

export default function EmailProcessing() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-8 h-8 text-blue-500" />
          <Badge variant="secondary">AI-Powered</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Email Processing Flow</h1>
        <p className="text-xl text-muted-foreground">How the AI agent processes incoming emails end-to-end</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Complete Email Processing Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                step: 1,
                icon: Mail,
                title: "Email Arrival",
                desc: "Email arrives in monitored Gmail inbox",
                details: "Gmail API monitors inbox via Google Pub/Sub push notifications",
              },
              {
                step: 2,
                icon: LinkIcon,
                title: "Webhook Trigger",
                desc: "Gmail sends push notification to webhook endpoint",
                details: "POST request to /webhook with message metadata",
              },
              {
                step: 3,
                icon: FileText,
                title: "Fetch Email Data",
                desc: "Retrieve complete email thread and attachments",
                details: "Uses Gmail API to fetch thread messages, HTML/text content, and download all attachments",
              },
              {
                step: 4,
                icon: Brain,
                title: "AI Intent Classification",
                desc: "Gemini AI determines the intent of the email",
                details:
                  "Classifies as: booking_request, rescheduling, cancellation, update_details, or customer_service",
              },
              {
                step: 5,
                icon: FileText,
                title: "Data Extraction",
                desc: "Extract structured data from email and attachments",
                details: "Process PDFs, Word docs, Excel files, images using OCR (Gemini Vision)",
              },
              {
                step: 6,
                icon: LinkIcon,
                title: "External Links Processing",
                desc: "Scrape TAPI and PropertyTree links for additional data",
                details: "Uses Playwright browser automation to extract property details from external platforms",
              },
              {
                step: 7,
                icon: Brain,
                title: "Data Enrichment",
                desc: "Enhance extracted data with Google Maps and AI",
                details: "Complete address via Google Maps API, bedroom count via Gemini if missing",
              },
              {
                step: 8,
                icon: Calendar,
                title: "Schedule Inspection",
                desc: "Run 11-step scheduling algorithm",
                details: "Match qualified inspector, create calendar event, send invitations",
              },
              {
                step: 9,
                icon: Mail,
                title: "Generate Response",
                desc: "AI generates contextual email reply",
                details: "Gemini creates response with booking confirmation and details",
              },
              {
                step: 10,
                icon: FileText,
                title: "Store & Send",
                desc: "Save to database and send email response",
                details: "Store in emails, email_responses, inspection_events tables; send via Gmail API",
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.step} className="flex gap-4 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.desc}</p>
                    <p className="text-xs text-muted-foreground italic">{item.details}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Intent Classification */}
      <Card>
        <CardHeader>
          <CardTitle>AI Intent Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                intent: "booking_request",
                desc: "New inspection booking request",
                action: "Extract details → Schedule inspection → Send confirmation",
              },
              {
                intent: "rescheduling",
                desc: "Request to change existing booking date/time",
                action: "Find existing booking → Update calendar → Notify inspector",
              },
              {
                intent: "cancellation",
                desc: "Request to cancel scheduled inspection",
                action: "Find booking → Cancel calendar event → Update database",
              },
              {
                intent: "update_details",
                desc: "Update property details without time change",
                action: "Update inspection_events record → Update calendar description",
              },
              {
                intent: "customer_service",
                desc: "General inquiry or question",
                action: "Generate helpful response → No scheduling action",
              },
              {
                intent: "multi_request",
                desc: "Multiple bookings in one email",
                action: "Process each booking individually → Batch response",
              },
            ].map((item) => (
              <div key={item.intent} className="p-4 bg-muted/50 rounded-lg border border-border">
                <Badge variant="secondary" className="mb-2">
                  {item.intent}
                </Badge>
                <p className="text-sm mb-2">{item.desc}</p>
                <p className="text-xs text-muted-foreground italic">→ {item.action}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attachment Processing */}
      <Card>
        <CardHeader>
          <CardTitle>Attachment Processing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { type: "PDF", process: "Convert to images → OCR with Gemini Vision", limit: "Max 10 pages, 25MB" },
                { type: "Word (.docx)", process: "Convert to image → OCR", limit: "Max 25MB" },
                { type: "Excel (.xlsx, .xls)", process: "Parse or convert to image → OCR", limit: "Max 25MB" },
                { type: "CSV", process: "Parse data or OCR", limit: "Max 25MB" },
                { type: "Images", process: "Direct OCR with Gemini Vision", limit: "Max 25MB per image" },
                { type: "Text Files", process: "Direct read", limit: "Max 25MB" },
              ].map((item) => (
                <div key={item.type} className="p-4 bg-muted/50 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">{item.type}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{item.process}</p>
                  <p className="text-xs text-amber-600">{item.limit}</p>
                </div>
              ))}
            </div>

            <Alert>
              <Brain className="w-4 h-4" />
              <AlertDescription>
                <strong>OCR Powered by Gemini Vision:</strong> All images and document conversions use Google Gemini's
                vision model for accurate text extraction with 3 retry attempts for rate limit handling.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* External Platform Integration */}
      <Card>
        <CardHeader>
          <CardTitle>External Platform Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold mb-2">TAPI Platform</h4>
              <p className="text-sm text-muted-foreground mb-3">Real estate issue tracking platform</p>
              <p className="text-xs mb-2">
                <strong>Extracts:</strong>
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Property address</li>
                <li>Bedrooms/bathrooms</li>
                <li>Property type</li>
                <li>Special instructions</li>
                <li>Inspection details</li>
              </ul>
              <p className="text-xs mt-3 italic">Uses Playwright browser automation with headless Chromium</p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold mb-2">PropertyTree</h4>
              <p className="text-sm text-muted-foreground mb-3">Property management software</p>
              <p className="text-xs mb-2">
                <strong>Extracts:</strong>
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Property details</li>
                <li>Tenant information</li>
                <li>Lease details</li>
                <li>Property manager contact</li>
              </ul>
              <p className="text-xs mt-3 italic">Link extraction and intelligent parsing</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
