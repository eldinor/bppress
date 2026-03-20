<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog | BP Press</title>
</svelte:head>

<div class="wrap">
	<header>
		<p class="eyebrow">Blog</p>
		<h1>Stories, experiments, and embedded 3D scenes.</h1>
		<p>
			Each post is authored in Markdown with Svelte component support, so interactive content can
			live naturally inside the article.
		</p>
	</header>

	<section class="list">
		{#each data.posts as post}
			<article>
				<p>{post.date}</p>
				<h2><a href={`/blog/${post.slug}`}>{post.title}</a></h2>
				<p>{post.excerpt}</p>
				{#if post.tags?.length}
					<div class="tags">
						{#each post.tags as tag}
							<span>{tag}</span>
						{/each}
					</div>
				{/if}
			</article>
		{/each}
	</section>
</div>

<style>
	.wrap {
		max-width: 900px;
		margin: 0 auto;
		padding: 4rem 1.5rem 5rem;
	}

	header {
		max-width: 42rem;
	}

	.eyebrow {
		margin: 0 0 1rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
	}

	h1 {
		margin: 0;
		font-size: clamp(2.6rem, 6vw, 4.8rem);
		line-height: 0.96;
	}

	header p:last-child {
		font-size: 1.05rem;
		line-height: 1.7;
		color: var(--muted);
	}

	.list {
		display: grid;
		gap: 1rem;
		margin-top: 2rem;
	}

	article {
		padding: 1.4rem;
		border: 1px solid var(--line);
		border-radius: 1.5rem;
		background: var(--surface);
		box-shadow: var(--shadow);
	}

	article p,
	h2 {
		margin: 0;
	}

	article p:first-child,
	.tags {
		color: var(--muted);
		font-size: 0.9rem;
	}

	h2 {
		margin-top: 0.35rem;
		font-size: 1.6rem;
	}

	h2 a {
		text-decoration: none;
	}

	article p:nth-of-type(2) {
		margin-top: 0.85rem;
		line-height: 1.7;
		color: var(--muted);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.tags span {
		padding: 0.3rem 0.75rem;
		border-radius: 999px;
		background: var(--accent-soft);
		color: #73351e;
	}
</style>
