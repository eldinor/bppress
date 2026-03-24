<script module lang="ts">
	import { slugifyTag } from '$lib/content/posts';
</script>

<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog | BP Press</title>
</svelte:head>

<div class="wrap">
	<section class="band">
		<div class="page-inner hero">
			<header>
				<p class="eyebrow">Blog</p>
				<h1>Stories, experiments, and embedded 3D scenes.</h1>
				<p>
					Each post is authored in Markdown with Svelte component support, so interactive content can
					live naturally inside the article.
				</p>
				<a class="tag-link" href="/tags">Browse tags</a>
			</header>
		</div>
	</section>

	<section class="band">
		<div class="page-inner">
			<div class="list">
				{#each data.posts as post}
					<article>
						{#if post.cover}
							<img class="post-cover" src={post.cover} alt="" loading="lazy" />
						{/if}
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
		max-width: 58rem;
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
		max-width: 13ch;
		font-size: clamp(2.5rem, 3vw + 1rem, 3.5rem);
		line-height: 1.1;
	}

	header p:last-child {
		max-width: 46rem;
		font-size: clamp(1.125rem, 0.4vw + 1rem, 1.25rem);
		color: var(--muted-foreground);
	}

	.tag-link {
		display: inline-block;
		margin-top: 1.1rem;
		text-decoration: none;
		color: var(--primary);
		font-weight: 600;
	}

	.list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	article {
		overflow: hidden;
		padding: 1.6rem;
		border: 1px solid var(--line);
		border-radius: 1.7rem;
		background: var(--surface);
		box-shadow: var(--shadow);
	}

	.post-cover {
		display: block;
		width: calc(100% + 3.2rem);
		max-width: none;
		margin: -1.6rem -1.6rem 1.2rem;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-bottom: 1px solid var(--line);
	}

	article p,
	h2 {
		margin: 0;
	}

	article p:first-child,
	.tags {
		color: var(--muted-foreground);
		font-size: 0.9rem;
	}

	h2 {
		margin-top: 0.35rem;
		font-size: clamp(1.375rem, 1vw + 1rem, 1.75rem);
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
	}

	@media (max-width: 980px) {
		.list {
			grid-template-columns: 1fr;
		}
	}
</style>
