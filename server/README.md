# Galeria Backend (dev)

This lightweight Express server provides simple album and photo endpoints backed by picsum.photos.

Run:

```powershell
cd server
npm install
npm run dev
# or: npm start
```

Endpoints:
- GET /sync/albums -> list of albums
- GET /sync/albums/:albumId/photos -> list of photos for the album (photo.url, photo.thumb)
