# PCR Email AI Agent - Project Documentation

## 1. High-Level Overview

**Project Name:** PCR Email AI Agent (Property Reports Plus)
**Purpose:** An intelligent automation system designed to streamline property inspection bookings. It monitors Gmail for requests, extracts data using AI and OCR, and automatically schedules inspections using a sophisticated algorithm that balances geography, workload, and qualifications.

**Core Capabilities:**
- **Automated Monitoring:** Watches Gmail for booking requests in real-time via Pub/Sub.
- **Intelligent Extraction:** Uses Gemini AI to extract inspection details from emails, PDFs, Word docs, Excel files, and external links (TAPI, PropertyTree).
- **Smart Scheduling:** Matches inspections to the best available inspector using an 11-step weighted algorithm (Geography 40%, Workload 35%, Locality 25%).
- **Calendar Integration:** Automatically creates Google Calendar events and manages invites.
- **AI Communication:** Generates and sends context-aware email responses back to property managers.
- **Database Tracking:** Records all events, emails, and inspector metrics in a Supabase (PostgreSQL) database.

---

## 2. System Architecture

The system follows a microservices-like architecture within a monolithic Flask application, integrating heavily with Google Cloud Platform and Supabase.

\`\`\`mermaid
graph TD
    User[Property Manager] -->|Email| Gmail[Gmail API]
    Gmail -->|Push Notification| PubSub[Google Pub/Sub]
    PubSub -->|Webhook| Flask[Flask App]
    
    subgraph "Core Application"
        Flask -->|Extract| EmailAgent[Email Agent (AI)]
        EmailAgent -->|Process| Attachments[Attachment Processor]
        EmailAgent -->|Scrape| Scraper[TAPI/Web Scraper]
        EmailAgent -->|Classify| Intent[Intent Classifier (Gemini)]
        
        Intent -->|Schedule| Scheduler[Inspection Scheduler]
        Scheduler -->|Query| DB[(Supabase DB)]
        Scheduler -->|Check| CalendarAPI[Google Calendar API]
        
        Scheduler -->|Result| Response[Response Generator]
    end
    
    Response -->|Draft/Send| Gmail
    Scheduler -->|Create Event| CalendarAPI
\`\`\`

**Tech Stack:**
- **Backend:** Python 3.12, Flask 3.0
- **Database:** Supabase (PostgreSQL)
- **AI:** Google Gemini Pro & Flash (Generative AI)
- **Integrations:** Gmail API, Google Calendar API, Google Maps API, Google Pub/Sub
- **Tools:** Playwright (Scraping), PyMuPDF (PDFs), Pandas (Data)

---

## 3. Data Flow Diagrams

### 3.1 Email Processing Flow
1. **Ingestion:** Email arrives -> Google Pub/Sub triggers Webhook -> App fetches full thread.
2. **Extraction:** 
   - Body text & HTML parsing.
   - Attachments (PDF/Doc/XLS) -> OCR/Text Extraction.
   - Links (TAPI) -> Playwright Scraper.
3. **Analysis:** Gemini AI analyzes all text to determine:
   - **Intent:** (Booking, Cancellation, Update, General Inquiry)
   - **Entities:** (Address, Date, Inspection Type, Property Details)
4. **Action:** Based on intent, routes to Scheduler or Database.
5. **Response:** Generates AI draft -> Sends email -> Updates Database.

### 3.2 Scheduling Flow
1. **Input:** Inspection Request (Type, Date, Location).
2. **Filtering:** Filter inspectors by Certification & Active Status.
3. **Availability:** Remove inspectors with calendar conflicts.
4. **Scoring:** Calculate scores (0-100) for:
   - Distance (Travel time)
   - Workload (Daily capacity)
   - Locality (Same-day jobs in area)
5. **Selection:** Pick highest scorer -> Create Calendar Event -> Notify.

---

## 4. File-by-File Explanations

### Core
- **`app.py`**: Main entry point. Initializes Flask, registers blueprints, handles OAuth callbacks, and sets up global logging.
- **`requirements.txt`**: Lists dependencies like `flask`, `google-generativeai`, `supabase`, `playwright`.
- **`logging_config.py`**: Centralized logging setup with rotation and formatting.

### Blueprints (Route Handlers)
- **`blueprints/email_agent.py`**: The "brain" of the email processing. Handles the AI loop for understanding emails and triggering actions.
- **`blueprints/calendar_search.py`**: Endpoints to search Google Calendar for conflicts or existing bookings.
- **`blueprints/database.py`**: Generic CRUD endpoints for Supabase tables with advanced filtering support.
- **`blueprints/email.py`**: Wrappers for Gmail API (get messages, send replies, manage labels).
- **`blueprints/watch_renewal.py`**: Manages the lifecycle of Google Push Notifications (renewing expiring watches).

### Services (Business Logic)
- **`services/inspection_scheduler.py`**: Contains the `InspectionScheduler` class and the 11-step scheduling algorithm.
- **`services/email_reply_service.py`**: Handles constructing email replies, converting Markdown to HTML, and managing thread labels.
- **`services/attachment_processor.py`**: Handles downloading and extracting text from email attachments (PDF, Word, Images via OCR).
- **`services/content_extractor.py`**: Generic web scraper and file downloader.
- **`services/tapi_scraper.py`**: Specialized Playwright scraper for TAPI property links.
- **`services/link_extractor.py`**: Finds and classifies URLs in emails.

---

## 5. Function-Level Documentation

### Key Functions in `services/inspection_scheduler.py`
- `schedule_inspection(request)`: Orchestrator function.
- `_evaluate_geographic_proximity(inspectors, location)`: Calculates distance scores using lat/long.
- `_assess_workload_balance(...)`: Calculates utilization scores based on existing bookings.
- `_compute_same_day_locality_factor(...)`: Bonus points for clustering jobs in the same zip code.
- `_find_optimal_time_slot(inspector, request)`: Finds 30-min slots within working hours (9-5) avoiding conflicts.

### Key Functions in `blueprints/email_agent.py`
- `_extract_day_clues_from_text(text)`: AI helper to parse "next Tuesday" or "tomorrow".
- `_finalize_response_with_tapi()`: Special logic to handle TAPI-specific workflows.
- `_decode_gmail_payload_text(payload)`: Robust parser for Gmail's nested MIME structure.

---

## 6. Database Schema (Supabase)

### Core Tables
| Table Name | Description | Key Columns |
| :--- | :--- | :--- |
| **`accounts`** | Tenant/Organization details | `id`, `name`, `timezone` |
| **`inspectors`** | Inspector profiles & rules | `id`, `account_id`, `home_zip_code`, `certified_inspection_types`, `daily_capacity_hours` |
| **`inspection_events`** | Scheduled bookings | `id`, `inspector_id`, `service_date`, `status`, `google_event_id` |
| **`emails`** | Log of processed emails | `id`, `thread_id`, `message_id`, `intent`, `received_at` |
| **`account_tokens`** | OAuth credentials | `account_id`, `access_token`, `refresh_token`, `integration_details` (JSON) |
| **`property_managers`** | Agency preferences | `id`, `email_domain`, `preferred_inspector_ids` |

---

## 7. API Endpoints

### Scheduling
- `POST /api/scheduler/schedule`: Triggers the scheduling algorithm.

### Email Operations
- `POST /api/email-agent/process-and-reply`: Full AI loop (Process -> Schedule -> Reply).
- `POST /api/email-agent/draft-reply`: Generates a draft without sending.
- `GET /api/email/get-emails/account/<id>`: Fetches recent emails.

### Webhooks
- `POST /webhook`: Entry point for Gmail Pub/Sub notifications.
- `POST /webhook/google/calendar/events`: Entry point for Calendar changes.

### Administration
- `GET /check_token/<account_id>`: Verifies OAuth status.
- `GET /api/watches/renew`: Force renewal of push notification watches.

---

## 8. Scheduling Algorithm Breakdown

The system uses a weighted scoring model (Total 100 pts) + Bonus:

1. **Hard Filters:** 
   - Must be active.
   - Must be certified for Inspection Type (PCR, Routine, etc.).
   - Must be certified for Property Type (Residential, Commercial).
   - Must be available (no calendar conflicts).

2. **Weighted Scoring:**
   - **Geographic (40%)**: Distance from home base or previous job. Closer = Higher score.
   - **Workload (35%)**: Current hours scheduled / Daily capacity. Less busy = Higher score.
   - **Locality (25%)**: Are they already in this suburb today? Yes = Higher score.

3. **Bonuses:**
   - **Preference (+20%)**: Is this inspector preferred by the specific Property Manager?

4. **Time Slotting:**
   - Starts search at preferred time or 9 AM.
   - Standard Hours: 9 AM - 5 PM.
   - Priority Hours (Emergency): 8 AM - 6 PM.

---

## 9. Gmail + Calendar + Pub/Sub Flow

1. **Setup:**
   - `app.py` registers a "watch" on the Gmail inbox using the Gmail API `users.watch` method.
   - Specifies a Pub/Sub topic: `projects/{id}/topics/gmail-notifications`.
2. **Trigger:**
   - New email arrives.
   - Google pushes message to Pub/Sub.
   - Pub/Sub pushes POST request to `https://{domain}/webhook`.
