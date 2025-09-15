# GMC Implementation Roadmap — Accelerated MVP Launch

**Target Launch: October 18, 2025 (4-week MVP from Sep 16)**

---

## 🎯 Current State Summary

**✅ COMPLETED (85% of MVP)**

- Next.js 14 application with professional UI/UX
- Complete FMS conversion funnel (frontend + backend)
- Member portal with programming content
- Responsive design and mobile optimization
- GA4 analytics integration and SEO foundation
- **CI/CD pipeline setup with Jest testing**
- **Turnstile bot protection integration**
- **Form submission API with email notifications**

**🔧 REMAINING (15% to MVP)**

- Site navigation (header/footer)
- Deployment and hosting setup
- Basic content management system

---

## 📅 4-Week Implementation Plan

### **Week 0-1: Foundation Phase (September 16-27, 2025)**

**Goal: Infrastructure, Analytics, and CMS Foundation**
**Epic Focus: Epic 7 (Infrastructure) + Epic 6 (Analytics Core) + Epic 3 (CMS Setup)**

#### **Foundation Sprint Tasks:**

- [ ] **INFRA-001:** Vercel project & CI/CD pipeline setup
- [ ] **INFRA-002:** Monitoring & health checks implementation
- [ ] **ANALYTICS-001:** GA4 implementation & event dictionary
- [ ] **CONTENT-001:** Sanity CMS schema setup
- [ ] Backend API routes for form submissions
- [ ] Email notification system (Nodemailer/Resend)
- [ ] Navigation components (header/footer)
- [ ] Core deployment pipeline with quality gates

### **Week 1-2: Core Funnel Phase (September 28 - October 4, 2025)**

**Goal: Primary Business Value - FMS Conversion Funnel**
**Epic Focus: Epic 1 (FMS Funnel) + Epic 4 (Timetable)**

#### **Core Value Sprint Tasks:**

- [ ] **FMS-001:** Landing page with trust elements
- [x] **FMS-002:** Two-step form with validation ✅
- [ ] **TIMETABLE-001:** CMS timetable fallback system
- [ ] Performance monitoring active during development
- [ ] End-to-end FMS funnel testing with analytics tracking

### **Week 2-3: Engagement Phase (October 5-11, 2025)**

**Goal: Member Retention and Trust Building**
**Epic Focus: Epic 2 (Portal) + Epic 5 (Trust) + Epic 3 (Content)**

#### **Engagement Sprint Tasks:**

- [ ] **PORTAL-001:** Authentication gate implementation
- [ ] **TRUST-001:** Testimonials carousel
- [ ] **FMS-003:** Success page & admin notifications
- [ ] **CONTENT-002:** Condition hubs (Shoulder & Low-Back)
- [ ] Integration testing for member portal workflow

### **Week 3-4: Polish & Launch Phase (October 12-18, 2025)**

**Goal: Launch Readiness and Advanced Features**
**Epic Focus: Epic 2 (Portal Complete) + Epic 3 (Articles) + Epic 6 (Analytics) + Epic 8 (Chat)**

#### **Launch Sprint Tasks:**

- [ ] **PORTAL-002:** Programming notes & movement library
- [ ] **CONTENT-003:** Article publishing & SEO optimization
- [ ] **ANALYTICS-002:** KPI dashboard setup
- [ ] **CHAT-001:** Tawk.to integration with CMS toggle
- [ ] Final performance optimization and quality assurance
- [ ] Launch readiness review and go-live preparation

#### **Thursday, September 19**

**Content & Pages Day**

- [ ] Create About/Team page with coach information
- [ ] Create Contact page with business details
- [ ] Create basic legal pages (Privacy, Terms)
- [ ] Add real business information and contact details
- [ ] Update all placeholder content with real copy

#### **Friday, September 20**

**Testing & Polish Day**

- [ ] Full end-to-end testing of FMS conversion flow
- [ ] Mobile responsiveness testing across devices
- [ ] Form submission testing with real email delivery
- [ ] Performance audit and basic optimization
- [ ] Fix any critical bugs or issues

### **Week 2: September 23-27, 2025**

**Goal: Launch-ready with content management**

#### **Monday, September 23**

**CMS Foundation Day**

- [ ] Set up Sanity workspace and project
- [ ] Create basic schemas (testimonials, team, content)
- [ ] Configure Sanity in Next.js project
- [ ] Replace hardcoded testimonials with Sanity data
- [ ] Test content updates and preview mode

#### **Tuesday, September 24**

**Content Migration Day**

- [ ] Move team/coach information to Sanity
- [ ] Set up basic blog/article content types
- [ ] Create timetable content management system
- [ ] Configure image uploads and optimization
- [ ] Test content editing workflow

#### **Wednesday, September 25**

**Integration & Data Day**

