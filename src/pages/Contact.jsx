import { useState, useEffect, useRef } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import './Contact.css'

const EMPTY_FIELDS = { name: '', email: '', message: '' }
const EMPTY_ERRORS = { name: '', email: '', message: '' }

function validate({ name, email, message }) {
  const errors = { ...EMPTY_ERRORS }
  if (!name.trim()) errors.name = 'Name is required.'
  if (!email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!message.trim()) errors.message = 'Message is required.'
  return errors
}

function hasErrors(errors) {
  return Object.values(errors).some(Boolean)
}

export default function Contact() {
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [errors, setErrors] = useState(EMPTY_ERRORS)
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'
  const dismissTimer = useRef(null)

  // Clear auto-dismiss timer on unmount
  useEffect(() => () => clearTimeout(dismissTimer.current), [])

  function handleChange(e) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    // Clear field error as the user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    // Clear success banner when user starts typing again
    if (status === 'success') setStatus(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(fields)
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors)
      return
    }

    setStatus('sending')

    const { error } = await supabase.from('messages').insert({
      name: fields.name.trim(),
      email: fields.email.trim(),
      message: fields.message.trim(),
    })

    if (error) {
      console.error('[Contact] Supabase insert error:', error)
      setStatus('error')
      return
    }

    setFields(EMPTY_FIELDS)
    setErrors(EMPTY_ERRORS)
    setStatus('success')

    dismissTimer.current = setTimeout(() => setStatus(null), 4000)
  }

  const isSending = status === 'sending'

  return (
    <div className="contact-page">

      <div className="contact-header">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-subtitle">
          Have a question or want to work together? Fill in the form below and
          I&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className={`form-input${errors.name ? ' form-input--error' : ''}`}
              placeholder="Your full name"
              value={fields.name}
              onChange={handleChange}
              disabled={isSending}
              autoComplete="name"
            />
            {errors.name && (
              <p className="form-error" role="alert">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`form-input${errors.email ? ' form-input--error' : ''}`}
              placeholder="you@example.com"
              value={fields.email}
              onChange={handleChange}
              disabled={isSending}
              autoComplete="email"
            />
            {errors.email && (
              <p className="form-error" role="alert">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              id="message"
              name="message"
              className={`form-textarea${errors.message ? ' form-input--error' : ''}`}
              placeholder="Write your message here…"
              rows={6}
              value={fields.message}
              onChange={handleChange}
              disabled={isSending}
            />
            {errors.message && (
              <p className="form-error" role="alert">{errors.message}</p>
            )}
          </div>

          {/* Feedback banners */}
          {status === 'success' && (
            <div className="form-banner form-banner--success" role="status">
              <CheckCircle size={18} />
              Message sent! I&apos;ll get back to you soon.
            </div>
          )}
          {status === 'error' && (
            <div className="form-banner form-banner--error" role="alert">
              <XCircle size={18} />
              Something went wrong. Please try again.
            </div>
          )}

          {/* Submit */}
          {isSupabaseConfigured ? (
            <button
              type="submit"
              className="form-submit"
              disabled={isSending}
            >
              {isSending ? 'Sending…' : 'Send Message'}
            </button>
          ) : (
            <div>
              <button type="button" className="form-submit" disabled>
                Send Message
              </button>
              <p className="form-unavailable">
                Contact form is temporarily unavailable.
              </p>
            </div>
          )}

        </form>
      </div>

    </div>
  )
}
