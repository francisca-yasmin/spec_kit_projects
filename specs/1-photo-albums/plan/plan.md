# Implementation Plan: Photo Albums

**Branch**: `1-photo-albums` | **Date**: 2025-11-07 | **Spec**: ../spec.md

## Summary

Implementar uma aplicação web responsiva para organizar fotos em álbuns com interface tipo mosaico.
Tech stack alvo: React + Vite com o mínimo de bibliotecas, CSS simples e elegante, armazenamento local de
metadados usando SQLite. Arquivos de mídia (imagens) serão referenciados por path local ou armazenados
no filesystem do usuário (ou diretório de aplicação) conforme plataforma.

## Technical Context

**Language/Version**: JavaScript/TypeScript (usar TypeScript recomendado)  
**Primary Dependencies**: React, Vite, uma biblioteca pequena para SQLite em browser/desktop (ex.: sql.js ou better-sqlite3 em Electron), uma biblioteca leve de drag-and-drop (ex.: dnd-kit) ou API nativa de HTML5 drag/drop  
**Storage**: SQLite (local) para metadados; thumbnails gerados localmente e armazenados no filesystem/app storage  
**Testing**: vitest / jest; Playwright para testes end-to-end  
**Target Platform**: Web responsiva (desktop + mobile web)  
**Performance Goals**: Abrir álbum com 200 fotos e renderizar mosaico inicial em <1s em condições típicas de rede (para thumbnails locais)  
**Constraints**: Sem sincronização multi-device no MVP; evitar bibliotecas pesadas; garantir acessibilidade básica

## Constitution Check

- Clean Code: usar TypeScript, ESLint, Prettier; code reviews obrigatórias.  
- Performance: benchmarks para render do mosaico; virtualização para grandes álbuns.  
- UX: personas e fluxos já definidos no spec; feedback claro para operações de DnD.  
- Tests & Contracts: tests unitários e E2E obrigatórios antes do merge.  
- Observability: instrumentar tempos de abertura e erros de carregamento.

## Project Structure

```
web/
  src/
    components/
    pages/
    services/
    db/
  public/
  index.html
  vite.config.ts
tests/
  e2e/
  unit/
```

## Phase 0: Research tasks

- R001 Research best SQLite-in-browser approach for Vite+React (sql.js vs wasm vs server shim)
- R002 Research thumbnail generation strategies in browser (createImageBitmap, canvas) and performance
- R003 Research drag-and-drop library minimal options (native HTML5 vs dnd-kit)

## Phase 1: Deliverables

- data-model.md (created)
- contracts/openapi.yaml (minimal endpoints for optional backend sync)
- quickstart.md (dev setup)

## Phase 2: Tasks (high level)

- T001 Initialize Vite + React + TypeScript project
- T002 Implement DB layer (SQLite wrapper) and migrations
- T003 Implement Album list UI with drag-and-drop reorder and persistence
- T004 Implement Album view with mosaic layout and virtualized grid
- T005 Implement photo import, EXIF extraction, thumbnail generation
- T006 Tests: unit + integration + e2e
- T007 Accessibility and basic UX polish

## Complexity Tracking

Justify use of SQLite local: simplifies MVP, minimizes infra, privacy-friendly. Trade-off: no cross-device sync initially.
