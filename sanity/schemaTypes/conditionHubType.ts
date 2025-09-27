import { defineArrayMember, defineField, defineType } from 'sanity'

export const conditionHubType = defineType({
  name: 'conditionHub',
  title: 'Condition Hub',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Hub Title',
      type: 'string',
      group: 'content',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'condition',
      title: 'Condition Name',
      type: 'string',
      group: 'content',
      description: 'e.g., "Shoulder Pain", "Lower Back Issues"',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'condition' },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'heroContent',
      title: 'Hero Section',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'contentSection',
          title: 'Content Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'type',
              title: 'Section Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Understanding the Issue', value: 'understanding' },
                  { title: 'What TO Do', value: 'dos' },
                  { title: 'What NOT to Do', value: 'donts' },
                  { title: 'Movement Modifications', value: 'modifications' },
                  { title: 'Case Studies', value: 'casestudies' },
                  { title: 'Expert Tips', value: 'tips' },
                ],
              },
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'blockContent',
            }),
            defineField({
              name: 'calloutBox',
              title: 'Callout Box',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Callout Title',
                  type: 'string',
                }),
                defineField({
                  name: 'content',
                  title: 'Callout Content',
                  type: 'text',
                }),
                defineField({
                  name: 'style',
                  title: 'Style',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Info', value: 'info' },
                      { title: 'Warning', value: 'warning' },
                      { title: 'Success', value: 'success' },
                      { title: 'Tip', value: 'tip' },
                    ],
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              type: 'type',
            },
            prepare({ title, type }) {
              return {
                title: title || 'Untitled Section',
                subtitle: type,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Section',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'hubFaq',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'blockContent',
            }),
          ],
          preview: {
            select: {
              title: 'question',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'reference', to: { type: 'article' } })],
    }),
    defineField({
      name: 'ctaSettings',
      title: 'Call-to-Action Settings',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
          initialValue: 'Book Your FMS Assessment',
        }),
        defineField({
          name: 'ctaDescription',
          title: 'CTA Description',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      validation: rule => rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      validation: rule => rule.max(160),
    }),
    defineField({
      name: 'progressTracking',
      title: 'Progress Tracking',
      type: 'object',
      group: 'settings',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Progress Tracking',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'completionCriteria',
          title: 'Completion Criteria',
          type: 'string',
          description: 'What constitutes completion of this hub?',
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'settings',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'In Review', value: 'review' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'condition',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return {
        title: `${title} ${status === 'published' ? '✅' : status === 'review' ? '👀' : '📝'}`,
        subtitle,
      }
    },
  },
})
