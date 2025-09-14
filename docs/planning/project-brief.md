# GMC Project Brief (MVP) — Draft

**Client:** Geelong Movement Co (CrossFit + Physiotherapy)

**Date:** September 12, 2025
**Version:** 0.1 (Working Draft)
**Prepared by:** Mary — Business Analyst (BMAD)

---

## 1) Executive Summary (Draft)

Geelong Movement Co will ship a four‑week MVP website revamp that funnels visitors to a **Functional Movement Screen (FMS)** as the primary conversion event, while meeting table‑stakes for discovery and trust. The MVP prioritizes:

- **FMS‑first lead generation** with a clear two‑step form and expectation‑setting.
- **Read‑only class timetable** (no on‑site booking in MVP) to satisfy discovery without adding operational complexity.
- **Member Portal (lightweight)** to support retention (programming notes, movement/mobility library, FAQs).
- **Credible content engine** (Blog + FAQ/KB) to grow organic traffic and support a “train‑around‑pain” positioning.

To keep costs near zero and enable rapid iteration, the MVP uses **Next.js on Vercel (pilot)** with **Sanity CMS**, keeps **Fitbox** as the classes system of record, and enables **Tawk.to** chat via a CMS toggle. Post‑MVP toggles (Cliniko booking embed, capacity heatmap, trials, payments) are deliberately deferred but scaffolded for later activation.

**Primary outcome:** Increase qualified **FMS leads** and reduce time to first session. **Secondary outcomes:** improve member stickiness via the portal, strengthen local SEO with condition hubs/KB, and boost referral conversions via social proof and share mechanics.

---

## 2) Goals & KPIs

**Primary Goal**
Increase the volume and quality of **Functional Movement Screen (FMS)** submissions and convert them into first sessions efficiently and safely.

**Secondary Goals**

- Improve new‑member confidence via clear onboarding and “train‑around‑pain” positioning.
- Increase member stickiness via a lightweight portal (programming notes, movement library, FAQs).
- Strengthen local SEO and trust signals to drive discovery without paid media.

**KPIs (MVP window = first 4 weeks after launch)**

- **Leads:** Establish week‑1 FMS lead baseline; achieve **+50%** vs. baseline by week‑4.
- **Conversion:** FMS → first session **≥ 60%**; FMS form completion rate **≥ 70%**.
- **Time‑to‑First Session:** Median **≤ 5 days** from form submit.
- **Member Engagement:** ≥ **40%** of active members log into portal at least once per week.
- **Content/SEO:**
  - Publish **≥ 4** articles + **2** “condition hubs”; achieve **≥ 20%** organic traffic mix by week‑4.
  - Clicks from Google Business Profile (calls + directions) **+20%** vs. pre‑launch 4‑week average.

- **Quality/Performance:** Core Web Vitals thresholds (LCP ≤2.5s, CLS ≤0.1, INP ≤200ms) pass on 75%+ of page views; Uptime ≥ 99.9%.

**Measurement Plan**

- **GA4** events: `fms_start`, `fms_submit`, `first_session_booked` (manual tag/CRM note), `chat_open`, `call_click`, `map_click`, `portal_login`, `video_play`, `post_view`.
- **GSC/GBP**: monitor impressions/clicks for brand + local terms; track GBP call/directions events.
- **Ops sheet/CRM**: weekly cohort of FMS submissions and first sessions; compute conversion + median days.

---

## 3) Scope & Non‑Goals (MVP)

**In Scope**

- **Public site**: Home, FMS landing + 2‑step form, Programs (CrossFit, Physio, Fundamentals), “Train‑Around‑Pain”, Timetable (read‑only), Coaches, Facility, Pricing, Blog, FAQ/KB, Contact.
- **Member Portal (light):** Programming notes, Movement/Mobility library, Member FAQs.
- **Trust & Social Proof:** Testimonials, case snippets, memberships/affiliations, safety standards.
- **CMS & Components:** Sanity schemas; modular sections (hero, proof bar, FAQs, CTA band, timetable block).
- **Analytics & SEO:** GA4 + GSC; local schema (Org, LocalBusiness, FAQ, Article), NAP consistency, sitemap/robots.

**Out of Scope (deferred)**

- Online booking/payments; trial sign‑ups; advanced portal (PR tracking, messaging); CRM automation; e‑commerce; deep Fitbox write operations; native mobile app.

**Assumptions & Constraints**

- Fitbox remains **system of record** for classes; MVP only displays a read‑only timetable.
- Cliniko booking **embed reserved** for Post‑MVP toggle.
- Chat via **Tawk.to** (CMS toggle). Hosting on **Vercel**; CMS = **Sanity**.

---

## 4) Key Personas & Jobs‑To‑Be‑Done

1. **Cautious Beginner** — wants to get started safely, fears injury/confusion.
   JTBD: “Help me start with confidence so I don’t get hurt.”

2. **Returning Athlete (post‑niggle/injury)** — wants to train around pain.
   JTBD: “Show me a plan to train now while I rehab.”

3. **Busy Parent/Professional** — time poor, outcome focused.
   JTBD: “Give me efficient sessions and a clear path to results.”

4. **Current Member** — wants clarity on programming and technique.
   JTBD: “Keep me consistent and progressing.”

**Primary Value Props**

- Assessment‑led onboarding (FMS) → personalized plan.
- Physio‑informed coaching → confidence to train around pain.
- Community & accountability → sustainable progress.

---

