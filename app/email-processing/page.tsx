import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Brain, FileText, LinkIcon, Calendar, Database, MapPin, Server, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EmailProcessing() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-8 h-8 text-blue-500" />
          <Badge variant="secondary">AI-Powered</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Email Processing Pipeline</h1>
        <p className="text-xl text-muted-foreground">Comprehensive breakdown of the email agent's architecture and logic</p>
      </div>

      <Tabs defaultValue="pipeline" className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-8">
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="flowchart">Flowchart</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="functions">Functions</TabsTrigger>
          <TabsTrigger value="data-flow">Data Flow</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="logic">Logic</TabsTrigger>
        </TabsList>

        <TabsContent value="flowchart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Processing Flowchart</CardTitle>
              <CardDescription>Visual representation of the entire process</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center bg-muted/20 py-8">
              <img
                src="/flowchart/Email-Processing-Pipeline.png"
                alt="Email Processing Pipeline Flowchart"
                className="rounded-lg border shadow-sm max-w-full h-auto"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Full Email Processing Pipeline</CardTitle>
              <CardDescription>Linear pipeline from ingestion to response</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[
                  {
                    step: "1. Ingestion & Trigger",
                    icon: Mail,
                    items: [
                      "Trigger: Gmail push notification (webhook)",
                      "Entry Point: /draft-reply endpoint in blueprints/email_agent.py",
                      "Authentication: Validate request & fetch Gmail credentials"
                    ]
                  },
                  {
                    step: "2. Context Gathering (Enrichment)",
                    icon: FileText,
                    items: [
                      "Thread Fetch: Get full thread from Gmail API",
                      "Conversation Build: Parse raw email to structured history",
                      "Attachment Processing: OCR/Text Extraction (PDF/Images)",
                      "Link Extraction: Scrape TAPI links & download docs"
                    ]
                  },
                  {
                    step: "3. Intent Classification (The Brain)",
                    icon: Brain,
                    items: [
                      "LLM Analysis: Send enriched context to Gemini",
                      "Classification: SCHEDULING, RESCHEDULING, CANCELLATION, UPDATE_DETAILS, OUT_OF_SCOPE",
                      "Multi-Intent Check: Detect multiple requests in one email"
                    ]
                  },
                  {
                    step: "4. Data Enrichment (Missing Info)",
                    icon: MapPin,
                    items: [
                      "Address Validation: Google Maps API for full address",
                      "Property Details: Gemini infers bedrooms/bathrooms if missing"
                    ]
                  },
                  {
                    step: "5. Execution & Scheduling (The Logic)",
                    icon: Calendar,
                    items: [
                      "Cancellation: Cancel in DB & Google Calendar",
                      "Rescheduling: Re-evaluate availability & update",
                      "New Booking: Validate date, check preferences, qualify inspectors, check availability, score & assign",
                      "Scoring: Proximity (40%), Workload (35%), Same-Day Locality (25%)"
                    ]
                  },
                  {
                    step: "6. Response Generation",
                    icon: Mail,
                    items: [
                      "Drafting: LLM generates natural language HTML reply",
                      "Output: Return JSON with reply_text, html_reply, booking_status"
                    ]
                  }
                ].map((phase, i) => {
                  const Icon = phase.icon
                  return (
                    <div key={i} className="flex gap-4 p-4 bg-muted/50 rounded-lg border border-border">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{phase.step}</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {phase.items.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Intent Classification</CardTitle>
              <CardDescription>How Gemini determines the purpose of each email</CardDescription>
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

          <Card>
            <CardHeader>
              <CardTitle>Attachment Processing</CardTitle>
              <CardDescription>Handling documents and images with OCR</CardDescription>
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

                <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">OCR Powered by Gemini Vision</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      All images and document conversions use Google Gemini's vision model for accurate text extraction with 3 retry attempts for rate limit handling.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="architecture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Architecture Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground">
                    <tr>
                      <th className="p-4 font-medium">Service / Module</th>
                      <th className="p-4 font-medium">Input</th>
                      <th className="p-4 font-medium">Output</th>
                      <th className="p-4 font-medium">Downstream</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      { name: "Email Agent (blueprints/email_agent.py)", input: "account_id, thread_id, message_id", output: "JSON Reply", trigger: "All other services" },
                      { name: "Gmail Service (blueprints/gmail_operations.py)", input: "thread_id", output: "Raw Email Thread", trigger: "Content Extractor" },
                      { name: "Content Extractor (services/content_extractor.py)", input: "Raw Email HTML", output: "Cleaned Text", trigger: "Link/Attachment Processors" },
                      { name: "Attachment Processor (services/attachment_processor.py)", input: "Message Parts", output: "Extracted Text (OCR)", trigger: "LLM Context" },
                      { name: "Link Extractor (services/link_extractor.py)", input: "Email Body", output: "URLs", trigger: "TAPI Scraper" },
                      { name: "TAPI Scraper (tapi_scraper.py)", input: "TAPI URL", output: "Maintenance Details", trigger: "LLM Context" },
                      { name: "LLM Service (services/llm_service.py)", input: "Prompt + Context", output: "Classification, Reply", trigger: "Scheduler" },
                      { name: "Inspection Scheduler (services/inspection_scheduler.py)", input: "InspectionRequest", output: "Booking Result", trigger: "Calendar & DB" },
                      { name: "Google Calendar Service (utils/calendar_service.py)", input: "Event Details", output: "Event ID", trigger: "Supabase" },
                      { name: "Google Maps Service (services/bedroom_lookup.py)", input: "Partial Address", output: "Full Address", trigger: "Scheduler" },
                      { name: "Supabase DB (database/)", input: "SQL Queries", output: "Data", trigger: "None" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-muted/50">
                        <td className="p-4 font-medium">{row.name}</td>
                        <td className="p-4 text-muted-foreground">{row.input}</td>
                        <td className="p-4 text-muted-foreground">{row.output}</td>
                        <td className="p-4 text-muted-foreground">{row.trigger}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="functions" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                service: "Inspection Scheduler",
                funcs: [
                  { name: "schedule_inspection(request)", desc: "Main orchestrator. Input: InspectionRequest. Output: Success/Fail." },
                  { name: "_check_google_calendar_availability", desc: "Checks real-time availability. Calls Google Calendar API." },
                  { name: "_evaluate_geographic_proximity", desc: "Calculates distance. Uses zip_coordinates cache." }
                ]
              },
              {
                service: "Email Agent",
                funcs: [
                  { name: "draft_reply()", desc: "API Endpoint. Input: thread_id. Output: reply_text, intent." },
                  { name: "_build_conversation", desc: "Cleans and structures email thread." }
                ]
              },
              {
                service: "LLM Service",
                funcs: [
                  { name: "get_llm_response(model, prompt)", desc: "Wrapper for AI calls (Gemini, OpenAI)." }
                ]
              }
            ].map((svc, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{svc.service}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {svc.funcs.map((fn, j) => (
                      <li key={j}>
                        <code className="text-sm font-bold bg-muted px-1 rounded">{fn.name}</code>
                        <p className="text-sm text-muted-foreground mt-1">{fn.desc}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="data-flow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Flow Transformation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-muted ml-4 space-y-8 pb-4">
                {[
                  { title: "Raw Data", desc: "Gmail Payload (JSON with nested parts, base64 encoded)" },
                  { title: "Cleaned Context", desc: "Conversation History + Enriched Text (Attachments, TAPI Links)" },
                  { title: "Structured Intent", desc: "Intent: SCHEDULING, Entities: { address, date, type }" },
                  { title: "Enriched Entities", desc: "Address (Lat/Long), Property (Bed/Bath)" },
                  { title: "Booking Record", desc: "InspectionRequest Object (Entities + account_id)" },
                  { title: "Final Result", desc: "Booking Status: Confirmed, Inspector: Name, Reply: HTML Text" }
                ].map((step, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>External Platform Integration</CardTitle>
              <CardDescription>Deep integration with real estate platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold mb-2">TAPI Platform</h4>
                  <p className="text-sm text-muted-foreground mb-3">Real estate issue tracking platform</p>
                  <p className="text-xs mb-2"><strong>Extracts:</strong></p>
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
                  <p className="text-xs mb-2"><strong>Extracts:</strong></p>
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

          <Card>
            <CardHeader>
              <CardTitle>API Ecosystem</CardTitle>
              <CardDescription>Core services powering the agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { name: "Gmail API", desc: "Fetching threads, sending replies", type: "Communication" },
                  { name: "Google Calendar API", desc: "Reading events, creating bookings", type: "Scheduling" },
                  { name: "Google Maps API", desc: "Geocoding addresses for proximity", type: "Location" },
                  { name: "Gemini (LiteLLM)", desc: "Intent, Extraction, Drafting", type: "AI" },
                  { name: "Supabase (PostgreSQL)", desc: "Storing events, inspectors, logs", type: "Database" }
                ].map((api, i) => (
                  <div key={i} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{api.name}</h4>
                      <Badge variant="outline">{api.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{api.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Core Logic Principles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {[
                  { title: "Context First", desc: "Aggressively hunts for context in attachments and links (TAPI), not just email body." },
                  { title: "Multi-Layered Scheduling", desc: "Uses Weighted Scoring (Geo + Workload + Locality) to optimize fleet efficiency." },
                  { title: "Hybrid Availability", desc: "Checks both local DB (internal) and live Google Calendar (external/personal)." },
                  { title: "Fallback Mechanisms", desc: "Retries with Maps if address fails; returns specific errors for LLM explanation." }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

