# User Story: PORTAL-002 - Programming Notes & Movement Library

**Epic:** Epic 2: Member Portal (Light)  
**Story ID:** PORTAL-002  
**Priority:** High  
**Effort Estimate:** 4 story points  
**Sprint Target:** Week 2-3  

## 📋 User Story

**As a** member attending classes  
**I want** clear programming notes and movement demonstrations  
**So that** I can scale workouts safely, understand proper form, and prepare for upcoming sessions  

## ✅ Acceptance Criteria

### Weekly Programming Notes
- [ ] **Content Management:**
  - CMS-editable weekly programming content
  - Rich text editor for workout descriptions
  - Scaling options and modifications prominently displayed
  - Weekly theme or focus area explanation
  - Equipment requirements and alternatives listed

- [ ] **Workout Information:**
  - Daily workout descriptions with clear structure
  - Scaling options for beginner/intermediate/advanced
  - Time domains and intended stimulus explanation
  - Modification suggestions for common injuries
  - Equipment substitutions for home workouts

- [ ] **Update Workflow:**
  - Weekly content update schedule (Sunday nights)
  - Version control for programming changes
  - Preview functionality before publishing
  - Automated notification when new programming posted
  - Historical programming access (last 4 weeks)

### Movement Library
- [ ] **Video Content:**
  - Minimum 12 foundational movement demonstrations
  - 60-90 second videos with clear form instruction
  - Multiple camera angles for complex movements
  - Closed captions for accessibility compliance
  - Video quality optimized for mobile viewing

- [ ] **Content Organization:**
  - Movement categories (Strength, Cardio, Mobility, Olympic)
  - Search functionality across movement names and descriptions
  - Filter by equipment required or body part targeted
  - Difficulty level indicators (Beginner/Intermediate/Advanced)
  - "Related movements" suggestions for progressions

- [ ] **Technical Requirements:**
  - Video player with standard controls (play/pause/scrub)
  - Offline viewing capability for downloaded videos
  - Progressive loading for slower connections
  - Video analytics tracking (play, completion, engagement)
  - Mobile-optimized player with touch controls

### User Experience
- [ ] **Navigation & Discovery:**
  - Quick search bar prominently placed
  - Browse by category with visual icons
  - "Featured this week" section for current programming
  - Recently viewed movements history
  - Bookmark/favorite movements functionality

- [ ] **Mobile Performance:**
  - Touch-optimized interface for mobile devices
  - Swipe gestures for navigation between videos
  - Fast loading times on 3G connections (<3 seconds)
  - Responsive video player across screen sizes
  - Offline mode for programming notes and video descriptions

- [ ] **Accessibility:**
  - Screen reader compatibility for all content
  - Keyboard navigation for video controls
  - High contrast mode support
  - Text scaling compatibility
  - Alternative text descriptions for visual content

### Analytics & Engagement
- [ ] **Content Tracking:**
  - Video play/completion rates by movement
  - Most searched movement terms
  - Programming notes engagement time
  - Popular content identification for future creation
  - User pathway analysis through content

## 🔗 Dependencies

**Upstream Dependencies:**
- [ ] Member authentication system (PORTAL-001) functional
- [ ] Video hosting platform selection and setup
- [ ] Content Management System (Sanity) configured
- [ ] Video production and editing workflow established

**Content Creation Dependencies:**
- [ ] 12 foundational movements identified and prioritized
- [ ] Video production equipment and setup
- [ ] Professional video editing and captioning service
- [ ] Weekly programming content creation workflow

**Technical Dependencies:**
- [ ] Video hosting service integration (Vimeo Pro/YouTube/self-hosted)
- [ ] Search functionality implementation
- [ ] Mobile video player optimization
- [ ] Content delivery network for video streaming

## 🧪 Testing Criteria

- [ ] **Content Management Testing:**
  - CMS workflow tested by non-technical team members
  - Weekly programming update process smooth and efficient
  - Content preview and publishing workflow functional
  - Version control maintains content history properly

- [ ] **Video Performance Testing:**
  - Video loading times <3 seconds on 3G connections
  - Player works consistently across devices and browsers
  - Offline viewing functionality tested and reliable
  - Video quality automatically adjusts to connection speed

- [ ] **Search & Discovery Testing:**
  - Search returns relevant results within 500ms
  - Filtering and categorization work accurately
  - Mobile navigation intuitive and responsive
  - Content discovery pathways tested with real users

- [ ] **Accessibility Testing:**
  - Screen reader navigation tested with NVDA/JAWS
  - Keyboard-only navigation functional
  - Video captions accurate and properly timed
  - High contrast mode displays content clearly

## 📊 Definition of Done

- [ ] **Content Complete:**
  - 12 foundational movement videos produced and captioned
  - First 4 weeks of programming notes created and loaded
  - All videos have accurate closed captions
  - Content organized in logical categories with descriptions

- [ ] **Technical Implementation:**
  - Video hosting and streaming optimized for mobile
  - Search functionality returning accurate results
  - CMS workflow tested and documented for staff
  - Mobile responsiveness verified across devices

