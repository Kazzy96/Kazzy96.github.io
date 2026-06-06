# Back Office — Feature Specification

> Must be read alongside `./ai/ai-spec.md` (Global AI Spec).

---

## Feature Goal

Deliver a protected admin dashboard at `/backoffice`. Unauthenticated visitors are immediately redirected to `/login`. Authenticated admins see all rows from the Supabase `messages` table ordered newest-first, can open a full-message modal by clicking any row, delete individual messages, and log out. The route is not linked anywhere in public navigation.

---

## Scope

### In Scope
- Route `/backoffice` — auth-guarded; redirects to `/login` if no active session
- Auth check on mount via `supabase.auth.getSession()`
- `SELECT *` from `messages` ordered by `created_at DESC`
- Table with columns: Name, Email, Date, Actions
- "View" action — opens a modal with full message details (name, email, date/time, message body)
- Modal: close button, click-outside-to-close, Escape-key-to-close
- "Delete" action — calls `supabase.from('messages').delete()`, removes the row from local state instantly (optimistic UI)
- Logout button — calls `supabase.auth.signOut()`, redirects to `/login`
- Empty state: "No messages yet." displayed when the table is empty
- Error state: visible error message if the fetch fails
- Custom CSS only — no third-party UI or CSS frameworks
- Icons via `lucide-react` (already installed)

### Out of Scope
- Any link to `/backoffice` or `/login` in Header, Footer, or BottomNav
- Pagination or infinite scroll (load all rows in one query)
- Reply / compose email from the dashboard
- Message read/unread status
- Bulk delete
- Editing message content
- Any public-facing content or form on this page
- CSS frameworks (Tailwind, Bootstrap, MUI, etc.)

---

## Requirements Breakdown & User Flow

### Unauthenticated access

1. Visitor navigates to `/#/backoffice`
2. Component mounts — calls `supabase.auth.getSession()`
3. No session found → `navigate('/login', { replace: true })` immediately
4. Login page renders; visitor never sees back-office content

### Authenticated access — happy path

1. Admin navigates to `/#/backoffice` (session exists)
2. Auth check passes — page renders with a loading indicator
3. `supabase.from('messages').select('*').order('created_at', { ascending: false })` is called
4. Messages load → table renders with one row per message
5. Admin clicks a row or "View" button → modal opens with full message
6. Admin closes modal (X button, Escape key, or outside click)
7. Admin clicks "Delete" on a row → row removed from table instantly; `DELETE` sent to Supabase
8. Admin clicks "Logout" → `signOut()` called → redirect to `/login`

### Authenticated access — empty table

1. Fetch succeeds but returns zero rows
2. Table is replaced by an empty-state message: "No messages yet."

### Authenticated access — fetch error

1. `SELECT` query returns an error
2. Error banner displayed: e.g. "Failed to load messages. Please refresh."
3. Table is not rendered

### Session refresh

1. Admin has the back-office open and the page is refreshed
2. `getSession()` still returns a valid session (auto-refresh token is on)
3. Messages are re-fetched; page renders normally

---

## Interfaces Involved

### Components

| Component | File path | Responsibility |
|---|---|---|
| `BackOffice` | `src/pages/BackOffice.jsx` | Page root — auth guard, data fetch, table, logout |
| `MessageModal` | Local component in `BackOffice.jsx` | Modal overlay with full message details and close logic |

### Styles

| File | Scope |
|---|---|
| `src/pages/BackOffice.css` | Page layout, table, modal overlay, action buttons |

### External integrations

| Integration | Details |
|---|---|
| Supabase Auth | `supabase.auth.getSession()` on mount; `supabase.auth.signOut()` on logout |
| Supabase DB — SELECT | `supabase.from('messages').select('*').order('created_at', { ascending: false })` |
| Supabase DB — DELETE | `supabase.from('messages').delete().eq('id', id)` |
| Supabase client | Imported as `{ supabase, isSupabaseConfigured }` from `src/lib/supabaseClient.js` |
| React Router | `useNavigate` for redirects; route registered at `/backoffice` in `App.jsx` |

