import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect immediately if a valid session already exists
  useEffect(() => {
    if (!isSupabaseConfigured) return
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/backoffice', { replace: true })
    })
  }, [navigate])

  function handleChange(setter) {
    return (e) => {
      setter(e.target.value)
      if (error) setError('')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    setIsLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError) {
      setError(authError.message || 'Invalid login credentials. Please try again.')
      setIsLoading(false)
      return
    }

    navigate('/backoffice', { replace: true })
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Admin Login</h1>
        <p className="login-subtitle">This page is not publicly linked.</p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label htmlFor="login-email" className="form-label">Email</label>
            <input
              id="login-email"
              type="email"
              className="form-input"
              placeholder="admin@example.com"
              value={email}
              onChange={handleChange(setEmail)}
              disabled={isLoading}
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">Password</label>
            <input
              id="login-password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={handleChange(setPassword)}
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="login-error" role="alert">{error}</p>
          )}

          {isSupabaseConfigured ? (
            <button
              type="submit"
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in…' : 'Log In'}
            </button>
          ) : (
            <div>
              <button type="button" className="login-btn" disabled>
                Log In
              </button>
              <p className="login-unavailable">Login is temporarily unavailable.</p>
            </div>
          )}

        </form>
      </div>
    </div>
  )
}
