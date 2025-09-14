# User Story: ANALYTICS-002 - KPI Dashboard Setup

**Epic:** Epic 6: Analytics & Observability  
**Story ID:** ANALYTICS-002  
**Priority:** High  
**Effort Estimate:** 3 story points  
**Sprint Target:** Week 3-4  

## 📋 User Story

**As a** stakeholder and decision-maker  
**I want** automated weekly reports and accessible dashboards  
**So that** I can track MVP progress, understand business performance, and make data-driven optimization decisions  

## ✅ Acceptance Criteria

### Automated Weekly KPI Report
- [ ] **Lead Generation Metrics:**
  - Total FMS leads count with week-over-week percentage change
  - Lead source breakdown (organic, direct, referral, social, paid)
  - Form completion rate percentage (starts vs. completions)
  - Top-performing pages for lead generation
  - Cost per lead calculation where applicable
  - Geographic distribution of leads (local vs. non-local)

- [ ] **Conversion Funnel Metrics:**
  - FMS form completion rate (step 1 → step 2 → success)
  - FMS → First Session conversion percentage (manual tracking integration)
  - Median Time-to-First-Session in days
  - Weekly cohort analysis with conversion rates
  - Abandoned form analysis (exit points and reasons)
  - Follow-up success rates by lead quality

- [ ] **Engagement & Retention Metrics:**
  - Portal Weekly Active Users (members logging in)
  - Average session duration across key pages
  - Video completion rates by content category
  - Article engagement (time on page, scroll depth)
  - Return visitor percentage and frequency
  - Member portal feature usage statistics

- [ ] **Traffic & SEO Performance:**
  - Total website traffic with trend indicators
  - Organic traffic percentage and growth
  - Google Business Profile actions count and types
  - Local search visibility improvements
  - Page speed and Core Web Vitals summary
  - Search Console performance highlights

### Interactive Dashboard Platform
- [ ] **Dashboard Accessibility:**
  - Web-based dashboard accessible to all stakeholders
  - Role-based access controls (view-only vs. admin)
  - Mobile-responsive design for tablet and phone viewing
  - Single sign-on integration where possible
  - Bookmark-able URLs for specific report views
  - Guest access for external stakeholders

- [ ] **Data Visualization:**
  - Clear trend lines with week-over-week comparisons
  - Color-coded performance indicators (green/yellow/red)
  - Interactive charts allowing drill-down exploration
  - Percentage change indicators with directional arrows
  - Goal tracking with progress bars and target lines
  - Contextual tooltips explaining metrics and calculations

- [ ] **Real-Time Data Integration:**
  - Google Analytics 4 data connection with automated refresh
  - Google Business Profile API integration for local metrics
  - Manual data input capabilities for offline conversions
  - Data freshness indicators showing last update time
  - Automated data validation and error detection
  - Backup data sources for reliability

### Alert System & Notifications
- [ ] **Performance Alerts:**
  - Significant metric changes (>25% week-over-week)
  - Critical metric drops (>50% decline in key metrics)
  - Form completion rate below threshold alerts
  - Website performance degradation warnings
  - Traffic anomaly detection and notification
  - Goal achievement celebrations and notifications

- [ ] **Notification Channels:**
  - Email alerts to stakeholder distribution list
  - Slack integration for real-time team notifications
  - SMS alerts for critical issues (optional)
  - In-dashboard notification center
  - Customizable alert frequency (immediate, daily, weekly)
  - Alert escalation procedures for unresolved issues

- [ ] **Alert Configuration:**
  - Stakeholder-specific alert preferences
  - Metric-specific threshold customization
  - Time-based alert scheduling (business hours only)
  - Alert fatigue prevention with intelligent grouping
  - False positive filtering and learning algorithms
  - Manual alert testing and validation tools

### Export & Analysis Features
- [ ] **Data Export Capabilities:**
  - CSV/Excel export for detailed analysis
  - PDF report generation for presentations
  - Raw data export for custom analysis
  - Scheduled report delivery via email
  - API access for custom integrations
  - Historical data backup and archiving

