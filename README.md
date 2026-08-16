# Hormuz Shield

A continuity-ops console for businesses navigating a sustained Strait of Hormuz closure. Logistics-first: the **Reroute Orchestrator** and **EnergySwap** marketplace are the core product; **HedgeAI** is a secondary module that reacts to reroute/sourcing decisions with proposed financial hedges.

Built for the "Strait of Hormuz: Design an Alternative" challenge.

## Stack
Next.js 14 (App Router) + TypeScript + Tailwind CSS. All data is mocked client-side (`lib/data.ts`) — no backend required.

## Pages
- `/` — Ops Deck (dashboard, route ledger, cargo at risk)
- `/reroute` — Reroute Orchestrator (select shipment → compare ranked routes → confirm)
- `/marketplace` — EnergySwap (alternate supplier sourcing)
- `/hedge` — HedgeAI (financial hedges triggered by reroute/sourcing decisions)
- `/system` — Architecture, workflow, and go-to-market

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel
**Option A — CLI**
```bash
npm i -g vercel
vercel
```
Follow the prompts (accept defaults — Vercel auto-detects Next.js).

**Option B — GitHub**
1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Vercel auto-detects the Next.js framework preset — click Deploy.

No environment variables are required.
