<script lang="ts">
  import { homePageContent } from '$lib/content/home-page';
</script>

<svelte:head>
  <title>{homePageContent.metaTitle}</title>
  <meta name="description" content={homePageContent.metaDescription} />
</svelte:head>

<div class="frontpage">
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">{homePageContent.hero.eyebrow}</p>
        <h1>{homePageContent.hero.title}</h1>
        <p class="hero-text">{homePageContent.hero.description}</p>
        <div class="hero-actions">
          <a class="button button-primary" href={homePageContent.hero.primaryHref}>{homePageContent.hero.primaryLabel}</a>
          <a class="button button-secondary" href={homePageContent.hero.secondaryHref}>{homePageContent.hero.secondaryLabel}</a>
        </div>
      </div>

      <div class="hero-visual" aria-label="Product preview">
        <div class="window-chrome">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="visual-grid">
          <article class="preview-card preview-primary">
            <p>{homePageContent.hero.previewPrimaryLabel}</p>
            <strong>{homePageContent.hero.previewPrimaryText}</strong>
          </article>
          <article class="preview-card preview-metric">
            <p>{homePageContent.hero.previewMetricLabel}</p>
            <strong>{homePageContent.hero.previewMetricText}</strong>
          </article>
          <article class="preview-card preview-code">
            <code>{homePageContent.hero.previewCode}</code>
          </article>
          <article class="preview-card preview-list">
            {#each homePageContent.hero.previewList as item}
              <span>{item}</span>
            {/each}
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="trust-strip">
    <div class="container trust-inner">
      <p>{homePageContent.trust.label}</p>
      <div class="logo-row" aria-label="Trusted teams">
        {#each homePageContent.trust.logos as logo}
          <span>{logo}</span>
        {/each}
      </div>
    </div>
  </section>

  <section class="section" id="products">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">{homePageContent.products.eyebrow}</p>
        <h2>{homePageContent.products.title}</h2>
        <p class="section-copy">{homePageContent.products.description}</p>
      </div>

      <div class="feature-grid">
        {#each homePageContent.products.features as feature}
          <article class="card feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section section-soft">
    <div class="container choose-grid">
      <div class="section-heading compact">
        <p class="eyebrow">{homePageContent.whyChoose.eyebrow}</p>
        <h2>{homePageContent.whyChoose.title}</h2>
        <p class="section-copy">{homePageContent.whyChoose.description}</p>
      </div>

      <div class="advantage-grid">
        {#each homePageContent.whyChoose.advantages as advantage}
          <article class="card advantage-card">
            <span class="advantage-dot"></span>
            <h3>{advantage}</h3>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section showcase-section" id="docs">
    <div class="container showcase-grid">
      <div class="section-heading compact">
        <p class="eyebrow">{homePageContent.showcase.eyebrow}</p>
        <h2>{homePageContent.showcase.title}</h2>
        <p class="section-copy">{homePageContent.showcase.description}</p>
      </div>

      <div class="showcase-frame">
        <div class="showcase-panel showcase-panel-large">
          <span>{homePageContent.showcase.largeLabel}</span>
          <strong>{homePageContent.showcase.largeText}</strong>
        </div>
        <div class="showcase-metrics">
          <div class="showcase-panel">
            <span>{homePageContent.showcase.metricOneLabel}</span>
            <strong>{homePageContent.showcase.metricOneText}</strong>
          </div>
          <div class="showcase-panel">
            <span>{homePageContent.showcase.metricTwoLabel}</span>
            <strong>{homePageContent.showcase.metricTwoText}</strong>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="pricing">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">{homePageContent.community.eyebrow}</p>
        <h2>{homePageContent.community.title}</h2>
      </div>

      <div class="stats-grid">
        {#each homePageContent.community.stats as stat}
          <article class="card stat-card">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section section-soft">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">{homePageContent.testimonials.eyebrow}</p>
        <h2>{homePageContent.testimonials.title}</h2>
      </div>

      <div class="testimonial-grid">
        {#each homePageContent.testimonials.items as testimonial}
          <article class="card testimonial-card">
            <p class="quote">{testimonial.quote}</p>
            <strong>{testimonial.name}</strong>
            <span>{testimonial.role}, {testimonial.company}</span>
          </article>
        {/each}
      </div>
    </div>
  </section>
</div>

<style>
  .frontpage {
    min-height: 100%;
  }

  .container {
    width: min(100% - 2rem, var(--container-max));
    margin: 0 auto;
  }

  .hero {
    padding: clamp(5rem, 12vw, 7rem) 0 clamp(4rem, 8vw, 6rem);
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 34rem);
    gap: 3rem;
    align-items: center;
  }

  .hero-copy {
    max-width: 35rem;
  }

  .eyebrow {
    margin: 0 0 1rem;
    color: var(--primary-light);
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .hero-copy h1 {
    margin: 0;
    max-width: 10ch;
  }

  .hero-text,
  .section-copy {
    color: var(--text-secondary);
    max-width: 38rem;
  }

  .hero-text {
    margin-top: 1.5rem;
    font-size: 1.125rem;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.875rem;
    padding: 0.75rem 1.25rem;
    border: 1px solid transparent;
    border-radius: var(--button-radius);
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    transition:
      background-color 160ms ease,
      border-color 160ms ease,
      color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .button:hover {
    transform: translateY(-1px);
  }

  .button-primary {
    background: var(--primary-main);
    color: #fff;
    box-shadow: 0 12px 24px rgba(25, 118, 210, 0.24);
  }

  .button-primary:hover {
    background: var(--primary-dark);
    color: #fff;
  }

  .button-secondary {
    border-color: var(--divider-strong);
    background: var(--pill-bg);
    color: var(--primary-light);
  }

  .button-secondary:hover {
    border-color: rgba(66, 165, 245, 0.3);
    background: rgba(66, 165, 245, 0.14);
  }

  .hero-visual {
    padding: 1.5rem;
    border: 1px solid rgba(66, 165, 245, 0.14);
    border-radius: 1.5rem;
    background:
      linear-gradient(135deg, rgba(25, 118, 210, 0.18), rgba(156, 39, 176, 0.12)),
      var(--hero-panel-bg);
    box-shadow: 0 24px 60px var(--shadow-color);
  }

  .window-chrome {
    display: flex;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }

  .window-chrome span {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.55);
  }

  .visual-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .preview-card {
    display: grid;
    gap: 0.75rem;
    min-height: 9rem;
    padding: 1.25rem;
    border: 1px solid var(--divider);
    border-radius: 1rem;
    background: var(--preview-card-bg);
    box-shadow: var(--preview-card-inset);
  }

  .preview-card p,
  .preview-card span,
  .showcase-panel span {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .preview-card strong,
  .showcase-panel strong {
    font-size: 1.1rem;
    line-height: 1.4;
  }

  .preview-primary {
    grid-column: span 2;
    background: linear-gradient(135deg, rgba(25, 118, 210, 0.94), rgba(156, 39, 176, 0.9));
    color: #fff;
  }

  .preview-primary p,
  .preview-primary strong {
    color: #fff;
  }

  .preview-code {
    align-content: end;
    background: var(--code-bg);
    color: var(--code-fg);
  }

  .preview-code code {
    font-size: 0.95rem;
    line-height: 1.6;
    white-space: normal;
  }

  .preview-list {
    align-content: start;
  }

  .preview-list span {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    background: var(--pill-bg);
    color: var(--primary-light);
  }

  .trust-strip,
  .section {
    padding: clamp(4rem, 8vw, 6rem) 0;
  }

  .trust-strip {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    border-top: 1px solid var(--divider);
    border-bottom: 1px solid var(--divider);
    background: rgba(66, 165, 245, 0.03);
  }

  .trust-inner {
    display: grid;
    grid-template-columns: 16rem minmax(0, 1fr);
    gap: 2rem;
    align-items: center;
  }

  .trust-inner p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.95rem;
    font-weight: 600;
  }

  .logo-row {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 1rem;
  }

  .logo-row span {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 3.5rem;
    border-radius: 999px;
    color: var(--logo-fg);
    background: var(--logo-bg);
    font-size: 0.95rem;
    font-weight: 600;
  }

  .section-soft {
    background: var(--soft-section-bg);
  }

  .section-heading {
    display: grid;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .section-heading.compact {
    margin-bottom: 0;
  }

  .section-heading h2 {
    margin: 0;
    max-width: 14ch;
  }

  .feature-grid,
  .advantage-grid,
  .stats-grid,
  .testimonial-grid {
    display: grid;
    gap: 1.5rem;
  }

  .feature-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .choose-grid,
  .showcase-grid {
    display: grid;
    grid-template-columns: minmax(0, 22rem) minmax(0, 1fr);
    gap: 2rem;
    align-items: start;
  }

  .advantage-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .card {
    padding: 1.5rem;
    border: 1px solid var(--divider);
    border-radius: var(--card-radius);
    background: var(--background-paper);
    box-shadow: var(--card-shadow);
  }

  .feature-card,
  .testimonial-card {
    transition:
      transform 160ms ease,
      box-shadow 160ms ease,
      border-color 160ms ease;
  }

  .feature-card:hover,
  .testimonial-card:hover {
    transform: translateY(-2px);
    border-color: rgba(66, 165, 245, 0.32);
    box-shadow: 0 18px 36px var(--shadow-color);
  }

  .feature-card h3,
  .advantage-card h3,
  .testimonial-card strong {
    margin: 0;
  }

  .feature-card p,
  .testimonial-card span {
    margin: 0.75rem 0 0;
    color: var(--text-secondary);
  }

  .advantage-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: 7rem;
  }

  .advantage-dot {
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--primary-main), var(--secondary-main));
    flex: 0 0 auto;
  }

  .showcase-frame {
    display: grid;
    gap: 1rem;
    padding: 1.5rem;
    border: 1px solid var(--divider);
    border-radius: 1.5rem;
    background:
      radial-gradient(circle at top right, rgba(66, 165, 245, 0.14), transparent 28%),
      var(--background-paper);
    box-shadow: 0 18px 44px var(--shadow-color);
  }

  .showcase-panel {
    display: grid;
    gap: 0.75rem;
    padding: 1.5rem;
    border-radius: 1rem;
    background: rgba(66, 165, 245, 0.08);
    min-height: 8rem;
  }

  .showcase-panel-large {
    min-height: 18rem;
    align-content: end;
    background: linear-gradient(135deg, rgba(25, 118, 210, 0.92), rgba(156, 39, 176, 0.88));
    color: #fff;
  }

  .showcase-panel-large span,
  .showcase-panel-large strong {
    color: #fff;
  }

  .showcase-metrics {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .stat-card strong {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .stat-card span {
    margin-top: 0.75rem;
    color: var(--text-secondary);
  }

  .testimonial-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .quote {
    margin: 0 0 1.25rem;
    font-size: 1.05rem;
    color: var(--text-primary);
  }

  @media (max-width: 1199px) {
    .feature-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .logo-row,
    .stats-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 899px) {
    .container {
      width: min(100% - 3rem, var(--container-max));
    }

    .hero-grid,
    .trust-inner,
    .choose-grid,
    .showcase-grid,
    .feature-grid,
    .advantage-grid,
    .stats-grid,
    .testimonial-grid,
    .logo-row,
    .showcase-metrics {
      grid-template-columns: 1fr;
    }

    .hero-copy h1 {
      max-width: 11ch;
    }

    .hero-actions .button {
      width: 100%;
    }

    .visual-grid {
      grid-template-columns: 1fr;
    }

    .preview-primary {
      grid-column: auto;
    }
  }

  @media (max-width: 599px) {
    .container {
      width: min(100% - 2rem, var(--container-max));
    }
  }
</style>
