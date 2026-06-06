# Contact Page — Feature Specification

> Must be read alongside `./ai/ai-spec.md` (Global AI Spec).

---

## Feature Goal

Deliver the public-facing Contact page at `/contact`. It presents a form with name, email, and message fields. On valid submission the form INSERTs a row into the Supabase `messages` table using the anonymous client, then shows a success banner and resets the fields. Validation errors and submission failures are surfaced inline with clear visual feedback.

---

## Scope

### In Scope
- Route `/contact` renders `<Contact>` inside `MainLayout`
- Contact form with three fields: name (text), email (email), message (textarea)
- Client-side validation: all fields required, email format check
- Inline validation error messages per field
- Submit button disabled while a submission is in flight
- Supabase `INSERT` into the `messages` table on valid submission
- Success feedback: distinct banner/message, form reset, auto-dismiss after a few seconds
- Failure feedback: distinct error banner with actionable wording
- Graceful degradation when Supabase is not configured (`isSupabaseConfigured` guard from `supabaseClient.js`)
- Custom CSS only — no third-party UI or CSS frameworks

### Out of Scope
- Server-side validation or a custom API endpoint
- Email delivery / SMTP (Supabase stores the message; no outbound email)
- CAPTCHA or spam protection
- File attachments
- Authentication — this form is fully public (anonymous INSERT only)
- Rate limiting (handled at the Supabase RLS / dashboard level, not in the client)
- CSS frameworks (Tailwind, Bootstrap, MUI, etc.)

---

## Requirements Breakdown & User Flow

### Happy path (valid submission)

1. Visitor navigates to `/#/contact`
2. `MainLayout` renders — `Header` and `Footer` are present
3. Visitor fills in name, email, and message
4. Visitor clicks **Send Message**
5. Submit button becomes disabled; a loading indicator or text ("Sending…") is shown
6. Client validates all fields — passes
7. `supabase.from('messages').insert(...)` is called with `{ name, email, message }`
8. Supabase returns success
9. Success banner appears (green, check icon, e.g. "Message sent! I'll get back to you soon.")
10. Form fields reset to empty
11. Success banner auto-dismisses after ~4 seconds (or on the user's next keystroke)
12. Submit button re-enables

### Validation failure path

1. Visitor clicks **Send Message** with one or more empty fields (or an invalid email)
2. Form does NOT submit to Supabase
3. Inline error messages appear below the offending field(s)
4. Visitor corrects the field — error clears (on blur or on submit retry)

### Supabase failure path

1. Visitor submits a valid form but the INSERT returns an error (network issue, RLS rejection, etc.)
2. Failure banner appears (red, X icon, e.g. "Something went wrong. Please try again.")
3. Form fields are **not** reset — visitor can retry without re-typing
4. Submit button re-enables

### Supabase not configured path

1. `isSupabaseConfigured` is `false` (missing env vars)
2. The form is rendered but the submit button is disabled with a visible note (e.g. "Contact form is temporarily unavailable.")
3. No INSERT is attempted

---

## Interfaces Involved

### Components

| Component | File path | Responsibility |
|---|---|---|
| `Contact` | `src/pages/Contact.jsx` | Page root — form state, validation, submission, feedback |

### Styles

| File | Scope |
|---|---|
| `src/pages/Contact.css` | Form layout, field styles, error/success/failure feedback |

### External integrations

| Integration | Details |
|---|---|
| Supabase client | Imported from `src/lib/supabaseClient.js` as `{ supabase, isSupabaseConfigured }` |
| Supabase table | `messages` — columns: `name` (text), `email` (text), `message` (text), `created_at` (timestamptz) |
| Supabase RLS | Anonymous role has INSERT-only access; no SELECT from the client |

---

## Data, Validations & Expected Behavior

### Form fields

| Field | Element | Validation rules |
|---|---|---|
| Name | `<input type="text">` | Required; must not be blank after trimming whitespace |
| Email | `<input type="email">` | Required; must match a valid email pattern (HTML5 + JS check) |
| Message | `<textarea>` | Required; must not be blank after trimming whitespace |

- All fields have a visible `<label>` associated via `htmlFor` / `id`
- Placeholder text may supplement the label but does not replace it
- Error messages appear below the relevant field, not just in a global banner

### Supabase INSERT payload

```js
await supabase.from('messages').insert({
  name: name.trim(),
  email: email.trim(),
  message: message.trim(),
})
```

- `created_at` is set automatically by Supabase (`DEFAULT now()`) — do not send it from the client
- The `id` column is `uuid` with `DEFAULT gen_random_uuid()` — do not send it from the client

### Success feedback

- A success message is displayed in a visually distinct container (green background or green text + check icon)
- Example text: *"Message sent! I'll get back to you soon."*
- Form fields (`name`, `email`, `message`) are reset to empty strings
- The success message auto-dismisses after ~4 seconds via `setTimeout` — the timeout is cleared on unmount (`useEffect` cleanup) to avoid memory leaks
- The success message also dismisses if the user starts typing in any field again

### Failure feedback

- A failure message is displayed in a visually distinct container (red background or red text + X icon)
- Example text: *"Something went wrong. Please try again."*
- Form fields are **not** reset
- The failure message persists until the user retries or navigates away

### Submission state

- While awaiting the Supabase response, the submit button is disabled and shows a loading label (e.g. "Sending…")
- No double-submit is possible

### Unconfigured state

- When `isSupabaseConfigured` is `false`, the submit button is disabled
- A visible, non-alarming note is shown (e.g. *"Contact form is temporarily unavailable."*)

---

## Acceptance Criteria

### Route
- [ ] Navigating to `/#/contact` renders the Contact page inside `MainLayout`
- [ ] "Contact" nav link in Header is highlighted as active on this page

### Form fields
- [ ] A text input for **name** is present with a visible label
- [ ] An email input for **email** is present with a visible label
- [ ] A textarea for **message** is present with a visible label
- [ ] All three fields accept user input and update state correctly

### Client-side validation
- [ ] Submitting with all fields empty shows inline error messages and does not call Supabase
- [ ] Submitting with an invalid email format shows an email-specific error and does not call Supabase
- [ ] Each error message appears below its respective field
- [ ] Correcting a field removes its error message
- [ ] The submit button is not clickable (disabled or ignored) when validation fails

### Supabase submission
- [ ] On valid input, `supabase.from('messages').insert(...)` is called with `{ name, email, message }` (trimmed)
- [ ] The client from `src/lib/supabaseClient.js` is used (not a new `createClient` call)
- [ ] The submit button is disabled and shows a loading state during the request

### Success feedback
- [ ] A visually distinct success message appears after a successful INSERT
- [ ] The success message includes a check icon or equivalent green visual indicator
- [ ] All form fields are cleared after successful submission
- [ ] The success message auto-dismisses after ~4 seconds
- [ ] The auto-dismiss timeout is cleaned up on component unmount

### Failure feedback
- [ ] A visually distinct failure message appears when the INSERT returns an error
- [ ] The failure message includes an X icon or equivalent red visual indicator
- [ ] Form fields are NOT cleared on failure
- [ ] The submit button re-enables after a failure so the user can retry

### Unconfigured state
- [ ] When `isSupabaseConfigured` is `false`, the submit button is disabled
- [ ] A visible note explains the form is temporarily unavailable
