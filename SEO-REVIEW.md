# SEO Review — Boxed Breathing Timer

**Review date:** 2 September 2026  
**Scope:** Current source code and a limited production reachability check. This is a technical and content SEO review; it does not include Google Search Console, analytics, rankings, backlink data, or CrUX/Core Web Vitals data.

## Executive assessment

The site has a strong technical baseline for a small three-page Next.js site. It provides unique route metadata, Open Graph and Twitter cards, self-referencing canonical configuration, XML sitemap and robots routes, a root-to-home redirect, and useful JSON-LD. The primary timer page also now has meaningful server-rendered explanatory and safety content instead of being only an interactive widget.

The largest opportunity is **content trust and depth**, not basic crawlability. Because the site discusses breathing, anxiety, heart rate, blood pressure, and cold exposure, its educational pages should use cautious wording, clear authorship/review details, and citations close to claims—especially on the alternatives page. After that, improve discoverability through internal contextual links, page-level schema for articles, and production validation in Search Console.

## Current state

| Area | Assessment | Evidence |
| --- | --- | --- |
| Crawl discovery | Good | `src/app/robots.ts` allows crawling and references the generated sitemap. |
| URL coverage | Good | `src/app/sitemap.ts` includes `/home`, `/the-science`, and `/alternatives`; middleware redirects `/` to `/home`. |
| Titles and descriptions | Good | Each indexable route uses a distinct, descriptive title and meta description through `createPageMetadata`. |
| Canonicals | Good in source; validate live | `layout.tsx` sets `metadataBase` from the shared `siteUrl` and uses a route-relative canonical (`"./"`). |
| Social sharing | Good | Shared Open Graph and Twitter definitions include a large-card image, title, description, locale, and site name. |
| Structured data | Good foundation | The layout emits `WebSite` JSON-LD and `/home` emits `WebApplication` JSON-LD. |
| On-page content | Good on home and science; uneven elsewhere | `/home` has visible explanatory sections and internal links; `/the-science` has an H1, explanatory copy, disclaimer, and sources. |
| Health-content trust | Needs improvement | The alternatives page contains substantial physiological and mental-health claims but no citations, author/reviewer, or updated date. |
| Performance SEO | Needs measurement | No field/lab metrics are available. The embedded image data in `BilateralStimulationIcon.tsx` deserves a bundle and page-weight review. |

## What is working well

### Metadata is route-specific and maintainable

`src/app/social-metadata.ts` centralizes social-card defaults while every indexable route supplies its own title and description. The main query intent is represented well on `/home` with “Box Breathing Timer (4-4-4-4),” while the supporting pages target science and stress-relief intent without duplicating the same title.

### Public URLs are centralized

`src/app/site-url.ts` validates `URL_SELF`, requires HTTP(S), normalizes it to an origin, and feeds the layout, sitemap, robots route, and structured data. This is a sound way to prevent mismatched domains across canonical URLs, XML sitemap URLs, and JSON-LD.

### Search engines can understand the site’s core pages

The three public content routes are linked in primary navigation, listed in the sitemap, and crawlable under the robots policy. The root redirect avoids serving the primary experience at both `/` and `/home`.

### The main experience is no longer a thin interactive page

`src/app/home/page.tsx` includes a visible H1, how-to-use steps, a concise definition of box breathing, comfort guidance, and contextual links to the science and alternatives pages. This gives crawlers and visitors useful content without obscuring the timer.

### The science page has useful editorial signals

`src/app/the-science/page.tsx` has a visible H1, a general-education disclaimer, and linked research/health references. Its copy also encourages visitors to use a comfortable pace and stop if unwell.

## Findings and recommendations

### High priority — raise the evidence and trust standard for health-adjacent content

**Evidence:** The alternatives page makes specific statements about stress, anxiety, vagus-nerve activity, brainwaves, heart rate, blood pressure, and the diving reflex. Its disclaimer is helpful, but there are no citations, author attribution, medical review, or “last reviewed” date. The sound-picker descriptions make similarly specific physiological claims.

**Why it matters:** These claims can influence health decisions. A disclaimer does not establish that the claims are well-supported or appropriately qualified.

**Recommendation:**

1. Add citations next to material claims on `/alternatives`, prioritizing systematic reviews, primary research, and reputable health institutions.
2. Add an author/editor, an editorial or medical-review policy where appropriate, and a genuine `Last reviewed` date to the science and alternatives content.
3. Replace absolute or rapid-outcome language (“immediately,” “restores calm,” “lowers heart rate”) with evidence-calibrated wording such as “may help some people feel calmer” where the evidence supports it.
4. Review the audio descriptions too. Either cite them, reduce them to neutral descriptions of the sound, or avoid implying clinical effects.

