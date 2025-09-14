# 📁 Project Structure & Component Architecture

### Directory Architecture

```
app/
├── (routes)/
│   ├── page.tsx                    # Homepage
│   ├── fms/
│   │   ├── page.tsx                # FMS Landing
│   │   ├── success/page.tsx        # FMS Success
│   │   └── components/
│   │       └── fms-form.tsx        # Two-step form
│   ├── portal/
│   │   ├── page.tsx                # Portal dashboard
│   │   └── components/
│   │       ├── member-auth.tsx     # Magic link auth
│   │       ├── movement-library.tsx
│   │       └── member-faqs.tsx
│   ├── hubs/[slug]/page.tsx        # Condition hubs
│   ├── articles/[slug]/page.tsx    # Articles
│   └── timetable/page.tsx          # Timetable
├── components/
│   ├── ui/                         # shadcn/ui base components
│   ├── testimonials.tsx            # Proof components
│   ├── coach-bio.tsx
│   ├── safety-panel.tsx
│   ├── timetable.tsx               # Fitbox integration
│   ├── chat-toggle.tsx             # Tawk.to toggle
│   ├── analytics.tsx               # GA4 tracking
│   └── seo-head.tsx                # Schema markup
├── lib/
│   ├── sanity/
│   │   ├── client.ts               # Sanity configuration
│   │   ├── queries.ts              # GROQ queries
│   │   ├── schemas/                # Content schemas
│   │   └── types.ts                # Generated types
│   ├── auth.ts                     # NextAuth config
│   ├── gtag.ts                     # GA4 helpers
│   └── utils.ts                    # Utilities
└── api/
    ├── auth/                       # NextAuth routes
    ├── fms/submit/route.ts         # FMS form handler
    ├── revalidate/route.ts         # Sanity webhooks
    └── timetable/route.ts          # Fitbox proxy
```

### Component Hierarchy & Reusability

#### Atomic Design Pattern

```
Atoms (Base UI)
├── Button, Input, Label, Badge
├── Card, Skeleton, Alert
└── Typography components

Molecules (Feature Components)
├── FMS Form Steps
├── Video Player with captions
├── Testimonial Card
├── Coach Bio Card
└── FAQ Accordion

Organisms (Page Sections)
├── Hero Section with CTA
├── Proof Panel (testimonials + safety)
├── Timetable Grid
├── Movement Library Grid
└── Navigation with auth state

Templates (Page Layouts)
├── Marketing Layout (FMS, Home)
├── Content Layout (Hubs, Articles)
├── Portal Layout (Member area)
└── Form Layout (FMS form)

Pages (Route Components)
├── Homepage
├── FMS Landing & Success
├── Hub & Article pages
├── Portal Dashboard
└── Timetable page
```

---
