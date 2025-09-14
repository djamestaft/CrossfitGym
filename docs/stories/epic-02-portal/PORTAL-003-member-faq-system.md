# User Story: PORTAL-003 - Member FAQ System

**Epic:** Epic 2: Member Portal (Light)  
**Story ID:** PORTAL-003  
**Priority:** High  
**Effort Estimate:** 2 story points  
**Sprint Target:** Week 2-3  

## 📋 User Story

**As a** member with questions about programming, policies, or procedures  
**I want** quick access to answers for common questions  
**So that** I can self-serve information instead of asking coaches repeatedly during class time  

## ✅ Acceptance Criteria

### Content Management System
- [ ] **CMS-Editable FAQ Structure:**
  - Sanity CMS schema for FAQ content with rich text support
  - Category-based organization (Programming, Scheduling, Policies, Equipment)
  - Question/answer pairs with expandable content
  - Staff-friendly editing interface with preview functionality
  - Content versioning and revision history

- [ ] **Content Organization:**
  - Logical grouping by topic area with clear categories
  - Priority ordering within categories (most important first)
  - Cross-linking between related FAQ items
  - "Last updated" timestamps for content freshness
  - Featured/pinned questions for urgent announcements

- [ ] **Publishing Workflow:**
  - Draft/review/publish workflow for content quality
  - Bulk import capability for initial content load
  - Scheduled publishing for time-sensitive updates
  - Content approval process for policy-related answers
  - Easy duplication and templating for similar questions

### Search & Discovery
- [ ] **Client-Side Search:**
  - Real-time search across all FAQ content
  - Search-as-you-type with instant results
  - Fuzzy matching for typos and variations
  - Highlight matching terms in search results
  - Search analytics to identify common queries

- [ ] **Navigation & Filtering:**
  - Category-based filtering with visual indicators
  - "Most viewed" and "Recently updated" sections
  - Breadcrumb navigation for content hierarchy
  - Related questions suggestions at bottom of answers
  - Quick links to popular questions on portal homepage

- [ ] **Mobile Optimization:**
  - Touch-optimized accordion interface
  - Swipe gestures for category navigation
  - Fast loading on mobile connections
  - Responsive design across all screen sizes
  - Offline access to frequently viewed content

### User Experience
- [ ] **Interactive Design:**
  - Expandable/collapsible question format
  - Smooth animations for content reveal
  - Clear visual hierarchy with typography
  - Print-friendly formatting for reference
  - Share functionality for specific questions

- [ ] **Accessibility:**
  - Screen reader compatibility with proper ARIA labels
  - Keyboard navigation for all interactive elements
  - High contrast mode support
  - Focus indicators for keyboard users
  - Alternative text for any images in answers

- [ ] **Performance:**
  - FAQ content loads in <1 second
  - Search results appear in <300ms
  - Smooth scrolling and animations
  - Progressive loading for large FAQ sets
  - Client-side caching for repeat visits

### Analytics & Insights
- [ ] **Usage Tracking:**
  - Track most-viewed questions for content optimization
  - Search term analysis for gap identification
  - User pathway analysis through FAQ sections
  - Time spent reading specific answers
  - Bounce rate from FAQ to other portal sections

- [ ] **Content Performance:**
  - Question engagement rates and completion
  - Search success rates (clicks after search)
  - Category popularity and usage patterns
  - Mobile vs desktop usage analytics
  - Export capabilities for staff reporting

## 🔗 Dependencies

**Upstream Dependencies:**
- [ ] Member portal authentication (PORTAL-001) functional
- [ ] Sanity CMS configuration and schema setup
- [ ] Content collection from coaching staff and operations
- [ ] FAQ content writing and organization completed

**Technical Dependencies:**
- [ ] Search functionality implementation (Fuse.js or similar)
- [ ] Mobile-responsive design system components
- [ ] Analytics event tracking system
- [ ] Content delivery optimization

**Content Dependencies:**
- [ ] FAQ content audit and collection from staff
- [ ] Policy documentation review and approval
- [ ] Common member questions analysis
- [ ] Content categorization and prioritization

## 🧪 Testing Criteria

