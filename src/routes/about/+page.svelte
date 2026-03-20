<svelte:head>
	<title>About | BP Press</title>
	<meta
		name="description"
		content="Learn what BP Press is for and how the blog mixes writing with interactive Babylon.js content."
	/>
</svelte:head>

<div class="page-wrap">
	<section class="intro">
		<p class="eyebrow">About</p>
		<h1>A compact publishing space for writing and interactive web experiments.</h1>
		<p class="lede">
			BP Press is built for technical writing, product notes, and visual stories that occasionally
			need something richer than static screenshots.
		</p>
	</section>

	<section class="grid">
		<article class="card">
			<h2>What lives here</h2>
			<p>
				The site is meant for short essays, launch notes, implementation walkthroughs, and Babylon.js
				demos embedded directly into posts.
			</p>
		</article>

		<article class="card">
			<h2>How it is built</h2>
			<p>
				SvelteKit handles routing, mdsvex keeps Markdown flexible, and Babylon.js powers interactive
				3D content when a story benefits from it.
			</p>
		</article>

		<article class="card">
			<h2>Why this shape</h2>
			<p>
				The goal is to keep publishing lightweight. Posts live in the codebase, stay easy to edit,
				and can grow from plain writing into interactive explainers without changing format.
			</p>
		</article>
	</section>
</div>

<style>
	.page-wrap {
		max-width: 1040px;
		margin: 0 auto;
		padding: 4rem 1.5rem 5rem;
	}

	.intro {
		max-width: 48rem;
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
		font-size: clamp(2.8rem, 6vw, 4.8rem);
		line-height: 0.98;
	}

	.lede {
		margin-top: 1rem;
		font-size: 1.08rem;
		line-height: 1.8;
		color: var(--muted);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1rem;
		margin-top: 2.5rem;
	}

	.card {
		padding: 1.5rem;
		border: 1px solid var(--line);
		border-radius: 1.5rem;
		background: var(--surface);
		box-shadow: var(--shadow);
	}

	.card h2,
	.card p {
		margin: 0;
	}

	.card p {
		margin-top: 0.85rem;
		line-height: 1.75;
		color: var(--muted);
	}
</style>
