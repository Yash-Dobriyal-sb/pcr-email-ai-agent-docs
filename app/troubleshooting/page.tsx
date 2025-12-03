import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { AlertCircle, CheckCircle2, XCircle, Info } from "lucide-react"

export default function Troubleshooting() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <Badge variant="secondary">Problem Solving</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Troubleshooting Guide</h1>
        <p className="text-xl text-muted-foreground">Common issues and their solutions</p>
      </div>

      {/* Common Issues */}
      <div className="space-y-6">
        {[
          {
            category: "OAuth & Authentication",
            color: "red",
            issues: [
              {
                problem: 'OAuth fails with "redirect_uri_mismatch"',
                cause: "The redirect URI in .env doesn't match Google Cloud Console configuration",
                solution:
                  "Ensure REDIRECT_URI in .env exactly matches the authorized redirect URI in Google Cloud Console",
                steps: [
                  "Go to Google Cloud Console → APIs & Services → Credentials",
                  "Click on your OAuth 2.0 Client ID",
                  "Check Authorized redirect URIs list",
                  "Add or update: http://localhost:5000/oauth2callback",
                  "For production, add: https://your-domain.com/oauth2callback",
                  "Update .env with matching URI",
                ],
              },
              {
                problem: 'Error: "invalid_grant" during OAuth',
                cause: "Expired authorization code, incorrect system time, or revoked credentials",
                solution: "Clear browser cookies, check system clock, and regenerate OAuth credentials if needed",
                steps: [
                  "Clear browser cookies and cache",
                  "Verify system clock is correct (important for OAuth)",
                  "Try OAuth flow in incognito/private window",
                  "If persists, regenerate OAuth credentials in Google Cloud Console",
                  "Ensure .env has latest credentials",
                ],
              },
              {
                problem: "No tokens found for account",
                cause: "OAuth flow not completed or tokens not stored in database",
                solution: "Complete OAuth flow by visiting the authentication URL",
                steps: [
                  "Navigate to: http://localhost:5000/google/login/calendar,email?account_id=<YOUR_ID>",
                  "Complete Google OAuth consent screen",
                  "Check account_tokens table in Supabase for stored tokens",
                  "Verify integration_details column contains access_token and refresh_token",
                ],
              },
            ],
          },
          {
            category: "Webhooks & Notifications",
            color: "amber",
            issues: [
              {
                problem: "Gmail webhook not receiving notifications",
                cause: "WEBHOOK_BASE_URL not publicly accessible, Pub/Sub not configured, or watch expired",
                solution: "Verify webhook URL is public and Pub/Sub subscription is active",
                steps: [
                  "Ensure WEBHOOK_BASE_URL in .env is publicly accessible (use ngrok for local dev)",
                  "Test webhook URL: curl https://your-webhook-url/webhook",
                  "Check Pub/Sub topic exists: projects/your-project-id/topics/gmail-notifications",
                  "Verify push subscription endpoint matches WEBHOOK_BASE_URL",
                  "Check watch registration: GET /debug/event_watches/<account_id>",
                  "Manually renew watch: POST /setup_gmail_watch/account/<account_id>",
                ],
              },
              {
                problem: "Calendar webhook expired",
                cause: "Calendar watches expire after 30 days if not renewed",
                solution: "Setup automatic renewal or manually renew watches",
                steps: [
                  "Check watch status: GET /api/watches/status/account/<account_id>",
                  "Manually renew: POST /api/watches/renew/account/<account_id>",
                  "Setup cron job to call renewal endpoint weekly",
                  "Monitor expiration dates in integration_details.calendar_watches",
                ],
              },
              {
                problem: "Webhook receives notifications but doesn't process",
                cause: "Handler error, database connection issue, or invalid payload",
                solution: "Check application logs and verify database connectivity",
                steps: [
                  "Check Flask application logs for errors",
                  "Verify Supabase connection: GET /api/db/health",
                  "Test webhook manually with curl",
                  "Check Slack alerts for error notifications",
                  "Verify WEBHOOK_VERIFICATION_TOKEN if using token auth",
                ],
              },
            ],
          },
          {
            category: "Scheduling & Inspector Assignment",
            color: "purple",
            issues: [
              {
                problem: "No qualified inspectors found",
                cause: "No inspectors match required certifications, all busy, or not active",
                solution: "Verify inspector qualifications and availability",
                steps: [
                  "Check inspector is_active = true in database",
                  "Verify certified_inspection_types includes requested type (PCR/Final/Routine)",
                  "Verify certified_property_types includes property type (Residential/Commercial)",
                  "Check inspector calendar for availability on requested date",
                  "Review inspection_events table for overlapping bookings",
                  "Consider adjusting requested date/time",
                ],
              },
              {
                problem: "Inspector always assigned to same person",
                cause: "Scoring weights heavily favor one inspector or property manager preferences",
                solution: "Review scoring configuration and property manager settings",
                steps: [
                  "Check SCHED_WEIGHT_* values in .env (should sum to 100)",
                  "Review property_managers table for preferred_inspector_ids",
                  "Verify geographic distribution of inspectors (home_zip_code)",
                  "Check daily_capacity_hours for all inspectors",
                  "Review workload balance across inspectors",
                ],
              },
              {
                problem: "Scheduling fails with weekend/holiday error",
                cause: "Requested date is weekend or Australian public holiday",
                solution: "Business day validation is working correctly - reschedule for business day",
                steps: [
                  "Check if requested date is Saturday or Sunday",
                  "Verify against Australian (WA) holiday calendar",
                  "Suggest next available business day to property manager",
                  "Update booking_policy.py if holiday calendar needs adjustment",
                ],
              },
            ],
          },
          {
            category: "Email Processing & AI",
            color: "blue",
            issues: [
              {
                problem: "Gemini API rate limit errors",
                cause: "Too many API calls in short time period",
                solution: "Built-in retry logic handles this automatically",
                steps: [
                  "Wait - automatic retry with exponential backoff (3 attempts)",
                  "Monitor Slack alerts for repeated rate limit errors",
                  "Consider increasing delays between retries",
                  "Check Gemini API quota in Google AI Studio",
                  "Upgrade Gemini API plan if hitting limits frequently",
                ],
              },
              {
                problem: "AI fails to extract property details",
                cause: "Unclear email content, missing information, or attachment processing failure",
                solution: "Check email content quality and attachment processing logs",
                steps: [
                  "Review original email content for clarity",
                  "Check if property details are in attachments (PDF/Word/Excel)",
                  "Verify attachment processing succeeded (check logs for OCR errors)",
                  "Try TAPI/PropertyTree link scraping if links present",
                  "Fallback to manual data entry if AI extraction fails",
                  "Review AI prompt in prompts/BOOKING_EXTRACT_SINGLE.md",
                ],
              },
              {
                problem: "Email response not sent",
                cause: "Gmail API error, token expired, or send permission missing",
                solution: "Check Gmail API permissions and token validity",
                steps: [
                  "Verify OAuth scopes include gmail.send",
                  "Check token validity: GET /check_token/<account_id>",
                  "Review Flask logs for Gmail API errors",
                  "Test email sending manually: POST /api/email/send-reply",
                  "Refresh OAuth tokens if expired",
                ],
              },
            ],
          },
          {
            category: "Database & Integration",
            color: "green",
            issues: [
              {
                problem: "Database connection fails",
                cause: "Invalid Supabase credentials or network issue",
                solution: "Verify Supabase configuration in .env",
                steps: [
                  "Check SUPABASE_URL is correct",
                  "Verify SUPABASE_SECRET_KEY is service_role key (not anon)",
                  "Test connection: curl <SUPABASE_URL>/rest/v1/",
                  "Check Supabase project status at status.supabase.com",
                  "Verify network connectivity and firewall rules",
                ],
              },
              {
                problem: "RLS policy blocking access",
                cause: "Row-Level Security policy restricting data access",
                solution: "Use service_role key which bypasses RLS",
                steps: [
                  "Ensure using SUPABASE_SECRET_KEY (service_role) not anon key",
                  "Service role key bypasses all RLS policies",
                  "If using anon key, review RLS policies in Supabase Dashboard",
                  "For user-facing features, implement proper RLS policies",
                ],
              },
              {
                problem: "Calendar sync out of date",
                cause: "Event changes not triggering webhooks or sync logic failing",
                solution: "Manual sync and verify webhook configuration",
                steps: [
                  "Manually sync: POST /sync_calendars/account/<account_id>",
                  "Backfill missing events: POST /backfill_events/account/<account_id>",
                  "Check calendar webhook registration",
                  "Review webhook handler logs for errors",
                  "Verify compare_event_states() logic in event_sync.py",
                ],
              },
            ],
          },
          {
            category: "Performance & System",
            color: "teal",
            issues: [
              {
                problem: "Slow scheduling response times",
                cause: "Large inspector pool, complex queries, or external API delays",
                solution: "Optimize database queries and review inspector filtering",
                steps: [
                  "Check number of active inspectors (optimal: 20-50)",
                  "Review database query performance in Supabase",
                  "Add indexes on frequently queried columns",
                  "Consider caching inspector data",
                  "Monitor Google Calendar API response times",
                ],
              },
              {
                problem: "High memory usage",
                cause: "Large file attachments, PDF processing, or browser instances not cleaned up",
                solution: "Implement attachment size limits and cleanup",
                steps: [
                  "Verify MAX_ATTACHMENT_SIZE is set (default: 25MB)",
                  "Check Playwright browser cleanup in tapi_scraper.py",
                  "Monitor temp file cleanup after attachment processing",
                  "Consider implementing file size warnings",
                  "Restart application if memory leak suspected",
                ],
              },
              {
                problem: "Application crashes or freezes",
                cause: "Uncaught exception, deadlock, or resource exhaustion",
                solution: "Review logs and implement proper error handling",
                steps: [
                  "Check Flask application logs for stack traces",
                  "Review Slack alerts for crash notifications",
                  "Verify no infinite loops in scheduling logic",
                  "Check for database connection pool exhaustion",
                  "Implement request timeouts",
                  "Setup application monitoring (health checks)",
                ],
              },
            ],
          },
        ].map((category) => (
          <div key={category.category} className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full bg-${category.color}-500`} />
              {category.category}
            </h2>

            {category.issues.map((issue, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <XCircle className={`w-5 h-5 text-${category.color}-600 flex-shrink-0 mt-0.5`} />
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{issue.problem}</CardTitle>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2 text-sm">
                          <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold">Cause: </span>
                            <span className="text-muted-foreground">{issue.cause}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold">Solution: </span>
                            <span className="text-muted-foreground">{issue.solution}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="pl-8">
                    <p className="font-semibold text-sm mb-2">Steps to resolve:</p>
                    <ol className="space-y-2 list-decimal list-inside text-sm text-muted-foreground">
                      {issue.steps.map((step, j) => (
                        <li key={j} className="pl-2">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>

      {/* Debugging Tips */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">General Debugging Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-2">1. Check Application Logs</h4>
            <p className="text-sm text-muted-foreground">
              Flask outputs detailed logs to console. Look for ERROR or WARNING messages.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">2. Verify Environment Variables</h4>
            <CodeBlock
              code={`# Check if .env is loaded
python -c "from dotenv import load_dotenv; load_dotenv(); import os; print(os.getenv('SUPABASE_URL'))"`}
              language="bash"
            />
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">3. Test Database Connectivity</h4>
            <CodeBlock
              code={`curl -H "Authorization: Bearer your-api-key" \\
  http://localhost:5000/api/db/health`}
              language="bash"
            />
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">4. Monitor Slack Alerts</h4>
            <p className="text-sm text-muted-foreground">
              If configured, Slack receives real-time error notifications with stack traces.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">5. Use Debug Endpoints</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-4">
              <li>
                <code className="bg-muted px-1 rounded text-xs">GET /</code> - Health check
              </li>
              <li>
                <code className="bg-muted px-1 rounded text-xs">GET /check_token/&lt;account_id&gt;</code> - Token
                status
              </li>
              <li>
                <code className="bg-muted px-1 rounded text-xs">GET /debug/event_watches/&lt;account_id&gt;</code> -
                Webhook status
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Support Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Support Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-sm mb-2">Service Status Pages</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • Supabase:{" "}
                  <a
                    href="https://status.supabase.com"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    status.supabase.com
                  </a>
                </li>
                <li>
                  • Google Cloud:{" "}
                  <a
                    href="https://status.cloud.google.com"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    status.cloud.google.com
                  </a>
                </li>
                <li>
                  • Gemini AI:{" "}
                  <a
                    href="https://ai.google.dev/status"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    ai.google.dev/status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Documentation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Main documentation: HANDOVER_DOCUMENTATION.md</li>
                <li>• Quick start: QUICK_START_GUIDE.md</li>
                <li>• File reference: FILE_BY_FILE_DOCUMENTATION.md</li>
                <li>• This guide: Available in web app</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
