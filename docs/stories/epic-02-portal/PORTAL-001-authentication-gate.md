# User Story: PORTAL-001 - Authentication Gate Implementation

**Epic:** Epic 2: Member Portal (Light)  
**Story ID:** PORTAL-001  
**Priority:** High  
**Effort Estimate:** 3 story points  
**Sprint Target:** Week 2-3  
**Current Status:** 60% Complete - Portal UI implemented, authentication mock in place  

## 📋 User Story

**As a** current gym member  
**I want** simple and secure access to member-only content  
**So that** I can view programming and resources without hassle while ensuring only members have access  

## ✅ Acceptance Criteria

### Authentication Flow
- [x] **Portal UI Structure (COMPLETED):**
  - Portal page layout implemented ✅
  - Member content sections created ✅
  - Programming notes and movement library UI ✅
  - Mock authentication toggle functional ✅

- [ ] **Magic Link Authentication (REMAINING):**
  - Email input field with validation on portal homepage
  - "Send Magic Link" button with loading state
  - Email sent within 30 seconds with secure token
  - Link valid for 15 minutes with single-use policy
  - Automatic login when valid link clicked
  - Clear messaging about link expiration

- [ ] **Member Verification:**
  - Email address validated against approved member list
  - Non-members receive "Contact gym for access" message
  - Inactive members redirected to membership renewal page
  - Member status checked against current database
  - Support for temporary membership suspension

- [ ] **Session Management:**
  - Session expires after 7 days of inactivity
  - "Keep me logged in" option for trusted devices
  - Automatic session refresh on activity
  - Secure logout with complete session cleanup
  - Multiple device login support

### Security Implementation
- [ ] **Access Control:**
  - Zero unauthorized access to portal routes
  - Server-side session validation on all protected pages
  - CSRF protection on authentication endpoints
  - Rate limiting on magic link requests (max 3 per hour)
  - IP-based suspicious activity detection

- [ ] **Data Protection:**
  - Member email addresses encrypted in database
  - Secure token generation with crypto-random values
  - Session tokens regularly rotated
  - No sensitive data in browser localStorage
  - Audit logging for authentication events

### User Experience
- [ ] **Mobile-First Design:**
  - Touch-optimized login form on mobile devices
  - Responsive design across all screen sizes
  - Progressive enhancement for older browsers
  - Clear visual feedback for all interaction states
  - Accessibility compliance (WCAG AA)

- [ ] **Error Handling:**
  - Clear error messages for invalid email addresses
  - Helpful guidance for first-time users
  - Support contact information for access issues
  - Graceful handling of expired or invalid tokens
  - Network error recovery with retry options

### Analytics & Monitoring
- [ ] **Event Tracking:**
  - `portal_access_attempt` event for login requests
  - `portal_login_success` event for successful authentication
  - `portal_login_failure` event with failure reason
  - `portal_session_expire` event for timeout tracking
  - Member engagement timing and frequency

## 🔗 Dependencies

**Upstream Dependencies:**
- [x] Infrastructure and hosting setup (INFRA-001) ✅
- [x] Portal UI components and layout ✅
- [ ] Email service configuration for magic link delivery
- [ ] Member database or approved email list creation
- [ ] Authentication provider setup (NextAuth.js or similar)

**Technical Dependencies:**
- [ ] Secure session storage configuration
- [ ] Database schema for member authentication
- [ ] Email template design and implementation
- [ ] Analytics event tracking system

**Content Dependencies:**
- [ ] Authentication flow copy and messaging
- [ ] Error message content for various scenarios
- [ ] Email template content for magic links
- [ ] Help documentation for member access

## 🧪 Testing Criteria

- [ ] **Security Testing:**
  - Unauthorized access attempts blocked at all routes
  - Session hijacking attempts fail with proper validation
  - Rate limiting prevents brute force attacks
  - Token validation properly handles edge cases
  - OWASP security checklist compliance verified

- [ ] **Functional Testing:**
  - Magic link generation and delivery within 30 seconds
  - Link expiration enforced after 15 minutes
  - Member status validation against current database
  - Session management across browser tabs and devices
  - Logout functionality clears all session data

- [ ] **User Experience Testing:**
  - Mobile authentication flow smooth and intuitive
  - Error messages clear and actionable
  - First-time user onboarding seamless
  - Loading states and feedback appropriate
  - Accessibility testing with screen readers

