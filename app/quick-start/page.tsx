import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CodeBlock } from "@/components/code-block"
import { Zap, CheckCircle2, AlertCircle, Terminal, Key, Play } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { InteractiveCard } from "@/components/interactive-card"

export default function QuickStart() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Quick Start Guide"
        description="Get your PCR Email AI Agent up and running in just 5 minutes with this step-by-step guide."
        icon={Zap}
      />

      <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-900 dark:text-blue-100">
          <strong>Prerequisites:</strong> Python 3.12+, Supabase account, Google Cloud Project with APIs enabled, ngrok
          for local development
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        <InteractiveCard
          title="Step 1: Clone & Install"
          icon={<Terminal className="w-5 h-5" />}
          description="Get the codebase and install dependencies"
        >
          <CodeBlock
            code={`git clone <repository-url>
cd pcr-email-ai-agent
pip install -r requirements.txt
playwright install chromium`}
            language="bash"
          />
          <p className="text-sm text-muted-foreground mt-4">
            This will install all Python dependencies and the Chromium browser for web scraping functionality.
          </p>
        </InteractiveCard>

        <InteractiveCard
          title="Step 2: Environment Setup"
          icon={<Key className="w-5 h-5" />}
          description="Configure your environment variables"
        >
          <p className="text-muted-foreground mb-4">
            Copy <code className="bg-muted px-2 py-1 rounded text-sm font-mono">.env.example</code> to{" "}
            <code className="bg-muted px-2 py-1 rounded text-sm font-mono">.env</code> and configure the following:
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  1
                </div>
                Google OAuth
              </h4>
              <CodeBlock
                code={`GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
REDIRECT_URI=http://localhost:5000/oauth2callback`}
              />
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  2
                </div>
                Supabase
              </h4>
              <CodeBlock
                code={`SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=your-secret-key`}
              />
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  3
                </div>
                API Keys
              </h4>
              <CodeBlock
                code={`API_KEYS=your-api-key-1,your-api-key-2
GEMINI_API_KEY=your-gemini-api-key
GOOGLE_MAPS_API_KEY=your-maps-api-key`}
              />
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  4
                </div>
                Webhooks
              </h4>
              <CodeBlock
                code={`WEBHOOK_BASE_URL=https://your-ngrok-url.ngrok-free.app
GMAIL_PUBSUB_TOPIC=projects/your-project/topics/gmail-notifications`}
              />
            </div>
          </div>
        </InteractiveCard>

        <InteractiveCard
          title="Step 3: Run Application"
          icon={<Play className="w-5 h-5" />}
          description="Start the Flask server"
        >
          <CodeBlock
            code={`python app.py

# Application starts on http://localhost:5000
# API documentation available at /api/docs`}
            language="bash"
          />
        </InteractiveCard>

        {/* Step 4 remains unchanged */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
              4
            </div>
            <h2 className="text-2xl font-bold">Setup OAuth Integration</h2>
          </div>
          <p className="text-muted-foreground mb-4">Navigate to the following URL to authenticate:</p>
          <CodeBlock code={`http://localhost:5000/google/login/calendar,email?account_id=1001`} />
          <p className="text-sm text-muted-foreground mt-4">This will:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
            <li>Redirect to Google OAuth consent screen</li>
            <li>Request calendar and email permissions</li>
            <li>Store tokens in account_tokens table</li>
            <li>Setup Gmail watch</li>
            <li>Setup calendar webhooks</li>
          </ul>
        </div>

        {/* Step 5 remains unchanged */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
              5
            </div>
            <h2 className="text-2xl font-bold">Test Email Processing</h2>
          </div>
          <CodeBlock
            code={`curl -X POST http://localhost:5000/api/email-agent/draft-reply \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "account_id": 1001,
    "thread_id": "your-thread-id",
    "message_id": "your-message-id",
    "dry_run": true
  }'`}
            language="bash"
          />
        </div>
      </div>

      <InteractiveCard
        title="Common Tasks"
        icon={<CheckCircle2 className="w-5 h-5" />}
        description="Frequently used operations"
        className="bg-gradient-to-br from-green-50 to-transparent dark:from-green-950/20 border-green-200 dark:border-green-800/50"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Add New Inspector</h4>
            <CodeBlock
              code={`import requests

response = requests.post(
    'http://localhost:5000/api/db/insert/inspectors',
    headers={'Authorization': 'Bearer your-api-key'},
    json={
        'account_id': 1001,
        'name': 'John Smith',
        'email': 'john@prplus.com.au',
        'calendar_id': 'john@prplus.com.au',
        'is_active': True,
        'daily_capacity_hours': 8.0,
        'certified_inspection_types': ['PCR', 'Final', 'Routine'],
        'certified_property_types': ['Residential', 'Commercial'],
        'home_zip_code': '6010'
    }
)`}
              language="python"
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2">Query Inspections</h4>
            <CodeBlock
              code={`response = requests.post(
    'http://localhost:5000/api/db/query/inspection_events',
    headers={'Authorization': 'Bearer your-api-key'},
    json={
        'select': ['*'],
        'filters': [
            {'column': 'account_id', 'operator': 'eq', 'value': 1001},
            {'column': 'service_date', 'operator': 'gte', 'value': '2025-12-01'}
        ],
        'order': {'column': 'service_date', 'direction': 'asc'},
        'limit': 50
    }
)`}
              language="python"
            />
          </div>
        </div>
      </InteractiveCard>

      {/* Troubleshooting section remains unchanged */}
      <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="text-amber-900 dark:text-amber-100">Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="font-semibold">Issue: OAuth fails with "redirect_uri_mismatch"</p>
            <p className="text-muted-foreground">Solution: Ensure REDIRECT_URI in .env matches Google Cloud Console</p>
          </div>
          <div>
            <p className="font-semibold">Issue: Gmail webhook not receiving notifications</p>
            <p className="text-muted-foreground">
              Solution: Check WEBHOOK_BASE_URL is publicly accessible and Pub/Sub topic exists
            </p>
          </div>
          <div>
            <p className="font-semibold">Issue: Inspector not showing in scheduling</p>
            <p className="text-muted-foreground">
              Solution: Verify is_active = true, correct certifications, and calendar integration exists
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
