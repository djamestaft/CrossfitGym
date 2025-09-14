# Deployment Guide - Geelong Movement Co

## 📋 Overview

This guide covers the complete deployment infrastructure setup for the Geelong Movement Co website, including CI/CD pipeline, environment configuration, and operational procedures.

## 🚀 Deployment Infrastructure

### Vercel Project Setup

**Production Environment:**

- **Domain:** geelongmovement.com (custom domain with SSL)
- **Auto-deployment:** From `main` branch
- **Performance monitoring:** Enabled via Vercel Analytics
- **Security headers:** Configured via `vercel.json`

**Preview Environments:**

- **Trigger:** All pull requests automatically
- **URL Pattern:** `https://gmc-pr-[number].vercel.app`
- **Cleanup:** Automatic removal after PR merge/close

### CI/CD Pipeline Quality Gates

The GitHub Actions pipeline (`/.github/workflows/ci-cd.yml`) enforces these quality gates:

1. **TypeScript Compilation** - `npm run type-check`
2. **Code Quality** - `npm run lint` (ESLint with zero warnings)
3. **Code Formatting** - `npm run format:check` (Prettier validation)
4. **Unit Tests** - `npm run test:coverage` (80% coverage required)
5. **Build Verification** - `npm run build`
6. **Security Audit** - `npm run audit:security`
7. **Bundle Analysis** - `npm run analyze`
8. **Lighthouse CI** - Performance, accessibility, SEO audits

## 🔧 Environment Configuration

### Required Environment Variables

Copy `app/env.template` to `app/.env.local` and configure:

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://geelongmovement.com

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Content Management (Sanity)
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skxxxxxxxxxxxxxxxxxx

# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=admin@geelongmovement.com

# Integrations
FITBOX_API_KEY=xxxxxxxxxxxxxxxxxx
TAWK_TO_SITE_ID=xxxxxxxxxxxxxxxxxx

# Security
TURNSTILE_SECRET_KEY=xxxxxxxxxxxxxxxxxx
```

### GitHub Secrets Required

Configure these secrets in GitHub repository settings:

```bash
VERCEL_TOKEN=xxxxxxxxxxxxxxxxxx
VERCEL_ORG_ID=xxxxxxxxxxxxxxxxxx
VERCEL_PROJECT_ID=xxxxxxxxxxxxxxxxxx
LHCI_GITHUB_APP_TOKEN=xxxxxxxxxxxxxxxxxx
```

## 📊 Performance Monitoring

### Core Web Vitals Targets

- **Largest Contentful Paint (LCP):** < 2.5s
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1

### Bundle Size Monitoring

- **Total Bundle Size:** < 250KB (gzipped)
- **First Load JS:** < 130KB
- **Vendor Chunks:** Automatically split for optimal caching

### Lighthouse CI Thresholds

- **Performance:** > 80
- **Accessibility:** > 90
- **Best Practices:** > 90
- **SEO:** > 90

## 🔄 Deployment Workflow

### Feature Development

1. **Create Feature Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Development & Testing:**

   ```bash
   npm run dev        # Local development
   npm run test       # Run tests
   npm run lint       # Check code quality
   ```

3. **Create Pull Request:**
   - All quality gates must pass
   - Preview deployment automatically created
   - Lighthouse CI runs on preview

4. **Review & Merge:**
   - Code review required
   - All checks must be green
   - Automatic production deployment on merge

### Production Deployment

1. **Automatic Trigger:** Merge to `main` branch
2. **Quality Gates:** All CI checks must pass
3. **Deployment:** Zero-downtime deployment to production
4. **Health Check:** Post-deployment verification
5. **Monitoring:** Real-time performance tracking

## 🚨 Emergency Procedures

### Rollback Procedure

**Option 1: Vercel Dashboard (Fastest)**

1. Open [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to project deployments
3. Click "Promote to Production" on previous stable deployment
4. Rollback completes in < 1 minute

**Option 2: Git Revert**

1. Identify commit to revert: `git log --oneline`
2. Create revert: `git revert [commit-hash]`
3. Push to main: `git push origin main`
4. Automatic deployment of reverted state

### Health Check Endpoint

Monitor application health: `https://geelongmovement.com/api/health`

**Expected Response:**

```json
{
  "status": "healthy",
  "timestamp": "2025-09-14T12:00:00.000Z",
  "version": "1.0.0",
  "environment": "production",
  "uptime": 3600
}
```

### Monitoring & Alerts

- **Uptime Monitoring:** Vercel automatic monitoring
- **Performance:** Real User Monitoring via Vercel Analytics
- **Error Tracking:** Console errors logged and monitored
- **Build Failures:** GitHub notifications to team

## 🔒 Security Measures

### Security Headers

Automatically applied via `vercel.json`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Environment Security

- **Production secrets:** Stored in Vercel environment variables
- **Preview secrets:** Separate environment configuration
- **Development:** Local `.env.local` (gitignored)

## 📈 Success Metrics

### Deployment KPIs

- **Deployment Frequency:** Target 5-10 per week
- **Deployment Success Rate:** > 95%
- **Mean Time to Deploy:** < 5 minutes
- **Mean Time to Rollback:** < 1 minute
- **Uptime Target:** > 99.9%

### Performance KPIs

- **Bundle Size Growth:** < 5% per release
- **Core Web Vitals:** All metrics in "Good" range
- **Lighthouse Scores:** All categories > 90

## 🛠️ Troubleshooting

### Common Issues

**Build Failures:**

- Check TypeScript errors: `npm run type-check`
- Check lint errors: `npm run lint`
- Check test failures: `npm run test`

**Deployment Issues:**

- Verify environment variables in Vercel dashboard
- Check build logs in Vercel deployment details
- Verify GitHub secrets configuration

**Performance Issues:**

- Run bundle analyzer: `npm run analyze`
- Check Lighthouse CI reports in PR comments
- Monitor Core Web Vitals in Vercel Analytics

### Support Contacts

- **Technical Issues:** Development Team
- **Infrastructure:** DevOps Lead
- **Emergency Escalation:** Product Manager

---

**Last Updated:** September 14, 2025  
**Version:** 1.0.0  
**Status:** Active
