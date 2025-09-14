# Epic 7: Infrastructure & Hosting

**Epic ID:** EPIC-07  
**Priority:** Critical Foundation  
**Business Value:** Reliable delivery and operations  
**Technical Complexity:** Medium  
**Effort Estimate:** 6-8 story points  
**Sprint Target:** Week 0-1  

## 🎯 Epic Goal

Establish robust, scalable infrastructure foundation that enables safe deployments, reliable operations, and efficient development workflows.

**Success Metrics:**
- ≥99.9% uptime throughout MVP period
- <5 minute deployment times with zero-downtime
- 1-click rollback capability verified and documented
- Automated CI/CD pipeline with quality gates

## 👥 User Stories

### Story INFRA-001: Vercel Project & CI/CD Pipeline
**As a** Development Team  
**I need** automated deployment infrastructure  
**So that** I can deploy safely and roll back quickly if issues occur  

**Acceptance Criteria:**
- [ ] **Vercel Project Setup** with optimized Next.js configuration
- [ ] **Environment Management:**
  - Production environment with custom domain
  - Preview environments for all pull requests
  - Development environment for testing
  - Environment variable management with secrets
- [ ] **CI/CD Pipeline** with automated quality gates:
  - Build verification and type checking
  - Linting and code quality checks
  - Automated testing execution
  - Performance budget enforcement
  - Security vulnerability scanning
- [ ] **Deployment Strategy:**
  - Automatic deployments from main branch
  - Preview deployments for feature branches
  - 1-click rollback to previous versions
  - Blue-green deployment pattern
- [ ] **Performance Optimization:**
  - Edge function configuration
  - CDN optimization and caching strategies
  - Image optimization pipeline
  - Bundle analysis and size monitoring

**Dependencies:**
- Repository setup and branch protection rules
- Domain registration and DNS configuration
- Team access management and permissions
- Environment variable inventory and security review

**Definition of Done:**
- [ ] All deployment environments functional and tested
- [ ] Rollback procedure tested and documented
- [ ] Environment variables properly secured
- [ ] Team training completed on deployment workflow
- [ ] Performance optimization verified

---

### Story INFRA-002: Monitoring & Health Checks
**As a** Operations Team  
**I need** comprehensive monitoring  
**So that** I can detect and respond to issues before they impact users  

**Acceptance Criteria:**
- [ ] **Uptime Monitoring** with geographical distribution:
  - Homepage and critical path monitoring
  - FMS form submission endpoint monitoring
  - API endpoint health checks
  - Database connectivity verification
  - Third-party service dependency monitoring
- [ ] **Error Tracking & Alerting:**
  - 404/500 error rate monitoring with thresholds
  - JavaScript error tracking and reporting
  - Failed form submission monitoring
  - API rate limit and timeout tracking
  - Real-time alert notifications via Slack/email
- [ ] **Performance Monitoring:**
  - Core Web Vitals continuous tracking
  - Server response time monitoring
  - Database query performance tracking
  - Third-party service response time monitoring
- [ ] **Security Monitoring:**
  - Suspicious traffic pattern detection
  - Failed authentication attempt monitoring
  - DDoS protection and rate limiting
  - SSL certificate expiry monitoring
- [ ] **Business Metrics Monitoring:**
  - FMS form completion rate tracking
  - Critical user journey success rate
  - Revenue-impacting error detection

**Dependencies:**
- Monitoring service selection and configuration
- Alert channel setup (Slack, email, SMS)
- Incident response procedure documentation
- Escalation contact list and on-call rotation

**Definition of Done:**
- [ ] 24/7 monitoring coverage for all critical systems
- [ ] Alert thresholds calibrated to minimize false positives
- [ ] Incident response procedures tested
- [ ] Monitoring dashboard accessible to relevant team members
- [ ] Historical data collection and trending functional

## 🔗 Epic Dependencies

**Upstream Dependencies:**
- Repository and version control setup
- Domain registration and DNS management
- Team access and permission management
- Security policies and procedures

**Downstream Dependencies:**
- All other epics depend on reliable infrastructure
- Deployment pipeline enables safe feature delivery
- Monitoring provides visibility into all MVP functionality

## 🏗️ Architecture Overview

### Hosting Stack
```
Production Architecture:
┌─────────────────────────────────────────────────┐
│                   Vercel Edge                   │
│                 (Global CDN)                    │
├─────────────────────────────────────────────────┤
│              Next.js Application                │
│              (Server Components)                │
├─────────────────────────────────────────────────┤
│                    Sanity CMS                   │
│                (Content Backend)                │
├─────────────────────────────────────────────────┤
│               External Services                 │
│   ┌─────────┬──────────┬─────────┬─────────┐   │
│   │ Fitbox  │ Tawk.to  │  GA4    │ Email   │   │
│   │   API   │   Chat   │Analytics│ Service │   │
│   └─────────┴──────────┴─────────┴─────────┘   │
└─────────────────────────────────────────────────┘
```

### Environment Strategy
```
Environment Hierarchy:
Production (geelongmovement.com)
├── Main branch auto-deploy
├── Custom domain with SSL
├── Production environment variables
└── Full monitoring and alerting

Preview (preview-xyz.vercel.app)
├── Feature branch auto-deploy
├── Preview environment variables
├── QA testing and stakeholder review
└── Basic monitoring

Development (localhost:3000)
├── Local development environment
├── Hot reload and debugging
├── Local environment variables
└── Development tools enabled
```

## 🚀 CI/CD Pipeline Configuration