## 5) Critical User Journeys (MVP)

**A. Visitor → FMS**

- Discover via search/social/referral → FMS landing → 2‑step form → confirmation page with next steps → staff follow‑up (call/text) → first session scheduled.

**B. Member → Portal**

- Login (email gate) → programming notes → movement video → FAQ.

**C. Searcher → Content Hub**

- Query (e.g., “shoulder pain crossfit”) → condition hub → related articles → low‑friction FMS CTA.

---

## 6) Information Architecture & Content Map

**Top Nav:** Home · Programs · Timetable · Pricing · Physio · Coaches · Blog · Member Portal · Contact

**Key Content Types**

- `page_home`, `page_program`, `page_physio`, `page_fms`, `page_pricing`, `page_contact`
- `post_article`, `post_condition_hub`, `kb_faq`, `component_testimonial`, `component_timetable`, `component_cta`

**Content Priorities (MVP)**

- FMS landing copy + visuals; 2 condition hubs (Shoulder, Low‑Back); 4 articles; ≥12 movement videos; 12 FAQs; ≥6 testimonials; ≥3 coach bios.

---

## 7) MVP Feature Requirements (Condensed)

**7.1 FMS Landing & Form**

- Two‑step form (Contact → Goals/Context).
- Success state: clear expectations + next‑step (we contact within 1 business day); optional calendar placeholder disabled in MVP.
- **Acceptance:** form validates, events fire, admin receives notification, lead stored (CMS/email/ops sheet), success page live.

**7.2 Timetable (Read‑Only)**

- Pull class schedule from Fitbox (or manual CMS block) and render responsive grid; no booking buttons in MVP.
- **Acceptance:** schedule renders on mobile/desktop; timezone/holiday notes supported.

**7.3 Member Portal (Light)**

- Auth gate (email or token link); sections for programming notes, movement library, FAQs.
- **Acceptance:** members can access, search movement names, play videos, and view notes.

**7.4 Trust & Proof**

- Testimonials carousel; “Safety/Standards” panel; coach bios with quals.
- **Acceptance:** ≥6 testimonials loaded; ≥3 coach bios with qualifications; schema valid; components complete.

**7.5 Chat Toggle**

- Tawk.to script flag via CMS; default **on** post‑launch week‑2.
- **Acceptance:** toggle works without deploy.

---

## 8) Tech Stack & Integrations

- **Frontend:** Next.js (App Router), Tailwind, shadcn/ui.
- **CMS:** Sanity (content studio, role‑based access, schemata above).
- **Hosting/CI:** Vercel (preview deploys, env vars, image optimization).
- **Integrations:** Fitbox (read‑only timetable), Tawk.to (chat), GA4 + GSC, GBP management.
- **Security/Privacy:** Cookie banner, privacy policy, form consent copy, reCAPTCHA/turnstile.

---

## 9) Analytics, Telemetry & QA

- **Events:** `fms_start`, `fms_submit`, `call_click`, `map_click`, `chat_open`, `portal_login`, `video_play`, `post_view`.
- **Funnels:** FMS → first session; content → FMS.
- **Dashboards:** Weekly KPI snapshot (Leads, Conversion, TTF Session, Portal WAU, Organic mix, GBP actions).
- **QA Checklist:** forms (mobile/desktop), broken links, schema validation, CWV, accessibility (WCAG AA quick pass).

---

## 10) SEO & Content Plan (MVP)

- **Positioning Pages:** FMS, Train‑Around‑Pain, Physio, Programs.
- **Condition Hubs:** Shoulder · Low‑Back (symptoms, dos/don’ts, drills, case snippets, CTA).
- **Articles:** 4 pieces (injury‑safe scaling, warm‑up principles, mobility basics, foundations for beginners).
- **On‑Page SEO:** titles/meta, H1/H2, internal links to hubs, FAQ schema, image alts, local NAP consistency.

---

## 11) Risks & Mitigations

- **Low Lead Volume (seasonality):** amplify GBP posts, push testimonials, run limited social proof campaign.
- **Operational Bottleneck (follow‑ups):** set SLA (contact within 1 business day), shared ops sheet + notifications.
- **Scope Creep:** enforce non‑goals, backlog parking lot.
- **Integration Gaps:** fall back to CMS‑managed timetable; keep Cliniko/booking as Post‑MVP.
- **Compliance:** ensure consent records; publish privacy policy + data handling notes.

---

## 12) Timeline & Milestones (4‑Week MVP)

- **Week 0 (prep):** Tech setup, CMS schemas, analytics.
- **Week 1:** IA/wireframes; FMS copy; timetable module; initial content plan.
- **Week 2:** Build pages, portal (light), trust components; GA4/GSC/GBP.
- **Week 3:** Content load (hubs + 4 posts + videos); polish; accessibility; SEO.
- **Week 4:** QA, stakeholder UAT, launch; week‑1 KPI baseline; fixes.

---

## 13) Definition of Done (DoD)

- All MVP pages live and navigable; forms and events tracked; sitemap/robots submitted; CWV pass; accessibility quick pass; privacy/cookie in place; timetable accurate; ≥6 testimonials; ≥12 movement videos; ≥3 coach bios; portal accessible to members.

---

## 14) Post‑MVP Backlog (Toggles & Next Bets)

- Cliniko booking embed; trial/intro offer; payments; Fitbox write hooks (booking), capacity heatmap; referral automation; richer portal (PR tracker, messaging); email sequences; staff bios video; case studies.
