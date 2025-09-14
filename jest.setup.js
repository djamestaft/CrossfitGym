import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock environment variables
process.env.NODE_ENV = 'test'

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data, init) => {
      const response = {
        status: init?.status || 200,
        json: () => Promise.resolve(data),
        headers: new Headers(init?.headers),
      }
      return response
    },
  },
}))

// Mock Next.js server components and Request/Response
global.Request = class Request {
  constructor(input, init) {
    this.url = typeof input === 'string' ? input : input.url
    this.method = init?.method || 'GET'
    this.headers = new Headers(init?.headers)
    this.body = init?.body
  }
}

global.Response = class Response {
  constructor(body, init) {
    this.body = body
    this.status = init?.status || 200
    this.statusText = init?.statusText || 'OK'
    this.headers = new Headers(init?.headers)
  }
  
  json() {
    return Promise.resolve(JSON.parse(this.body))
  }
  
  text() {
    return Promise.resolve(this.body)
  }
}

global.Headers = class Headers {
  constructor(init) {
    this.headers = new Map()
    if (init) {
      for (const [key, value] of Object.entries(init)) {
        this.headers.set(key.toLowerCase(), value)
      }
    }
  }
  
  set(name, value) {
    this.headers.set(name.toLowerCase(), value)
  }
  
  get(name) {
    return this.headers.get(name.toLowerCase())
  }
  
  has(name) {
    return this.headers.has(name.toLowerCase())
  }
}
