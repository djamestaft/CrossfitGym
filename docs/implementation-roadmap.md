# GMC Implementation Roadmap — Accelerated MVP Launch

**Target Launch: September 27, 2025 (2 weeks from Sep 13)**

---

## 🎯 Current State Summary

**✅ COMPLETED (80% of MVP)**
- Next.js 14 application with professional UI/UX
- Complete FMS conversion funnel (frontend)
- Member portal with programming content
- Responsive design and mobile optimization
- GA4 analytics integration and SEO foundation

**🔧 REMAINING (20% to MVP)**
- Backend API integration for form submission
- Site navigation (header/footer)
- Deployment and hosting setup
- Basic content management system

---

## 📅 2-Week Implementation Plan

### **Week 1: September 16-20, 2025**
**Goal: Make the site functional and navigable**

#### **Monday, September 16**
**Backend Foundation Day**
- [ ] Create `/api/fms/submit` route for form submissions
- [ ] Set up email notification system (Nodemailer or Resend)
- [ ] Test FMS form end-to-end with real backend
- [ ] Add basic error handling and loading states

#### **Tuesday, September 17**
**Navigation & Structure Day**
- [ ] Create header navigation component
- [ ] Create footer component with contact info
- [ ] Update layout.tsx to include navigation
- [ ] Test navigation flow between all pages
- [ ] Add basic 404 page

#### **Wednesday, September 18**
**Deployment & Hosting Day**
- [ ] Set up Vercel project and connect to GitHub
- [ ] Configure environment variables for production
- [ ] Deploy initial version and test live functionality
- [ ] Set up custom domain (if available)
- [ ] Configure email delivery for production

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
  experience: z.string()
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
      title: 'Client Name'
    },
    {
      name: 'content',
      type: 'text',
      title: 'Testimonial Content'
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating (1-5)',
      validation: Rule => Rule.min(1).max(5)
    },
    {
      name: 'role',
      type: 'string',
      title: 'Client Role/Description'
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured on Homepage'
    }
  ]
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

**This roadmap gets you from 80% complete to 100% launched in 2 weeks. Focus on the critical path items first, then enhance post-launch.**

*Roadmap created: September 13, 2025*
