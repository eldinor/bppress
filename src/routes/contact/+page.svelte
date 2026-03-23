<svelte:head>
	<title>Contact | BP Press</title>
	<meta
		name="description"
		content="Ways to get in touch about collaborations, writing, and Babylon.js experiments."
	/>
</svelte:head>

<div class="page-wrap">
	<section class="band">
		<div class="page-inner intro">
			<p class="eyebrow">Contact</p>
			<h1>Open to conversations about writing, product work, and interactive web ideas.</h1>
			<p class="lede">
				This page is a lightweight placeholder for now, but it gives the site a clear home for
				future contact details and collaboration links.
			</p>
		</div>
	</section>

	<section class="band">
		<div class="page-inner">
			<div class="contact-grid">
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

	.intro {
		max-width: 64rem;
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
		max-width: 14ch;
		font-size: clamp(2.5rem, 3vw + 1rem, 3.5rem);
		line-height: 1.1;
	}

	.lede {
		margin-top: 1rem;
		max-width: 48rem;
		font-size: clamp(1.125rem, 0.4vw + 1rem, 1.25rem);
		color: var(--muted-foreground);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.card {
		padding: 1.65rem;
		border: 1px solid var(--line);
		border-radius: 1.7rem;
		background: var(--surface);
		box-shadow: var(--shadow);
	}

	.card h2,
	.card p {
		margin: 0;
	}

	.card p {
		margin-top: 0.85rem;
		color: var(--muted-foreground);
	}

	@media (max-width: 980px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
