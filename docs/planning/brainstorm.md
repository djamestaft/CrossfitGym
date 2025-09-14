# GMC Site Revamp — MVP Brainstorm Doc‑Out

**Client:** Geelong Movement Co (CrossFit + Physiotherapy)
**Timeline:** 3–4 weeks (MVP)
**Tech:** Next.js (Vercel Free pilot), Sanity (CMS), Fitbox (classes), Tawk.to (chat)

---

## Executive Summary

Redesign the GMC website to convert visitors into **FMS (Functional Movement Screen) leads**, showcase a **read‑only timetable**, build a **member portal** that strengthens retention, and publish a **credible medical‑grade blog**. Keep costs near zero in pilot, with clean toggles to scale post‑MVP (Cliniko embeds, heatmap capacity, trials, payments).

---

## Goals & KPIs

- **Primary Goal:** Increase qualified **FMS leads** and reduce time to first session.
- **Secondary Goals:** Boost member stickiness (portal usage), grow organic traffic (blog/KB), and improve referral conversions.
- **KPIs (weekly):** FMS lead submissions • Intro show‑up rate (manual) • Referral shares/clicks • Blog sessions • Portal visits • Chat opens.

---

## Key Decisions (Locked for MVP)

- **Hosting:** Vercel Free (pilot), plan upgrade to Pro before monetized launch.
- **Classes:** Keep **Fitbox** as system of record. **MVP:** show **upcoming classes only** (no on‑site booking), link out if needed.
- **Physio:** Lead‑gen form first; **phase in Cliniko embed post‑MVP**.
- **Support:** **Tawk.to** chat (CMS toggle).
- **CMS:** **Sanity Free** — “Sanity for everything CMS‑able.”
- **Free Trials:** Omit for MVP; can enable later via CMS toggle.

---

## What’s In vs Out (MVP)

**In**

- FMS lead funnel (site‑wide primary CTA)
- Read‑only timetable (Upcoming Classes)
- Member Portal (programming notes, movement/mobility library, FAQs)
- Refer‑a‑Friend page + share copy (Messenger/Instagram DM focus)
- Reviews carousel (Google reviews, CMS‑seeded for MVP)
- Sanity‑powered **FAQ as Knowledge Base**
- Medical‑grade **Blog** with filters, categories, tags
- Analytics (GA4 events) & consent‑aware chat/tracking

**Out (post‑MVP or phase‑in)**

- Direct class booking on‑site
- Cliniko booking embed (toggle later)
- Class capacity heatmap (infrastructure only now)
- Streaks/milestones gamification
- Free trial funnel
- Stripe/online payments

---

## Big‑Impact Initiatives (with your choices applied)

### A) Conversion (lead → member)

1. **FMS as primary CTA** (replaces No‑Sweat Intro). 2‑step lead form → confirmation email.
2. **Pricing clarity** page (no free trial at launch). Plans & inclusions managed in CMS.
3. **Upcoming Classes** block on Home (read‑only). No on‑site booking; optional link to Fitbox.
4. **Chat widget** (Tawk.to) — CMS toggle; canned replies for “Which class is right for me?”
5. **Google Reviews carousel** — modern, animated, CMS‑seeded (8–10 best) for trust.

### B) Retention (member → advocate)

6. **Member Portal (MVP)** — programming notes, movement library, mobility flows, FAQs.
7. **Capacity heatmap**: not in MVP; **leave hooks/infrastructure** for later wiring.
8. **Achievements/streaks**: **omit**.
9. **Refer‑a‑Friend** — dedicated page, share to **Messenger/Instagram DM**; UTM tracking; incentive copy in CMS.

### C) Physio × CrossFit Flywheel

10. **Lead‑gen first** on Physio page (screening micro‑form + contact). **Direct Cliniko** bookings phased in later.
11. **Condition hubs** (e.g., Shoulder, Low Back): evidence‑based articles, exercise mini‑flows, and clear call‑to‑action.

### D) Content, SEO & Ops

12. **Local SEO**: schema for SportsActivityLocation + MedicalClinic; location copy; NAP consistency.
13. **Drop‑in traveler** support via copy in Timetable/Programs (booking still via Fitbox if linked).
14. **Sanity‑first content**: Blog, FAQ/KB, schedules (read‑only), reviews, toggles, nav, banners.
15. **Analytics**: GA4 events (`lead_fms_submit`, `lead_physio_submit`, `referral_share`, `chat_open`, `post_read`).

---

## Information Architecture (Sitemap)

**Keep the header lean (≤6 items)**. Group secondary pages under two drop‑downs and move the rest to footer.

**Header (6 items max)**

- **Home**
- **Training ▾** — Timetable • Programs • Coaches
- **Physiotherapy**
- **Memberships**
- **Learn ▾** — Blog • Knowledge Base • Success Stories
- **Contact**

**Persistent CTA (right‑aligned, not a nav item):** **Book FMS**
**Utility (icon/overflow):** Member Portal (visible after login), Refer‑a‑Friend
**Mobile:** Collapsible sections for **Training** and **Learn**, with a primary **Book FMS** button pinned.

**Footer groups**

- **Company:** About (folded into Coaches/Programs), Location/Map, Policies
- **Community:** Refer‑a‑Friend, Success Stories, Socials
- **Resources:** Blog, Knowledge Base, FAQs
- **Account:** Member Portal, Staff login

---

## Pages (MVP) — Purpose & Key Modules (Grouped Routes)

### Top‑level routes (linked from header)

