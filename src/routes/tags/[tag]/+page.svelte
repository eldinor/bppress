<script module lang="ts">
	import { slugifyTag } from '$lib/content/posts';
</script>

<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.tag.name} | Tags | BP Press</title>
	<meta name="description" content={`Posts tagged ${data.tag.name} on BP Press.`} />
</svelte:head>

<div class="wrap">
	<a class="back" href="/tags">Back to tags</a>

	<header>
		<p class="eyebrow">Tag archive</p>
		<h1>{data.tag.name}</h1>
		<p>{data.tag.count} {data.tag.count === 1 ? 'post' : 'posts'} filed under this topic.</p>
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
							<a href={`/tags/${slugifyTag(tag)}`}>{tag}</a>
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
		padding: 2rem 1.5rem 5rem;
	}

	.back {
		display: inline-block;
		margin-bottom: 1.2rem;
		text-decoration: none;
		color: var(--muted-foreground);
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
	h2,
	p {
		margin: 0;
	}

	h1 {
		font-size: clamp(2.6rem, 6vw, 4.2rem);
		line-height: 0.98;
	}

	header p:last-child {
		margin-top: 0.9rem;
		line-height: 1.75;
		color: var(--muted-foreground);
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

	article p:first-child {
		color: var(--muted-foreground);
		font-size: 0.9rem;
	}

	h2 {
		margin-top: 0.35rem;
		font-size: 1.55rem;
	}

	h2 a {
		text-decoration: none;
	}

	article p:nth-of-type(2) {
		margin-top: 0.85rem;
		line-height: 1.7;
		color: var(--muted-foreground);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.tags a {
		padding: 0.3rem 0.75rem;
		border-radius: 999px;
		background: var(--accent-soft);
		color: var(--primary);
		text-decoration: none;
		font-size: 0.92rem;
	}
</style>
