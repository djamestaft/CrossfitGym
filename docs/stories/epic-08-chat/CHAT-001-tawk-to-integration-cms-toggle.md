# User Story: CHAT-001 - Tawk.to Integration with CMS Toggle

**Epic:** Epic 8: Chat Integration  
**Story ID:** CHAT-001  
**Priority:** Medium  
**Effort Estimate:** 3 story points  
**Sprint Target:** Week 3-4  

## 📋 User Story

**As a** potential member with questions about the gym, programs, or membership  
**I want** immediate access to expert help through a chat interface  
**So that** I can get answers quickly and move forward with confidence in my fitness journey  

**As an** operations team member  
**I need** complete control over chat availability and timing  
**So that** I can manage support capacity effectively and avoid team overwhelm during busy periods  

## ✅ Acceptance Criteria

### Tawk.to Integration & User Experience
- [ ] **Professional Chat Widget:**
  - Tawk.to integration with custom branding matching site design
  - Responsive chat interface optimized for mobile and desktop
  - Professional greeting message aligned with gym's welcoming tone
  - Chat history preservation across page navigation
  - Smooth animations and transitions for widget interactions

- [ ] **Availability States Management:**
  - Online state: Green indicator with "Chat with us!" message
  - Busy state: Yellow indicator with "We'll respond soon" message
  - Offline state: Red indicator with "Leave a message" option
  - Custom offline message with business hours and response expectations
  - Fallback contact information when chat unavailable

- [ ] **Mobile Optimization:**
  - Touch-optimized chat interface with appropriate button sizes
  - Proper keyboard handling and viewport adjustment
  - Fast loading and responsive interaction on mobile connections
  - Swipe-friendly message scrolling and navigation
  - No interference with mobile site navigation

### CMS Control & Management
- [ ] **Toggle Control System:**
  - Boolean toggle in Sanity CMS for global chat enable/disable
  - Real-time updates reflecting on website within 5 minutes
  - Default state: DISABLED at launch, ready for Week +1 activation
  - Emergency disable capability for high-volume situations
  - Toggle state visible in CMS with clear labeling

- [ ] **Configuration Options:**
  - Custom offline message editable through CMS
  - Business hours display configuration
  - Chat widget appearance settings (position, colors, size)
  - Response time expectations messaging
  - Emergency contact information fallback

- [ ] **Cache Management:**
  - Fast cache invalidation when toggle state changes
  - Real-time subscription to CMS setting changes
  - Graceful handling of network delays in setting updates
  - Fallback behavior if CMS settings unavailable
  - Version control for settings changes

### Performance & Technical Integration
- [ ] **Async Loading Implementation:**
  - Chat widget loads asynchronously after critical page content
  - No layout shift (CLS impact) when widget loads
  - Graceful fallback if Tawk.to service unavailable
  - Minimal JavaScript bundle impact (<20KB addition)
  - Progressive enhancement approach

- [ ] **Core Web Vitals Compliance:**
  - No negative impact on Largest Contentful Paint (LCP)
  - Cumulative Layout Shift (CLS) remains ≤0.1
  - Interaction to Next Paint (INP) unaffected by chat loading
  - Total Blocking Time (TBT) increase <50ms
  - First Input Delay (FID) maintained <100ms

- [ ] **Error Handling:**
  - Graceful degradation when Tawk.to fails to load
  - Clear fallback contact methods displayed
  - No JavaScript errors blocking other site functionality
  - Connection retry logic for unreliable networks
  - User feedback when chat temporarily unavailable

### Analytics & Conversion Tracking
- [ ] **Event Tracking Implementation:**
  - `chat_open` event fired when user initiates chat
  - `chat_message_sent` event for user engagement tracking
  - `chat_conversation_started` event for meaningful interactions
  - Page context captured (which page user started chat from)
  - UTM parameter preservation for marketing attribution

- [ ] **Conversion Integration:**
  - Chat interactions linked to FMS funnel analysis
  - Support conversation quality scoring
  - Lead generation attribution from chat conversations
  - Time-to-response measurement and reporting
  - Chat-to-conversion correlation tracking

- [ ] **Performance Monitoring:**
  - Chat widget load time measurement
  - Widget availability uptime tracking
  - User interaction success rate monitoring
  - Mobile vs desktop usage analytics
  - Business hours vs after-hours engagement patterns

