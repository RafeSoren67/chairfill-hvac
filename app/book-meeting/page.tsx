export const metadata = {
  title: "ChairFill HVAC Demo Request",
  description:
    "Preview the ChairFill HVAC missed-call recovery demo. Scheduling integrations are not connected yet.",
};

export default function BookMeetingPage() {
  return (
    <main className="min-h-screen bg-white text-[#091525]">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-xl font-semibold tracking-tight">
            ChairFill
          </a>
          <a
            href="/demo"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-[#07182f]"
          >
            View demo
          </a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-28">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
            Sales conversation
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#07182f] sm:text-5xl">
            ChairFill HVAC Demo Request
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            This standalone HVAC demo site does not connect to Calendly or any
            backend yet. Use the demo and calculator to preview how ChairFill
            could recover missed service calls, estimate requests, emergency
            calls, and install opportunities.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/demo"
              className="inline-flex items-center justify-center rounded-full bg-[#07182f] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#0b2445]"
            >
              See Demo
            </a>
            <a
              href="/revenue-calculator"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-7 py-3.5 text-sm font-semibold text-[#07182f] hover:border-[#0d4f8b]"
            >
              Calculate Revenue Leak
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0d4f8b]">
            What the walkthrough covers
          </p>
          <div className="mt-5 grid gap-3">
            {[
              "Where missed service calls are leaking revenue",
              "How instant text-back can qualify urgent HVAC issues",
              "How quote requests and install opportunities can be followed up",
              "What recovered revenue would need to look like for ChairFill to pay for itself",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-500">
            Scheduling, CRM, text messaging, and dashboard integrations can be
            added later. This page is intentionally static for now.
          </p>
        </div>
      </section>
    </main>
  );
}
