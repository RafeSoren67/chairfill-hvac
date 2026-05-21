"use client";

import { useMemo, useState } from "react";

type CalculatorState = {
  monthlyCalls: number;
  missedRate: number;
  averageJobValue: number;
  recoveryRate: number;
};

const defaults: CalculatorState = {
  monthlyCalls: 150,
  missedRate: 20,
  averageJobValue: 850,
  recoveryRate: 25,
};

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

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value));
}

function Field({
  label,
  value,
  prefix,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#07182f]">{label}</span>
      <div className="mt-2 flex min-h-12 items-center rounded-xl border border-slate-300 bg-white px-4 focus-within:border-[#0d4f8b]">
        {prefix ? (
          <span className="mr-2 text-sm font-semibold text-slate-500">
            {prefix}
          </span>
        ) : null}
        <input
          type="number"
          min={0}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full bg-transparent text-base font-semibold text-[#07182f] outline-none"
        />
        {suffix ? (
          <span className="ml-2 text-sm font-semibold text-slate-500">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

export function RevenueLeakCalculator() {
  const [values, setValues] = useState<CalculatorState>(defaults);

  const results = useMemo(() => {
    const missedCalls = values.monthlyCalls * (values.missedRate / 100);
    const recoveredJobs = missedCalls * (values.recoveryRate / 100);
    const monthlyRecoveredRevenue = recoveredJobs * values.averageJobValue;
    const annualRecoveredRevenue = monthlyRecoveredRevenue * 12;

    return {
      missedCalls,
      recoveredJobs,
      monthlyRecoveredRevenue,
      annualRecoveredRevenue,
    };
  }, [values]);

  function updateField(field: keyof CalculatorState, value: number) {
    const safeValue = Number.isFinite(value) ? Math.max(0, value) : 0;

    setValues((existing) => ({
      ...existing,
      [field]:
        field === "missedRate" || field === "recoveryRate"
          ? clampPercent(safeValue)
          : safeValue,
    }));
  }

  return (
    <section
      id="calculator"
      className="border-y border-slate-200 bg-white px-5 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
            Revenue leak calculator
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#07182f] sm:text-5xl">
            Estimate how much missed calls cost your HVAC business
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Use your own call volume, missed-call rate, average job value, and
            recovery target to see what instant follow-up could put back on the
            board.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Monthly inbound calls"
                value={values.monthlyCalls}
                onChange={(value) => updateField("monthlyCalls", value)}
              />
              <Field
                label="Estimated missed call percentage"
                suffix="%"
                value={values.missedRate}
                onChange={(value) => updateField("missedRate", value)}
              />
              <Field
                label="Average job value"
                prefix="$"
                value={values.averageJobValue}
                onChange={(value) => updateField("averageJobValue", value)}
              />
              <Field
                label="Estimated recovery rate"
                suffix="%"
                value={values.recoveryRate}
                onChange={(value) => updateField("recoveryRate", value)}
              />
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-500">
              These numbers are estimates for sales planning. Actual results
              depend on market, seasonality, response workflow, and booking
              conversion.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#07182f] p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">
              Potential recovered revenue
            </p>
            <div className="mt-5 rounded-2xl bg-white/10 p-6">
              <p className="text-sm font-medium text-blue-100">
                Potential recovered revenue per year
              </p>
              <p className="mt-2 text-5xl font-semibold tracking-tight sm:text-6xl">
                {formatCurrency(results.annualRecoveredRevenue)}
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-100">
                  Missed calls
                </p>
                <p className="mt-2 text-2xl font-semibold">
                  {formatNumber(results.missedCalls)}
                </p>
                <p className="mt-1 text-xs text-slate-300">per month</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-100">
                  Recovered jobs
                </p>
                <p className="mt-2 text-2xl font-semibold">
                  {formatNumber(results.recoveredJobs)}
                </p>
                <p className="mt-1 text-xs text-slate-300">per month</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-100">
                  Revenue
                </p>
                <p className="mt-2 text-2xl font-semibold">
                  {formatCurrency(results.monthlyRecoveredRevenue)}
                </p>
                <p className="mt-1 text-xs text-slate-300">per month</p>
              </div>
            </div>

            <a
              href="#demo"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#07182f] transition hover:bg-slate-100 sm:w-auto"
            >
              See how ChairFill recovers these jobs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
