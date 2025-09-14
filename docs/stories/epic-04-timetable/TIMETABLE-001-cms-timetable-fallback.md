# User Story: TIMETABLE-001 - CMS Timetable Fallback

**Epic:** Epic 4: Timetable (Read-Only)  
**Story ID:** TIMETABLE-001  
**Priority:** Medium  
**Effort Estimate:** 3 story points  
**Sprint Target:** Week 1-2

## 📋 User Story

**As a** potential member or current member  
**I want** to easily view class schedules on any device  
**So that** I can plan when to visit, attend classes, or understand the gym's offerings

## ✅ Acceptance Criteria

### Visual Layout & Design

- [ ] **Desktop Layout:**
  - Weekly grid view with time slots as rows and days as columns
  - Clear visual hierarchy with readable typography (minimum 16px)
  - Consistent spacing and alignment across all schedule cells
  - Coach names, class types, and capacity indicators clearly visible
  - Professional color scheme aligned with brand guidelines

- [ ] **Mobile Layout:**
  - Day-by-day view with horizontal swipe or tab navigation
  - Large touch targets for day selection (minimum 44px)
  - Vertical list of classes for selected day
  - Compact but readable information display
  - One-handed navigation friendly design

- [ ] **Responsive Behavior:**
  - Seamless transition between desktop and mobile layouts
  - Horizontal scroll for desktop if needed (wide schedules)
  - No content cutoff or overlap at any screen size
  - Touch-friendly interface on mobile and tablet devices
  - Progressive enhancement for different browser capabilities

### Content Management Integration

- [ ] **CMS Schema Implementation:**
  - Sanity CMS document type for timetable management
  - Weekly schedule array with day, time, class type, coach, capacity
  - Holiday/special schedule messaging with rich text support
  - Timezone information display for visitor clarity
  - Easy bulk editing capabilities for operations team

- [ ] **Content Editing Workflow:**
  - Intuitive interface for non-technical staff updates
  - Drag-and-drop reordering of schedule items
  - Duplicate class functionality for recurring schedules
  - Preview mode before publishing changes
  - Version history and rollback capabilities

- [ ] **Dynamic Content Display:**
  - Real-time updates when CMS content changes
  - Holiday messages prominently displayed when active
  - Timezone information shown contextually
  - Empty time slots clearly indicated
  - Special notes or announcements displayed appropriately

### Performance & Technical Implementation

- [ ] **Loading Performance:**
  - Initial page load ≤2.5 seconds on 3G connection
  - Subsequent visits ≤1 second with proper caching
  - Progressive loading with skeleton screens
  - Critical CSS inlined for faster initial render
  - Optimized images and minimal JavaScript bundle

- [ ] **Caching Strategy:**
  - Server-side caching with 15-minute TTL
  - CDN distribution for static assets
  - Browser caching for repeated visits
  - Service worker for offline functionality
  - Cache invalidation on content updates

- [ ] **Error Handling:**
  - Graceful fallback when CMS is unavailable
  - Clear error messages for network issues
  - Retry mechanisms for failed data requests
  - Offline mode with cached data display
  - Contact information shown during extended outages

### User Experience Features

- [ ] **Navigation & Interaction:**
  - Current day highlighted by default
  - Easy navigation between days and weeks
  - Quick jump to "today" functionality
  - Smooth animations for state changes
  - Breadcrumb navigation for context

- [ ] **Information Display:**
  - Class type and duration clearly indicated
  - Coach names with optional photos
  - Capacity indicators (Available/Limited/Full)
  - Special class notes or modifications
  - Equipment requirements if applicable

- [ ] **Accessibility & Usability:**
  - Screen reader compatible with proper ARIA labels
  - Keyboard navigation for all interactive elements
  - High contrast mode support
  - Text scaling support up to 200%
  - Print-friendly styling for schedule reference

### Analytics & Monitoring

- [ ] **User Engagement Tracking:**
  - Page view duration and interaction patterns
  - Day/time slot viewing frequency
  - Mobile vs. desktop usage analytics
  - Most viewed classes and coaches
  - Bounce rate and return visitor analysis

- [ ] **Performance Monitoring:**
  - Core Web Vitals tracking and alerting
  - API response time monitoring
  - Error rate tracking and notification
  - Cache hit rate optimization
  - User flow analysis through timetable

## 🔗 Dependencies

**Upstream Dependencies:**

- [ ] Sanity CMS setup and configuration (CONTENT-001)
- [ ] Design system components and branding guidelines
- [ ] Content structure planning and information architecture
- [ ] Operations team training on content management

**Technical Dependencies:**

- [ ] Next.js ISR (Incremental Static Regeneration) configuration
- [ ] CDN setup for optimal content delivery
- [ ] Analytics integration for usage tracking
- [ ] Error monitoring and alerting systems

