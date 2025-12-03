"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { ChevronDown } from "lucide-react"

export default function APIReference() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <h1 className="text-4xl font-bold tracking-tight mb-3">API Reference</h1>
        <p className="text-xl text-muted-foreground">Complete endpoint documentation for PCR Email AI Agent</p>
      </div>

      {/* Authentication Section */}
      <Card className="bg-gradient-to-br from-blue-500/5 via-transparent to-transparent border-blue-200/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            All protected API endpoints require an X-API-Key header. Include this header in all requests:
          </p>
          <CodeBlock
            code='curl -H "X-API-Key: YOUR_API_KEY" http://localhost:5000/api/endpoint'
            language="bash"
            title="Authentication Header"
          />
          <div className="bg-blue-500/10 border border-blue-200/20 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Note:</strong> Some endpoints (root routes, OAuth flow) don't require API key. Check individual
              endpoint documentation.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Root App Routes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("root")}>
          <h2 className="text-2xl font-bold">Root App Routes (app.py)</h2>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections["root"] ? "rotate-180" : ""}`} />
        </div>

        {expandedSections["root"] && (
          <div className="space-y-4">
            {/* Root endpoint */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>GET</Badge>
                  <code className="text-sm font-mono">/</code>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Serve index.html</p>
              </CardContent>
            </Card>

            {/* Google connectivity test */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>GET</Badge>
                  <code className="text-sm font-mono">/test/google-connectivity</code>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Verify Google API connectivity and token status</p>
                <CodeBlock code="curl http://localhost:5000/test/google-connectivity" language="bash" />
              </CardContent>
            </Card>

            {/* OAuth authentication */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>GET</Badge>
                  <code className="text-sm font-mono">/authenticate/&lt;account_id&gt;</code>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Start Google OAuth with scoped permissions</p>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Parameters:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>
                      • <code className="bg-muted px-2 py-1 rounded">account_id</code> (path, int) - Account ID
                    </li>
                  </ul>
                </div>
                <CodeBlock code="curl -L http://localhost:5000/authenticate/1001" language="bash" />
              </CardContent>
            </Card>

            {/* Check token endpoint */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>GET</Badge>
                  <code className="text-sm font-mono">/check_token/&lt;account_id&gt;</code>
                  <Badge variant="outline">Requires API Key</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Check token status and expiration</p>
                <CodeBlock
                  code={`curl -H "X-API-Key: $API_KEY" \\
  "http://localhost:5000/check_token/1001?integration_id=1"`}
                  language="bash"
                />
              </CardContent>
            </Card>

            {/* OAuth callback */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>GET</Badge>
                  <code className="text-sm font-mono">/oauth2callback</code>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  OAuth callback - exchanges authorization code for tokens
                </p>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Query Parameters:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>
                      • <code className="bg-muted px-2 py-1 rounded">code</code> - Authorization code from Google
                    </li>
                    <li>
                      • <code className="bg-muted px-2 py-1 rounded">state</code> - State parameter
                      (account_id:provider_type)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Sync calendars */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>POST</Badge>
                  <code className="text-sm font-mono">/sync_calendars/account/&lt;account_id&gt;</code>
                  <Badge variant="outline">Requires API Key</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Sync Google Calendars to database (updates inspectors table)
                </p>
                <CodeBlock
                  code={`curl -X POST -H "X-API-Key: $API_KEY" \\
  http://localhost:5000/sync_calendars/account/1001`}
                  language="bash"
                />
              </CardContent>
            </Card>

            {/* Setup webhooks */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>POST</Badge>
                  <code className="text-sm font-mono">/register_webhooks/account/&lt;account_id&gt;</code>
                  <Badge variant="outline">Requires API Key</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Register all webhooks for Gmail and Calendar events</p>
              </CardContent>
            </Card>
          </div>
        )}
      </section>

      {/* Email API */}
      <section className="space-y-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("email")}>
          <h2 className="text-2xl font-bold">Email API (/api/email)</h2>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections["email"] ? "rotate-180" : ""}`} />
        </div>

        {expandedSections["email"] && (
          <div className="space-y-4">
            {/* Get emails */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>GET</Badge>
                  <code className="text-sm font-mono">/api/email/get-emails/account/&lt;account_id&gt;</code>
                  <Badge variant="outline">Requires API Key</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Fetch emails for an account with optional filtering</p>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Query Parameters:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>
                      • <code className="bg-muted px-2 py-1 rounded">q</code> - Gmail search query (default: "in:inbox")
                    </li>
                    <li>
                      • <code className="bg-muted px-2 py-1 rounded">page_size</code> - Results per page (1-100,
                      default: 25)
                    </li>
                    <li>
                      • <code className="bg-muted px-2 py-1 rounded">include_thread</code> - Expand full thread
                      (1/true/yes)
                    </li>
                    <li>
                      • <code className="bg-muted px-2 py-1 rounded">include_html</code> - Include HTML body
                    </li>
                    <li>
                      • <code className="bg-muted px-2 py-1 rounded">include_attachments</code> - Include attachment
                      metadata
                    </li>
                  </ul>
                </div>
                <CodeBlock
                  code={`curl -H "X-API-Key: $API_KEY" \\
  "http://localhost:5000/api/email/get-emails/account/1001?q=in:inbox&include_thread=1"`}
                  language="bash"
                />
              </CardContent>
            </Card>

            {/* Send reply */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>POST</Badge>
                  <code className="text-sm font-mono">/api/email/send-reply</code>
                  <Badge variant="outline">Requires API Key</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Send reply to email thread</p>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Request Body:</h4>
                </div>
                <CodeBlock
                  code={`{
  "account_id": 1001,
  "thread_id": "19a595a7312ed641",
  "body": "Your reply message",
  "content_type": "markdown"
}`}
                  language="json"
                />
              </CardContent>
            </Card>

            {/* Get message */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>GET</Badge>
                  <code className="text-sm font-mono">/api/email/message/&lt;account_id&gt;/&lt;message_id&gt;</code>
                  <Badge variant="outline">Requires API Key</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Retrieve specific email message details</p>
              </CardContent>
            </Card>

            {/* Get thread */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>GET</Badge>
                  <code className="text-sm font-mono">
                    /api/email/get-thread/account/&lt;account_id&gt;/&lt;thread_id&gt;
                  </code>
                  <Badge variant="outline">Requires API Key</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Retrieve full email thread with all messages</p>
              </CardContent>
            </Card>
          </div>
        )}
      </section>

      {/* Email Agent API */}
      <section className="space-y-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("agent")}>
          <h2 className="text-2xl font-bold">Email Agent API (/api/email-agent)</h2>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections["agent"] ? "rotate-180" : ""}`} />
        </div>

        {expandedSections["agent"] && (
          <div className="space-y-4">
            {/* Draft reply */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>POST</Badge>
                  <code className="text-sm font-mono">/api/email-agent/draft-reply</code>
                  <Badge variant="outline">Requires API Key</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Generate AI draft reply without sending</p>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Request Body:</h4>
                </div>
                <CodeBlock
                  code={`{
  "account_id": 1001,
  "thread_id": "19a595a7312ed641",
  "message_id": "...",
  "dry_run": true
}`}
                  language="json"
                />
                <div>
                  <h4 className="font-semibold text-sm mb-2">Response:</h4>
                </div>
                <CodeBlock
                  code={`{
  "status": "success",
  "intent": "BOOKING_REQUEST",
  "reply_text": "Generated response...",
  "extracted_data": {
    "requests": [{
      "address": "46 Hinckley Parkway",
      "inspection_type": "PCR",
      "preferred_dates": ["2025-12-24"]
    }]
  },
  "scheduling_results": [...]
}`}
                  language="json"
                />
              </CardContent>
            </Card>
          </div>
        )}
      </section>

      {/* Scheduler API */}
      <section className="space-y-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("scheduler")}>
          <h2 className="text-2xl font-bold">Scheduler API (/api/scheduler)</h2>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedSections["scheduler"] ? "rotate-180" : ""}`}
          />
        </div>

        {expandedSections["scheduler"] && (
          <div className="space-y-4">
            {/* Schedule endpoint */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>POST</Badge>
                  <code className="text-sm font-mono">/api/scheduler/schedule</code>
                  <Badge variant="outline">Requires API Key</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Schedule inspection with intelligent inspector matching</p>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Request Body:</h4>
                </div>
                <CodeBlock
                  code={`{
  "account_id": 1001,
  "inspection_location": "6010",
  "date": "2025-12-24T10:00:00+08:00",
  "time_window": ["09:00", "17:00"],
  "type_of_inspection": "PCR",
  "property_type": "Residential",
  "property_manager_flag": "Ross Realty",
  "duration_hours": 2.0,
  "bedrooms": 3,
  "bathrooms": 2,
  "event_location": "46 Hinckley Parkway",
  "request_uid": "req_abc123"
}`}
                  language="json"
                />
                <div>
                  <h4 className="font-semibold text-sm mb-2">Response:</h4>
                </div>
                <CodeBlock
                  code={`{
  "status": "scheduled",
  "inspector": {
    "id": 5,
    "name": "John Smith",
    "email": "john@prplus.com.au"
  },
  "calendar_event": {
    "id": "...",
    "link": "https://calendar.google.com/...",
    "start": "2025-12-24T10:00:00+08:00",
    "end": "2025-12-24T12:00:00+08:00"
  },
  "scoring_details": {
    "geographic_score": 95.0,
    "workload_score": 80.0
  }
}`}
                  language="json"
                />
              </CardContent>
            </Card>

            {/* Emergency reschedule */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>POST</Badge>
                  <code className="text-sm font-mono">/api/scheduler/emergency-reschedule</code>
                  <Badge variant="outline">Requires API Key</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Reschedule inspection in case of cancellation/conflict</p>
              </CardContent>
            </Card>
          </div>
        )}
      </section>

      {/* Database API */}
      <section className="space-y-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("db")}>
          <h2 className="text-2xl font-bold">Database API (/api/db)</h2>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections["db"] ? "rotate-180" : ""}`} />
        </div>

        {expandedSections["db"] && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Generic database CRUD operations on any table</p>

            {["GET|POST", "POST", "PUT|PATCH", "DELETE"].map((method, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge>{method.split("|")[0]}</Badge>
                    <code className="text-sm font-mono">
                      {["/api/db/query", "/api/db/insert", "/api/db/update", "/api/db/delete"][idx]}/&lt;table_name&gt;
                    </code>
                    <Badge variant="outline">Requires API Key</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Webhooks */}
      <section className="space-y-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("webhooks")}>
          <h2 className="text-2xl font-bold">Webhook Endpoints</h2>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections["webhooks"] ? "rotate-180" : ""}`} />
        </div>

        {expandedSections["webhooks"] && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>POST</Badge>
                  <code className="text-sm font-mono">/webhook/google/gmail</code>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Gmail push notification handler (Pub/Sub)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge>POST</Badge>
                  <code className="text-sm font-mono">/webhook/google/calendar/events</code>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Calendar events webhook for real-time updates</p>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </div>
  )
}
