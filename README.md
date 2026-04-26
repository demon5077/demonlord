# 👹 DemonLord

**Your domain of dark entertainment.**

DemonLord is a free, open-source streaming site for movies, TV shows, anime, drama, and manga — powered by TMDB and the [ScreenScape API](https://screenscapeapi.dev). Built on Next.js 15, React 19, and Tailwind CSS 4.

**Live site:** [demonlord.pp.ua](https://demonlord.pp.ua)

---

## Features

- 🎬 **Movies & TV Shows** — browse and watch via TMDB metadata + multiple embed servers
- 📺 **Anime** — via Consumet, AniWatch, and ScreenScape AnimeSalt/AnimePahe
- 🎭 **Drama** — K-drama and more
- 📚 **Manga** — reader support
- ⚡ **ScreenScape Integration** — search KMMovies, AnimeSalt, NetMirror, AnimePahe, HDHub4u, UHDMovies
- 🌑 **Dark-first UI** — demonic red accent, sidebar navigation
- 🔐 **Auth** — Better Auth with email/password and OAuth
- 📱 **PWA** — installable on mobile

## Servers (Movie Player)
Default · Vidora · EmbedSu · AutoEmbed · VidSrc · SuperEmbed · 2Embed · VidLink · Videasy · 111Movies · Vidzee HD · Vidzee 4K

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Metadata:** TMDB API
- **Content API:** [ScreenScape API](https://screenscapeapi.dev)
- **Auth:** Better Auth
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Email:** Resend

## Getting Started

```bash
git clone https://github.com/your-org/demonlord.git
cd demonlord
npm install
cp example.env .env.local
# Fill in your keys (see below)
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

See `example.env` for all variables. The essential ones:

| Variable | Description |
|---|---|
| `TMDB_API_KEY` | Get at themoviedb.org/settings/api |
| `SCREENSCAPE_API_KEY` | Get at screenscapeapi.dev/dashboard/apis |
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Random 32-char secret |
| `BETTER_AUTH_URL` | Your site URL |

## ScreenScape API

DemonLord integrates [ScreenScape API](https://screenscapeapi.dev) for extended content from:
- **KMMovies** — Latest Bollywood/Hollywood + download links
- **AnimeSalt** — Anime streaming + search
- **AnimePahe** — Anime alternate provider
- **NetMirror** — Streaming content
- **HDHub4u** — HD movies
- **UHDMovies** — 4K content

All proxied through `/api/screenscape/*` routes. Search UI available at `/screenscape`.

## License

MIT — fork freely, credit appreciated.
