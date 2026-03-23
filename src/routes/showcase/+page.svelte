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
	<section class="band">
		<div class="page-inner hero">
			<p class="eyebrow">Showcase</p>
			<h1>Where editorial writing meets live scene work.</h1>
			<p>
				This page highlights the kind of material the site is designed to carry: polished notes,
				interactive demos, and compact visual explainers.
			</p>
		</div>
	</section>

	<section class="band">
		<div class="page-inner">
			<div class="showcase-grid">
				{#each showcaseItems as item}
					<article class="tile">
						<h2>{item.title}</h2>
						<p>{item.description}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="band">
		<div class="page-inner">
			<div class="callout">
				<h2>Start with the Babylon demo post</h2>
				<p>
					The current best example is the article that embeds a Babylon scene directly inside Markdown.
				</p>
				<a href="/blog/babylon-in-posts">Open the post</a>
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

	.hero {
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

	h1,
	h2,
	p {
		margin: 0;
	}

	h1 {
		max-width: 13ch;
		font-size: clamp(2.5rem, 3vw + 1rem, 3.5rem);
		line-height: 1.1;
	}

	.hero p:last-child {
		margin-top: 1rem;
		max-width: 48rem;
		font-size: clamp(1.125rem, 0.4vw + 1rem, 1.25rem);
		color: var(--muted-foreground);
	}

	.showcase-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.tile,
	.callout {
		padding: 1.75rem;
		border: 1px solid var(--line);
		border-radius: 1.75rem;
		background: var(--surface);
		box-shadow: var(--shadow);
	}

	.tile p,
	.callout p {
		margin-top: 0.85rem;
		line-height: 1.75;
		color: var(--muted-foreground);
	}

	.callout {
		max-width: 64rem;
	}

	.callout a {
		display: inline-block;
		margin-top: 1rem;
		text-decoration: none;
		color: var(--primary);
		font-weight: 600;
	}

	@media (max-width: 980px) {
		.showcase-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
