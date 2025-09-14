# GMC Product Requirements Document (PRD) — MVP Revamp (v0.1 Draft)

**Client:** Geelong Movement Co (CrossFit + Physiotherapy)
**Prepared by:** Mary — Business Analyst (BMAD) / John — Product Manager
**Date:** September 12, 2025
**Status:** Working Draft (Not yet approved)

---

## 1) Executive Summary

Geelong Movement Co (GMC) will deliver a focused 4‑week MVP revamp of the public website that funnels visitors toward a **Functional Movement Screen (FMS)** as the primary conversion event while enabling member retention and SEO-driven discovery. The MVP uses a low-cost stack (**Next.js + Vercel + Sanity**) to minimize operational complexity and lays groundwork for post‑MVP toggles (Cliniko booking, payments, portal depth). Key outcomes: increase qualified FMS leads; reduce time-to-first-session; strengthen local SEO; improve member stickiness via a lightweight portal.

---

## 2) Goals & Success Metrics

### Primary Goal

Drive qualified FMS leads and convert them into first sessions efficiently and safely.

### MVP KPIs (First 4 weeks post-launch)

* **Lead Gen & Conversion:** Week‑1 baseline; **+50%** FMS leads by Week‑4; form completion **≥70%**; FMS→first session **≥60%**; median **TTF ≤5 days**.
* **Member Engagement:** ≥ **40%** of active members log into portal weekly.
* **Content/SEO:** Publish **4** articles + **2** condition hubs; organic mix **≥20%**; Google Business Profile (GBP) actions **+20%** vs. pre‑launch.
* **Quality/Performance:** Core Web Vitals thresholds (LCP ≤2.5s, CLS ≤0.1, INP ≤200ms) pass on **≥75%** of page views; **≥99.9%** uptime.

### Measurement Plan

GA4 events: `fms_start`, `fms_submit`, (manual) `first_session_booked`, `chat_open`, `call_click`, `map_click`, `portal_login`, `video_play`, `post_view`.
GSC/GBP tracked for impressions/clicks; ops sheet cohorts compute conversion + median days.

---

## 3) Target Users & Personas (JTBD)

1. **Cautious Beginner** — “Help me start with confidence so I don’t get hurt.”
2. **Returning Athlete (post‑niggle/injury)** — “Show me a plan to train now while I rehab.”
3. **Busy Parent/Professional** — “Give me efficient sessions and a clear path to results.”
4. **Current Member** — “Keep me consistent and progressing.”

Primary value props: assessment‑led onboarding (FMS) → personalized plan; physio‑informed coaching; community & accountability.

---

## 4) Key Features & Functionality (MVP)

* **FMS Conversion Funnel:** Dedicated FMS landing; **two‑step form**; success page with next steps; admin notification + basic lead storage; GA4 events.
* **Read‑Only Timetable:** Fitbox read or CMS fallback; responsive; timezone/holiday notes.
* **Member Portal (Light):** Email/magic‑link gate; programming notes; movement library (≥12 videos); member FAQs.
* **Content Engine:** 2 condition hubs + 4 articles; schema; internal links; SEO hygiene.
* **Trust & Proof:** Testimonials (≥6), coach bios (≥3 with quals), safety/standards panel.
* **Chat Toggle:** Tawk.to enabled via CMS toggle; default on in **Week +1**.

---

## 5) MVP Scope & Non‑Goals

### In Scope (MVP)

Public site (Home, FMS, Programs, Timetable, Pricing, Coaches, Blog, Contact), lightweight portal, content engine, analytics/SEO, CMS schemas, Tawk.to toggle, hosting on Vercel.

### Out of Scope (Deferred)

Online booking/payments; trial sign‑ups; advanced portal (PR tracking, messaging); CRM automation; Fitbox write operations; e‑commerce; native app.

Rationale: strict MVP to validate FMS-led funnel; reduce delivery risk and cost.

---

## 6) Critical User Journeys

**A. Visitor → FMS (Primary)**

