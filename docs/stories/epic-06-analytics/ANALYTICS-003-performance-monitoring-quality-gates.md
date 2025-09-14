# User Story: ANALYTICS-003 - Performance Monitoring & Quality Gates

**Epic:** Epic 6: Analytics & Observability  
**Story ID:** ANALYTICS-003  
**Priority:** High  
**Effort Estimate:** 3 story points  
**Sprint Target:** Week 1-2 (parallel with FMS development)

## 📋 User Story

**As a** Development Lead and operations team  
**I need** automated performance monitoring and quality gates  
**So that** I can maintain high user experience standards, detect issues quickly, and prevent performance regressions

## ✅ Acceptance Criteria

### Core Web Vitals Monitoring

- [ ] **Largest Contentful Paint (LCP) Monitoring:**
  - Target: ≤2.5 seconds for all critical pages
  - Automated monitoring for homepage, FMS landing, condition hubs, articles
  - Device-specific tracking (mobile, desktop, tablet)
  - Network condition simulation (3G, 4G, WiFi)
  - Real User Monitoring (RUM) data collection
  - Performance budget alerts when thresholds exceeded

- [ ] **Cumulative Layout Shift (CLS) Tracking:**
  - Target: ≤0.1 for all page types
  - Layout stability monitoring during page load
  - Component-level shift attribution
  - Image and font loading impact analysis
  - Ad and dynamic content shift tracking
  - Mobile viewport stability verification

- [ ] **Interaction to Next Paint (INP) Measurement:**
  - Target: ≤200ms for all user interactions
  - Button click, form input, and navigation responsiveness
  - JavaScript execution time impact monitoring
  - Third-party script performance impact
  - Touch interaction optimization on mobile
  - Keyboard navigation performance tracking

- [ ] **First Input Delay (FID) & Other Metrics:**
  - Target: ≤100ms for first interaction responsiveness
  - Time to First Byte (TTFB) ≤600ms monitoring
  - First Contentful Paint (FCP) tracking
  - Speed Index calculation and trending
  - Total Blocking Time (TBT) measurement
  - Resource loading waterfall analysis

### Lighthouse CI Integration

- [ ] **Automated Testing Pipeline:**
  - Lighthouse CI integration in GitHub Actions workflow
  - Performance audits on every pull request
  - Automated scoring for Performance, SEO, Accessibility, Best Practices
  - Historical score tracking and regression detection
  - Branch comparison and performance impact analysis
  - Failed deployment prevention for severe regressions

- [ ] **Performance Budget Enforcement:**
  - JavaScript bundle size limits (<250KB compressed)
  - Image optimization requirements (WebP, proper sizing)
  - CSS optimization and critical path rendering
  - Third-party script loading budget enforcement
  - Font loading optimization verification
  - Network request count and size limitations

- [ ] **Quality Score Thresholds:**
  - Performance score ≥85 required for deployment
  - Accessibility score ≥90 mandatory for all pages
  - SEO score ≥80 for content and landing pages
  - Best Practices score ≥90 for security and performance
  - Progressive Web App checklist compliance
  - Cross-browser compatibility verification

### Accessibility Baseline & Testing

- [ ] **WCAG AA Compliance Monitoring:**
  - Automated accessibility testing in CI/CD pipeline
  - Screen reader compatibility verification
  - Keyboard navigation functionality testing
  - Color contrast ratio monitoring (4.5:1 minimum)
  - Focus indicator visibility and logical order
  - Alternative text compliance for images

- [ ] **Accessibility Regression Prevention:**
  - Axe-core integration for automated testing
  - Lighthouse accessibility audit automation
  - Manual testing checklist for complex interactions
  - Screen reader testing with NVDA/JAWS simulation
  - Voice control compatibility verification
  - High contrast mode support validation

- [ ] **Inclusive Design Monitoring:**
  - Text scaling support up to 200% zoom
  - Motion sensitivity and animation controls
  - Language and localization readiness
  - Cognitive load assessment for complex flows
  - Error message clarity and helpfulness
  - Form accessibility and validation feedback

### Error Monitoring & Alerting

- [ ] **HTTP Error Tracking:**
  - 404 error monitoring with broken link detection
  - 500 server error tracking and alerting
  - API endpoint failure monitoring
  - Form submission error rates
  - Image and asset loading failure detection
  - Third-party service failure impact monitoring

- [ ] **JavaScript Error Monitoring:**
  - Runtime error tracking with stack traces
  - Unhandled promise rejection detection
  - Console error and warning aggregation
  - Browser compatibility issue identification
  - Performance API error monitoring
  - User interaction failure tracking

