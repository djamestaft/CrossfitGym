require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-26',
  useCdn: true, // Try with CDN first
  // token: process.env.SANITY_API_READ_TOKEN, // Remove token for now
})

async function testConnection() {
  try {
    console.log('🔍 Testing Sanity connection...')
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
    console.log('API Version:', process.env.NEXT_PUBLIC_SANITY_API_VERSION)

    const testQuery = `*[_type == "testimonial"][0...1] {
      _id,
      name,
      content,
      rating
    }`

    const result = await client.fetch(testQuery)
    console.log('✅ Connection successful!')
    console.log('📊 Found', result.length, 'testimonials:')
    result.forEach(t => {
      console.log(`   - ${t.name} (${t.rating}⭐)`)
    })
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    if (error.message.includes('401')) {
      console.log('🔑 This appears to be an authentication issue.')
    } else if (error.message.includes('404')) {
      console.log('📂 This appears to be a dataset/project issue.')
    }
  }
}

testConnection()
