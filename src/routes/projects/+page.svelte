<svelte:head>
	<title>Projects | BP Press</title>
	<meta
		name="description"
		content="A full-width overview of current BP Press projects, demos, and technical experiments."
	/>
</svelte:head>

<script lang="ts">
	import { projectsPageContent } from '$lib/content/projects';
</script>

<div class="page-wrap">
	<section class="band">
		<div class="page-inner">
			<div class="project-grid">
				{#each projectsPageContent.items as project}
					<article class:placeholder-card={project.mode === 'placeholder'} class="project-card">
						<p class="status">{project.status}</p>
						<h2>{project.title}</h2>
						<p class="project-description">{project.description}</p>
						{#if project.mode === 'link'}
							<a class="button project-button" href={project.href}>{project.actionLabel}</a>
						{:else}
							<span class="button project-button placeholder-button">{project.actionLabel}</span>
						{/if}
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="band">
		<div class="page-inner">
			<div class="callout">
				<div>
					<p class="eyebrow">{projectsPageContent.callout.eyebrow}</p>
					<h2>{projectsPageContent.callout.title}</h2>
					<p>{projectsPageContent.callout.description}</p>
				</div>
				<div class="actions">
					<a class="button primary" href={projectsPageContent.callout.primaryHref}>
						{projectsPageContent.callout.primaryLabel}
					</a>
					<a class="button" href={projectsPageContent.callout.secondaryHref}>
						{projectsPageContent.callout.secondaryLabel}
					</a>
				</div>
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

	h2,
	p {
		margin: 0;
	}

	.project-card,
	.callout {
		border: 1px solid var(--line);
		border-radius: 1.8rem;
		background: var(--surface);
		box-shadow: var(--shadow);
	}

	.status {
		font-size: 0.92rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--primary);
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.project-card {
		display: grid;
		align-content: start;
		gap: 0.85rem;
		padding: 1.7rem;
	}

	.placeholder-card {
		background:
			linear-gradient(180deg, color-mix(in srgb, var(--surface) 92%, white), color-mix(in srgb, var(--accent) 18%, white));
		border-style: dashed;
	}

	.project-card h2 {
		margin-top: 0.55rem;
		font-size: clamp(1.375rem, 1vw + 1rem, 1.75rem);
	}

	.project-description {
		color: var(--muted-foreground);
	}

	.project-button {
		margin-top: 0.35rem;
		justify-self: start;
	}

	.placeholder-button {
		cursor: default;
		opacity: 0.82;
	}

	.callout {
		display: flex;
		justify-content: space-between;
		gap: 1.5rem;
		align-items: center;
		padding: 2rem;
		background:
			linear-gradient(135deg, color-mix(in srgb, var(--accent) 72%, white), color-mix(in srgb, var(--card) 94%, white));
	}

	.callout h2 {
		max-width: 18ch;
	}

	.callout p:last-of-type {
		margin-top: 0.9rem;
		max-width: 48rem;
		color: var(--muted-foreground);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
	}

	.button {
		padding: 0.95rem 1.35rem;
		border: 1px solid var(--line);
		border-radius: 999px;
		background:
			linear-gradient(180deg, color-mix(in srgb, var(--card) 96%, white), color-mix(in srgb, var(--accent) 46%, white));
		text-decoration: none;
		transition:
			transform 160ms ease,
			border-color 160ms ease,
			box-shadow 160ms ease,
			color 160ms ease;
	}

	.button:hover {
		transform: translateY(-2px);
		color: var(--primary);
		border-color: color-mix(in srgb, var(--primary) 42%, var(--line));
		box-shadow: var(--shadow-material-hover);
	}

	.primary {
		background: linear-gradient(135deg, var(--primary), var(--accent-foreground));
		border-color: color-mix(in srgb, var(--accent-secondary) 26%, var(--primary));
		color: var(--primary-foreground);
		box-shadow:
			0 18px 32px -24px rgba(19, 102, 214, 0.55),
			0 0 0 1px rgba(255, 255, 255, 0.14) inset;
	}

	.primary:hover {
		color: var(--primary-foreground);
		border-color: color-mix(in srgb, var(--accent-secondary) 42%, var(--accent-foreground));
		box-shadow:
			0 24px 44px -28px rgba(19, 102, 214, 0.62),
			0 0 24px -18px var(--accent-glow);
	}

	@media (max-width: 980px) {
		.project-grid {
			grid-template-columns: 1fr;
		}

		.callout {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