- [ ] **Real-Time Error Alerting:**
  - Critical error immediate notification (<5 minutes)
  - Error rate threshold alerts (>5% error rate)
  - User impact assessment and prioritization
  - Automatic error categorization and routing
  - Error trend analysis and pattern recognition
  - Recovery monitoring and validation

### Uptime & Availability Monitoring

- [ ] **24/7 Uptime Monitoring:**
  - Multi-location monitoring (Sydney, Melbourne, Brisbane)
  - Critical user journey monitoring (homepage → FMS → success)
  - API endpoint health checks and response time tracking
  - Database connectivity and query performance monitoring
  - CDN performance and cache hit rate tracking
  - Third-party service dependency monitoring

- [ ] **Performance SLA Tracking:**
  - 99.9% uptime target monitoring and reporting
  - Response time SLA compliance (≤2 seconds)
  - Error rate SLA tracking (≤1% error rate)
  - Recovery time measurement after incidents
  - Planned maintenance window coordination
  - Service status page automation

- [ ] **Incident Response Automation:**
  - Automatic failover procedures for critical services
  - Load balancer health check configuration
  - Database connection pooling and timeout handling
  - Cache warming procedures after deployments
  - Rollback automation for failed deployments
  - Status communication automation to stakeholders

### Alert System & Escalation

- [ ] **Intelligent Alert Configuration:**
  - Performance threshold alerts with smart grouping
  - Error spike detection with contextual information
  - User experience impact scoring and prioritization
  - Alert fatigue prevention through machine learning
  - Business hours vs. after-hours alert routing
  - Seasonal and traffic pattern aware thresholds

- [ ] **Multi-Channel Notification:**
  - Slack integration for development team alerts
  - Email notifications for stakeholder updates
  - SMS alerts for critical production issues
  - PagerDuty integration for on-call escalation
  - Dashboard notification center for team awareness
  - Mobile app notifications for key personnel

- [ ] **Escalation Procedures:**
  - Automated escalation after response time thresholds
  - Role-based alert routing (developer, DevOps, management)
  - Incident severity classification and response SLA
  - Follow-up procedures for resolved incidents
  - Post-incident review automation and documentation
  - Continuous improvement feedback loop integration

## 🔗 Dependencies

**Upstream Dependencies:**

- [ ] CI/CD pipeline infrastructure (INFRA-001) operational
- [ ] Website deployment and hosting platform ready
- [ ] Monitoring service accounts and integrations configured
- [ ] Team notification channels (Slack, email) established

**Technical Dependencies:**

- [ ] Lighthouse CI setup and configuration
- [ ] Performance monitoring service selection and setup
- [ ] Error tracking service integration (Sentry, LogRocket, etc.)
- [ ] Uptime monitoring service configuration

**Process Dependencies:**

- [ ] Incident response procedures documented
- [ ] On-call rotation and escalation procedures
- [ ] Performance budget agreements with stakeholders
- [ ] Quality standards definition and approval

## 🧪 Testing Criteria

- [ ] **Performance Testing:**
  - Core Web Vitals measurements accurate across devices
  - Lighthouse CI preventing regression deployments
  - Performance budgets enforced consistently
  - Real User Monitoring data collection functional
  - Network throttling simulations producing expected results

- [ ] **Error Detection Testing:**
  - Synthetic errors trigger appropriate alerts
  - Error categorization and routing working correctly
  - Recovery monitoring validates issue resolution
  - False positive rate <5% for critical alerts
  - Alert delivery to all configured channels successful

- [ ] **Monitoring Coverage Testing:**
  - All critical user journeys monitored end-to-end
  - Geographic monitoring providing consistent results
  - Third-party service failures detected and reported
  - Database and API monitoring capturing performance data
  - Cache performance and CDN effectiveness measured

- [ ] **Incident Response Testing:**
  - Automated escalation procedures tested with synthetic incidents
  - Alert routing reaches appropriate team members
  - Recovery procedures validate successful issue resolution
  - Documentation automatically generated for incident reviews
  - Team response times meet established SLA targets

## 📊 Definition of Done

- [ ] **Monitoring Infrastructure Complete:**
  - Core Web Vitals monitoring active for all critical pages
  - Lighthouse CI integrated and enforcing quality gates
  - Error monitoring capturing and categorizing issues
  - Uptime monitoring covering all critical services

- [ ] **Alert System Operational:**
  - Performance alerts configured with appropriate thresholds
  - Error alerts routing to correct team members
  - Escalation procedures tested and documented
  - Alert fatigue minimized through intelligent filtering

