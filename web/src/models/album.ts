export interface Album {
  id: string
  title: string
  description?: string | null
  coverPhotoId?: string | null
  orderIndex?: number
  createdAt?: string
  updatedAt?: string
}
