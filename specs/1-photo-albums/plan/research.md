# Research: Photo Albums

## R001: SQLite in web context

Decision: Use sql.js (SQLite compiled to WASM) for a pure browser-based SQLite experience when running
in standard web pages. If packaging for desktop (Electron) choose native better-sqlite3 for performance.

Rationale: sql.js lets us keep a single code path and persist DB in IndexedDB; avoids server-side component
for MVP. For heavy workloads or desktop builds, native SQLite provides better IO and concurrency.

Alternatives considered:
- IndexedDB-only solution (no relational queries) — lightweight but complicates complex queries and ordering
- Server-side SQLite API — adds infra and breaks single-user local assumption

## R002: Thumbnail generation

Decision: Generate thumbnails client-side using canvas/createImageBitmap and cache thumbnails on filesystem
or in IndexedDB alongside the SQLite metadata.

Rationale: reduces network usage and provides fast rendering; createImageBitmap is widely supported.

Alternatives considered:
- Server-side thumbnail generation (requires backend)
- Use browser's native <img> with object-fit for visual resizing (fast but higher memory and layout cost)

## R003: Drag-and-drop

Decision: Use native HTML5 Drag-and-Drop for album reordering and a lightweight library (dnd-kit) for touch
and accessibility if required.

Rationale: native API reduces dependencies; dnd-kit provides better accessibility and touch support as opt-in.