**Content Dependencies:**

- [ ] Current class schedule data collection
- [ ] Coach information and photos
- [ ] Holiday and special schedule planning
- [ ] Capacity information for all classes

## 🧪 Testing Criteria

- [ ] **Functional Testing:**
  - All schedule data displays correctly across devices
  - CMS updates reflect on frontend within cache TTL
  - Navigation works smoothly on mobile and desktop
  - Holiday messages appear and disappear correctly
  - Print functionality produces readable schedule

- [ ] **Performance Testing:**
  - Page load times meet targets on various connection speeds
  - Cache performance tested under different scenarios
  - Large schedule data sets don't impact performance
  - Image optimization reduces loading times significantly
  - Service worker caching functions properly offline

- [ ] **Accessibility Testing:**
  - Screen reader navigation tested with NVDA/JAWS
  - Keyboard-only navigation functional
  - Color contrast meets WCAG AA standards
  - Text scaling works without layout breaks
  - Focus indicators visible and logical

- [ ] **User Experience Testing:**
  - Mobile usability tested across iOS and Android
  - Desktop experience tested across major browsers
  - Information findability and clarity verified
  - Loading states provide appropriate feedback
  - Error scenarios handled gracefully

## 📊 Definition of Done

- [ ] **Technical Implementation:**
  - Timetable page deployed with responsive design
  - CMS integration functional with real-time updates
  - Caching strategy implemented and tested
  - Error handling covers all failure scenarios

- [ ] **Performance Validation:**
  - Core Web Vitals pass on mobile and desktop
  - Loading performance meets established targets
  - Cache invalidation working correctly
  - Analytics tracking implemented and verified

- [ ] **Content Management:**
  - Operations team trained on CMS workflow
  - Content editing documentation complete
  - Holiday messaging system functional
  - Schedule update process documented

- [ ] **Quality Assurance:**
  - Cross-browser compatibility verified
  - Mobile responsiveness tested on real devices
  - Accessibility compliance confirmed (WCAG AA)
  - User acceptance testing completed

## ⚠️ Risk Assessment

| Risk                                  | Impact | Probability | Mitigation                                    |
| ------------------------------------- | ------ | ----------- | --------------------------------------------- |
| CMS downtime affects schedule display | Medium | Low         | Static fallback data, service worker cache    |
| Manual updates create stale content   | Medium | Medium      | Clear update workflow, automated reminders    |
| Poor mobile performance               | High   | Low         | Mobile-first development, performance budgets |
| Confusing timezone information        | Medium | Low         | Clear messaging, user testing                 |
| Operations team struggles with CMS    | Medium | Low         | Comprehensive training, simple interface      |

## 📈 Success Metrics

**Performance Metrics:**

- **Page Load Speed:** <2.5s initial, <1s repeat visits
- **Core Web Vitals:** 100% passing rate
- **Cache Hit Rate:** >90% for repeat visitors
- **Error Rate:** <1% of page loads

**User Engagement:**

- **Time on Page:** >45 seconds average
- **Bounce Rate:** <50% from timetable page
- **Mobile Usage:** >70% of total timetable views
- **Return Visits:** >30% users return within 7 days

**Operational Efficiency:**

- **Content Update Time:** <10 minutes for schedule changes
- **Update Frequency:** Schedule updated weekly minimum
- **User Inquiries:** <5% decrease in schedule-related questions
- **Staff Adoption:** >90% operations team comfortable with CMS

## 🛠️ Technical Implementation Notes

### Sanity CMS Schema

