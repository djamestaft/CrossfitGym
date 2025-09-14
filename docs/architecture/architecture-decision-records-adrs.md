# 📋 Architecture Decision Records (ADRs)

### ADR-001: Next.js App Router over Pages Router

**Decision**: Use Next.js 14 App Router for new project
**Rationale**: Better TypeScript integration, improved performance, built-in layouts, simplified data fetching
**Consequences**: Modern development experience, better Core Web Vitals, learning curve for team

### ADR-002: Sanity CMS over Headless Alternatives

**Decision**: Use Sanity CMS for content management
**Rationale**: Excellent Next.js integration, flexible schema design, real-time collaboration, visual editing
**Consequences**: Content team efficiency, developer experience, subscription cost consideration

### ADR-003: NextAuth.js Magic Links over Complex Auth

**Decision**: Implement magic link authentication for member portal
**Rationale**: Simple user experience, no password management, secure, aligns with MVP scope
**Consequences**: Reduced friction for members, email dependency, simpler implementation

### ADR-004: Vercel Hosting over Self-Managed Infrastructure

**Decision**: Use Vercel for hosting and deployment
**Rationale**: Seamless Next.js integration, global CDN, automatic scaling, minimal ops overhead
**Consequences**: Excellent performance, simplified deployment, vendor lock-in consideration

---
