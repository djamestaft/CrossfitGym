# GMC Front-End Specification — Draft v0.8

> Project: Geelong Movement Co (CrossFit + Physiotherapy)
> Source Doc: GMC Product Requirements Document (MVP Revamp v0.1)
> Mode: **Interactive** (section-by-section)

---

## 0. Preface & Working Agreement

* **Purpose of this spec**: Translate the PRD into implementable UI/UX requirements for design and frontend delivery (Next.js + Tailwind + shadcn/ui + Sanity CMS + Vercel).
* **Scope of this draft**: Now includes **Sections 1–8**, completing the initial draft cycle.
* **Definition of terms**: FMS = Functional Movement Screen; TTF = Time to First session; CWV = Core Web Vitals.
* **Out of scope for MVP**: Online booking/payments, advanced portal, CRM automations, Fitbox write ops, e-commerce, native app.

---

## 1. Project Overview & Objectives

Defines the MVP’s focus on **FMS conversion funnel**, **lightweight member portal**, **local SEO**, and a **low-maintenance stack**. Includes objectives, design tenets, metrics, constraints, and risks.

---

## 2. Target Users & Scenarios

* **Prospective members**: Safe entry into CrossFit → FMS booking.
* **Existing members**: Stay engaged → portal notes + movement library.
* **Local health referrers**: Validation of safety/professionalism.
  Scenarios mapped to **conversion & retention flows**.

---

## 3. Information Architecture & Navigation

* **Top-level nav**: Home, Hubs, Articles, About, Portal, Contact.
* **Conversion pathways**: Homepage hero → FMS → form → success.
* **Content hierarchy**: Structured hubs & articles; professional but accessible tone.
* **Behaviours**: Sticky header, breadcrumbs, mobile nav, portal login.

---

## 4. Screens, Templates & Components

* **Screens**: Homepage, Hub, Article, Portal Dashboard, Movement Library, FMS Form, Contact Page.
* **Templates**: Layout, Hub, Article, Portal, Form.
* **Components**: CTA button, Proof panel, Video card, Accordion (FAQs), Breadcrumbs, Magic link login, Timetable fallback, Chat toggle.

---

## 5. States (Loading/Empty/Error) & Accessibility

* **Loading**: Skeletons, inline loaders, aria-live updates.
* **Empty**: Friendly placeholders (hubs, articles, library, dashboard).
* **Error**: Inline form errors, retry banners, graceful fallbacks.
* **Accessibility**: WCAG 2.1 AA; focus management, ARIA roles, captions for videos, color contrast.

---

## 6. Analytics, SEO & Observability

* **Analytics**: GA4 events (`fms_start`, `fms_submit`, `portal_login`, `video_play`, `post_view`); dashboards for funnel + retention.
* **SEO**: Semantic HTML, schema (`LocalBusiness`, `BreadcrumbList`, `Article`), CWV budgets, optimised media.
* **Observability**: Sentry error logging, Vercel Analytics, Lighthouse CI, uptime ≥99.9%.

---

## 7. CMS Schema & Content Ops

* **CMS**: Sanity CMS with types for hubs, articles, proof panels, videos, notes, FAQs, timetable, site settings.
* **Governance**: Admin, Editor, Author roles; draft → review → publish workflow.
* **Ops**: Versioning, preview mode, media management via CDN, fallbacks.

---

## 8. Non-Functional Requirements (FE)

* **Performance**: CWV budgets (LCP <2.5s, CLS <0.1, INP <200ms); optimisations via Next.js and Lighthouse CI.
* **Accessibility**: WCAG 2.1 AA, pre-launch audit with axe-core.
* **Reliability**: Vercel hosting, Sanity CDN, graceful API fallbacks, uptime ≥99.9%.
* **Security**: Magic link login, Turnstile/ReCAPTCHA, minimal PII capture, dependency audits.
* **Maintainability**: Next.js + Tailwind + shadcn/ui stack; ESLint + Prettier; Storybook; CI/CD via GitHub Actions + Vercel.

---

## Change Log

* v0.1 → Section 1 drafted.
* v0.2 → Added Section 2 (Users & Scenarios).
* v0.3 → Added Section 3 (IA & Navigation).
* v0.4 → Added Section 4 (Screens & Components).
* v0.5 → Added Section 5 (States & Accessibility).
* v0.6 → Added Section 6 (Analytics, SEO, Observability).
* v0.7 → Added Section 7 (CMS Schema & Content Ops).
* v0.8 → Added Section 8 (Non-Functional Requirements).