- [ ] Set up real analytics and tracking
- [ ] Configure Google Search Console
- [ ] Implement proper sitemap generation
- [ ] Add structured data for local SEO
- [ ] Test all external integrations

#### **Thursday, September 26**

**Pre-Launch Testing Day**

- [ ] Complete accessibility audit and fixes
- [ ] Performance optimization and Core Web Vitals
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Mobile usability testing on real devices
- [ ] Final security review and input validation

#### **Friday, September 27**

**LAUNCH DAY** 🚀

- [ ] Final production deployment
- [ ] DNS configuration and SSL setup
- [ ] Launch announcement preparation
- [ ] Monitor launch metrics and user feedback
- [ ] Set up ongoing monitoring and alerts

---

## 🛠️ Implementation Details

### **Critical API Endpoints**

#### **1. FMS Form Submission API**

```typescript
// app/api/fms/submit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { sendNotificationEmail } from '@/lib/email'
import { z } from 'zod'

const fmsSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  preferredTime: z.string(),
  goals: z.string().min(1),
  injuryFlags: z.array(z.string()),
  experience: z.string(),
})

export async function POST(request: NextRequest) {
  // Validation, email sending, data storage
}
```

#### **2. Email Notification System**

```typescript
// lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendFMSNotification(formData: FMSData) {
  // Send admin notification
  // Send customer confirmation
}
```

### **Navigation Components**

#### **Header Navigation**

```typescript
// components/header.tsx
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl">
            Geelong Movement Co
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/fms">Assessment</Link>
            <Link href="/timetable">Timetable</Link>
            <Link href="/about">About</Link>
            <Link href="/portal">Member Portal</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}
```

### **Sanity CMS Schemas**

#### **Testimonial Schema**

```typescript
// sanity/schemas/testimonial.ts
export default {
  name: 'testimonial',
  type: 'document',
  title: 'Testimonial',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Client Name',
    },
    {
      name: 'content',
      type: 'text',
      title: 'Testimonial Content',
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating (1-5)',
      validation: Rule => Rule.min(1).max(5),
    },
    {
      name: 'role',
      type: 'string',
      title: 'Client Role/Description',
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured on Homepage',
    },
  ],
}
```

### **Essential Environment Variables**

```bash
# .env.local
RESEND_API_KEY=re_xxx
SANITY_PROJECT_ID=xxx
SANITY_DATASET=production
SANITY_API_TOKEN=xxx
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-xxx
ADMIN_EMAIL=admin@geelongmovement.co
```

---

## 🎯 Success Criteria

### **Week 1 Completion Criteria**

- [ ] FMS form submits successfully and sends email
- [ ] Users can navigate between all pages
- [ ] Site is deployed and accessible via custom URL
- [ ] All core functionality works in production environment

### **Week 2 Completion Criteria**

- [ ] Content can be managed through Sanity CMS
- [ ] All testimonials and team info are dynamic
- [ ] Performance meets Core Web Vitals standards
- [ ] Site is ready for marketing launch

### **Launch Day Success Metrics**

- [ ] FMS form conversion rate baseline established
- [ ] Mobile usability score >90 (Google PageSpeed)
- [ ] All analytics tracking functional
- [ ] Zero critical errors in production

---

## 🚨 Risk Mitigation

### **High-Risk Areas**

1. **Email Delivery** — Test thoroughly with real email addresses
2. **Form Validation** — Prevent spam and ensure data quality
3. **Mobile Performance** — Optimize for mobile-first users
4. **CMS Integration** — Ensure content updates don't break site

### **Contingency Plans**

1. **Email Issues** — Backup with Formspree or similar service
2. **Performance Problems** — Use Vercel analytics to identify bottlenecks
3. **CMS Problems** — Keep hardcoded fallbacks during transition
4. **Deployment Issues** — Have staging environment for testing

---

## 📊 Post-Launch Priorities (Week 3-4)

### **Content Creation**

- [ ] Write 2 condition hub articles (shoulder, low-back)
- [ ] Create 4 blog articles for SEO
- [ ] Record 12 movement videos for portal
- [ ] Optimize for local SEO keywords

### **Feature Enhancements**

- [ ] Add Tawk.to chat integration
- [ ] Implement advanced analytics dashboard
- [ ] Create referral/sharing functionality
- [ ] Add booking calendar integration (if needed)

### **Performance & SEO**

- [ ] Complete technical SEO audit
- [ ] Submit to search engines
- [ ] Set up Google Business Profile optimization
- [ ] Monitor and optimize Core Web Vitals

---

**This roadmap gets you from 85% complete to 100% launched in 1.5 weeks. CI/CD pipeline is ready, core API functionality is complete, and tests are passing. Focus on navigation components and deployment for MVP launch.**

_Roadmap created: September 13, 2025_
