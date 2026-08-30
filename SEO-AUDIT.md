# Independent SEO Audit

**Project:** Boxed Breathing Timer

**Audit date:** 30 August 2026
**Method:** Source-code review of the current repository only. The previous audit was not consulted. No live crawl, Search Console data, backlink analysis, performance field data, or external validation was used.

## Executive summary

The project has a good technical SEO baseline: it uses Next.js metadata APIs, supplies distinct titles and descriptions for the three indexable content routes, exposes a sitemap and robots file, and includes WebSite and WebApplication JSON-LD. The science page also has useful source links and a medical-information disclaimer.

Public-site URL configuration is centralized in `src/app/site-url.ts`. It supplies a single HTTPS fallback when `URL_SELF` is absent, normalizes configured values to an origin, and produces a clear error for malformed or non-HTTP(S) values. Canonical handling is also correctly configured for the installed Next.js version: its resolver expands the inherited `"./"` canonical against each current route pathname.

From a content-quality perspective, the exercise page is very thin for search. Its only page-level heading is visually hidden and there is no crawlable explanation of the method, instructions, safety note, or internal path to the science page. The alternatives page contains health-related assertions but does not cite sources or identify an author/reviewer or review date. Those gaps are especially important for content concerning stress, anxiety, breathing, and physical responses.

## Audit scope and observed routes

| Route | Intended role | Indexing support in code |
| --- | --- | --- |
| `/` | Entry route | Middleware redirects to `/home` |
| `/home` | Interactive box-breathing timer | Unique title, description, Open Graph/Twitter metadata, WebApplication JSON-LD |
| `/the-science` | Educational article | Unique metadata, visible H1, four linked references |
| `/alternatives` | Alternative techniques article | Unique metadata, visible H1, disclaimer, anchored sections |

## Findings and priorities

### Passed — route-relative canonical URLs resolve per page

**Evidence:** `src/app/layout.tsx:20` sets `alternates.canonical` to `"./"`. In the installed Next.js 15.5.9 resolver, a value beginning with `./` is resolved relative to the current route pathname before being composed with `metadataBase`. Consequently, the inherited canonical resolves to `/home`, `/the-science`, and `/alternatives` on those routes.

**Why it matters:** This produces one self-referencing canonical for each indexable route while `/` redirects to `/home`.

**Recommendation:** Keep this implementation. After deployment, inspect each rendered `<link rel="canonical">` to confirm that the host comes from the intended `URL_SELF` value and that no proxy, base path, or future framework upgrade changes the output.

### Resolved — public-site URL configuration is safe and consistent

**Evidence:** `src/app/site-url.ts` centralizes the `URL_SELF` lookup, validates the protocol, normalizes the value to its origin, and provides the `https://www.boxedbreathing.net` fallback. `layout.tsx`, `sitemap.ts`, `robots.ts`, and `structured-data.ts` all import the shared value.

**Outcome:** `metadataBase`, sitemap URLs, the robots sitemap URL, and JSON-LD now share one public origin. An absent variable retains the intended production fallback, while malformed values fail with an actionable configuration error instead of producing inconsistent metadata.

**Remaining verification:** Confirm the configured `URL_SELF` in every deployment environment is the intended HTTPS canonical domain.

### High — add meaningful, visible, server-rendered content to `/home`

**Evidence:** `src/app/home/page.tsx:18` provides only a visually-hidden H1 around the timer component. The route has no explanatory body copy, how-to steps, safety guidance, or contextual links outside the interactive UI.

**Why it matters:** The main target page has little topical evidence for search engines and limited value for visitors who need to understand the technique before starting. A visually-hidden H1 alone is not a substitute for useful primary content.

**Recommendation:** Add concise static content below the timer: what box breathing is, the four phases and default timing, how to use the tool, a brief comfort/safety note, and relevant internal links to `/the-science` and `/alternatives`. Keep the copy factual and avoid promises of medical outcomes.

**Suggested content and placement:** Preserve the timer as the page's immediate focal point. Place a calm, single-column server-rendered content block below the simulator, separated by generous top margin and constrained to roughly the same readable width as the surrounding content (rather than adding a large hero above the controls). This keeps the start action visible without scrolling while giving search engines and first-time visitors useful context immediately after the exercise.

Use one visible page H1 above the timer—`Box Breathing Timer`—with one short, neutral sentence such as "Follow a guided 4-4-4-4 box-breathing pattern." Keep this introduction visually quiet (small supporting text, not a second hero). Below the simulator, use the following compact sequence:

1. **How to use this timer** (`h2`): a four-item horizontal row on wider screens or short ordered list on mobile: “Breathe in,” “Hold,” “Breathe out,” and “Hold,” each for four counts. State that the user can follow the on-screen cue and may select an optional sound. This directly supports the core “4-4-4-4 box breathing timer” intent without repeating the metadata verbatim.
2. **What is box breathing?** (`h2`): one brief paragraph identifying it as a paced, four-part breathing exercise, also known as square breathing. Do not claim that it treats anxiety, lowers blood pressure, or reliably changes a physiological measure; link the phrase “how box breathing works” to `/the-science` for the longer, referenced explanation.
3. **A comfortable way to begin** (`h2`): one or two sentences advising visitors to breathe gently, reduce or skip the holds if uncomfortable, and stop if they feel unwell or light-headed. This is useful safety guidance without making the exercise page feel clinical; link to `/alternatives` with descriptive copy such as “explore other calming techniques.”

