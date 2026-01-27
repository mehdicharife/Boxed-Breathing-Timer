# Boxed Breathing Timer

A small Next.js (TypeScript, React) app that provides a boxed-breathing timer and related breathing/relaxation tools. Includes a simulator, sound selection, dark mode support, and an "alternatives" section with other breathing/relaxation techniques.

## Features
- Boxed breathing simulator UI
- Sound selection (audio assets in public/audio)
- Dark mode toggle
- Alternatives section with cards and illustrations
- Small utilities for time formatting and clock handling

## Quick start

Prerequisites:
- Node.js (16+ recommended)
- npm or yarn

Install and run locally:
1. Install dependencies
    - npm: `npm install`
    - yarn: `yarn`

2. Run development server
    - npm: `npm run dev`
    - yarn: `yarn dev`

3. Open http://localhost:3000

Build for production:
- npm: `npm run build` then `npm start`
- yarn: `yarn build` then `yarn start`

(Adjust scripts to match package.json if different.)

## Project structure
- app/ — Next.js app router (pages, layout, globals.css)
  - components/ — UI components (BoxedBreathinSimulator, SoundSelection, DarkModeSwitchButton, icons)
  - home/, the-science/, alternatives/ — route pages
- public/audio/ — audio assets used by the app
- types/ — TypeScript types (Sound)
- utils/ — helper utilities (clockify, timify)
- middleware.ts — request middleware

## Development notes
- UI is componentized; start in app/components/BoxedBreathinSimulator.tsx for core timer logic.
- Audio files are served from public/audio; reference with `/audio/<file>` in the app.
- Styling entry: app/globals.css.