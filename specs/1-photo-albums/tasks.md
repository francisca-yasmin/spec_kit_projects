# Tasks: Photo Albums

**Input**: specs/1-photo-albums/spec.md
**Prerequisites**: plan.md, data-model.md, research.md, quickstart.md

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 Initialize Vite + React + TypeScript project in `web/` (repo root)
- [ ] T002 [P] Create initial README and `specs/1-photo-albums/` plan artifacts (specs/1-photo-albums/)
- [ ] T003 [P] Configure ESLint, Prettier, TypeScript config in `web/` (`web/.eslintrc.cjs`, `web/tsconfig.json`)
- [ ] T004 [P] Add test tooling: Vitest + Playwright + testing-library in `web/` (`web/package.json` deps)
- [X] T005 [P] Add sql.js and SQLite persistence shim in `web/src/db/` (`web/src/db/db.ts`)
- [ ] T006 [P] Add thumbnail utility and image helper in `web/src/services/thumbnail.ts`
- [ ] T007 [P] Add EXIF extraction helper in `web/src/services/exif.ts`
- [ ] T008 [P] Add lightweight drag/drop helper or install dnd-kit in `web/src/lib/dnd/` or `web/package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infra that MUST be complete before any user story implementation

- [X] T009 Implement SQLite DB wrapper with persistence to IndexedDB using sql.js in `web/src/db/db.ts`
- [ ] T010 Create DB schema and migration script `web/src/db/migrations.ts` (Album, Photo tables)
- [ ] T011 Implement thumbnail generation pipeline (createImageBitmap -> canvas -> store) in `web/src/services/thumbnail.ts`
- [ ] T012 Implement EXIF extraction and capturedAt fallback logic in `web/src/services/exif.ts`
- [ ] T013 Implement file import endpoint (client-side) and local file handling in `web/src/services/import.ts`
- [ ] T014 Create shared UI component library (Button, Modal, Icon) in `web/src/components/ui/`
- [ ] T015 Implement accessibility baseline (focus styles, keyboard nav) in `web/src/styles/accessibility.css`
- [ ] T016 Add basic logging/metrics hooks for open-album time in `web/src/lib/analytics.ts`
- [ ] T017 Create CI job skeleton to run lint, unit tests, and vitest in `.github/workflows/ci.yml`

---

## Phase 3: User Story 1 - Create & Browse Albums (Priority: P1)  MVP

**Goal**: Allow user to create albums, add photos, and open album to view photos in a mosaic.

**Independent Test**: Create album "Férias", add 10 photos, open album and see mosaic layout load with thumbnails.

### Tests for User Story 1

- [ ] T018 [US1] Create unit tests for Album CRUD in `web/tests/unit/album.test.ts`
- [ ] T019 [US1] Create integration test for opening an album and rendering mosaic in `web/tests/integration/album-view.test.ts`

### Implementation for User Story 1

- [X] T020 [US1] Create Album model in `web/src/models/album.ts` (fields per data-model.md)
- [X] T021 [US1] Implement Photo model in `web/src/models/photo.ts`
- [ ] T022 [US1] Implement DB access methods (createAlbum, getAlbums, addPhoto) in `web/src/db/repo.ts`
- [X] T023 [US1] Implement AlbumList UI component in `web/src/components/AlbumList.tsx` (renders albums, shows cover) 
- [ ] T024 [US1] Implement Album creation form `web/src/components/AlbumForm.tsx` and wire to DB
- [ ] T025 [US1] Implement photo import UI `web/src/components/PhotoImporter.tsx` that calls `web/src/services/import.ts`
- [X] T026 [US1] Implement AlbumView page `web/src/pages/AlbumView.tsx` with mosaic layout using CSS grid and virtualization in `web/src/components/MosaicGrid.tsx`
- [X] T027 [US1] Integrate thumbnail pipeline so imported photos generate thumbnails stored in `web/src/db/` and referenced by Photo.thumbnailPath
- [ ] T028 [US1] Add UI to open photo in lightbox/modal `web/src/components/Lightbox.tsx`
- [ ] T029 [US1] Add unit tests for MosaicGrid rendering in `web/tests/unit/mosaic.test.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Reorder Albums (Priority: P2)