- [ ] **Advanced Analysis Tools:**
  - Date range comparison functionality
  - Cohort analysis for conversion tracking
  - Segmentation by traffic source and user type
  - Goal tracking with milestone celebration
  - Custom metric calculation and tracking
  - Annotation system for external events impact

### Mobile Dashboard Optimization
- [ ] **Mobile User Experience:**
  - Touch-optimized navigation and interaction
  - Responsive chart rendering on small screens
  - Swipe gestures for chart navigation
  - Mobile-specific dashboard layouts
  - Offline viewing capabilities for cached data
  - Native app-like experience through PWA

- [ ] **Mobile-Specific Features:**
  - Quick metric overview on mobile home screen
  - Push notifications for critical alerts
  - Voice-activated report summaries (future enhancement)
  - Location-based insights when applicable
  - Mobile sharing capabilities for stakeholder updates
  - Mobile-optimized PDF reports

## 🔗 Dependencies

**Upstream Dependencies:**
- [ ] GA4 implementation and event tracking (ANALYTICS-001) functional
- [ ] Google Business Profile API access and configuration
- [ ] Dashboard platform selection and setup (Looker Studio, Tableau, etc.)
- [ ] Stakeholder access management and permissions

**Data Source Dependencies:**
- [ ] Manual conversion tracking system (FMS-004) operational
- [ ] Website performance monitoring data available
- [ ] Email marketing system integration (if applicable)
- [ ] Social media analytics access (if applicable)

**Technical Dependencies:**
- [ ] API integrations and data pipeline setup
- [ ] Automated report scheduling infrastructure
- [ ] Alert system configuration and testing
- [ ] Backup data storage and recovery procedures

## 🧪 Testing Criteria

- [ ] **Data Accuracy Testing:**
  - Dashboard metrics match source analytics within 5% variance
  - Manual data validation against GA4 reports
  - Cross-reference conversion data with operations records
  - Alert threshold testing with synthetic data
  - Historical data integrity verification

- [ ] **Performance Testing:**
  - Dashboard loads within 5 seconds on standard internet connections
  - Mobile responsiveness across iOS and Android devices
  - Export functionality handles large datasets (>10,000 rows)
  - Real-time data refresh without page reload
  - Concurrent user load testing (10+ simultaneous users)

- [ ] **User Experience Testing:**
  - Stakeholder usability testing with real users
  - Navigation intuitive for non-technical users
  - Chart interactions responsive and meaningful
  - Mobile experience comparable to desktop functionality
  - Alert system doesn't overwhelm users with notifications

- [ ] **Integration Testing:**
  - All data sources feeding correctly into dashboard
  - Alert delivery to all configured channels
  - Export functionality producing accurate reports
  - Permission controls preventing unauthorized access
  - Backup systems activate during primary system outages

## 📊 Definition of Done

- [ ] **Dashboard Operational:**
  - All MVP KPIs displayed with accurate data
  - Automated weekly reports generating and distributing
  - Interactive features functional across devices
  - Stakeholder access configured and tested

- [ ] **Alert System Active:**
  - Performance alerts configured with appropriate thresholds
  - Notification delivery tested across all channels
  - Alert escalation procedures documented and functional
  - False positive filtering reducing noise effectively

- [ ] **User Adoption Ready:**
  - Stakeholder training completed on dashboard usage
  - Documentation available for all features
  - Support procedures established for technical issues
  - Mobile access tested and optimized

- [ ] **Data Quality Assured:**
  - Data accuracy verified against multiple sources
  - Export functionality tested with real datasets
  - Historical data properly archived and accessible
  - Data retention policies implemented and compliant

## ⚠️ Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| GA4 data delays affecting reports | Medium | Medium | Build in data lag expectations, use real-time where needed |
| Dashboard platform downtime | High | Low | Backup reporting methods, multiple data export options |
| Data integration failures | High | Medium | Monitoring, automated testing, fallback data sources |
| Stakeholder adoption resistance | Medium | Medium | Training, simple interface design, clear value demonstration |
| Alert fatigue from over-notification | Medium | High | Intelligent thresholds, customizable preferences |

## 📈 Success Metrics

