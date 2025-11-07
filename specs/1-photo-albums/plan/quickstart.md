# Quickstart: Photo Albums (developer)

1. Clone repository and install dependencies

```powershell
# from repo root
npm install
cd web
npm install
```

2. Start dev server

```powershell
cd web
npm run dev
```

3. Run tests

```powershell
npm test
```

Notes:
- The app uses SQLite in-browser (sql.js) for local metadata; ensure the browser supports WASM and IndexedDB.
- For desktop packaging consider using Electron and native SQLite.