1. Home/FMS landing → proof & safety → 2‑step form; 2) Success page promise (contact within 1 business day); 3) Staff follow‑up → first session scheduled.
   Instrumentation: `fms_start`, `fms_submit`, manual `first_session_booked`.

**B. Member → Portal**
Login/email gate → programming notes → movement video (captioned).
Instrumentation: `portal_login`, `video_play`, `post_view`.

**C. Searcher → Condition Hub**
Query (e.g., “shoulder pain crossfit”) → condition hub (dos/don’ts, drills, snippets) → soft CTA to FMS.
Schema: Article, FAQ; LocalBusiness on Contact.

Edge cases: form partials (no automations v1); holiday notes via CMS; accessibility basics in place.

---

## 7) Information Architecture & Content Map

**Top Nav:** Home · Programs · Timetable · Pricing · Physio · Coaches · Blog · Member Portal · Contact

**Core Pages:** `page_home`, `page_fms`, `page_program` (CrossFit, Fundamentals), `page_pricing`, `page_timetable`, `page_contact`.

**Content Types:** `post_article`, `post_condition_hub`, `kb_faq`, `component_testimonial`, `component_timetable`, `component_cta`, `coach_bio`.

**Content Priorities:** FMS landing copy; 2 condition hubs (Shoulder, Low‑Back); 4 articles; 12 movement videos; 12 FAQs; ≥6 testimonials; ≥3 coach bios.

Routing: shallow core routes; hubs at `/hubs/shoulder`, `/hubs/low-back`; internal links hub ↔ articles ↔ FMS.

---

## 8) Tech Stack & Integrations

* **Frontend:** Next.js (App Router), Tailwind, shadcn/ui; Next/Image; modest animations.
* **CMS:** Sanity (role‑based access); schemas per content map.
* **Hosting/CI:** Vercel (preview deploys; env vars; CDN; 1‑click rollback).
* **Integrations:** Fitbox (read‑only timetable); Tawk.to (chat toggle); GA4 + GSC + GBP.
* **Security/Privacy:** Cookie banner; privacy policy; consent on FMS form; Turnstile/ReCAPTCHA; minimal PII.

Operational toggles (off by default): Cliniko booking embed, payments/trials, portal depth.

---

## 9) Functional Requirements (FR) & Acceptance

### FR‑1: FMS Landing & Two‑Step Form

* **Structure:** Step 1 contact (name, email, phone, preferred time); Step 2 goals/context (experience, injury flags, objectives).
* **Validation:** Required fields; email/phone format; sanitation; bot check (Turnstile/Recaptcha).
* **Success:** Clear expectation copy; light FAQ; CMS‑driven content block.
* **Notify/Store:** Admin email; lead logged to ops sheet or CMS; no online booking.
* **Analytics:** `fms_start`, `fms_submit`; manual `first_session_booked`.
  **Acceptance:** Mobile/desktop; inline errors; success renders; admin notified ≤1 min; lead persisted w/ timestamp & source; GA4 events recorded with step + UTM.

### FR‑2: Timetable (Read‑Only)

* **Source:** Fitbox read or CMS manual fallback.
* **Display:** Responsive grid; weekday filters; timezone/holiday notes via CMS.
  **Acceptance:** Loads ≤2.5s cold/≤1s repeat; works under Fitbox outage (fallback); holiday note displays when set.

### FR‑3: Member Portal (Light)

* **Auth:** Email gate or magic link.
* **Content:** Programming notes; movement library (≥12 vids); member FAQ.
* **Search:** Client‑side movement search ok.
* **Analytics:** `portal_login`, `video_play`, `post_view`.
  **Acceptance:** No public access; videos playable with captions; current week notes visible; GA4 events fire.

### FR‑4: Content Engine & SEO

* **Types:** Articles, Condition Hubs, FAQs, Testimonials, Coach Bios.
* **Schema:** LocalBusiness (Contact), Article/FAQ where applicable.
* **Links:** Hubs → FMS; Articles ↔ Hubs.
  **Acceptance:** 4 articles + 2 hubs published pre‑launch; schema validates; breadcrumbs/links resolve.