- [ ] **Quality Gates Enforced:**
  - Performance regressions blocked from deployment
  - Accessibility compliance verified automatically
  - Error rate thresholds preventing bad releases
  - Manual quality checklist documented for complex changes

- [ ] **Team Readiness:**
  - Incident response procedures trained and tested
  - On-call rotation established with clear responsibilities
  - Monitoring dashboard access configured for all team members
  - Documentation complete for troubleshooting common issues

## ⚠️ Risk Assessment

| Risk                                    | Impact | Probability | Mitigation                                               |
| --------------------------------------- | ------ | ----------- | -------------------------------------------------------- |
| False positive alerts overwhelming team | Medium | High        | Intelligent thresholds, alert grouping, machine learning |
| Critical performance issues undetected  | High   | Low         | Multiple monitoring layers, redundant checks             |
| Monitoring service outages              | Medium | Medium      | Multiple monitoring providers, internal fallbacks        |
| Performance budget too restrictive      | Medium | Medium      | Gradual implementation, stakeholder education            |
| Team alert fatigue                      | Medium | High        | Smart filtering, customizable notification preferences   |

## 📈 Success Metrics

**Performance Standards:**

- **Core Web Vitals:** 100% of critical pages meet targets
- **Lighthouse Scores:** >90% deployments pass quality gates
- **Error Detection:** <5 minutes average time to alert
- **Uptime Achievement:** >99.9% availability maintained

**Monitoring Effectiveness:**

- **Alert Accuracy:** <10% false positive rate
- **Response Time:** <15 minutes average incident response
- **Issue Resolution:** <1 hour average resolution for critical issues
- **Regression Prevention:** 0 performance regressions deployed

**Team Efficiency:**

- **Tool Adoption:** >95% team uses monitoring dashboards
- **Process Compliance:** >90% incidents follow response procedures
- **Knowledge Sharing:** 100% incidents documented for learning
- **Continuous Improvement:** Monthly optimization recommendations implemented

## 🛠️ Technical Implementation Notes

### Lighthouse CI Configuration

```yaml
# .github/workflows/lighthouse-ci.yml
name: Lighthouse CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  lighthouse-ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Start server
        run: npm start &

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### Lighthouse Configuration

```javascript
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/fms',
        'http://localhost:3000/hubs/shoulder',
        'http://localhost:3000/articles/injury-safe-scaling',
        'http://localhost:3000/portal',
        'http://localhost:3000/timetable',
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        emulatedFormFactor: 'mobile',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        interactive: ['warn', { maxNumericValue: 3000 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports',
    },
    server: {
      port: 9001,
      storage: {
        storageMethod: 'sql',
        sqlDialect: 'sqlite',
        sqlDatabasePath: './lighthouse-ci.db',
      },
    },
  },
}
```

### Web Vitals Monitoring

```typescript
// lib/monitoring/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

interface WebVitalsMetric {
  name: string
  value: number
  id: string
  delta: number
  entries: PerformanceEntry[]
}

class WebVitalsMonitor {
  private metrics: Map<string, WebVitalsMetric> = new Map()
  private reportingEndpoint: string

  constructor(reportingEndpoint: string) {
    this.reportingEndpoint = reportingEndpoint
    this.initializeMonitoring()
  }

  private initializeMonitoring() {
    // Core Web Vitals
    getCLS(this.handleMetric.bind(this))
    getFID(this.handleMetric.bind(this))
    getFCP(this.handleMetric.bind(this))
    getLCP(this.handleMetric.bind(this))
    getTTFB(this.handleMetric.bind(this))

    // Additional performance metrics
    this.monitorCustomMetrics()
  }

