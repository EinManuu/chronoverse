# ChronoVerse – Franchise Timeline & „Road to…“ Tracker

Ein selbstpflegender (**Zero-Maintenance**) Film-, Serien-, One-Shot- und Special-Tracker für riesige Film-Universen (Marvel MCU, DCU, Star Wars) als **Progressive Web App (PWA)** – gebaut mit **SvelteKit 5 (Runes)**, **Tailwind CSS v4**, **Supabase** und **TMDB + Gemini 3.8 Flash Search Grounding**.

## Highlights & Features

- **Prominente Zeitachse (Timeline Spine):** Zeigt direkt auf der vertikalen Achse das *In-Universe-Jahr* (z.B. `1942`, `2008`, `TVA`, `2026`, `1960s*`) oder im Release-Modus das *Kinostart-Jahr*.
- **🎯 „Road to…“-Filter (z.B. *Avengers: Doomsday*):**
  - Filtert die gesamte Timeline auf die relevanten Titel für das nächste große Kino-Event herunter.
  - Berechnet deinen **Readiness-Score (%)** und die **effektive Rest-Watchtime**.
- **⚡ „Nur Credit-Scene nötig“-Shortcuts:**
  - Markiert Filme (wie *The Marvels* oder *Captain America: Brave New World*), bei denen für *Doomsday* **nicht** der ganze 2-Stunden-Film nötig ist, sondern nur die 3-minütige Mid-/Post-Credit-Scene.
  - Sobald du nur die Credit-Scene abhakst (oder im Modal nachliest), gilt die Voraussetzung sofort als erfüllt!
- **🍿 Mid- & Post-Credit-Scene Spickzettel (Offline-fähig im Kino):**
  - Zeigt spoilerfrei an, ob du im Kino sitzen bleiben musst (`🔥 Pflicht! Sitzenbleiben` vs. `😄 Nur ein Gag`), plus aufklappbarer Spoiler-Zusammenfassung.
- **👥 Freunde-Abgleich ohne Account-Zwang:**
  - Über **„Stand teilen“** erzeugst du einen Link (`?friend_watch=...`), den deine Freunde mit 1 Klick öffnen und unter deinem Namen für den nächsten gemeinsamen Filmabend einspeichern können.
- **🛡️ 0,00 € Garantie (Dual-Guard):**
  - Automatischer wöchentlicher Sync ([`vercel.json`](file:///e:/OneDrive/Projects/movie-timelines/vercel.json) & [`sync-engine.ts`](file:///e:/OneDrive/Projects/movie-timelines/src/lib/server/sync-engine.ts)) mit hartem Code-Limit (`max. 25 AI-Calls / Monat`).

## Schnellstart

```bash
npm.cmd install
npm.cmd run dev
```

Für Live-Cloud-Datenbank und echte API-Keys einfach [`.env.example`](file:///e:/OneDrive/Projects/movie-timelines/.env.example) nach `.env` kopieren und das SQL-Schema aus [`supabase/schema.sql`](file:///e:/OneDrive/Projects/movie-timelines/supabase/schema.sql) im kostenlosen Supabase SQL-Editor ausführen.