### FR‑5: Trust & Proof

* **Components:** Testimonials carousel (≥6), Safety/Standards panel, Coach bios (≥3 with quals).
  **Acceptance:** Components render, are CMS‑editable, accessible; required counts met.

### FR‑6: Chat Toggle (Tawk.to)

* **Toggle:** CMS boolean; default “on” in Week +1.
  **Acceptance:** Toggle change reflects ≤5 min; chat loads only when enabled; no layout shift; `chat_open` event.

---

## 10) Non‑Functional Requirements (NFR)

**Performance & CWV:** LCP ≤2.5s (home/hubs/posts), CLS ≤0.1, INP ≤200ms; route code‑split; image optimization; timetable repeat view ≤1s.

**Reliability:** Uptime ≥99.9%; 1‑click rollback; health checks on key routes.

**Security & Privacy:** Minimal PII; bot protection; input sanitation; rate limits; consent text; cookie banner; policy pages.

**Accessibility (WCAG 2.2 AA quick pass):** Semantic landmarks; keyboard nav/focus; contrast AA; captions/transcripts for videos; form labels & error handling.

**Maintainability & Ops:** Env var inventory documented; CMS schema versioned; Fitbox strictly read‑only; no extra infra.

**Observability & QA:** GA4 per spec; 404/500 monitoring; broken‑link check; Lighthouse CI for home/hub/post/FMS.

**Legal/Compliance:** Live Terms, Privacy, Cookies; lead data retention noted in ops sheet.

---

## 11) Analytics, Telemetry & QA

* **Events:** Funnel (`fms_start` → `fms_submit` → first session); Engagement (`chat_open`, `call_click`, `map_click`, `portal_login`, `video_play`, `post_view`).
* **Params:** `page_type`, `cta_variant`, `form_step`, `utm_*`.
* **Dashboards:** Weekly KPIs (Leads, Conversion %, TTF, Portal WAU, Organic %, GBP actions); Content ops & quality (CWV, 404s).
* **Quality:** CWV thresholds; a11y pass; schema validation; resilience (timetable fallback; chat toggle safe; graceful errors).
* **Data Handling:** Email notification + ops sheet row; no PHI; minimal context only.

---

## 12) Risks & Mitigations

| Risk                     | Impact          | Likelihood | Mitigation                                           | Trigger/Monitor            | Owner        |
| ------------------------ | --------------- | ---------: | ---------------------------------------------------- | -------------------------- | ------------ |
| Low lead volume          | Miss +50% KPI   |        Med | Proof emphasis, GBP posts, testimonials, copy refine | Week‑1 leads < baseline    | PM/Marketing |
| Ops follow‑up bottleneck | Slower TTF      |        Med | SLA 1 BD; ops sheet; daily 10‑min standup            | >20% leads untouched >24h  | Ops Lead     |
| Scope creep              | Miss window     |       High | Enforce non‑goals; backlog park; change control      | New features proposed      | PM           |
| Fitbox gaps              | Timetable fails |        Low | CMS fallback; cache; holiday notes                   | Fitbox down >2h            | Dev Lead     |
| Content slip             | Weak SEO/portal |        Med | Content calendar; prioritize 12 vids + 2 hubs        | <50% ready by end W2       | Content Lead |
| CWV underperforms        | Conversion drop |        Med | Image budgets; font swap; lazy load; CI              | LCP p75 >2.5s              | Dev Lead     |
| Analytics access issues  | Blind spots     |        Low | Validate access Week‑0; backup UTM logging           | Access not confirmed Day‑2 | PM           |
| Privacy/compliance miss  | Legal risk      |        Low | Consent copy; cookie banner; minimal PII             | Missing policy pages at QA | PM           |
| Chat ops strain          | Slow responses  |        Med | Enable Week +1; office hours; canned replies         | SLA >2h                    | Ops Lead     |

---

## 13) Timeline & Milestones (REVISED - Accelerated 2‑Week MVP)

