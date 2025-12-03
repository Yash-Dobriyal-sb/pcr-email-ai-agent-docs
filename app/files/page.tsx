import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FileReference() {
  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">File Reference</h1>
        <p className="text-xl text-slate-600">Guide to key files and directories.</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="app-py">
          <AccordionTrigger className="text-lg font-semibold">app.py (Main Entry Point)</AccordionTrigger>
          <AccordionContent className="text-slate-600 space-y-2">
            <p>The main Flask application file (1496 lines).</p>
            <ul className="list-disc list-inside pl-4">
              <li>Initializes Flask app and registers blueprints</li>
              <li>Handles OAuth flow endpoints (/authenticate, /oauth2callback)</li>
              <li>Manages token refresh logic</li>
              <li>Defines global webhook receivers</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="scheduler">
          <AccordionTrigger className="text-lg font-semibold">services/inspection_scheduler.py</AccordionTrigger>
          <AccordionContent className="text-slate-600 space-y-2">
            <p>Core business logic for scheduling (4826 lines).</p>
            <ul className="list-disc list-inside pl-4">
              <li>Contains the 11-step matching algorithm</li>
              <li>Calculates geographic, workload, and locality scores</li>
              <li>Manages Google Calendar event creation</li>
              <li>Handles emergency rescheduling logic</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="email-agent">
          <AccordionTrigger className="text-lg font-semibold">blueprints/email_agent.py</AccordionTrigger>
          <AccordionContent className="text-slate-600 space-y-2">
            <p>AI Email processing logic (5265 lines).</p>
            <ul className="list-disc list-inside pl-4">
              <li>Endpoints for draft and reply generation</li>
              <li>Connects to Gemini AI for intent classification</li>
              <li>Orchestrates data extraction from multiple sources</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
