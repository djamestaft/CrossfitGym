# 🏗️ System Overview

### Technology Stack Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                      │
├─────────────────────────────────────────────────────────────────┤
│ Next.js 14 (App Router) + React 18 + TypeScript               │
│ Tailwind CSS + shadcn/ui + Framer Motion                       │
│ NextAuth.js (Magic Links) + React Hook Form                    │
└─────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API & DATA LAYER                        │
├─────────────────────────────────────────────────────────────────┤
│ Next.js API Routes + Server Actions                            │
│ Sanity CMS (Content) + GROQ Queries                           │
│ Fitbox API (Timetable) + Tawk.to (Chat)                       │
└─────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       HOSTING & ANALYTICS                      │
├─────────────────────────────────────────────────────────────────┤
│ Vercel (Hosting + CDN + Edge Functions)                        │
│ Google Analytics 4 + Google Search Console                     │
│ Vercel Analytics + Lighthouse CI                               │
└─────────────────────────────────────────────────────────────────┘
```

---
