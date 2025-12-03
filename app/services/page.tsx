import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Layers } from "lucide-react"

export default function Services() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-8 h-8 text-teal-500" />
          <Badge variant="secondary">Services Layer</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Services Documentation</h1>
        <p className="text-xl text-muted-foreground">Business logic layer and service modules</p>
      </div>

      <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 border-teal-200 dark:border-teal-800">
        <CardHeader>
          <CardTitle>Services Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            The services layer contains reusable business logic separated from API endpoints. Services are called by
            blueprints and provide core functionality for scheduling, email processing, data extraction, and external
            integrations.
          </p>
          <div className="grid gap-3 md:grid-cols-2 text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded border border-border">
              <p className="font-semibold mb-1">Design Pattern</p>
              <p className="text-muted-foreground">
                Service-oriented architecture with single responsibility principle
              </p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded border border-border">
              <p className="font-semibold mb-1">Testing</p>
              <p className="text-muted-foreground">Services are unit-testable independent of Flask routes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {[
          {
            name: "inspection_scheduler.py",
            lines: "4,826 lines",
            category: "Core Logic",
            description:
              "The heart of the system - implements the 11-step scheduling algorithm with multi-factor scoring",
            classes: [
              {
                name: "InspectionScheduler",
                methods: [
                  "schedule_inspection() - Main scheduling entry point",
                  "_validate_business_day() - Weekend/holiday validation",
                  "_filter_qualified_inspectors() - Certification filtering",
                  "_evaluate_geographic_proximity() - Distance scoring (40%)",
                  "_assess_workload_balance() - Utilization scoring (35%)",
                  "_compute_same_day_locality_factor() - Locality scoring (25%)",
                  "_find_optimal_time_slot() - Time slot selection",
                  "_create_google_calendar_event() - Calendar event creation",
                ],
              },
            ],
            usage: "Called by email_agent blueprint during booking processing",
          },
          {
            name: "email_reply_service.py",
            lines: "~800 lines",
            category: "Communication",
            description: "Handles email composition, markdown conversion, and sending via Gmail API",
            classes: [
              {
                name: "EmailReplyService",
                methods: [
                  "send_thread_reply() - Send email reply to thread",
                  "_markdown_to_html() - Convert markdown to styled HTML",
                  "_process_inline_markdown() - Process bold, italic, code",
                  "_mark_thread_as_read() - Remove UNREAD label",
                  "_add_smartbotics_label() - Add custom label",
                ],
              },
            ],
            usage: "Used by email_agent to send AI-generated responses",
          },
          {
            name: "attachment_processor.py",
            lines: "~600 lines",
            category: "Data Extraction",
            description: "Processes email attachments using OCR and document parsing",
            functions: [
              "process_email_attachments() - Main processing function",
              "extract_text_from_attachment() - Route to appropriate extractor",
              "extract_text_with_retry() - OCR with Gemini Vision (3 retries)",
              "download_gmail_attachment() - Download via Gmail API",
            ],
            formats: "PDF, Word (.docx), Excel (.xlsx, .xls), CSV, images, text files",
            usage: "Called by email_agent when email contains attachments",
          },
          {
            name: "link_extractor.py",
            lines: "~400 lines",
            category: "Data Extraction",
            description: "Extracts and classifies URLs from email content",
            functions: [
              "extract_and_classify_links() - Main extraction function",
              "extract_urls_from_text() - Regex-based URL extraction",
              "classify_url() - Classify as DOCUMENT/TAPI/GENERIC",
              "is_excluded_url() - Filter tracking/map links",
            ],
            types: "DOCUMENT (PDF, Excel, Word), TAPI platform links, GENERIC web pages",
            usage: "Used to identify external resources for data extraction",
          },
          {
            name: "content_extractor.py",
            lines: "~300 lines",
            category: "Web Scraping",
            description: "Downloads documents and scrapes web pages",
            functions: [
              "download_document_from_url() - Download files from URLs",
              "extract_generic_page_content() - Scrape web page HTML",
            ],
            usage: "Processes document links found by link_extractor",
          },
          {
            name: "bedroom_lookup.py",
            lines: "~500 lines",
            category: "Data Enrichment",
            description: "Enriches property data using AI and Google Maps",
            functions: [
              "enrich_bedrooms_with_gemini() - AI-based bedroom count detection",
              "enrich_address_with_google_maps() - Complete address via Maps API",
            ],
            usage: "Called when property details are incomplete",
          },
          {
            name: "calendar_search_service.py",
            lines: "~400 lines",
            category: "Integration",
            description: "Searches Google Calendar events with filtering",
            classes: [
              {
                name: "CalendarSearchService",
                methods: [
                  "search_future_events() - Search with text and date filters",
                  "_extract_event_details() - Parse event data",
                  "_matches_search_criteria() - Additional filtering",
                ],
              },
            ],
            usage: "Used by calendar_search blueprint",
          },
          {
            name: "event_sync.py",
            lines: "~700 lines",
            category: "Integration",
            description: "Synchronizes calendar events with database",
            functions: [
              "get_primary_calendar_id() - Retrieve primary calendar",
              "manage_synced_event_state() - Sync event to database",
              "compare_event_states() - Detect changes",
              "register_calendar_events_watch() - Register webhook",
            ],
            usage: "Called by app.py and webhook handlers",
          },
          {
            name: "booking_policy.py",
            lines: "~300 lines",
            category: "Business Rules",
            description: "Validation rules and business logic enforcement",
            rules: [
              "Business hour validation (9 AM - 5 PM)",
              "Holiday checking (Australian calendar)",
              "Weekend restrictions",
              "Capacity limit enforcement",
            ],
            usage: "Used throughout scheduling and booking processes",
          },
          {
            name: "watch_renewal_service.py",
            lines: "~400 lines",
            category: "Maintenance",
            description: "Manages webhook expiration and renewal",
            functions: [
              "renew_watches_for_account() - Renew all watches for account",
              "renew_watches_for_all_accounts() - Bulk renewal",
              "check_expiring_watches() - Find watches expiring soon",
            ],
            schedule: "Gmail watches expire after 7 days, Calendar watches after 30 days",
            usage: "Called by watch_renewal blueprint and scheduled tasks",
          },
        ].map((service) => (
          <Card key={service.name} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-teal-600" />
                  <CardTitle className="text-lg font-mono">{service.name}</CardTitle>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{service.category}</Badge>
                  {service.lines && <Badge variant="outline">{service.lines}</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{service.description}</p>

              {service.classes && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Classes & Methods:</h4>
                  {service.classes.map((cls) => (
                    <div key={cls.name} className="p-3 bg-muted/50 rounded border border-border">
                      <p className="font-mono text-sm mb-2">{cls.name}</p>
                      <ul className="space-y-1">
                        {cls.methods.map((method, i) => (
                          <li key={i} className="text-xs text-muted-foreground ml-4">
                            • {method}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {service.functions && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Functions:</h4>
                  <ul className="space-y-1">
                    {service.functions.map((func, i) => (
                      <li key={i} className="text-xs text-muted-foreground ml-4">
                        • {func}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.rules && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Rules:</h4>
                  <ul className="space-y-1">
                    {service.rules.map((rule, i) => (
                      <li key={i} className="text-xs text-muted-foreground ml-4">
                        • {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.formats && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Supported Formats:</h4>
                  <p className="text-xs text-muted-foreground">{service.formats}</p>
                </div>
              )}

              {service.types && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Classification Types:</h4>
                  <p className="text-xs text-muted-foreground">{service.types}</p>
                </div>
              )}

              {service.schedule && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Schedule:</h4>
                  <p className="text-xs text-muted-foreground">{service.schedule}</p>
                </div>
              )}

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <strong>Usage:</strong> {service.usage}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
