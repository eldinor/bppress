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
		</header>

		<div class="content">
			<data.post.component />
		</div>
	</article>
</div>

<style>
	.wrap {
		max-width: 880px;
		margin: 0 auto;
		padding: 2rem 1.5rem 5rem;
	}

	.back {
		display: inline-block;
		margin-bottom: 1.2rem;
		text-decoration: none;
		color: var(--muted);
	}

	.post {
		padding: 2rem;
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
		font-size: 0.9rem;
		color: var(--accent);
	}

	header h1 {
		margin-top: 0.5rem;
		font-size: clamp(2.4rem, 5vw, 4.2rem);
		line-height: 0.98;
	}

	header p:last-child {
		margin-top: 1rem;
		font-size: 1.08rem;
		line-height: 1.7;
		color: var(--muted);
	}

	.content {
		margin-top: 2rem;
		font-size: 1.05rem;
		line-height: 1.8;
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
		padding-left: 1.25rem;
	}
</style>
