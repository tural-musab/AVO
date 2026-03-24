# AVO Landing Page — Refinement Prompt (Stitch)

Revise the current AVO landing page using the existing version as the base. Do NOT redesign from scratch. Keep the current dark premium SaaS aesthetic, overall structure, color palette, typography direction, and page flow. This is a refinement pass only.

---

## Brand

**AVO — Adaptive Venue Orchestration**

AVO is not a QR menu app, not a new POS, and not a delivery marketplace.
AVO is the orchestration layer between the table and the operation.
It connects hybrid service, order routing, and payment flow with existing venue systems.

---

## Goal

Make the current page launch-ready by fixing strategy and messaging mismatches while preserving the current visual direction.

---

## Keep (Do Not Change)

- Current hero headline: *"Service, orders, and payments — in one operational flow."*
- Current section order
- Current premium dark UI direction
- Current flow-first product positioning
- Primary CTA: **"Book a pilot"**
- Secondary CTA: **"See the flow"** → scrolls to `#how-it-works`
- Current hero flow card design (5-state cascade). Only adjust border visibility or label legibility if needed — do not restructure.
- Nav links already use correct anchors (`#how-it-works`, `#use-cases`, `#integrations`). Keep them as-is.

---

## Already Fixed in Current Version — Do Not Reintroduce

> The following issues were already corrected in the base file. Do not bring them back under any phrasing:
> - "7–14 days setup" claim → already replaced with *"Pilot timeline varies by venue and POS setup."*
> - "99.9% uptime" → already replaced with fallback-ready language.

---

## Critical Fixes Required

### 1. Payment messaging must align with pilot strategy

Do NOT imply that table-side payment is the default pilot mode.

Replace any wording that suggests "payment at the table" or "payment via phone" as a default promise. Use this direction instead:

> *"Payment when you're ready — starting with pay-at-counter, with table-side options where supported."*

Keep pilot messaging focused and practical.

### 2. Restaurant-first must remain dominant

- Keep **Single restaurant** and **Multi-brand operator** as the main active use cases.
- Keep **Shared seating / Food hall** only as a future-ready direction.
- Add a stronger "Coming soon" or "Future-ready" visual treatment to the Food hall card.
- Do not let Shared seating / Food hall feel like a current primary target segment.

### 3. Fix copyright year in footer

Change: `© 2024 AVO` → `© 2026 AVO`

### 4. Footer must feel intentional

- Short brand statement
- Slogan: *"Built for flow, not friction."*
- Contact path (e.g. `hello@avo-tech.io`)
- Optional subtle pilot CTA

---

## Section-by-Section Refinement

### Navigation
- Keep current nav structure and anchors as-is.
- "Book a pilot" scrolls to `#pilot-form`.
- Ensure the nav feels sticky and polished on scroll.

### Hero
- Keep current structure and 5-state flow card.
- Flow state labels to keep:
  - Service request received
  - Order routed
  - POS synced
  - Payment pending
  - Payment confirmed
- Keep eyebrow label: **HYBRID SERVICE ORCHESTRATION**

### Problem Section
- Keep the 4-card layout.
- Each card: one sharp title + one short operational sentence.
- Focus areas:
  - Staff attention delays
  - Ordering bottlenecks
  - Payment friction
  - Fragmented operations

### Solution Section
- Keep: Hybrid service · Integration-first · Built for real venues
- Visuals should feel product-relevant, not decorative.
- Highlight clearly: *"AVO replaces friction, not your core systems."*

### How It Works
- Keep current 4-step structure.
- Improve legibility of flow connectors slightly if needed.
- Sequence:
  1. Guest scans / requests / orders
  2. AVO routes the action
  3. Staff and systems stay aligned
  4. Payment and status move forward cleanly

### Use Cases
- Keep all three use case cards.
- Single restaurant and Multi-brand operator → active, primary.
- Shared seating / Food hall → clearly marked future-ready (stronger "Coming soon" treatment).
- If "Explore all cases" has no destination, remove it or replace with non-clickable microcopy.

### Integrations Section
- Keep "Integration without interruption."
- Architecture diagram should show: Guest touchpoints → AVO orchestration layer → POS / KDS / Payment / Staff View.
- Make "No forced rip-and-replace" very visible.
- Use credible hospitality-tech language:
  - Orders flow into existing systems
  - Status stays aligned
  - Operations remain connected

### Pilot CTA Section
- Focused pilot messaging:
  - One venue
  - Focused scope
  - Measurable outcome
  - Expansion after validation
- Email capture form with inline confirmation message on submit — no backend required. Do not add external links or redirects.

---

## Accessibility

- Normal text: aim for at least 4.5:1 contrast ratio.
- Large text / headings: aim for at least 3:1 contrast ratio.
- Avoid low-contrast secondary text on dark backgrounds.

---

## Output

Return a refined version of the current page — not a new concept.

Preserve the current direction. Fix only:
- Pilot / payment messaging (K-4 alignment)
- Shared seating emphasis (future-ready, not current)
- Copyright year (2024 → 2026)
- Footer completeness
- CTA realism (inline confirmation, no backend)
