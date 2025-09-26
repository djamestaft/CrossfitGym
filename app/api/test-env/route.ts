import { NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NODE_ENV: process.env.NODE_ENV,
  }

  console.log('Environment variables check:', envVars)

  return NextResponse.json({
    message: 'Environment variables check',
    envVars,
    hasAllVars: !!(
      envVars.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      envVars.NEXT_PUBLIC_SANITY_DATASET
    ),
  })
}
