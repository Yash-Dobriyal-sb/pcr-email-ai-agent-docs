import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CodeBlock } from "@/components/code-block"
import { Settings, CheckCircle2, AlertCircle, Terminal, Cloud, Database } from "lucide-react"

export default function SetupDeploy() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-8 h-8 text-orange-500" />
          <Badge variant="secondary">Deployment Guide</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Setup & Deployment</h1>
        <p className="text-xl text-muted-foreground">Complete guide to deploying the PCR Email AI Agent</p>
      </div>

      {/* Prerequisites */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Prerequisites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Required Accounts</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Google Cloud Platform (Gmail, Calendar, Pub/Sub, Maps APIs)</li>
                <li>Supabase (PostgreSQL database)</li>
                <li>Google AI Studio (Gemini API key)</li>
                <li>Slack (optional, for alerts)</li>
                <li>ngrok or similar (development webhooks)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Required Software</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Python 3.12 or higher</li>
                <li>pip (Python package manager)</li>
                <li>Git (version control)</li>
                <li>Docker (optional, for containerized deployment)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Installation Steps</h2>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                1
              </div>
              <CardTitle className="text-lg">Clone Repository</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`git clone <repository-url>
cd pcr-email-ai-agent`}
              language="bash"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                2
              </div>
              <CardTitle className="text-lg">Create Virtual Environment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`python3.12 -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate`}
              language="bash"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                3
              </div>
              <CardTitle className="text-lg">Install Dependencies</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`pip install -r requirements.txt
playwright install chromium`}
              language="bash"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                4
              </div>
              <CardTitle className="text-lg">Configure Environment Variables</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              code={`cp .env.example .env
# Edit .env with your configuration`}
              language="bash"
            />

            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription className="text-xs">
                See the Environment Variables section below for complete configuration details
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Environment Variables */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Variables Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Google OAuth</h4>
            <CodeBlock
              code={`GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret-here
REDIRECT_URI=http://localhost:5000/oauth2callback`}
            />
          </div>

          <div>
            <h4 className="font-semibold mb-3">Supabase</h4>
            <CodeBlock
              code={`SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=your-service-role-key-here`}
            />
            <p className="text-xs text-amber-600 mt-2">Important: Use the service_role key, not the anon key!</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">API Keys</h4>
            <CodeBlock
              code={`API_KEYS=your-api-key-1,your-api-key-2,your-api-key-3
GEMINI_API_KEY=your-gemini-api-key-here
GOOGLE_MAPS_API_KEY=your-maps-api-key-here`}
            />
          </div>

          <div>
            <h4 className="font-semibold mb-3">Webhooks</h4>
            <CodeBlock
              code={`WEBHOOK_BASE_URL=https://your-ngrok-url.ngrok-free.app
GMAIL_PUBSUB_TOPIC=projects/your-project-id/topics/gmail-notifications
WEBHOOK_VERIFICATION_TOKEN=your-secret-token`}
            />
            <p className="text-xs text-red-600 mt-2">Critical: WEBHOOK_BASE_URL must be publicly accessible!</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Scheduling Weights</h4>
            <CodeBlock
              code={`SCHED_WEIGHT_GEOGRAPHIC=40.0
SCHED_WEIGHT_WORKLOAD=35.0
SCHED_WEIGHT_SAME_DAY_LOCALITY=25.0`}
            />
            <p className="text-xs text-muted-foreground mt-2">Note: Weights must sum to 100%</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Work Hours Configuration</h4>
            <CodeBlock
              code={`WORK_START_HOUR=9
WORK_END_HOUR=17
SLOT_INTERVAL_MINUTES=30
PRIORITY_WORK_START_HOUR=8
PRIORITY_WORK_END_HOUR=18`}
            />
          </div>

          <div>
            <h4 className="font-semibold mb-3">Optional: Slack Alerts</h4>
            <CodeBlock
              code={`SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
NOTIFICATION_WEBHOOK_API_URL=https://your-notification-api.com
NOTIFICATION_API_KEY=your-notification-api-key`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Google Cloud Setup */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-600" />
            Google Cloud Platform Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">1. Enable Required APIs</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-4">
              <li>Gmail API</li>
              <li>Google Calendar API</li>
              <li>Google Pub/Sub API</li>
              <li>Google Maps API</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">2. Create OAuth 2.0 Credentials</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside ml-4">
              <li>Navigate to APIs & Services → Credentials</li>
              <li>Create Credentials → OAuth 2.0 Client ID</li>
              <li>Application type: Web application</li>
              <li>
                Add authorized redirect URIs:
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>http://localhost:5000/oauth2callback (development)</li>
                  <li>https://your-domain.com/oauth2callback (production)</li>
                </ul>
              </li>
              <li>Save Client ID and Client Secret to .env</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-2">3. Setup Pub/Sub Topic</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside ml-4">
              <li>Navigate to Pub/Sub → Topics</li>
              <li>Create topic: gmail-notifications</li>
              <li>Note full topic name: projects/your-project-id/topics/gmail-notifications</li>
              <li>Create push subscription with endpoint: https://your-domain.com/webhook/google/gmail</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Supabase Setup */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-green-600" />
            Supabase Database Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">1. Create Database Tables</h4>
            <p className="text-sm text-muted-foreground mb-2">Run SQL scripts in order:</p>
            <CodeBlock
              code={`-- 1. Core schema
psql -f database/testing_schema.sql

-- 2. Functions
psql -f database/functions/get_inspector_by_email.sql
psql -f database/functions/upsert_inspection_from_calendar_event.sql

-- 3. Triggers
psql -f database/triggers/sync_calendar_to_inspection.sql

-- 4. Migrations
psql -f database/migrations/*.sql`}
              language="bash"
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2">2. Configure RLS Policies</h4>
            <CodeBlock
              code={`-- Service role has full access
CREATE POLICY "Service role full access"
ON inspection_events FOR ALL
USING (true);

-- Users can view their own data
CREATE POLICY "Users view own data"
ON inspection_events FOR SELECT
USING (account_id = auth.uid()::integer);`}
              language="sql"
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2">3. Get Service Role Key</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside ml-4">
              <li>Go to Supabase Dashboard → Project Settings → API</li>
              <li>Copy service_role key (not anon key)</li>
              <li>Add to .env as SUPABASE_SECRET_KEY</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Running the Application */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Running the Application
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Development Mode</h4>
            <CodeBlock
              code={`# 1. Start ngrok (for webhooks)
ngrok http 5000

# 2. Update .env with ngrok URL
WEBHOOK_BASE_URL=https://your-ngrok-url.ngrok-free.app

# 3. Start Flask application
python app.py

# Application starts on http://localhost:5000`}
              language="bash"
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2">Production Deployment Options</h4>
            <div className="space-y-3 mt-3">
              <div className="p-3 bg-muted/50 rounded border border-border">
                <p className="font-medium text-sm mb-2">Option 1: Docker</p>
                <CodeBlock
                  code={`docker build -t pcr-email-agent .
docker run -d \\
  --name pcr-email-agent \\
  -p 5000:5000 \\
  --env-file .env \\
  pcr-email-agent`}
                  language="bash"
                />
              </div>

              <div className="p-3 bg-muted/50 rounded border border-border">
                <p className="font-medium text-sm mb-2">Option 2: Gunicorn</p>
                <CodeBlock
                  code={`pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app`}
                  language="bash"
                />
              </div>

              <div className="p-3 bg-muted/50 rounded border border-border">
                <p className="font-medium text-sm mb-2">Option 3: Google Cloud Run</p>
                <CodeBlock
                  code={`gcloud builds submit --tag gcr.io/your-project/pcr-email-agent
gcloud run deploy pcr-email-agent \\
  --image gcr.io/your-project/pcr-email-agent \\
  --platform managed \\
  --region us-central1 \\
  --allow-unauthenticated`}
                  language="bash"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Checklist */}
      <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-green-900 dark:text-green-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Verification Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              "Flask application starts without errors",
              "Health endpoint returns 200",
              "OAuth flow completes successfully",
              "Tokens stored in database",
              "Gmail watch registered",
              "Calendar webhooks registered",
              "Email fetch works",
              "Calendar search works",
              "Database queries work",
              "Scheduling endpoint works",
              "Slack alerts working (if configured)",
              "Logs are being written",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 rounded border-2 border-green-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Post-Deployment */}
      <Card>
        <CardHeader>
          <CardTitle>Post-Deployment Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">1. Test OAuth Integration</h4>
              <p className="text-sm text-muted-foreground mb-2">Navigate to:</p>
              <CodeBlock code={`http://localhost:5000/google/login/calendar,email?account_id=1001`} />
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">2. Verify Health</h4>
              <CodeBlock code={`curl http://localhost:5000/`} language="bash" />
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">3. Test Email Processing</h4>
              <p className="text-sm text-muted-foreground">
                Send a test email to the monitored inbox and verify webhook triggers
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">4. Setup Monitoring</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-4">
                <li>Configure uptime monitoring</li>
                <li>Setup error alerting via Slack</li>
                <li>Monitor API quotas (Google, Gemini)</li>
                <li>Enable Supabase backups</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
