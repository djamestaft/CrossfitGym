import { GET } from '../api/health/route'
import { NextRequest } from 'next/server'

describe('/api/health', () => {
  it('should return healthy status', async () => {
    const request = new NextRequest('http://localhost:3000/api/health')
    const response = await GET()
    
    expect(response.status).toBe(200)
    
    const data = await response.json()
    expect(data).toHaveProperty('status', 'healthy')
    expect(data).toHaveProperty('timestamp')
    expect(data).toHaveProperty('version')
    expect(data).toHaveProperty('environment')
    expect(data).toHaveProperty('uptime')
  })

  it('should return ISO timestamp', async () => {
    const response = await GET()
    const data = await response.json()
    
    // Verify timestamp is valid ISO string
    const timestamp = new Date(data.timestamp)
    expect(timestamp.toISOString()).toBe(data.timestamp)
  })

  it('should include environment information', async () => {
    const response = await GET()
    const data = await response.json()
    
    expect(typeof data.environment).toBe('string')
    expect(typeof data.uptime).toBe('number')
    expect(data.uptime).toBeGreaterThanOrEqual(0)
  })
})

