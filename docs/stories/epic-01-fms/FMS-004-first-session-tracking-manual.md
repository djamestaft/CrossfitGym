# User Story: FMS-004 - First Session Tracking (Manual MVP)

**Epic:** Epic 1: FMS Conversion Funnel  
**Story ID:** FMS-004  
**Priority:** Critical Path ⭐  
**Effort Estimate:** 2 story points  
**Sprint Target:** Week 1-2

## 📋 User Story

**As a** Product Manager  
**I need** reliable first session conversion tracking  
**So that** I can measure FMS → First Session rates and optimize the conversion funnel

## ✅ Acceptance Criteria

### Operations Sheet Enhancement

- [ ] **Lead Tracking Fields:**
  - FMS submission date and confirmation number
  - Contact information and assessment context
  - First contact date and outcome
  - Assessment scheduled date and completion status
  - First session booking date and attendance
  - Conversion status flags (Assessment Completed, First Session Booked, First Session Attended)

- [ ] **Automated Calculations:**
  - Time-to-First-Contact (TFC) calculation in days
  - Time-to-First-Session (TTF) calculation in days
  - Weekly cohort analysis with conversion percentages
  - Monthly trend analysis with rolling averages
  - Median TTF automatically calculated and displayed

### Dashboard Integration

- [ ] **Real-time Metrics Tile:**
  - FMS → Assessment conversion rate (current week/month)
  - Assessment → First Session conversion rate
  - Median Time-to-First-Session (TTF) in days
  - Current week lead volume vs. previous week
  - Monthly conversion trend visualization

- [ ] **Weekly Cohort Report:**
  - Leads by submission week with follow-up status
  - Conversion funnel metrics for each cohort
  - TTF distribution analysis
  - Staff performance metrics (response time, conversion rate)
  - Action items for improving conversion rates

### Data Validation & Quality

- [ ] **Input Validation:**
  - Date field validation (no future dates for completed actions)
  - Required field highlighting for incomplete records
  - Duplicate detection and flagging
  - Data consistency checks across related fields
  - Automatic timestamp capture for status updates

- [ ] **Quality Assurance:**
  - Daily data quality report highlighting incomplete records
  - Weekly data audit process with error flagging
  - Staff training documentation for consistent data entry
  - Data entry guidelines with examples
  - Monthly data cleanup and validation procedures

## 🔗 Dependencies

**Upstream Dependencies:**

- [ ] FMS lead notification system (FMS-003) generating consistent data
- [ ] Operations team email and contact tracking system
- [ ] Analytics dashboard infrastructure setup
- [ ] Lead management spreadsheet or CRM system

**Technical Dependencies:**

- [ ] Google Sheets API integration or similar data storage
- [ ] Dashboard data connection and visualization
- [ ] Automated calculation formulas and data validation
- [ ] Email integration for weekly reports

**Process Dependencies:**

- [ ] Operations team workflow documentation
- [ ] Staff training on tracking procedures
- [ ] Clear definitions of conversion events
- [ ] Escalation procedures for follow-up delays

## 🧪 Testing Criteria

- [ ] **Calculation Accuracy:**
  - TTF calculations verified against manual calculation
  - Conversion rate formulas tested with sample data
  - Weekly cohort analysis produces correct percentages
  - Median calculations handle edge cases (even/odd numbers)
  - Dashboard metrics match source data exactly

- [ ] **Data Entry Workflow:**
  - Operations team can efficiently update lead status
  - Data validation prevents common entry errors
  - Required field highlighting guides complete data entry
  - Status updates trigger appropriate formula recalculations
  - Historical data remains intact during updates

- [ ] **Reporting Functionality:**
  - Weekly reports generate automatically on schedule
  - Dashboard updates reflect data changes within 5 minutes
  - Export functionality works for management reporting
  - Historical trend analysis shows accurate patterns
  - Alert system flags conversion rate drops >10%

- [ ] **Data Integrity:**
  - No data loss during high-volume periods
  - Backup and recovery procedures tested
  - Data consistency maintained across related fields
  - Audit trail captures all status changes
  - Error handling prevents data corruption

## 📊 Definition of Done

- [ ] **Operations Integration:**
  - Lead tracking sheet integrated with notification system
  - Operations team trained on data entry procedures
  - Daily workflow incorporates tracking requirements
  - Clear escalation procedures for conversion delays

