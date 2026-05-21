import { RevenueLeakCalculator } from "../components/RevenueLeakCalculator";

export const metadata = {
  title: "ChairFill HVAC Revenue Leak Calculator",
  description:
    "Estimate how much missed calls could cost an HVAC company in lost service calls, estimates, and installs.",
};

export default function RevenueCalculatorPage() {
  return (
    <main className="min-h-screen bg-white text-[#091525]">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-xl font-semibold tracking-tight">
            ChairFill
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/demo"
              className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-[#07182f] sm:inline-flex"
            >
              View demo
            </a>
            <a
              href="/#calculator"
              className="rounded-full bg-[#07182f] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Calculate
            </a>
          </div>
        </nav>
      </header>
      <RevenueLeakCalculator />
    </main>
  );
}