### Support Team Preparation
- [ ] **Team Training Requirements:**
  - Tawk.to platform training for all support staff
  - Response time targets and quality standards
  - Escalation procedures for complex inquiries
  - Lead capture and follow-up protocols
  - Emergency procedures for high-volume situations

- [ ] **Workflow Documentation:**
  - Standard response templates for common questions
  - Escalation matrix for different inquiry types
  - Integration with existing CRM and follow-up systems
  - Quality assurance and conversation review procedures
  - Performance metrics and improvement processes

## 🔗 Dependencies

**Upstream Dependencies:**
- [ ] Sanity CMS infrastructure (CONTENT-001) operational
- [ ] Analytics framework (ANALYTICS-001) for event tracking
- [ ] Performance monitoring (ANALYTICS-003) for impact assessment
- [ ] Team training and support workflow establishment

**Technical Dependencies:**
- [ ] Tawk.to account setup with appropriate pricing plan
- [ ] Real-time CMS subscription system configuration
- [ ] Cache invalidation and deployment pipeline integration
- [ ] Mobile testing environment and device access

**Operational Dependencies:**
- [ ] Support team hiring and training completion
- [ ] Business hours and availability schedule definition
- [ ] Response time SLA and quality standards establishment
- [ ] Integration with existing customer service workflows

## 🧪 Testing Criteria

- [ ] **Functional Testing:**
  - Chat widget appears/disappears correctly with CMS toggle
  - All chat states (online, busy, offline) display properly
  - Message sending and receiving functional across devices
  - Offline message collection and routing working
  - Emergency disable function tested and verified

- [ ] **Performance Testing:**
  - Core Web Vitals scores maintained with chat enabled
  - Page load time impact measured and within limits (<200ms)
  - Mobile performance tested on slow 3G connections
  - Chat widget loading doesn't block critical rendering path
  - Memory usage optimized for long chat sessions

- [ ] **User Experience Testing:**
  - Chat interface intuitive for first-time users
  - Mobile typing and interaction smooth and responsive
  - Widget positioning doesn't interfere with site navigation
  - Conversation flow natural and helpful
  - Branding and messaging consistent with site tone

- [ ] **Integration Testing:**
  - CMS toggle changes reflect within 5-minute target
  - Analytics events fire correctly for all chat interactions
  - Chat conversations properly attributed to page context
  - Fallback contact methods accessible when chat offline
  - Support team notification and routing functional

## 📊 Definition of Done

- [ ] **Technical Implementation:**
  - Tawk.to chat widget integrated with custom branding
  - CMS toggle functional with real-time updates
  - Performance impact within acceptable limits
  - Analytics tracking implemented and verified

- [ ] **Quality Assurance:**
  - Cross-browser and cross-device testing completed
  - Accessibility compliance verified (keyboard navigation, screen readers)
  - Performance benchmarks met (Core Web Vitals maintained)
  - Error handling tested under various failure scenarios

- [ ] **Team Readiness:**
  - Support staff trained on Tawk.to platform and procedures
  - Response templates and escalation procedures documented
  - Business hours and availability schedule implemented
  - Quality assurance and performance review processes established

- [ ] **Launch Preparation:**
  - Chat disabled by default, ready for Week +1 activation
  - Emergency disable procedures tested and documented
  - Fallback contact methods verified and accessible
  - Stakeholder training completed on chat management

## ⚠️ Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Support team overwhelmed by volume | High | Medium | Week +1 activation, clear business hours, volume management |
| Chat widget performance impact | Medium | Low | Async loading, performance monitoring, fallback removal |
| Tawk.to service reliability issues | Medium | Low | Service status monitoring, fallback contact methods |
| Poor user experience on mobile | Medium | Low | Extensive mobile testing, touch optimization |
| CMS toggle response delays | Low | Medium | Real-time subscriptions, cache warming strategies |

## 📈 Success Metrics

**Technical Performance:**
- **Page Load Impact:** <200ms additional load time with chat enabled
- **Core Web Vitals:** No degradation in LCP, CLS, or INP scores
- **Widget Availability:** >99% uptime during business hours
- **Response Speed:** CMS toggle changes effective within 5 minutes

**User Experience:**
- **Chat Engagement:** >15% of visitors interact with chat widget
- **Conversation Quality:** >80% of chats result in helpful resolution
- **Mobile Usage:** >60% of chat interactions from mobile devices
- **User Satisfaction:** >4.0/5.0 average chat experience rating

