// Email service using Resend for FMS notifications
// This will be implemented when RESEND_API_KEY is configured

interface FMSSubmission {
  id: string
  name: string
  email: string
  phone: string
  preferredTime: string
  goals: string
  injuryFlags: string[]
  experience: string
  submittedAt: string
  referralSource?: string
  utmSource?: string
}

export async function sendFMSNotificationEmails(submission: FMSSubmission) {
  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn(
        'RESEND_API_KEY not configured - email notifications disabled'
      )
      return { success: false, reason: 'Email service not configured' }
    }

    // Dynamic import of Resend to avoid errors when not configured
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@geelongmovement.com'
    const fromEmail = process.env.FROM_EMAIL || 'noreply@geelongmovement.com'

    // Send notification to admin
    const adminEmailResult = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New FMS Assessment Request - ${submission.name}`,
      html: generateAdminEmailTemplate(submission),
    })

    // Send confirmation to customer
    const customerEmailResult = await resend.emails.send({
      from: fromEmail,
      to: submission.email,
      subject: 'Your FMS Assessment Request - Geelong Movement Co',
      html: generateCustomerEmailTemplate(submission),
    })

    console.log('Email notifications sent:', {
      submissionId: submission.id,
      adminEmailId: adminEmailResult.data?.id,
      customerEmailId: customerEmailResult.data?.id,
    })

    return {
      success: true,
      adminEmailId: adminEmailResult.data?.id,
      customerEmailId: customerEmailResult.data?.id,
    }
  } catch (error) {
    console.error('Email sending failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown email error',
    }
  }
}

function generateAdminEmailTemplate(submission: FMSSubmission): string {
  const injuryInfo =
    submission.injuryFlags.length > 0
      ? submission.injuryFlags.join(', ')
      : 'None reported'

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New FMS Assessment Request</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-left: 10px; }
            .priority { background-color: #fff3cd; padding: 10px; border-radius: 4px; border-left: 4px solid #ffc107; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>🎯 New FMS Assessment Request</h2>
                <p><strong>Submission ID:</strong> ${submission.id}</p>
                <p><strong>Submitted:</strong> ${new Date(submission.submittedAt).toLocaleString('en-AU')}</p>
            </div>

            <h3>Contact Information</h3>
            <div class="field">
                <span class="label">Name:</span>
                <span class="value">${submission.name}</span>
            </div>
            <div class="field">
                <span class="label">Email:</span>
                <span class="value">${submission.email}</span>
            </div>
            <div class="field">
                <span class="label">Phone:</span>
                <span class="value">${submission.phone}</span>
            </div>
            <div class="field">
                <span class="label">Preferred Time:</span>
                <span class="value">${submission.preferredTime}</span>
            </div>

            <h3>Assessment Details</h3>
            <div class="field">
                <span class="label">Experience Level:</span>
                <span class="value">${submission.experience}</span>
            </div>
            <div class="field">
                <span class="label">Goals:</span>
                <div class="value">${submission.goals}</div>
            </div>
            <div class="field">
                <span class="label">Health Flags:</span>
                <span class="value">${injuryInfo}</span>
            </div>

            ${
              submission.injuryFlags.some(flag => flag !== 'None of the above')
                ? `
            <div class="priority">
                <strong>⚠️ Health Considerations:</strong> This client has indicated injury/health flags. Please review carefully during scheduling.
            </div>
            `
                : ''
            }

            ${
              submission.referralSource
                ? `
            <h3>Marketing Information</h3>
            <div class="field">
                <span class="label">Referral Source:</span>
                <span class="value">${submission.referralSource}</span>
            </div>
            ${
              submission.utmSource
                ? `
            <div class="field">
                <span class="label">UTM Source:</span>
                <span class="value">${submission.utmSource}</span>
            </div>
            `
                : ''
            }
            `
                : ''
            }

            <div class="footer">
                <p><strong>Next Steps:</strong></p>
                <ul>
                    <li>Contact client within 1 business day</li>
                    <li>Schedule 45-minute FMS assessment</li>
                    <li>Send appointment confirmation</li>
                    <li>Review any health flags before session</li>
                </ul>
            </div>
        </div>
    </body>
    </html>
  `
}

function generateCustomerEmailTemplate(submission: FMSSubmission): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>FMS Assessment Request Confirmed</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
            .content { margin-bottom: 20px; }
            .highlight { background-color: #e7f3ff; padding: 15px; border-radius: 8px; border-left: 4px solid #0066cc; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
            .button { display: inline-block; background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>✅ Your FMS Assessment Request is Confirmed!</h2>
                <p>Hi ${submission.name.split(' ')[0]},</p>
            </div>

            <div class="content">
                <p>Thank you for your interest in a Functional Movement Screen (FMS) assessment with Geelong Movement Co. We've received your request and are excited to help you on your movement journey!</p>

                <div class="highlight">
                    <h3>What happens next?</h3>
                    <ul>
                        <li><strong>Contact:</strong> We'll call you within 1 business day to schedule your assessment</li>
                        <li><strong>Duration:</strong> Your FMS assessment will take approximately 45 minutes</li>
                        <li><strong>Preparation:</strong> Please wear comfortable workout clothes</li>
                        <li><strong>Location:</strong> Our clinic at [Address - to be updated]</li>
                    </ul>
                </div>

                <h3>Your Submission Summary:</h3>
                <p><strong>Preferred Assessment Time:</strong> ${submission.preferredTime}</p>
                <p><strong>Experience Level:</strong> ${submission.experience}</p>
                <p><strong>Your Goals:</strong> ${submission.goals}</p>

                <p>Our qualified movement specialists will conduct a comprehensive assessment to identify any movement limitations or asymmetries, and create a personalized plan to help you achieve your goals safely and effectively.</p>
            </div>

            <div class="footer">
                <p><strong>Questions?</strong> Feel free to contact us:</p>
                <ul>
                    <li>Phone: [Phone number to be updated]</li>
                    <li>Email: [Email to be updated]</li>
                </ul>
                
                <p>We look forward to meeting you soon!</p>
                <p><strong>The Geelong Movement Co Team</strong></p>
                
                <p style="font-size: 12px; color: #999; margin-top: 20px;">
                    Reference ID: ${submission.id}<br>
                    Submitted: ${new Date(submission.submittedAt).toLocaleString('en-AU')}
                </p>
            </div>
        </div>
    </body>
    </html>
  `
}

// Utility function for testing email templates in development
export async function sendTestEmail() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Test emails can only be sent in development environment')
  }

  const testSubmission: FMSSubmission = {
    id: 'test_fms_123',
    name: 'John Smith',
    email: 'test@example.com',
    phone: '0412 345 678',
    preferredTime: 'morning',
    goals:
      'I want to improve my mobility and reduce lower back pain from sitting at a desk all day.',
    injuryFlags: ['Current pain or injury'],
    experience: 'beginner',
    submittedAt: new Date().toISOString(),
    referralSource: 'Google Search',
    utmSource: 'google',
  }

  return await sendFMSNotificationEmails(testSubmission)
}

