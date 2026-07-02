import './styles.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <main class="page-shell">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">Visual regression POC</p>
        <h1 id="hero-title">OLI Move visual POC with Playwright and Argos CI</h1>
        <p class="lead">
          A small app that captures stable UI screenshots in Playwright and uploads them to Argos CI from GitHub Actions.
        </p>
        <div class="hero-actions">
          <a class="button primary" href="#plans">View plans</a>
          <a class="button secondary" href="#workflow">See workflow</a>
        </div>
        <p class="runtime-note" data-testid="clock" data-visual-test="blackout">
          Runtime stamp: <span id="clock-value"></span>
        </p>
      </div>

      <aside class="hero-card" aria-label="POC status">
        <span class="status-pill">Ready for CI</span>
        <h2>Argos check</h2>
        <p>Baseline screenshots come from the reference branch. Pull requests show visual differences for review.</p>
        <dl>
          <div><dt>Tooling</dt><dd>Vite + Playwright</dd></div>
          <div><dt>Uploads</dt><dd>Argos reporter</dd></div>
          <div><dt>Review</dt><dd>GitHub PR check</dd></div>
        </dl>
      </aside>
    </section>

    <section id="workflow" class="workflow" aria-labelledby="workflow-title">
      <p class="eyebrow">How it works</p>
      <h2 id="workflow-title">One pull-request visual review loop</h2>
      <div class="steps">
        <article>
          <span>01</span>
          <h3>Capture</h3>
          <p>Playwright opens the app and <code>argosScreenshot</code> records stable screenshots.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Upload</h3>
          <p>The Argos reporter uploads screenshots and traces when the tests run in CI.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Review</h3>
          <p>Argos compares the pull request against the baseline and exposes visual diffs.</p>
        </article>
      </div>
    </section>

    <section id="plans" class="plans" data-testid="plans" aria-labelledby="plans-title">
      <p class="eyebrow">Demo component</p>
      <h2 id="plans-title">Charging operations packages</h2>
      <div class="plan-grid">
        <article class="plan-card">
          <h3>Starter</h3>
          <p>Baseline visual coverage for a small landing page or app shell.</p>
          <strong>3 screenshots</strong>
        </article>
        <article class="plan-card featured">
          <h3>Operations</h3>
          <p>Recommended POC setup with desktop, mobile, and component snapshots.</p>
          <strong>5 screenshots</strong>
        </article>
        <article class="plan-card">
          <h3>Scale</h3>
          <p>Extend with more user journeys, viewports, and design-system surfaces.</p>
          <strong>10+ screenshots</strong>
        </article>
      </div>
    </section>
  </main>
`;

const clockValue = document.querySelector('#clock-value');
clockValue.textContent = new Date().toLocaleString('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'medium',
});
