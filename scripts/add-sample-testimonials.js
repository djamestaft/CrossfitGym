const { client } = require('../sanity/lib/client')

const sampleTestimonials = [
  {
    _type: 'testimonial',
    name: 'Sarah Mitchell',
    content:
      'The FMS assessment completely changed how I approach exercise. I was struggling with chronic shoulder pain from years of desk work. The team identified specific movement patterns that were causing my issues and created a personalized program that actually worked.',
    rating: 5,
    role: 'Office Manager, Geelong West',
    featured: true,
  },
  {
    _type: 'testimonial',
    name: 'Mark Thompson',
    content:
      'After my back injury, I thought my running days were over. The GMC team not only got me back to running but helped me understand how to prevent future injuries. Their approach is professional, evidence-based, and genuinely caring.',
    rating: 5,
    role: 'Marathon Runner, Newtown',
    featured: true,
  },
  {
    _type: 'testimonial',
    name: 'Jenny Liu',
    content:
      'Pregnancy and childbirth left me with significant core weakness and back pain. The movement plan they created was perfect for my situation as a new mum - realistic, effective, and something I could do at home with my baby nearby.',
    rating: 5,
    role: 'New Mother, Belmont',
    featured: true,
  },
  {
    _type: 'testimonial',
    name: 'David Chen',
    content:
      'Working in construction, my body takes a beating. The team taught me how to move properly and gave me exercises I could do on-site during breaks. My chronic hip pain is gone and I feel stronger than I have in years.',
    rating: 5,
    role: 'Tradesman, Highton',
    featured: false,
  },
  {
    _type: 'testimonial',
    name: 'Lisa Anderson',
    content:
      "As a teacher, I'm on my feet all day and was developing knee problems. The FMS assessment revealed issues with my movement patterns that I never would have noticed. The corrective exercises have made such a difference.",
    rating: 5,
    role: 'Teacher, Torquay',
    featured: false,
  },
  {
    _type: 'testimonial',
    name: 'Robert Williams',
    content:
      "At 68, I thought stiffness and pain were just part of aging. The GMC team showed me that wasn't true. Their gentle approach and clear explanations helped me regain mobility I thought I'd lost forever. I'm now more active than I've been in decades.",
    rating: 5,
    role: 'Retiree, Ocean Grove',
    featured: false,
  },
]

async function addSampleTestimonials() {
  try {
    console.log('Adding sample testimonials to Sanity...')

    for (const testimonial of sampleTestimonials) {
      const result = await client.create(testimonial)
      console.log(`✅ Created testimonial: ${result.name} (${result._id})`)
    }

    console.log('🎉 All sample testimonials have been added successfully!')
    console.log('Visit your Sanity Studio at /studio to see them.')
    console.log('Then visit /about-new to see them displayed on your website.')
  } catch (error) {
    console.error('❌ Error adding testimonials:', error.message)
  }
}

addSampleTestimonials()