### High priority — validate production indexing signals after every release

**Evidence:** Source code generates the expected metadata routes, but a live request from this review environment timed out and therefore could not confirm the deployed response headers, redirects, rendered canonicals, robots policy, sitemap, or social-card image.

**Recommendation:** In a normal networked environment and Google Search Console, verify:

- `/` performs one permanent redirect to `https://www.boxedbreathing.net/home`.
- `/robots.txt` returns `200`, permits the three intended routes, and names the HTTPS sitemap.
- `/sitemap.xml` returns `200`, includes only canonical HTTPS URLs, and has no redirects or staging hosts.
- Each public page has one indexable `200` response, one canonical URL pointing to itself, and no accidental `noindex` directive.
- The Open Graph image loads successfully, is at the expected public URL, and renders acceptably in social-card debuggers.
- The sitemap is submitted in Search Console and the URL Inspection tool reports the expected canonical as Google-selected.

### Medium priority — add article-level structured data and editorial details

**Evidence:** Existing `WebSite` and `WebApplication` markup are appropriate, but the two educational pages do not describe themselves as articles. There is no author, publisher, date published/modified, or article image data in schema.

**Recommendation:** Add valid `Article` or `WebPage` JSON-LD to `/the-science` and `/alternatives` only when the corresponding on-page author, reviewed date, and editorial details are real and visible. Include `headline`, `description`, `mainEntityOfPage`, `dateModified`, `author`, and `publisher` as applicable. Do not add medical-review schema merely as markup if no qualified review took place.

### Medium priority — improve contextual internal links and topic flow

**Evidence:** `/home` links naturally to both supporting pages. Navigation links all pages, but `/alternatives` has no prominent contextual route back to the timer or science page, and the science page only links back to the timer near its end.

**Recommendation:** Add short, descriptive in-content links:

- On `/alternatives`: “Try the guided box-breathing timer” and, where relevant, “Read the evidence and caveats behind paced breathing.”
- On `/the-science`: add a contextual link to the alternatives page for visitors who find holds uncomfortable.
- Keep links helpful and editorial; do not add repetitive keyword-heavy link blocks.

### Medium priority — expand content only around demonstrated user intent

**Evidence:** The site currently has one interactive tool and two supporting educational pages. That is coherent, but it limits entry points for related searches.

**Recommendation:** Use Search Console query data before creating new pages. Potential high-value additions, if they can be genuinely useful and well sourced, include a short “how to do box breathing” guide, guidance for people who find breath holds uncomfortable, and an FAQ addressing timer use and safe pacing. Avoid thin, near-duplicate pages for every breathing variation or condition.

### Low priority — enrich sitemap entries with accurate modification dates

**Evidence:** `src/app/sitemap.ts` returns URLs only.

**Recommendation:** Add `lastModified` when a page materially changes. Use a truthful content date or a build/content-source date—not a value that changes on every deployment without an editorial change. This is a secondary signal; route coverage and canonical consistency matter more.

### Resolved — terminology is standardized without losing useful variants

**Implementation:** “Box breathing” is now the primary generic term in site descriptions, schema, headings, and explanatory copy. “Boxed Breathing Timer” remains the product name, while “boxed breathing” and “square breathing” are introduced naturally as alternate names in the science content.

**Why this helps:** It gives search engines and visitors a consistent primary phrase while retaining legitimate query variants without keyword repetition.

### Low priority — measure page weight and Core Web Vitals

**Evidence:** No performance measurements were available. `BilateralStimulationIcon.tsx` contains a large inline base64 raster asset; inline assets can increase JavaScript/HTML payload and reduce caching efficiency.

**Recommendation:** Run Lighthouse and PageSpeed Insights for mobile and desktop, then measure real-user Core Web Vitals in Search Console/CrUX where available. If the icon materially affects transfer size or LCP, move the raster asset to `public/`, optimize it, define dimensions, and load it appropriately. Do not optimize blindly before measuring.

## Recommended implementation order

1. Add citations, authorship/review information, accurate dates, and evidence-calibrated wording to health-adjacent content.
2. Validate production robots, sitemap, redirects, canonicals, rendered metadata, and rich-result eligibility; submit/monitor in Search Console.
3. Add article-level schema that matches real visible editorial data.
4. Add a few contextual internal links and use query data to prioritize any new educational content.
5. Measure performance and address any verified page-weight or Core Web Vitals issue.

## Validation limits

This review verifies the current code paths only. It cannot determine actual index coverage, rankings, crawl errors, backlinks, traffic, search queries, or field performance. The deployed-site checks attempted during the review timed out from this environment, so live behavior must be confirmed from an unrestricted network and in webmaster tools.
