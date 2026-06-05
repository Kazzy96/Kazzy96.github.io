# Login Page — Feature Specification

> Must be read alongside `./ai/ai-spec.md` (Global AI Spec).

---

## Feature Goal

Deliver a secret, unlisted admin login page at `/login`. It is not linked in the Header, Footer, or mobile nav — accessible only by typing the URL directly. The form calls `supabase.auth.signInWithPassword()` with email and password; on success the user is redirected to `/backoffice` with a persisted session. On failure a clear error message is shown. If a valid session already exists when the page loads, the user is immediately redirected to `/backoffice` without seeing the form.

---

## Scope

### In Scope
- Route `/login` renders `<Login>` inside `MainLayout` (header and footer are still present for consistent chrome)
- Email + password form with a submit button
- `supabase.auth.signInWithPassword()` called on submission; client from `src/lib/supabaseClient.js`
- Redirect to `/backoffice` on success via `react-router-dom` `useNavigate`
- Session persistence across page refresh (`persistSession: true` is already set in `supabaseClient.js`)
- Auto-redirect to `/backoffice` if a valid session is detected on mount
- Inline error message on failed login (red, visually distinct)
- Loading / disabled state on the submit button during the auth call
- Graceful degradation when `isSupabaseConfigured` is false

### Out of Scope
- Any link to `/login` in Header, Footer, or `BottomNav` (per Global AI Spec)
- Public sign-up, password reset, magic link, OAuth, or any other auth flow
- "Remember me" checkbox — session persistence is always on
- Rate limiting on the client (handled server-side by Supabase)
- The admin user account creation — done once in the Supabase dashboard, not in the app
- CSS frameworks (Tailwind, Bootstrap, MUI, etc.)

---

## Requirements Breakdown & User Flow

### Direct URL access (no existing session)

1. Admin types `https://kazzy96.github.io/#/login` in the browser
2. `Login` component mounts — checks for an existing Supabase session via `supabase.auth.getSession()`
3. No session found — login form is rendered
4. Admin enters email and password
5. Admin clicks **Log In**
6. Button disables; loading state shown (e.g. "Logging in…")
7. `supabase.auth.signInWithPassword({ email, password })` is called
8. **Success:** session is stored by the Supabase client; `useNavigate` redirects to `/backoffice`
9. **Failure:** error message appears in a red banner below the form; button re-enables

### Already-authenticated access

1. Admin navigates to `/#/login` while a valid session exists
2. `Login` component mounts — `getSession()` returns a session
3. Component immediately calls `navigate('/backoffice', { replace: true })` — form never renders

### Session persistence

1. Admin logs in and then refreshes any page
2. Supabase client auto-refreshes the token (`autoRefreshToken: true` is already set)
3. Session survives the refresh — admin stays in `/backoffice` (the auth guard there will verify the session)

---

## Interfaces Involved

### Components

| Component | File path | Responsibility |
|---|---|---|
| `Login` | `src/pages/Login.jsx` | Page root — form state, auth call, redirect logic |

### Styles

| File | Scope |
|---|---|
| `src/pages/Login.css` | Centered card layout, field styles, error banner |

### External integrations

| Integration | Details |
|---|---|
| Supabase Auth | `supabase.auth.signInWithPassword({ email, password })` |
| Supabase session check | `supabase.auth.getSession()` — called on mount |
| Supabase client | Imported as `{ supabase, isSupabaseConfigured }` from `src/lib/supabaseClient.js` |
| React Router | `useNavigate` for redirect; route registered in `App.jsx` at path `/login` |

### Route registration

The `/login` route must be added to `App.jsx`:
```jsx
<Route path="/login" element={<Login />} />
```
It is **not** added to `NAV_LINKS` in `Header.jsx` or `NAV_ITEMS` in `BottomNav.jsx`.

---

## Data, Validations & Expected Behavior

### Form fields

| Field | Element | Validation |
|---|---|---|
| Email | `<input type="email">` | Required; HTML5 email validation is sufficient (Supabase will reject invalid credentials anyway) |
| Password | `<input type="password">` | Required; no minimum length enforced client-side |

- Both fields have a visible `<label>` associated via `htmlFor` / `id`
- Neither field value is logged or stored anywhere other than component state

### Auth call

```js
const { error } = await supabase.auth.signInWithPassword({
  email: email.trim(),
  password,          // do NOT trim passwords
})
```

- If `error` is null → redirect to `/backoffice` with `navigate('/backoffice', { replace: true })`
- If `error` is non-null → display `error.message` or a generic fallback: *"Invalid login credentials. Please try again."*

### Session check on mount

```js
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) navigate('/backoffice', { replace: true })
  })
}, [])
```

### Error display

- Error message is shown in a red, visually distinct banner below the submit button
- Error clears when the user modifies either field
- Error does NOT include raw Supabase internal messages that could leak system information — use `error.message` only (Supabase returns safe user-facing strings for auth errors)

### Loading / disabled state

- Button is disabled and shows "Logging in…" while the auth call is in flight
- No double-submit is possible

### Unconfigured state

- When `isSupabaseConfigured` is `false`, the submit button is disabled with a note: *"Login is temporarily unavailable."*

---

## Acceptance Criteria

### Route & discoverability
- [ ] Navigating to `/#/login` renders the Login page inside `MainLayout`
- [ ] No link to `/login` exists in `Header.jsx`, `Footer.jsx`, or `BottomNav.jsx`
- [ ] The "Login" route is registered in `App.jsx` at path `/login`

### Form fields
- [ ] An email input (`type="email"`) is present with a visible label
- [ ] A password input (`type="password"`) is present with a visible label
- [ ] A submit/login button is present

### Authentication
- [ ] Clicking submit calls `supabase.auth.signInWithPassword()` with the entered email (trimmed) and password (untrimmed)
- [ ] The Supabase client from `src/lib/supabaseClient.js` is used (no new `createClient` call)
- [ ] The submit button is disabled and shows a loading label during the auth call

### Success behaviour
- [ ] On successful login, the user is redirected to `/#/backoffice`
- [ ] The redirect uses `replace: true` so the back button does not return to `/login`
- [ ] After redirect, refreshing `/#/backoffice` does not log the user out (session persists)

### Auto-redirect
- [ ] If a valid Supabase session exists when `/login` is mounted, the user is immediately redirected to `/#/backoffice` without seeing the form

### Failure behaviour
- [ ] On failed login, a visually distinct red error message is displayed
- [ ] The error message is shown below the form / submit button
- [ ] The submit button re-enables after failure so the user can retry
- [ ] Modifying either field clears the error message

### Unconfigured state
- [ ] When `isSupabaseConfigured` is `false`, the submit button is disabled
- [ ] A visible note explains that login is temporarily unavailable