- [ ] **Performance Testing:**
  - Authentication response time <2 seconds
  - Magic link delivery within 30 seconds consistently
  - Session validation adds <100ms to page loads
  - Database queries optimized for member lookup
  - Email service handles peak traffic loads

## 📊 Definition of Done

- [x] **Portal Foundation (COMPLETED):**
  - Portal UI fully functional with member content ✅
  - Component structure and layout finalized ✅
  - Mock authentication workflow operational ✅
  - Mobile responsiveness verified ✅

- [ ] **Authentication Implementation (REMAINING):**
  - Real magic link authentication functional
  - Member verification against database working
  - Session security audit completed and approved
  - Access control testing confirms zero unauthorized access

- [ ] **Technical Implementation:**
  - Authentication flow fully functional end-to-end
  - Member verification against current database working
  - Session management robust across devices and browsers
  - Error handling comprehensive for all failure scenarios

- [ ] **Analytics & Monitoring:**
  - All authentication events tracked in GA4
  - Member engagement baseline established
  - Authentication success/failure rates monitored
  - Session duration and frequency analytics active

- [ ] **User Experience:**
  - Mobile authentication tested across iOS/Android
  - Accessibility compliance verified (WCAG AA)
  - Error messaging tested and user-friendly
  - Support documentation complete for common issues

## ⚠️ Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Email delivery failures | High | Medium | Multiple email providers, delivery monitoring |
| Member list out of sync | Medium | Medium | Automated sync process, manual verification |
| Session security vulnerabilities | High | Low | Security audit, penetration testing |
| Poor mobile UX | Medium | Low | Mobile-first design, device testing |
| Authentication provider downtime | High | Low | Fallback authentication method |

## 📈 Success Metrics

**Authentication Performance:**
- **Login Success Rate:** >95% for valid members
- **Magic Link Delivery:** <30 seconds for 99% of requests
- **Session Security:** Zero unauthorized access incidents
- **Member Adoption:** >60% of active members login within first week

**User Experience:**
- **Mobile Conversion:** >90% mobile users complete authentication
- **Error Recovery:** >80% users recover from authentication errors
- **Support Tickets:** <5% members require authentication support
- **Session Duration:** >3 minutes average portal session

**Technical Performance:**
- **Authentication Speed:** <2 seconds average response time
- **System Reliability:** >99.9% authentication service uptime
- **Database Performance:** <100ms member lookup queries
- **Email Delivery:** >98% successful magic link delivery

## 🛠️ Technical Implementation Notes

### Authentication Architecture
```typescript
// lib/auth/config.ts
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';

export const authOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 15 * 60, // 15 minutes
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Verify user is current member
      const isMember = await verifyMemberStatus(user.email);
      return isMember;
    },
    async session({ session, token }) {
      // Add member-specific data to session
      session.user.memberStatus = await getMemberStatus(session.user.email);
      return session;
    },
  },
  pages: {
    signIn: '/portal/login',
    signOut: '/portal/logout',
    error: '/portal/error',
    verifyRequest: '/portal/verify',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
};
```

### Member Verification System
```typescript
// lib/auth/member-verification.ts
interface MemberRecord {
  email: string;
  firstName: string;
  lastName: string;
  membershipStatus: 'active' | 'suspended' | 'expired' | 'cancelled';
  membershipType: string;
  joinDate: Date;
  lastActivity?: Date;
}

export async function verifyMemberStatus(email: string): Promise<boolean> {
  try {
    // Check against member database or approved list
    const member = await getMemberByEmail(email);
    
    if (!member) {
      await logAuthEvent('member_not_found', { email });
      return false;
    }
    
    if (member.membershipStatus !== 'active') {
      await logAuthEvent('member_inactive', { 
        email, 
        status: member.membershipStatus 
      });
      return false;
    }
    
    // Update last portal access
    await updateMemberLastActivity(email);
    await logAuthEvent('member_verified', { email });
    
    return true;
  } catch (error) {
    await logAuthEvent('verification_error', { email, error: error.message });
    return false;
  }
}

export async function getMemberByEmail(email: string): Promise<MemberRecord | null> {
  // Implementation depends on member data source:
  // Option 1: Sanity CMS with member records
  // Option 2: Google Sheets with member list
  // Option 3: Gym management system API
  // Option 4: Manual JSON file (simplest for MVP)
  
  const members = await fetchMemberDatabase();
  return members.find(member => 
    member.email.toLowerCase() === email.toLowerCase()
  ) || null;
}
```

