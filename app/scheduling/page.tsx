import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, MapPin, Users, BarChart3, CheckCircle2, Info } from "lucide-react"

export default function SchedulingLogic() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-8 h-8 text-purple-500" />
          <Badge variant="secondary">Core Algorithm</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">11-Step Scheduling Algorithm</h1>
        <p className="text-xl text-muted-foreground">Intelligent inspector matching and assignment system</p>
      </div>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle>Scoring Weights Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
              <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">40%</div>
              <div className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Geographic Proximity</div>
              <div className="text-xs text-blue-700 dark:text-blue-300">
                Distance from inspector's home base to property location
              </div>
              <div className="mt-3 text-xs text-blue-600 dark:text-blue-400">
                <strong>Scoring:</strong> 0 miles = 100 pts, 50+ miles = ~5 pts
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg border border-green-200 dark:border-green-800">
              <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-1">35%</div>
              <div className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">Workload Balance</div>
              <div className="text-xs text-green-700 dark:text-green-300">
                Daily capacity utilization percentage for requested date
              </div>
              <div className="mt-3 text-xs text-green-600 dark:text-green-400">
                <strong>Scoring:</strong> 0% busy = 100 pts, 100% busy = 25 pts
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 rounded-lg border border-amber-200 dark:border-amber-800">
              <Users className="w-8 h-8 text-amber-600 dark:text-amber-400 mb-3" />
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-1">25%</div>
              <div className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">Same-Day Locality</div>
              <div className="text-xs text-amber-700 dark:text-amber-300">
                Number of jobs in same postcode on the same day
              </div>
              <div className="mt-3 text-xs text-amber-600 dark:text-amber-400">
                <strong>Scoring:</strong> 0 jobs = 0 pts, 3+ jobs = 100 pts
              </div>
            </div>
          </div>

          <Alert className="mt-4">
            <Info className="w-4 h-4" />
            <AlertDescription>
              <strong>Property Manager Bonus:</strong> Preferred inspectors receive an additional +20 points to their
              final score
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Complete 11-Step Process</h2>
        <div className="space-y-6">
          {[
            {
              step: 1,
              title: "Receive Scheduling Request",
              desc: "Accept inspection request with property details, date preferences, and inspection type",
              technical:
                "InspectionRequest object with address, bedrooms, property_type, inspection_type, preferred_date",
            },
            {
              step: "1.5",
              title: "Validate Business Day",
              desc: "Check if requested date is a weekend or Australian public holiday",
              technical:
                "_validate_business_day() - Uses holidays library with Australia/WA calendar, suggests alternative dates if invalid",
            },
            {
              step: 2,
              title: "Identify Property Manager Preferences",
              desc: "Query property_managers table to find if agency has preferred inspectors",
              technical:
                "_identify_property_manager_preferences() - Matches by email domain or company name, returns preferred_inspector_ids array",
            },
            {
              step: 3,
              title: "Filter Qualified Inspectors",
              desc: "Filter inspectors by required certifications and active status",
              technical:
                "_filter_qualified_inspectors() - Checks certified_inspection_types, certified_property_types, and is_active = true",
            },
            {
              step: "3.5",
              title: "Check Local Availability",
              desc: "Remove inspectors who have overlapping bookings on requested date/time",
              technical:
                "_check_local_availability() - Queries inspection_events for time conflicts, removes busy inspectors from pool",
            },
            {
              step: 4,
              title: "Evaluate Geographic Proximity (40%)",
              desc: "Calculate distance from each inspector's home zip code to property location",
              technical:
                "_evaluate_geographic_proximity() - Uses zip code coordinate CSV, haversine formula for distance calculation",
            },
            {
              step: 5,
              title: "Assess Workload Balance (35%)",
              desc: "Calculate percentage of daily capacity used on requested date",
              technical:
                "_assess_workload_balance() - Counts booking hours vs daily_capacity_hours, applies utilization scoring formula",
            },
            {
              step: "5.7",
              title: "Compute Same-Day Locality Factor (25%)",
              desc: "Count jobs in same postcode on same day for route optimization",
              technical:
                "_compute_same_day_locality_factor() - Queries inspection_events by postcode and date, scores based on job count",
            },
            {
              step: 6,
              title: "Compute Overall Priority Score",
              desc: "Calculate weighted sum of all factors plus property manager bonus",
              technical:
                "_compute_overall_priority_score() - (geographic * 0.40) + (workload * 0.35) + (locality * 0.25) + PM bonus",
            },
            {
              step: 7,
              title: "Rank and Select Top Inspector",
              desc: "Sort inspectors by priority score descending, select highest ranked",
              technical:
                "Sorts inspector list by score, handles ties by checking secondary factors (workload balance preferred)",
            },
            {
              step: 8,
              title: "Find Optimal Time Slot",
              desc: "Select best available time within business hours considering existing bookings",
              technical:
                "_find_optimal_time_slot() - Work hours 9am-5pm, priority 8am-6pm, 30-min intervals, avoids conflicts",
            },
            {
              step: 9,
              title: "Create Calendar Event",
              desc: "Generate Google Calendar event with inspection details and inspector invitation",
              technical:
                "_create_google_calendar_event() - Uses Calendar API, adds inspector as attendee, sets event description",
            },
            {
              step: 10,
              title: "Insert Database Record",
              desc: "Store inspection_events record with all details and calendar event ID",
              technical:
                "Inserts into inspection_events table with inspector_id, property details, service_date, google_event_id",
            },
            {
              step: 11,
              title: "Log Booking History",
              desc: "Create audit trail entry in booking_history table",
              technical: "Records action (scheduled/rescheduled), timestamp, inspector assignment, and reason",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 bg-muted/50 rounded-lg border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {item.step}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.desc}</p>
                <div className="p-3 bg-muted rounded border border-border">
                  <p className="text-xs font-mono text-muted-foreground">{item.technical}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheduling Modes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <Badge variant="secondary" className="mb-3">
                Mode: initial_assignment
              </Badge>
              <h4 className="font-semibold mb-2">New Booking</h4>
              <p className="text-sm text-muted-foreground mb-3">First-time inspection scheduling from email request</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Run full 11-step algorithm
                </li>
                <li>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Evaluate all qualified inspectors
                </li>
                <li>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Create new calendar event
                </li>
                <li>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Insert inspection_events record
                </li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
              <Badge variant="secondary" className="mb-3">
                Mode: emergency_rescheduling
              </Badge>
              <h4 className="font-semibold mb-2">Rescheduling</h4>
              <p className="text-sm text-muted-foreground mb-3">Change date/time of existing booking</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Re-evaluate inspector assignment
                </li>
                <li>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Run scoring algorithm again
                </li>
                <li>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Update existing calendar event
                </li>
                <li>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Log in booking_history
                </li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <Badge variant="secondary" className="mb-3">
                Mode: update_details
              </Badge>
              <h4 className="font-semibold mb-2">Update Only</h4>
              <p className="text-sm text-muted-foreground mb-3">Change property details without rescheduling</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  No inspector re-evaluation
                </li>
                <li>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Update event description only
                </li>
                <li>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Preserve date and time
                </li>
                <li>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Quick update process
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Configuration Variables</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <code className="bg-muted px-2 py-1 rounded text-xs">SCHED_WEIGHT_GEOGRAPHIC=40.0</code>
              <p className="text-xs text-muted-foreground mt-1">Geographic proximity weight</p>
            </div>
            <div>
              <code className="bg-muted px-2 py-1 rounded text-xs">SCHED_WEIGHT_WORKLOAD=35.0</code>
              <p className="text-xs text-muted-foreground mt-1">Workload balance weight</p>
            </div>
            <div>
              <code className="bg-muted px-2 py-1 rounded text-xs">SCHED_WEIGHT_SAME_DAY_LOCALITY=25.0</code>
              <p className="text-xs text-muted-foreground mt-1">Same-day locality weight</p>
            </div>
            <div>
              <code className="bg-muted px-2 py-1 rounded text-xs">WORK_START_HOUR=9</code>
              <p className="text-xs text-muted-foreground mt-1">Standard work start time (9 AM)</p>
            </div>
            <div>
              <code className="bg-muted px-2 py-1 rounded text-xs">WORK_END_HOUR=17</code>
              <p className="text-xs text-muted-foreground mt-1">Standard work end time (5 PM)</p>
            </div>
            <div>
              <code className="bg-muted px-2 py-1 rounded text-xs">SLOT_INTERVAL_MINUTES=30</code>
              <p className="text-xs text-muted-foreground mt-1">Time slot intervals</p>
            </div>
            <div>
              <code className="bg-muted px-2 py-1 rounded text-xs">DEFAULT_TIMEZONE=Australia/Perth</code>
              <p className="text-xs text-muted-foreground mt-1">System timezone (UTC+8)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Edge Cases & Handling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-semibold">No qualified inspectors available</p>
              <p className="text-xs text-muted-foreground">
                Returns error with reason, suggests alternative dates, sends Slack alert
              </p>
            </div>
            <div>
              <p className="font-semibold">All inspectors at capacity</p>
              <p className="text-xs text-muted-foreground">
                Extends search to next available date, notifies property manager of delay
              </p>
            </div>
            <div>
              <p className="font-semibold">Weekend or holiday request</p>
              <p className="text-xs text-muted-foreground">Rejects with error, suggests next business day</p>
            </div>
            <div>
              <p className="font-semibold">Missing property address</p>
              <p className="text-xs text-muted-foreground">
                Attempts enrichment via Google Maps, falls back to manual review
              </p>
            </div>
            <div>
              <p className="font-semibold">Multiple inspectors with same score</p>
              <p className="text-xs text-muted-foreground">
                Tie-breaker uses workload balance, then alphabetical by name
              </p>
            </div>
            <div>
              <p className="font-semibold">Calendar API failure</p>
              <p className="text-xs text-muted-foreground">
                Retries 3 times with exponential backoff, sends alert if all fail
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle>Algorithm Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">~2-5s</div>
              <div className="text-sm text-muted-foreground">Average execution time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">95%+</div>
              <div className="text-sm text-muted-foreground">First-choice success rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">~50</div>
              <div className="text-sm text-muted-foreground">Inspectors evaluated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">100%</div>
              <div className="text-sm text-muted-foreground">Audit trail coverage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
