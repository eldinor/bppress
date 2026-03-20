<svelte:head>
	<title>Showcase | BP Press</title>
	<meta
		name="description"
		content="A small index of the kinds of interactive and editorial work this blog is meant to host."
	/>
</svelte:head>

<script lang="ts">
	const showcaseItems = [
		{
			title: 'Embedded 3D Articles',
			description:
				'Posts where Babylon scenes sit directly inside the narrative to explain lighting, materials, or interaction.'
		},
		{
			title: 'Build Notes',
			description:
				'Short writeups about implementation details, design decisions, and technical tradeoffs during development.'
		},
		{
			title: 'Scene Studies',
			description:
				'Focused experiments around cameras, environment lighting, animation loops, and reusable scene patterns.'
		}
	];
</script>

<div class="page-wrap">
	<section class="hero">
		<p class="eyebrow">Showcase</p>
		<h1>Where editorial writing meets live scene work.</h1>
		<p>
			This page highlights the kind of material the site is designed to carry: polished notes,
			interactive demos, and compact visual explainers.
		</p>
	</section>

	<section class="showcase-grid">
		{#each showcaseItems as item}
			<article class="tile">
				<h2>{item.title}</h2>
				<p>{item.description}</p>
			</article>
		{/each}
	</section>

	<section class="callout">
		<h2>Start with the Babylon demo post</h2>
		<p>
			The current best example is the article that embeds a Babylon scene directly inside Markdown.
		</p>
		<a href="/blog/babylon-in-posts">Open the post</a>
	</section>
</div>

<style>
	.page-wrap {
		max-width: 1040px;
		margin: 0 auto;
		padding: 4rem 1.5rem 5rem;
	}

	.hero {
		max-width: 46rem;
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
		font-size: clamp(2.8rem, 6vw, 4.8rem);
		line-height: 0.98;
	}

	.hero p:last-child {
		margin-top: 1rem;
		line-height: 1.8;
		color: var(--muted);
	}

	.showcase-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1rem;
		margin-top: 2.5rem;
	}

	.tile,
	.callout {
		padding: 1.6rem;
		border: 1px solid var(--line);
		border-radius: 1.5rem;
		background: var(--surface);
		box-shadow: var(--shadow);
	}

	.tile p,
	.callout p {
		margin-top: 0.85rem;
		line-height: 1.75;
		color: var(--muted);
	}

	.callout {
		margin-top: 1rem;
	}

	.callout a {
		display: inline-block;
		margin-top: 1rem;
		text-decoration: none;
		color: var(--accent);
	}
</style>
