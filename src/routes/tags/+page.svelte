<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Tags | BP Press</title>
	<meta name="description" content="Browse all article tags across BP Press." />
</svelte:head>

<div class="wrap">
	<section class="band">
		<div class="page-inner">
			<header>
				<p class="eyebrow">Tags</p>
				<h1>Browse the site by topic.</h1>
				<p>Every tag collects related posts into a simple archive page.</p>
			</header>
		</div>
	</section>

	<section class="band">
		<div class="page-inner">
			<div class="tag-grid">
				{#each data.tags as tag}
					<a class="tag-card" href={`/tags/${tag.slug}`}>
						<strong>{tag.name}</strong>
						<span>{tag.count} {tag.count === 1 ? 'post' : 'posts'}</span>
					</a>
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
	.wrap {
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

	header {
		max-width: 56rem;
	}

	.eyebrow {
		margin: 0 0 1rem;
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--primary);
	}

	h1,
	p,
	strong,
	span {
		margin: 0;
	}

	h1 {
		font-size: clamp(2.5rem, 3vw + 1rem, 3.5rem);
		line-height: 1.1;
	}

	header p:last-child {
		margin-top: 1rem;
		line-height: 1.75;
		color: var(--muted-foreground);
	}

	.tag-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1rem;
	}

	.tag-card {
		display: block;
		padding: 1.4rem;
		border: 1px solid var(--line);
		border-radius: 1.6rem;
		background: var(--surface);
		box-shadow: var(--shadow);
		text-decoration: none;
	}

	.tag-card strong {
		display: block;
		font-size: 1.05rem;
	}

	.tag-card span {
		display: block;
		margin-top: 0.55rem;
		color: var(--muted-foreground);
	}

	@media (max-width: 980px) {
		.tag-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		.tag-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