### Portal Route Protection
```tsx
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Additional checks for portal access
    const token = req.nextauth.token;
    
    if (req.nextUrl.pathname.startsWith('/portal')) {
      if (!token?.email) {
        return new Response('Unauthorized', { status: 401 });
      }
      
      // Check member status is still active
      if (token?.memberStatus !== 'active') {
        const url = req.nextUrl.clone();
        url.pathname = '/portal/membership-required';
        return NextResponse.redirect(url);
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith('/portal')) {
          return !!token?.email;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/portal/:path*']
};
```

### Magic Link Email Template
```html
<!-- emails/magic-link.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Access Your Member Portal</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="{{logoUrl}}" alt="{{gymName}}" style="max-width: 200px;">
    </div>
    
    <h1 style="color: #2563eb; text-align: center;">Access Your Member Portal</h1>
    
    <p>Hi {{firstName}},</p>
    
    <p>Click the button below to securely access your member portal. This link will expire in 15 minutes for your security.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{magicLink}}" 
         style="background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
        Access Member Portal
      </a>
    </div>
    
    <p style="font-size: 14px; color: #666;">
      If the button doesn't work, copy and paste this link into your browser:<br>
      <a href="{{magicLink}}">{{magicLink}}</a>
    </p>
    
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
      <p>This link was requested for {{email}}. If you didn't request this, please ignore this email.</p>
      <p>Questions? Contact us at {{supportEmail}} or {{supportPhone}}</p>
    </div>
  </div>
</body>
</html>
```

### Analytics Event Tracking
```typescript
// lib/analytics/portal-events.ts
export const trackPortalEvents = {
  accessAttempt: (email: string) => {
    gtag('event', 'portal_access_attempt', {
      event_category: 'authentication',
      event_label: 'magic_link_request',
      user_email_hash: hashEmail(email)
    });
  },
  
  loginSuccess: (memberData: any) => {
    gtag('event', 'portal_login_success', {
      event_category: 'authentication',
      event_label: 'member_authenticated',
      member_type: memberData.membershipType,
      days_since_join: calculateDaysSinceJoin(memberData.joinDate)
    });
  },
  
  loginFailure: (reason: string, email?: string) => {
    gtag('event', 'portal_login_failure', {
      event_category: 'authentication',
      event_label: reason,
      user_email_hash: email ? hashEmail(email) : 'unknown'
    });
  },
  
  sessionExpire: (sessionDuration: number) => {
    gtag('event', 'portal_session_expire', {
      event_category: 'engagement',
      event_label: 'session_timeout',
      value: Math.round(sessionDuration / 60) // minutes
    });
  }
};
```

## 📝 Content Requirements

### Authentication Flow Messaging
- [ ] **Login Page:**
  - Headline: "Member Portal Access"
  - Subheading: "Enter your email to access programming and resources"
  - Button: "Send Secure Link"
  - Help text: "Current members only - contact us if you need help"

- [ ] **Magic Link Sent:**
  - "Check your email for your secure access link"
  - "The link will expire in 15 minutes for security"
  - "Didn't receive it? Check spam folder or try again"

- [ ] **Error Messages:**
  - Invalid email: "Please enter a valid email address"
  - Non-member: "This email isn't associated with a current membership. Contact us for help."
  - Expired link: "This link has expired. Please request a new one."
  - System error: "Something went wrong. Please try again or contact support."

### Member Database Setup
- [ ] **Required Fields:**
  - Email address (primary identifier)
  - First name and last name
  - Membership status (active/suspended/expired)
  - Membership type and join date
  - Last portal access timestamp

- [ ] **Data Sources Options:**
  1. **Manual JSON File** (simplest for MVP)
  2. **Google Sheets** with member list
  3. **Sanity CMS** with member records
  4. **Gym Management System API** (future integration)

---

**Story Owner:** Product Manager  
**Technical Lead:** Full-Stack Developer  
**Security Reviewer:** DevOps Lead  
**Created:** September 14, 2025  
**Status:** Ready for Development
