import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Code, Folder } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function FileDocs() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-8 h-8 text-indigo-500" />
          <Badge variant="secondary">File Reference</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">File-by-File Documentation</h1>
        <p className="text-xl text-muted-foreground">Complete codebase reference with detailed explanations</p>
      </div>

      {/* Core Application Files */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Folder className="w-6 h-6" />
          Core Application Files
        </h2>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-mono">app.py</CardTitle>
              <Badge variant="secondary">1,496 lines</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              <strong>Purpose:</strong> Main Flask application entry point
            </p>

            <div>
              <h4 className="font-semibold text-sm mb-2">Key Components:</h4>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>
                  <strong>Flask App Initialization</strong> - CORS configuration, blueprint registration, logging setup
                </li>
                <li>
                  <strong>OAuth Routes</strong> - /authenticate, /oauth2callback, /google/login handlers
                </li>
                <li>
                  <strong>Token Management</strong> - AuditedCredentials class, automatic refresh logic
                </li>
                <li>
                  <strong>Availability Checking</strong> - Multi-inspector availability endpoints
                </li>
                <li>
                  <strong>Calendar Sync</strong> - Sync and backfill operations
                </li>
                <li>
                  <strong>Webhook Endpoints</strong> - Gmail, calendar events, calendar list webhooks
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Key Functions:</h4>
              <div className="space-y-2">
                <div className="p-3 bg-muted/50 rounded border border-border">
                  <code className="text-xs font-mono">AuditedCredentials</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Custom credentials class with refresh tracking and audit logging
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded border border-border">
                  <code className="text-xs font-mono">get_primary_calendar_id()</code>
                  <p className="text-xs text-muted-foreground mt-1">Retrieve primary calendar for account</p>
                </div>
                <div className="p-3 bg-muted/50 rounded border border-border">
                  <code className="text-xs font-mono">check_availability_by_account()</code>
                  <p className="text-xs text-muted-foreground mt-1">Check inspector availability for time range</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Dependencies:</h4>
              <p className="text-xs text-muted-foreground">
                Flask, flask-cors, Google API libraries, Supabase client, all blueprints and utilities
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-mono">tapi_scraper.py</CardTitle>
              <Badge variant="secondary">Core Utility</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <strong>Purpose:</strong> TAPI platform web scraper using Playwright
            </p>

            <div>
              <h4 className="font-semibold text-sm mb-2">Key Function:</h4>
              <div className="p-3 bg-muted/50 rounded border border-border">
                <code className="text-xs font-mono">extract_tapi_page_data(link, headless=True)</code>
                <p className="text-xs text-muted-foreground mt-2">
                  Extracts: Property address, bedrooms/bathrooms, property type, special instructions, inspection
                  details
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Error Handling:</h4>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Timeout handling with configurable limits</li>
                <li>Element not found graceful degradation</li>
                <li>Automatic browser cleanup</li>
                <li>Retry logic for network failures</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blueprints */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Code className="w-6 h-6" />
          Blueprints Layer
        </h2>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-mono">blueprints/email_agent.py</CardTitle>
              <Badge variant="secondary">5,265 lines</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              <strong>Purpose:</strong> AI-powered email processing endpoints (largest and most complex file)
            </p>

            <div>
              <h4 className="font-semibold text-sm mb-2">Key Endpoints:</h4>
              <div className="space-y-2">
                <div className="p-3 bg-muted/50 rounded border border-border">
                  <code className="text-xs font-mono">POST /api/email-agent/draft-reply</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Generate draft response without sending (dry run mode)
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded border border-border">
                  <code className="text-xs font-mono">POST /api/email-agent/process-and-reply</code>
                  <p className="text-xs text-muted-foreground mt-1">Process email and send AI-generated response</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Key Functions (20+ internal functions):</h4>
              <div className="grid gap-2 md:grid-cols-2">
                {[
                  { name: "_finalize_response_with_tapi()", desc: "Send responses to TAPI platform" },
                  { name: "_extract_day_clues_from_text()", desc: "Extract day preferences from text" },
                  { name: "_decode_gmail_payload_text()", desc: "Parse Gmail message payload" },
                  { name: "_collect_thread_html()", desc: "Extract HTML from email thread" },
                  { name: "_safe_search_inspection_events()", desc: "Search existing bookings safely" },
                  { name: "_persist_external_cancellation()", desc: "Handle calendar cancellations" },
                ].map((func) => (
                  <div key={func.name} className="p-2 bg-muted/30 rounded text-xs">
                    <code className="font-mono">{func.name}</code>
                    <p className="text-muted-foreground mt-1">{func.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <Alert>
              <AlertDescription className="text-xs">
                This file contains the core AI integration logic using Google Gemini for intent classification, data
                extraction, and response generation. It handles multi-request scenarios, attachment processing, and
                external platform scraping.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-mono">blueprints/email.py</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <strong>Purpose:</strong> Gmail API operations
              </p>
              <div className="space-y-1 text-xs">
                <p>
                  <code className="bg-muted px-1 rounded">GET /api/email/get-emails/account/&lt;id&gt;</code>
                </p>
                <p>
                  <code className="bg-muted px-1 rounded">GET /api/email/message/&lt;id&gt;/&lt;msg_id&gt;</code>
                </p>
                <p>
                  <code className="bg-muted px-1 rounded">GET /api/email/get-thread/&lt;id&gt;/&lt;thread_id&gt;</code>
                </p>
                <p>
                  <code className="bg-muted px-1 rounded">POST /api/email/send-reply</code>
                </p>
                <p>
                  <code className="bg-muted px-1 rounded">GET /api/email/attachment/&lt;ids&gt;</code>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-mono">blueprints/calendar_search.py</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <strong>Purpose:</strong> Google Calendar search
              </p>
              <div className="space-y-1 text-xs">
                <p>
                  <code className="bg-muted px-1 rounded">GET /api/calendar/search/account/&lt;id&gt;</code>
                </p>
                <p>
                  <code className="bg-muted px-1 rounded">GET /api/calendar/search/.../by-date/&lt;date&gt;</code>
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Features: Text search, date filtering, timezone support
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-mono">blueprints/database.py</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <strong>Purpose:</strong> Database CRUD operations
              </p>
              <div className="space-y-1 text-xs">
                <p>
                  <code className="bg-muted px-1 rounded">POST /api/db/query/&lt;table&gt;</code>
                </p>
                <p>
                  <code className="bg-muted px-1 rounded">POST /api/db/insert/&lt;table&gt;</code>
                </p>
                <p>
                  <code className="bg-muted px-1 rounded">POST /api/db/update/&lt;table&gt;</code>
                </p>
                <p>
                  <code className="bg-muted px-1 rounded">POST /api/db/delete/&lt;table&gt;</code>
                </p>
                <p>
                  <code className="bg-muted px-1 rounded">POST /api/db/raw_query</code>
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Operators: eq, neq, gt, lt, like, in, contains, etc.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-mono">blueprints/watch_renewal.py</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <strong>Purpose:</strong> Webhook renewal management
              </p>
              <div className="space-y-1 text-xs">
                <p>
                  <code className="bg-muted px-1 rounded">POST /api/watches/renew</code>
                </p>
                <p>
                  <code className="bg-muted px-1 rounded">POST /api/watches/renew/account/&lt;id&gt;</code>
                </p>
                <p>
                  <code className="bg-muted px-1 rounded">GET /api/watches/check-expiring</code>
                </p>
                <p>
                  <code className="bg-muted px-1 rounded">GET /api/watches/status/account/&lt;id&gt;</code>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Services Layer */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Code className="w-6 h-6" />
          Services Layer
        </h2>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-mono">services/inspection_scheduler.py</CardTitle>
              <Badge variant="secondary">4,826 lines</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              <strong>Purpose:</strong> Core inspection scheduling algorithm (second largest file)
            </p>

            <div>
              <h4 className="font-semibold text-sm mb-2">Main Class: InspectionScheduler</h4>
              <div className="space-y-2">
                {[
                  { name: "schedule_inspection(request, mode)", desc: "Main entry point - runs 11-step algorithm" },
                  { name: "_validate_business_day(request)", desc: "Step 1.5 - Check weekends/holidays" },
                  { name: "_identify_property_manager_preferences()", desc: "Step 2 - Match PM preferences" },
                  { name: "_filter_qualified_inspectors()", desc: "Step 3 - Filter by certifications" },
                  { name: "_evaluate_geographic_proximity()", desc: "Step 4 - Calculate distance scores (40%)" },
                  { name: "_assess_workload_balance()", desc: "Step 5 - Calculate utilization (35%)" },
                  { name: "_compute_same_day_locality_factor()", desc: "Step 5.7 - Same-day jobs (25%)" },
                  { name: "_compute_overall_priority_score()", desc: "Step 6 - Weighted sum + PM bonus" },
                  { name: "_find_optimal_time_slot()", desc: "Intelligent time slot selection" },
                  { name: "_create_google_calendar_event()", desc: "Create calendar event via API" },
                ].map((method) => (
                  <div key={method.name} className="p-2 bg-muted/30 rounded text-xs">
                    <code className="font-mono">{method.name}</code>
                    <p className="text-muted-foreground mt-1">{method.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Data Classes:</h4>
              <p className="text-xs text-muted-foreground">
                InspectionRequest, InspectorQualification, InspectionType (enum), PropertyType (enum), SchedulingMode
                (enum)
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              file: "email_reply_service.py",
              purpose: "Email composition and sending",
              methods: [
                "send_thread_reply() - Send reply to thread",
                "_markdown_to_html() - Convert markdown",
                "_process_inline_markdown() - Inline formatting",
                "_mark_thread_as_read() - Update labels",
              ],
            },
            {
              file: "attachment_processor.py",
              purpose: "File extraction from attachments",
              methods: [
                "process_email_attachments() - Process all attachments",
                "extract_text_from_attachment() - Route to extractor",
                "extract_text_with_retry() - OCR with retry",
                "download_gmail_attachment() - Download file",
              ],
            },
            {
              file: "link_extractor.py",
              purpose: "URL extraction and classification",
              methods: [
                "extract_and_classify_links() - Extract URLs",
                "classify_url() - Classify as DOCUMENT/TAPI/GENERIC",
                "is_excluded_url() - Filter non-actionable",
              ],
            },
            {
              file: "bedroom_lookup.py",
              purpose: "Property enrichment",
              methods: [
                "enrich_bedrooms_with_gemini() - AI bedroom detection",
                "enrich_address_with_google_maps() - Address enrichment",
              ],
            },
            {
              file: "event_sync.py",
              purpose: "Calendar synchronization",
              methods: [
                "manage_synced_event_state() - Sync event state",
                "compare_event_states() - Detect changes",
                "register_calendar_events_watch() - Register webhook",
              ],
            },
            {
              file: "watch_renewal_service.py",
              purpose: "Webhook renewal logic",
              methods: ["renew_watches_for_account() - Renew watches", "check_expiring_watches() - Find expiring"],
            },
          ].map((service) => (
            <Card key={service.file}>
              <CardHeader>
                <CardTitle className="text-sm font-mono">{service.file}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  <strong>Purpose:</strong> {service.purpose}
                </p>
                <ul className="space-y-1">
                  {service.methods.map((method, i) => (
                    <li key={i} className="text-xs text-muted-foreground">
                      • {method}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Configuration Files */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Configuration & Support Files
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-mono">requirements.txt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-2">Python dependencies</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>Flask==3.0.0</li>
                <li>google-api-python-client</li>
                <li>google-generativeai</li>
                <li>supabase==2.0.2</li>
                <li>playwright==1.48.0</li>
                <li>PyMuPDF==1.24.7</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-mono">logging_config.py</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-2">Centralized logging configuration</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>Console and file logging</li>
                <li>Log rotation support</li>
                <li>Structured log format</li>
                <li>Environment-based levels</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-mono">.env</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-2">Environment configuration</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>Google OAuth credentials</li>
                <li>Supabase connection</li>
                <li>API keys (Gemini, Maps)</li>
                <li>Webhook URLs</li>
                <li>Scheduling weights</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
