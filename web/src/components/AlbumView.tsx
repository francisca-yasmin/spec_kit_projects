import React, { useEffect, useState } from 'react';
import { getPhotosForAlbum } from '../db/db';
import MosaicGrid from './MosaicGrid';
import { fetchPhotosFromServer } from '../services/api';

export default function AlbumView({ albumId, onBack }: { albumId: string; onBack: () => void }) {
  const [photos, setPhotos] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      const remote = await fetchPhotosFromServer(albumId)
      if (remote && Array.isArray(remote) && remote.length > 0) {
        setPhotos(remote.map((p: any) => ({ id: p.id, filename: p.filename, filepath: p.url, thumbnailPath: p.thumb, capturedAt: p.capturedAt })))
      } else {
        setPhotos(getPhotosForAlbum(albumId))
      }
    })()
  }, [albumId])

  return (
    <div className="album-view">
      <button onClick={onBack}>← Voltar</button>
      <MosaicGrid photos={photos} />
    </div>
  )
}
