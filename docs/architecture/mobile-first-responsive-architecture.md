# 📱 Mobile-First & Responsive Architecture

### Responsive Design Strategy

```typescript
// Tailwind breakpoint strategy aligned with user behavior
export const breakpointStrategy = {
  mobile: {
    range: '320px - 767px',
    priority: 'Primary development target',
    features: [
      'Touch-optimized forms',
      'Thumb-friendly CTAs',
      'Simplified navigation',
    ],
  },

  tablet: {
    range: '768px - 1023px',
    priority: 'Secondary optimization',
    features: ['Expanded content layout', 'Side-by-side components'],
  },

  desktop: {
    range: '1024px+',
    priority: 'Enhancement layer',
    features: ['Multi-column layouts', 'Hover states', 'Advanced interactions'],
  },
}

// Component responsive patterns
export const responsivePatterns = {
  navigation: 'Mobile: Hamburger → Tablet: Horizontal → Desktop: Mega menu',
  fmsForm:
    'Mobile: Single column → Tablet: Optimized spacing → Desktop: Side-by-side',
  timetable:
    'Mobile: Stacked cards → Tablet: 2-column grid → Desktop: Full grid',
  testimonials: 'Mobile: Single slide → Tablet: 2 slides → Desktop: 3 slides',
}
```

---
