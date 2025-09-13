You are an expert frontend engineer tasked with implementing the **Geelong Movement Co (GMC) MVP Revamp**.  
The goal is to deliver a **conversion-focused, mobile-first website** that drives Functional Movement Screen (FMS) leads, supports retention via a lightweight member portal, and strengthens local SEO.  

## Context & Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui components.  
- **CMS:** Sanity (role-based, schemas for hubs, articles, FAQs, testimonials, coach bios, timetable, settings).  
- **Hosting & CI:** Vercel (preview deploys, env vars, CDN, 1-click rollback).  
- **Integrations:** Fitbox (read-only timetable, with CMS fallback), Tawk.to chat (CMS toggle), GA4/GSC/GBP for analytics.  
- **Constraints:** MVP only — NO booking/payments, CRM automations, advanced portal, or Fitbox write ops.  
- **NFRs:** CWV budgets (LCP <2.5s, CLS <0.1, INP <200ms), WCAG 2.1 AA accessibility, uptime ≥99.9%, minimal PII, cookie banner & consent text.  

## Visual & UX Style
- Tone: professional but approachable (“train-around-pain” positioning).  
- Layout: clean grid with strong CTAs, trust/proof blocks, movement videos.  
- Color palette: bold accent for CTAs, accessible contrast ratios.  
- Mobile-first: all layouts described for mobile first, then adapt to tablet/desktop.  

---

## Task: Implement the following screens, templates, and components

### 1. FMS Conversion Funnel
1. Create **FMS Landing Page** (`/fms`)  
   - Hero with headline, subtext, CTA button.  
   - Proof panel (testimonials, safety/standards, coach bios).  
   - Internal links to hubs/articles.  
   - Schema: LocalBusiness, Article, BreadcrumbList.  
   - GA4 events: `fms_start`, `fms_submit`.  

2. Build **Two-Step FMS Form Component** (`/components/FMSForm.tsx`)  
   - Step 1: name, email, phone, preferred time.  
   - Step 2: goals, injury flags, experience.  
   - Client-side validation (email/phone formats, required fields).  
   - Bot protection: Turnstile/ReCAPTCHA.  
   - Inline error messages + aria-live for accessibility.  
   - On success: render confirmation page with “we’ll contact within 1 business day”, send admin email, persist lead to CMS or ops sheet.  

3. **Success Page** (`/fms/success`)  
   - Clear next steps.  
   - Accessible confirmation message.  
   - GA4 event: `fms_submit`.  

---

### 2. Timetable (Read-Only)
- Create Timetable component (`/components/Timetable.tsx`).  
- Pull data from Fitbox (read-only) or fallback to Sanity CMS block.  
- Display responsive grid with weekday filters, timezone/holiday notes.  
- Acceptance: loads ≤2.5s cold/≤1s warm; fallback works if Fitbox fails.  

---

### 3. Member Portal (Lightweight)
- Secure with email gate or magic link login (`/portal`).  
- Features:  
  - Programming notes (weekly, CMS-driven).  
  - Movement library with ≥12 captioned videos (searchable by name).  
  - Member FAQ (CMS-driven, searchable).  
- GA4 events: `portal_login`, `video_play`, `post_view`.  

---

### 4. Content Engine
- Implement templates: Hub (`/hubs/[slug]`), Article (`/articles/[slug]`).  
- Schema: Article, FAQ, BreadcrumbList.  
- Content ops: 2 hubs (Shoulder, Low-Back), 4 articles, ≥12 FAQs, ≥6 testimonials, ≥3 coach bios.  
- Ensure internal linking: hubs ↔ articles ↔ FMS.  

---

### 5. Trust & Proof Components
- Testimonials carousel (`/components/Testimonials.tsx`).  
- Coach bios component (`/components/CoachBio.tsx`).  
- Safety/standards panel (`/components/SafetyPanel.tsx`).  

---

### 6. Chat Toggle (Tawk.to)
- Add CMS boolean flag `enableChat`.  
- Default off at launch, on in Week +1.  
- Load script only if flag = true; no CLS shift.  
- GA4 event: `chat_open`.  

---

### 7. States & Accessibility
- Loading: skeleton loaders, aria-live.  
- Empty: friendly placeholders for hubs, articles, portal.  
- Error: inline messages, retry banners.  
- Accessibility: semantic HTML, keyboard focus, color contrast, captions on videos.  

---

### 8. Analytics & SEO
- GA4 events implemented per spec (`fms_start`, `fms_submit`, `portal_login`, `video_play`, `post_view`, `chat_open`).  
- Dashboards: funnel (FMS start→submit→first session), retention (portal).  
- SEO: CWV budgets enforced; schema valid; sitemap/robots; OG/Twitter meta.  

---

## Scope Control
- ✅ Allowed: Create/update files in `/components`, `/pages`, `/app`, `/sanity/schemas`.  
- ❌ Do NOT modify: Navbar, Footer, or unrelated components without explicit instruction.  
- ❌ Exclude: Booking/payments, CRM automations, Fitbox write ops, advanced portal, e-commerce, native app.  

---

## Deliverables
- Functional components + pages per above.  
- Accessible, mobile-first UI with shadcn/ui & Tailwind.  
- Sanity schemas for hubs, articles, testimonials, coach bios, FAQs, timetable, settings.  
- GA4 events and schema validation in place.  
- Code should be modular, testable, and production-ready.  

