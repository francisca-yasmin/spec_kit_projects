let SQL: any = null
let db: any = null
let fallback = {
  albums: [] as any[],
  photos: [] as any[],
}

export async function initDb() {
  if (db) return
  try {
    // dynamic import to avoid bundler/import issues; use CDN-hosted wasm to simplify dev setup
    const mod: any = await import('sql.js')
    const initSqlJs = mod.default || mod.initSqlJs || mod
    SQL = await initSqlJs({ locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/sql.js@1.8.0/dist/${file}` })
    db = new SQL.Database()
    // create tables
    db.run(`CREATE TABLE IF NOT EXISTS Album (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      coverPhotoId TEXT,
      orderIndex INTEGER,
      createdAt TEXT,
      updatedAt TEXT
    )`)
    db.run(`CREATE TABLE IF NOT EXISTS Photo (
      id TEXT PRIMARY KEY,
      albumId TEXT,
      filename TEXT,
      filepath TEXT,
      capturedAt TEXT,
      uploadedAt TEXT,
      metadata TEXT,
      thumbnailPath TEXT
    )`)
  } catch (err) {
    // Fallback to in-memory JS storage if WASM/sql.js cannot load in the environment
    // This allows the UI to render for development without full sql.js support.
    // Log error for debugging.
    // eslint-disable-next-line no-console
    console.warn('sql.js init failed, using in-memory fallback', err)
    db = null
    fallback.albums = []
    fallback.photos = []
  }
}

export async function seedSample() {
  const now = new Date().toISOString()
  if (db) {
    try {
      const res = db.exec("SELECT count(*) as c FROM Album")
      if (res && res[0] && res[0].values && res[0].values[0] && res[0].values[0][0] > 0) return
      db.run("INSERT INTO Album (id, title, orderIndex, createdAt, updatedAt) VALUES (?,?,?,?,?)", [
        'alb-1',
        'Férias',
        1,
        now,
        now,
      ])
    } catch (err) {
      // ignore
    }
  } else {
    if (fallback.albums.length === 0) {
      fallback.albums.push({ id: 'alb-1', title: 'Férias', orderIndex: 1, createdAt: now, updatedAt: now })
    }
  }
}

export function getAlbums(): any[] {
  if (db) {
    try {
      const res = db.exec('SELECT * FROM Album ORDER BY orderIndex')
      if (!res || !res[0]) return []
      const cols = res[0].columns
      return res[0].values.map((row: any[]) => {
        const obj: any = {}
        row.forEach((v: any, i: number) => (obj[cols[i]] = v))
        return obj
      })
    } catch (err) {
      return []
    }
  }
  // fallback
  return fallback.albums.slice().sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
}

export function getPhotosForAlbum(albumId: string): any[] {
  if (db) {
    try {
      const st = db.exec('SELECT * FROM Photo WHERE albumId = ? ORDER BY capturedAt DESC', [albumId])
      if (!st || !st[0]) return []
      const cols = st[0].columns
      return st[0].values.map((row: any[]) => {
        const obj: any = {}
        row.forEach((v: any, i: number) => (obj[cols[i]] = v))
        return obj
      })
    } catch (err) {
      return []
    }
  }
  return fallback.photos.filter((p) => p.albumId === albumId).sort((a, b) => (b.capturedAt || '').localeCompare(a.capturedAt || ''))
}