- [ ] **Content Management Testing:**
  - Staff can easily add, edit, and organize FAQ content
  - Publishing workflow prevents broken or incomplete content
  - Content preview accurately reflects published appearance
  - Bulk operations work efficiently for large content sets

- [ ] **Search Functionality Testing:**
  - Search returns relevant results for various query types
  - Fuzzy matching handles common typos and variations
  - Search performance maintained with 100+ FAQ items
  - Analytics accurately track search behavior and success

- [ ] **User Experience Testing:**
  - FAQ navigation intuitive for first-time users
  - Mobile experience smooth across iOS and Android
  - Accessibility compliance verified with screen readers
  - Loading performance acceptable on slow connections

- [ ] **Content Quality Testing:**
  - All FAQ answers accurate and up-to-date
  - Cross-references and links functional
  - Content covers actual member questions
  - Language clear and appropriate for target audience

## 📊 Definition of Done

- [ ] **Technical Implementation:**
  - FAQ system fully integrated with portal authentication
  - Search functionality fast and accurate across all content
  - Mobile-responsive design tested across devices
  - Analytics tracking implemented and verified

- [ ] **Content Complete:**
  - Minimum 30 FAQ items across all categories
  - All content reviewed and approved by operations team
  - Question categories logically organized
  - Content addresses actual member questions from coaching staff

- [ ] **Staff Training:**
  - Operations team trained on content management system
  - Content update workflow documented and tested
  - Regular review schedule established
  - Emergency update procedures defined

- [ ] **Performance Validation:**
  - Page load times <2 seconds on mobile
  - Search response times <300ms consistently
  - Accessibility compliance verified (WCAG AA)
  - Cross-browser compatibility confirmed

## ⚠️ Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Outdated content | Medium | Medium | Regular review schedule, update notifications |
| Poor search results | Medium | Low | Content tagging, search algorithm tuning |
| Staff adoption for updates | Medium | Medium | Simple CMS workflow, training program |
| Mobile usability issues | Medium | Low | Mobile-first design, device testing |
| Content maintenance burden | Low | Medium | Template-based answers, bulk operations |

## 📈 Success Metrics

**User Engagement:**
- **FAQ Usage Rate:** >50% of portal users access FAQ within first month
- **Search Success Rate:** >80% of searches result in content engagement
- **Self-Service Rate:** >70% of FAQ sessions don't require follow-up contact
- **Content Discovery:** >60% users explore multiple FAQ categories

**Content Performance:**
- **Answer Completeness:** <10% FAQ sessions end without engagement
- **Content Freshness:** 100% content reviewed monthly
- **Popular Content:** Top 10 questions account for >50% of views
- **Search Analytics:** Clear patterns identify content gaps

**Operational Efficiency:**
- **Coach Question Reduction:** >30% decrease in repetitive questions during class
- **Support Ticket Reduction:** >25% decrease in basic policy/procedure questions
- **Content Management:** Staff can update content in <5 minutes
- **Member Satisfaction:** >4.0/5 rating for FAQ usefulness

## 🛠️ Technical Implementation Notes

### FAQ Data Structure
```typescript
// types/faq.ts
interface FAQItem {
  id: string;
  question: string;
  answer: string; // Rich text/HTML
  category: FAQCategory;
  tags: string[];
  priority: number; // For ordering within category
  featured: boolean; // Pin to top of category
  relatedQuestions: string[]; // FAQ IDs
  lastUpdated: Date;
  author: string;
  viewCount: number;
  status: 'draft' | 'published' | 'archived';
}

interface FAQCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  color: string; // For visual differentiation
}

// Predefined categories
export const faqCategories: FAQCategory[] = [
  {
    id: 'programming',
    name: 'Programming & Workouts',
    description: 'Questions about daily workouts, scaling, and modifications',
    icon: 'dumbbell',
    order: 1,
    color: '#2563eb'
  },
  {
    id: 'scheduling',
    name: 'Scheduling & Classes',
    description: 'Class times, booking, cancellations, and attendance',
    icon: 'calendar',
    order: 2,
    color: '#059669'
  },
  {
    id: 'policies',
    name: 'Policies & Procedures',
    description: 'Gym rules, membership terms, and general policies',
    icon: 'clipboard',
    order: 3,
    color: '#dc2626'
  },
  {
    id: 'equipment',
    name: 'Equipment & Facility',
    description: 'Equipment usage, facility access, and safety guidelines',
    icon: 'cog',
    order: 4,
    color: '#7c2d12'
  }
];
```

