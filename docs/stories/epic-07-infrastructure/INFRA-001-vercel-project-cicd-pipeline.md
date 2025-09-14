# User Story: INFRA-001 - Vercel Project & CI/CD Pipeline

**Epic:** Epic 7: Infrastructure & Hosting  
**Story ID:** INFRA-001  
**Priority:** Critical Foundation  
**Effort Estimate:** 4 story points  
**Sprint Target:** Week 0-1

## 📋 User Story

**As a** Development Team  
**I need** automated deployment infrastructure  
**So that** I can deploy safely and roll back quickly if issues occur

## ✅ Acceptance Criteria

### Vercel Project Setup

- [ ] **Production Environment:**
  - Custom domain (geelongmovement.com) configured with SSL
  - Production environment variables securely configured
  - Branch protection and auto-deployment from main branch
  - Performance monitoring enabled

- [ ] **Preview Environments:**
  - Automatic preview deployments for all pull requests
  - Preview environment variables configured
  - Preview URL accessible for QA and stakeholder review
  - Automatic cleanup of stale preview deployments

- [ ] **Development Environment:**
  - Local development setup documented
  - Hot reload and debugging tools configured
  - Local environment variables template provided
  - Development tools and debugging enabled

### CI/CD Pipeline Quality Gates

- [ ] **Build & Quality Checks:**
  - TypeScript compilation verification
  - ESLint code quality checks with zero warnings
  - Prettier code formatting validation
  - Unit test execution with coverage reporting
  - Build artifact generation and verification

- [ ] **Performance & Security:**
  - Bundle size analysis and budget enforcement
  - Lighthouse CI performance audits
  - Security vulnerability scanning (npm audit)
  - Dependency license compliance check
  - Image optimization verification

### Deployment Strategy

- [ ] **Automated Deployments:**
  - Zero-downtime deployments to production
  - Automatic rollback on failed health checks
  - 1-click manual rollback capability
  - Blue-green deployment pattern implementation
  - Deployment status notifications to team

- [ ] **Performance Optimization:**
  - Edge function configuration for dynamic content
  - CDN caching strategies optimized
  - Image optimization pipeline functional
  - Static asset compression enabled
  - Route-based code splitting verified

## 🔗 Dependencies

**Upstream Dependencies:**

- [ ] GitHub repository setup with proper branch protection
- [ ] Domain registration and DNS access
- [ ] Team access management and permissions configured
- [ ] Security policy review and approval

**Downstream Dependencies:**

- [ ] All other epics require this infrastructure foundation
- [ ] Content deployment depends on CMS integration
- [ ] Analytics setup requires environment configuration

## 🧪 Testing Criteria

- [ ] **Deployment Testing:**
  - Successful deployment from feature branch to preview
  - Successful deployment from main branch to production
  - Rollback procedure tested and timed (<1 minute)
  - Environment variable access verified in all environments

- [ ] **Quality Gate Testing:**
  - CI/CD pipeline fails appropriately on broken code
  - Performance budgets trigger build failures when exceeded
  - Security vulnerabilities block deployment
  - All quality checks pass on clean codebase

- [ ] **Performance Testing:**
  - Core Web Vitals thresholds met on production
  - CDN cache hit rates >90% for static assets
  - Edge function response times <200ms
  - Image optimization reducing file sizes >50%

## 📊 Definition of Done

- [ ] **Infrastructure Complete:**
  - All three environments (prod/preview/dev) functional
  - CI/CD pipeline executing all quality gates
  - Deployment automation working end-to-end
  - Rollback procedure tested and documented

- [ ] **Documentation Complete:**
  - Deployment workflow documented for team
  - Environment variable management guide created
  - Troubleshooting guide for common issues
  - Security procedures documented and reviewed

- [ ] **Team Readiness:**
  - Team training completed on new workflow
  - Access permissions verified for all team members
  - Emergency procedures communicated
  - On-call rotation and escalation defined

## ⚠️ Risk Assessment

| Risk                      | Impact | Probability | Mitigation                                 |
| ------------------------- | ------ | ----------- | ------------------------------------------ |
| Vercel service outage     | High   | Low         | Multi-region setup, status monitoring      |
| Environment variable leak | High   | Medium      | Proper secrets management, access auditing |
| Build pipeline failure    | Medium | Medium      | Comprehensive testing, fallback procedures |
| Domain/DNS issues         | High   | Low         | Multiple DNS providers, TTL optimization   |

## 📈 Success Metrics

- **Deployment Frequency:** Target 5-10 deployments per week
- **Deployment Success Rate:** >95% successful deployments
- **Mean Time to Deploy:** <5 minutes from merge to live
- **Mean Time to Rollback:** <1 minute to previous version
- **Uptime Target:** >99.9% availability from Day 1

## 🛠️ Technical Implementation Notes

### Environment Variables Required

```bash
# Production
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxxx
SANITY_API_TOKEN=skxxxxxxxxxxxxxxxxxx
FITBOX_API_KEY=xxxxxxxxxxxxxxxxxx
TAWK_TO_SITE_ID=xxxxxxxxxxxxxxxxxx
EMAIL_SERVICE_API_KEY=xxxxxxxxxxxxxxxxxx
TURNSTILE_SECRET_KEY=xxxxxxxxxxxxxxxxxx
```

### Vercel Configuration

```json
{
  "version": 2,
  "builds": [{ "src": "package.json", "use": "@vercel/next" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

### GitHub Actions Pipeline

```yaml
name: CI/CD Pipeline
on:
  push: { branches: [main] }
  pull_request: { branches: [main] }

jobs:
  quality-gates:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: '18', cache: 'npm' }
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      - run: npm audit --audit-level moderate
```

## 📝 Operational Procedures

### Deployment Checklist

- [ ] Feature branch PR approved and reviewed
- [ ] All CI/CD quality checks passing
- [ ] Performance impact assessed (bundle size, Core Web Vitals)
- [ ] Security review completed for sensitive changes
- [ ] Rollback plan documented if needed

### Emergency Rollback Procedure

1. **Immediate:** Use Vercel dashboard 1-click rollback
2. **Verification:** Confirm rollback successful via health checks
3. **Communication:** Notify team and stakeholders
4. **Investigation:** Document incident and root cause
5. **Prevention:** Update procedures to prevent recurrence

---

**Story Owner:** DevOps Lead  
**Technical Lead:** Development Lead  
**Reviewer:** Product Manager  
**Created:** September 14, 2025  
**Status:** Ready for Development
