# Epic 8: Chat Integration

**Epic ID:** EPIC-08  
**Priority:** Medium  
**Business Value:** User support without launch overload  
**Technical Complexity:** Low  
**Effort Estimate:** 3-4 story points  
**Sprint Target:** Week 3-4  

## 🎯 Epic Goal

Provide real-time user support capability while maintaining operational control and preventing launch week support overload.

**Success Metrics:**
- Chat available and functional by Week +1 after launch
- No performance impact on site loading
- Support team can handle chat volume effectively
- Positive user feedback on support experience

## 👥 User Stories

### Story CHAT-001: Tawk.to Integration with CMS Toggle
**As a** potential member with questions  
**I want** immediate access to expert help  
**So that** I can get answers and move forward with confidence  

**As a** operations team member  
**I need** control over chat availability  
**So that** I can manage support capacity and avoid being overwhelmed  

**Acceptance Criteria:**
- [ ] **Tawk.to Integration** with seamless user experience:
  - Chat widget loads only when enabled via CMS
  - Mobile-optimized chat interface
  - Professional branding consistent with site design
  - Offline message handling when team unavailable
  - Chat history and context preservation
- [ ] **CMS Toggle Control:**
  - Boolean toggle in Sanity CMS for chat on/off
  - Toggle changes reflect on site within 5 minutes
  - Default state: OFF at launch, ON at Week +1
  - Emergency disable capability for high-volume situations
- [ ] **Performance Optimization:**
  - No layout shift when chat widget loads
  - Async loading to prevent blocking page render
  - Minimal impact on Core Web Vitals scores
  - Graceful fallback if Tawk.to service unavailable
- [ ] **Analytics Integration:**
  - `chat_open` event fired when chat initiated
  - Chat engagement metrics tracked
  - Integration with overall conversion funnel analysis

**Dependencies:**
- Tawk.to account setup and configuration
- Sanity CMS toggle field implementation
- Team training on chat management
- Support workflow and response guidelines

**Definition of Done:**
- [ ] Chat widget functional and properly styled
- [ ] CMS toggle working with fast cache invalidation
- [ ] No negative impact on page performance metrics
- [ ] Analytics events firing correctly
- [ ] Team trained and ready for chat support

## 🔗 Epic Dependencies

**Upstream Dependencies:**
- Sanity CMS infrastructure for toggle control
- Team training and support workflow documentation
- Analytics framework for tracking chat interactions

**Downstream Dependencies:**
- Chat data feeds into user support optimization
- Chat conversations may identify FAQ content gaps
- Support quality affects overall brand experience

## 🎨 Integration Design

### Chat Widget Placement Strategy
```
Desktop Layout:
┌─────────────────────────────────────────────┐
│                                             │
│                Page Content                 │
│                                             │
│                                          ┌──┴───┐
│                                          │ Chat │
│                                          │ 💬   │
└──────────────────────────────────────────┴──────┘

Mobile Layout:
┌─────────────────────────────┐
│                             │
│        Page Content         │
│                             │
│                         ┌───┴───┐
│                         │ Chat  │
│                         │  💬   │
└─────────────────────────┴───────┘
```

### Chat Widget States
```
Widget States:
1. Hidden (CMS toggle OFF)
2. Available (Green dot, "Chat with us")
3. Busy (Yellow dot, "We'll respond soon")
4. Offline (Red dot, "Leave a message")
5. Chatting (Active conversation UI)
```

## 🔧 Technical Implementation

### CMS Toggle Schema
```javascript
// sanity/schemas/siteSettings.js
export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      name: 'chatEnabled',
      type: 'boolean',
      title: 'Enable Chat Widget',
      description: 'Toggle chat widget on/off across the site',
      initialValue: false
    },
    {
      name: 'chatOfflineMessage',
      type: 'text',
      title: 'Chat Offline Message',
      description: 'Message shown when chat is offline',
      initialValue: 'We\'re currently offline. Please leave a message and we\'ll get back to you!'
    },
    {
      name: 'chatBusinessHours',
      type: 'text',
      title: 'Chat Business Hours',
      description: 'Display business hours for chat support',
      initialValue: 'Monday-Friday 6AM-7PM, Saturday 8AM-2PM'
    }
  ]
};
```

### Chat Component Implementation
```javascript
// components/ChatWidget.jsx
import { useState, useEffect } from 'react';
import { useSettings } from '@/lib/sanity';

export default function ChatWidget() {
  const { data: settings } = useSettings();
  const [chatLoaded, setChatLoaded] = useState(false);

  useEffect(() => {
    if (settings?.chatEnabled && !chatLoaded) {
      loadTawkTo();
      setChatLoaded(true);
    } else if (!settings?.chatEnabled && chatLoaded) {
      removeTawkTo();
      setChatLoaded(false);
    }
  }, [settings?.chatEnabled]);

  const loadTawkTo = () => {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    
    // Track chat opens
    Tawk_API.onChatStarted = function() {
      gtag('event', 'chat_open', {
        page_type: window.location.pathname.split('/')[1] || 'home'
      });
    };

    (function() {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = `https://embed.tawk.to/${process.env.NEXT_PUBLIC_TAWK_SITE_ID}/default`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  };

  const removeTawkTo = () => {
    // Remove Tawk.to widget
    const tawkScript = document.querySelector('[src*="tawk.to"]');
    if (tawkScript) {
      tawkScript.remove();
    }
    
    const tawkWidget = document.getElementById('tawkChatWidget');
    if (tawkWidget) {
      tawkWidget.remove();
    }
  };

  return null; // This component only manages script loading
}
```

### Cache Invalidation Strategy
```javascript
// lib/sanity.js
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // Disable CDN for real-time settings
  apiVersion: '2023-01-01'
});

