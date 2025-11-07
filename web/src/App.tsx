import React, { useEffect, useState } from 'react'
import AlbumList from './components/AlbumList'
import AlbumView from './components/AlbumView';
import { initDb, seedSample } from './db/db'

export default function App() {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null)

  useEffect(() => {
    initDb().then(() => seedSample())
  }, [])

  return (
    <div className="app">
      <header>
        <h1>Galeria</h1>
      </header>
      <main>
        {!selectedAlbumId ? (
          <AlbumList onOpen={(id) => setSelectedAlbumId(id)} />
        ) : (
          <AlbumView albumId={selectedAlbumId} onBack={() => setSelectedAlbumId(null)} />
        )}
      </main>
    </div>
  )
}