### Route registration

The `/backoffice` route must be added to `App.jsx`:
```jsx
<Route path="/backoffice" element={<BackOffice />} />
```
It is **not** added to `NAV_LINKS` in `Header.jsx` or `NAV_ITEMS` in `BottomNav.jsx`.

---

## Data, Validations & Expected Behavior

### Auth guard

```js
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (!session) navigate('/login', { replace: true })
    else fetchMessages()
  })
}, [])
```

- If `isSupabaseConfigured` is `false`, redirect to `/login` immediately (no Supabase call possible)

### Messages fetch

```js
const { data, error } = await supabase
  .from('messages')
  .select('*')
  .order('created_at', { ascending: false })
```

- On success: store rows in state; render table
- On error: store error in state; render error banner; do not render table

### Table columns

| Column | Source field | Format |
|---|---|---|
| Name | `name` | Plain text |
| Email | `email` | Plain text (not a mailto link) |
| Date | `created_at` | Formatted as locale date+time (e.g. `new Date(created_at).toLocaleString()`) |
| Actions | — | "View" button + "Delete" button (or icon) per row |

### View modal

- Opens when "View" button (or the row itself) is clicked; stores the selected message in state
- Displays: sender name, email, formatted date/time, full message body
- Close triggers:
  1. Click the X / "Close" button
  2. Press `Escape` key (`keydown` event listener added on open, removed on close)
  3. Click the backdrop overlay outside the modal panel
- Closing sets the selected message state back to `null`

### Delete

```js
const { error } = await supabase.from('messages').delete().eq('id', message.id)
```

- On success: remove the row from local state immediately (optimistic — no refetch needed)
- On error: show a brief inline error or alert; do not remove the row from state
- The delete button shows a brief loading/disabled state while the request is in flight to prevent double-delete

### Logout

```js
await supabase.auth.signOut()
navigate('/login', { replace: true })
```

- Session is fully cleared from storage
- Redirect uses `replace: true` so the back button does not return to `/backoffice`

### Date formatting

- Use `new Date(created_at).toLocaleString()` for display (locale-aware, no external library)

---

## Acceptance Criteria

### Route & auth guard
- [ ] Navigating to `/#/backoffice` without a session redirects to `/#/login`
- [ ] Navigating to `/#/backoffice` with a valid session renders the Back Office page
- [ ] Refreshing `/#/backoffice` with a valid session does not log the user out
- [ ] No link to `/backoffice` exists in `Header.jsx`, `Footer.jsx`, or `BottomNav.jsx`
- [ ] The `/backoffice` route is registered in `App.jsx`

### Messages table
- [ ] Messages are fetched from `supabase.from('messages')` ordered by `created_at DESC`
- [ ] A table with Name, Email, Date, and Actions columns is rendered
- [ ] Each row corresponds to one message from the database
- [ ] Newest messages appear first
- [ ] If the table is empty, "No messages yet." (or equivalent) is displayed instead of an empty table
- [ ] If the fetch fails, an error message is displayed and the table is not rendered

### View modal
- [ ] Clicking a "View" button (or a row) opens a modal overlay
- [ ] The modal displays the sender's name, email, date/time, and full message body
- [ ] Clicking the X / Close button closes the modal
- [ ] Pressing the Escape key closes the modal
- [ ] Clicking the backdrop outside the modal panel closes the modal
- [ ] The rest of the page is not interactive while the modal is open (backdrop covers it)

### Delete
- [ ] Each row has a Delete button or icon
- [ ] Clicking Delete calls `supabase.from('messages').delete().eq('id', id)`
- [ ] The deleted row disappears from the table immediately after a successful delete
- [ ] The Delete button is disabled during the in-flight delete request (prevents double-delete)

### Logout
- [ ] A Logout button is visible on the page
- [ ] Clicking Logout calls `supabase.auth.signOut()`
- [ ] After logout, the user is redirected to `/#/login`
- [ ] After logout, navigating back to `/#/backoffice` redirects to `/#/login` again