- [ ] **Analytics Dashboard:**
  - Real-time conversion metrics displayed accurately
  - Weekly cohort reports generated automatically
  - Historical trend analysis functional
  - Export capabilities for management reporting

- [ ] **Quality Assurance:**
  - Data validation prevents entry errors
  - Automated calculations verified for accuracy
  - Staff can efficiently update lead status
  - Monthly data audit process established

- [ ] **Performance Monitoring:**
  - Conversion rate alerts configured
  - TTF monitoring with benchmark targets
  - Weekly performance reports automated
  - Management dashboard accessible to stakeholders

## ⚠️ Risk Assessment

| Risk                      | Impact | Probability | Mitigation                             |
| ------------------------- | ------ | ----------- | -------------------------------------- |
| Inconsistent data entry   | High   | Medium      | Clear procedures, training, validation |
| Manual process errors     | Medium | Medium      | Double-entry validation, audit checks  |
| Staff adoption resistance | Medium | Low         | Training, clear value demonstration    |
| Data loss or corruption   | High   | Low         | Regular backups, version control       |
| Calculation errors        | Medium | Low         | Formula testing, peer review           |

## 📈 Success Metrics

**Tracking Accuracy:**

- **Data Completeness:** >95% of leads have complete tracking data
- **Data Quality:** <5% error rate in manual data entry
- **Timeliness:** Lead status updated within 24 hours of events
- **Coverage:** 100% of FMS leads tracked through funnel

**Conversion Insights:**

- **FMS → Assessment:** Target >80% completion rate
- **Assessment → First Session:** Target >60% conversion rate
- **Median TTF:** Target <7 days from assessment to first session
- **Response Time:** <1 business day initial contact

**Operational Excellence:**

- **Report Timeliness:** Weekly reports delivered on schedule
- **Dashboard Uptime:** >99% availability for stakeholder access
- **Data Export:** Monthly management reports automated
- **Team Adoption:** >90% staff compliance with tracking procedures

## 🛠️ Technical Implementation Notes

### Operations Sheet Structure

```javascript
// Google Sheets structure for FMS lead tracking
const leadTrackingColumns = {
  // Lead Information
  A: 'Confirmation Number',
  B: 'Submission Date',
  C: 'First Name',
  D: 'Last Name',
  E: 'Email',
  F: 'Phone',
  G: 'Preferred Contact Time',

  // Assessment Context
  H: 'Fitness Goal',
  I: 'Activity Level',
  J: 'Exercise Experience',
  K: 'Current Injuries',
  L: 'UTM Source',

  // Follow-up Tracking
  M: 'First Contact Date',
  N: 'Contact Outcome',
  O: 'Assessment Scheduled Date',
  P: 'Assessment Completed Date',
  Q: 'First Session Booked Date',
  R: 'First Session Attended Date',

  // Calculated Fields
  S: 'Time to First Contact (TFC)',
  T: 'Time to First Session (TTF)',
  U: 'Assessment Conversion',
  V: 'First Session Conversion',
  W: 'Overall Conversion Status',
}
```

### Automated Calculation Formulas

```javascript
// Google Sheets formulas for conversion tracking
const calculationFormulas = {
  // Time calculations (in days)
  timeToFirstContact: '=IF(AND(B2<>"", M2<>""), M2-B2, "")',
  timeToFirstSession: '=IF(AND(B2<>"", R2<>""), R2-B2, "")',

  // Conversion flags
  assessmentConversion:
    '=IF(P2<>"", "Yes", IF(O2<>"", "Scheduled", "Pending"))',
  firstSessionConversion: '=IF(R2<>"", "Yes", IF(Q2<>"", "Booked", "No"))',

  // Weekly cohort analysis
  weeklyConversionRate:
    '=COUNTIFS(B:B, ">="&DATE(YEAR(TODAY()), MONTH(TODAY()), DAY(TODAY())-7), V:V, "Yes") / COUNTIFS(B:B, ">="&DATE(YEAR(TODAY()), MONTH(TODAY()), DAY(TODAY())-7))',

  // Median TTF calculation
  medianTTF: '=MEDIAN(FILTER(T:T, T:T<>"", T:T<30))',
}
```

### Dashboard Data Connection

