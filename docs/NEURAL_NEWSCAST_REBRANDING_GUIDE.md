# Neural Newscast Rebranding Guide

This document maps where to customize this codebase to rebrand from World Monitor to Neural Newscast (neuralnewscast.com).

## 1) Quick start checklist

1. Replace web icons and social images in `public/favico/`.
2. Update SEO/app metadata in `index.html` and variant metadata in `vite.config.ts`.
3. Update header branding and outbound links in `src/app/panel-layout.ts`.
4. Update color palette and typography in `src/styles/main.css` (and optionally `src/styles/happy-theme.css`).
5. Update story/share branding in `src/services/story-renderer.ts`, `src/services/story-share.ts`, `src/services/meta-tags.ts`, and `src/services/happy-share-renderer.ts`.
6. Update desktop app names/icons in `src-tauri/tauri*.conf.json`, `src-tauri/Cargo.toml`, and `src-tauri/icons/*`.
7. Update domain/CSP allowlists in `index.html`, `vercel.json`, and `src/services/runtime.ts`.
8. Update release and community links in `api/download.js`, `api/version.js`, `src/components/CommunityWidget.ts`, and `src/components/UnifiedSettings.ts`.
9. Update visible copy in `src/locales/en.json` (and other locales if needed).

## 2) Where to store logos and icons

Use existing static asset conventions:

- Primary web favicon set: `public/favico/`
- Variant favicon sets: `public/favico/tech/`, `public/favico/finance/`, `public/favico/happy/`
- Social preview image (`og:image`): `public/favico/og-image.png` and variant copies
- Story renderer logo source currently: `public/favico/worldmonitor-icon-1024.png`
- Desktop app icons: `src-tauri/icons/` (plus platform subfolders like `src-tauri/icons/ios/`, `src-tauri/icons/android/`)

Recommended Neural Newscast convention:

- Keep compatibility by replacing files in current locations.
- Optionally add `public/brand/` for larger brand assets, then point code to these assets where needed.

## 3) Web title, SEO, social cards, canonical URL

Edit base tags in:

- `index.html`

Update at minimum:

- `<title>`, `meta[name="title"]`, `meta[name="description"]`, `meta[name="keywords"]`
- `<link rel="canonical">`
- OpenGraph tags (`og:url`, `og:title`, `og:description`, `og:image`, `og:site_name`)
- Twitter tags (`twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site`, `twitter:creator`)
- JSON-LD block (`name`, `alternateName`, `url`, `description`, `featureList`, `screenshot`, `author`)

Build-time per-variant metadata is controlled in:

- `vite.config.ts` (`VARIANT_META` + `htmlVariantPlugin`)

If you want all variants to use Neural Newscast naming/domains, update `VARIANT_META` entries there.

## 4) Header branding, variant links, and social links

Main header markup is in:

- `src/app/panel-layout.ts`

Key items to rebrand:

- Text logo (`MONITOR`)
- Variant links (`https://worldmonitor.app`, `https://tech.worldmonitor.app`, etc.)
- Credit link currently pointing to X account
- GitHub link currently pointing to `github.com/koala73/worldmonitor`
- Optional variant labels (for example, replacing `WORLD/TECH/FINANCE` with your own naming)

Variant switch behavior is handled in:

- `src/app/event-handlers.ts` (stores `worldmonitor-variant` and reloads)

If you rename variants or domains, update both files.

## 5) Color scheme and typography

Global tokens are in:

- `src/styles/main.css`

Change CSS variables under `:root` and `[data-theme="light"]` for full re-skin:

- Background/surface: `--bg`, `--surface`, etc.
- Text: `--text`, `--text-secondary`, etc.
- Semantic/status colors: `--semantic-*`, `--status-*`, `--threat-*`
- Typography: `--font-mono`, `--font-body`

Happy variant override theme is in:

- `src/styles/happy-theme.css`

Header switcher visuals are also styled in:

- `src/styles/main.css` (`.variant-switcher`, `.variant-option`, `.logo`)

## 6) Map look and map style branding

Map base style behavior:

- `src/components/DeckGLMap.ts`

Happy variant uses local styles:

- `public/map-styles/happy-light.json`
- `public/map-styles/happy-dark.json`

You can:

- Replace these style JSON files with Neural Newscast map styling.
- Point `DeckGLMap.ts` to your own map style URL/JSON for non-happy variants too.

## 7) Sharing and generated image branding

Country/story share cards:

- `src/services/story-renderer.ts`

Update:

- `LOGO_URL`
- Rendered text such as `WORLDMONITOR`, `WORLDMONITOR.APP`, and tagline text

Share links and share text templates:

- `src/services/story-share.ts`

Update:

- Base deep-link URL (`https://worldmonitor.app/...`)
- Mentioned brand names in share copy
- Any social destination behavior you want to change

Dynamic OG/Twitter meta logic:

- `src/services/meta-tags.ts`

Update:

- `BASE_URL`, `DEFAULT_IMAGE`
- Default and story titles/descriptions using `World Monitor`

Happy share card watermark text:

- `src/services/happy-share-renderer.ts`

## 8) App settings windows and standalone window titles

Edit page titles and brand text in:

- `settings.html`
- `live-channels.html`
- `src/settings-window.ts`

If you want full consistency, also update related localized strings in:

- `src/locales/en.json`

## 9) Desktop (Tauri) app branding

Primary desktop identity is in:

- `src-tauri/tauri.conf.json`
- `src-tauri/tauri.tech.conf.json`
- `src-tauri/tauri.finance.conf.json`
- `src-tauri/Cargo.toml`

Update values such as:

- `productName`
- `mainBinaryName`
- `identifier`
- Window `title`
- Bundle `shortDescription` and `longDescription`

Replace app icons in:

- `src-tauri/icons/*`

## 10) Domains, CORS/CSP, and runtime allowlists

If migrating from `*.worldmonitor.app` to `neuralnewscast.com` (or subdomains), update all allowlists.

Main files:

- `index.html` (CSP meta `frame-src` and related references)
- `vercel.json` (`Content-Security-Policy` header values)
- `src/services/runtime.ts`

In `src/services/runtime.ts`, update:

- Default remote hosts
- `APP_HOSTS` set
- Domain suffix checks (`.worldmonitor.app`)
- Redirect allowlist regex (`ALLOWED_REDIRECT_HOSTS`)
- Any desktop cloud fallback default URL

## 11) Downloads, release links, and community links

Update GitHub repo references and release endpoints in:

- `api/download.js`
- `api/version.js`
- `src/components/UnifiedSettings.ts` (`DESKTOP_RELEASES_URL`)
- `src/components/CommunityWidget.ts` (discussion URL)

## 12) Product copy and visible naming

Primary language file:

- `src/locales/en.json`

Search and update strings like:

- `World Monitor`
- Header labels and descriptions
- Settings and onboarding/license copy

If you support multilingual UIs, replicate changes in other `src/locales/*.json` files.

## 13) Build/runtime naming and storage keys

Variant + theme localStorage keys currently use `worldmonitor-*` naming across code (for example: theme and variant keys).

Key files:

- `index.html` inline script
- `src/config/variant.ts`
- `src/utils/theme-manager.ts`
- `src/App.ts`
- `src/app/event-handlers.ts`

These keys can stay as-is (safe), or be renamed to `neuralnewscast-*` if you want a clean namespace. If renamed, do it consistently.

## 14) Optional: README and docs rebrand

For public-facing consistency, update repository/docs branding references in:

- `README.md`
- `docs/DOCUMENTATION.md`
- Other docs under `docs/` that mention World Monitor domains or names

## 15) Validation after rebrand

Run at least:

- `npm run typecheck`
- `npm run build`
- `npm run test:data`

For UI verification:

- `npm run dev` and check web metadata, favicon, header links, and share flows
- `npm run desktop:dev` and confirm Tauri title/icons/links

## 16) Notes about generated files

Do not hand-edit generated outputs:

- `src/generated/**`
- `docs/api/**`

Rebranding changes should stay in source/config, not generated artifacts.
