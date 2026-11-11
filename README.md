# Small Web

A browser for a small web. The web is a collection of one-page sites stored in a database. The browser is what you read them with.

Stack: Next.js, NestJS, MongoDB, TypeScript.

---

## What it does

- Type an address in the bar and go to it.
- Follow links inside pages, including ones that lead nowhere.
- Go back and forward. Forward history is lost when you navigate somewhere new.
- Scroll through your history and jump back into any page you have visited.
- Search across the full text of every page in the web, not just titles.
- Publish a new site by giving it an address and writing the HTML yourself.
- Everyone browsing is identified by picking a name from a list. History belongs to that name.

---

## Requirements

- Node.js 20 or later
- MongoDB running locally on the default port (27017)

---

## Setup

### 1. Backend

```
cd backend
cp .env.example .env
npm install
```

### 2. Frontend

```
cd frontend
npm install
```

---

## Seed the data

Run this once from the backend directory. Running it again is safe -- sites and people are upserted, visits are reset to the same deterministic set.

```
cd backend
npm run seed
```

This creates 10 sites with real prose, 5 people to browse as, and about an hour of browsing history across those people.

---

## Run

Open two terminals.

Terminal 1 -- backend:

```
cd backend
npm run start:dev
```

Terminal 2 -- frontend:

```
cd frontend
npm run dev
```

Then open http://localhost:3000 in a browser.

---

## How things work

### Back and forward

The navigation stack lives in React state for the duration of the session. It is an array of addresses and a cursor pointing to the current position. Going back moves the cursor left. Going forward moves it right. Navigating to a new address drops everything after the cursor and appends the new address. That is how forward history is lost.

### Restore on return

Every page in the navigation stack is mounted and kept in the DOM. Only the page at the current cursor position is visible (the others are hidden with display:none). Going back does not re-mount the iframe -- the same iframe element is shown again, with its scroll position and any other state intact.

### Containing HTML you did not write

User-submitted HTML is rendered inside a sandboxed iframe using the srcdoc attribute. The sandbox attribute without allow-same-origin gives the iframe a null origin, which means it cannot read the parent's cookies, access the parent's DOM, or escalate to the parent's origin through any script it runs. The allow-scripts flag is included so that link clicks inside the page can be intercepted and forwarded to the parent via postMessage. That is the tradeoff: authors can write JavaScript in their pages, but it is contained.

### Search

MongoDB text index on the title and html fields of the sites collection. The title has a higher weight (3 vs 1) so a word appearing in a title ranks above the same word appearing only in the body.

### History

Each time a user navigates to an address (via the address bar, a link, a history jump, or a search result) a visit document is written to the database with the person's id, the address, the current time, and how they got there. Back and forward button presses do not write new visits -- they just move the cursor in the session-local navigation stack.

---

## Seed details

The 10 sites are:

- tidepool.zz -- observations from tidal pool visits (Alice)
- nightsky.zz -- naked-eye astronomy notes (Alice)
- quietroads.zz -- notes on driving roads that go nowhere in particular (Ben)
- saltflats.zz -- writing from time spent on salt flats (Ben)
- brewlog.zz -- records from coffee and tea brewing (Clara)
- inkwell.zz -- notes on writing and notebooks (Clara)
- fieldnotes.zz -- botanical field notes from a towpath (David)
- overgrown.zz -- urban exploration and rewilding (David)
- clockwork.zz -- mechanical watch repair diary (Eve)
- signal.zz -- amateur radio log (Eve)

Sites link to each other. Some links point to addresses that do not exist: lost.zz, darkroom.zz, antique.zz.

The five people (Alice, Ben, Clara, David, Eve) have browsing histories spread across those sites. David has visited nearly all of them.
