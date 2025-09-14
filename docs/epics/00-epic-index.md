# GMC MVP Epic Index

**Project:** Geelong Movement Co (CrossFit + Physiotherapy) Website MVP  
**Timeline:** 4-Week Sprint (Sep 16 - Oct 18, 2025)  
**Total Effort:** 53-65 story points across 8 epics  

## 📊 Epic Overview

| Epic | Priority | Effort | Week | Business Value |
|------|----------|--------|------|----------------|
| [Epic 1: FMS Conversion Funnel](01-fms-conversion-funnel.md) | ⭐ Critical | 12-15 SP | 1-2 | Primary revenue driver (+50% leads) |
| [Epic 2: Member Portal (Light)](02-member-portal-light.md) | High | 8-10 SP | 2-3 | Member retention (40% weekly login) |
| [Epic 3: Content Engine & SEO](03-content-engine-seo.md) | High | 10-12 SP | 0-3 | Organic traffic growth (≥20% mix) |
| [Epic 4: Timetable (Read-Only)](04-timetable-readonly.md) | Medium | 6-8 SP | 1-2 | Discovery without booking complexity |
| [Epic 5: Trust & Proof Components](05-trust-proof-components.md) | High | 6-8 SP | 2-3 | Conversion optimization |
| [Epic 6: Analytics & Observability](06-analytics-observability.md) | ⭐ Critical | 8-10 SP | 0-2 | Measurable outcomes & optimization |
| [Epic 7: Infrastructure & Hosting](07-infrastructure-hosting.md) | ⭐ Critical | 6-8 SP | 0-1 | Reliable delivery & operations |
| [Epic 8: Chat Integration](08-chat-integration.md) | Medium | 3-4 SP | 3-4 | User support without overload |

**Total Story Points:** 59-75 SP  
**Critical Path:** Epic 7 → Epic 6 → Epic 3 → Epic 1  

## 🎯 MVP Success Criteria

### Primary KPIs (Week 4 Targets)
- **Lead Generation:** +50% FMS leads vs. baseline
- **Conversion:** FMS form completion ≥70%, FMS→First Session ≥60%
- **Member Engagement:** ≥40% weekly portal usage
- **Content/SEO:** 4 articles + 2 hubs published, organic mix ≥20%
- **Performance:** Core Web Vitals pass on ≥75% page views
- **Reliability:** ≥99.9% uptime

### Value Delivery Timeline
```
Week 0-1: Foundation (Infrastructure + Analytics + CMS)
Week 1-2: Core Funnel (FMS + Timetable basics)  
Week 2-3: Engagement (Portal + Trust + Content)
Week 3-4: Polish & Launch (Advanced Features + Chat)
```

## 📋 Story Breakdown Summary

### Epic 1: FMS Conversion Funnel (12-15 SP)
- **FMS-001:** Landing page with trust elements (4 SP)
- **FMS-002:** Two-step form with validation (4 SP)
- **FMS-003:** Success page & admin notifications (3 SP)
- **FMS-004:** First-session tracking (manual) (2 SP)

### Epic 2: Member Portal (8-10 SP)
- **PORTAL-001:** Authentication gate (3 SP)
- **PORTAL-002:** Programming notes & movement library (4 SP)
- **PORTAL-003:** Member FAQ system (2 SP)

### Epic 3: Content Engine & SEO (10-12 SP)
- **CONTENT-001:** Sanity CMS schema setup (3 SP)
- **CONTENT-002:** Condition hubs (Shoulder & Low-Back) (5 SP)
- **CONTENT-003:** Article publishing & SEO hygiene (4 SP)

### Epic 4: Timetable (6-8 SP)
- **TIMETABLE-001:** CMS timetable fallback (3 SP)
- **TIMETABLE-002:** Fitbox integration (optional) (4 SP)

### Epic 5: Trust & Proof (6-8 SP)
- **TRUST-001:** Testimonials carousel (3 SP)
- **TRUST-002:** Coach bio pages (3 SP)
- **TRUST-003:** Safety/standards panel (2 SP)

### Epic 6: Analytics & Observability (8-10 SP)
- **ANALYTICS-001:** GA4 implementation & event dictionary (4 SP)
- **ANALYTICS-002:** KPI dashboard setup (3 SP)
- **ANALYTICS-003:** Performance monitoring & quality gates (3 SP)

### Epic 7: Infrastructure & Hosting (6-8 SP)
- **INFRA-001:** Vercel project & CI/CD pipeline (4 SP)
- **INFRA-002:** Monitoring & health checks (3 SP)

### Epic 8: Chat Integration (3-4 SP)
- **CHAT-001:** Tawk.to integration with CMS toggle (3 SP)

## 🔗 Critical Dependencies

### Cross-Epic Dependencies
```
Infrastructure (Epic 7) 
├── Enables all other epics
├── Required for: CMS, Analytics, Hosting
└── Blocks: Everything without foundation

FMS Funnel (Epic 1)
├── Core business value driver
├── Requires: Infrastructure, Analytics setup
└── Feeds: All conversion measurement

Content Engine (Epic 3)
├── SEO foundation for discovery
├── Requires: CMS infrastructure
└── Supports: Trust building, organic traffic

Analytics (Epic 6)
├── Measurement framework
├── Required by: All feature epics
└── Enables: Data-driven optimization
```

### Technical Dependencies
- **CMS Infrastructure:** Required for Content, Portal, Timetable, Chat
- **Authentication:** Required for Portal functionality
- **Analytics Framework:** Required for all measurement
- **Performance Monitoring:** Quality gates for all features

### Content Dependencies
- **2 Condition Hubs + 4 Articles:** Content creation bottleneck
- **12 Movement Videos:** Video production and captioning
- **Testimonials & Coach Bios:** Content collection and consent
- **Safety Messaging:** Legal review and approval

## ⚠️ Risk Matrix

### High-Risk Items
1. **Content Creation Pipeline:** Multiple dependencies on content delivery
2. **Fitbox API Integration:** Unknown complexity, fallback critical
3. **Performance Targets:** Ambitious CWV goals with content-heavy site
4. **Manual Tracking:** First-session conversion relies on ops process

### Mitigation Strategies
- **Content:** Parallel creation, prioritize minimum viable content
- **Fitbox:** Build CMS fallback first, API as enhancement
- **Performance:** Mobile-first, aggressive optimization, monitoring
- **Tracking:** Simple ops sheet, clear workflow, backup methods

## 📈 Success Tracking

### Weekly Milestones
- **Week 1:** Core infrastructure and FMS funnel functional
- **Week 2:** Portal and trust elements live
- **Week 3:** Content published, SEO optimized
- **Week 4:** Full analytics, chat ready, launch-ready

### Quality Gates
- **Gate A (Week 1):** Infrastructure and core funnel working
- **Gate B (Week 2):** Portal and trust elements functional
- **Gate C (Week 3):** Content ≥70% complete, performance targets met
- **Gate D (Week 4):** All DoD criteria met, go/no-go decision

### Post-Launch Review (Week +1)
- KPI baseline captured
- Performance monitoring validated
- Chat activated and operational
- Optimization opportunities identified

## 📝 Epic Navigation

Each epic document contains:
- **User Stories** with detailed acceptance criteria
- **Technical implementation** notes and architecture
- **Dependencies** and integration points
- **Success criteria** and measurement plans
- **Risk assessment** and mitigation strategies
- **Operational procedures** and maintenance workflows

**Access individual epics via the links in the overview table above.**

---

**Document Owner:** Product Manager  
**Last Updated:** September 13, 2025  
**Status:** Ready for Sprint Planning