  private handleMetric(metric: WebVitalsMetric) {
    this.metrics.set(metric.name, metric)

    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        metric_name: metric.name,
        metric_value: Math.round(metric.value),
        metric_id: metric.id,
        page_type: this.getPageType(),
        device_type: this.getDeviceType(),
      })
    }

    // Send to monitoring service
    this.reportToMonitoringService(metric)

    // Check thresholds and alert if needed
    this.checkThresholds(metric)
  }

  private async reportToMonitoringService(metric: WebVitalsMetric) {
    try {
      await fetch(this.reportingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metric: metric.name,
          value: metric.value,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          connection: this.getConnectionInfo(),
        }),
      })
    } catch (error) {
      console.warn('Failed to report web vitals:', error)
    }
  }

  private checkThresholds(metric: WebVitalsMetric) {
    const thresholds = {
      CLS: 0.1,
      FID: 100,
      LCP: 2500,
      FCP: 1800,
      TTFB: 600,
    }

    const threshold = thresholds[metric.name as keyof typeof thresholds]
    if (threshold && metric.value > threshold) {
      this.triggerPerformanceAlert(metric, threshold)
    }
  }

  private triggerPerformanceAlert(metric: WebVitalsMetric, threshold: number) {
    console.warn(
      `Performance threshold exceeded: ${metric.name} = ${metric.value}ms (threshold: ${threshold}ms)`
    )

    // Report to error tracking service
    if (typeof Sentry !== 'undefined') {
      Sentry.captureMessage(`Performance threshold exceeded: ${metric.name}`, {
        level: 'warning',
        extra: {
          metric: metric.name,
          value: metric.value,
          threshold: threshold,
          url: window.location.href,
        },
      })
    }
  }

  private monitorCustomMetrics() {
    // Monitor specific page load events
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming

        if (navigation) {
          this.reportCustomMetric(
            'page_load_complete',
            navigation.loadEventEnd - navigation.fetchStart
          )
          this.reportCustomMetric(
            'dom_interactive',
            navigation.domInteractive - navigation.fetchStart
          )
          this.reportCustomMetric(
            'dom_content_loaded',
            navigation.domContentLoadedEventEnd - navigation.fetchStart
          )
        }
      }, 0)
    })

    // Monitor resource loading
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming

          // Monitor large resource loads
          if (resourceEntry.transferSize > 1000000) {
            // > 1MB
            this.reportCustomMetric(
              'large_resource_load',
              resourceEntry.duration
            )
          }
        }
      }
    }).observe({ entryTypes: ['resource'] })
  }

  private reportCustomMetric(name: string, value: number) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'custom_performance_metric', {
        metric_name: name,
        metric_value: Math.round(value),
        page_type: this.getPageType(),
      })
    }
  }

  private getPageType(): string {
    const path = window.location.pathname
    if (path === '/') return 'homepage'
    if (path === '/fms') return 'fms'
    if (path.startsWith('/hubs/')) return 'hub'
    if (path.startsWith('/articles/')) return 'article'
    if (path.startsWith('/portal/')) return 'portal'
    return 'other'
  }

  private getDeviceType(): string {
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  private getConnectionInfo() {
    const connection = (navigator as any).connection
    if (connection) {
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
      }
    }
    return null
  }

  // Public method to get current metrics
  getMetrics(): Map<string, WebVitalsMetric> {
    return new Map(this.metrics)
  }
}

// Initialize monitoring
if (typeof window !== 'undefined') {
  new WebVitalsMonitor('/api/monitoring/web-vitals')
}
```

### Error Monitoring Integration

```typescript
// lib/monitoring/error-tracking.ts
import * as Sentry from '@sentry/nextjs';

export function initializeErrorMonitoring() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    beforeSend(event, hint) {
      // Filter out noise and non-critical errors
      const error = hint.originalException;

      // Skip network errors that are likely user-related
      if (error instanceof TypeError && error.message.includes('fetch')) {
        const isUserNetworkIssue = error.message.includes('NetworkError') ||
                                  error.message.includes('Failed to fetch');
        if (isUserNetworkIssue) {
          return null;
        }
      }

      // Skip errors from browser extensions
      if (event.exception?.values?.[0]?.stacktrace?.frames) {
        const frames = event.exception.values[0].stacktrace.frames;
        const hasExtensionFrame = frames.some(frame =>
          frame.filename?.includes('extension://') ||
          frame.filename?.includes('moz-extension://')
        );
        if (hasExtensionFrame) {
          return null;
        }
      }

      return event;
    },

    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.nextRouterInstrumentation(NextRouter)
      })
    ]
  });

  // Global error handler for unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    Sentry.captureException(event.reason);

    // Also send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'javascript_error', {
        error_type: 'unhandled_promise_rejection',
        error_message: event.reason?.message || 'Unknown promise rejection',
        page_url: window.location.href
      });
    }
  });

  // Monitor performance issues
  if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure' && entry.duration > 1000) {
          Sentry.addBreadcrumb({
            message: `Slow operation detected: ${entry.name}`,
            level: 'warning',
            data: {
              duration: entry.duration,
              startTime: entry.startTime
            }
          });
        }
      }
    });

    perfObserver.observe({ entryTypes: ['measure'] });
  }
}

