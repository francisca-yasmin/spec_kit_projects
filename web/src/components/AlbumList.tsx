import React, { useEffect, useState } from 'react'
import { getAlbums } from '../db/db'
import { fetchAlbumsFromServer } from '../services/api'

export default function AlbumList({ onOpen }: { onOpen: (id: string) => void }) {
  const [albums, setAlbums] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      const remote = await fetchAlbumsFromServer()
      if (remote && Array.isArray(remote) && remote.length > 0) {
        setAlbums(remote.map((r: any, i: number) => ({ id: r.id || `${i}`, title: r.title || `Album ${i}`, orderIndex: i })))
      } else {
        setAlbums(getAlbums())
      }
    })()
  }, [])

  return (
    <div className="album-list">
      {albums.map((a) => (
        <div key={a.id} className="album-card" onClick={() => onOpen(a.id)}>
          <div className="album-cover">📷</div>
          <div className="album-title">{a.title}</div>
        </div>
      ))}
    </div>
  )
}