**✅ Current Status:** **Week 2.5 equivalent ALREADY COMPLETE** via v0 AI generation

**Revised timeline based on actual development state:**

* **✅ Week 0-2 COMPLETE:** Next.js setup; base components; Home, FMS, Portal pages built; responsive design; GA4 events; trust components; schema markup.
* **Week 1 (Sep 16–20):** Backend integration; FMS form API; email notifications; navigation header/footer; Vercel deployment.
* **Week 2 (Sep 23–27):** Missing pages (About, Contact, Legal); Sanity CMS setup; content loading; final testing; **LAUNCH by Fri Sep 27, 2025**.

**🚀 NEW LAUNCH TARGET: September 27, 2025** (3 weeks ahead of original schedule)

Post‑Launch Week +1 (Oct 21–25): KPI review, copy tweaks, proof enhancements; content cadence continues.

---

## 14) Definition of Done (DoD) - REVISED for Accelerated Launch

### **MVP Launch Ready (September 27, 2025):**
* **✅ Frontend Complete:** All MVP pages built (Home, FMS, Portal, Timetable); responsive design; professional UI/UX
* **✅ Core Functionality:** FMS 2‑step form with validation; portal with programming notes; testimonials & trust elements
* **🔧 Backend Integration:** FMS form API with email notifications; lead storage system
* **🔧 Navigation:** Header navigation and footer for site-wide user flow
* **🔧 Deployment:** Vercel hosting with environment variables; production deployment
* **✅ Analytics Foundation:** GA4 events configured; schema markup implemented

### **Post-Launch Content & Enhancement (Week 3-4):**
* **Content Creation:** 2 condition hubs; 4 articles; coach bios; business pages
* **CMS Integration:** Sanity workspace; dynamic content management
* **Advanced Features:** Chat toggle; enhanced analytics; performance optimization
* **SEO Polish:** GSC verification; sitemap optimization; internal linking

### **Quality Standards (Maintained):**
* **Performance:** Core Web Vitals compliance; mobile-first responsive
* **Accessibility:** WCAG 2.1 AA basics; keyboard navigation; screen reader support  
* **Security:** Form validation; input sanitization; environment variable management

---

## 15) Post‑MVP Backlog (Toggles & Next Bets)

1. Cliniko booking embed (FMS success/Contact).
2. Intro offer / Trial flow (no payments v1) → Stripe Link later.
3. Payments (intro offers) after funnel proof.
4. Fitbox write hooks (in‑site booking) with guardrails.
5. Capacity heatmap on Timetable.
6. Referral mechanics; shareable success; UTM referral tracking.
7. Portal depth (PR tracking, messaging, saved scaling notes).
8. Email sequences (abandoners, pre‑session prep, onboarding).
9. Case studies & staff bios video.
10. A/B experiments (FMS headline, proof density, CTA; hub CTA placement).

Principles: activate only if they improve **FMS → First Session** or reduce **TTF**; use CMS‑config toggles; weekly increments; sunset weak performers.

---

## 16) Stakeholders & Responsibilities (RACI)

**Roles:** PM (scope/KPI/backlog), Business Owner (approvals/ops), Dev Lead (tech/CWV/a11y), Content Lead (hubs/posts/FAQ/videos), Design/UX (wires/components/a11y), Ops Lead (follow‑ups/chat, ops sheet).

**RACI Highlights:**

* **FMS Funnel:** R Dev, A PM, C Ops, I Owner
* **Timetable:** R Dev, A PM, C Owner, I Ops
* **Portal:** R Dev, A PM, C Content, I Ops
* **Content:** R Content, A Owner, C PM, I Dev
* **Analytics/Reporting:** R PM, A Owner, C Dev, I Ops
* **SEO/Schema:** R PM+Dev, A PM, C Content, I Owner
* **Chat Ops:** R Ops, A Owner, C PM, I Dev

---

## 17) Open Questions & Assumptions