**Support Efficiency:**
- **Response Time:** <5 minutes average during business hours
- **First Response:** <2 minutes acknowledgment time
- **Resolution Rate:** >80% issues resolved in single chat session
- **Team Efficiency:** <30 minutes average conversation duration

**Business Impact:**
- **Lead Generation:** >10% of chat conversations result in FMS bookings
- **Support Reduction:** >25% decrease in phone/email support volume
- **Conversion Assistance:** Chat users convert at >20% higher rate
- **Customer Confidence:** Improved sentiment in post-chat surveys

## 🛠️ Technical Implementation Notes

### Sanity CMS Schema Extension
```typescript
// sanity/schemas/site-settings.ts
export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'chatEnabled',
      title: 'Enable Chat Widget',
      type: 'boolean',
      description: 'Toggle chat widget visibility across the entire site',
      initialValue: false
    },
    {
      name: 'chatConfiguration',
      title: 'Chat Configuration',
      type: 'object',
      fields: [
        {
          name: 'welcomeMessage',
          title: 'Welcome Message',
          type: 'string',
          initialValue: 'Hi! How can we help you start your fitness journey?'
        },
        {
          name: 'offlineMessage',
          title: 'Offline Message',
          type: 'text',
          rows: 3,
          initialValue: 'We\'re currently offline. Leave us a message and we\'ll get back to you within 4 hours!'
        },
        {
          name: 'businessHours',
          title: 'Business Hours Display',
          type: 'string',
          initialValue: 'Monday-Friday 6AM-7PM, Saturday 8AM-2PM'
        },
        {
          name: 'emergencyContact',
          title: 'Emergency Contact Info',
          type: 'object',
          fields: [
            {
              name: 'phone',
              title: 'Phone Number',
              type: 'string'
            },
            {
              name: 'email',
              title: 'Email Address',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'chatAppearance',
      title: 'Chat Appearance',
      type: 'object',
      fields: [
        {
          name: 'position',
          title: 'Widget Position',
          type: 'string',
          options: {
            list: [
              { title: 'Bottom Right', value: 'bottom-right' },
              { title: 'Bottom Left', value: 'bottom-left' }
            ]
          },
          initialValue: 'bottom-right'
        },
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          description: 'Hex color code for chat widget branding'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global site configuration'
      };
    }
  }
};
```