1. **Home** — Hero with FMS CTA • Upcoming Classes (read‑only) • Reviews carousel • Physio teaser • FAQs • Member stories.
2. **Training** (landing) — Explains programs + links to Timetable, Programs, Coaches.
   - **/timetable** — Read‑only schedule preview (next 3–7 days) • Optional links to Fitbox.
   - **/training/programs** — CrossFit, Foundations, Weightlifting, etc.
   - **/training/coaches** — Bios, qualifications, coach philosophy.

3. **Physiotherapy** — Services overview • Lead‑gen form • Condition hubs • _(Cliniko embed toggle OFF for MVP)._
4. **Memberships** — Plan cards (no free trial) • “What’s right for me?” hints • FMS CTA.
5. **Learn** (landing) — Explains content value + quick filters.
   - **/blog** — Filter by category/tag, reading time, related posts, TOC for long‑form.
   - **/faq** — Knowledge Base with categories, search, deep links.
   - **/success‑stories** — Testimonials, short member spotlights.

6. **Contact** — Form • map • key info.

### Utility & CTA (not in main nav)

- **/book‑fms** — 2‑step lead form • Success page with “what happens next”. _(Primary CTA button site‑wide)._
- **/refer** — Share link + copy, Messenger/Instagram focus. _(Link via utility/overflow + footer.)_
- **/portal** — Gated landing; programming notes; movement/mobility library. _(Shows in utility once authenticated.)_

### Notes to preserve MVP constraints

- **Classes:** show Upcoming only (no on‑site booking).
- **Physio:** Lead‑gen first; Cliniko embed is a CMS toggle (default OFF).
- **Trials:** Excluded at launch; controlled by CMS toggle later.
- **Chat:** Tawk.to present but consent/enable controlled via CMS.
- **Reviews:** Google reviews carousel, CMS‑seeded (8–10 best) for MVP.

---

## Sanity Content Model (Summary)

- **siteSettings**: brand, hero copy, primary CTA, chat toggle, review source.
- **navigation**: items (title, href, show).
- **homePage**: hero fields, feature toggles, featured posts.
- **schedule**: `sessions[] { date, timeStart, timeEnd, program, coach, note }` (read‑only display).
- **membershipPlan**: name, price, billing, features, show.
- **leadFormCopy**: FMS/Physio copy variants (headline, subhead, success content).
- **faqCategory**, **faq**: Q/A rich text, categories.
- **coach**: name, headshot, quals, bio.
- **program**: name, description, imagery.
- **review**: author, rating, body, source, date (CMS‑seeded).
- **post**, **category**, **tag**, **author**: standard blog model.
- **portalResource**: title, type (programming/movement/mobility/faq), body, videoUrl, weekTag.
- **referralCampaign**: slug, headline, rewards copy, landing copy, active.
- **featureToggles**: enableFreeTrial, enableClinikoEmbed, enableHeatmapBadges.

---

## Build Plan & Deliverables (3–4 Weeks)

**Week 1 — Foundations & CMS**

- Repo + stack on Vercel (envs, CI).
- Sanity Studio + schemas scaffolded; desk structure groups.
- Global layout (Header, Footer) with CMS‑driven nav/footer.
- Settings loader (flags across app).

**Week 2 — Core UX & Content**

- Home with FMS hero, reviews, schedule preview.
- Timetable (read‑only) with Fitbox linkouts.
- Memberships (no free trial).
- Physiotherapy (lead‑gen) with Cliniko toggle OFF.
- FAQ (filters + search).

**Week 3 — Conversion, Portal, Blog**

- FMS lead flow + success page.
- Member Portal (gate + resources).
- Blog index + post page (filters, related posts).
- Refer‑a‑Friend page (share/copy, UTM).

**Week 4 — Polish & Launch**

- Tawk.to integration (consent‑aware, toggle).
- Micro‑animations + accessibility pass.
- SEO: schema, metadata, OG/Twitter.
- GA4 events; content load; QA; go‑live.

---

## Analytics & Reporting

- **Events:** `lead_fms_submit`, `lead_physio_submit`, `referral_share`, `chat_open`, `post_read`.
- **Dashboards:** weekly roll‑up with traffic sources, conversion rates, top posts, portal usage.

---

## Risks & Mitigations

- **Hosting limits (Vercel Free):** plan upgrade before monetized launch.
- **Reviews API billing:** seed reviews in CMS; add API + cache later.
- **Auth complexity for Portal:** if magic‑link slips timeline, start with passcode gate.

---

## Competitor Lens (for messaging & UX standards)

**Local CrossFit:** CrossFit Raven • CrossFit Barwon • CrossFit Ocean Grove • CrossFit Geelong • CrossFit Bells Beach
**Corporate:** BFT (North Geelong, Geelong West) • F45 • The Yard • Phelan Strong Training

**Differentiators to emphasize**

- On‑site **Physio** with a pragmatic **“train around pain”** pathway.
- FMS‑first approach (quality consult > free trials).
- **Knowledge Base** depth (physio‑authored) and filterable condition hubs.
- Member **portal value** and a clear **referral program**.

---

## Content Load Checklist (Launch‑ready)

- [ ] 8–10 Google reviews curated in CMS
- [ ] 6–8 knowledge base articles (2 condition hubs)
- [ ] 3 member stories (short video + text)
- [ ] 2+ coach bios & photos
- [ ] Schedule sessions for next 2 weeks
- [ ] Membership plan copy & inclusions
- [ ] FMS & Physio lead‑form copy

**Done = Deployed.** This doc is your clean blueprint for building the MVP quickly while leaving smart hooks for post‑MVP scale.