### Sanity CMS Schema
```typescript
// sanity/schemas/faq.ts
export const faqSchema = {
  name: 'faq',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required().min(10).max(200)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'question' },
      validation: Rule => Rule.required()
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Programming & Workouts', value: 'programming'},
          {title: 'Scheduling & Classes', value: 'scheduling'},
          {title: 'Policies & Procedures', value: 'policies'},
          {title: 'Equipment & Facility', value: 'equipment'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'priority',
      title: 'Priority Order',
      type: 'number',
      description: 'Lower numbers appear first in category'
    },
    {
      name: 'featured',
      title: 'Featured Question',
      type: 'boolean',
      description: 'Pin to top of category'
    },
    {
      name: 'relatedQuestions',
      title: 'Related Questions',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'faq'}]
      }]
    }
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category'
    }
  }
};
```

### Search Implementation
```typescript
// lib/search/faq-search.ts
import Fuse from 'fuse.js';

export class FAQSearch {
  private fuse: Fuse<FAQItem>;
  private faqItems: FAQItem[];

  constructor(faqItems: FAQItem[]) {
    this.faqItems = faqItems;
    this.fuse = new Fuse(faqItems, {
      keys: [
        { name: 'question', weight: 0.6 },
        { name: 'answer', weight: 0.3 },
        { name: 'tags', weight: 0.1 }
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2
    });
  }

  search(query: string, category?: string): FAQItem[] {
    if (!query.trim()) {
      return this.getByCategory(category);
    }

    let results = this.fuse.search(query);

    // Filter by category if specified
    if (category) {
      results = results.filter(r => r.item.category === category);
    }

    // Sort by relevance score and priority
    return results
      .sort((a, b) => {
        const scoreA = a.score || 0;
        const scoreB = b.score || 0;
        const priorityA = a.item.priority || 999;
        const priorityB = b.item.priority || 999;
        
        if (Math.abs(scoreA - scoreB) < 0.1) {
          return priorityA - priorityB; // Better priority wins
        }
        return scoreA - scoreB; // Better score wins
      })
      .map(r => r.item)
      .slice(0, 10); // Limit results
  }

  getByCategory(category?: string): FAQItem[] {
    let items = this.faqItems;
    
    if (category) {
      items = items.filter(item => item.category === category);
    }

    return items
      .sort((a, b) => {
        // Featured items first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        
        // Then by priority
        const priorityA = a.priority || 999;
        const priorityB = b.priority || 999;
        return priorityA - priorityB;
      });
  }

  getPopularQuestions(limit = 5): FAQItem[] {
    return this.faqItems
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, limit);
  }

  getFeaturedQuestions(): FAQItem[] {
    return this.faqItems
      .filter(item => item.featured)
      .sort((a, b) => (a.priority || 999) - (b.priority || 999));
  }
}
```