**Assumptions:** FMS remains primary conversion; Fitbox read or CMS fallback acceptable; content capacity for 2 hubs/4 posts/12 vids; ops SLA 1 BD; GA4/GSC/GBP access; Tawk off at launch, on Week +1; no booking/payments in MVP.

**Open Questions (Owner):** Fitbox endpoint/format & rate limits (Dev); Cliniko embed auth/privacy (PM); portal auth choice (Dev); video hosting + captions workflow (Content); GBP access ownership (Owner); legal copy owner (Owner/Legal); brand assets final (Design); ops sheet schema (Ops); content fallback policy if short by Week 3 (PM+Content).

---

## 18) Communication Plan & Approvals

**Cadence:** Daily 10‑min standup (blockers); twice‑weekly build/demo; weekly stakeholder showcase; Post‑Launch Week +1 KPI review.

**Decision Log:** `Date · Decision · Context · Options · Rationale · Owner` (repo `/docs/decision-log.md`).

**Change Control:** Use Correct‑Course workflow for scope changes; minor CMS tweaks bypass.

**Approval Gates:** Gate A (end W1) wireframes & form spec; Gate B (end W2) core pages + portal gate; Gate C (mid W3) content ≥70%; Gate D (W4 UAT) DoD met → Go/No‑Go.

**Channels:** Slack/WhatsApp for daily; email for formal approvals; single inbox for FMS notifications (ops@… with backup).

---

## 19) SEO & Content Plan

**Positioning Pages:** FMS; Train‑Around‑Pain; Physio; Programs.

**Condition Hubs (MVP):** Shoulder; Low‑Back — symptoms, dos/don’ts, drills, case snippets, FAQ, soft CTA.

**Articles (MVP):** Injury‑safe scaling; warm‑up principles; mobility basics; beginner foundations (800–1,200 words; OG/Twitter; clear CTAs).

**Local SEO:** GBP hygiene (NAP, categories, photos, weekly posts, Q\&A); Contact page with LocalBusiness schema, click‑to‑call/directions.

**Technical SEO:** Titles/meta, canonical, XML sitemap/robots, OpenGraph/Twitter, Article/FAQ/Breadcrumb schema, image alts, lazy loading; CWV budgets per template.

**Internal Linking:** Hubs → FMS; Articles ↔ Hubs; proof bars; footer links to Contact/Timetable/FMS.

**Editorial Cadence:** W2 draft hubs; W3 publish hubs + 4 posts; W4 FAQs & proof polish; 12 movement videos captioned and reused in content.

**Measurement:** Organic mix %, hub entrances, hub→FMS CTA CTR, GBP actions; weekly review of landing pages, queries, paths to FMS.

---

## 20) Epics & Stories (Draft)

### Epic 1 — FMS Conversion Funnel

**Goal:** Drive qualified FMS submissions and set clear next steps.
**Success:** +50% FMS leads by Week‑4; FMS→First Session ≥60%.

1. **FMS Landing Page (Content + Proof)**
   *As a cautious beginner, I want a clear FMS overview with trust cues so I feel safe to start.*
   **AC:** Hero + primary CTA, proof bar, safety panel; internal links to hubs; LCP ≤2.5s; basic FAQ; SEO meta & schema.

2. **Two‑Step FMS Form (Validate + Anti‑spam)**
   *As a visitor, I want an easy 2‑step form so I can request an assessment without friction.*
   **AC:** Step 1: name/email/phone/preferred time; Step 2: goals/injury flags/experience; inline errors; Turnstile/ReCAPTCHA; `fms_start`/`fms_submit` GA4 events; responsive.

3. **Success Page + Admin Notifications**
   *As staff, I need instant notification and context so I can follow up within 1 business day.*
   **AC:** Success page promise + next steps; ops email ≤1 min; lead persisted (ops sheet/CMS) with timestamp/UTM; accessible confirmation.

4. **First‑Session Tracking (Manual MVP)**
   *As PM, I need a reliable way to mark first sessions to compute conversion and TTF.*
   **AC:** Ops sheet field + guidance; weekly cohort sheet; median TTF auto‑calculated; dashboard tile shows FMS→First Session %.

