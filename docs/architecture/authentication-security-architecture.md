# 🔐 Authentication & Security Architecture

### NextAuth.js Configuration with Magic Links
```typescript
// lib/auth.ts
export const authConfig: NextAuthConfig = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      // Verify member email against CMS member list
      const isMember = await verifyMemberEmail(user.email);
      return isMember;
    },
    
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          isMember: true
        }
      };
    }
  },
  
  pages: {
    signIn: '/portal/signin',
    verifyRequest: '/portal/verify',
  }
};
```

### Security Measures
```typescript
// Security implementation layers
export const securityConfig = {
  // Form protection
  formSecurity: {
    turnstile: process.env.TURNSTILE_SECRET_KEY,
    rateLimit: '5 submissions per 15 minutes',
    validation: 'server-side + client-side',
    sanitization: 'DOMPurify + server validation'
  },
  
  // Content security
  contentSecurity: {
    headers: 'Strict CSP headers',
    sanity: 'Read-only tokens for public content',
    preview: 'Authenticated preview mode only'
  },
  
  // Infrastructure security  
  infrastructure: {
    vercel: 'Automatic HTTPS + edge protection',
    environment: 'Production secrets via Vercel env vars',
    monitoring: 'Error tracking + performance monitoring'
  }
};
```

---
