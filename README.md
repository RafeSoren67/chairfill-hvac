# ChairFill HVAC

Standalone Next.js/Tailwind sales demo site for the HVAC version of ChairFill.

ChairFill is positioned here as a missed-call recovery and follow-up system for
HVAC companies. This project is a front-end demo only: no Twilio, OpenAI,
Calendly, Supabase, or production backend integrations are wired up.

## Run Locally

```bash
npm install
npm run dev
```

## Validate

```bash
npm run lint
npm run build
```

## Main Surfaces

- `/` - HVAC homepage with hero, pain points, offer section, calculator, and demo
- `/revenue-calculator` - standalone calculator route
- `/demo` - standalone after-hours HVAC lead recovery demo
- `/book-meeting` - static placeholder page for future scheduling