```typescript
// lib/analytics/conversion-tracking.ts
interface ConversionMetrics {
  currentWeek: {
    totalLeads: number
    assessmentConversions: number
    firstSessionConversions: number
    assessmentRate: number
    firstSessionRate: number
  }
  currentMonth: {
    totalLeads: number
    medianTTF: number
    conversionTrend: number
  }
  alerts: {
    conversionRateDrop: boolean
    highTTF: boolean
    followupDelays: number
  }
}

export async function getConversionMetrics(): Promise<ConversionMetrics> {
  // Fetch data from Google Sheets API or CRM
  const sheetData = await fetchLeadTrackingData()

  // Calculate current week metrics
  const currentWeekLeads = filterByDateRange(sheetData, 'currentWeek')
  const assessmentRate = calculateConversionRate(currentWeekLeads, 'assessment')
  const firstSessionRate = calculateConversionRate(
    currentWeekLeads,
    'firstSession'
  )

  // Calculate trends and alerts
  const previousWeekRate = calculatePreviousWeekRate(sheetData)
  const conversionRateDrop = assessmentRate < previousWeekRate * 0.9

  return {
    currentWeek: {
      totalLeads: currentWeekLeads.length,
      assessmentConversions: countConversions(currentWeekLeads, 'assessment'),
      firstSessionConversions: countConversions(
        currentWeekLeads,
        'firstSession'
      ),
      assessmentRate,
      firstSessionRate,
    },
    currentMonth: {
      totalLeads: filterByDateRange(sheetData, 'currentMonth').length,
      medianTTF: calculateMedianTTF(sheetData),
      conversionTrend: calculateTrend(sheetData),
    },
    alerts: {
      conversionRateDrop,
      highTTF: calculateMedianTTF(sheetData) > 7,
      followupDelays: countFollowupDelays(sheetData),
    },
  }
}
```

### Weekly Report Generation

```typescript
// lib/reports/weekly-conversion.ts
interface WeeklyReport {
  periodStart: Date
  periodEnd: Date
  metrics: {
    totalLeads: number
    assessmentRate: number
    firstSessionRate: number
    medianTTF: number
    staffPerformance: StaffMetrics[]
  }
  actionItems: string[]
  trends: TrendAnalysis
}

export async function generateWeeklyReport(): Promise<WeeklyReport> {
  const weekData = await getWeeklyLeadData()

  const report: WeeklyReport = {
    periodStart: getWeekStart(),
    periodEnd: getWeekEnd(),
    metrics: calculateWeeklyMetrics(weekData),
    actionItems: generateActionItems(weekData),
    trends: analyzeTrends(weekData),
  }

  // Send email report to stakeholders
  await sendWeeklyReportEmail(report)

  return report
}
```

## 📝 Operational Procedures

### Daily Tracking Workflow

1. **Morning Review (9 AM):**
   - Check overnight FMS submissions
   - Verify notification delivery
   - Update follow-up status for previous day contacts
   - Flag any overdue follow-ups (>24 hours)

2. **Lead Contact Process:**
   - Call lead within 1 business day of submission
   - Update contact outcome in tracking sheet
   - Schedule assessment if lead is qualified
   - Set follow-up reminders for future contact

3. **Assessment Tracking:**
   - Mark assessment as completed in tracking sheet
   - Update first session booking status
   - Track actual attendance for first session
   - Calculate and review TTF metrics

### Data Entry Guidelines

- [ ] **Required Fields:** Never leave conversion status fields empty
- [ ] **Date Format:** Use consistent MM/DD/YYYY format
- [ ] **Status Values:** Use dropdown options only (Yes/No/Pending/Scheduled)
- [ ] **Notes Field:** Include context for lost leads or delays
- [ ] **Verification:** Double-check calculations monthly

### Weekly Review Process

- [ ] **Monday 9 AM:** Generate previous week conversion report
- [ ] **Review Metrics:** Compare to targets and previous weeks
- [ ] **Identify Issues:** Flag low conversion rates or high TTF
- [ ] **Action Planning:** Create improvement plans for next week
- [ ] **Staff Communication:** Share results and action items

### Quality Assurance Checklist

- [ ] **Data Completeness:** All leads have status updates
- [ ] **Calculation Accuracy:** Formulas producing correct results
- [ ] **Timeline Logic:** No impossible date sequences
- [ ] **Follow-up Compliance:** No overdue contacts >48 hours
- [ ] **Trend Analysis:** Conversion rates within expected ranges

---

**Story Owner:** Product Manager  
**Operations Lead:** Operations Manager  
**Data Analyst:** Business Analyst  
**Created:** September 14, 2025  
**Status:** Ready for Development
