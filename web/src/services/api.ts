export const API_BASE = 'http://localhost:4000'

export async function fetchAlbumsFromServer() {
  try {
    const res = await fetch(`${API_BASE}/sync/albums`)
    if (!res.ok) throw new Error('network')
    const data = await res.json()
    return data
  } catch (err) {
    return null
  }
}

export async function fetchPhotosFromServer(albumId: string) {
  try {
    const res = await fetch(`${API_BASE}/sync/albums/${albumId}/photos`)
    if (!res.ok) throw new Error('network')
    const data = await res.json()
    return data
  } catch (err) {
    return null
  }
}
