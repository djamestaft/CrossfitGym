import { defineArrayMember, defineField, defineType } from 'sanity'

export const coachBioType = defineType({
  name: 'coachBio',
  title: 'Coach Bio',
  type: 'document',
  groups: [
    { name: 'personal', title: 'Personal Info' },
    { name: 'professional', title: 'Professional' },
    { name: 'availability', title: 'Availability' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      group: 'personal',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Professional Photo',
      type: 'image',
      group: 'personal',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: rule => rule.required(),
        }),
      ],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Personal Story & Philosophy',
      type: 'blockContent',
      group: 'personal',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties & Focus Areas',
      type: 'array',
      group: 'professional',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'Strength Training', value: 'strength' },
          { title: 'Olympic Lifting', value: 'olympic-lifting' },
          { title: 'Mobility & Flexibility', value: 'mobility' },
          { title: 'Rehabilitation', value: 'rehab' },
          { title: 'Nutrition Coaching', value: 'nutrition' },
          { title: 'Endurance Training', value: 'endurance' },
          { title: 'Youth Training', value: 'youth' },
          { title: 'Senior Fitness', value: 'senior' },
        ],
      },
    }),
    defineField({
      name: 'qualifications',
      title: 'Qualifications & Certifications',
      type: 'array',
      group: 'professional',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'certification',
              title: 'Certification Name',
              type: 'string',
            }),
            defineField({
              name: 'issuer',
              title: 'Issuing Organization',
              type: 'string',
            }),
            defineField({
              name: 'year',
              title: 'Year Obtained',
              type: 'number',
            }),
            defineField({
              name: 'expires',
              title: 'Expiration Year',
              type: 'number',
            }),
          ],
          preview: {
            select: {
              certification: 'certification',
              issuer: 'issuer',
            },
            prepare({ certification, issuer }) {
              return {
                title: certification,
                subtitle: issuer,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'experience',
      title: 'Years of Experience',
      type: 'number',
      group: 'professional',
      validation: rule => rule.min(0).max(50),
    }),
    defineField({
      name: 'achievements',
      title: 'Professional Achievements',
      type: 'array',
      group: 'professional',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'continuingEducation',
      title: 'Continuing Education',
      type: 'blockContent',
      group: 'professional',
      description: 'Ongoing professional development and learning',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      group: 'personal',
      fields: [
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'contactPreferences',
      title: 'Contact Preferences',
      type: 'object',
      group: 'availability',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'email',
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
        }),
        defineField({
          name: 'preferredContact',
          title: 'Preferred Contact Method',
          type: 'string',
          options: {
            list: [
              { title: 'Email', value: 'email' },
              { title: 'Phone', value: 'phone' },
              { title: 'In Person', value: 'in-person' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'availability',
      title: 'Class Focus Areas',
      type: 'array',
      group: 'availability',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'Beginner Classes', value: 'beginner' },
          { title: 'Advanced Training', value: 'advanced' },
          { title: 'Personal Training', value: 'personal-training' },
          { title: 'Group Classes', value: 'group' },
          { title: 'Specialty Workshops', value: 'workshops' },
          { title: 'Rehab Sessions', value: 'rehab' },
        ],
      },
    }),
    defineField({
      name: 'active',
      title: 'Active Status',
      type: 'boolean',
      group: 'availability',
      description: 'Is this coach currently active?',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'availability',
      description: 'Order in which coaches appear on the site',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'experience',
      media: 'photo',
      active: 'active',
    },
    prepare({ title, subtitle, media, active }) {
      return {
        title: `${title} ${active ? '✅' : '❌'}`,
        subtitle: subtitle ? `${subtitle} years experience` : 'Coach',
        media,
      }
    },
  },
})
