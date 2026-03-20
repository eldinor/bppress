<svelte:head>
	<title>Contact | BP Press</title>
	<meta
		name="description"
		content="Ways to get in touch about collaborations, writing, and Babylon.js experiments."
	/>
</svelte:head>

<div class="page-wrap">
	<section class="intro">
		<p class="eyebrow">Contact</p>
		<h1>Open to conversations about writing, product work, and interactive web ideas.</h1>
		<p class="lede">
			This page is a lightweight placeholder for now, but it gives the site a clear home for
			future contact details and collaboration links.
		</p>
	</section>

	<section class="contact-grid">
		<article class="card">
			<h2>Editorial</h2>
			<p>Use this space for writing inquiries, guest posts, or publication-related messages.</p>
		</article>

		<article class="card">
			<h2>Interactive work</h2>
			<p>Use this area for scene demos, technical prototypes, and Babylon.js collaboration notes.</p>
		</article>

		<article class="card">
			<h2>Next step</h2>
			<p>
				When you are ready, replace this copy with a real email address, social links, or a contact
				form endpoint.
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
		max-width: 50rem;
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
		line-height: 1.8;
		color: var(--muted);
	}

	.contact-grid {
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