**Dashboard Adoption:**
- **Weekly Usage:** >80% stakeholders access dashboard weekly
- **Session Duration:** >5 minutes average dashboard session
- **Feature Utilization:** >60% stakeholders use drill-down features
- **Mobile Usage:** >40% of dashboard access from mobile devices

**Data Quality:**
- **Data Accuracy:** <5% variance between dashboard and source systems
- **Report Timeliness:** Weekly reports delivered within 2 hours of schedule
- **System Uptime:** >99% dashboard availability during business hours
- **Alert Accuracy:** <10% false positive rate on performance alerts

**Business Impact:**
- **Decision Speed:** 50% faster decision-making with accessible data
- **Insight Generation:** >5 actionable insights identified monthly
- **Goal Tracking:** 100% MVP KPIs tracked and trending
- **Stakeholder Satisfaction:** >4.5/5 rating for dashboard usefulness

## 🛠️ Technical Implementation Notes

### Dashboard Platform Architecture
```typescript
// lib/dashboard/data-sources.ts
export interface DataSource {
  name: string;
  type: 'ga4' | 'gbp' | 'manual' | 'api';
  lastUpdated: Date;
  status: 'active' | 'error' | 'syncing';
}

export class DashboardDataManager {
  private dataSources: Map<string, DataSource> = new Map();

  async refreshAllData(): Promise<void> {
    const refreshPromises = Array.from(this.dataSources.values()).map(
      source => this.refreshDataSource(source)
    );
    
    await Promise.allSettled(refreshPromises);
  }

  async refreshDataSource(source: DataSource): Promise<void> {
    try {
      source.status = 'syncing';
      
      switch (source.type) {
        case 'ga4':
          await this.refreshGA4Data(source);
          break;
        case 'gbp':
          await this.refreshGBPData(source);
          break;
        case 'manual':
          await this.refreshManualData(source);
          break;
      }
      
      source.status = 'active';
      source.lastUpdated = new Date();
    } catch (error) {
      source.status = 'error';
      console.error(`Failed to refresh ${source.name}:`, error);
      await this.sendDataSourceAlert(source, error);
    }
  }

  private async refreshGA4Data(source: DataSource): Promise<void> {
    // GA4 API integration
    const analytics = google.analytics('data');
    
    const response = await analytics.properties.runReport({
      property: `properties/${GA4_PROPERTY_ID}`,
      dateRanges: [
        { startDate: '7daysAgo', endDate: 'today' },
        { startDate: '14daysAgo', endDate: '7daysAgo' }
      ],
      metrics: [
        { name: 'totalUsers' },
        { name: 'sessions' },
        { name: 'conversions' },
        { name: 'eventCount' }
      ],
      dimensions: [
        { name: 'sessionDefaultChannelGroup' },
        { name: 'pagePath' },
        { name: 'eventName' }
      ]
    });

    // Process and store the data
    await this.processGA4Response(response.data);
  }
}
```

### KPI Calculation Engine
```typescript
// lib/dashboard/kpi-calculator.ts
export interface KPIMetrics {
  leadGeneration: {
    totalLeads: number;
    weekOverWeekChange: number;
    formCompletionRate: number;
    topSources: Array<{ source: string; count: number; percentage: number }>;
  };
  conversion: {
    fmsToFirstSession: number;
    medianTimeToFirstSession: number;
    weeklycohortAnalysis: Array<{
      week: string;
      leads: number;
      conversions: number;
      rate: number;
    }>;
  };
  engagement: {
    portalActiveUsers: number;
    averageSessionDuration: number;
    videoCompletionRate: number;
    returnVisitorRate: number;
  };
  traffic: {
    totalTraffic: number;
    organicPercentage: number;
    gbpActions: number;
    coreWebVitalsScore: number;
  };
}

export class KPICalculator {
  async calculateWeeklyKPIs(
    currentWeekData: any,
    previousWeekData: any,
    manualData: any
  ): Promise<KPIMetrics> {
    return {
      leadGeneration: await this.calculateLeadMetrics(currentWeekData, previousWeekData),
      conversion: await this.calculateConversionMetrics(currentWeekData, manualData),
      engagement: await this.calculateEngagementMetrics(currentWeekData, previousWeekData),
      traffic: await this.calculateTrafficMetrics(currentWeekData, previousWeekData)
    };
  }

  private async calculateLeadMetrics(current: any, previous: any) {
    const currentLeads = this.countEventOccurrences(current, 'fms_submit');
    const previousLeads = this.countEventOccurrences(previous, 'fms_submit');
    
    const formStarts = this.countEventOccurrences(current, 'fms_start');
    const formCompletions = currentLeads;
    
    return {
      totalLeads: currentLeads,
      weekOverWeekChange: this.calculatePercentageChange(currentLeads, previousLeads),
      formCompletionRate: formStarts > 0 ? (formCompletions / formStarts) * 100 : 0,
      topSources: this.calculateTopSources(current)
    };
  }

  private calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }

  private countEventOccurrences(data: any, eventName: string): number {
    return data.rows?.filter((row: any) => 
      row.dimensionValues.find((dim: any) => dim.value === eventName)
    ).reduce((sum: number, row: any) => 
      sum + parseInt(row.metricValues[0].value), 0
    ) || 0;
  }
}
```

