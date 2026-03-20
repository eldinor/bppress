<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const platformHighlights = [
		{
			title: 'Editorial publishing',
			description:
				'Publish clean Markdown-based stories with structured metadata, fast iteration, and a code-first workflow.'
		},
		{
			title: 'Interactive storytelling',
			description:
				'Embed Babylon.js scenes directly into articles so product notes and technical posts can show, not just tell.'
		},
		{
			title: 'Startup-ready foundation',
			description:
				'Use the same site for marketing pages, announcements, product updates, and a living news stream.'
		}
	];

	const workflowSteps = [
		'Write the story in mdsvex with metadata, tags, and a clean URL slug.',
		'Add interactive blocks only where they improve the explanation.',
		'Publish the post into the same site shell that powers landing pages and company content.'
	];

	const metrics = [
		{ value: '1 site', label: 'for marketing, news, and experiments' },
		{ value: '6 posts', label: 'already populating the content pipeline' },
		{ value: 'MD + Svelte', label: 'for flexible authoring and components' }
	];
</script>

<svelte:head>
	<title>BP Press</title>
	<meta
		name="description"
		content="A startup-style publishing site with news, product storytelling, and Babylon.js-ready posts."
	/>
</svelte:head>

<div class="page">
	<section class="hero">
		<div class="hero-copy">
			<p class="eyebrow">Publishing platform for product stories</p>
			<h1>Turn a lightweight blog into a polished startup site with news and interactive demos.</h1>
			<p class="lede">
				BP Press combines a clean marketing shell, a structured content pipeline, and Babylon.js-ready
				posts so product teams can publish updates, explain features, and ship visual stories from one
				place.
			</p>
			<div class="actions">
				<a class="button primary" href="/blog">Read the news</a>
				<a class="button" href="/showcase">Explore the showcase</a>
			</div>
			<div class="metrics">
				{#each metrics as metric}
					<div class="metric">
						<strong>{metric.value}</strong>
						<span>{metric.label}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="hero-card">
			<p class="mini-label">Featured story</p>
			{#if data.featuredPost}
				<h2>{data.featuredPost.title}</h2>
				<p>{data.featuredPost.excerpt}</p>
				<div class="hero-meta">
					<span>{data.featuredPost.date}</span>
					{#if data.featuredPost.tags?.length}
						<span>{data.featuredPost.tags[0]}</span>
					{/if}
				</div>
				<a href={`/blog/${data.featuredPost.slug}`}>Open article</a>
			{:else}
				<h2>No featured post yet</h2>
				<p>Add content in `src/lib/posts` and it will appear here automatically.</p>
			{/if}
		</div>
	</section>

	<section class="section">
		<div class="section-heading">
			<p class="eyebrow">Why this works</p>
			<h2>A better front page for a content-driven startup site.</h2>
		</div>

		<div class="feature-grid">
			{#each platformHighlights as item}
				<article class="feature-card">
					<h3>{item.title}</h3>
					<p>{item.description}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="section split">
		<div class="section-heading narrow">
			<p class="eyebrow">Workflow</p>
			<h2>From announcement to article to interactive demo.</h2>
			<p>
				The site is designed to handle startup storytelling end to end. A post can begin as a simple
				update and grow into a more visual experience without changing publishing tools.
			</p>
		</div>

		<div class="workflow-panel">
			{#each workflowSteps as step, index}
				<div class="workflow-step">
					<span>{index + 1}</span>
					<p>{step}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="section">
		<div class="section-heading row">
			<div>
				<p class="eyebrow">Latest news</p>
				<h2>Recent posts and product-style updates.</h2>
			</div>
			<a class="text-link" href="/blog">View all posts</a>
		</div>

		{#if data.recentPosts.length}
			<div class="post-grid">
				{#each data.recentPosts as post}
					<a class="post-card" href={`/blog/${post.slug}`}>
						<p>{post.date}</p>
						<h3>{post.title}</h3>
						<p>{post.excerpt}</p>
					</a>
				{/each}
			</div>
		{:else}
			<div class="empty-state">
				<p>No posts yet.</p>
			</div>
		{/if}
	</section>

	<section class="cta">
		<div>
			<p class="eyebrow">Next step</p>
			<h2>Keep building the site into a real startup presence.</h2>
			<p>
				The shell is now in place for landing pages, showcase content, and news. From here we can add
				features, pricing, newsletter signup, SEO improvements, and a proper editorial structure.
			</p>
		</div>
		<div class="cta-actions">
			<a class="button primary" href="/about">Learn more</a>
			<a class="button" href="/contact">Contact page</a>
		</div>
	</section>
</div>

<style>
	.page {
		width: 100%;
		max-width: none;
		margin: 0;
		padding: 3.5rem 0 5rem;
	}

	.hero {
		max-width: 1240px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.8fr);
		gap: 1.25rem;
		align-items: stretch;
		padding: 1.2rem 1.5rem 0;
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
	h3,
	p {
		margin: 0;
	}

	h1 {
		max-width: 12ch;
		font-size: clamp(3.2rem, 7vw, 5.8rem);
		line-height: 0.94;
		letter-spacing: -0.03em;
	}

	.lede {
		max-width: 44rem;
		margin-top: 1.35rem;
		font-size: 1.12rem;
		line-height: 1.8;
		color: var(--muted-foreground);
	}

	.actions,
	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
		margin-top: 1.8rem;
	}

	.button {
		padding: 0.95rem 1.35rem;
		border: 1px solid var(--line);
		border-radius: 999px;
		background: color-mix(in srgb, var(--card) 88%, transparent);
		text-decoration: none;
		transition:
			transform 160ms ease,
			border-color 160ms ease,
			box-shadow 160ms ease;
	}

	.button:hover {
		transform: translateY(-2px);
		border-color: rgba(102, 178, 255, 0.45);
		box-shadow: 0 12px 24px rgba(19, 47, 76, 0.08);
	}

	.primary {
		background: linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 82%, black));
		border-color: transparent;
		color: var(--primary-foreground);
	}

	.metrics {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.9rem;
		margin-top: 2rem;
	}

	.metric,
	.hero-card,
	.feature-card,
	.workflow-panel,
	.post-card,
	.cta,
	.empty-state {
		border: 1px solid var(--line);
		background: var(--surface);
		box-shadow: var(--shadow);
	}

	.metric {
		padding: 1rem 1.1rem;
		border-radius: 1.2rem;
	}

	.metric strong {
		display: block;
		font-size: 1.1rem;
	}

	.metric span {
		display: block;
		margin-top: 0.45rem;
		color: var(--muted-foreground);
		line-height: 1.5;
	}

	.hero-card {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 1.6rem;
		border-radius: 1.8rem;
		background:
			linear-gradient(180deg, color-mix(in srgb, var(--card) 98%, white), color-mix(in srgb, var(--accent) 35%, white)),
			var(--surface);
	}

	.mini-label {
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.hero-card h2 {
		margin-top: 1rem;
		font-size: 1.9rem;
		line-height: 1.1;
	}

	.hero-card p:nth-of-type(2) {
		margin-top: 0.9rem;
		line-height: 1.75;
		color: var(--muted-foreground);
	}

	.hero-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin-top: 1rem;
		color: var(--muted-foreground);
		font-size: 0.9rem;
	}

	.hero-meta span {
		padding: 0.35rem 0.7rem;
		border-radius: 999px;
		background: var(--accent-soft);
	}

	.hero-card a,
	.text-link {
		margin-top: 1.2rem;
		color: var(--primary);
		text-decoration: none;
		font-weight: 600;
	}

	.section {
		max-width: 1240px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 1.25rem;
		padding: 2rem;
		border: 1px solid var(--line);
		border-radius: 2rem;
		background: color-mix(in srgb, var(--card) 90%, transparent);
		backdrop-filter: blur(12px);
	}

	.section-heading h2 {
		font-size: clamp(2rem, 4vw, 3.3rem);
		line-height: 1;
	}

	.section-heading.narrow p:last-child {
		margin-top: 1rem;
		max-width: 36rem;
		line-height: 1.75;
		color: var(--muted-foreground);
	}

	.section-heading.row {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: end;
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 1.8rem;
	}

	.feature-card {
		padding: 1.4rem;
		border-radius: 1.5rem;
	}

	.feature-card h3 {
		font-size: 1.2rem;
	}

	.feature-card p {
		margin-top: 0.8rem;
		line-height: 1.7;
		color: var(--muted-foreground);
	}

	.split {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 1rem;
		align-items: start;
	}

	.workflow-panel {
		padding: 1.4rem;
		border-radius: 1.5rem;
	}

	.workflow-step {
		display: grid;
		grid-template-columns: 2.4rem 1fr;
		gap: 0.9rem;
		align-items: start;
	}

	.workflow-step + .workflow-step {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--line);
	}

	.workflow-step span {
		display: grid;
		place-items: center;
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 999px;
		background: var(--accent-soft);
		color: var(--primary);
		font-weight: 700;
	}

	.workflow-step p {
		padding-top: 0.3rem;
		line-height: 1.7;
		color: var(--muted-foreground);
	}

	.post-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 1.6rem;
	}

	.post-card {
		display: block;
		padding: 1.35rem;
		border-radius: 1.5rem;
		text-decoration: none;
		transition:
			transform 160ms ease,
			border-color 160ms ease,
			box-shadow 160ms ease;
	}

	.post-card:hover {
		transform: translateY(-3px);
		border-color: rgba(102, 178, 255, 0.42);
		box-shadow: 0 18px 36px rgba(19, 47, 76, 0.12);
	}

	.post-card p:first-child {
		font-size: 0.85rem;
		color: var(--muted-foreground);
	}

	.post-card h3 {
		margin-top: 0.45rem;
		font-size: 1.28rem;
		line-height: 1.2;
	}

	.post-card p:last-child {
		margin-top: 0.8rem;
		line-height: 1.65;
		color: var(--muted-foreground);
	}

	.empty-state {
		padding: 1.5rem;
		margin-top: 1.5rem;
		border-radius: 1.4rem;
	}

	.cta {
		display: flex;
		justify-content: space-between;
		gap: 1.5rem;
		align-items: center;
		max-width: 1240px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 1.25rem;
		padding: 2rem;
		border-radius: 2rem;
		background:
			linear-gradient(135deg, color-mix(in srgb, var(--accent) 75%, white), color-mix(in srgb, var(--card) 92%, white)),
			var(--surface);
	}

	.cta p:last-of-type {
		margin-top: 0.9rem;
		max-width: 42rem;
		line-height: 1.75;
		color: var(--muted-foreground);
	}

	@media (max-width: 980px) {
		.hero,
		.split,
		.cta,
		.feature-grid,
		.post-grid {
			grid-template-columns: 1fr;
		}

		.metrics {
			grid-template-columns: 1fr;
		}

		.section-heading.row,
		.cta {
			align-items: start;
			flex-direction: column;
		}
	}
</style>
