<script module lang="ts">
	import { slugifyTag } from '$lib/content/posts';
</script>

<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.post.title} | BP Press</title>
	<meta name="description" content={data.post.excerpt} />
</svelte:head>

<div class="wrap">
	<a class="back" href="/blog">Back to blog</a>

	<article class="post">
		<header>
			<p>{data.post.date}</p>
			<h1>{data.post.title}</h1>
			<p>{data.post.excerpt}</p>
			{#if data.post.tags?.length}
				<div class="tags">
					{#each data.post.tags as tag}
						<a href={`/tags/${slugifyTag(tag)}`}>{tag}</a>
					{/each}
				</div>
			{/if}
		</header>

		{#if data.post.cover}
			<img class="cover" src={data.post.cover} alt="" loading="eager" />
		{/if}

		<div class="content">
			<data.post.component />
		</div>
	</article>
</div>

<style>
.wrap {
		width: min(100%, calc(var(--content-narrow) + (var(--page-padding) * 2)));
		margin: 0 auto;
		padding: 2rem var(--page-padding) 5rem;
	}

	.back {
		display: inline-block;
		margin-bottom: 1.2rem;
		text-decoration: none;
		color: var(--muted-foreground);
	}

	.post {
		padding: 2.2rem;
		border: 1px solid var(--line);
		border-radius: 2rem;
		background: var(--surface);
		box-shadow: var(--shadow);
	}

	header p,
	header h1 {
		margin: 0;
	}

	header p:first-child {
		font-size: 0.92rem;
		font-weight: 500;
		color: var(--primary);
	}

	header h1 {
		margin-top: 0.5rem;
		font-size: clamp(2.5rem, 3vw + 1rem, 3.5rem);
		line-height: 1.1;
	}

	header > p:nth-of-type(2) {
		margin-top: 1rem;
		font-size: clamp(1.08rem, 0.35vw + 1rem, 1.22rem);
		line-height: 1.6;
		letter-spacing: -0.01em;
		color: var(--muted-foreground);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.tags a {
		padding: 0.35rem 0.75rem;
		border-radius: 999px;
		background: var(--accent-soft);
		color: var(--primary);
		text-decoration: none;
		font-size: 0.92rem;
		font-weight: 500;
	}

	.content {
		margin-top: 2rem;
	}

	.content :global(p),
	.content :global(ul),
	.content :global(ol),
	.content :global(blockquote) {
		max-width: 70ch;
		padding-inline: clamp(0.2rem, 0.6vw, 0.65rem);
	}

	.content :global(p) {
		margin: 0 0 1.15rem;
	}

	.cover {
		display: block;
		width: 100%;
		margin-top: 1.5rem;
		border-radius: 1.4rem;
		border: 1px solid var(--line);
		aspect-ratio: 16 / 9;
		object-fit: cover;
	}

	.content :global(h1),
	.content :global(h2),
	.content :global(h3) {
		line-height: 1.15;
	}

	.content :global(canvas) {
		margin: 1.5rem 0;
	}

	.content :global(ul) {
		margin: 0 0 1.15rem;
		padding-left: 1.25rem;
	}

	.content :global(ol) {
		margin: 0 0 1.15rem;
		padding-left: 1.25rem;
	}
</style>
