import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Architecture() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <h1 className="text-4xl font-bold tracking-tight mb-3">System Architecture</h1>
        <p className="text-xl text-muted-foreground">High-level design and data flow</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>High-Level Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-6 rounded-lg overflow-x-auto text-xs leading-relaxed">
{`┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SYSTEMS                            │
├─────────────────────────────────────────────────────────────────┤
│  Gmail API  │ Google Calendar │ Google Pub/Sub │ TAPI           │
│  Gemini AI  │ Google Maps API │ PropertyTree   │ Slack          │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                 FLASK APPLICATION (app.py)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   BLUEPRINTS LAYER                        │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  • email_agent_bp    - AI email processing               │  │
│  │  • email_bp          - Gmail operations                  │  │
│  │  • calendar_search_bp - Calendar search                  │  │
│  │  • database_bp       - Database operations               │  │
│  │  • watch_renewal_bp  - Webhook management                │  │
│  │  • inspector_bp      - Inspector optimization            │  │
│  │  • scheduler_bp      - Inspection scheduling             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   SERVICES LAYER                          │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  • inspection_scheduler    - Core scheduling logic       │  │
│  │  • email_reply_service     - Email composition           │  │
│  │  • calendar_search_service - Calendar queries            │  │
│  │  • attachment_processor    - File extraction             │  │
│  │  • link_extractor          - URL classification          │  │
│  │  • content_extractor       - Web scraping                │  │
│  │  • bedroom_lookup          - Property enrichment         │  │
│  │  • booking_policy          - Business rules              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    WEBHOOKS LAYER                         │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  • gmail                   - Gmail push notifications    │  │
│  │  • calendar_events         - Calendar event changes      │  │
│  │  • calendar_list           - Calendar list changes       │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬───────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SUPABASE (PostgreSQL)                          │
├─────────────────────────────────────────────────────────────────┤
│  • account_tokens          - OAuth credentials                  │
│  • inspectors              - Inspector profiles                 │
│  • inspection_events       - Scheduled inspections              │
│  • booking_history         - Audit trail                        │
│  • emails                  - Email records                      │
│  • email_responses         - Generated responses                │
│  • property_managers       - Agency preferences                 │
└─────────────────────────────────────────────────────────────────┘`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Processing Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-6 rounded-lg overflow-x-auto text-xs leading-relaxed">
{`1. Email arrives → Gmail
         ↓
2. Gmail Push Notification → Google Pub/Sub
         ↓
3. Pub/Sub POST → /webhook (Flask endpoint)
         ↓
4. Fetch email via Gmail API
   - Get thread messages
   - Download attachments
   - Extract HTML/text
         ↓
5. Process Attachments (if any)
   - PDF → Images → OCR (Gemini Vision)
   - Word → Image → OCR
   - Excel/CSV → Parse or OCR
   - Images → OCR
         ↓
6. Extract Links
   - TAPI links → Scrape property data
   - PropertyTree → Extract details
   - Document links → Download & process
         ↓
7. AI Intent Classification (Gemini)
   - Booking request
   - Rescheduling
   - Cancellation
   - Update details
   - Customer service
         ↓
8. Extract Booking Details (Gemini)
   - Property address
   - Bedrooms/bathrooms
   - Inspection type
   - Preferred dates
   - Special instructions
         ↓
9. Enrich Data
   - Google Maps API → Full address
   - Gemini → Bedroom count (if missing)
   - Timezone detection
   - Postcode extraction
         ↓
10. Business Logic
    ├─ Booking → Schedule inspection
    ├─ Rescheduling → Update calendar
    ├─ Cancellation → Cancel event
    └─ Inquiry → Generate response
         ↓
11. Generate AI Response (Gemini)
    - Context-aware reply
    - Markdown formatting
    - Include booking details
         ↓
12. Store in Database
    - emails table
    - email_responses table
    - inspection_events table
    - booking_history table
         ↓
13. Send Response (Optional)
    - Gmail API send
    - Mark as read
    - Add label
    - TAPI response (if applicable)`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3">Backend Framework</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Flask 3.0.0 - Python web framework</li>
                <li>• Python 3.12 - Programming language</li>
                <li>• Gunicorn 21.2.0 - WSGI HTTP server</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Database</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Supabase - PostgreSQL database</li>
                <li>• supabase-py 2.0.2 - Python client</li>
                <li>• Row-Level Security (RLS) enabled</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Google APIs</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Gmail API - Email operations</li>
                <li>• Google Calendar API - Calendar management</li>
                <li>• Google Pub/Sub - Push notifications</li>
                <li>• Google Maps API - Address enrichment</li>
                <li>• Google Gemini AI - Text & vision AI</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Document Processing</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• PyMuPDF 1.24.7 - PDF extraction</li>
                <li>• python-docx 1.1.0 - Word processing</li>
                <li>• pandas 2.2.1 - Excel/CSV parsing</li>
                <li>• Pillow 10.3.0 - Image processing</li>
                <li>• Playwright 1.48.0 - Web scraping</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-6 rounded-lg overflow-x-auto text-xs leading-relaxed">
{`pcr-email-ai-agent/
│
├── app.py                          # Main Flask application
├── requirements.txt                # Python dependencies
├── .env                            # Environment variables
├── logging_config.py               # Centralized logging
├── tapi_scraper.py                 # TAPI platform scraper
│
├── blueprints/                     # Flask blueprints
│   ├── email_agent.py              # AI email processing (5265 lines)
│   ├── email.py                    # Gmail operations
│   ├── calendar_search.py          # Calendar search
│   ├── database.py                 # Database CRUD
│   └── watch_renewal.py            # Webhook management
│
├── services/                       # Business logic layer
│   ├── inspection_scheduler.py     # Core scheduling (4826 lines)
│   ├── email_reply_service.py      # Email composition
│   ├── attachment_processor.py     # File extraction
│   ├── link_extractor.py           # URL classification
│   ├── content_extractor.py        # Web scraping
│   └── bedroom_lookup.py           # Property enrichment
│
├── utils/                          # Utility functions
│   ├── auth.py                     # API key authentication
│   ├── calendar_service.py         # Calendar helpers
│   ├── availability_helpers.py     # Availability checking
│   └── token_helpers.py            # OAuth token management
│
├── webhooks/                       # Webhook handlers
│   ├── gmail.py                    # Gmail notifications
│   ├── calendar_events.py          # Calendar webhooks
│   └── registration.py             # Webhook setup
│
├── prompts/                        # AI prompts
│   ├── BOOKING_EXTRACT_SINGLE.md   # Single booking extraction
│   ├── INTENT_CLASSIFIER_OPTI.md   # Intent classification
│   └── REPLY_HTML_SINGLE.md        # Response generation
│
└── database/                       # Database scripts
    ├── functions/                  # PostgreSQL functions
    ├── triggers/                   # Database triggers
    └── migrations/                 # Schema migrations`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
