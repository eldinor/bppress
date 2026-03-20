<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Tags | BP Press</title>
	<meta name="description" content="Browse all article tags across BP Press." />
</svelte:head>

<div class="wrap">
	<header>
		<p class="eyebrow">Tags</p>
		<h1>Browse the site by topic.</h1>
		<p>Every tag collects related posts into a simple archive page.</p>
	</header>

	<section class="tag-grid">
		{#each data.tags as tag}
			<a class="tag-card" href={`/tags/${tag.slug}`}>
				<strong>{tag.name}</strong>
				<span>{tag.count} {tag.count === 1 ? 'post' : 'posts'}</span>
			</a>
		{/each}
	</section>
</div>

<style>
	.wrap {
		max-width: 940px;
		margin: 0 auto;
		padding: 4rem 1.5rem 5rem;
	}

	header {
		max-width: 40rem;
	}

	.eyebrow {
		margin: 0 0 1rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
	}

	h1,
	p,
	strong,
	span {
		margin: 0;
	}

	h1 {
		font-size: clamp(2.6rem, 6vw, 4.6rem);
		line-height: 0.98;
	}

	header p:last-child {
		margin-top: 1rem;
		line-height: 1.75;
		color: var(--muted-foreground);
	}

	.tag-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1rem;
		margin-top: 2rem;
	}

	.tag-card {
		display: block;
		padding: 1.2rem;
		border: 1px solid var(--line);
		border-radius: 1.4rem;
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
</style>
