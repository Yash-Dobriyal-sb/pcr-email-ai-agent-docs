export default function FutureRoadmap() {
  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Future Improvements</h1>
        <p className="text-xl text-slate-600">Recommendations for future development.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 border rounded-xl bg-white">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Performance</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Migrate large files from Flask to Celery/Redis for async processing.</li>
            <li>Implement caching for inspector availability queries.</li>
            <li>Optimize Gemini prompts to reduce token usage and cost.</li>
          </ul>
        </div>

        <div className="p-6 border rounded-xl bg-white">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Features</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Add an Admin Dashboard UI (React) for manual booking management.</li>
            <li>Implement SMS notifications for inspectors.</li>
            <li>Add support for tenant direct booking links.</li>
          </ul>
        </div>

        <div className="p-6 border rounded-xl bg-white">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Reliability</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Increase test coverage (currently low).</li>
            <li>Add end-to-end testing for the full email flow.</li>
            <li>Implement stricter typing (mypy) across the codebase.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
