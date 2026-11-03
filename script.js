// A2: const holds values that are not reassigned; let is used for fetched, changing state.
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#primary-links");
const primaryNavLinks = document.querySelectorAll("#primary-links a");
const eventList = document.querySelector("#event-list");
const eventStatus = document.getElementById("event-status");
const searchInput = document.querySelector("#event-search");
const eventForm = document.querySelector("#event-form");
const eventName = document.querySelector("#event-name");
const formStatus = document.querySelector("#form-status");
const rsvpForm = document.querySelector("#rsvp-form");
const rsvpName = document.querySelector("#rsvp-name");
const rsvpEvent = document.querySelector("#rsvp-event");
const rsvpStatus = document.querySelector("#rsvp-status");

// A2: sample values show string, number, and boolean data types.
const boardTitle = "Campus Event Board";
const defaultSeats = 12;
const boardIsOnline = true;
console.log(boardTitle, defaultSeats, boardIsOnline);

let events = [];

// B7: file:// pages cannot fetch sibling JSON files; this sample keeps cards usable in that mode.
const localFileFallback = [
  {
    title: "Orientation Day",
    date: "2026-12-05",
    time: "10:00 AM",
    venue: "Seminar Hall",
    description: "Welcome event for new students to learn about the campus, academic programs, facilities, clubs and student activities.",
    seats: 24,
    online: false
  },
  {
    title: "Tech Workshop",
    date: "2026-12-09",
    time: "2:00 PM",
    venue: "Computer Lab",
    description: "An interactive workshop where students can learn practical technology skills and explore new tools and technologies.",
    seats: 3,
    online: false
  },
  {
    title: "Sports Meet",
    date: "2026-12-11",
    time: "4:00 PM",
    venue: "College Sports Ground",
    description: "A campus sports event featuring various games and activities where students can participate, compete and showcase their sporting skills.",
    seats: 0,
    online: false
  },
  {
    title: "IIITV Hackathon",
    date: "2026-12-13",
    time: "9:00 AM",
    venue: "Seminar Hall",
    description: "A campus hackathon where students work together to build innovative solutions to real-world problems using technology.",
    seats: 12,
    online: true
  }
];

// A4: if / else labels event capacity using the seats number.
function availabilityLabel(eventItem) {
  if (eventItem.seats === 0) {
    return "Full";
  } else if (eventItem.seats < 5) {
    return "Few left";
  }
  return "Open";
}

// A6: the function parameter and return create a readable single-line event summary.
function formatEvent(eventItem) {
  const format = eventItem.online ? "Online" : "In person";
  return `${eventItem.title} — ${eventItem.venue} · ${format} · ${availabilityLabel(eventItem)}`;
}