### Chat Widget Component
```tsx
// components/ChatWidget.tsx
import { useEffect, useState } from 'react';
import { useSiteSettings } from '@/lib/sanity/hooks';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export function ChatWidget() {
  const { data: settings, loading } = useSiteSettings();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (loading || !settings) return;

    if (settings.chatEnabled && !isLoaded) {
      loadTawkToWidget();
    } else if (!settings.chatEnabled && isLoaded) {
      removeTawkToWidget();
    }
  }, [settings?.chatEnabled, loading, isLoaded]);

  const loadTawkToWidget = async () => {
    try {
      // Initialize Tawk_API
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      // Configure Tawk.to callbacks
      window.Tawk_API.onLoad = function() {
        console.log('Chat widget loaded successfully');
        setIsLoaded(true);
        setLoadError(false);
        
        // Track widget load
        if (typeof gtag !== 'undefined') {
          gtag('event', 'chat_widget_loaded', {
            event_category: 'support',
            page_type: getPageType()
          });
        }
      };

      window.Tawk_API.onChatStarted = function() {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'chat_conversation_started', {
            event_category: 'support',
            event_label: 'user_initiated',
            page_type: getPageType(),
            user_journey_stage: 'engagement'
          });
        }
      };

      window.Tawk_API.onChatMessageVisitor = function(message: string) {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'chat_message_sent', {
            event_category: 'support',
            event_label: 'visitor_message',
            message_length: message.length
          });
        }
      };

      window.Tawk_API.onChatEnded = function() {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'chat_conversation_ended', {
            event_category: 'support',
            event_label: 'conversation_complete'
          });
        }
      };

      window.Tawk_API.onOfflineSubmit = function(data: any) {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'chat_offline_message', {
            event_category: 'support',
            event_label: 'offline_contact',
            user_journey_stage: 'intent'
          });
        }
      };

      // Customize widget appearance
      if (settings.chatConfiguration?.welcomeMessage) {
        window.Tawk_API.setAttributes = {
          name: 'Gym Visitor',
          email: ''
        };
      }

      // Load Tawk.to script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://embed.tawk.to/${process.env.NEXT_PUBLIC_TAWK_SITE_ID}/${process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}`;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      
      script.onload = () => {
        console.log('Tawk.to script loaded');
      };
      
      script.onerror = () => {
        console.error('Failed to load Tawk.to script');
        setLoadError(true);
        showFallbackContact();
      };

      document.head.appendChild(script);

    } catch (error) {
      console.error('Error initializing chat widget:', error);
      setLoadError(true);
      showFallbackContact();
    }
  };

  const removeTawkToWidget = () => {
    try {
      // Remove Tawk.to widget
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }

      // Remove script
      const tawkScript = document.querySelector('script[src*="tawk.to"]');
      if (tawkScript) {
        tawkScript.remove();
      }

      // Clean up global variables
      delete window.Tawk_API;
      delete window.Tawk_LoadStart;

      setIsLoaded(false);
      setLoadError(false);

      console.log('Chat widget removed');
    } catch (error) {
      console.error('Error removing chat widget:', error);
    }
  };

  const showFallbackContact = () => {
    // Show fallback contact methods when chat fails
    const fallbackDiv = document.createElement('div');
    fallbackDiv.id = 'chat-fallback';
    fallbackDiv.innerHTML = `
      <div style="position: fixed; bottom: 20px; right: 20px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 8px; padding: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); max-width: 300px; z-index: 1000;">
        <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Chat Temporarily Unavailable</h4>
        <p style="margin: 0 0 12px 0; font-size: 12px; color: #6b7280;">Please contact us directly:</p>
        <div style="font-size: 12px;">
          <p style="margin: 4px 0;"><strong>Phone:</strong> ${settings?.chatConfiguration?.emergencyContact?.phone || '(03) XXXX XXXX'}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> ${settings?.chatConfiguration?.emergencyContact?.email || 'info@geelongmovement.com'}</p>
        </div>
        <button onclick="document.getElementById('chat-fallback').remove()" style="margin-top: 8px; background: #374151; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer;">Close</button>
      </div>
    `;
    
    // Remove any existing fallback
    const existing = document.getElementById('chat-fallback');
    if (existing) existing.remove();
    
    document.body.appendChild(fallbackDiv);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      const fallback = document.getElementById('chat-fallback');
      if (fallback) fallback.remove();
    }, 10000);
  };

  const getPageType = (): string => {
    const path = window.location.pathname;
    if (path === '/') return 'homepage';
    if (path === '/fms') return 'fms';
    if (path.startsWith('/hubs/')) return 'hub';
    if (path.startsWith('/articles/')) return 'article';
    if (path.startsWith('/portal/')) return 'portal';
    if (path === '/timetable') return 'timetable';
    return 'other';
  };

  // This component only manages script loading and doesn't render anything
  return null;
}
```

### Real-Time Settings Hook
```typescript
// lib/sanity/hooks.ts
import { useState, useEffect } from 'react';
import { sanityClient } from './client';