```typescript
// sanity/schemas/timetable.ts
export const timetableSchema = {
  name: 'timetable',
  title: 'Class Timetable',
  type: 'document',
  fields: [
    {
      name: 'weeklySchedule',
      title: 'Weekly Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'classSlot',
          title: 'Class Slot',
          fields: [
            {
              name: 'day',
              title: 'Day of Week',
              type: 'string',
              options: {
                list: [
                  { title: 'Monday', value: 'monday' },
                  { title: 'Tuesday', value: 'tuesday' },
                  { title: 'Wednesday', value: 'wednesday' },
                  { title: 'Thursday', value: 'thursday' },
                  { title: 'Friday', value: 'friday' },
                  { title: 'Saturday', value: 'saturday' },
                  { title: 'Sunday', value: 'sunday' },
                ],
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'time',
              title: 'Class Time',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'classType',
              title: 'Class Type',
              type: 'string',
              options: {
                list: [
                  { title: 'CrossFit', value: 'crossfit' },
                  { title: 'Foundations', value: 'foundations' },
                  { title: 'Open Gym', value: 'open-gym' },
                  { title: 'Personal Training', value: 'pt' },
                  { title: 'Mobility Class', value: 'mobility' },
                ],
              },
            },
            {
              name: 'coach',
              title: 'Coach',
              type: 'reference',
              to: [{ type: 'coachBio' }],
            },
            {
              name: 'capacity',
              title: 'Class Capacity',
              type: 'number',
              validation: Rule => Rule.min(1).max(50),
            },
            {
              name: 'currentBookings',
              title: 'Current Bookings',
              type: 'number',
              description: 'Manual entry for capacity indication',
            },
            {
              name: 'notes',
              title: 'Special Notes',
              type: 'text',
              rows: 2,
            },
            {
              name: 'isActive',
              title: 'Active Class',
              type: 'boolean',
              initialValue: true,
            },
          ],
          preview: {
            select: {
              day: 'day',
              time: 'time',
              classType: 'classType',
              coach: 'coach.name',
            },
            prepare({ day, time, classType, coach }) {
              return {
                title: `${day} ${time} - ${classType}`,
                subtitle: coach ? `with ${coach}` : 'No coach assigned',
              }
            },
          },
        },
      ],
    },
    {
      name: 'holidayMessage',
      title: 'Holiday/Special Schedule Message',
      type: 'object',
      fields: [
        {
          name: 'isActive',
          title: 'Show Holiday Message',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'message',
          title: 'Message',
          type: 'text',
          rows: 3,
        },
        {
          name: 'validFrom',
          title: 'Valid From',
          type: 'date',
        },
        {
          name: 'validTo',
          title: 'Valid To',
          type: 'date',
        },
      ],
    },
    {
      name: 'timezoneInfo',
      title: 'Timezone Information',
      type: 'object',
      fields: [
        {
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
          initialValue: 'Australia/Melbourne',
        },
        {
          name: 'displayMessage',
          title: 'Display Message',
          type: 'string',
          initialValue: 'All times shown in Melbourne time (AEST/AEDT)',
        },
      ],
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Class Timetable',
        subtitle: 'Weekly schedule configuration',
      }
    },
  },
}
```

### Timetable Component Implementation

```tsx
// components/Timetable/TimetableView.tsx
import { useState, useMemo } from 'react'
import { format, startOfWeek, addDays } from 'date-fns'

interface TimetableProps {
  schedule: ClassSlot[]
  holidayMessage?: {
    isActive: boolean
    message: string
    validFrom: string
    validTo: string
  }
  timezoneInfo: {
    timezone: string
    displayMessage: string
  }
}

export function TimetableView({
  schedule,
  holidayMessage,
  timezoneInfo,
}: TimetableProps) {
  const [selectedDay, setSelectedDay] = useState<string>('')
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  const weekDays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ]

  const organizedSchedule = useMemo(() => {
    const organized = weekDays.reduce(
      (acc, day) => {
        acc[day] = schedule
          .filter(slot => slot.day === day && slot.isActive)
          .sort(
            (a, b) =>
              new Date(`1970/01/01 ${a.time}`).getTime() -
              new Date(`1970/01/01 ${b.time}`).getTime()
          )
        return acc
      },
      {} as Record<string, ClassSlot[]>
    )

    return organized
  }, [schedule])

  const getCapacityStatus = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100
    if (percentage >= 100) return { status: 'full', color: 'red', text: 'Full' }
    if (percentage >= 80)
      return { status: 'limited', color: 'yellow', text: 'Few spots left' }
    return { status: 'available', color: 'green', text: 'Available' }
  }

  const isHolidayMessageActive = () => {
    if (!holidayMessage?.isActive) return false
    const now = new Date()
    const validFrom = new Date(holidayMessage.validFrom)
    const validTo = new Date(holidayMessage.validTo)
    return now >= validFrom && now <= validTo
  }

  return (
    <div className='timetable-container'>
      {/* Holiday Message */}
      {isHolidayMessageActive() && (
        <div className='holiday-message'>
          <div className='holiday-icon'>🎄</div>
          <p>{holidayMessage.message}</p>
        </div>
      )}

      {/* Timezone Information */}
      <div className='timezone-info'>
        <small>{timezoneInfo.displayMessage}</small>
      </div>

      {/* Mobile Day Selector */}
      <div className='mobile-day-selector md:hidden'>
        {weekDays.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`day-tab ${selectedDay === day ? 'active' : ''}`}
          >
            {day.substring(0, 3)}
          </button>
        ))}
      </div>

      {/* Desktop Grid View */}
      <div className='desktop-timetable hidden md:block'>
        <table className='timetable-grid'>
          <thead>
            <tr>
              <th>Time</th>
              {weekDays.map(day => (
                <th key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getTimeSlots(organizedSchedule).map(timeSlot => (
              <tr key={timeSlot}>
                <td className='time-cell'>{timeSlot}</td>
                {weekDays.map(day => {
                  const classAtTime = organizedSchedule[day]?.find(
                    c => c.time === timeSlot
                  )
                  return (
                    <td key={`${day}-${timeSlot}`} className='class-cell'>
                      {classAtTime ? (
                        <ClassSlotCard
                          classSlot={classAtTime}
                          capacityStatus={getCapacityStatus(
                            classAtTime.currentBookings || 0,
                            classAtTime.capacity
                          )}
                        />
                      ) : (
                        <div className='empty-slot'>-</div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List View */}
      <div className='mobile-timetable md:hidden'>
        {selectedDay && organizedSchedule[selectedDay] ? (
          <div className='day-schedule'>
            <h3>
              {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
            </h3>
            {organizedSchedule[selectedDay].map((classSlot, index) => (
              <div key={index} className='mobile-class-card'>
                <div className='class-time'>{classSlot.time}</div>
                <div className='class-details'>
                  <div className='class-type'>{classSlot.classType}</div>
                  {classSlot.coach && (
                    <div className='class-coach'>
                      with {classSlot.coach.name}
                    </div>
                  )}
                  <div
                    className={`capacity-indicator ${
                      getCapacityStatus(
                        classSlot.currentBookings || 0,
                        classSlot.capacity
                      ).status
                    }`}
                  >
                    {
                      getCapacityStatus(
                        classSlot.currentBookings || 0,
                        classSlot.capacity
                      ).text
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='no-classes'>
            <p>No classes scheduled for this day.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to get all unique time slots
function getTimeSlots(organizedSchedule: Record<string, ClassSlot[]>) {
  const allTimes = Object.values(organizedSchedule)
    .flat()
    .map(slot => slot.time)

  return [...new Set(allTimes)].sort(
    (a, b) =>
      new Date(`1970/01/01 ${a}`).getTime() -
      new Date(`1970/01/01 ${b}`).getTime()
  )
}

interface ClassSlotCardProps {
  classSlot: ClassSlot
  capacityStatus: {
    status: string
    color: string
    text: string
  }
}

function ClassSlotCard({ classSlot, capacityStatus }: ClassSlotCardProps) {
  return (
    <div className='class-slot-card'>
      <div className='class-type'>{classSlot.classType}</div>
      {classSlot.coach && (
        <div className='coach-name'>{classSlot.coach.name}</div>
      )}
      <div className={`capacity-badge ${capacityStatus.status}`}>
        {capacityStatus.text}
      </div>
      {classSlot.notes && <div className='class-notes'>{classSlot.notes}</div>}
    </div>
  )
}
```

