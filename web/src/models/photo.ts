export interface Photo {
  id: string
  albumId: string
  filename: string
  filepath?: string
  capturedAt?: string | null
  uploadedAt?: string
  metadata?: any
  thumbnailPath?: string
}
