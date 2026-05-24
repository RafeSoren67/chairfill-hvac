"use client";

import { useMemo, useState } from "react";

type CalculatorState = {
  missedCallsPerWeek: number;
  opportunityRate: number;
  repairTicket: number;
  installRate: number;
  installValue: number;
  callbackConversionRate: number;
  recoveryRate: number;
};

type PlanKey = "starter" | "growth" | "pro" | "multi";

type PricingPlan = {
  key: PlanKey;
  tier: string;
  price: string;
  note: string;
  bestFor: string;
  highlighted?: boolean;
};

const defaults: CalculatorState = {
  missedCallsPerWeek: 12,
  opportunityRate: 60,
  repairTicket: 500,
  installRate: 15,
  installValue: 9500,
  callbackConversionRate: 35,
  recoveryRate: 65,
};

const weeksPerMonth = 4.33;
const calendlyUrl =
  "https://calendly.com/maddexternes-chairfill-demo/chairfill-front-desk-demo";

const pricing: PricingPlan[] = [
  {
    key: "starter",
    tier: "Starter",
    price: "$997 setup + $757/mo",
    note: "For single-location shops that need instant missed-call text-back and basic follow-up.",
    bestFor: "Lower call volume, one location, and a simple missed-call recovery layer.",
  },
  {
    key: "growth",
    tier: "Growth",
    price: "$1,497 setup + $997/mo",
    note: "For HVAC companies with steady service-call volume and install opportunities.",
    bestFor: "Most shops getting enough missed calls that one recovered install changes the math.",
    highlighted: true,
  },
  {
    key: "pro",
    tier: "Pro",
    price: "$1,997 setup + $1,497/mo",
    note: "For teams that need stronger follow-up, quote recovery, review requests, and reporting.",
    bestFor: "Busy seasonal shops, active marketing spend, and higher-value replacement leads.",
  },
  {
    key: "multi",
    tier: "Multi-location",
    price: "Custom",
    note: "For operators that need location routing, rollout support, and consolidated visibility.",
    bestFor: "Multiple locations, dispatch complexity, or ownership groups.",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  }).format(value);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getRecommendedPlan(
  recoveredRevenuePerMonth: number,
  missedCallsPerWeek: number,
) {
  let planKey: PlanKey = "growth";
  let reason =
    "Your numbers show enough missed-call leakage that a dedicated recovery workflow is likely worth testing.";

  if (recoveredRevenuePerMonth < 7000 && missedCallsPerWeek < 10) {
    planKey = "starter";
    reason =
      "Your volume looks meaningful but contained. Start with missed-call text-back and simple follow-up.";
  } else if (recoveredRevenuePerMonth < 18000 && missedCallsPerWeek < 18) {
    planKey = "growth";
    reason =
      "Your numbers point to steady service-call and install leakage. Growth is the cleanest fit for most HVAC shops here.";
  } else if (recoveredRevenuePerMonth < 35000 && missedCallsPerWeek < 35) {
    planKey = "pro";
    reason =
      "Your missed-call volume is high enough that quote recovery, review requests, and reporting should be part of the system.";
  } else {
    planKey = "multi";
    reason =
      "Your volume suggests a larger rollout with routing, reporting, and location-specific recovery workflows.";
  }

  return {
    plan: pricing.find((item) => item.key === planKey) ?? pricing[1],
    reason,
  };
}