### Alert System Implementation
```typescript
// lib/dashboard/alerts.ts
export interface AlertRule {
  id: string;
  name: string;
  metric: string;
  condition: 'greater_than' | 'less_than' | 'percentage_change';
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recipients: string[];
  channels: Array<'email' | 'slack' | 'sms'>;
  isActive: boolean;
}

export class AlertManager {
  private rules: AlertRule[] = [];

  async evaluateAlerts(currentMetrics: KPIMetrics, previousMetrics: KPIMetrics): Promise<void> {
    for (const rule of this.rules.filter(r => r.isActive)) {
      const alertTriggered = await this.evaluateRule(rule, currentMetrics, previousMetrics);
      
      if (alertTriggered) {
        await this.sendAlert(rule, currentMetrics);
      }
    }
  }

  private async evaluateRule(
    rule: AlertRule, 
    current: KPIMetrics, 
    previous: KPIMetrics
  ): Promise<boolean> {
    const currentValue = this.getMetricValue(current, rule.metric);
    const previousValue = this.getMetricValue(previous, rule.metric);

    switch (rule.condition) {
      case 'greater_than':
        return currentValue > rule.threshold;
      case 'less_than':
        return currentValue < rule.threshold;
      case 'percentage_change':
        const change = ((currentValue - previousValue) / previousValue) * 100;
        return Math.abs(change) > rule.threshold;
      default:
        return false;
    }
  }

  private async sendAlert(rule: AlertRule, metrics: KPIMetrics): Promise<void> {
    const alertData = {
      rule,
      metrics,
      timestamp: new Date(),
      urgency: rule.severity
    };

    const sendPromises = rule.channels.map(channel => {
      switch (channel) {
        case 'email':
          return this.sendEmailAlert(alertData);
        case 'slack':
          return this.sendSlackAlert(alertData);
        case 'sms':
          return this.sendSMSAlert(alertData);
      }
    });

    await Promise.allSettled(sendPromises);
  }

  private async sendEmailAlert(alertData: any): Promise<void> {
    const emailContent = this.generateEmailContent(alertData);
    
    // Email service integration
    await emailService.send({
      to: alertData.rule.recipients,
      subject: `Alert: ${alertData.rule.name}`,
      html: emailContent
    });
  }

  private async sendSlackAlert(alertData: any): Promise<void> {
    const slackMessage = this.generateSlackMessage(alertData);
    
    // Slack webhook integration
    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: slackMessage,
        username: 'Analytics Bot',
        icon_emoji: ':chart_with_upwards_trend:'
      })
    });
  }
}
```

