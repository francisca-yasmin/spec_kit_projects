# Data Model: Photo Albums

## Entities

- Album
  - id: string (UUID)
  - title: string
  - description: string | null
  - coverPhotoId: string | null
  - orderIndex: integer
  - createdAt: datetime
  - updatedAt: datetime

- Photo
  - id: string (UUID)
  - albumId: string
  - filename: string
  - filepath: string
  - capturedAt: datetime | null
  - uploadedAt: datetime
  - metadata: JSON (EXIF/geo)
  - thumbnailPath: string

## Relationships

- Album 1..* Photo (Album.id -> Photo.albumId)

## Validation Rules

- Album.title MUST not be empty
- Photo.capturedAt nullable; when null use uploadedAt

## State Transitions

- Photo: uploaded -> indexed -> thumbnail_generated -> visible
