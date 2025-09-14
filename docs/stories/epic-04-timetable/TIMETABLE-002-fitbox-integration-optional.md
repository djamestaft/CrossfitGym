# User Story: TIMETABLE-002 - Fitbox Integration (Optional)

**Epic:** Epic 4: Timetable (Read-Only)  
**Story ID:** TIMETABLE-002  
**Priority:** Medium (Optional Enhancement)  
**Effort Estimate:** 4 story points  
**Sprint Target:** Week 1-2  

## 📋 User Story

**As a** gym operations manager  
**I want** automatic schedule updates from our Fitbox booking system  
**So that** the website always shows current class information without manual intervention  

## ✅ Acceptance Criteria

### API Integration Implementation
- [ ] **Read-Only Fitbox API Connection:**
  - Secure API authentication with proper credential management
  - Rate limiting compliance with Fitbox API requirements
  - Data retrieval for class schedules, coach assignments, and capacity
  - Real-time sync capability with configurable update intervals
  - API health monitoring with automated retry logic

- [ ] **Data Transformation Layer:**
  - Map Fitbox data structure to internal timetable format
  - Handle timezone conversions and formatting
  - Filter active classes and remove cancelled sessions
  - Normalize coach names and class type classifications
  - Transform capacity data into display-friendly indicators

- [ ] **Configuration Management:**
  - Environment-specific API endpoints and credentials
  - Toggleable data source selection (Fitbox vs CMS)
  - Update frequency configuration (5-minute to 1-hour intervals)
  - API timeout and retry attempt settings
  - Feature flag for enabling/disabling Fitbox integration

### Fallback & Error Handling
- [ ] **Graceful Degradation:**
  - Automatic fallback to CMS data when Fitbox unavailable
  - Seamless switching between data sources without user impact
  - Cached data serving during temporary API outages
  - Clear indication of data source and last update time
  - No broken state or empty schedules under any circumstances

- [ ] **Error Recovery Mechanisms:**
  - Exponential backoff for failed API requests
  - Circuit breaker pattern to prevent cascading failures
  - Stale data validation and expiration handling
  - Manual override capability for operations team
  - Automated alerts for extended API outages

- [ ] **Data Consistency Validation:**
  - Compare Fitbox data against CMS baseline for anomalies
  - Validate class times, coach assignments, and capacity numbers
  - Flag suspicious changes for manual review
  - Maintain data integrity during sync operations
  - Rollback capability for corrupted data imports

### Performance & Reliability
- [ ] **Caching Strategy:**
  - Multi-layer caching (memory, Redis, CDN)
  - Intelligent cache invalidation on data updates
  - Background refresh to minimize user-facing latency
  - Cache warming for peak traffic periods
  - Efficient cache key strategies for different data views

- [ ] **API Optimization:**
  - Minimal data fetching to reduce API load
  - Differential updates to sync only changed data
  - Batch requests where possible to reduce call frequency
  - Connection pooling and keep-alive optimizations
  - Request deduplication for concurrent access

- [ ] **Monitoring & Alerting:**
  - Real-time API health and response time monitoring
  - Data freshness tracking and stale data alerts
  - Integration success/failure rate metrics
  - Performance degradation early warning system
  - Automated incident escalation for critical failures

### Administrative Controls
- [ ] **Data Source Management:**
  - CMS toggle for switching between Fitbox and manual data
  - Override capabilities for specific classes or time periods
  - Sync status dashboard for operations team visibility
  - Manual sync trigger for immediate updates
  - Data source priority configuration

- [ ] **Content Validation:**
  - Automated checks for missing or invalid schedule data
  - Duplicate class detection and resolution
  - Coach assignment validation against staff directory
  - Capacity limit enforcement and validation
  - Holiday schedule handling and special event support

## 🔗 Dependencies

**Upstream Dependencies:**
- [ ] CMS timetable fallback system (TIMETABLE-001) functional
- [ ] Fitbox API access credentials and documentation
- [ ] Infrastructure monitoring and alerting systems
- [ ] Redis caching layer setup for data storage

**Technical Dependencies:**
- [ ] API rate limiting and security configuration
- [ ] Background job processing system (cron/queue)
- [ ] Error tracking and logging infrastructure
- [ ] Performance monitoring dashboards

**Operational Dependencies:**
- [ ] Fitbox system administrator coordination
- [ ] Operations team training on data source management
- [ ] Incident response procedures for API failures
- [ ] Data validation and quality assurance processes

## 🧪 Testing Criteria

- [ ] **API Integration Testing:**
  - Successful connection and authentication with Fitbox
  - Data retrieval accuracy and completeness verification
  - Rate limiting compliance and timeout handling
  - Error response handling for various failure scenarios
  - Data transformation accuracy from Fitbox to internal format