### Epic 2 — Timetable (Read‑Only)

**Goal:** Satisfy discovery without booking complexity.

1. **CMS Timetable Block (Fallback)**
   *As a visitor, I want a readable timetable so I can see class options quickly.*
   **AC:** Responsive grid, weekday filter, cache; holiday/timezone note; loads ≤2.5s cold/≤1s warm.

2. **Fitbox Read Integration (Optional)**
   *As staff, I want automatic timetable updates so content stays accurate.*
   **AC:** Read‑only pull; graceful error → CMS fallback; toggleable source.

### Epic 3 — Member Portal (Light)

**Goal:** Improve stickiness via programming clarity and movement help.

1. **Auth Gate / Magic Link**
   *As a member, I want simple access so I can see member content securely.*
   **AC:** Email gate or magic link; no public access; `portal_login` event.

2. **Programming Notes & Movement Library (≥12 videos)**
   *As a member, I want concise notes and demos so I can scale safely.*
   **AC:** Weekly notes; searchable movement list; captions on videos; `video_play` events.

3. **Member FAQ**
   *As a member, I want quick answers so I can self‑serve common questions.*
   **AC:** CMS‑editable; searchable; linked from portal and contact.

### Epic 4 — Content Engine & SEO

**Goal:** Capture high‑intent traffic and route to FMS.

1. **Sanity Schemas & Templates**
   *As an editor, I want structured content so I can publish consistently.*
   **AC:** `post_article`, `post_condition_hub`, `kb_faq`, testimonials, coach bios; preview.

2. **Condition Hubs x2 (Shoulder, Low‑Back)**
   *As a searcher, I want specific guidance so I can decide if training is safe.*
   **AC:** H2 sections (symptoms, dos/don’ts, drills, case snippets), FAQ schema, internal links to FMS/articles.

3. **Articles x4 + SEO Hygiene**
   *As a visitor, I want credible articles so I trust the brand and next step.*
   **AC:** 800–1,200 words; OG/Twitter cards; Article schema; sitemap/robots; breadcrumbs.

### Epic 5 — Trust & Proof

**Goal:** Reduce anxiety and increase conversion.

1. **Testimonials Carousel (≥6)** — CMS editable; attribution fields; visible on Home/FMS.
2. **Coach Bios (≥3 with quals)** — Photos, specialties, quals; links from Programs/Physio.
3. **Safety/Standards Panel** — Clear standards & injury‑aware coaching message.
   **AC (all):** Rendered on target pages; a11y labels; schema where applicable.

### Epic 6 — Chat Toggle (Tawk.to)

**Goal:** Offer help without overloading launch.

1. **CMS Toggle + Week +1 Enable**
   *As ops, I want to turn chat on/off without deploy.*
   **AC:** Boolean toggle; cache invalidation ≤5 min; loads only when enabled; `chat_open` event.

### Epic 7 — Analytics, QA & Observability

**Goal:** Make outcomes measurable and stable.

1. **GA4 Wiring & Event Dictionary** — Events per spec; param examples; test plan.
2. **Weekly KPI Dashboard** — Leads, Conversion %, TTF median, Portal WAU, Organic %, GBP actions.
3. **CWV/A11y Baseline & Lighthouse CI** — Thresholds met on Home/Hub/Post/FMS; issues tracked.

### Epic 8 — Hosting/CI & Ops

**Goal:** Safe, repeatable delivery.

1. **Vercel Project + Env Vars** — Preview deploys; 1‑click rollback tested.
2. **Monitoring Basics** — 404/500 checks; broken‑link scan pre‑launch; uptime notifications.

---

## 21) Appendices (Optional Next)

* GA4 Event & Param Dictionary (names, types, examples)
* Traceability Matrix (Persona/Journey ↔ FR ↔ Epic/Story ↔ KPI)
* Env Var Inventory & Deploy/Rollback Playbook
* Launch Checklist (preflight + go/no‑go)

> **Document Ownership:** PM is the owner of this PRD. Update after each approval gate.
