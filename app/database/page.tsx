"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { ChevronDown } from "lucide-react"

export default function Database() {
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({})

  const toggleTable = (table: string) => {
    setExpandedTables((prev) => ({
      ...prev,
      [table]: !prev[table],
    }))
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Database Schema</h1>
        <p className="text-xl text-muted-foreground">
          Complete Supabase PostgreSQL database structure with 28 tables (18 actively used)
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-200/20">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-600">28</div>
            <p className="text-sm text-muted-foreground">Total Tables</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-200/20">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">18</div>
            <p className="text-sm text-muted-foreground">Tables in Use</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-200/20">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-orange-600">10</div>
            <p className="text-sm text-muted-foreground">Unused Tables</p>
          </CardContent>
        </Card>
      </div>

      {/* Table 1: accounts */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleTable("accounts")}>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-500">Core</Badge>
              <CardTitle>accounts</CardTitle>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${expandedTables["accounts"] ? "rotate-180" : ""}`} />
          </div>
        </CardHeader>
        {expandedTables["accounts"] && (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Multi-tenant account configuration and settings</p>

            <div>
              <h4 className="font-semibold text-sm mb-3">Schema:</h4>
              <CodeBlock
                code={`CREATE TABLE public.accounts (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  industry text DEFAULT 'property_management'::text,
  timezone text NOT NULL DEFAULT 'Australia/Sydney'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT accounts_pkey PRIMARY KEY (id)
);`}
                language="sql"
                title="accounts table"
              />
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Columns:</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-semibold">Column</th>
                      <th className="text-left py-2 px-3 font-semibold">Type</th>
                      <th className="text-left py-2 px-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-2 py-1 rounded">id</code>
                      </td>
                      <td className="py-2 px-3">bigint</td>
                      <td className="py-2 px-3">Primary key (auto-increment)</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-2 py-1 rounded">name</code>
                      </td>
                      <td className="py-2 px-3">text</td>
                      <td className="py-2 px-3">Account name (required)</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-2 py-1 rounded">industry</code>
                      </td>
                      <td className="py-2 px-3">text</td>
                      <td className="py-2 px-3">Industry type (default: property_management)</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-2 py-1 rounded">timezone</code>
                      </td>
                      <td className="py-2 px-3">text</td>
                      <td className="py-2 px-3">Default timezone (Australia/Sydney)</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-2 py-1 rounded">created_at</code>
                      </td>
                      <td className="py-2 px-3">timestamp</td>
                      <td className="py-2 px-3">Creation timestamp</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-2 py-1 rounded">updated_at</code>
                      </td>
                      <td className="py-2 px-3">timestamp</td>
                      <td className="py-2 px-3">Last update timestamp</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Relationships:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • One-to-many with <code className="bg-muted px-2 py-1 rounded">account_tokens</code>
                </li>
                <li>
                  • One-to-many with <code className="bg-muted px-2 py-1 rounded">inspectors</code>
                </li>
                <li>
                  • One-to-many with <code className="bg-muted px-2 py-1 rounded">inspection_events</code>
                </li>
                <li>
                  • One-to-many with <code className="bg-muted px-2 py-1 rounded">emails</code>
                </li>
                <li>
                  • One-to-many with <code className="bg-muted px-2 py-1 rounded">property_managers</code>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Used In:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• All API routes - account-based filtering and RLS</li>
                <li>• testing_interface.py - account validation</li>
                <li>• inspection_scheduler.py - account context</li>
              </ul>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Table 2: account_tokens */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleTable("tokens")}>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500">Critical</Badge>
              <CardTitle>account_tokens</CardTitle>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${expandedTables["tokens"] ? "rotate-180" : ""}`} />
          </div>
        </CardHeader>
        {expandedTables["tokens"] && (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              OAuth tokens and integration credentials for Google APIs (Gmail, Calendar, Pub/Sub)
            </p>

            <div>
              <h4 className="font-semibold text-sm mb-3">Schema:</h4>
              <CodeBlock
                code={`CREATE TABLE public.account_tokens (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  integration_id bigint,
  account_id bigint,
  is_active boolean DEFAULT true,
  last_validated timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  integration_details jsonb,
  integration_for_id text,
  CONSTRAINT account_tokens_pkey PRIMARY KEY (id),
  CONSTRAINT account_tokens_integration_id_fkey FOREIGN KEY (integration_id) REFERENCES public.integrations(id),
  CONSTRAINT account_tokens_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.accounts(id)
);`}
                language="sql"
                title="account_tokens table"
              />
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">integration_details JSONB Structure:</h4>
              <CodeBlock
                code={`{
  "access_token": "ya29.a0...",
  "refresh_token": "1//0g...",
  "expiry": "2025-12-24T10:00:00Z",
  "scopes": ["https://www.googleapis.com/auth/gmail.modify", "https://www.googleapis.com/auth/calendar"],
  "provider_type": "email|calendar",
  "crm_name": "googleemail",
  "calendar_id": "primary",
  "timezone": "Australia/Perth",
  "event_duration": 120,
  "primary_email": "user@example.com",
  "gmail_watch": {
    "topic": "projects/.../topics/gmail-notifications",
    "history_id": "12345",
    "expiration": "1735027200000",
    "created_at": "2025-11-23T10:00:00Z"
  },
  "calendar_list_webhook": {
    "channel_id": "cal-list-1001-...",
    "resource_id": "...",
    "expiration": "1735027200000"
  },
  "event_watches": {
    "primary": {
      "channel_id": "events-1001-...",
      "resource_id": "...",
      "expiration": "1735027200000"
    }
  }
}`}
                language="json"
                title="integration_details structure"
              />
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Used In:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• app.py - OAuth flow and token management</li>
                <li>• watch_renewal.py - Webhook renewal</li>
                <li>• token_helpers.py - Token retrieval and refresh</li>
                <li>• webhooks/gmail.py - Gmail webhook handling</li>
                <li>• webhooks/registration.py - Webhook registration</li>
              </ul>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Table 3: inspectors */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleTable("inspectors")}>
            <div className="flex items-center gap-3">
              <Badge className="bg-purple-500">Important</Badge>
              <CardTitle>inspectors</CardTitle>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedTables["inspectors"] ? "rotate-180" : ""}`}
            />
          </div>
        </CardHeader>
        {expandedTables["inspectors"] && (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Inspector profiles, qualifications, availability, and scheduling parameters
            </p>

            <div>
              <h4 className="font-semibold text-sm mb-3">Key Columns:</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-semibold">Column</th>
                      <th className="text-left py-2 px-3 font-semibold">Type</th>
                      <th className="text-left py-2 px-3 font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground text-xs">
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-1 py-0.5 rounded">id</code>
                      </td>
                      <td className="py-2 px-3">UUID</td>
                      <td className="py-2 px-3">Primary key</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-1 py-0.5 rounded">account_id</code>
                      </td>
                      <td className="py-2 px-3">bigint FK</td>
                      <td className="py-2 px-3">Multi-tenant isolation</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-1 py-0.5 rounded">display_name</code>
                      </td>
                      <td className="py-2 px-3">text</td>
                      <td className="py-2 px-3">Inspector full name</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-1 py-0.5 rounded">email</code>
                      </td>
                      <td className="py-2 px-3">text</td>
                      <td className="py-2 px-3">Google account email (unique per account)</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-1 py-0.5 rounded">calendar_id</code>
                      </td>
                      <td className="py-2 px-3">text</td>
                      <td className="py-2 px-3">Google Calendar ID for availability queries</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-1 py-0.5 rounded">zip_codes</code>
                      </td>
                      <td className="py-2 px-3">text[]</td>
                      <td className="py-2 px-3">Service postcodes (geographic filter)</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-1 py-0.5 rounded">list_of_expertise</code>
                      </td>
                      <td className="py-2 px-3">text[]</td>
                      <td className="py-2 px-3">Certifications (PCR, Final, Routine, etc.)</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-1 py-0.5 rounded">property_types</code>
                      </td>
                      <td className="py-2 px-3">text[]</td>
                      <td className="py-2 px-3">Qualified property types (Residential, Commercial)</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-1 py-0.5 rounded">capacity</code>
                      </td>
                      <td className="py-2 px-3">numeric</td>
                      <td className="py-2 px-3">Current workload (0-100%)</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-1 py-0.5 rounded">radius_miles</code>
                      </td>
                      <td className="py-2 px-3">integer</td>
                      <td className="py-2 px-3">Travel radius from base location</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <code className="bg-muted px-1 py-0.5 rounded">is_active</code>
                      </td>
                      <td className="py-2 px-3">boolean</td>
                      <td className="py-2 px-3">Active/inactive status</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Used In Scheduling:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • <strong>Qualification filtering:</strong> list_of_expertise, property_types must match request
                </li>
                <li>
                  • <strong>Geographic scoring (40%):</strong> zip_codes, radius_miles, inspector_zipcode
                </li>
                <li>
                  • <strong>Workload scoring (35%):</strong> capacity field
                </li>
                <li>
                  • <strong>Availability checking:</strong> calendar_id for real-time busy blocks
                </li>
              </ul>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Table 4: inspection_events */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleTable("events")}>
            <div className="flex items-center gap-3">
              <Badge className="bg-red-500">Central</Badge>
              <CardTitle>inspection_events</CardTitle>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${expandedTables["events"] ? "rotate-180" : ""}`} />
          </div>
        </CardHeader>
        {expandedTables["events"] && (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Canonical source of truth for inspection bookings linking emails, scheduler, and Google Calendar
            </p>

            <div>
              <h4 className="font-semibold text-sm mb-2">Key Columns:</h4>
              <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">id</code> – Primary key
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">account_id</code> – Tenant isolation
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">inspector_id</code> – FK to assigned inspector
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">inspection_type</code> – PCR, Final, Routine, External
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">property_type</code> – Residential, Commercial,
                  Industrial
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">inspection_location</code> – Postcode/address for
                  proximity
                </li>
                <li>
                  •{" "}
                  <code className="bg-muted px-2 py-1 rounded">service_date, service_time_start, service_time_end</code>{" "}
                  – Scheduling window
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">status</code> – scheduled, confirmed, completed,
                  cancelled, etc.
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">google_event_id</code> – Link to Google Calendar event
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">email_thread_id, email_message_id</code> – Link back to
                  Gmail
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">request_uid</code> – De-duplication key
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Status Workflow:</h4>
              <CodeBlock
                code={`scheduled → confirmed → completed
        ↓
   external_cancelation_request → cancelled
        ↓
   external_update_request → rescheduled`}
                language="text"
                title="Status transitions"
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Table 5: emails */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleTable("emails")}>
            <div className="flex items-center gap-3">
              <Badge className="bg-orange-500">Important</Badge>
              <CardTitle>emails</CardTitle>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${expandedTables["emails"] ? "rotate-180" : ""}`} />
          </div>
        </CardHeader>
        {expandedTables["emails"] && (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Persisted Gmail messages for downstream AI processing and audit trail
            </p>

            <div>
              <h4 className="font-semibold text-sm mb-2">Key Columns:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">id</code> – Primary key (bigint)
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">account_id</code> – Tenant isolation
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">gmail_message_id</code> – Gmail message ID
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">thread_id</code> – Gmail thread ID
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">subject, sender, recipient</code> – Email metadata
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">body</code> – Email content (text)
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">category</code> – AI classification (BOOKING_REQUEST,
                  CANCELLATION, UPDATE, INFO_REQUEST)
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">received_at</code> – Timestamp
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">raw_response</code> – Full Gmail API response (jsonb)
                </li>
              </ul>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Table 6: email_responses */}
      <Card className="border-l-4 border-l-cyan-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleTable("responses")}>
            <div className="flex items-center gap-3">
              <Badge className="bg-cyan-500">Secondary</Badge>
              <CardTitle>email_responses</CardTitle>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedTables["responses"] ? "rotate-180" : ""}`}
            />
          </div>
        </CardHeader>
        {expandedTables["responses"] && (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Stores AI-generated drafts and human responses linked to emails
            </p>

            <div>
              <h4 className="font-semibold text-sm mb-2">Key Columns:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">id</code> – Primary key
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">email_id</code> – FK to emails
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">responder_type</code> – 'ai' or 'human'
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">response_body</code> – Reply text
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">response_type</code> – draft, sent, info_request,
                  user_response
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">raw_response</code> – Full API response (jsonb)
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Update Strategy:</h4>
              <p className="text-sm text-muted-foreground">
                One AI draft per email (upsert pattern) to avoid duplicates
              </p>
            </div>
          </CardContent>
        )}
      </Card>



      {/* Table: inspector_buffer_availability */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleTable("buffer")}>
            <div className="flex items-center gap-3">
              <Badge className="bg-yellow-500">New</Badge>
              <CardTitle>inspector_buffer_availability</CardTitle>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedTables["buffer"] ? "rotate-180" : ""}`}
            />
          </div>
        </CardHeader>
        {expandedTables["buffer"] && (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Stores inspector buffer zones (time blocks where inspections cannot be scheduled)
            </p>

            <div>
              <h4 className="font-semibold text-sm mb-3">Schema:</h4>
              <CodeBlock
                code={`CREATE TABLE public.inspector_buffer_availability (
    id BIGSERIAL PRIMARY KEY,
    inspector_id UUID NOT NULL REFERENCES inspectors(id) ON DELETE CASCADE,
    account_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_all_day BOOLEAN NOT NULL DEFAULT FALSE,
    time_start TIME NULL,
    time_end TIME NULL,
    note TEXT NULL,
    source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('manual', 'system', 'google_sync')),
    raw_payload JSONB NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`}
                language="sql"
                title="inspector_buffer_availability"
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Table: inspector_availability */}
      <Card className="border-l-4 border-l-teal-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleTable("availability")}>
            <div className="flex items-center gap-3">
              <Badge className="bg-teal-500">New</Badge>
              <CardTitle>inspector_availability</CardTitle>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedTables["availability"] ? "rotate-180" : ""}`}
            />
          </div>
        </CardHeader>
        {expandedTables["availability"] && (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Defines working hours, sessions, and recurrence rules for inspector availability
            </p>

            <div>
              <h4 className="font-semibold text-sm mb-3">Schema:</h4>
              <CodeBlock
                code={`CREATE TABLE public.inspector_availability (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    inspector_id UUID NOT NULL REFERENCES inspectors(id) ON DELETE CASCADE,
    account_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_all_day BOOLEAN NOT NULL DEFAULT FALSE,
    session TEXT NOT NULL DEFAULT 'full_day' CHECK (session IN ('morning', 'afternoon', 'evening', 'full_day')),
    availability_percent INT NOT NULL CHECK (availability_percent IN (0, 33, 66, 100)),
    time_start TIME NULL,
    time_end TIME NULL,
    note TEXT NULL,
    is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
    recurrence_rule_id UUID NULL REFERENCES recurrence_rules(id),
    calendar_raw_response JSONB NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);`}
                language="sql"
                title="inspector_availability"
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Table: recurrence_rules */}
      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleTable("recurrence")}>
            <div className="flex items-center gap-3">
              <Badge className="bg-indigo-500">New</Badge>
              <CardTitle>recurrence_rules</CardTitle>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedTables["recurrence"] ? "rotate-180" : ""}`}
            />
          </div>
        </CardHeader>
        {expandedTables["recurrence"] && (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Shared recurrence patterns for availability and leaves (RFC 5545 style)
            </p>

            <div>
              <h4 className="font-semibold text-sm mb-3">Schema:</h4>
              <CodeBlock
                code={`CREATE TABLE public.recurrence_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    freq TEXT NOT NULL CHECK (freq IN ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY')),
    interval INT NOT NULL DEFAULT 1,
    bymonth INT[],
    bymonthday INT[],
    byweekday INT[],
    until DATE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);`}
                language="sql"
                title="recurrence_rules"
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Table 7: property_managers */}
      <Card className="border-l-4 border-l-pink-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleTable("pm")}>
            <div className="flex items-center gap-3">
              <Badge className="bg-pink-500">Optional</Badge>
              <CardTitle>property_managers</CardTitle>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${expandedTables["pm"] ? "rotate-180" : ""}`} />
          </div>
        </CardHeader>
        {expandedTables["pm"] && (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Directory of property managers for preference matching and inspector assignment boost
            </p>

            <div>
              <h4 className="font-semibold text-sm mb-2">Key Columns:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">id</code> – Primary key
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">account_id</code> – Tenant isolation
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">email</code> – Property manager email
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">company_name</code> – Company/agency name
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">working_hours</code> – JSONB:{" "}
                  {"{monday: ['08:00', '17:00']}"}
                </li>
                <li>
                  • <code className="bg-muted px-2 py-1 rounded">is_active</code> – Active/inactive status
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Relationship to Scheduling:</h4>
              <p className="text-sm text-muted-foreground">
                Via <code className="bg-muted px-2 py-1 rounded">inspector_property_manager_preferences</code> table,
                property managers can flag preferred inspectors for scheduling priority (+20 bonus points)
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Key Relationships */}
      <Card className="bg-gradient-to-br from-indigo-500/5 to-transparent border-indigo-200/20">
        <CardHeader>
          <CardTitle>Key Relationships & Data Flow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeBlock
            code={`accounts (1) ──→ (many) account_tokens
     ├──→ (many) inspectors
     ├──→ (many) inspection_events
     ├──→ (many) emails
     └──→ (many) property_managers

emails (1) ──→ (1) email_responses
          └──→ (many) inspection_events (linkage via thread_id)

inspectors (1) ──→ (many) inspection_events

inspection_events ──→ booking_history (audit trail for changes)

property_managers ──many-to-many──→ inspectors
                 (via inspector_property_manager_preferences)`}
            language="text"
            title="Entity relationships"
          />

          <div>
            <h4 className="font-semibold text-sm mb-2">Row Level Security (RLS):</h4>
            <p className="text-sm text-muted-foreground">
              All tables enforce RLS policies to ensure account_id isolation. Users can only see data for their account.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Unused Tables */}
      <Card className="border-l-4 border-l-gray-400">
        <CardHeader>
          <CardTitle>Unused Tables (Not Referenced in Code)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <p>The following tables exist in the schema but are not currently used:</p>
            <ul className="ml-4 space-y-1">
              <li>• account_configurations</li>
              <li>• account_contacts</li>
              <li>• conversations</li>
              <li>• email_response_feedback</li>
              <li>• google_integration_scopes</li>
              <li>• inspector_leaves</li>
              <li>• integrations (only referenced as FK)</li>
              <li>• response_history</li>
              <li>• bookings (legacy - replaced by inspection_events + Google Calendar)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div >
  )
}
