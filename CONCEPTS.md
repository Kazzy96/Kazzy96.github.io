# CONCEPTS.md — Kazzy96 Portfolio

Three challenging concepts used in this project, with purpose, difficulty, and usage location.

---

## Concept 1 — Supabase Auth Guard with Session Persistence

**Purpose in the project:**
Protect the `/backoffice` route so only an authenticated admin can access it. On every mount, the component checks whether a valid Supabase session exists and redirects unauthenticated users to `/login` before rendering any content.

**Why it was challenging:**
Session state is asynchronous — `getSession()` returns a Promise, so the guard had to be written inside a `useEffect` with a `.then()` callback to avoid flashing protected content before the check resolves. It also had to account for the case where Supabase is not configured at all (missing env vars), requiring a second early-exit condition.

**Usage location:**
`src/pages/BackOffice.jsx` — lines 77–90
```js
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
```

---

## Concept 2 — `useCallback` to Stabilise `useEffect` Dependencies

**Purpose in the project:**
`fetchMessages` is an async function that queries Supabase and updates state. It is called both inside `useEffect` (on mount) and after a delete action. Defining it with `useCallback` gives it a stable reference so it can be safely listed in the `useEffect` dependency array without causing an infinite re-render loop.

**Why it was challenging:**
React's linter (`react-hooks/exhaustive-deps`) requires all values used inside `useEffect` to appear in the dependency array. Without `useCallback`, including `fetchMessages` in the array would recreate the function on every render and trigger the effect endlessly. Understanding *why* function identity causes this loop — and that `useCallback` with an empty `[]` dependency array is the correct fix — required digging into how React compares dependencies.

**Usage location:**
`src/pages/BackOffice.jsx` — lines 63–75
```js
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
```

---

## Concept 3 — Client-Side Form Validation with Async Supabase Insert

**Purpose in the project:**
The contact form validates all fields locally before making any network call, inserts the sanitised data into the Supabase `messages` table, and shows the user real-time success or error feedback with an auto-dismissing banner.

**Why it was challenging:**
Several moving parts had to work together: a pure validation function that returns an error map, inline field-level error clearing as the user types, an async submit handler with `setStatus` state transitions (`null → 'sending' → 'success' | 'error'`), and a `useRef`-based dismiss timer that had to be cancelled on unmount to prevent a state-update-on-unmounted-component warning.

**Usage location:**
`src/pages/Contact.jsx` — lines 8–67
- `validate()` function — lines 8–18
- `handleSubmit()` — lines 43–67
- `dismissTimer` cleanup — line 32