3. **Processing:**
   - Webhook extracts `historyId`.
   - App calls `users.history.list` to find exactly what changed (new message).
   - App fetches full message content and starts the **Email Processing Flow**.

---

## 10. AI Email Agent Flow

1. **Context Construction:**
   - Combines Email Body + OCR Text from Attachments + Scraped Link Data.
2. **Prompt Engineering:**
   - Sends this context to Gemini with a specialized prompt to extract JSON.
   - Schema: `{"intent": "booking", "address": "...", "date": "...", "type": "PCR"}`.
3. **Reasoning:**
   - Checks if information is missing (e.g., "Need address").
   - If missing, generates a reply asking for details.
   - If complete, calls `Scheduler`.
4. **Drafting:**
   - Once scheduled, feeds the result (Time: Tuesday 10am, Inspector: John) back to Gemini.
   - Generates a natural language confirmation email.
5. **Delivery:**
   - Sends email via Gmail API.

---

## 11. Setup Instructions

1. **Clone & Env:**
   - Clone repo.
   - `cp .env.example .env` and fill in API Keys (Google, Supabase, Gemini).
2. **Dependencies:**
   - `pip install -r requirements.txt`
   - `playwright install chromium`
3. **Database:**
   - Run SQL migrations in Supabase to create tables (`inspectors`, `emails`, etc.).