export function useSiteSettings() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial fetch
    const fetchSettings = async () => {
      try {
        const settings = await sanityClient.fetch(`
          *[_type == "siteSettings"][0] {
            chatEnabled,
            chatConfiguration,
            chatAppearance
          }
        `);
        setData(settings);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();

    // Real-time subscription
    const subscription = sanityClient
      .listen('*[_type == "siteSettings"]')
      .subscribe({
        next: (update) => {
          if (update.result) {
            setData(update.result);
            console.log('Site settings updated in real-time');
          }
        },
        error: (err) => {
          console.error('Settings subscription error:', err);
          setError('Real-time updates unavailable');
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  return { data, loading, error };
}
```

### Performance Monitoring
```typescript
// lib/monitoring/chat-performance.ts
export class ChatPerformanceMonitor {
  private startTime: number;
  private loadTime: number | null = null;

  constructor() {
    this.startTime = performance.now();
    this.monitorChatLoad();
  }

  private monitorChatLoad() {
    // Monitor for Tawk.to widget loading
    const checkForWidget = setInterval(() => {
      const tawkWidget = document.querySelector('[data-tawk]') || 
                         document.querySelector('#tawkchat-container');
      
      if (tawkWidget && !this.loadTime) {
        this.loadTime = performance.now() - this.startTime;
        clearInterval(checkForWidget);
        this.reportLoadTime();
      }
    }, 100);

    // Clear interval after 10 seconds to prevent infinite checking
    setTimeout(() => {
      clearInterval(checkForWidget);
      if (!this.loadTime) {
        console.warn('Chat widget failed to load within 10 seconds');
        this.reportLoadFailure();
      }
    }, 10000);
  }

  private reportLoadTime() {
    console.log(`Chat widget loaded in ${this.loadTime}ms`);
    
    // Report to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'chat_performance', {
        event_category: 'performance',
        event_label: 'widget_load_time',
        value: Math.round(this.loadTime!),
        custom_parameters: {
          load_time_ms: this.loadTime,
          page_type: this.getPageType()
        }
      });
    }

    // Alert if load time is too slow
    if (this.loadTime! > 3000) {
      console.warn(`Chat widget load time exceeded 3 seconds: ${this.loadTime}ms`);
    }
  }

  private reportLoadFailure() {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'chat_performance', {
        event_category: 'performance',
        event_label: 'widget_load_failure',
        page_type: this.getPageType()
      });
    }
  }

  private getPageType(): string {
    const path = window.location.pathname;
    if (path === '/') return 'homepage';
    if (path === '/fms') return 'fms';
    if (path.startsWith('/hubs/')) return 'hub';
    if (path.startsWith('/articles/')) return 'article';
    return 'other';
  }
}

// Initialize monitoring when chat is enabled
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Check if chat should be monitored
    const shouldMonitor = document.querySelector('[data-monitor-chat]');
    if (shouldMonitor) {
      new ChatPerformanceMonitor();
    }
  });
}
```

### Emergency Chat Disable API
```typescript
// pages/api/emergency/disable-chat.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '@/lib/sanity/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Verify authorization (add proper auth)
  const authToken = req.headers.authorization;
  if (!authToken || authToken !== `Bearer ${process.env.EMERGENCY_DISABLE_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Disable chat immediately
    await sanityClient
      .patch('siteSettings') // Assumes single settings document
      .set({ chatEnabled: false })
      .commit();

    // Trigger immediate cache invalidation
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?path=/settings&secret=${process.env.REVALIDATE_SECRET}`);

    console.log('Emergency chat disable executed');
    
    return res.status(200).json({ 
      message: 'Chat disabled successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Emergency disable failed:', error);
    return res.status(500).json({ 
      message: 'Failed to disable chat',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
```

## 📝 Content Requirements

### Chat Configuration Content
- [ ] **Welcome Messages:**
  - Standard: "Hi! How can we help you start your fitness journey?"
  - Busy periods: "Thanks for your interest! We're helping other members right now and will be with you shortly."
  - FMS page: "Interested in our movement assessment? Let's chat about how it can help you!"

- [ ] **Offline Messages:**
  - Standard hours: "We're currently offline. Leave us a message and we'll get back to you within 4 hours!"
  - After hours: "We're outside business hours. Leave a message and we'll respond first thing tomorrow!"
  - Weekends: "We're closed for the weekend. Leave a message and we'll get back to you Monday morning!"

### Response Templates
- [ ] **Opening Responses:**
  - "Thanks for your interest in Geelong Movement Co! How can I help you today?"
  - "Great to meet you! Are you looking to learn more about our programs?"
  - "Hi there! What questions can I answer about getting started with us?"

- [ ] **Common Questions:**
  - Programs: "Our FMS assessment is a great starting point - it helps us understand your movement and create a safe program for you."
  - Pricing: "I'd love to discuss our membership options with you. Can I get your contact details to follow up?"
  - Schedule: "Let me check our current class schedule for you. What times work best?"

### Business Hours & Availability
- [ ] **Schedule:**
  - Monday-Friday: 6:00 AM - 7:00 PM
  - Saturday: 8:00 AM - 2:00 PM  
  - Sunday: OFFLINE (messages only)
  - Public holidays: OFFLINE (messages only)

- [ ] **Response Commitments:**
  - Business hours: Response within 5 minutes
  - After hours: Response within 4 business hours
  - Weekends: Response by Monday 9 AM
  - Emergency: Phone contact available for urgent matters

---

**Story Owner:** Operations Manager  
**Technical Lead:** Frontend Developer  
**Support Lead:** Customer Service Manager  
**Created:** September 14, 2025  
**Status:** Ready for Development
