import React from 'react'

export default function MosaicGrid({ photos }: { photos: any[] }) {
  if (!photos || photos.length === 0) return <div>Sem fotos</div>
  return (
    <div className="mosaic-grid">
      {photos.map((p) => (
        <div key={p.id} className="mosaic-item">
          <img src={p.thumbnailPath || p.filepath || ''} alt={p.filename} />
        </div>
      ))}
    </div>
  )
}