### GitHub Actions Workflow
```yaml
# .github/workflows/main.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality-gates:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type checking
        run: npm run type-check
      
      - name: Linting
        run: npm run lint
      
      - name: Unit tests
        run: npm run test
      
      - name: Build verification
        run: npm run build
      
      - name: Performance budget check
        run: npm run build-analyze
      
      - name: Security audit
        run: npm audit --audit-level moderate

  lighthouse-ci:
    runs-on: ubuntu-latest
    needs: quality-gates
    steps:
      - name: Lighthouse CI
        run: lhci autorun
```

### Vercel Configuration
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/admin",
      "destination": "/portal",
      "permanent": true
    }
  ],
  "env": {
    "NEXT_PUBLIC_GA_ID": "@ga-measurement-id",
    "SANITY_PROJECT_ID": "@sanity-project-id",
    "SANITY_DATASET": "@sanity-dataset"
  }
}
```

## 📊 Monitoring Configuration

### Uptime Monitoring
```javascript
// monitoring/uptime-checks.js
const uptimeChecks = [
  {
    name: 'Homepage',
    url: 'https://geelongmovement.com',
    interval: '5min',
    timeout: '10s',
    expectedStatus: 200
  },
  {
    name: 'FMS Form',
    url: 'https://geelongmovement.com/fms',
    interval: '5min',
    timeout: '10s',
    expectedStatus: 200
  },
  {
    name: 'Portal Login',
    url: 'https://geelongmovement.com/portal',
    interval: '10min',
    timeout: '15s',
    expectedStatus: 200
  },
  {
    name: 'Sanity API',
    url: 'https://[project-id].api.sanity.io/v1/data/query/production',
    interval: '5min',
    timeout: '10s',
    expectedStatus: 200
  }
];
```

### Alert Configuration
```yaml
# monitoring/alerts.yml
alerts:
  critical:
    - name: "Site Down"
      condition: "uptime < 99%"
      channels: ["slack-critical", "email-oncall", "sms-oncall"]
      
    - name: "FMS Form Failures"
      condition: "form_success_rate < 90%"
      channels: ["slack-critical", "email-product"]
      
  warning:
    - name: "Performance Degradation"
      condition: "response_time > 3s"
      channels: ["slack-dev"]
      
    - name: "Error Rate Spike"
      condition: "error_rate > 5%"
      channels: ["slack-dev", "email-dev"]

notification_channels:
  slack-critical:
    webhook: "${SLACK_WEBHOOK_CRITICAL}"
    
  email-oncall:
    addresses: ["oncall@geelongmovement.com"]
    
  sms-oncall:
    numbers: ["+61XXXXXXXXX"]
```

## 🔒 Security Configuration

### Environment Variables Management
```bash
# Production Environment Variables
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxxx
SANITY_API_TOKEN=skxxxxxxxxxxxxxxxxxx
FITBOX_API_KEY=xxxxxxxxxxxxxxxxxx
TAWK_TO_SITE_ID=xxxxxxxxxxxxxxxxxx
EMAIL_SERVICE_API_KEY=xxxxxxxxxxxxxxxxxx
TURNSTILE_SECRET_KEY=xxxxxxxxxxxxxxxxxx

# Security Headers
SECURITY_HEADERS_ENABLED=true
CSP_REPORT_URI=https://monitoring.service.com/csp-report
```

### SSL and Domain Security
```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' *.google-analytics.com *.googletagmanager.com; style-src 'self' 'unsafe-inline'"
          }
        ]
      }
    ];
  }
};
```

## 📈 Success Criteria

### Reliability Targets
- **Uptime:** ≥99.9% availability (max 43 minutes downtime/month)
- **Response Time:** <2s for static pages, <3s for dynamic content
- **Error Rate:** <1% of requests result in errors
- **Deployment Success:** >95% of deployments succeed without rollback

### Performance Targets
- **Build Time:** <5 minutes for full CI/CD pipeline
- **Deployment Time:** <3 minutes from merge to live
- **Rollback Time:** <1 minute to previous version
- **Cache Hit Rate:** >90% for static assets

### Operational Excellence
- **Incident Detection:** <5 minutes to alert for critical issues
- **Incident Response:** <15 minutes to first response
- **Resolution Time:** <1 hour for critical issues
- **Documentation:** All procedures documented and up-to-date

## 🚨 Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Vercel service outage | Complete site unavailability | Multi-region deployment, status page monitoring |
| DNS failure | Site inaccessible | Multiple DNS providers, TTL optimization |
| SSL certificate expiry | Security warnings | Automated renewal, expiry monitoring |
| Environment variable leak | Security compromise | Proper secrets management, access auditing |
| Deployment failure | Feature delivery delays | Comprehensive testing, automated rollback |

## 🔧 Operational Procedures

### Deployment Checklist
- [ ] Feature branch tested and reviewed
- [ ] All CI/CD checks passing
- [ ] Performance impact assessed
- [ ] Security implications reviewed
- [ ] Rollback plan documented
- [ ] Stakeholder notification if needed

### Incident Response Workflow
1. **Detection:** Automated alerts or manual reporting
2. **Assessment:** Determine severity and impact
3. **Response:** Immediate mitigation steps
4. **Communication:** Stakeholder notification
5. **Resolution:** Root cause analysis and fix
6. **Follow-up:** Post-incident review and improvements

### Backup and Recovery
```javascript
// backup/recovery-procedures.js
const backupProcedures = {
  code: 'Git repository with branch protection',
  content: 'Sanity automatic backups + manual exports',
  configuration: 'Environment variables documented and versioned',
  monitoring: 'Configuration as code in repository'
};

const recoveryTargets = {
  RTO: '15 minutes', // Recovery Time Objective
  RPO: '1 hour'      // Recovery Point Objective
};
```

**Epic Owner:** DevOps Lead  
**Tech Lead:** Development Lead  
**Operations Owner:** Product Manager  
**Last Updated:** September 13, 2025