// Custom error boundary for React components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<any>
) {
  return Sentry.withErrorBoundary(Component, {
    fallback: fallback || DefaultErrorFallback,
    beforeCapture: (scope, error, info) => {
      scope.setTag('errorBoundary', true);
      scope.setContext('componentStack', {
        componentStack: info.componentStack
      });
    }
  });
}

function DefaultErrorFallback({ error, resetError }: any) {
  return (
    <div className="error-boundary">
      <h2>Something went wrong</h2>
      <p>We've been notified about this error and are working to fix it.</p>
      <button onClick={resetError}>Try again</button>
    </div>
  );
}
```

### Uptime Monitoring Setup

```typescript
// lib/monitoring/uptime.ts
export class UptimeMonitor {
  private endpoints: string[]
  private interval: number
  private timeoutMs: number

  constructor(endpoints: string[], interval = 60000, timeoutMs = 10000) {
    this.endpoints = endpoints
    this.interval = interval
    this.timeoutMs = timeoutMs
  }

  start() {
    this.checkAllEndpoints()
    setInterval(() => this.checkAllEndpoints(), this.interval)
  }

  private async checkAllEndpoints() {
    const checks = this.endpoints.map(endpoint => this.checkEndpoint(endpoint))
    await Promise.allSettled(checks)
  }

  private async checkEndpoint(url: string) {
    const startTime = Date.now()

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs)

      const response = await fetch(url, {
        signal: controller.signal,
        method: 'HEAD', // Use HEAD for efficiency
      })

      clearTimeout(timeoutId)
      const responseTime = Date.now() - startTime

      await this.recordSuccess(url, responseTime, response.status)
    } catch (error) {
      const responseTime = Date.now() - startTime
      await this.recordFailure(url, responseTime, error)
    }
  }

  private async recordSuccess(
    url: string,
    responseTime: number,
    status: number
  ) {
    const metric = {
      url,
      status: 'up',
      responseTime,
      httpStatus: status,
      timestamp: new Date().toISOString(),
    }

    // Send to monitoring service
    await this.sendToMonitoring(metric)

    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'uptime_check', {
        endpoint: url,
        status: 'success',
        response_time: responseTime,
        http_status: status,
      })
    }
  }

  private async recordFailure(url: string, responseTime: number, error: any) {
    const metric = {
      url,
      status: 'down',
      responseTime,
      error: error.message,
      timestamp: new Date().toISOString(),
    }

    // Send to monitoring service
    await this.sendToMonitoring(metric)

    // Send alert
    await this.sendAlert(url, error)

    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'uptime_check', {
        endpoint: url,
        status: 'failure',
        response_time: responseTime,
        error_type: error.name,
      })
    }
  }

  private async sendToMonitoring(metric: any) {
    try {
      await fetch('/api/monitoring/uptime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
      })
    } catch (error) {
      console.error('Failed to send uptime metric:', error)
    }
  }

  private async sendAlert(url: string, error: any) {
    // Implementation depends on alerting service
    console.error(`Uptime check failed for ${url}:`, error)

    // Send to error tracking
    if (typeof Sentry !== 'undefined') {
      Sentry.captureException(error, {
        tags: {
          type: 'uptime_check_failure',
          endpoint: url,
        },
      })
    }
  }
}

// Initialize uptime monitoring in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  const monitor = new UptimeMonitor(['/', '/fms', '/api/health', '/portal'])

  monitor.start()
}
```

## 📝 Performance Budget Configuration

### Resource Budgets

```json
{
  "budgets": [
    {
      "path": "/*",
      "timings": [
        {
          "metric": "interactive",
          "budget": 3000,
          "tolerance": 500
        },
        {
          "metric": "first-contentful-paint",
          "budget": 1800,
          "tolerance": 300
        }
      ],
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 250,
          "tolerance": 50
        },
        {
          "resourceType": "total",
          "budget": 1000,
          "tolerance": 200
        }
      ],
      "resourceCounts": [
        {
          "resourceType": "third-party",
          "budget": 10
        }
      ]
    }
  ]
}
```

### Quality Gates Checklist

- [ ] **Pre-Deployment:**
  - Lighthouse CI performance score ≥85
  - All Core Web Vitals meet targets
  - No critical accessibility regressions
  - Error rate <1% in testing environment

- [ ] **Post-Deployment:**
  - Real User Monitoring confirms performance targets
  - Error rates remain below thresholds
  - Uptime monitoring shows successful deployment
  - User feedback indicates no experience degradation

---

**Story Owner:** Development Lead  
**DevOps Lead:** Infrastructure Engineer  
**Quality Assurance:** QA Engineer  
**Created:** September 14, 2025  
**Status:** Ready for Development