### Analytics Tracking

```typescript
// lib/analytics/timetable-events.ts
export const trackTimetableEvents = {
  pageView: () => {
    gtag('event', 'timetable_page_view', {
      event_category: 'content_engagement',
      event_label: 'timetable_access',
    })
  },

  daySelect: (day: string, viewMode: string) => {
    gtag('event', 'timetable_day_select', {
      event_category: 'user_interaction',
      event_label: day,
      view_mode: viewMode,
    })
  },

  classView: (classType: string, coach: string, time: string) => {
    gtag('event', 'timetable_class_view', {
      event_category: 'content_engagement',
      event_label: classType,
      coach_name: coach,
      class_time: time,
    })
  },

  printSchedule: () => {
    gtag('event', 'timetable_print', {
      event_category: 'user_interaction',
      event_label: 'print_schedule',
    })
  },

  capacityCheck: (classType: string, capacityStatus: string) => {
    gtag('event', 'timetable_capacity_check', {
      event_category: 'user_interest',
      event_label: classType,
      capacity_status: capacityStatus,
    })
  },
}
```

## 📝 Content Requirements

### Initial Schedule Data

- [ ] **Class Types:**
  - CrossFit (main group classes)
  - Foundations (beginner-focused classes)
  - Open Gym (supervised self-directed training)
  - Personal Training (1-on-1 sessions)
  - Mobility/Recovery classes

- [ ] **Schedule Template:**
  - Morning sessions: 6:00 AM, 9:00 AM
  - Evening sessions: 5:30 PM, 6:30 PM
  - Weekend variations: 8:00 AM, 9:00 AM, 10:00 AM
  - Rest days and recovery sessions

### Operational Documentation

- [ ] **CMS Update Workflow:**
  1. Weekly schedule review (Sundays)
  2. Holiday planning (2 weeks advance)
  3. Coach assignment updates
  4. Capacity adjustments
  5. Special event scheduling

- [ ] **Content Guidelines:**
  - Class names consistent with gym terminology
  - Coach names match staff directory
  - Capacity numbers realistic and current
  - Notes clear and helpful for members
  - Holiday messages professional and informative

---

**Story Owner:** Product Manager  
**Technical Lead:** Frontend Developer  
**Content Manager:** Operations Manager  
**Created:** September 14, 2025  
**Status:** Ready for Development
