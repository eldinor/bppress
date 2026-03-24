<script lang="ts">
  import { staticPagesContent } from '$lib/content/static-pages';

  const aboutPageContent = staticPagesContent.about;
</script>

<svelte:head>
  <title>{aboutPageContent.metaTitle}</title>
  <meta name="description" content={aboutPageContent.metaDescription} />
</svelte:head>

<div class="page-wrap">
  <section class="band">
    <div class="page-inner intro">
      <p class="eyebrow">{aboutPageContent.eyebrow}</p>
      <h1>{aboutPageContent.title}</h1>
      <p class="lede">{aboutPageContent.lede}</p>
    </div>
  </section>

  <section class="band">
    <div class="page-inner">
      <div class="grid">
        {#each aboutPageContent.cards as card}
          <article class="card">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>
</div>

<style>
  .page-wrap {
    padding: 2.75rem 0 5rem;
  }

  .band {
    width: 100%;
    padding: 0.85rem 0;
  }

  .page-inner {
    width: min(100%, var(--content-max));
    margin: 0 auto;
    padding: 0 var(--page-padding);
  }

  .intro {
    max-width: 62rem;
  }

  .eyebrow {
    margin: 0 0 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--primary);
  }

  h1 {
    margin: 0;
    max-width: 14ch;
    font-size: clamp(2.5rem, 3vw + 1rem, 3.5rem);
    line-height: 1.1;
  }

  .lede {
    margin-top: 1rem;
    max-width: 48rem;
    font-size: clamp(1.125rem, 0.4vw + 1rem, 1.25rem);
    color: var(--muted-foreground);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .card {
    padding: 1.7rem;
    border: 1px solid var(--line);
    border-radius: 1.7rem;
    background: var(--surface);
    box-shadow: var(--shadow);
  }

  .card h2,
  .card p {
    margin: 0;
  }

  .card p {
    margin-top: 0.85rem;
    color: var(--muted-foreground);
  }

  @media (max-width: 980px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
