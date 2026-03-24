# AVO Landing Page — Light Version Prompt (Stitch)

Create a light theme version of the existing AVO landing page. Use the current dark version as the structural base. Do NOT redesign from scratch. Keep every section, all content, all CTAs, and the full page flow identical. This is a theme adaptation only.

---

## What Stays Identical

- All text content (headlines, body copy, labels)
- All section order and layout
- All CTAs: "Book a pilot", "See the flow"
- Hero headline, eyebrow label, flow cards
- Section structure: Hero → Problem → Solution → How it works → Use cases → Integrations → Pilot CTA → Footer
- Form behavior (inline success message, no backend)
- Food hall "Coming Soon" overlay treatment
- "No forced rip-and-replace" callout
- All anchor links and nav structure

---

## Theme Direction

**Target feel:** Clean, editorial, premium hospitality-tech — not a generic white SaaS page.
Think: architectural firm meets modern B2B software. Bright but structured. Not clinical.

The light version should feel like the same product photographed in daylight. Same precision, different atmosphere.

---

## Color System — Full Replacement

The dark palette must be replaced entirely. Do NOT simply invert the dark colors.

### Backgrounds & Surfaces

| Dark version | Light version |
|---|---|
| `#0b1326` (background) | `#F8FAFC` |
| `#131b2e` (surface-container-low) | `#F1F5F9` |
| `#171f33` (surface-container) | `#E8EFF5` |
| `#222a3d` (surface-container-high) | `#DDEAF4` |
| `#2d3449` (surface-container-highest) | `#CBD8E8` |
| `#060e20` (surface-container-lowest) | `#EEF4FB` |
| `#31394d` (surface-bright) | `#FFFFFF` |

### Text Colors

| Dark version | Light version |
|---|---|
| `#dae2fd` (on-surface / on-background) | `#0F172A` |
| `#bbcac6` (on-surface-variant) | `#475569` |

### Primary / Accent

> ⚠️ Critical: The dark version's teal (`#4fdbc8`) is too light for use on white backgrounds — it fails contrast requirements for text and small UI elements.

| Usage | Dark version | Light version |
|---|---|---|
| CTA buttons (filled) | `#4fdbc8` bg | `#0d9488` bg with white text |
| Accent text / icons | `#4fdbc8` | `#0d9488` |
| Gradient text (hero) | `#4fdbc8 → #14b8a6` | `#0d9488 → #0f766e` |
| Hover glows | `rgba(79,219,200,0.3)` | `rgba(13,148,136,0.15)` |
| Subtle tints / backgrounds | `primary/10` | `#0d9488/8` |
| Borders / outlines | `#3c4947` | `#CBD5D1` |

### Buttons

- **Primary button:** `bg-[#0d9488]` with white text. Hover: slight darken + subtle shadow.
- **Secondary / ghost button:** `border-[#CBD5D1]` with `text-[#0F172A]`. Hover: light gray fill.

---

## Component Adaptations

### Nav
- Background: `#F8FAFC/90` with `backdrop-blur-xl`
- Border bottom: `#CBD5D1/60`
- Shadow: `0 4px 20px rgba(0,0,0,0.06)`
- AVO logo: `#0d9488`
- Nav links: `#334155` hover → `#0d9488`

### Glass Cards (`.glass-card`)
Replace glassmorphism with a clean card style:
- Background: `#FFFFFF`
- Border: `1px solid #E2EAF1`
- Shadow: `0 2px 12px rgba(0,0,0,0.06)`
- Remove `backdrop-filter: blur`
- On hover: shadow deepens slightly, left accent bar appears in `#0d9488`

### Hero Flow Cards (right side mockup)
- Container background: `#EEF4FB`
- Card background: `#FFFFFF`
- Left border accent: `#0d9488`
- Text: dark (`#0F172A`)
- Step labels: `#64748B`
- Decorative glows: remove or replace with very subtle `#0d9488/5` blur

### Problem Section Cards
- Background: `#FFFFFF` cards on `#F1F5F9` section
- Icon color: `#0d9488`
- Left hover accent: `#0d9488`

### Solution Section Pillars
- Card backgrounds: `#FFFFFF` with `border: #E2EAF1`
- Inner mockup areas: `#F1F5F9`
- Label text: `#0d9488`

### "No forced rip-and-replace" Callout
- Keep the filled/bold treatment
- Use `bg-[#0d9488]` with white text (same visual weight as dark version)
- Or use `bg-[#F0FDFA]` with `border-l-4 border-[#0d9488]` and `text-[#0F172A]` for a subtler light-mode-appropriate version

### Architecture Diagram
- Outer container: `#F8FAFC` with `border: #E2EAF1`
- "AVO ORCHESTRATION" box: `bg-[#0d9488]/10` with `border-2 border-[#0d9488]`, text `#0d9488`
- System cards: `#FFFFFF` with `border: #E2EAF1`
- Arrow icons: `#0d9488/60`

### Food Hall "Coming Soon" Overlay
- Overlay: `bg-white/85` with `backdrop-blur-sm`
- "Coming Soon" badge: `bg-[#0d9488]/10 text-[#0d9488] border-[#0d9488]/30`
- Blurred card behind: keep blur treatment, adjust for light palette

### Pilot CTA Section
- Remove the dark glow blob
- Use a clean `#F1F5F9` background or a soft `linear-gradient(135deg, #F0FDFA, #F1F5F9)`
- Form container: `#FFFFFF` with `border: #CBD5D1`
- Input field: `#F8FAFC` background, `border: #CBD5D1`, focus ring `#0d9488`
- Submit button: `bg-[#0d9488]` with white text

### Footer
- Background: `#0F172A` — **keep footer dark**. A dark footer on a light page is a common premium pattern and creates strong visual closure.
- All existing footer content, colors, and structure remain unchanged.

---

## Gradient Text

Replace the hero gradient:

```css
/* Dark version */
background: linear-gradient(135deg, #4fdbc8 0%, #14b8a6 100%);

/* Light version */
background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
```

---

## Accessibility Requirements

With light backgrounds, contrast becomes more critical:

- All body text (`#0F172A` on `#F8FAFC`): well above 7:1 — keep as-is.
- Secondary text (`#475569` on `#F8FAFC`): ~5.5:1 — acceptable.
- Accent text (`#0d9488` on `#FFFFFF`): verify meets 4.5:1 minimum. (It does: ~4.6:1)
- **Never use `#4fdbc8` as text on white** — it fails contrast entirely.
- CTA button text must be white on `#0d9488` background.

---

## What NOT to Do

- Do NOT use pure `#FFFFFF` as the only background — layer with `#F8FAFC` and `#F1F5F9` for depth.
- Do NOT use `#4fdbc8` for any text, labels, or small UI elements on light backgrounds.
- Do NOT remove the dark footer.
- Do NOT redesign sections — only recolor.
- Do NOT add new sections or remove existing ones.
- Do NOT change any copy, headlines, or CTAs.

---

## Output

Return a complete single-file HTML page — the light theme version of the current AVO landing page.
Same structure. Same content. New color atmosphere.
