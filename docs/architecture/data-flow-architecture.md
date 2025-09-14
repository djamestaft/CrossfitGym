# 🔄 Data Flow Architecture

### Primary User Journeys & Data Flows

#### 1. FMS Conversion Funnel (Primary Revenue Driver)

```mermaid
graph TD
    A[Visitor Lands] --> B[FMS Landing Page]
    B --> C[Proof & Trust Components]
    C --> D[Two-Step FMS Form]
    D --> E[Validation & Bot Protection]
    E --> F[Success Page]
    F --> G[Admin Notification]
    G --> H[Lead Storage]

    B --> I[GA4: fms_start]
    D --> J[GA4: fms_submit]
    F --> K[Email Alert + CMS Storage]
```

#### 2. Member Portal Engagement Flow

```mermaid
graph TD
    A[Member Access] --> B[Magic Link Auth]
    B --> C[Portal Dashboard]
    C --> D[Programming Notes]
    C --> E[Movement Library]
    C --> F[Member FAQs]

    B --> G[GA4: portal_login]
    E --> H[GA4: video_play]
    D --> I[GA4: post_view]
```

#### 3. Content Discovery & SEO Flow

```mermaid
graph TD
    A[Search Query] --> B[Hub/Article Landing]
    B --> C[Content Consumption]
    C --> D[Internal Link Navigation]
    D --> E[FMS CTA Conversion]

    B --> F[Schema.org Markup]
    C --> G[Article/FAQ Schema]
    E --> H[LocalBusiness Schema]
```

---