- [ ] **Fallback Mechanism Testing:**
  - Seamless fallback to CMS when Fitbox is unavailable
  - Data consistency maintained during source switching
  - Performance impact assessment during failover
  - Recovery behavior when Fitbox comes back online
  - User experience consistency across different data sources

- [ ] **Performance Testing:**
  - API response time monitoring under various loads
  - Cache effectiveness and hit rate optimization
  - Background sync performance and resource utilization
  - Database query optimization for schedule data
  - Frontend rendering performance with live data

- [ ] **Reliability Testing:**
  - Extended API outage simulation and recovery
  - Data corruption scenarios and recovery procedures
  - Concurrent user load during API sync operations
  - Memory leak detection during long-running operations
  - Stress testing with high-frequency API updates

## 📊 Definition of Done

- [ ] **Technical Implementation:**
  - Fitbox API integration functional with proper authentication
  - Data transformation pipeline working accurately
  - Fallback mechanism tested under various failure scenarios
  - Caching strategy implemented and optimized

- [ ] **Monitoring & Alerting:**
  - API health monitoring dashboard operational
  - Automated alerts configured for API failures
  - Data freshness monitoring and stale data detection
  - Performance metrics tracking and trending

- [ ] **Operations Readiness:**
  - Data source toggle functional in CMS
  - Operations team trained on monitoring and troubleshooting
  - Incident response procedures documented and tested
  - Manual override procedures validated

- [ ] **Quality Assurance:**
  - Data accuracy verified between Fitbox and display
  - Performance benchmarks met under various conditions
  - Security review completed for API integration
  - User experience validated across all data source states

## ⚠️ Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Fitbox API unreliability | High | Medium | Robust fallback to CMS, comprehensive monitoring |
| Data synchronization errors | Medium | Medium | Validation layer, manual override capability |
| API rate limiting issues | Medium | Low | Respect limits, implement exponential backoff |
| Performance degradation | Medium | Low | Caching strategy, background processing |
| Security vulnerabilities | High | Low | Secure credential management, API security review |

## 📈 Success Metrics

**API Performance:**
- **Response Time:** <500ms for 95% of API calls
- **Success Rate:** >99% successful API interactions
- **Fallback Activation:** <5% of operating time
- **Data Freshness:** <15 minutes delay for schedule updates

**System Reliability:**
- **Uptime:** >99.9% timetable availability regardless of Fitbox status
- **Error Rate:** <0.1% of data sync operations fail
- **Recovery Time:** <5 minutes from API outage to fallback activation
- **Data Accuracy:** >99.5% accuracy between Fitbox and display

**Operational Efficiency:**
- **Manual Updates:** >80% reduction in manual schedule updates
- **Support Tickets:** >50% reduction in schedule-related inquiries
- **Team Productivity:** <30 minutes weekly for schedule management
- **Data Conflicts:** <2 data inconsistency incidents per month

## 🛠️ Technical Implementation Notes