### Dashboard Component Framework
```tsx
// components/dashboard/KPIDashboard.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendIndicator } from './TrendIndicator';
import { MetricChart } from './MetricChart';

interface KPIDashboardProps {
  dateRange: { start: Date; end: Date };
  refreshInterval?: number;
}

export function KPIDashboard({ dateRange, refreshInterval = 300000 }: KPIDashboardProps) {
  const [metrics, setMetrics] = useState<KPIMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard/kpis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dateRange })
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch metrics');
        }
        
        const data = await response.json();
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    
    // Set up refresh interval
    const interval = setInterval(fetchMetrics, refreshInterval);
    return () => clearInterval(interval);
  }, [dateRange, refreshInterval]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <DashboardError error={error} onRetry={() => window.location.reload()} />;
  }

  if (!metrics) {
    return <DashboardNoData />;
  }

  return (
    <div className="dashboard-grid">
      {/* Lead Generation Section */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Lead Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="metrics-grid">
            <MetricCard
              title="Total FMS Leads"
              value={metrics.leadGeneration.totalLeads}
              change={metrics.leadGeneration.weekOverWeekChange}
              format="number"
            />
            <MetricCard
              title="Form Completion Rate"
              value={metrics.leadGeneration.formCompletionRate}
              format="percentage"
            />
          </div>
          <MetricChart
            title="Lead Sources"
            data={metrics.leadGeneration.topSources}
            type="donut"
          />
        </CardContent>
      </Card>

      {/* Conversion Section */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Conversion Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="metrics-grid">
            <MetricCard
              title="FMS → First Session"
              value={metrics.conversion.fmsToFirstSession}
              format="percentage"
            />
            <MetricCard
              title="Median Time to First Session"
              value={metrics.conversion.medianTimeToFirstSession}
              format="days"
            />
          </div>
          <MetricChart
            title="Weekly Cohort Analysis"
            data={metrics.conversion.weeklycohortAnalysis}
            type="line"
          />
        </CardContent>
      </Card>

      {/* Engagement Section */}
      <Card>
        <CardHeader>
          <CardTitle>Member Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <MetricCard
            title="Portal Weekly Active Users"
            value={metrics.engagement.portalActiveUsers}
            format="number"
          />
          <MetricCard
            title="Video Completion Rate"
            value={metrics.engagement.videoCompletionRate}
            format="percentage"
          />
        </CardContent>
      </Card>

      {/* Traffic Section */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <MetricCard
            title="Total Traffic"
            value={metrics.traffic.totalTraffic}
            change={20} // Calculate from previous period
            format="number"
          />
          <MetricCard
            title="Organic Percentage"
            value={metrics.traffic.organicPercentage}
            format="percentage"
          />
        </CardContent>
      </Card>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: number;
  change?: number;
  format: 'number' | 'percentage' | 'currency' | 'days';
}

function MetricCard({ title, value, change, format }: MetricCardProps) {
  const formatValue = (val: number, fmt: string) => {
    switch (fmt) {
      case 'percentage':
        return `${val.toFixed(1)}%`;
      case 'currency':
        return `$${val.toFixed(2)}`;
      case 'days':
        return `${val.toFixed(1)} days`;
      default:
        return val.toLocaleString();
    }
  };

  return (
    <div className="metric-card">
      <h3 className="metric-title">{title}</h3>
      <div className="metric-value">{formatValue(value, format)}</div>
      {change !== undefined && (
        <TrendIndicator value={change} />
      )}
    </div>
  );
}
```

## 📝 Content Requirements

### Weekly Report Template
- [ ] **Executive Summary:**
  - Key highlights and achievements
  - Critical issues requiring attention
  - Week-over-week performance overview
  - Recommended actions for next week

- [ ] **Detailed Metrics:**
  - Lead generation performance with source breakdown
  - Conversion funnel analysis with bottleneck identification
  - User engagement trends and patterns
  - Technical performance and user experience metrics

### Dashboard User Guide
- [ ] **Getting Started:**
  - Dashboard access and login procedures
  - Navigation overview and feature explanation
  - Mobile vs. desktop functionality differences
  - Troubleshooting common access issues

- [ ] **Feature Documentation:**
  - Chart interaction and drill-down capabilities
  - Export functionality and report generation
  - Alert configuration and customization
  - Date range selection and comparison tools

---

**Story Owner:** Product Manager  
**Analytics Lead:** Data Analyst  
**Technical Lead:** Full-Stack Developer  
**Created:** September 14, 2025  
**Status:** Ready for Development
