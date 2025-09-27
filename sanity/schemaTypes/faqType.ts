import { defineArrayMember, defineField, defineType } from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'metadata', title: 'Metadata' },
  ],
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      group: 'content',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'blockContent',
      group: 'content',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Training', value: 'training' },
          { title: 'Nutrition', value: 'nutrition' },
          { title: 'Injury Prevention', value: 'injury-prevention' },
          { title: 'FMS Assessment', value: 'fms' },
          { title: 'Membership', value: 'membership' },
          { title: 'Equipment', value: 'equipment' },
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Priority Order',
      type: 'number',
      group: 'content',
      description: 'Lower numbers appear first. Default is 100.',
      initialValue: 100,
    }),
    defineField({
      name: 'tags',
      title: 'Search Tags',
      type: 'array',
      group: 'metadata',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Keywords for search and discovery',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'relatedQuestions',
      title: 'Related Questions',
      type: 'array',
      group: 'metadata',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'faq' }] })],
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      group: 'metadata',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'article' }] })],
    }),
    defineField({
      name: 'featured',
      title: 'Featured/Pinned',
      type: 'boolean',
      group: 'metadata',
      description: 'Pin this FAQ to the top of category listings',
      initialValue: false,
    }),
    defineField({
      name: 'usageAnalytics',
      title: 'Analytics Settings',
      type: 'object',
      group: 'metadata',
      fields: [
        defineField({
          name: 'trackViews',
          title: 'Track Views',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'trackHelpfulness',
          title: 'Track Helpfulness',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'metadata',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'metadata',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
      featured: 'featured',
      status: 'status',
    },
    prepare({ title, subtitle, featured, status }) {
      return {
        title: `${featured ? '📌 ' : ''}${title} ${status === 'published' ? '✅' : '📝'}`,
        subtitle: `Category: ${subtitle}`,
      }
    },
  },
})