### Fitbox API Service
```typescript
// lib/integrations/fitbox-service.ts
export class FitboxService {
  private apiKey: string;
  private baseUrl: string;
  private rateLimiter: RateLimiter;
  private circuitBreaker: CircuitBreaker;

  constructor() {
    this.apiKey = process.env.FITBOX_API_KEY!;
    this.baseUrl = process.env.FITBOX_API_URL!;
    this.rateLimiter = new RateLimiter({ requests: 60, window: 60000 }); // 60 req/min
    this.circuitBreaker = new CircuitBreaker(this.fetchFromFitbox.bind(this), {
      timeout: 10000,
      errorThresholdPercentage: 50,
      resetTimeout: 30000
    });
  }

  async getScheduleData(): Promise<ScheduleData | null> {
    try {
      // Check if we should use Fitbox or fallback
      const usesFitbox = await this.isFitboxEnabled();
      if (!usesFitbox) {
        return this.getCMSFallback();
      }

      // Attempt to get data from Fitbox with circuit breaker
      const data = await this.circuitBreaker.fire();
      
      // Validate and transform the data
      const transformedData = this.transformFitboxData(data);
      const validatedData = this.validateScheduleData(transformedData);
      
      // Cache the successful result
      await this.cacheScheduleData(validatedData);
      
      return validatedData;
    } catch (error) {
      console.error('Fitbox API error:', error);
      
      // Try to return cached data first
      const cachedData = await this.getCachedScheduleData();
      if (cachedData && this.isCacheValid(cachedData)) {
        return cachedData;
      }
      
      // Fallback to CMS data
      return this.getCMSFallback();
    }
  }

  private async fetchFromFitbox(): Promise<any> {
    await this.rateLimiter.acquire();
    
    const response = await fetch(`${this.baseUrl}/api/v1/schedule`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'GeelongMovement/1.0'
      },
      timeout: 10000
    });

    if (!response.ok) {
      throw new Error(`Fitbox API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private transformFitboxData(fitboxData: any): ScheduleData {
    // Transform Fitbox format to internal format
    return {
      lastUpdated: new Date().toISOString(),
      source: 'fitbox',
      schedule: fitboxData.classes.map((cls: any) => ({
        day: this.mapDayName(cls.day_of_week),
        time: this.formatTime(cls.start_time),
        classType: this.mapClassType(cls.class_type),
        coach: {
          id: cls.instructor.id,
          name: cls.instructor.name,
          image: cls.instructor.photo_url
        },
        capacity: cls.max_capacity,
        currentBookings: cls.current_bookings,
        notes: cls.special_notes,
        isActive: cls.status === 'active'
      }))
    };
  }

  private validateScheduleData(data: ScheduleData): ScheduleData {
    // Validate data integrity
    const validatedSchedule = data.schedule.filter(slot => {
      return slot.day && 
             slot.time && 
             slot.classType && 
             slot.capacity > 0 && 
             slot.currentBookings >= 0 &&
             slot.currentBookings <= slot.capacity;
    });

    // Check for anomalies
    if (validatedSchedule.length < data.schedule.length * 0.8) {
      throw new Error('Too many invalid schedule items detected');
    }

    return {
      ...data,
      schedule: validatedSchedule
    };
  }

  private async isFitboxEnabled(): Promise<boolean> {
    // Check CMS setting for data source preference
    const settings = await sanityClient.fetch(`*[_type == "timetableSettings"][0]`);
    return settings?.useFitboxData ?? false;
  }

  private async getCMSFallback(): Promise<ScheduleData> {
    const cmsData = await sanityClient.fetch(`*[_type == "timetable"][0]`);
    return {
      lastUpdated: cmsData.lastUpdated,
      source: 'cms',
      schedule: cmsData.weeklySchedule
    };
  }

  private async cacheScheduleData(data: ScheduleData): Promise<void> {
    const cacheKey = 'timetable:schedule';
    await redis.setex(cacheKey, 900, JSON.stringify(data)); // 15 min TTL
  }

  private async getCachedScheduleData(): Promise<ScheduleData | null> {
    const cacheKey = 'timetable:schedule';
    const cached = await redis.get(cacheKey);
    return cached ? JSON.parse(cached) : null;
  }

  private isCacheValid(data: ScheduleData): boolean {
    const maxAge = 3600000; // 1 hour in milliseconds
    const dataAge = Date.now() - new Date(data.lastUpdated).getTime();
    return dataAge < maxAge;
  }
}
```

### Background Sync Job
```typescript
// lib/jobs/schedule-sync.ts
export class ScheduleSyncJob {
  private fitboxService: FitboxService;
  private isRunning: boolean = false;

  constructor() {
    this.fitboxService = new FitboxService();
  }

  async execute(): Promise<void> {
    if (this.isRunning) {
      console.log('Schedule sync already running, skipping...');
      return;
    }

    this.isRunning = true;
    
    try {
      console.log('Starting schedule sync...');
      
      const scheduleData = await this.fitboxService.getScheduleData();
      
      if (scheduleData) {
        // Update the cache and trigger ISR revalidation
        await this.updateCache(scheduleData);
        await this.triggerRevalidation();
        
        // Log success metrics
        await this.logSyncMetrics('success', scheduleData);
        
        console.log(`Schedule sync completed successfully. Source: ${scheduleData.source}`);
      } else {
        throw new Error('No schedule data received');
      }
    } catch (error) {
      console.error('Schedule sync failed:', error);
      
      // Log failure metrics
      await this.logSyncMetrics('failure', null, error);
      
      // Send alert if this is a persistent failure
      await this.checkAndAlert(error);
    } finally {
      this.isRunning = false;
    }
  }

  private async updateCache(data: ScheduleData): Promise<void> {
    // Update multiple cache layers
    await Promise.all([
      redis.setex('timetable:current', 900, JSON.stringify(data)),
      redis.setex('timetable:backup', 3600, JSON.stringify(data))
    ]);
  }

