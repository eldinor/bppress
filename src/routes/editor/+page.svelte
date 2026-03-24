<script lang="ts">
	let { data, form } = $props();

	const projectModes = [
		{ value: 'link', label: 'Linked project' },
		{ value: 'placeholder', label: 'Placeholder card' }
	];
</script>

<svelte:head>
	<title>Editor | BP Press</title>
	<meta
		name="description"
		content="Local browser editor for BP Press posts and projects page content."
	/>
</svelte:head>

<div class="page-wrap">
	<section class="band">
		<div class="page-inner intro">
			<p class="eyebrow">Editor</p>
			<h1>Edit posts and page content from the browser.</h1>
			<p class="lede">
				This is a local file-backed editor for BP Press. It updates Markdown posts and the Projects
				page content directly in the repository.
			</p>
			{#if form?.message || data.saved === 'post' || data.saved === 'projects'}
				<p class="notice">
					{form?.message ?? (data.saved === 'post' ? 'Post saved.' : 'Projects page saved.')}
				</p>
			{/if}
		</div>
	</section>

	<section class="band">
		<div class="page-inner editor-grid">
			<aside class="panel sidebar">
				<div class="panel-heading">
					<h2>Posts</h2>
					<a class="new-link" href="/editor">New draft</a>
				</div>
				<div class="post-list">
					{#each data.posts as post}
						<a class:active={post.slug === data.selectedSlug} href={`/editor?post=${post.slug}`}>
							<strong>{post.title}</strong>
							<span>{post.date}</span>
						</a>
					{/each}
				</div>
			</aside>

			<div class="panel post-editor">
				<div class="panel-heading">
					<h2>Post editor</h2>
				</div>
				<form method="POST" action="?/savePost" class="editor-form">
					<input type="hidden" name="originalSlug" value={data.selectedPost.slug} />

					<label>
						<span>Title</span>
						<input name="title" value={data.selectedPost.title} required />
					</label>

					<div class="field-row">
						<label>
							<span>Slug</span>
							<input name="slug" value={data.selectedPost.slug} placeholder="auto-from-title" />
						</label>

						<label>
							<span>Date</span>
							<input name="date" type="date" value={data.selectedPost.date} required />
						</label>
					</div>

					<label>
						<span>Excerpt</span>
						<textarea name="excerpt" rows="3">{data.selectedPost.excerpt}</textarea>
					</label>

					<label>
						<span>Tags</span>
						<input
							name="tags"
							value={data.selectedPost.tags.join(', ')}
							placeholder="announcement, sveltekit, typescript"
						/>
					</label>

					<label>
						<span>Body</span>
						<textarea name="body" rows="20">{data.selectedPost.body}</textarea>
					</label>

					<div class="actions">
						<button class="button primary" type="submit">Save post</button>
					</div>
				</form>

				{#if data.selectedPost.slug}
					<form method="POST" action="?/deletePost" class="inline-form">
						<input type="hidden" name="slug" value={data.selectedPost.slug} />
						<button class="button danger" type="submit">Delete post</button>
					</form>
				{/if}
			</div>
		</div>
	</section>

	<section class="band">
		<div class="page-inner">
			<div class="panel">
				<div class="panel-heading">
					<h2>Projects page editor</h2>
					<form method="POST" action="?/addProject">
						<button class="button" type="submit">Add project</button>
					</form>
				</div>

				<form method="POST" action="?/saveProjectsPage" class="editor-form">
					<div class="project-list">
						{#each data.projectsPage.items as project, index}
							<div class="project-item">
								<div class="field-row">
									<label>
										<span>Project title</span>
										<input name="projectTitle" value={project.title} />
									</label>

									<label>
										<span>Status</span>
										<input name="projectStatus" value={project.status} />
									</label>
								</div>

								<label>
									<span>Description</span>
									<textarea name="projectDescription" rows="4">{project.description}</textarea>
								</label>

								<div class="field-row">
									<label>
										<span>Card type</span>
										<select name="projectMode">
											{#each projectModes as mode}
												<option value={mode.value} selected={project.mode === mode.value}>
													{mode.label}
												</option>
											{/each}
										</select>
									</label>

									<label>
										<span>Action label</span>
										<input name="projectActionLabel" value={project.actionLabel} />
									</label>
								</div>

								<label>
									<span>Link URL</span>
									<input
										name="projectHref"
										value={project.href}
										placeholder={project.mode === 'placeholder' ? 'Leave empty for placeholders' : '/showcase'}
									/>
								</label>

								<div class="inline-form">
									<button
										class="button danger"
										type="submit"
										formaction="?/deleteProject"
										formmethod="POST"
										name="deleteIndex"
										value={index}
									>
										Remove project
									</button>
								</div>
							</div>
						{/each}
					</div>

					<div class="callout-editor">
						<h3>Callout section</h3>

						<label>
							<span>Eyebrow</span>
							<input name="calloutEyebrow" value={data.projectsPage.callout.eyebrow} />
						</label>

						<label>
							<span>Title</span>
							<input name="calloutTitle" value={data.projectsPage.callout.title} />
						</label>

						<label>
							<span>Description</span>
							<textarea name="calloutDescription" rows="4">{data.projectsPage.callout.description}</textarea>
						</label>

						<div class="field-row">
							<label>
								<span>Primary label</span>
								<input name="primaryLabel" value={data.projectsPage.callout.primaryLabel} />
							</label>

							<label>
								<span>Primary link</span>
								<input name="primaryHref" value={data.projectsPage.callout.primaryHref} />
							</label>
						</div>

						<div class="field-row">
							<label>
								<span>Secondary label</span>
								<input name="secondaryLabel" value={data.projectsPage.callout.secondaryLabel} />
							</label>

							<label>
								<span>Secondary link</span>
								<input name="secondaryHref" value={data.projectsPage.callout.secondaryHref} />
							</label>
						</div>
					</div>

					<div class="actions">
						<button class="button primary" type="submit">Save Projects page</button>
					</div>
				</form>
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

	h1,
	h2,
	h3,
	p {
		margin: 0;
	}

	h1 {
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

	.notice {
		margin-top: 1rem;
		color: var(--primary);
		font-weight: 600;
	}

	.editor-grid {
		display: grid;
		grid-template-columns: 320px minmax(0, 1fr);
		gap: 1rem;
		align-items: start;
	}

	.panel {
		border: 1px solid var(--line);
		border-radius: 1.8rem;
		background: var(--surface);
		box-shadow: var(--shadow);
		padding: 1.5rem;
	}

	.panel-heading {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: center;
		margin-bottom: 1rem;
	}

	.new-link {
		color: var(--primary);
		text-decoration: none;
		font-size: 0.95rem;
		font-weight: 600;
	}

	.post-list {
		display: grid;
		gap: 0.75rem;
	}

	.post-list a {
		display: block;
		padding: 0.95rem 1rem;
		border: 1px solid var(--line);
		border-radius: 1rem;
		text-decoration: none;
		background: color-mix(in srgb, var(--card) 94%, white);
	}

	.post-list a.active {
		border-color: color-mix(in srgb, var(--primary) 40%, var(--line));
		background: color-mix(in srgb, var(--accent) 88%, white);
	}

	.post-list strong,
	.post-list span {
		display: block;
	}

	.post-list span {
		margin-top: 0.35rem;
		color: var(--muted-foreground);
		font-size: 0.92rem;
	}

	.editor-form {
		display: grid;
		gap: 1rem;
	}

	label {
		display: grid;
		gap: 0.45rem;
	}

	label span {
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--foreground);
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 0.9rem 1rem;
		border: 1px solid var(--line);
		border-radius: 1rem;
		background: #fff;
		color: var(--foreground);
	}

	textarea {
		resize: vertical;
	}

	.field-row {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.project-list {
		display: grid;
		gap: 1rem;
	}

	.project-item,
	.callout-editor {
		padding: 1.2rem;
		border: 1px solid var(--line);
		border-radius: 1.2rem;
		background: color-mix(in srgb, var(--card) 94%, white);
	}

	.callout-editor {
		display: grid;
		gap: 1rem;
	}

	.actions,
	.inline-form {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
	}

	.button {
		padding: 0.9rem 1.25rem;
		border: 1px solid var(--line);
		border-radius: 999px;
		background:
			linear-gradient(180deg, color-mix(in srgb, var(--card) 96%, white), color-mix(in srgb, var(--accent) 46%, white));
		color: var(--foreground);
		font: inherit;
		cursor: pointer;
	}

	.primary {
		background: linear-gradient(135deg, var(--primary), var(--accent-foreground));
		border-color: color-mix(in srgb, var(--accent-secondary) 26%, var(--primary));
		color: var(--primary-foreground);
	}

	.danger {
		color: var(--muted-foreground);
	}

	@media (max-width: 980px) {
		.editor-grid,
		.field-row {
			grid-template-columns: 1fr;
		}
	}
</style>
