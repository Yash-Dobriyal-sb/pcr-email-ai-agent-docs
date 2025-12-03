import { Badge } from "@/components/ui/badge"

export default function CoreFeatures() {
  return (
    <div className="space-y-10">
      <div className="border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Core Features</h1>
        <p className="text-xl text-slate-600">Detailed breakdown of system capabilities.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          Email Processing
          <Badge>AI Powered</Badge>
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Intent Classification</h3>
            <p className="text-slate-600 mb-4">Uses Google Gemini AI to classify emails into:</p>
            <ul className="space-y-1 text-sm text-slate-700 list-disc list-inside">
              <li>
                <strong>BOOKING_REQUEST</strong> - New inspection
              </li>
              <li>
                <strong>RESCHEDULING_REQUEST</strong> - Change time
              </li>
              <li>
                <strong>CANCELLATION_REQUEST</strong> - Cancel booking
              </li>
              <li>
                <strong>UPDATE_DETAILS</strong> - Update info only
              </li>
              <li>
                <strong>CUSTOMER_SERVICE</strong> - General inquiry
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Data Extraction</h3>
            <p className="text-slate-600 mb-4">Intelligently parses:</p>
            <ul className="space-y-1 text-sm text-slate-700 list-disc list-inside">
              <li>
                <strong>Property Address</strong> (validated via Google Maps)
              </li>
              <li>
                <strong>Bedroom/Bathroom</strong> counts (e.g., "3x2x2")
              </li>
              <li>
                <strong>Dates</strong> (ISO, natural language like "next Friday")
              </li>
              <li>
                <strong>Access details</strong> (lockbox codes, key location)
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Attachment Processing</h2>
        <div className="prose prose-slate max-w-none bg-slate-50 p-6 rounded-xl border">
          <p>The system handles attachments up to 25MB using a multi-stage pipeline:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <li className="bg-white p-3 rounded border">
              <strong>PDF Documents:</strong> Converted to images, then processed with OCR.
            </li>
            <li className="bg-white p-3 rounded border">
              <strong>Word (.docx):</strong> Converted to image/text for extraction.
            </li>
            <li className="bg-white p-3 rounded border">
              <strong>Excel/CSV:</strong> Parsed directly or via OCR for complex layouts.
            </li>
            <li className="bg-white p-3 rounded border">
              <strong>Images:</strong> Processed directly with Gemini Vision.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">TAPI Integration</h2>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-slate-600 mb-4">
            The system automatically detects TAPI links (property management platform) and uses a headless browser to
            scrape:
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-50 p-3 rounded">Property Address</div>
            <div className="bg-slate-50 p-3 rounded">Bedroom/Bathroom Count</div>
            <div className="bg-slate-50 p-3 rounded">Tenant Details</div>
            <div className="bg-slate-50 p-3 rounded">Special Instructions</div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded text-sm text-yellow-800">
            <strong>Note:</strong> Uses Playwright for robust scraping of dynamic TAPI pages.
          </div>
        </div>
      </section>
    </div>
  )
}