  private async triggerRevalidation(): Promise<void> {
    // Trigger Next.js ISR revalidation
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?path=/timetable&secret=${process.env.REVALIDATE_SECRET}`);
    } catch (error) {
      console.warn('Failed to trigger revalidation:', error);
    }
  }

  private async logSyncMetrics(status: 'success' | 'failure', data: ScheduleData | null, error?: Error): Promise<void> {
    const metrics = {
      timestamp: new Date().toISOString(),
      status,
      source: data?.source || 'unknown',
      scheduleCount: data?.schedule.length || 0,
      error: error?.message
    };

    // Log to monitoring system
    await this.sendToMonitoring(metrics);
  }

  private async checkAndAlert(error: Error): Promise<void> {
    // Check failure frequency
    const recentFailures = await this.getRecentFailures();
    
    if (recentFailures >= 3) {
      // Send alert to operations team
      await this.sendAlert({
        level: 'critical',
        message: 'Fitbox schedule sync has failed multiple times',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
}

// Cron job setup
export function setupScheduleSync() {
  const job = new ScheduleSyncJob();
  
  // Run every 15 minutes
  cron.schedule('*/15 * * * *', () => {
    job.execute().catch(console.error);
  });
  
  console.log('Schedule sync job scheduled for every 15 minutes');
}
```

### Data Source Toggle Component
```tsx
// components/admin/DataSourceToggle.tsx
import { useState, useEffect } from 'react';

export function DataSourceToggle() {
  const [dataSource, setDataSource] = useState<'cms' | 'fitbox'>('cms');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string>('');

  useEffect(() => {
    fetchCurrentSettings();
  }, []);

  const fetchCurrentSettings = async () => {
    try {
      const response = await fetch('/api/admin/timetable-settings');
      const settings = await response.json();
      setDataSource(settings.dataSource);
      setLastSync(settings.lastSync);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const handleToggle = async (newSource: 'cms' | 'fitbox') => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/admin/timetable-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataSource: newSource })
      });

      if (response.ok) {
        setDataSource(newSource);
        
        // Trigger immediate sync if switching to Fitbox
        if (newSource === 'fitbox') {
          await triggerManualSync();
        }
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error) {
      console.error('Failed to toggle data source:', error);
      alert('Failed to update data source. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerManualSync = async () => {
    try {
      await fetch('/api/admin/trigger-sync', { method: 'POST' });
      await fetchCurrentSettings(); // Refresh last sync time
    } catch (error) {
      console.error('Failed to trigger sync:', error);
    }
  };

  return (
    <div className="data-source-toggle">
      <h3>Timetable Data Source</h3>
      
      <div className="toggle-options">
        <label className={`option ${dataSource === 'cms' ? 'active' : ''}`}>
          <input
            type="radio"
            value="cms"
            checked={dataSource === 'cms'}
            onChange={() => handleToggle('cms')}
            disabled={isLoading}
          />
          <span>Manual CMS</span>
          <small>Manually managed schedule data</small>
        </label>
        
        <label className={`option ${dataSource === 'fitbox' ? 'active' : ''}`}>
          <input
            type="radio"
            value="fitbox"
            checked={dataSource === 'fitbox'}
            onChange={() => handleToggle('fitbox')}
            disabled={isLoading}
          />
          <span>Fitbox Integration</span>
          <small>Automatic sync from Fitbox system</small>
        </label>
      </div>

      {dataSource === 'fitbox' && (
        <div className="sync-info">
          <p>Last sync: {lastSync ? new Date(lastSync).toLocaleString() : 'Never'}</p>
          <button 
            onClick={triggerManualSync}
            disabled={isLoading}
            className="sync-button"
          >
            {isLoading ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
      )}

      {isLoading && (
        <div className="loading-indicator">
          Updating data source...
        </div>
      )}
    </div>
  );
}
```

## 📝 Operational Requirements

### Fitbox API Configuration
- [ ] **API Credentials:**
  - Secure storage of API keys and endpoints
  - Environment-specific configuration management
  - Credential rotation and expiration monitoring
  - Access logging and audit trail

- [ ] **Rate Limiting Compliance:**
  - Respect Fitbox API rate limits (typically 60 requests/minute)
  - Implement exponential backoff for rate limit errors
  - Monitor usage patterns and optimize request frequency
  - Cache aggressively to reduce API calls

### Monitoring & Alerting Setup
- [ ] **API Health Monitoring:**
  - Response time and success rate tracking
  - Circuit breaker status and failure patterns
  - Data freshness and sync frequency monitoring
  - Custom dashboards for operations team

- [ ] **Alert Configuration:**
  - Immediate alerts for API authentication failures
  - Escalation for extended outages (>30 minutes)
  - Data inconsistency warnings
  - Performance degradation notifications

### Documentation & Training
- [ ] **Technical Documentation:**
  - API integration architecture and data flow
  - Troubleshooting guide for common issues
  - Fallback procedures and manual overrides
  - Performance optimization recommendations

- [ ] **Operations Procedures:**
  - Data source switching protocols
  - Incident response for API failures
  - Manual sync procedures
  - Data validation and quality checks

---

**Story Owner:** Product Manager  
**Technical Lead:** Backend Developer  
**Operations Lead:** Gym Manager  
**Created:** September 14, 2025  
**Status:** Ready for Development
