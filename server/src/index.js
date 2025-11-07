import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

// Simple in-memory albums using picsum images
const ALBUMS = [
  { id: '1', title: 'Paisagens' },
  { id: '2', title: 'Cidades' },
  { id: '3', title: 'Natureza' },
]

function makePhotos(albumId, count = 12) {
  const base = 'https://picsum.photos/seed'
  return Array.from({ length: count }).map((_, i) => ({
    id: `${albumId}-${i}`,
    albumId,
    filename: `img-${albumId}-${i}.jpg`,
    url: `${base}/${albumId}-${i}/800/600`,
    thumb: `${base}/${albumId}-${i}/300/200`,
    capturedAt: new Date(Date.now() - i * 86400000).toISOString(),
  }))
}

app.get('/sync/albums', (req, res) => {
  res.json(ALBUMS)
})

app.get('/sync/albums/:albumId/photos', (req, res) => {
  const { albumId } = req.params
  const photos = makePhotos(albumId, 20)
  res.json(photos)
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Gallery API listening on http://localhost:${port}`))
