# Campus Event Board

<<<<<<< HEAD
A responsive campus event board for CS445. Lab 6 adds JavaScript fundamentals, data-driven rendering, search, RSVP interactions, asynchronous JSON loading, and client-side validation to the Lab 5 HTML and CSS.

## Run locally

For the JSON fetch, serve this folder over HTTP. If you open `index.html` directly as a `file://` URL, the browser blocks JSON fetches, so the page shows its bundled sample events instead. To load `events.json`, run from this folder:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Features

- Event cards render from `events.json`; the JSON data is the event list's source of truth.
- Search filters events by title, venue, description, and online/in-person format. Press Escape to clear it.
- RSVP buttons select an event in the sign-up form; a seat is reserved only after valid name and email details are submitted.
- The mobile menu opens and closes with an accessible expanded state.
- RSVP and event submission use native required/email/pattern checks plus a custom trimmed-name rule. The demo validates the forms but needs a server to save submissions.
- The Event Categories table keeps the four category/day pairs from the provided design, fills the page width, and has visible cell borders, generous spacing, alternating rows, and a small-screen layout.
- Fetch presents loading, success, and friendly failure states.

## Files

- `index.html` — page structure, search and form controls, and deferred script link.
- `style.css` and `base.css` — responsive visual system and category table styles.
- `script.js` — data loading, rendering, availability, navigation, search, RSVP, and validation.
- `events.json` — sample event records.
- `theme-dark.css` — optional theme layer.
- `NOTES.md` — answers to the Lab 6 reflection questions and submission reminders.

## DevTools and submission

Open the browser Console to inspect event summaries and fetch errors. For the assignment screenshots, capture the rendered event cards, a search result, loading/success/error states, and invalid/corrected form states. The GitHub repository and optional Pages links should be added to the submitted notes after publishing; this local project does not publish or create a repository commit.
=======
A responsive Campus Event Board developed for CS445 Lab Assignment 5 at IIIT Vadodara.

## Features

- Responsive event card layout
- CSS Grid and responsive design
- CSS custom properties
- Box model implementation
- Responsive typography
- Glass-effect event cards
- Announcements and FAQ sections

## Technologies

- HTML5
- CSS3
- CSS Grid
- Responsive Web Design

## Project

This project is the cumulative outcome of Labs 1–5 for the Campus Event Board assignment.       
>>>>>>> 15107f9fdd167e31428ec08d2a119f95ee599314
