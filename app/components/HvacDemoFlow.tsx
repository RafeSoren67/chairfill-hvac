"use client";

import { useState } from "react";

type Message = {
  from: "ChairFill" | "Customer";
  text: string;
};

const messagesByStep: Message[][] = [
  [],
  [
    {
      from: "ChairFill",
      text: "Sorry we missed you - is your system completely out, partially working, or making noise?",
    },
    {
      from: "Customer",
      text: "Completely out",
    },
  ],
  [
    {
      from: "ChairFill",
      text: "Got it. Is this for cooling, heating, or maintenance?",
    },
    {
      from: "Customer",
      text: "Cooling",
    },
  ],
  [
    {
      from: "ChairFill",
      text: "We can have someone follow up first thing tomorrow. Which window works better: 8-10 AM or 10-12 PM?",
    },
    {
      from: "Customer",
      text: "8-10 AM",
    },
  ],
];

const buttonLabels = [
  "Start recovery",
  "Continue",
  "Continue",
  "Book job",
];

export function HvacDemoFlow() {
  const [step, setStep] = useState(0);
  const visibleMessages = messagesByStep.slice(1, Math.min(step, 3) + 1).flat();
  const isBooked = step >= 4;

  return (
    <section
      id="demo"
      className="bg-[#f8fafc] px-5 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
            After-hours recovery demo
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#07182f] sm:text-5xl">
            See ChairFill recover an after-hours HVAC lead
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            A missed emergency call becomes a qualified, booked opportunity
            without waiting until the next morning to respond.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0d4f8b]">
                  Missed call
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-[#07182f]">
                  Jake Miller
                </h3>
              </div>
              <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                Missed call
              </span>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="font-semibold text-[#07182f]">10:47 PM</span>
                <span className="text-slate-500">After hours</span>
              </div>
              <p className="mt-4 text-lg font-semibold leading-7 text-[#07182f]">
                "AC stopped working upstairs. Need help ASAP."
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                ChairFill responds instantly, qualifies the issue, and moves
                the lead toward a real appointment window.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setStep((current) => Math.min(current + 1, 4))}
              disabled={isBooked}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#07182f] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0b2445] disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
            >
              {isBooked ? "Job booked" : buttonLabels[step]}
            </button>
          </div>

          <div className="grid gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0d4f8b]">
                Text conversation
              </p>
              <div className="mt-5 min-h-[270px] space-y-4">
                {visibleMessages.length === 0 ? (
                  <div className="flex h-[240px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-[#f8fafc] px-6 text-center text-sm leading-6 text-slate-500">
                    Start the recovery flow to see the text exchange.
                  </div>
                ) : (
                  visibleMessages.map((message, index) => {
                    const fromCustomer = message.from === "Customer";

                    return (
                      <div
                        key={`${message.from}-${index}`}
                        className={`flex ${
                          fromCustomer ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                            fromCustomer
                              ? "bg-[#07182f] text-white"
                              : "bg-[#eaf3ff] text-[#07182f]"
                          }`}
                        >
                          <p className="mb-1 text-xs font-semibold opacity-75">
                            {message.from}
                          </p>
                          <p>{message.text}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {isBooked ? (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    Recovered Lead
                  </p>
                  <dl className="mt-5 space-y-3 text-sm">
                    {[
                      ["Customer", "Jake Miller"],
                      ["Issue", "AC completely out"],
                      ["Service", "Cooling"],
                      ["Window", "Tomorrow 8-10 AM"],
                      ["Estimated job value", "$850"],
                      ["Status", "Booked"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
                      >
                        <dt className="text-slate-500">{label}</dt>
                        <dd className="font-semibold text-[#07182f]">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-[#07182f] p-6 text-white shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-200">
                    Owner dashboard
                  </p>
                  <div className="mt-5 space-y-3">
                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-sm text-blue-100">
                        Recovered revenue opportunity
                      </p>
                      <p className="mt-1 text-3xl font-semibold">$850</p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-sm text-blue-100">Lead status</p>
                      <p className="mt-1 text-xl font-semibold">Booked</p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-sm text-blue-100">Response time</p>
                      <p className="mt-1 text-xl font-semibold">Instant</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(0)}
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#07182f] transition hover:border-[#0d4f8b] sm:w-auto"
              >
                Run demo again
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export const DemoFlow = HvacDemoFlow;