### FAQ Component Implementation
```tsx
// components/portal/FAQSection.tsx
import { useState, useMemo } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface FAQSectionProps {
  faqItems: FAQItem[];
  categories: FAQCategory[];
}

export function FAQSection({ faqItems, categories }: FAQSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const faqSearch = useMemo(() => new FAQSearch(faqItems), [faqItems]);

  const filteredFAQs = useMemo(() => {
    return faqSearch.search(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory, faqSearch]);

  const toggleExpanded = (faqId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
      // Track FAQ view
      trackFAQEvent('faq_view', { faq_id: faqId, search_query: searchQuery });
    }
    setExpandedItems(newExpanded);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      trackFAQEvent('faq_search', { 
        search_query: query, 
        results_count: filteredFAQs.length 
      });
    }
  };

  return (
    <div className="faq-section">
      {/* Search Bar */}
      <div className="search-bar">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search frequently asked questions..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        <button
          onClick={() => setSelectedCategory('')}
          className={`category-button ${!selectedCategory ? 'active' : ''}`}
        >
          All Questions
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            style={{ '--category-color': category.color } as any}
          >
            <span className="category-icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="faq-items">
        {filteredFAQs.length === 0 ? (
          <div className="no-results">
            <p>No questions found for "{searchQuery}"</p>
            <p>Try a different search term or browse by category.</p>
          </div>
        ) : (
          filteredFAQs.map(faq => (
            <div key={faq.id} className="faq-item">
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="faq-question"
                aria-expanded={expandedItems.has(faq.id)}
              >
                <span className="question-text">{faq.question}</span>
                <ChevronDownIcon 
                  className={`chevron ${expandedItems.has(faq.id) ? 'expanded' : ''}`}
                />
              </button>
              
              {expandedItems.has(faq.id) && (
                <div className="faq-answer">
                  <div 
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                    className="answer-content"
                  />
                  
                  {faq.relatedQuestions.length > 0 && (
                    <div className="related-questions">
                      <h4>Related Questions:</h4>
                      <ul>
                        {faq.relatedQuestions.map(relatedId => {
                          const related = faqItems.find(item => item.id === relatedId);
                          return related ? (
                            <li key={relatedId}>
                              <button 
                                onClick={() => toggleExpanded(relatedId)}
                                className="related-link"
                              >
                                {related.question}
                              </button>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

### Analytics Implementation
```typescript
// lib/analytics/faq-events.ts
export const trackFAQEvent = (eventName: string, parameters: any) => {
  gtag('event', eventName, {
    event_category: 'portal_faq',
    ...parameters
  });
};

export const trackFAQEvents = {
  search: (query: string, resultsCount: number) => {
    trackFAQEvent('faq_search', {
      search_query: query,
      results_count: resultsCount
    });
  },

  view: (faqId: string, question: string, category: string) => {
    trackFAQEvent('faq_view', {
      faq_id: faqId,
      faq_question: question,
      faq_category: category
    });
  },

  categoryFilter: (category: string) => {
    trackFAQEvent('faq_category_filter', {
      selected_category: category
    });
  },

  relatedClick: (fromFaqId: string, toFaqId: string) => {
    trackFAQEvent('faq_related_click', {
      from_faq_id: fromFaqId,
      to_faq_id: toFaqId
    });
  }
};
```

## 📝 Content Requirements

### Initial FAQ Content (30+ Items)

#### Programming & Workouts (8-10 items)
- [ ] "How do I scale workouts if I'm a beginner?"
- [ ] "What does 'Rx' mean and should I do it?"
- [ ] "Can I modify workouts for injuries?"
- [ ] "How often should I attend classes per week?"
- [ ] "What if I can't complete a workout in the time limit?"
- [ ] "How do I know if I'm using the right weight?"
- [ ] "What's the difference between strength and conditioning days?"
- [ ] "Can I do extra work before or after class?"

#### Scheduling & Classes (8-10 items)
- [ ] "How do I book and cancel classes?"
- [ ] "What's the cancellation policy?"
- [ ] "Can I make up missed classes?"
- [ ] "What happens if I'm late to class?"
- [ ] "How early can I arrive before class?"
- [ ] "What if a class is full?"
- [ ] "Do you offer open gym time?"
- [ ] "What are the different class types?"

#### Policies & Procedures (6-8 items)
- [ ] "What should I bring to my first class?"
- [ ] "What's the dress code for workouts?"
- [ ] "Can I pause or freeze my membership?"
- [ ] "What's the guest policy?"
- [ ] "How do membership payments work?"
- [ ] "What if I need to move or relocate?"
- [ ] "What safety protocols are in place?"

#### Equipment & Facility (6-8 items)
- [ ] "What equipment do you provide vs. what should I bring?"
- [ ] "How do I adjust equipment for my size?"
- [ ] "What are the facility hours?"
- [ ] "Where can I store my personal items?"
- [ ] "What cleaning protocols are in place?"
- [ ] "Can I use equipment outside of class time?"
- [ ] "What if equipment is broken or unavailable?"

---

**Story Owner:** Product Manager  
**Content Lead:** Operations Manager  
**Technical Lead:** Frontend Developer  
**Created:** September 14, 2025  
**Status:** Ready for Development