- [ ] **Performance Validation:**
  - Page load times <2 seconds on mobile
  - Video start times <3 seconds consistently
  - Search response times <500ms
  - Offline functionality tested and working

- [ ] **Analytics Implementation:**
  - Video engagement tracking (play/completion) active
  - Programming notes view duration captured
  - Search term tracking for content optimization
  - User pathway analysis through portal sections

## ⚠️ Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Video production delays | High | Medium | Start with existing gym footage, professional editing later |
| Video hosting costs | Medium | Low | Optimize compression, consider YouTube private/unlisted |
| Content maintenance burden | Medium | Medium | Simple CMS workflow, template-based programming notes |
| Poor mobile video experience | High | Low | Mobile-first testing, progressive enhancement |
| Search performance issues | Medium | Low | Implement client-side search, optimize indexing |

## 📈 Success Metrics

**Content Engagement:**
- **Video Completion Rate:** >60% average completion
- **Programming Notes Views:** >80% of weekly portal users
- **Search Usage:** >30% of sessions include movement search
- **Content Discovery:** >40% users explore beyond current week

**Technical Performance:**
- **Video Load Time:** <3 seconds for 95% of plays
- **Search Response:** <500ms for 99% of queries
- **Mobile Usage:** >70% of portal traffic from mobile devices
- **Session Duration:** >4 minutes average engagement time

**Member Value:**
- **Weekly Retention:** >40% members return weekly for programming
- **Content Satisfaction:** >4.5/5 rating in user feedback
- **Support Reduction:** <20% decrease in movement-related questions
- **Portal Adoption:** >60% of active members use within 2 weeks

## 🛠️ Technical Implementation Notes

### Video Hosting Architecture
```typescript
// lib/video/hosting-config.ts
interface VideoConfig {
  provider: 'vimeo' | 'youtube' | 'self-hosted';
  quality: 'auto' | '720p' | '1080p';
  captions: boolean;
  analytics: boolean;
  offline: boolean;
}

export const videoConfig: VideoConfig = {
  provider: 'vimeo', // Vimeo Pro for privacy + quality
  quality: 'auto', // Adaptive streaming
  captions: true, // Required for accessibility
  analytics: true, // Track engagement
  offline: true // Progressive Web App caching
};

// Video player wrapper with analytics
export function MovementVideo({ videoId, title, category }: VideoProps) {
  const handlePlay = () => {
    trackVideoEvent('video_play', {
      video_id: videoId,
      video_title: title,
      video_category: category
    });
  };

  const handleComplete = () => {
    trackVideoEvent('video_complete', {
      video_id: videoId,
      video_title: title,
      video_category: category
    });
  };

  return (
    <div className="video-player-wrapper">
      <VideoPlayer
        src={getVideoUrl(videoId)}
        onPlay={handlePlay}
        onEnded={handleComplete}
        controls={true}
        captions={true}
        responsive={true}
      />
    </div>
  );
}
```

### Movement Library Data Structure
```typescript
// types/movement-library.ts
interface Movement {
  id: string;
  title: string;
  description: string;
  category: 'strength' | 'cardio' | 'mobility' | 'olympic' | 'gymnastics';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  targetMuscles: string[];
  video: {
    url: string;
    duration: number;
    thumbnail: string;
    captions: boolean;
  };
  instructions: {
    setup: string;
    execution: string;
    commonMistakes: string[];
    scaling: {
      easier: string[];
      harder: string[];
    };
  };
  relatedMovements: string[]; // Movement IDs
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Sanity CMS schema for movements
export const movementSchema = {
  name: 'movement',
  title: 'Movement',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Movement Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Strength', value: 'strength'},
          {title: 'Cardio', value: 'cardio'},
          {title: 'Mobility', value: 'mobility'},
          {title: 'Olympic', value: 'olympic'},
          {title: 'Gymnastics', value: 'gymnastics'}
        ]
      }
    },
    {
      name: 'video',
      title: 'Video',
      type: 'object',
      fields: [
        {name: 'url', title: 'Video URL', type: 'url'},
        {name: 'thumbnail', title: 'Thumbnail', type: 'image'},
        {name: 'duration', title: 'Duration (seconds)', type: 'number'}
      ]
    }
  ]
};
```

### Search Implementation
```typescript
// lib/search/movement-search.ts
import Fuse from 'fuse.js';

interface SearchOptions {
  query: string;
  category?: string;
  difficulty?: string;
  equipment?: string[];
}

export class MovementSearch {
  private fuse: Fuse<Movement>;

  constructor(movements: Movement[]) {
    this.fuse = new Fuse(movements, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'category', weight: 0.2 },
        { name: 'tags', weight: 0.1 }
      ],
      threshold: 0.3, // Fuzzy matching tolerance
      includeScore: true
    });
  }

  search(options: SearchOptions): Movement[] {
    let results = this.fuse.search(options.query);

    // Apply additional filters
    if (options.category) {
      results = results.filter(r => r.item.category === options.category);
    }

    if (options.difficulty) {
      results = results.filter(r => r.item.difficulty === options.difficulty);
    }

    if (options.equipment?.length) {
      results = results.filter(r => 
        options.equipment!.some(eq => r.item.equipment.includes(eq))
      );
    }

    // Sort by relevance score
    return results
      .sort((a, b) => (a.score || 0) - (b.score || 0))
      .map(r => r.item)
      .slice(0, 20); // Limit results
  }

  getPopularSearches(): string[] {
    // Return popular search terms for autocomplete
    return [
      'squat', 'deadlift', 'pullup', 'burpee', 'kettlebell',
      'shoulder mobility', 'hip flexor', 'core', 'cardio'
    ];
  }
}
```

