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
	<section class="band">
		<div class="page-inner">
			<a class="back" href="/tags">Back to tags</a>

			<header>
				<p class="eyebrow">Tag archive</p>
				<h1>{data.tag.name}</h1>
				<p>{data.tag.count} {data.tag.count === 1 ? 'post' : 'posts'} filed under this topic.</p>
			</header>
		</div>
	</section>

	<section class="band">
		<div class="page-inner">
			<div class="list">
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
			</div>
		</div>
	</section>
</div>

<style>
	.wrap {
		padding: 2rem 0 5rem;
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

	.back {
		display: inline-block;
		margin-bottom: 1.2rem;
		text-decoration: none;
		color: var(--muted-foreground);
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
	h2,
	p {
		margin: 0;
	}

	h1 {
		font-size: clamp(2.5rem, 3vw + 1rem, 3.5rem);
		line-height: 1.1;
	}

	header p:last-child {
		margin-top: 0.9rem;
		line-height: 1.75;
		color: var(--muted-foreground);
	}

	.list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	article {
		padding: 1.6rem;
		border: 1px solid var(--line);
		border-radius: 1.7rem;
		background: var(--surface);
		box-shadow: var(--shadow);
	}

	article p:first-child {
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
		font-size: 0.92rem;
	}

	@media (max-width: 980px) {
		.list {
			grid-template-columns: 1fr;
		}
	}
</style>