// B2/B3: createElement, textContent, classList, setAttribute, and appendChild render safe DOM.
function createEventCard(eventItem) {
  const card = document.createElement("article");
  card.classList.add("event");
  if (eventItem.seats === 0) {
    card.classList.add("full");
  }
  // B3: inline style reflects the full-capacity state alongside its class and label.
  card.style.opacity = eventItem.seats === 0 ? "0.82" : "1";

  const title = document.createElement("h3");
  title.textContent = eventItem.title;
  card.appendChild(title);

  const description = document.createElement("p");
  description.textContent = eventItem.description;
  card.appendChild(description);

  const dateLine = document.createElement("p");
  const dateLabel = document.createElement("strong");
  dateLabel.textContent = "Date: ";
  const date = document.createElement("time");
  date.setAttribute("datetime", eventItem.date);
  date.textContent = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${eventItem.date}T12:00:00`));
  dateLine.append(dateLabel, date);
  card.appendChild(dateLine);

  const timeLine = document.createElement("p");
  timeLine.textContent = `Time: ${eventItem.time}`;
  card.appendChild(timeLine);

  const venueLine = document.createElement("p");
  venueLine.textContent = `Venue: ${eventItem.venue}`;
  card.appendChild(venueLine);

  const summary = document.createElement("p");
  summary.classList.add("event-summary");
  summary.textContent = formatEvent(eventItem);
  card.appendChild(summary);

  const rsvpButton = document.createElement("button");
  rsvpButton.type = "button";
  rsvpButton.classList.add("rsvp-button");
  rsvpButton.dataset.eventTitle = eventItem.title;
  rsvpButton.textContent = eventItem.seats === 0 ? "Event full" : "RSVP";
  rsvpButton.disabled = eventItem.seats === 0;
  card.appendChild(rsvpButton);

  return card;
}

// A5: for...of processes every record; A7: arrow + filter selects the search results.
function renderEvents() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleEvents = events.filter((eventItem) =>
    `${eventItem.title} ${eventItem.venue} ${eventItem.description} ${eventItem.online ? "online" : "in person"}`
      .toLowerCase()
      .includes(query)
  );

  eventList.replaceChildren();
  for (const eventItem of visibleEvents) {
    console.log(formatEvent(eventItem));
    eventList.appendChild(createEventCard(eventItem));
  }

  eventStatus.textContent = visibleEvents.length
    ? `${visibleEvents.length} event${visibleEvents.length === 1 ? "" : "s"} shown.`
    : "No events match your search. Try another name, venue, or format.";
}

// B8: keep RSVP choices synchronized with available seats in the event data.
function syncRsvpOptions() {
  const selectedTitle = rsvpEvent.value;
  const placeholder = rsvpEvent.options[0].cloneNode(true);
  rsvpEvent.replaceChildren(placeholder);

  for (const eventItem of events) {
    const option = document.createElement("option");
    option.value = eventItem.title;
    option.textContent = `${eventItem.title} (${availabilityLabel(eventItem)})`;
    option.disabled = eventItem.seats === 0;
    rsvpEvent.appendChild(option);
  }

  rsvpEvent.value = events.some((eventItem) => eventItem.title === selectedTitle && eventItem.seats > 0)
    ? selectedTitle
    : "";
}

// B4: click toggles the mobile links and keeps the expanded state accessible.
menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

// B1/B4: querySelectorAll selects every primary link; close the menu after navigation.
for (const link of primaryNavLinks) {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
}

// B6: input filters immediately; Escape clears the search and restores all cards.
searchInput.addEventListener("input", renderEvents);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchInput.value = "";
    renderEvents();
  }
});

// B5: event.target identifies the exact RSVP button; the click bubbles from the card.
eventList.addEventListener("click", (event) => {
  if (!event.target.matches(".rsvp-button")) {
    return;
  }

  const selectedEvent = events.find((eventItem) => eventItem.title === event.target.dataset.eventTitle);
  if (!selectedEvent || selectedEvent.seats === 0) {
    return;
  }

  syncRsvpOptions();
  rsvpEvent.value = selectedEvent.title;
  rsvpStatus.textContent = `Complete the RSVP form to reserve a seat for ${selectedEvent.title}.`;
  rsvpForm.scrollIntoView({ behavior: "smooth", block: "center" });
  rsvpName.focus({ preventScroll: true });
});

// B8: setCustomValidity adds a trimmed-name rule to the built-in required/pattern checks.
function validateEventName() {
  const trimmedName = eventName.value.trim();
  eventName.setCustomValidity(trimmedName.length < 2 ? "Enter an event name with at least two non-space characters." : "");
}

eventName.addEventListener("input", validateEventName);
eventForm.addEventListener("input", () => {
  formStatus.textContent = "";
});

// B8: RSVP name has the same custom trimmed-name rule as event submissions.
function validateRsvpName() {
  const trimmedName = rsvpName.value.trim();
  rsvpName.setCustomValidity(trimmedName.length < 2 ? "Enter a name with at least two non-space characters." : "");
}

rsvpName.addEventListener("input", validateRsvpName);
rsvpForm.addEventListener("input", () => {
  rsvpStatus.textContent = "";
});

// B8: reserve a seat only after checkValidity accepts the RSVP form.
rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  validateRsvpName();
  if (!rsvpForm.checkValidity()) {
    rsvpForm.reportValidity();
    rsvpStatus.textContent = "Please correct the highlighted RSVP fields.";
    return;
  }

  const selectedEvent = events.find((eventItem) => eventItem.title === rsvpEvent.value);
  if (!selectedEvent || selectedEvent.seats === 0) {
    rsvpStatus.textContent = "Choose an event with available seats.";
    return;
  }

  selectedEvent.seats -= 1;
  rsvpStatus.textContent = `Thanks, ${rsvpName.value.trim()}! Your RSVP for ${selectedEvent.title} is confirmed.`;
  rsvpForm.reset();
  syncRsvpOptions();
  renderEvents();
});

// B8: checkValidity + preventDefault report client feedback without pretending to save server-side.
eventForm.addEventListener("submit", (event) => {
  event.preventDefault();
  validateEventName();
  if (!eventForm.checkValidity()) {
    eventForm.reportValidity();
    formStatus.textContent = "Please correct the highlighted fields and submit again.";
    return;
  }

  formStatus.textContent = "The form is valid. Connect a server to save submitted events.";
  eventForm.reset();
});

// B7: fetch + await exposes loading, successful rendering, and a friendly error state.
async function loadEvents() {
  eventStatus.textContent = "Loading events…";
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Event data request failed: ${response.status}`);
    }

    events = await response.json();
    syncRsvpOptions();
    renderEvents();
  } catch (error) {
    console.error("Could not load event data:", error);
    if (window.location.protocol === "file:") {
      events = localFileFallback.map((eventItem) => ({ ...eventItem }));
      syncRsvpOptions();
      renderEvents();
      eventStatus.textContent = "Showing sample events. Serve this folder over HTTP to load events.json.";
      return;
    }

    eventList.replaceChildren();
    eventStatus.textContent = "Events could not be loaded. Please try again after refreshing the page.";
  }
}

loadEvents();