// Real-time settings updates
export function useSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const subscription = client
      .listen('*[_type == "siteSettings"]')
      .subscribe((update) => {
        if (update.result) {
          setSettings(update.result);
          // Force revalidation of static props
          fetch('/api/revalidate?path=/settings', { method: 'POST' });
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  return { data: settings };
}
```

## 📊 Success Criteria

### Launch Week Targets
- Chat toggle functional and tested
- Widget loads without performance impact
- Team trained and ready for Week +1 activation
- Support workflows documented and rehearsed

### Week +1 Activation Goals
- Chat enabled smoothly without issues
- Response time averages <5 minutes during business hours
- No support team overwhelm or burnout
- Positive user feedback on chat experience

### Ongoing Performance Metrics
- **Response Time:** Average <5 minutes during business hours
- **Resolution Rate:** >80% of chats resolved in first interaction
- **User Satisfaction:** >4.0/5.0 chat rating
- **Team Efficiency:** <30 minutes average chat duration

## 🚨 Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Support team overwhelmed | Poor customer experience | Gradual rollout, clear business hours, offline handling |
| Chat widget performance impact | Site speed degradation | Async loading, performance monitoring, fallback removal |
| High volume during launch | Team burnout | Week +1 activation, not launch week |
| Technical integration issues | Chat non-functional | Thorough testing, fallback contact methods |

## 🎯 Support Strategy

### Business Hours & Availability
```
Chat Support Schedule:
Monday-Friday: 6:00 AM - 7:00 PM
Saturday: 8:00 AM - 2:00 PM
Sunday: OFFLINE (messages only)

Public Holidays: OFFLINE (messages only)
After Hours: Offline message with response commitment
```

### Response Time Targets
- **Immediate:** Acknowledgment within 2 minutes
- **Business Hours:** Full response within 5 minutes
- **After Hours:** Response within 4 business hours
- **Complex Issues:** May require follow-up call/email

### Chat Escalation Workflow
```
Chat Escalation Process:
1. Level 1: General inquiries (staff/reception)
2. Level 2: Technical/program questions (coaches)
3. Level 3: Sales/pricing inquiries (manager/owner)
4. Level 4: Complex issues → phone/email handoff
```

## 📱 Mobile Optimization

### Mobile Chat Experience
- **Responsive Design:** Chat widget adapts to screen size
- **Touch Optimization:** Easy typing and navigation
- **Keyboard Handling:** Proper viewport adjustment
- **Offline Capability:** Message queuing when connection poor

### Performance Considerations
```javascript
// Mobile-specific optimizations
const mobileOptimizations = {
  lazyLoad: 'Load chat only when user scrolls 50%',
  touchTargets: 'Minimum 44px touch targets',
  keyboardResize: 'Handle virtual keyboard appearance',
  connectionAware: 'Reduce functionality on slow connections'
};
```

## 🔧 Operational Procedures

### Daily Chat Management
1. **Morning Setup:** Check chat status, review overnight messages
2. **Response Monitoring:** Maintain response time targets
3. **Escalation Handling:** Route complex inquiries appropriately
4. **End of Day:** Set offline status, review conversation summaries

### Weekly Chat Review
1. **Metrics Analysis:** Response times, resolution rates, satisfaction
2. **Content Gaps:** Identify common questions for FAQ/content creation
3. **Team Feedback:** Support staff input on improvements
4. **Process Optimization:** Refine workflows based on learnings

### Emergency Procedures
```javascript
// Emergency chat disable
// In Sanity CMS: Set chatEnabled = false
// Result: Widget removed from all pages within 5 minutes
// Backup: Contact form and phone remain available

// High volume handling
const volumeManagement = {
  level1: 'Extended response times message',
  level2: 'Queue position indicator',
  level3: 'Temporary chat disable with callback form',
  level4: 'Emergency contact information display'
};
```

## 📝 Content Strategy

### Quick Response Templates
```
Common Chat Responses:
1. "Thanks for your interest! How can I help you today?"
2. "Our FMS assessment is a great starting point. Would you like to learn more?"
3. "I can connect you with one of our coaches for detailed program questions."
4. "Let me check our current class schedule for you."
5. "I'll need to get back to you with pricing details. Can I have your contact info?"
```

### FAQ Integration
- Link common chat questions to comprehensive FAQ answers
- Use chat conversations to identify FAQ content gaps
- Provide quick links to relevant articles and resources
- Encourage self-service while maintaining personal touch

### Lead Capture Strategy
```javascript
// Chat to lead conversion
const chatLeadCapture = {
  timing: 'After helpful conversation, before resolution',
  approach: 'Natural transition to next steps',
  options: ['FMS assessment', 'trial class', 'facility tour'],
  followUp: 'Email contact within 24 hours',
  tracking: 'Chat-originated leads tagged in CRM'
};
```

**Epic Owner:** Operations Manager  
**Tech Lead:** Development Lead  
**Support Lead:** Reception/Customer Service  
**Last Updated:** September 13, 2025
