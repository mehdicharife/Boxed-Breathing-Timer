# Boxed Breathing Timer

**Boxed Breathing Timer** is a calm, responsive web app for completing a single guided **4–4–4–4 box-breathing** cycle: inhale, hold, exhale, hold. It is live at [boxedbreathing.net](https://www.boxedbreathing.net).

The exercise screen combines an animated perimeter cue, phase prompts, a countdown, and optional ambient audio. Supporting pages explain the practice, link to research, and introduce other real-time stress-management approaches. The app is intended as a general wellness and educational aid—not medical advice.

## What the site does

1. Select an optional soundscape (binaural beats, ocean waves, cat purring, forest, or rain).
2. Press **Start**.
3. Follow the dot around the square and the center prompt through four equal phases:
   - Breathe in
   - Hold
   - Breathe out
   - Hold
4. At the end of the cycle, either repeat it or visit the alternatives page.

The default pace is four seconds per phase, so one cycle lasts 16 seconds. Users can switch between light and dark themes; their theme preference is stored locally in the browser.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Redirects to `/home`. |
| `/home` | The guided timer, sound selector, plain-language instructions, and comfort guidance. |
| `/the-science` | An overview of box breathing, a visual phase diagram, a general-health disclaimer, and research references. |
| `/alternatives` | Educational material and safety notice for physiological sighs, cold exposure, binaural beats, humming, and bilateral stimulation. |

The app also generates a sitemap, robots policy, page-specific social metadata, Open Graph/Twitter cards, and Schema.org JSON-LD for the website and timer.

## Technology

- [Next.js](https://nextjs.org/) 15 with the App Router and Turbopack
- React 19 and TypeScript
- Tailwind CSS 4 for styling and theming
- `react-icons` for interface and educational illustrations
- Vercel Analytics

Audio is served as static assets from `public/audio`; no audio service or database is required.

## Run locally

### Prerequisites

- Node.js 18.18 or newer
- npm (the committed lockfile is for npm)

### Install and start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/home`.

Before starting for the first time, create `.env.local` using the values in [Configuration](#configuration).

### Other commands

```bash
# Production build
npm run build

# Serve a production build
npm start

# Lint the project
npm run lint
```

## Configuration

The timer uses public environment variables, so their values are embedded into the client bundle at build time.

| Variable | Required | Example | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_BREATHING_INTERVAL_IN_SECONDS` | Yes | `4000` | Duration of **one phase in milliseconds**. Despite the legacy variable name, the implementation reads this value as milliseconds. Use `4000` for the standard four-second pace. |
| `URL_SELF` | Recommended | `https://www.boxedbreathing.net` | Public site origin used for canonical URLs, sitemap URLs, and structured data. |

Create `.env.local` for local development:

```dotenv
URL_SELF=http://localhost:3000
NEXT_PUBLIC_BREATHING_INTERVAL_IN_SECONDS=4000
```

Production uses the same variables with the public production origin. Do not commit credentials or private values to a `NEXT_PUBLIC_*` variable.

## Project structure

```text
src/
├── app/
│   ├── components/                 # Timer, sound picker, navigation, theme toggle, JSON-LD, SVG art
│   ├── alternatives/page.tsx       # Alternative technique content
│   ├── home/page.tsx               # Primary guided exercise page
│   ├── the-science/page.tsx        # Educational and references page
│   ├── layout.tsx                  # Shared navigation, footer, theme bootstrapping, analytics
│   ├── middleware.ts                # Redirects / to /home
│   ├── site-url.ts                 # Validated public-origin helper
│   ├── sitemap.ts / robots.ts       # Search-engine metadata routes
│   └── social-metadata.ts           # Open Graph and Twitter metadata helpers
├── types/Sound.ts                   # Sound-selection model
└── utils/                           # Countdown formatting helpers
public/
├── audio/                           # Bundled optional soundscapes
└── og-card.jpg                      # Social-sharing image
```

## Implementation notes

- The central timer component is [`src/app/components/BoxedBreathinSimulator.tsx`](src/app/components/BoxedBreathinSimulator.tsx). It manages the countdown, phase messaging, dot movement, audio start/stop behavior, reset flow, and completion view.
- The spelling of `BoxedBreathinSimulator` is part of the existing filename and import path.
- [`SoundSelection.tsx`](src/app/components/SoundSelection.tsx) creates browser `Audio` objects only on the client, avoiding server-rendering access to browser APIs.
- Dark mode is controlled with an `html.dark` class and is persisted under the `theme` key in `localStorage`.
- The site is deliberately informational. Its content asks users to stop if they feel unwell and to seek appropriate professional guidance for health concerns.

## Content and accessibility considerations

When extending the app, preserve the safety framing around breath holds, cold exposure, and anxiety-related content. Keep animation usable with reduced-motion preferences, provide meaningful labels for interactive controls, and avoid presenting wellness information as diagnosis or treatment.

If you add a route, update both `src/app/sitemap.ts` and navigation where appropriate. If you change the public domain, set `URL_SELF` for the deployment so canonical metadata and structured data remain correct.

## License

This project is distributed under the repository’s [Strict No-Rights License](LICENSE). No permission to use, copy, modify, or distribute the materials is granted without the copyright holder’s express written permission.
