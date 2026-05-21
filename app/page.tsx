import { HvacDemoFlow } from "./components/HvacDemoFlow";
import { RevenueLeakCalculator } from "./components/RevenueLeakCalculator";

const painPoints = [
  "Calls missed while techs are in the field",
  "After-hours AC emergencies going to competitors",
  "No follow-up on quote requests",
  "Lost installs from slow response time",
  "Reviews not being requested consistently",
];

const offerItems = [
  "Text missed callers instantly",
  "Qualify the issue",
  "Capture name, phone, service need, and urgency",
  "Offer appointment windows",
  "Follow up when customers do not respond",
  "Send review requests after completed jobs",
  "Show recovered opportunities in a simple dashboard",
];

const metrics = [
  {
    value: "$500",
    label: "common repair ticket",
  },
  {
    value: "$12k",
    label: "install opportunity",
  },
  {
    value: "Instant",
    label: "missed-call response",
  },
];

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#07182f] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-slate-600">{text}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-white text-[#091525]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-xl font-semibold tracking-tight">
            ChairFill
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a className="transition hover:text-[#07182f]" href="#problem">
              Problem
            </a>
            <a className="transition hover:text-[#07182f]" href="#offer">
              What it does
            </a>
            <a className="transition hover:text-[#07182f]" href="#calculator">
              Calculator
            </a>
            <a className="transition hover:text-[#07182f]" href="#demo">
              Demo
            </a>
          </div>
          <a
            href="#demo"
            className="rounded-full bg-[#07182f] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b2445]"
          >
            See Demo
          </a>
        </nav>
      </header>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.82fr] lg:px-8 lg:py-28">
          <div>
            <p className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-[#0d4f8b]">
              Missed-call recovery for HVAC companies
            </p>
            <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-[#07182f] sm:text-6xl lg:text-7xl">
              Stop Losing HVAC Jobs From Missed Calls
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-700">
              Every missed call could be a $500 repair or a $12,000 install.
              ChairFill responds instantly, follows up automatically, and helps
              turn missed calls into booked jobs.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-full bg-[#07182f] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b2445]"
              >
                See Demo
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#07182f] transition hover:border-[#0d4f8b]"
              >
                Calculate Revenue Leak
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
              Tonight's missed call
            </p>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-[#07182f]">10:47 PM</p>
                <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                  Missed call
                </span>
              </div>
              <p className="mt-4 text-lg font-semibold leading-7 text-[#07182f]">
                "AC stopped working upstairs. Need help ASAP."
              </p>
              <div className="mt-5 rounded-xl bg-[#eaf3ff] p-4 text-sm leading-6 text-[#07182f]">
                ChairFill text sent instantly. Lead qualified. Appointment
                window requested.
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <p className="text-2xl font-semibold text-[#07182f]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-slate-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="The revenue leak problem"
            title="HVAC companies lose work when response time slips"
            text="Your best leads often call at the worst moments: during installs, while techs are driving, or after the office is closed."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {painPoints.map((item) => (
              <article
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-[#0d4f8b]">
                  {painPoints.indexOf(item) + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold leading-7 text-[#07182f]">
                  {item}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="offer"
        className="bg-[#f8fafc] px-5 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
                What ChairFill does
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#07182f] sm:text-4xl">
                Built for service calls, estimates, emergency calls, and
                installs
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                ChairFill is a missed-call recovery and follow-up system for
                HVAC owners who want more booked jobs without adding another
                person to chase every lead manually.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {offerItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                    <p className="text-base font-semibold leading-7 text-[#07182f]">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RevenueLeakCalculator />
      <HvacDemoFlow />

      <section className="bg-[#07182f] px-5 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">
            Final step
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Ready to stop letting HVAC jobs go unanswered?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Run the demo, estimate the leak, and see how ChairFill can turn
            missed calls into booked service calls and install opportunities.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#07182f] transition hover:bg-slate-100"
            >
              See Demo
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Calculate Revenue Leak
            </a>
          </div>
        </div>
      </section>

      <footer className="px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-[#07182f]">ChairFill</p>
            <p className="mt-1">
              Missed-call recovery and follow-up for HVAC companies.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a className="transition hover:text-[#07182f]" href="#calculator">
              Calculator
            </a>
            <a className="transition hover:text-[#07182f]" href="#demo">
              Demo
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
