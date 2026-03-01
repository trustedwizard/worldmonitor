# Repository Guidelines

## Project Structure & Module Organization
Core app code lives in `src/` (UI panels in `src/components/`, data/domain logic in `src/services/`, static config in `src/config/`). Edge endpoints are in `api/`, while typed RPC handlers are in `server/worldmonitor/<domain>/v1/`. Proto contracts live in `proto/`, and generated stubs are written to `src/generated/` and `docs/api/` (treat generated outputs as build artifacts). End-to-end tests are in `e2e/`; data and handler tests are in `tests/`. Desktop packaging/runtime files are under `src-tauri/`.

## Build, Test, and Development Commands
- `npm run dev` (or `dev:tech`, `dev:finance`, `dev:happy`): start Vite locally.
- `npm run build` (or `build:full|tech|finance|happy`): type-check and produce production bundles.
- `npm run typecheck` and `npm run typecheck:api`: strict TS checks for app and API.
- `npm run test:data`: run unit/data tests in `tests/`.
- `npm run test:e2e` and `npm run test:e2e:visual`: Playwright runtime + visual suites.
- `make generate`: regenerate Proto-based client/server code and OpenAPI docs.
- `make lint` / `make breaking`: lint proto files and detect breaking API changes.

## Coding Style & Naming Conventions
Use TypeScript with strict typing (`strict`, `noUncheckedIndexedAccess`, no unused locals/params). Follow existing formatting: 2-space indentation, semicolons, and single quotes in TS files. Prefer descriptive domain filenames like `list-<resource>.ts`, `get-<resource>.ts`, and `handler.ts` under each service version folder. Do not hand-edit `src/generated/**`.

## Testing Guidelines
Add or update tests for behavior changes:
- `tests/*.test.mjs|mts` for handlers, caching, data transforms.
- `e2e/*.spec.ts` for user-visible flows and regressions.
For visual map changes, run `npm run test:e2e:visual:update` and review snapshot diffs before committing.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commits with scopes, e.g. `feat(market): ...`, `fix(map): ...`, `perf(...): ...`, `ui(...): ...`. Keep subject lines imperative and focused; reference PR/issue IDs when available. PRs should include:
- clear problem/solution summary,
- linked issue(s),
- test evidence (commands run),
- screenshots/GIFs for UI changes.

## Security & Configuration Tips
Copy `.env.example` to `.env.local`; never commit secrets. Verify API/desktop version sync with `npm run version:check` (also enforced in `.husky/pre-push`).
