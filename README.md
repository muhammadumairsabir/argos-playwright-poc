# Argos CI + Playwright POC

This is a minimal Vite web app with Playwright visual tests and an Argos CI GitHub Actions pipeline.

## What is included

- A small static demo app under `src/`
- Playwright configuration in `playwright.config.ts`
- Visual tests in `tests/visual.spec.ts`
- GitHub Actions workflow in `.github/workflows/argos.yml`
- Argos-specific stability examples:
  - `argosScreenshot(...)`
  - multi-viewport snapshots
  - component-level screenshot
  - ARIA snapshot
  - masked dynamic runtime text via `data-visual-test="blackout"`
  - disabled animations during screenshots

## Prerequisites

- Node.js 20.19+ or Node.js 22+
- A GitHub repository
- An Argos project connected to the repository
- `ARGOS_TOKEN` stored as a GitHub Actions secret

## Local setup

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

Open the Playwright HTML report:

```bash
npm run show-report
```

Run the app manually:

```bash
npm run dev
```

## Argos setup

1. Create a project in Argos.
2. Connect the project to your GitHub repository.
3. Copy the project token from Argos project settings.
4. In GitHub, open **Settings → Secrets and variables → Actions → New repository secret**.
5. Create a secret named `ARGOS_TOKEN` and paste the Argos project token.

The workflow uses this secret here:

```yaml
env:
  ARGOS_TOKEN: ${{ secrets.ARGOS_TOKEN }}
```

## First baseline run

Argos needs a reference build before it can compare pull-request screenshots.

1. Commit this project to `main`.
2. Push `main` to GitHub.
3. Let the `Argos Visual Tests` workflow finish.
4. Confirm that the build appears in Argos.

If the first build is shown as orphaned, run the workflow on the reference branch, usually `main`, so Argos has a baseline.

## Create a visual difference

Create a new branch:

```bash
git checkout -b demo/visual-change
```

Edit `src/styles.css`, for example change the hero title size or plan-card spacing:

```css
h1 {
  font-size: clamp(2.2rem, 7vw, 5rem);
}
```

Commit and push:

```bash
git add .
git commit -m "Demo visual change"
git push -u origin demo/visual-change
```

Open a pull request into `main`. GitHub Actions will run Playwright. The Argos reporter will upload the screenshots. Argos will compare the branch screenshots against the `main` baseline.

## See visual differences in Argos

1. Open the pull request in GitHub.
2. Wait for the Argos check to finish.
3. Click **Details** on the Argos check.
4. Review the baseline, current screenshot, and visual diff mask in Argos.
5. Approve expected changes or request changes for regressions.

## Optional CLI review commands

This POC includes `@argos-ci/cli` for optional inspection from the terminal.

Login locally:

```bash
npm exec -- argos login
```

Inspect a build:

```bash
npm exec -- argos build get <ARGOS_BUILD_URL>
```

List snapshots that need review:

```bash
npm exec -- argos build snapshots <ARGOS_BUILD_URL> --needs-review --json
```

Approve a build:

```bash
npm exec -- argos build review <ARGOS_BUILD_URL> --conclusion approve
```

Request changes:

```bash
npm exec -- argos build review <ARGOS_BUILD_URL> --conclusion request-changes
```

## Notes for production use

- Keep screenshots deterministic: disable animations, mask dates/times, and wait for fonts/images.
- Add more tests for critical pages and reusable UI components.
- Keep the reference branch stable. Most teams use `main`.
- Use a locked dependency file once the POC is accepted: run `npm install`, commit `package-lock.json`, and change the workflow install step to `npm ci`.
