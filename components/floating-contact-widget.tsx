'use client'

import { MessageCircle, Send, X } from 'lucide-react'
import { useState } from 'react'

export default function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsOpen(false)
      setFormData({ name: '', email: '', message: '' })
      alert("Thank you for your message! We'll get back to you soon.")
    }, 1000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      {/* Floating Contact Button */}
      <button
        className='floating-contact focus-visible'
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Open contact form'
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Contact Form Modal */}
      {isOpen && (
        <div className='fixed inset-0 bg-black/50 z-[1001] flex items-center justify-center p-4'>
          <div className='bg-card text-card-foreground rounded-lg shadow-xl w-full max-w-md p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-semibold'>Quick Contact</h3>
              <button
                onClick={() => setIsOpen(false)}
                className='text-muted-foreground hover:text-foreground'
                aria-label='Close contact form'
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium mb-1'
                >
                  Name *
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='input-enhanced w-full'
                  placeholder='Your name'
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium mb-1'
                >
                  Email *
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='input-enhanced w-full'
                  placeholder='your@email.com'
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium mb-1'
                >
                  Message *
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className='input-enhanced w-full resize-none'
                  placeholder='How can we help you?'
                />
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='btn-primary w-full flex items-center justify-center gap-2'
              >
                {isSubmitting ? (
                  <>
                    <div className='loading-spinner' />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
