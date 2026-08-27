# SEO audit - Boxed Breathing Timer

**Audit date:** 27 August 2026  
**Scope:** Source-code review of the Next.js app. This is not a live-site crawl, so Core Web Vitals, index coverage, response headers, and backlinks were not measured.

## Executive summary

The project has a sound technical foundation for SEO: it uses Next.js App Router, renders public content as normal route pages, declares an English document language, has a favicon, and redirects the root URL to the main experience.

Its SEO implementation is still minimal. All public routes inherit the same generic title and description, and key discovery, canonicalization, social-sharing, and structured-data features are absent.

Highest-value next steps: add per-page metadata, a production site URL and canonical URLs, `robots.txt` and `sitemap.xml`, and an Open Graph image. Correct the heading hierarchy on content pages.

## Current state

### What is already working

- **Search-readable rendering:** Good. Public content is rendered by Next.js route components in `src/app`, so crawlers can receive it without needing to interact with the page.
- **Root URL:** Good. `src/middleware.ts` redirects `/` to `/home`, avoiding a thin placeholder homepage.
- **Document language:** Good. `src/app/layout.tsx` sets `<html lang="en">`.
- **Base metadata:** Partial. The layout declares the site name and a short description.
- **Internal linking:** Partial. Navigation and footer link to all core routes. Alternative cards link to their relevant sections.
- **Responsive design:** Likely good. Tailwind responsive classes are used extensively, and Next.js supplies a responsive default viewport.

### Missing or needs improvement

- **Unique page metadata:** Missing. `/home`, `/the-science`, and `/alternatives` all inherit generic metadata because they do not export `metadata` or `generateMetadata`.
- **Canonical URLs:** Missing. There is no `metadataBase`, `alternates.canonical`, or canonical link. Search engines may see host or query-string variants as separate pages.
- **Crawling and discovery:** Missing. The project has no `src/app/robots.ts`, `public/robots.txt`, `src/app/sitemap.ts`, or `public/sitemap.xml`.
- **Social sharing metadata:** Missing. There is no Open Graph, Twitter/X card, or share-image configuration.
- **Heading hierarchy:** Needs work. The global header, breathing simulator, and each alternative section use `h1` elements. Each page should normally have one descriptive `h1`; component labels and section titles should use lower-level headings or paragraphs.
- **Images and visual search:** Limited. The site uses inline SVGs and has no social preview image. Meaningful illustrations should retain adjacent descriptive text.
- **Structured data:** Missing. No JSON-LD is present. `WebSite` and `WebApplication` schema would clarify the site's purpose. Add `FAQPage` schema only if a genuine FAQ is added.
- **Performance / Core Web Vitals:** Unverified. Local MP3 files and the client-side animation need a production Lighthouse test. Loading Poppins through `next/font` is a positive detail.
- **Accessibility signals:** Needs review. No automated accessibility test was run. `SoundSelection.tsx` nests an interactive control inside a button, which can weaken keyboard and screen-reader behavior.

## Prioritized recommendations

### P0: establish crawl and URL fundamentals

1. Set `metadataBase` in `src/app/layout.tsx` to the final HTTPS production URL. Do not use a placeholder domain in production.
2. Add a canonical URL for each indexable page using `alternates.canonical`.
3. Create `src/app/robots.ts` that allows the public site and points to the sitemap.
4. Create `src/app/sitemap.ts` containing `/home`, `/the-science`, and `/alternatives`. Keep `/` out if it permanently redirects to `/home`.

### P1: improve route metadata and sharing

1. Export unique metadata from each route. Suggested starting copy:

   - `/home`
     - Title: `Box Breathing Timer | Guided 4-4-4-4 Exercise`
     - Description: `Follow a guided box-breathing timer with visual pacing and optional calming sounds to pause, focus, and reset.`
   - `/the-science`
     - Title: `The Science of Box Breathing | Boxed Breathing Timer`
     - Description: `Learn how the four-part box-breathing pattern may support relaxation, focus, and stress management.`
   - `/alternatives`
     - Title: `Stress-Relief Breathing Alternatives | Boxed Breathing Timer`
     - Description: `Explore physiological sighs, humming, calming sounds, bilateral stimulation, and other real-time stress-relief techniques.`

2. Add Open Graph and Twitter card data, including a purpose-built 1200 by 630 pixel share image. Use a Next.js `opengraph-image.tsx` route or a static image in `public`.
3. Add JSON-LD for `WebSite` and `WebApplication` on the main exercise page. Include only claims that accurately reflect the product; avoid unsupported medical claims.

### P2: improve content semantics and quality

1. Use one page-level `h1` per route.
   - Change the site name in the global header to a paragraph, div, or link.
   - Change the simulator's changing instruction and completion message to `p` or `h2` as appropriate.
   - On `/alternatives`, retain the page title as `h1` and change each technique section title to `h2`.
2. Replace the duplicated introductory paragraph in `src/app/the-science/page.tsx` with distinct, well-edited content. Fix visible encoding and typo issues, including `you&apos;sre`.
3. Cite reputable sources for health-related explanatory claims and state limits clearly. The alternatives page already has a useful disclaimer, but citations and careful wording would strengthen trust signals.
4. Add an editorial `last reviewed` date and author/reviewer information to science and health-adjacent content if the site intends to compete for health queries.

### P3: validate implementation and performance

1. Replace internal raw anchors with `next/link` where appropriate, while retaining standard anchors for hash links and external links.
2. Resolve the current ESLint warning in `src/app/components/SoundSelection.tsx` before release. The audit command completed with one warning and zero errors.
3. Build the production app, then test every route with Lighthouse (mobile and desktop), Google Search Console URL Inspection, Rich Results Test, and the Facebook/LinkedIn share debuggers after deployment.
4. Monitor Search Console for indexing, sitemap processing, canonical selection, and search queries. Add privacy-respecting analytics/conversion measurement only if it aligns with the project's policy.

## Suggested implementation order

1. Confirm the production domain.
2. Add `metadataBase`, route metadata, canonical URLs, `robots.ts`, and `sitemap.ts`.
3. Create a branded social preview image and configure Open Graph/Twitter metadata.
4. Correct heading hierarchy, duplicate content, encoding, and factual support.
5. Deploy and complete live validation in Search Console and Lighthouse.

## Files reviewed

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/home/page.tsx`
- `src/app/the-science/page.tsx`
- `src/app/alternatives/page.tsx`
- `src/app/components/BoxedBreathinSimulator.tsx`
- `src/app/components/SoundSelection.tsx`
- `src/app/components/AlternativeCard.tsx`
- `src/app/components/AlternativeSection.tsx`
- `src/middleware.ts`
- `next.config.ts`