4. **Google Cloud:**
   - Enable Gmail, Calendar, Maps, Pub/Sub APIs.
   - Create OAuth Credentials (Web App).
   - Create Pub/Sub topic and subscription pointing to your webhook URL.
5. **Run:**
   - `python app.py`

---

## 12. Deployment Notes

- **Production Server:** Use Gunicorn behind Nginx or deploy to Cloud Run (Docker).
- **SSL:** Mandatory for Google Webhooks (https).
- **Background Tasks:** The current implementation processes emails synchronously in the webhook or async via threads. For high volume, move processing to a task queue (Celery/Redis).
- **Token Storage:** Ensure `account_tokens` table is secure. OAuth tokens are sensitive.
- **Timezones:** Default is `Australia/Perth`. configure `DEFAULT_TIMEZONE` in `.env` if different.

---

## 13. Future Improvements

1. **UI Dashboard:** Build a React/Next.js frontend to visualize the schedule and manually override AI decisions.
2. **Inspector App:** A mobile view for inspectors to see their day and accept/reject bookings.
3. **Task Queue:** Implement Celery/Redis for robust email processing (decouple from webhook).
4. **Multi-Tenant UI:** Allow multiple agencies to sign up and manage their own settings via a web portal.
5. **Analytics:** Dashboard for "Time Saved," "Miles Traveled," and "Inspector Utilization" metrics.
