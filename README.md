# AVO — Adaptive Venue Orchestration

> Restoran ve venue'lerde sipariş, servis ve ödeme akışlarını tek bir orkestrasyon katmanında birleştiren platform.

## Proje Yapısı

```
avo/
├── apps/
│   ├── web/          # Next.js 14 (App Router) — Guest & Staff UI
│   └── api/          # NestJS — Core API
├── packages/
│   └── shared/       # Ortak TypeScript tipleri ve şemalar
├── supabase/
│   └── migrations/   # Veritabanı migration dosyaları
└── docs/             # Plan dokümanları (P0-P9)
```

## Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | NestJS, TypeScript |
| Veritabanı | Supabase (PostgreSQL + RLS + Realtime) |
| Auth | Supabase Auth |
| Deployment | Vercel (web) + Railway (api) |
| Monorepo | Turborepo + npm workspaces |

## Kurulum

**Gereksinimler:** Node.js 20+, npm 10+

```bash
# Bağımlılıkları yükle
npm install

# Ortam değişkenlerini ayarla
cp .env.example apps/web/.env.local
cp .env.example apps/api/.env

# Tüm uygulamaları başlat
npm run dev

# Sadece frontend
npm run dev:web

# Sadece API
npm run dev:api
```

## Geliştirme

```bash
# Build
npm run build

# Lint
npm run lint

# Test
npm run test
```

## Dokümantasyon

Plan dokümanları `docs/` klasöründe bulunmaktadır:
- **P3** — Product PRD
- **P4** — MVP Scope
- **P5** — Technical Architecture
- **P7** — Execution Plan

## Lisans

Tüm hakları saklıdır. © 2025 AVO