### Programming Notes Schema
```typescript
// types/programming.ts
interface WeeklyProgramming {
  id: string;
  weekOf: Date; // Monday of the week
  theme: string;
  overview: string;
  dailyWorkouts: DailyWorkout[];
  publishedAt: Date;
  status: 'draft' | 'published' | 'archived';
}

interface DailyWorkout {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  title: string;
  warmup: string;
  strength?: {
    description: string;
    sets: string;
    notes: string;
  };
  conditioning: {
    description: string;
    timeDomain: string;
    stimulus: string;
    scaling: {
      rx: string;
      intermediate: string;
      beginner: string;
    };
  };
  cooldown: string;
  equipment: string[];
  modifications: string[];
  coachNotes?: string;
}

// Sanity CMS schema for programming
export const programmingSchema = {
  name: 'weeklyProgramming',
  title: 'Weekly Programming',
  type: 'document',
  fields: [
    {
      name: 'weekOf',
      title: 'Week Of (Monday)',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'theme',
      title: 'Weekly Theme',
      type: 'string'
    },
    {
      name: 'overview',
      title: 'Week Overview',
      type: 'text',
      rows: 4
    },
    {
      name: 'dailyWorkouts',
      title: 'Daily Workouts',
      type: 'array',
      of: [{
        type: 'object',
        name: 'dailyWorkout',
        fields: [
          {name: 'day', type: 'string', options: {list: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']}},
          {name: 'title', type: 'string'},
          {name: 'conditioning', type: 'object', fields: [
            {name: 'description', type: 'text'},
            {name: 'timeDomain', type: 'string'},
            {name: 'scaling', type: 'object', fields: [
              {name: 'rx', type: 'text'},
              {name: 'intermediate', type: 'text'},
              {name: 'beginner', type: 'text'}
            ]}
          ]}
        ]
      }]
    }
  ]
};
```

### Analytics Implementation
```typescript
// lib/analytics/portal-content.ts
export const trackContentEvents = {
  videoPlay: (videoData: any) => {
    gtag('event', 'video_play', {
      event_category: 'portal_engagement',
      event_label: videoData.title,
      video_category: videoData.category,
      video_duration: videoData.duration
    });
  },

  videoComplete: (videoData: any, watchTime: number) => {
    gtag('event', 'video_complete', {
      event_category: 'portal_engagement',
      event_label: videoData.title,
      video_category: videoData.category,
      completion_rate: (watchTime / videoData.duration) * 100
    });
  },

  programmingView: (weekData: any) => {
    gtag('event', 'programming_view', {
      event_category: 'portal_engagement',
      event_label: `week_${weekData.weekOf}`,
      programming_theme: weekData.theme
    });
  },

  movementSearch: (query: string, resultsCount: number) => {
    gtag('event', 'movement_search', {
      event_category: 'portal_engagement',
      event_label: query,
      search_results_count: resultsCount
    });
  }
};
```

## 📝 Content Requirements

### Initial Movement Library (12 Videos)
- [ ] **Strength Fundamentals:**
  1. Air Squat (form, depth, common mistakes)
  2. Deadlift Setup (hip hinge, back position)
  3. Push-up Progression (scaling options)
  4. Pull-up/Ring Row Scaling

- [ ] **Olympic/Power Movements:**
  5. Kettlebell Swing (hip drive, timing)
  6. Medicine Ball Clean (power development)
  7. Box Step-up (knee drive, control)

- [ ] **Cardio/Conditioning:**
  8. Rowing Technique (catch, drive, finish)
  9. Burpee Efficiency (pacing, modifications)

- [ ] **Mobility/Recovery:**
  10. Hip Flexor Stretch (couch stretch variation)
  11. Shoulder Mobility Sequence
  12. Foam Rolling Basics (IT band, calves)

### Programming Content Template
- [ ] **Weekly Structure:**
  - Monday: Strength focus with conditioning
  - Tuesday: Skill development + cardio
  - Wednesday: Heavy strength or Olympic lifting
  - Thursday: Conditioning emphasis
  - Friday: Mixed modal + community workout
  - Saturday: Longer workout or partner WOD
  - Sunday: Recovery or active rest suggestions

- [ ] **Content Requirements:**
  - Clear movement standards and rep schemes
  - Three scaling levels for every workout
  - Equipment substitutions for home workouts
  - Injury modifications for common issues
  - Time domain and intended stimulus explanation

---

**Story Owner:** Product Manager  
**Content Lead:** Head Coach  
**Technical Lead:** Frontend Developer  
**Created:** September 14, 2025  
**Status:** Ready for Development