function SliderField({
  label,
  helper,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  helper: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-sm font-semibold text-[#F3F4F6]">{label}</span>
          <p className="mt-1 text-xs leading-5 text-[#B4BCC8]">{helper}</p>
        </div>
        <span className="shrink-0 rounded-full border border-[#2B3442] bg-[#0E1116] px-3 py-1 text-sm font-semibold text-[#F3F4F6]">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-2 w-full accent-[#3B82F6]"
      />
    </label>
  );
}

function CurrencyField({
  label,
  helper,
  value,
  onChange,
}: {
  label: string;
  helper: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#F3F4F6]">{label}</span>
      <p className="mt-1 text-xs leading-5 text-[#B4BCC8]">{helper}</p>
      <div className="mt-3 flex min-h-12 items-center rounded-xl border border-[#2B3442] bg-[#0E1116] px-4 focus-within:border-[#60A5FA]">
        <span className="mr-2 text-sm font-semibold text-[#64748B]">$</span>
        <input
          type="number"
          min={0}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full bg-transparent text-base font-semibold text-[#F3F4F6] outline-none"
        />
      </div>
    </label>
  );
}

function MetricCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "lost" | "recovered" | "neutral";
}) {
  const color =
    tone === "lost"
      ? "text-[#F97316]"
      : tone === "recovered"
        ? "text-[#22C55E]"
        : "text-[#F3F4F6]";

  return (
    <div className="rounded-xl border border-[#2B3442] bg-[#0E1116] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B4BCC8]">
        {label}
      </p>
      <p className={`mt-2 text-2xl font-semibold tracking-tight ${color}`}>
        {value}
      </p>
    </div>
  );
}

function CalculatorCard() {
  const [values, setValues] = useState<CalculatorState>(defaults);

  const results = useMemo(() => {
    const missedCallsPerMonth = values.missedCallsPerWeek * weeksPerMonth;
    const opportunities =
      missedCallsPerMonth * (values.opportunityRate / 100);
    const installLeads = opportunities * (values.installRate / 100);
    const repairJobs = opportunities - installLeads;
    const monthlyOpportunityValue =
      repairJobs * values.repairTicket + installLeads * values.installValue;
    const currentRecovered =
      monthlyOpportunityValue * (values.callbackConversionRate / 100);
    const monthlyRevenueLost = Math.max(
      0,
      monthlyOpportunityValue - currentRecovered,
    );
    const incrementalRecoveryRate = Math.max(
      0,
      (values.recoveryRate - values.callbackConversionRate) / 100,
    );
    const recoveredJobsPerMonth = opportunities * incrementalRecoveryRate;
    const recoveredRevenuePerMonth =
      monthlyOpportunityValue * incrementalRecoveryRate;
    const recommendation = getRecommendedPlan(
      recoveredRevenuePerMonth,
      values.missedCallsPerWeek,
    );

    return {
      monthlyRevenueLost,
      annualRevenueLost: monthlyRevenueLost * 12,
      recoveredJobsPerMonth,
      recoveredRevenuePerMonth,
      recoveredRevenuePerYear: recoveredRevenuePerMonth * 12,
      recommendation,
    };
  }, [values]);

  function updateField(field: keyof CalculatorState, value: number) {
    const safeValue = Number.isFinite(value) ? Math.max(0, value) : 0;

    setValues((current) => ({
      ...current,
      [field]:
        field === "repairTicket" || field === "installValue"
          ? safeValue
          : clamp(safeValue, 0, 100),
    }));
  }

  return (
    <div
      id="calculator"
      className="order-2 rounded-2xl border border-[#2B3442] bg-[#171B22] p-5 shadow-2xl shadow-black/40 sm:p-6 lg:order-none lg:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#60A5FA]">
            Missed-call revenue calculator
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#F3F4F6]">
            What is leaking before your team responds?
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setValues(defaults)}
          className="rounded-full border border-[#2B3442] px-4 py-2 text-sm font-semibold text-[#B4BCC8] transition hover:border-[#60A5FA] hover:text-[#F3F4F6]"
        >
          Reset defaults
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-[#DC2626]/30 bg-[#DC2626]/10 p-5">
        <p className="text-sm font-semibold text-[#F97316]">
          Estimated Annual Revenue Lost
        </p>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-[#F97316] sm:text-6xl">
          {formatCurrency(results.annualRevenueLost)}
        </p>
        <p className="mt-3 text-sm leading-6 text-[#B4BCC8]">
          This is revenue tied to missed calls that likely never becomes a
          booked service call, estimate, or install.
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <SliderField
          label="Missed calls per week"
          helper="How many calls are not answered live during a normal week."
          value={values.missedCallsPerWeek}
          min={0}
          max={50}
          onChange={(value) => updateField("missedCallsPerWeek", value)}
        />
        <SliderField
          label="Real job opportunities"
          helper="The share of missed calls that could become paid work."
          value={values.opportunityRate}
          min={0}
          max={100}
          suffix="%"
          onChange={(value) => updateField("opportunityRate", value)}
        />
        <CurrencyField
          label="Average repair ticket"
          helper="Typical repair, maintenance, or service-call value."
          value={values.repairTicket}
          onChange={(value) => updateField("repairTicket", value)}
        />
        <SliderField
          label="Install/replacement leads"
          helper="The share of opportunities that could become larger jobs."
          value={values.installRate}
          min={0}
          max={60}
          suffix="%"
          onChange={(value) => updateField("installRate", value)}
        />
        <CurrencyField
          label="Average install/replacement value"
          helper="Typical replacement, install, or higher-ticket estimate."
          value={values.installValue}
          onChange={(value) => updateField("installValue", value)}
        />
        <SliderField
          label="Current callback conversion rate"
          helper="How often missed callers book after your team calls back."
          value={values.callbackConversionRate}
          min={0}
          max={100}
          suffix="%"
          onChange={(value) => updateField("callbackConversionRate", value)}
        />
        <SliderField
          label="ChairFill estimated recovery rate"
          helper="Estimated recovered opportunities with instant text-back and follow-up."
          value={values.recoveryRate}
          min={0}
          max={100}
          suffix="%"
          onChange={(value) => updateField("recoveryRate", value)}
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <MetricCard
          label="Monthly revenue lost"
          value={formatCurrency(results.monthlyRevenueLost)}
          tone="lost"
        />
        <MetricCard
          label="Annual revenue lost"
          value={formatCurrency(results.annualRevenueLost)}
          tone="lost"
        />
        <MetricCard
          label="Jobs recovered per month"
          value={formatNumber(results.recoveredJobsPerMonth)}
          tone="recovered"
        />
        <MetricCard
          label="Recovered per month"
          value={formatCurrency(results.recoveredRevenuePerMonth)}
          tone="recovered"
        />
      </div>

      <div className="mt-3 rounded-xl border border-[#22C55E]/25 bg-[#22C55E]/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B4BCC8]">
          Revenue potentially recovered per year
        </p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-[#22C55E]">
          {formatCurrency(results.recoveredRevenuePerYear)}
        </p>
      </div>

      <div className="mt-3 rounded-xl border border-[#3B82F6]/40 bg-[#3B82F6]/10 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#60A5FA]">
              Recommended fit
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-[#F3F4F6]">
              {results.recommendation.plan.tier}
            </p>
          </div>
          <span className="rounded-full bg-[#3B82F6] px-3 py-1 text-xs font-semibold text-white">
            {results.recommendation.plan.price}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-[#B4BCC8]">
          {results.recommendation.reason}
        </p>
      </div>

      <p className="mt-5 text-sm font-semibold leading-6 text-[#F97316]">
        Even one missed install can cost more than ChairFill for an entire year.
      </p>

      <a
        href={calendlyUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#3B82F6] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#60A5FA]"
      >
        Book Revenue Audit
      </a>
    </div>
  );
}

const timeline = [
  {
    title: "Missed call",
    text: "The customer calls after hours or while the office is slammed.",
  },
  {
    title: "Instant SMS",
    text: "ChairFill replies before they call the next HVAC company.",
  },
  {
    title: "Qualification",
    text: "The system captures urgency, service need, and job type.",
  },
  {
    title: "Booked appointment",
    text: "Your team sees a clean recovered lead instead of a dead voicemail.",
  },
];

export function CalculatorFirstLanding() {
  return (
    <main className="min-h-screen bg-[#0E1116] text-[#F3F4F6]">
      <header className="border-b border-[#2B3442] bg-[#0E1116]/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-xl font-semibold tracking-tight">
            ChairFill
          </a>
          <div className="flex items-center gap-3">
            <a
              href="#demo"
              className="hidden rounded-full border border-[#2B3442] px-4 py-2 text-sm font-semibold text-[#B4BCC8] transition hover:border-[#60A5FA] hover:text-[#F3F4F6] sm:inline-flex"
            >
              See Demo
            </a>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#60A5FA]"
            >
              Book Call
            </a>
          </div>
        </nav>
      </header>

      <section className="px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="contents lg:block">
            <div className="contents lg:sticky lg:top-24 lg:block">
              <div className="order-1">
                <p className="inline-flex rounded-full border border-[#2B3442] bg-[#171B22] px-4 py-2 text-sm font-semibold text-[#60A5FA]">
                  HVAC missed-call recovery system
                </p>
                <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-[#F3F4F6] sm:text-5xl lg:text-6xl">
                  How Much Revenue Are Missed Calls Costing Your HVAC Company?
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[#B4BCC8]">
                  Use the calculator below to estimate how many repair jobs,
                  install leads, and after-hours emergencies are slipping
                  through before your team can respond.
                </p>
              </div>

              <div className="order-3 mt-7 rounded-2xl border border-[#2B3442] bg-[#171B22] p-5 lg:order-none">
                <p className="text-base font-semibold leading-7 text-[#F3F4F6]">
                  The expensive part is not the missed call. It is the customer
                  who needed service and found someone faster.
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-[#B4BCC8]">
                  {[
                    "Missed calls after hours",
                    "Slow follow-up during busy seasons",
                    "Lost installs from unreturned leads",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[#22C55E]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#demo"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[#3B82F6] px-6 py-3.5 text-sm font-semibold text-[#F3F4F6] transition hover:bg-[#1E2430]"
                >
                  Watch a Missed Call Turn Into a Booked Job
                </a>
              </div>
            </div>
          </div>

          <CalculatorCard />
        </div>
      </section>

      <section className="border-y border-[#2B3442] bg-[#171B22] px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#60A5FA]">
              After the missed call
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#F3F4F6] sm:text-4xl">
              What happens after a missed call?
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#B4BCC8]">
              ChairFill is built to recover the lead before the homeowner moves
              on. The flow is simple, fast, and built around booked jobs.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {timeline.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#2B3442] bg-[#0E1116] p-5 transition hover:bg-[#1E2430]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-[#F3F4F6]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#B4BCC8]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-2xl border border-[#2B3442] bg-[#171B22] p-6 shadow-xl shadow-black/20 lg:grid-cols-[1fr_auto] lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#60A5FA]">
              Demo preview
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#F3F4F6] sm:text-4xl">
              See the missed-call recovery flow before you book a call.
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#B4BCC8]">
              Watch an after-hours AC lead get qualified and moved into a
              booked job window. No platform tour. Just the workflow that
              stops the leak.
            </p>
          </div>
          <a
            href="/demo"
            className="inline-flex items-center justify-center rounded-full bg-[#3B82F6] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#60A5FA]"
          >
            See the Missed Call Recovery Demo
          </a>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-[#2B3442] bg-[#171B22] p-6 shadow-xl shadow-black/20 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#60A5FA]">
                Trust proof
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#F3F4F6]">
                Example HVAC company
              </h2>
              <p className="mt-4 text-base leading-7 text-[#B4BCC8]">
                A simple missed-call recovery workflow can pay for itself fast
                when it catches the calls that usually die in voicemail.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <MetricCard
                label="Jobs recovered"
                value="17 in 60 days"
                tone="recovered"
              />
              <MetricCard
                label="Recovered revenue"
                value="$14,200"
                tone="recovered"
              />
              <MetricCard
                label="Response time"
                value="3 hr → 22 sec"
                tone="neutral"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#2B3442] bg-[#171B22] px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#60A5FA]">
              Pricing anchor
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#F3F4F6] sm:text-4xl">
              Priced against recovered jobs, not software seats.
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#B4BCC8]">
              If the calculator says one install can cover the system, the next
              step is seeing whether your call flow has the same leak.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {pricing.map((plan) => (
              <article
                key={plan.tier}
                className={`rounded-2xl border p-6 shadow-xl shadow-black/20 ${
                  plan.highlighted
                    ? "border-[#3B82F6] bg-[#1E2430]"
                    : "border-[#2B3442] bg-[#0E1116]"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#60A5FA]">
                  {plan.tier}
                </p>
                {plan.highlighted ? (
                  <span className="mt-3 inline-flex rounded-full bg-[#3B82F6] px-3 py-1 text-xs font-semibold text-white">
                    Most common fit
                  </span>
                ) : null}
                <p className="mt-4 text-3xl font-semibold tracking-tight text-[#F3F4F6]">
                  {plan.price}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#B4BCC8]">
                  {plan.note}
                </p>
                <p className="mt-5 border-t border-[#2B3442] pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                  Best for
                </p>
                <p className="mt-2 text-sm leading-6 text-[#B4BCC8]">
                  {plan.bestFor}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="book-call" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center rounded-2xl border border-[#2B3442] bg-[#171B22] p-8 text-center shadow-2xl shadow-black/30 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#60A5FA]">
            Final step
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[#F3F4F6] sm:text-5xl">
            Book a 15-Min HVAC Revenue Audit
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#B4BCC8]">
            We will look at your missed-call volume, after-hours coverage, and
            follow-up process. You will know if ChairFill can pay for itself.
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#3B82F6] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#60A5FA]"
          >
            Book a 15-Min HVAC Revenue Audit
          </a>
        </div>
      </section>
    </main>
  );
}
