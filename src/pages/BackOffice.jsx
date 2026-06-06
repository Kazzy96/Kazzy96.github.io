import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Eye, X, LogOut, Mail, Inbox } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import './BackOffice.css'

/* ── Modal ── */
function MessageModal({ message, onClose }) {
  // Close on Escape key
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label="Message details">
      <div className="modal-panel">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <h2 className="modal-title">Message</h2>

        <div className="modal-field">
          <span className="modal-label">From</span>
          <span className="modal-value">{message.name}</span>
        </div>
        <div className="modal-field">
          <span className="modal-label">Email</span>
          <span className="modal-value">{message.email}</span>
        </div>
        <div className="modal-field">
          <span className="modal-label">Received</span>
          <span className="modal-value">{new Date(message.created_at).toLocaleString()}</span>
        </div>
        <div className="modal-field modal-field--message">
          <span className="modal-label">Message</span>
          <p className="modal-message-body">{message.message}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Page ── */
export default function BackOffice() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [fetchError, setFetchError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [logoutLoading, setLogoutLoading] = useState(false)

  const fetchMessages = useCallback(async () => {
    setFetchError('')
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setFetchError('Failed to load messages. Please refresh.')
    } else {
      setMessages(data)
    }
    setIsLoading(false)
  }, [])

  // Auth guard + initial fetch
  useEffect(() => {
    if (!isSupabaseConfigured) {
      navigate('/login', { replace: true })
      return
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login', { replace: true })
      } else {
        fetchMessages()
      }
    })
  }, [navigate, fetchMessages])

  async function handleDelete(id) {
    setDeletingId(id)
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (!error) {
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (selectedMessage?.id === id) setSelectedMessage(null)
    }
    setDeletingId(null)
  }

  async function handleLogout() {
    setLogoutLoading(true)
    await supabase.auth.signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="backoffice">

      {/* ── Header bar ── */}
      <div className="bo-header">
        <div className="bo-header-left">
          <Inbox size={22} />
          <h1 className="bo-title">Back Office</h1>
        </div>
        <button className="bo-logout-btn" onClick={handleLogout} disabled={logoutLoading}>
          <LogOut size={16} />
          {logoutLoading ? 'Logging out…' : 'Logout'}
        </button>
      </div>

      {/* ── Content ── */}
      {isLoading && (
        <p className="bo-status">Loading messages…</p>
      )}

      {!isLoading && fetchError && (
        <div className="bo-error" role="alert">{fetchError}</div>
      )}

      {!isLoading && !fetchError && messages.length === 0 && (
        <div className="bo-empty">
          <Mail size={32} />
          <p>No messages yet.</p>
        </div>
      )}

      {!isLoading && !fetchError && messages.length > 0 && (
        <div className="bo-table-wrap">
          <table className="bo-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="bo-row">
                  <td className="bo-cell">{msg.name}</td>
                  <td className="bo-cell bo-cell--muted">{msg.email}</td>
                  <td className="bo-cell bo-cell--muted">
                    {new Date(msg.created_at).toLocaleString()}
                  </td>
                  <td className="bo-cell bo-cell--actions">
                    <button
                      className="bo-action-btn bo-action-btn--view"
                      onClick={() => setSelectedMessage(msg)}
                      aria-label={`View message from ${msg.name}`}
                    >
                      <Eye size={15} />
                      View
                    </button>
                    <button
                      className="bo-action-btn bo-action-btn--delete"
                      onClick={() => handleDelete(msg.id)}
                      disabled={deletingId === msg.id}
                      aria-label={`Delete message from ${msg.name}`}
                    >
                      <Trash2 size={15} />
                      {deletingId === msg.id ? '…' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modal ── */}
      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}

    </div>
  )
}