Avoid a long FAQ, keyword lists, repeated calls to action, or large cards before the timer. Those would push the interactive tool below the fold and make a deliberately minimal experience feel promotional. If more detail is warranted later, keep it behind a native `<details>` disclosure labelled “Learn more about box breathing,” below the three core sections, so the essential copy remains visible and the page stays airy.

### High — improve health-content trust signals and citations

**Evidence:** `/the-science` includes a visible disclaimer and linked references (`src/app/the-science/page.tsx:179` onward). `/alternatives` has a disclaimer (`src/app/alternatives/page.tsx:88`) but the technique descriptions make physiological and mental-health claims without citations, author information, reviewer information, or an updated date.

**Why it matters:** Breathing, stress, anxiety, heart rate, blood pressure, and nervous-system statements fall near health content. Clear sourcing and accountability improve content quality and reduce the risk of unsupported or overstated claims.

**Recommendation:** Cite reliable primary research or recognized health institutions near substantive claims on both articles. Add an author/editor and "last reviewed" date, describe the editorial-review standard, and moderate absolute wording such as claims that a technique "immediately" produces a specified physiological result.

### Medium — complete the sitemap metadata and verify its deployed output

**Evidence:** `src/app/sitemap.ts` returns all three content routes and `src/app/robots.ts` references `/sitemap.xml`. Entries contain only `url`.

**Why it matters:** The route coverage is appropriate, but `lastModified` values help search engines prioritize recrawls after substantial content updates. Source review cannot establish whether the deployed responses, content types, redirects, and canonical host are correct.

**Recommendation:** Add accurate `lastModified` values when pages are changed. After deployment, fetch `/robots.txt` and `/sitemap.xml`, confirm HTTP 200 responses, validate the absolute URLs, and submit the sitemap in Google Search Console.

### Medium — strengthen internal linking and topic architecture

**Evidence:** The global navigation links the three main routes. The science page links back to `/home`; the timer completion state links to `/alternatives`. The home page has no static links to the science article, and the alternatives page has no contextual links back to the timer or science page.

**Why it matters:** Contextual links clarify the relationship between the tool and supporting educational content, distribute internal relevance, and give users obvious next steps.

**Recommendation:** Add descriptive in-content links, for example "learn the science behind box breathing" below the timer and "try the box-breathing timer" within the alternatives article. Do not rely only on header/footer navigation.

### Medium — align terminology with search intent

**Evidence:** The product/site name uses "Boxed Breathing" while page metadata and the H1 use "Box Breathing." The science page also uses "square breathing."

**Why it matters:** The variants are legitimate, but the primary term should be consistent in titles, headings, introductory copy, and schema while variants are introduced naturally.

**Recommendation:** Choose "box breathing" as the primary user-facing query term, keep the product brand if desired, and introduce "boxed breathing" and "square breathing" once as alternate names. Update the science-page H1 from "Boxed Breathing" to the chosen primary form for consistency.

### Low — enrich social metadata where account ownership exists

**Evidence:** `src/app/social-metadata.ts` sets Open Graph site name, locale, image, and Twitter `summary_large_image`, with per-page title/description. It does not set a Twitter/X site or creator account.

**Why it matters:** Social cards are already fundamentally supported. Account attribution is optional but can improve branding when a maintained account exists.

**Recommendation:** Add `twitter.site` and/or `twitter.creator` only for genuine maintained accounts. Verify that `public/og-card.jpg` is accessible at the production canonical domain and remains suitable for social-card dimensions.

## What is already working well

- Every indexable route has a distinct, descriptive title and meta description through `createPageMetadata`.
- Open Graph and Twitter card data are centralized and use a dedicated image.
- A `WebSite` schema is rendered in the layout, and `/home` adds a relevant `WebApplication` schema with useful feature details.
- `robots.ts` allows crawling and points to the generated sitemap.
- The root URL is redirected to `/home`, avoiding duplicate primary content at both paths.
- The science article contains a visible H1, explanatory content, a general-education disclaimer, and linked references.
- The alternatives sections use unique fragment IDs, making them linkable within the page.

## Validation performed

- `npm run lint` completed successfully with exit code 0.
- `npm run build` reached the optimized-build stage but could not complete in this environment because Next.js/Turbopack encountered `spawn EPERM`. This is an environment permission failure; it did not report an application compilation or lint error. Re-run the production build in CI or a normal local shell before release.

## Recommended implementation order

1. Add substantive static content and contextual internal links to the timer page.
2. Add citations, authorship/review details, and cautious health-claim language to the educational pages.
3. Add sitemap modification dates and verify live robots, sitemap, canonicals, rich results, and social cards after deployment.

## Limits of this audit

This assessment cannot determine current index coverage, rankings, query demand, crawl errors, Core Web Vitals, mobile usability, backlink quality, HTTP response headers, or the actual deployed domain configuration. Those require a live crawl and access to analytics/Search Console data.
