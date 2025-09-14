# Epic 2: Member Portal (Light)

**Epic ID:** EPIC-02  
**Priority:** High  
**Business Value:** Member retention (40% weekly login target)  
**Technical Complexity:** Medium  
**Effort Estimate:** 8-10 story points  
**Sprint Target:** Week 2-3

## 🎯 Epic Goal

Improve member stickiness and reduce churn through programming clarity and movement support resources.

**Success Metrics:**

- ≥40% of active members log into portal weekly
- Member satisfaction with programming clarity
- Reduced coaching questions about movements/scaling
- Increased member retention rates

## 👥 User Stories

### Story PORTAL-001: Authentication Gate Implementation

**As a** current member  
**I want** simple and secure access to member content  
**So that** I can view programming and resources without hassle

**Acceptance Criteria:**

- [ ] Email-based authentication gate (magic link preferred)
- [ ] No public access to portal content - strict security
- [ ] Member status verification against gym database
- [ ] Session management with reasonable timeout
- [ ] `portal_login` GA4 event tracking
- [ ] Mobile-first responsive design
- [ ] Clear error messaging for access issues
- [ ] Logout functionality and session cleanup

**Dependencies:**

- Authentication provider selection and setup
- Member database integration or manual list management
- Email delivery service for magic links

**Definition of Done:**

- [ ] Zero unauthorized access possible
- [ ] Session security audit passed
- [ ] Mobile authentication flow tested
- [ ] Analytics events firing correctly

---

### Story PORTAL-002: Programming Notes & Movement Library

**As a** member attending classes  
**I want** concise programming notes and movement demonstrations  
**So that** I can scale workouts safely and understand proper form

**Acceptance Criteria:**

- [ ] Weekly programming notes visible and updated
- [ ] Movement library with ≥12 captioned video demonstrations
- [ ] Client-side search functionality for movements
- [ ] Video player with accessibility controls
- [ ] Categories/tags for movement organization
- [ ] Notes include scaling options and modifications
- [ ] `video_play` and `post_view` GA4 events
- [ ] Offline viewing capability for videos

**Dependencies:**

- Video hosting solution (Vimeo/YouTube/self-hosted)
- Content creation workflow for weekly notes
- Video captioning service or manual process

**Definition of Done:**

- [ ] All videos have accurate captions
- [ ] Search returns relevant results quickly
- [ ] Video loading optimized for mobile data
- [ ] Weekly update process documented

---

### Story PORTAL-003: Member FAQ System

**As a** member with questions  
**I want** quick answers to common questions  
**So that** I can self-serve instead of asking coaches repeatedly

**Acceptance Criteria:**

- [ ] CMS-editable FAQ content structure
- [ ] Client-side search through FAQ content
- [ ] Categories for organization (programming, scheduling, policies)
- [ ] Links from portal navigation and contact page
- [ ] Mobile-optimized accordion or expandable design
- [ ] Usage tracking for most-viewed questions
- [ ] Easy content management workflow for staff

**Dependencies:**

- Sanity CMS setup and schema definition
- Content collection from common member questions
- Search functionality implementation

**Definition of Done:**

- [ ] Staff can easily add/edit FAQ content
- [ ] Search functionality works across all content
- [ ] Mobile experience optimized
- [ ] Analytics show FAQ engagement

## 🔗 Epic Dependencies

**Upstream Dependencies:**

- Authentication infrastructure
- Video hosting and captioning solution
- CMS setup and content management workflow

**Downstream Dependencies:**

- Member engagement data feeds into retention analytics
- Portal usage data informs post-MVP feature priorities

## 📊 Success Criteria

**Week 1 (Portal Launch):**

- Authentication system functional
- Base content loaded (first week programming, 12 videos)

**Week 4 Target:**

- 40% weekly active member usage
- Average session duration >3 minutes
- Video completion rates >60%
- FAQ search usage demonstrating self-service

## 🚨 Risks & Mitigations

| Risk                       | Impact                  | Mitigation                                     |
| -------------------------- | ----------------------- | ---------------------------------------------- |
| Low member adoption        | Miss engagement targets | Email announcement, in-class promotion         |
| Content maintenance burden | Stale content           | Simple CMS workflow, weekly update schedule    |
| Video hosting costs        | Budget overrun          | Optimize compression, consider YouTube private |
| Authentication complexity  | Development delays      | Start with simple email gate, enhance later    |

## 🎨 Design Considerations

**Information Architecture:**

```
Portal Home
├── This Week's Programming
├── Movement Library
│   ├── Search/Filter
│   └── Categories (Strength, Cardio, Mobility)
├── Member FAQ
└── Account/Logout
```

**Mobile-First Approach:**

- Single-column layout on mobile
- Touch-optimized video controls
- Swipe navigation between sections
- Offline-first video loading

## 📱 Technical Notes

**Authentication Options:**

1. **Magic Link (Recommended):** Email-based, no passwords
2. **Simple Login:** Email + password with reset flow
3. **Integration:** Sync with existing gym management system

**Video Hosting Strategy:**

- Vimeo Pro for quality + privacy controls
- YouTube unlisted as cost-effective alternative
- Self-hosted for maximum control (higher complexity)

**Performance Targets:**

- Portal loads in <2s on 3G
- Video starts playing in <3s
- Search results in <500ms

## 📝 Implementation Notes

**Content Strategy:**

- Weekly programming notes: 200-400 words, clear scaling options
- Movement videos: 60-90 seconds, multiple angles, clear form cues
- FAQ content: Address top 20 member questions from coaches

**Analytics Focus:**

- Track most-watched videos to inform content strategy
- Monitor search terms to identify content gaps
- Session duration and return visits for engagement

**Future Enhancements (Post-MVP):**

- Personal PR tracking
- Direct messaging with coaches
- Workout logging and progress tracking
- Social features and member connections

**Epic Owner:** Product Manager  
**Tech Lead:** Development Lead  
**Content Owner:** Head Coach  
**Last Updated:** September 13, 2025