**Goal**: Allow users to reorder albums on the main page via drag-and-drop; persist order

**Independent Test**: Drag album A to B's position and reload page to see persisted order.

### Tests for User Story 2

- [ ] T030 [US2] Add integration test validating reorder and persistence in `web/tests/integration/reorder.test.ts`

### Implementation for User Story 2

- [ ] T031 [US2] Implement drag-and-drop handlers in `web/src/components/AlbumList.tsx` (use native DnD or dnd-kit)
- [ ] T032 [US2] Implement orderIndex updates in DB via `web/src/db/repo.ts` and migration as needed
- [ ] T033 [US2] Add optimistic UI and retry logic for persisting order in `web/src/services/sync-order.ts`

---

## Phase 5: User Story 3 - Non-nested Albums & Quick Preview (Priority: P3)

**Goal**: Ensure albums cannot be nested and provide quick preview on hover/click

**Independent Test**: Attempt to drop album into another (operation rejected) and hover to see preview thumbnail overlay.

### Tests for User Story 3

- [ ] T034 [US3] Unit test asserting drag-to-nest results in no-op in `web/tests/unit/nesting.test.ts`

### Implementation for User Story 3

- [ ] T035 [US3] Enforce non-nesting in drag handlers in `web/src/components/AlbumList.tsx` (prevent drop zones)
- [ ] T036 [US3] Implement preview overlay/tooltip in `web/src/components/AlbumPreview.tsx` (on hover/tap) and ensure accessibility
- [ ] T037 [US3] Add UX feedback for invalid drop (toast/modal) in `web/src/components/Notification.tsx`

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T038 Code cleanup and refactor across `web/src/` per ESLint/Prettier rules
- [ ] T039 Performance optimization: measure and optimize album open time; adjust virtualization thresholds in `web/src/components/MosaicGrid.tsx`
- [ ] T040 Accessibility sweep and fix issues found by testing in `web/src/styles/accessibility.css` and components
- [ ] T041 Add observability hooks to measure open-album latency and error rates in `web/src/lib/analytics.ts`
- [ ] T042 E2E tests: Playwright scenario for primary user journey in `web/tests/e2e/primary.spec.ts`
- [ ] T043 Documentation: update `docs/quickstart.md` and `web/README.md` with setup and developer notes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001..T008 - no upstream dependencies
- **Foundational (Phase 2)**: T009..T017 - depends on Phase 1 completion
- **User Stories (Phase 3+)**: Each user story depends on Foundational phase completion

### User Story Dependencies

- **US1 (P1)**: Depends on T009, T010, T011, T012, T013
- **US2 (P2)**: Depends on US1 and T031..T033
- **US3 (P3)**: Depends on Foundational and T035..T037

### Parallel Opportunities

- Tasks T003, T004, T005, T006, T007, T008 can run in parallel during Setup
- Within US1 the following can run in parallel: T020/T021 (models) and T023/T024 (UI scaffolding) marked as parallel where safe

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001..T008)
2. Complete Phase 2: Foundational (T009..T017)
3. Implement US1 tasks (T020..T029) and tests (T018..T019)
4. Validate on local environment; run performance checks and accessibility quick tests
5. Deploy demo build if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1 → Test & Demo (MVP)
3. US2 → Add reorder UX
4. US3 → Add preview and nesting prevention

---

## Summary

- Total tasks: 43
- Tasks by story: US1=12 (incl tests), US2=4 (incl tests), US3=3 (incl tests), Setup/Foundation/Polish=24
- Parallel opportunities: many Setup tasks and several model/UI tasks can run in parallel (see section)
- Independent test criteria: listed per story in each phase
- Suggested MVP scope: User Story 1 only (Create & Browse Albums)

All tasks follow the required checklist format and include file paths for implementers.
