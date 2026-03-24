<script lang="ts">
	import { enhance } from '$app/forms';
	import { browser } from '$app/environment';
	import type { HomePageContent } from '$lib/content/home-page';
	import type { ProjectEntry, ProjectsPageContent } from '$lib/content/projects';
	import type {
		InfoCard,
		StaticPageContent,
		StaticPagesContent
	} from '$lib/content/static-pages';

	let { data, form } = $props();

	type SaveState = 'idle' | 'dirty' | 'ready';
	type EditablePageKey = 'about' | 'contact';
	type HomeSectionKey =
		| 'hero'
		| 'products'
		| 'whyChoose'
		| 'showcase'
		| 'community'
		| 'testimonials';

	const savedMessages: Record<string, string> = {
		post: 'Post saved.',
		'post-deleted': 'Post deleted.',
		home: 'Home page saved.',
		projects: 'Projects page saved.',
		pages: 'Page content saved.',
		'page-card-added': 'Page card added.'
	};

	const editorSections = [
		{ id: 'post-editor', label: 'Post editor' },
		{ id: 'home-editor', label: 'Home page' },
		{ id: 'projects-editor', label: 'Projects page' },
		{ id: 'pages-editor', label: 'About and Contact' }
	];

	const editablePages: Array<{ key: EditablePageKey; label: string; path: string }> = [
		{ key: 'about', label: 'About', path: '/about' },
		{ key: 'contact', label: 'Contact', path: '/contact' }
	];

	const homeSections: Array<{ key: HomeSectionKey; label: string }> = [
		{ key: 'hero', label: 'Hero' },
		{ key: 'products', label: 'Products' },
		{ key: 'whyChoose', label: 'Why choose us' },
		{ key: 'showcase', label: 'Showcase' },
		{ key: 'community', label: 'Community' },
		{ key: 'testimonials', label: 'Testimonials' }
	];

	function cloneProjectsPage(content: ProjectsPageContent): ProjectsPageContent {
		return {
			items: content.items.map((item) => ({ ...item })),
			callout: { ...content.callout }
		};
	}

	function createProjectDraft(): ProjectEntry {
		return {
			title: 'New Project',
			status: 'Draft',
			description: 'Describe the project here.',
			href: '/showcase'
		};
	}

	function cloneStaticPages(content: StaticPagesContent): StaticPagesContent {
		return {
			about: {
				...content.about,
				cards: content.about.cards.map((card) => ({ ...card }))
			},
			contact: {
				...content.contact,
				cards: content.contact.cards.map((card) => ({ ...card }))
			}
		};
	}

	function cloneHomePage(content: HomePageContent): HomePageContent {
		return {
			...content,
			hero: {
				...content.hero,
				previewList: [...content.hero.previewList]
			},
			trust: {
				...content.trust,
				logos: [...content.trust.logos]
			},
			products: {
				...content.products,
				features: content.products.features.map((feature) => ({ ...feature }))
			},
			whyChoose: {
				...content.whyChoose,
				advantages: [...content.whyChoose.advantages]
			},
			showcase: { ...content.showcase },
			community: {
				...content.community,
				stats: content.community.stats.map((stat) => ({ ...stat }))
			},
			testimonials: {
				...content.testimonials,
				items: content.testimonials.items.map((item) => ({ ...item }))
			}
		};
	}

	function createInfoCardDraft(): InfoCard {
		return {
			title: 'New Card',
			description: 'Add supporting page copy here.'
		};
	}

	const emptyProjectsPage: ProjectsPageContent = {
		items: [],
		callout: {
			eyebrow: '',
			title: '',
			description: '',
			primaryLabel: '',
			primaryHref: '',
			secondaryLabel: '',
			secondaryHref: ''
		}
	};
	const emptyStaticPage: StaticPageContent = {
		metaTitle: '',
		metaDescription: '',
		eyebrow: '',
		title: '',
		lede: '',
		cards: []
	};
	const emptyStaticPages: StaticPagesContent = {
		about: { ...emptyStaticPage, cards: [] },
		contact: { ...emptyStaticPage, cards: [] }
	};
	const emptyHomePage: HomePageContent = {
		metaTitle: '',
		metaDescription: '',
		hero: {
			eyebrow: '',
			title: '',
			description: '',
			primaryLabel: '',
			primaryHref: '',
			secondaryLabel: '',
			secondaryHref: '',
			previewPrimaryLabel: '',
			previewPrimaryText: '',
			previewMetricLabel: '',
			previewMetricText: '',
			previewCode: '',
			previewList: []
		},
		trust: {
			label: '',
			logos: []
		},
		products: {
			eyebrow: '',
			title: '',
			description: '',
			features: []
		},
		whyChoose: {
			eyebrow: '',
			title: '',
			description: '',
			advantages: []
		},
		showcase: {
			eyebrow: '',
			title: '',
			description: '',
			largeLabel: '',
			largeText: '',
			metricOneLabel: '',
			metricOneText: '',
			metricTwoLabel: '',
			metricTwoText: ''
		},
		community: {
			eyebrow: '',
			title: '',
			stats: []
		},
		testimonials: {
			eyebrow: '',
			title: '',
			items: []
		}
	};

	let homeDraft = $state<HomePageContent>(emptyHomePage);
	let selectedHomeSection = $state<HomeSectionKey>('hero');
	let selectedProjectIndex = $state(-1);
	let projectsDraft = $state<ProjectsPageContent>(emptyProjectsPage);
	let selectedStaticPageKey = $state<EditablePageKey>('about');
	let selectedStaticCardIndex = $state(-1);
	let staticPagesDraft = $state<StaticPagesContent>(emptyStaticPages);

	$effect(() => {
		homeDraft = cloneHomePage(data.homePage);
	});

	$effect(() => {
		const nextProjectsPage = cloneProjectsPage(data.projectsPage);
		projectsDraft = nextProjectsPage;
		selectedProjectIndex = nextProjectsPage.items.length ? 0 : -1;
	});

	$effect(() => {
		const nextStaticPages = cloneStaticPages(data.staticPages);
		staticPagesDraft = nextStaticPages;
		selectedStaticCardIndex = nextStaticPages[selectedStaticPageKey].cards.length ? 0 : -1;
	});

	const initialHomeSnapshot = $derived(JSON.stringify(data.homePage));
	const initialProjectsSnapshot = $derived(JSON.stringify(data.projectsPage));
	const initialProjectCount = $derived(data.projectsPage.items.length);
	const initialStaticPagesSnapshot = $derived(JSON.stringify(data.staticPages));

	const homeDirty = $derived(JSON.stringify(homeDraft) !== initialHomeSnapshot);
	const homeSaveState = $derived<SaveState>(homeDirty ? 'dirty' : 'idle');
	const homeNotice = $derived(form?.message ?? (data.saved ? savedMessages[data.saved] ?? null : null));
	const homeValidation = $derived.by(() => {
		const issues: string[] = [];
		if (!homeDraft.hero.title.trim()) issues.push('Home hero needs a title.');
		if (!homeDraft.products.title.trim()) issues.push('Products section needs a title.');
		if (!homeDraft.showcase.title.trim()) issues.push('Showcase section needs a title.');
		return issues;
	});
	const canSaveHome = $derived(homeValidation.length === 0);
	const projectsDirty = $derived(JSON.stringify(projectsDraft) !== initialProjectsSnapshot);
	const projectCountLabel = $derived(
		`${projectsDraft.items.length} card${projectsDraft.items.length === 1 ? '' : 's'}`
	);
	const projectSaveState = $derived<SaveState>(projectsDirty ? 'dirty' : 'idle');
	const selectedProject = $derived(
		selectedProjectIndex >= 0 && selectedProjectIndex < projectsDraft.items.length
			? projectsDraft.items[selectedProjectIndex]
			: null
	);
	const selectedProjectNumber = $derived(selectedProjectIndex + 1);
	const projectsValidation = $derived.by(() => {
		const issues: string[] = [];

		projectsDraft.items.forEach((project, index) => {
			if (!project.title.trim()) {
				issues.push(`Project ${index + 1} needs a title.`);
			}

			if (!project.description.trim()) {
				issues.push(`Project ${index + 1} needs a description.`);
			}
		});

		if (!projectsDraft.callout.title.trim()) {
			issues.push('The callout section needs a title.');
		}

		return issues;
	});
	const canSaveProjects = $derived(projectsValidation.length === 0);
	const projectsNotice = $derived(form?.message ?? (data.saved ? savedMessages[data.saved] ?? null : null));
	const staticPagesDirty = $derived(JSON.stringify(staticPagesDraft) !== initialStaticPagesSnapshot);
	const staticPageSaveState = $derived<SaveState>(staticPagesDirty ? 'dirty' : 'idle');
	const selectedStaticPage = $derived(staticPagesDraft[selectedStaticPageKey]);
	const selectedStaticCard = $derived(
		selectedStaticCardIndex >= 0 && selectedStaticCardIndex < selectedStaticPage.cards.length
			? selectedStaticPage.cards[selectedStaticCardIndex]
			: null
	);
	const selectedStaticPageMeta = $derived(editablePages.find((page) => page.key === selectedStaticPageKey));
	const staticPagesValidation = $derived.by(() => {
		const issues: string[] = [];

		for (const page of editablePages) {
			const content = staticPagesDraft[page.key];
			if (!content.metaTitle.trim()) {
				issues.push(`${page.label} page needs a meta title.`);
			}
			if (!content.title.trim()) {
				issues.push(`${page.label} page needs a page title.`);
			}
			content.cards.forEach((card, index) => {
				if (!card.title.trim()) {
					issues.push(`${page.label} card ${index + 1} needs a title.`);
				}
			});
		}

		return issues;
	});
	const canSaveStaticPages = $derived(staticPagesValidation.length === 0);

	function linesToText(values: string[]) {
		return values.join('\n');
	}

	function textToLines(value: string) {
		return value
			.split(/\r?\n/)
			.map((item) => item.trim())
			.filter(Boolean);
	}

	function resetHomeDraft() {
		if (browser && homeDirty && !window.confirm('Discard your unsaved Home page changes?')) {
			return;
		}

		homeDraft = cloneHomePage(data.homePage);
	}

	function addProject() {
		projectsDraft.items = [...projectsDraft.items, createProjectDraft()];
		selectedProjectIndex = projectsDraft.items.length - 1;
	}

	function duplicateProject() {
		if (!selectedProject) return;

		const clone = { ...selectedProject, title: `${selectedProject.title} Copy` };
		projectsDraft.items = [
			...projectsDraft.items.slice(0, selectedProjectIndex + 1),
			clone,
			...projectsDraft.items.slice(selectedProjectIndex + 1)
		];
		selectedProjectIndex += 1;
	}

	function removeProject() {
		if (!selectedProject) return;
		if (browser && !window.confirm(`Remove "${selectedProject.title}" from the Projects page draft?`)) {
			return;
		}

		projectsDraft.items = projectsDraft.items.filter((_project, index) => index !== selectedProjectIndex);
		selectedProjectIndex = projectsDraft.items.length ? Math.min(selectedProjectIndex, projectsDraft.items.length - 1) : -1;
	}

	function moveProject(direction: -1 | 1) {
		if (!selectedProject) return;

		const targetIndex = selectedProjectIndex + direction;
		if (targetIndex < 0 || targetIndex >= projectsDraft.items.length) return;

		const items = [...projectsDraft.items];
		const [current] = items.splice(selectedProjectIndex, 1);
		items.splice(targetIndex, 0, current);
		projectsDraft.items = items;
		selectedProjectIndex = targetIndex;
	}

	function resetProjectsDraft() {
		if (browser && projectsDirty && !window.confirm('Discard your unsaved Projects page changes?')) {
			return;
		}

		projectsDraft = cloneProjectsPage(data.projectsPage);
		selectedProjectIndex = projectsDraft.items.length ? Math.min(selectedProjectIndex, projectsDraft.items.length - 1) : -1;
	}

	function selectStaticPage(pageKey: EditablePageKey) {
		selectedStaticPageKey = pageKey;
		selectedStaticCardIndex = staticPagesDraft[pageKey].cards.length ? 0 : -1;
	}

	function addStaticCard() {
		staticPagesDraft[selectedStaticPageKey].cards = [
			...staticPagesDraft[selectedStaticPageKey].cards,
			createInfoCardDraft()
		];
		selectedStaticCardIndex = staticPagesDraft[selectedStaticPageKey].cards.length - 1;
	}

	function duplicateStaticCard() {
		if (!selectedStaticCard) return;

		const clone = { ...selectedStaticCard, title: `${selectedStaticCard.title} Copy` };
		staticPagesDraft[selectedStaticPageKey].cards = [
			...selectedStaticPage.cards.slice(0, selectedStaticCardIndex + 1),
			clone,
			...selectedStaticPage.cards.slice(selectedStaticCardIndex + 1)
		];
		selectedStaticCardIndex += 1;
	}

	function removeStaticCard() {
		if (!selectedStaticCard) return;
		if (browser && !window.confirm(`Remove "${selectedStaticCard.title}" from the ${selectedStaticPageMeta?.label} page draft?`)) {
			return;
		}

		staticPagesDraft[selectedStaticPageKey].cards = selectedStaticPage.cards.filter(
			(_card, index) => index !== selectedStaticCardIndex
		);
		selectedStaticCardIndex = staticPagesDraft[selectedStaticPageKey].cards.length
			? Math.min(selectedStaticCardIndex, staticPagesDraft[selectedStaticPageKey].cards.length - 1)
			: -1;
	}

	function moveStaticCard(direction: -1 | 1) {
		if (!selectedStaticCard) return;

		const targetIndex = selectedStaticCardIndex + direction;
		if (targetIndex < 0 || targetIndex >= selectedStaticPage.cards.length) return;

		const cards = [...selectedStaticPage.cards];
		const [current] = cards.splice(selectedStaticCardIndex, 1);
		cards.splice(targetIndex, 0, current);
		staticPagesDraft[selectedStaticPageKey].cards = cards;
		selectedStaticCardIndex = targetIndex;
	}

	function resetStaticPagesDraft() {
		if (browser && staticPagesDirty && !window.confirm('Discard your unsaved page content changes?')) {
			return;
		}

		staticPagesDraft = cloneStaticPages(data.staticPages);
		selectedStaticCardIndex = staticPagesDraft[selectedStaticPageKey].cards.length ? 0 : -1;
	}

	function handleBeforeUnload(event: BeforeUnloadEvent) {
		if (!homeDirty && !projectsDirty && !staticPagesDirty) return;
		event.preventDefault();
		event.returnValue = '';
	}
</script>

<svelte:head>
	<title>Editor | BP Press</title>
	<meta
		name="description"
		content="Local browser editor for BP Press posts and projects page content."
	/>
</svelte:head>

<svelte:window onbeforeunload={handleBeforeUnload} />

<div class="page-wrap">
	<div class="page-inner intro">
		<p class="eyebrow">Editor</p>
		<h1>Edit posts and page content from the browser.</h1>
		<p class="lede">
			This is a local file-backed editor for BP Press. It updates Markdown posts and the Projects
			page content directly in the repository.
		</p>
		{#if homeNotice}
			<p class="notice success">{homeNotice}</p>
		{/if}
	</div>

	<div class="page-inner editor-grid" id="post-editor">
			<aside class="panel sidebar">
				<div class="panel-heading">
					<h2>Content</h2>
					<a class="new-link" href="/editor">New draft</a>
				</div>
				<div class="sidebar-group">
					<p class="section-label">Editors</p>
					<div class="page-tab-row compact-tabs">
						{#each editorSections as section}
							<a class="page-tab" href={`#${section.id}`}>
								<span>{section.label}</span>
							</a>
						{/each}
					</div>
				</div>
				<div class="sidebar-group">
					<p class="section-label">Pages</p>
					<div class="page-tab-row compact-tabs">
						<a class="page-tab" href="/">Home</a>
						<a class="page-tab" href="/projects">Projects</a>
						{#each editablePages as page}
							<a class="page-tab" href={page.path}>{page.label}</a>
						{/each}
					</div>
				</div>
				<div class="sidebar-group">
					<p class="section-label">Posts</p>
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
					<div>
						<p class="section-label">Content</p>
						<h2>Post editor</h2>
					</div>
				</div>
				<form method="POST" action="?/savePost" class="editor-form" use:enhance>
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
						<span>Cover image URL</span>
						<input
							name="cover"
							value={data.selectedPost.cover}
							placeholder="/images/post-cover.jpg"
						/>
					</label>

					<label>
						<span>Body</span>
						<textarea name="body" rows="18">{data.selectedPost.body}</textarea>
					</label>

					<div class="actions">
						<button class="button primary" type="submit">Save post</button>
					</div>
				</form>

				{#if data.selectedPost.slug}
					<form method="POST" action="?/deletePost" class="inline-form" use:enhance>
						<input type="hidden" name="slug" value={data.selectedPost.slug} />
						<button class="button danger" type="submit">Delete post</button>
					</form>
				{/if}
			</div>
	</div>

	<div class="page-inner" id="home-editor">
		<form method="POST" action="?/saveHomePage" class="panel projects-shell" use:enhance>
				<div class="projects-topbar">
					<div>
						<p class="section-label">Home</p>
						<h2>Home page editor</h2>
						<p class="panel-copy">
							Edit hero messaging, trust strip, product sections, showcase text, stats, and testimonials.
						</p>
					</div>
					<div class="save-cluster">
						<div class="save-meta">
							<span class:dirty={homeSaveState === 'dirty'} class="status-chip">
								{homeSaveState === 'dirty' ? 'Unsaved changes' : 'All changes saved'}
							</span>
						</div>
						<div class="actions">
							<button class="button ghost" type="button" onclick={resetHomeDraft} disabled={!homeDirty}>
								Reset
							</button>
							<button class="button primary" type="submit" disabled={!canSaveHome}>
								Save Home page
							</button>
						</div>
					</div>
				</div>

				{#if homeValidation.length}
					<div class="notice warning">
						<strong>Before saving:</strong>
						<ul class="issue-list">
							{#each homeValidation as issue}
								<li>{issue}</li>
							{/each}
						</ul>
					</div>
				{/if}

				<div class="projects-workspace">
					<aside class="project-nav">
						<div class="nav-heading">
							<div>
								<h3>Home sections</h3>
								<p>Switch between major front page areas.</p>
							</div>
						</div>

						<div class="page-tab-row">
							{#each homeSections as section}
								<button
									type="button"
									class:active={section.key === selectedHomeSection}
									class="page-tab"
									onclick={() => (selectedHomeSection = section.key)}
								>
									<span>{section.label}</span>
								</button>
							{/each}
						</div>
					</aside>

					<section class="project-detail">
						<div class="editor-card">
							<div class="editor-card-header">
								<div>
									<p class="section-label">Meta</p>
									<h3>Search and browser metadata</h3>
								</div>
							</div>
							<div class="field-row">
								<label>
									<span>Meta title</span>
									<input bind:value={homeDraft.metaTitle} />
								</label>
								<label>
									<span>Meta description</span>
									<input bind:value={homeDraft.metaDescription} />
								</label>
							</div>
						</div>

						{#if selectedHomeSection === 'hero'}
							<div class="editor-card">
								<h3>Hero section</h3>
								<div class="field-row">
									<label>
										<span>Eyebrow</span>
										<input bind:value={homeDraft.hero.eyebrow} />
									</label>
									<label>
										<span>Title</span>
										<input bind:value={homeDraft.hero.title} />
									</label>
								</div>
								<label>
									<span>Description</span>
									<textarea bind:value={homeDraft.hero.description} rows="4"></textarea>
								</label>
								<div class="field-row">
									<label>
										<span>Primary label</span>
										<input bind:value={homeDraft.hero.primaryLabel} />
									</label>
									<label>
										<span>Primary link</span>
										<input bind:value={homeDraft.hero.primaryHref} />
									</label>
								</div>
								<div class="field-row">
									<label>
										<span>Secondary label</span>
										<input bind:value={homeDraft.hero.secondaryLabel} />
									</label>
									<label>
										<span>Secondary link</span>
										<input bind:value={homeDraft.hero.secondaryHref} />
									</label>
								</div>
								<div class="field-row">
									<label>
										<span>Preview primary label</span>
										<input bind:value={homeDraft.hero.previewPrimaryLabel} />
									</label>
									<label>
										<span>Preview primary text</span>
										<input bind:value={homeDraft.hero.previewPrimaryText} />
									</label>
								</div>
								<div class="field-row">
									<label>
										<span>Preview metric label</span>
										<input bind:value={homeDraft.hero.previewMetricLabel} />
									</label>
									<label>
										<span>Preview metric text</span>
										<input bind:value={homeDraft.hero.previewMetricText} />
									</label>
								</div>
								<label>
									<span>Preview code</span>
									<input bind:value={homeDraft.hero.previewCode} />
								</label>
								<label>
									<span>Preview list, one per line</span>
									<textarea
										value={linesToText(homeDraft.hero.previewList)}
										oninput={(event) =>
											(homeDraft.hero.previewList = textToLines((event.currentTarget as HTMLTextAreaElement).value))}
										rows="4"
									></textarea>
								</label>
								<label>
									<span>Trust strip text</span>
									<input bind:value={homeDraft.trust.label} />
								</label>
								<label>
									<span>Trusted logos, one per line</span>
									<textarea
										value={linesToText(homeDraft.trust.logos)}
										oninput={(event) =>
											(homeDraft.trust.logos = textToLines((event.currentTarget as HTMLTextAreaElement).value))}
										rows="6"
									></textarea>
								</label>
							</div>
						{/if}

						{#if selectedHomeSection === 'products'}
							<div class="editor-card">
								<h3>Products section</h3>
								<div class="field-row">
									<label><span>Eyebrow</span><input bind:value={homeDraft.products.eyebrow} /></label>
									<label><span>Title</span><input bind:value={homeDraft.products.title} /></label>
								</div>
								<label>
									<span>Description</span>
									<textarea bind:value={homeDraft.products.description} rows="4"></textarea>
								</label>
								{#each homeDraft.products.features as feature}
									<div class="editor-subcard">
										<label><span>Feature title</span><input bind:value={feature.title} /></label>
										<label><span>Feature description</span><textarea bind:value={feature.description} rows="3"></textarea></label>
									</div>
								{/each}
							</div>
						{/if}

						{#if selectedHomeSection === 'whyChoose'}
							<div class="editor-card">
								<h3>Why choose us</h3>
								<div class="field-row">
									<label><span>Eyebrow</span><input bind:value={homeDraft.whyChoose.eyebrow} /></label>
									<label><span>Title</span><input bind:value={homeDraft.whyChoose.title} /></label>
								</div>
								<label>
									<span>Description</span>
									<textarea bind:value={homeDraft.whyChoose.description} rows="4"></textarea>
								</label>
								<label>
									<span>Advantages, one per line</span>
									<textarea
										value={linesToText(homeDraft.whyChoose.advantages)}
										oninput={(event) =>
											(homeDraft.whyChoose.advantages = textToLines((event.currentTarget as HTMLTextAreaElement).value))}
										rows="5"
									></textarea>
								</label>
							</div>
						{/if}

						{#if selectedHomeSection === 'showcase'}
							<div class="editor-card">
								<h3>Showcase section</h3>
								<div class="field-row">
									<label><span>Eyebrow</span><input bind:value={homeDraft.showcase.eyebrow} /></label>
									<label><span>Title</span><input bind:value={homeDraft.showcase.title} /></label>
								</div>
								<label>
									<span>Description</span>
									<textarea bind:value={homeDraft.showcase.description} rows="4"></textarea>
								</label>
								<div class="field-row">
									<label><span>Large panel label</span><input bind:value={homeDraft.showcase.largeLabel} /></label>
									<label><span>Large panel text</span><input bind:value={homeDraft.showcase.largeText} /></label>
								</div>
								<div class="field-row">
									<label><span>Metric one label</span><input bind:value={homeDraft.showcase.metricOneLabel} /></label>
									<label><span>Metric one text</span><input bind:value={homeDraft.showcase.metricOneText} /></label>
								</div>
								<div class="field-row">
									<label><span>Metric two label</span><input bind:value={homeDraft.showcase.metricTwoLabel} /></label>
									<label><span>Metric two text</span><input bind:value={homeDraft.showcase.metricTwoText} /></label>
								</div>
							</div>
						{/if}

						{#if selectedHomeSection === 'community'}
							<div class="editor-card">
								<h3>Community section</h3>
								<div class="field-row">
									<label><span>Eyebrow</span><input bind:value={homeDraft.community.eyebrow} /></label>
									<label><span>Title</span><input bind:value={homeDraft.community.title} /></label>
								</div>
								{#each homeDraft.community.stats as stat}
									<div class="field-row editor-subcard">
										<label><span>Stat value</span><input bind:value={stat.value} /></label>
										<label><span>Stat label</span><input bind:value={stat.label} /></label>
									</div>
								{/each}
							</div>
						{/if}

						{#if selectedHomeSection === 'testimonials'}
							<div class="editor-card">
								<h3>Testimonials section</h3>
								<div class="field-row">
									<label><span>Eyebrow</span><input bind:value={homeDraft.testimonials.eyebrow} /></label>
									<label><span>Title</span><input bind:value={homeDraft.testimonials.title} /></label>
								</div>
								{#each homeDraft.testimonials.items as item}
									<div class="editor-subcard">
										<label><span>Quote</span><textarea bind:value={item.quote} rows="3"></textarea></label>
										<div class="field-row">
											<label><span>Name</span><input bind:value={item.name} /></label>
											<label><span>Role</span><input bind:value={item.role} /></label>
										</div>
										<label><span>Company</span><input bind:value={item.company} /></label>
									</div>
								{/each}
							</div>
						{/if}
					</section>

					<aside class="project-preview">
						<div class="preview-card">
							<p class="section-label">Home preview</p>
							<h3>{homeDraft.hero.title || 'Hero title'}</h3>
							<p class="preview-copy">{homeDraft.hero.description || 'Hero copy preview will appear here.'}</p>
							<div class="inline-form">
								<span class="preview-button primary-preview">{homeDraft.hero.primaryLabel || 'Primary action'}</span>
								<span class="preview-button">{homeDraft.hero.secondaryLabel || 'Secondary action'}</span>
							</div>
						</div>
						<div class="preview-card">
							<p class="section-label">Section snapshot</p>
							<h3>{homeSections.find((section) => section.key === selectedHomeSection)?.label}</h3>
							<p class="preview-copy">
								{selectedHomeSection === 'products'
									? `${homeDraft.products.features.length} feature cards`
									: selectedHomeSection === 'community'
										? `${homeDraft.community.stats.length} stats`
										: selectedHomeSection === 'testimonials'
											? `${homeDraft.testimonials.items.length} testimonials`
											: selectedHomeSection === 'whyChoose'
												? `${homeDraft.whyChoose.advantages.length} advantage bullets`
												: 'Editing focused section content.'}
							</p>
						</div>
					</aside>
				</div>

				<div class="serialized-fields" aria-hidden="true">
					<input type="hidden" name="metaTitle" value={homeDraft.metaTitle} />
					<input type="hidden" name="metaDescription" value={homeDraft.metaDescription} />
					<input type="hidden" name="heroEyebrow" value={homeDraft.hero.eyebrow} />
					<input type="hidden" name="heroTitle" value={homeDraft.hero.title} />
					<input type="hidden" name="heroDescription" value={homeDraft.hero.description} />
					<input type="hidden" name="heroPrimaryLabel" value={homeDraft.hero.primaryLabel} />
					<input type="hidden" name="heroPrimaryHref" value={homeDraft.hero.primaryHref} />
					<input type="hidden" name="heroSecondaryLabel" value={homeDraft.hero.secondaryLabel} />
					<input type="hidden" name="heroSecondaryHref" value={homeDraft.hero.secondaryHref} />
					<input type="hidden" name="previewPrimaryLabel" value={homeDraft.hero.previewPrimaryLabel} />
					<input type="hidden" name="previewPrimaryText" value={homeDraft.hero.previewPrimaryText} />
					<input type="hidden" name="previewMetricLabel" value={homeDraft.hero.previewMetricLabel} />
					<input type="hidden" name="previewMetricText" value={homeDraft.hero.previewMetricText} />
					<input type="hidden" name="previewCode" value={homeDraft.hero.previewCode} />
					<input type="hidden" name="previewList" value={linesToText(homeDraft.hero.previewList)} />
					<input type="hidden" name="trustLabel" value={homeDraft.trust.label} />
					<input type="hidden" name="trustLogos" value={linesToText(homeDraft.trust.logos)} />
					<input type="hidden" name="productsEyebrow" value={homeDraft.products.eyebrow} />
					<input type="hidden" name="productsTitle" value={homeDraft.products.title} />
					<input type="hidden" name="productsDescription" value={homeDraft.products.description} />
					{#each homeDraft.products.features as feature}
						<input type="hidden" name="featureTitle" value={feature.title} />
						<input type="hidden" name="featureDescription" value={feature.description} />
					{/each}
					<input type="hidden" name="whyChooseEyebrow" value={homeDraft.whyChoose.eyebrow} />
					<input type="hidden" name="whyChooseTitle" value={homeDraft.whyChoose.title} />
					<input type="hidden" name="whyChooseDescription" value={homeDraft.whyChoose.description} />
					<input type="hidden" name="advantages" value={linesToText(homeDraft.whyChoose.advantages)} />
					<input type="hidden" name="showcaseEyebrow" value={homeDraft.showcase.eyebrow} />
					<input type="hidden" name="showcaseTitle" value={homeDraft.showcase.title} />
					<input type="hidden" name="showcaseDescription" value={homeDraft.showcase.description} />
					<input type="hidden" name="showcaseLargeLabel" value={homeDraft.showcase.largeLabel} />
					<input type="hidden" name="showcaseLargeText" value={homeDraft.showcase.largeText} />
					<input type="hidden" name="showcaseMetricOneLabel" value={homeDraft.showcase.metricOneLabel} />
					<input type="hidden" name="showcaseMetricOneText" value={homeDraft.showcase.metricOneText} />
					<input type="hidden" name="showcaseMetricTwoLabel" value={homeDraft.showcase.metricTwoLabel} />
					<input type="hidden" name="showcaseMetricTwoText" value={homeDraft.showcase.metricTwoText} />
					<input type="hidden" name="communityEyebrow" value={homeDraft.community.eyebrow} />
					<input type="hidden" name="communityTitle" value={homeDraft.community.title} />
					{#each homeDraft.community.stats as stat}
						<input type="hidden" name="statValue" value={stat.value} />
						<input type="hidden" name="statLabel" value={stat.label} />
					{/each}
					<input type="hidden" name="testimonialsEyebrow" value={homeDraft.testimonials.eyebrow} />
					<input type="hidden" name="testimonialsTitle" value={homeDraft.testimonials.title} />
					{#each homeDraft.testimonials.items as item}
						<input type="hidden" name="testimonialQuote" value={item.quote} />
						<input type="hidden" name="testimonialName" value={item.name} />
						<input type="hidden" name="testimonialRole" value={item.role} />
						<input type="hidden" name="testimonialCompany" value={item.company} />
					{/each}
				</div>
		</form>
	</div>

	<div class="page-inner" id="projects-editor">
		<form method="POST" action="?/saveProjectsPage" class="panel projects-shell" use:enhance>
				<div class="projects-topbar">
					<div>
						<p class="section-label">Projects</p>
						<h2>Projects page editor</h2>
						<p class="panel-copy">
							Manage the card order, edit the selected project, and keep the callout section in sync.
						</p>
					</div>
					<div class="save-cluster">
						<div class="save-meta">
							<span class:dirty={projectSaveState === 'dirty'} class="status-chip">
								{projectSaveState === 'dirty' ? 'Unsaved changes' : 'All changes saved'}
							</span>
							<span class="meta-copy">{projectCountLabel}</span>
							{#if initialProjectCount !== projectsDraft.items.length}
								<span class="meta-copy">started with {initialProjectCount}</span>
							{/if}
						</div>
						<div class="actions">
							<button class="button ghost" type="button" onclick={resetProjectsDraft} disabled={!projectsDirty}>
								Reset
							</button>
							<button class="button primary" type="submit" disabled={!canSaveProjects}>
								Save Projects page
							</button>
						</div>
					</div>
				</div>

				{#if projectsValidation.length}
					<div class="notice warning">
						<strong>Before saving:</strong>
						<ul class="issue-list">
							{#each projectsValidation as issue}
								<li>{issue}</li>
							{/each}
						</ul>
					</div>
				{/if}

				<div class="projects-workspace">
					<aside class="project-nav">
						<div class="nav-heading">
							<div>
								<h3>Project cards</h3>
								<p>Select a card to edit its content.</p>
							</div>
							<button class="button" type="button" onclick={addProject}>Add project</button>
						</div>

						<div class="project-stack">
							{#each projectsDraft.items as project, index}
								<button
									type="button"
									class:active={index === selectedProjectIndex}
									class="project-nav-item"
									onclick={() => (selectedProjectIndex = index)}
								>
									<span class="project-nav-index">{index + 1}</span>
									<span class="project-nav-copy">
										<strong>{project.title || 'Untitled project'}</strong>
										<small>{project.status || 'No status set'}</small>
									</span>
								</button>
							{/each}
						</div>
					</aside>

					<section class="project-detail">
						{#if selectedProject}
							<div class="editor-card">
								<div class="editor-card-header">
									<div>
										<p class="section-label">Selected card</p>
										<h3>Project {selectedProjectNumber}</h3>
									</div>
									<div class="inline-form">
										<button
											class="button ghost"
											type="button"
											onclick={() => moveProject(-1)}
											disabled={selectedProjectIndex === 0}
										>
											Move up
										</button>
										<button
											class="button ghost"
											type="button"
											onclick={() => moveProject(1)}
											disabled={selectedProjectIndex === projectsDraft.items.length - 1}
										>
											Move down
										</button>
										<button class="button ghost" type="button" onclick={duplicateProject}>
											Duplicate
										</button>
										<button class="button danger" type="button" onclick={removeProject}>
											Remove
										</button>
									</div>
								</div>

								<div class="field-row">
									<label>
										<span>Project title</span>
										<input bind:value={selectedProject.title} placeholder="Babylon Viewer v2" />
									</label>

									<label>
										<span>Status</span>
										<input bind:value={selectedProject.status} placeholder="Actively used" />
									</label>
								</div>

								<label>
									<span>Description</span>
									<textarea bind:value={selectedProject.description} rows="5"></textarea>
								</label>

								<label>
									<span>Link URL</span>
									<input bind:value={selectedProject.href} placeholder="/showcase" />
								</label>
							</div>
						{:else}
							<div class="empty-state">
								<h3>No project selected</h3>
								<p>Add a project card to start editing the Projects page layout.</p>
								<button class="button primary" type="button" onclick={addProject}>Add first project</button>
							</div>
						{/if}

						<div class="editor-card callout-editor">
							<div class="editor-card-header">
								<div>
									<p class="section-label">Callout</p>
									<h3>Bottom callout section</h3>
								</div>
							</div>

							<label>
								<span>Eyebrow</span>
								<input bind:value={projectsDraft.callout.eyebrow} />
							</label>

							<label>
								<span>Title</span>
								<input bind:value={projectsDraft.callout.title} />
							</label>

							<label>
								<span>Description</span>
								<textarea bind:value={projectsDraft.callout.description} rows="4"></textarea>
							</label>

							<div class="field-row">
								<label>
									<span>Primary label</span>
									<input bind:value={projectsDraft.callout.primaryLabel} />
								</label>

								<label>
									<span>Primary link</span>
									<input bind:value={projectsDraft.callout.primaryHref} />
								</label>
							</div>

							<div class="field-row">
								<label>
									<span>Secondary label</span>
									<input bind:value={projectsDraft.callout.secondaryLabel} />
								</label>

								<label>
									<span>Secondary link</span>
									<input bind:value={projectsDraft.callout.secondaryHref} />
								</label>
							</div>
						</div>
					</section>

					<aside class="project-preview">
						<div class="preview-card">
							<p class="section-label">Preview</p>
							<h3>Selected project card</h3>
							{#if selectedProject}
								<div class="project-preview-card">
									<p class="status">{selectedProject.status || 'Status'}</p>
									<h4>{selectedProject.title || 'Untitled project'}</h4>
									<p>{selectedProject.description || 'Description preview will appear here.'}</p>
									<span class="preview-button">Read more</span>
								</div>
							{:else}
								<p class="preview-copy">Select a project from the left to preview the card.</p>
							{/if}
						</div>

						<div class="preview-card">
							<p class="section-label">Callout preview</p>
							<h3>{projectsDraft.callout.title || 'Callout title'}</h3>
							<p class="preview-copy">
								{projectsDraft.callout.description || 'Callout description preview will appear here.'}
							</p>
							<div class="inline-form">
								<span class="preview-button primary-preview">
									{projectsDraft.callout.primaryLabel || 'Primary action'}
								</span>
								<span class="preview-button">
									{projectsDraft.callout.secondaryLabel || 'Secondary action'}
								</span>
							</div>
						</div>
					</aside>
				</div>

				<div class="serialized-fields" aria-hidden="true">
					{#each projectsDraft.items as project}
						<input type="hidden" name="projectTitle" value={project.title} />
						<input type="hidden" name="projectStatus" value={project.status} />
						<input type="hidden" name="projectDescription" value={project.description} />
						<input type="hidden" name="projectHref" value={project.href} />
					{/each}

					<input type="hidden" name="calloutEyebrow" value={projectsDraft.callout.eyebrow} />
					<input type="hidden" name="calloutTitle" value={projectsDraft.callout.title} />
					<input type="hidden" name="calloutDescription" value={projectsDraft.callout.description} />
					<input type="hidden" name="primaryLabel" value={projectsDraft.callout.primaryLabel} />
					<input type="hidden" name="primaryHref" value={projectsDraft.callout.primaryHref} />
					<input type="hidden" name="secondaryLabel" value={projectsDraft.callout.secondaryLabel} />
					<input type="hidden" name="secondaryHref" value={projectsDraft.callout.secondaryHref} />
				</div>
		</form>
	</div>

	<div class="page-inner" id="pages-editor">
		<form method="POST" action="?/saveStaticPages" class="panel projects-shell" use:enhance>
				<div class="projects-topbar">
					<div>
						<p class="section-label">Pages</p>
						<h2>About and Contact editor</h2>
						<p class="panel-copy">
							Edit intro copy, meta description, supporting cards, and preview the selected page section.
						</p>
					</div>
					<div class="save-cluster">
						<div class="save-meta">
							<span class:dirty={staticPageSaveState === 'dirty'} class="status-chip">
								{staticPageSaveState === 'dirty' ? 'Unsaved changes' : 'All changes saved'}
							</span>
							<span class="meta-copy">{selectedStaticPage.cards.length} card{selectedStaticPage.cards.length === 1 ? '' : 's'} on {selectedStaticPageMeta?.label}</span>
						</div>
						<div class="actions">
							<button class="button ghost" type="button" onclick={resetStaticPagesDraft} disabled={!staticPagesDirty}>
								Reset
							</button>
							<button class="button primary" type="submit" disabled={!canSaveStaticPages}>
								Save page content
							</button>
						</div>
					</div>
				</div>

				{#if staticPagesValidation.length}
					<div class="notice warning">
						<strong>Before saving:</strong>
						<ul class="issue-list">
							{#each staticPagesValidation as issue}
								<li>{issue}</li>
							{/each}
						</ul>
					</div>
				{/if}

				<div class="projects-workspace">
					<aside class="project-nav">
						<div class="nav-heading">
							<div>
								<h3>Pages</h3>
								<p>Switch between editable pages and manage their cards.</p>
							</div>
						</div>

						<div class="page-tab-row">
							{#each editablePages as page}
								<button
									type="button"
									class:active={page.key === selectedStaticPageKey}
									class="page-tab"
									onclick={() => selectStaticPage(page.key)}
								>
									<span>{page.label}</span>
									<small>{page.path}</small>
								</button>
							{/each}
						</div>

						<div class="project-stack">
							<div class="nav-subhead">
								<strong>{selectedStaticPageMeta?.label} cards</strong>
								<button class="button" type="button" onclick={addStaticCard}>Add card</button>
							</div>

							{#each selectedStaticPage.cards as card, index}
								<button
									type="button"
									class:active={index === selectedStaticCardIndex}
									class="project-nav-item"
									onclick={() => (selectedStaticCardIndex = index)}
								>
									<span class="project-nav-index">{index + 1}</span>
									<span class="project-nav-copy">
										<strong>{card.title || 'Untitled card'}</strong>
										<small>{card.description || 'No description yet'}</small>
									</span>
								</button>
							{/each}
						</div>
					</aside>

					<section class="project-detail">
						<div class="editor-card">
							<div class="editor-card-header">
								<div>
									<p class="section-label">Page settings</p>
									<h3>{selectedStaticPageMeta?.label} page</h3>
								</div>
							</div>

							<div class="field-row">
								<label>
									<span>Meta title</span>
									<input bind:value={selectedStaticPage.metaTitle} />
								</label>

								<label>
									<span>Meta description</span>
									<input bind:value={selectedStaticPage.metaDescription} />
								</label>
							</div>

							<div class="field-row">
								<label>
									<span>Eyebrow</span>
									<input bind:value={selectedStaticPage.eyebrow} />
								</label>

								<label>
									<span>Page title</span>
									<input bind:value={selectedStaticPage.title} />
								</label>
							</div>

							<label>
								<span>Lead paragraph</span>
								<textarea bind:value={selectedStaticPage.lede} rows="4"></textarea>
							</label>
						</div>

						{#if selectedStaticCard}
							<div class="editor-card">
								<div class="editor-card-header">
									<div>
										<p class="section-label">Selected card</p>
										<h3>{selectedStaticPageMeta?.label} card {selectedStaticCardIndex + 1}</h3>
									</div>
									<div class="inline-form">
										<button
											class="button ghost"
											type="button"
											onclick={() => moveStaticCard(-1)}
											disabled={selectedStaticCardIndex === 0}
										>
											Move up
										</button>
										<button
											class="button ghost"
											type="button"
											onclick={() => moveStaticCard(1)}
											disabled={selectedStaticCardIndex === selectedStaticPage.cards.length - 1}
										>
											Move down
										</button>
										<button class="button ghost" type="button" onclick={duplicateStaticCard}>
											Duplicate
										</button>
										<button class="button danger" type="button" onclick={removeStaticCard}>
											Remove
										</button>
									</div>
								</div>

								<label>
									<span>Card title</span>
									<input bind:value={selectedStaticCard.title} />
								</label>

								<label>
									<span>Card description</span>
									<textarea bind:value={selectedStaticCard.description} rows="4"></textarea>
								</label>
							</div>
						{:else}
							<div class="empty-state">
								<h3>No card selected</h3>
								<p>Add a supporting card for the {selectedStaticPageMeta?.label} page to edit its content.</p>
								<button class="button primary" type="button" onclick={addStaticCard}>Add first card</button>
							</div>
						{/if}
					</section>

					<aside class="project-preview">
						<div class="preview-card">
							<p class="section-label">{selectedStaticPageMeta?.label} preview</p>
							<h3>{selectedStaticPage.title || 'Page title'}</h3>
							<p class="preview-copy">{selectedStaticPage.lede || 'Lead paragraph preview will appear here.'}</p>
						</div>

						<div class="preview-card">
							<p class="section-label">Card preview</p>
							{#if selectedStaticCard}
								<div class="project-preview-card">
									<h4>{selectedStaticCard.title || 'Card title'}</h4>
									<p>{selectedStaticCard.description || 'Card description preview will appear here.'}</p>
								</div>
							{:else}
								<p class="preview-copy">Select a supporting card to preview it here.</p>
							{/if}
						</div>
					</aside>
				</div>

				<div class="serialized-fields" aria-hidden="true">
					{#each editablePages as page}
						<input type="hidden" name={`${page.key}MetaTitle`} value={staticPagesDraft[page.key].metaTitle} />
						<input type="hidden" name={`${page.key}MetaDescription`} value={staticPagesDraft[page.key].metaDescription} />
						<input type="hidden" name={`${page.key}Eyebrow`} value={staticPagesDraft[page.key].eyebrow} />
						<input type="hidden" name={`${page.key}Title`} value={staticPagesDraft[page.key].title} />
						<input type="hidden" name={`${page.key}Lede`} value={staticPagesDraft[page.key].lede} />

						{#each staticPagesDraft[page.key].cards as card}
							<input type="hidden" name={`${page.key}CardTitle`} value={card.title} />
							<input type="hidden" name={`${page.key}CardDescription`} value={card.description} />
						{/each}
					{/each}
				</div>
		</form>
	</div>
</div>

<style>
	.page-wrap {
		padding: 2.75rem 0 5rem;
	}

	.page-inner {
		width: 100%;
		margin: 0 auto;
		padding: 0 var(--page-padding);
	}

	.page-inner + .page-inner {
		margin-top: 1.7rem;
	}

	.intro {
		max-width: 68rem;
	}

	.eyebrow,
	.section-label {
		margin: 0 0 0.8rem;
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--primary);
	}

	h1,
	h2,
	h3,
	h4,
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
		padding: 1rem 1.1rem;
		border: 1px solid var(--line);
		border-radius: 1rem;
	}

	.notice.success {
		background: color-mix(in srgb, var(--accent) 70%, var(--surface));
		color: var(--foreground);
	}

	.notice.warning {
		background: color-mix(in srgb, #f59e0b 10%, var(--surface));
	}

	.issue-list {
		margin: 0.7rem 0 0;
		padding-left: 1.2rem;
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
		background: color-mix(in srgb, var(--surface) 92%, white 8%);
		box-shadow: var(--shadow);
		padding: 1.5rem;
	}

	.sidebar-group + .sidebar-group {
		margin-top: 1.25rem;
	}

	.projects-shell {
		padding: 0;
		overflow: clip;
	}

	.panel-heading,
	.nav-heading,
	.editor-card-header {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: flex-start;
	}

	.panel-heading {
		margin-bottom: 1rem;
	}

	.panel-copy,
	.nav-heading p,
	.preview-copy,
	.meta-copy {
		color: var(--muted-foreground);
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

	.editor-form,
	.project-detail,
	.project-preview,
	.preview-card,
	.editor-card {
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
	textarea {
		width: 100%;
		padding: 0.9rem 1rem;
		border: 1px solid var(--line);
		border-radius: 1rem;
		background: #fff;
		color: #111827;
	}

	textarea {
		resize: vertical;
	}

	.field-row {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.actions,
	.inline-form,
	.save-cluster {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
	}

	.save-cluster {
		align-items: center;
		justify-content: flex-end;
	}

	.save-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.7rem;
	}

	.status-chip {
		padding: 0.4rem 0.75rem;
		border-radius: 999px;
		background: color-mix(in srgb, var(--accent) 75%, var(--surface));
		font-size: 0.85rem;
		font-weight: 700;
	}

	.status-chip.dirty {
		background: color-mix(in srgb, #f59e0b 18%, var(--surface));
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
		transition:
			transform 160ms ease,
			box-shadow 160ms ease,
			border-color 160ms ease;
	}

	.button:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: var(--shadow-material-hover);
	}

	.button:disabled {
		cursor: not-allowed;
		opacity: 0.55;
	}

	.primary {
		background: linear-gradient(135deg, var(--primary), var(--accent-foreground));
		border-color: color-mix(in srgb, var(--accent-secondary) 26%, var(--primary));
		color: var(--primary-foreground);
	}

	.ghost {
		background: color-mix(in srgb, var(--card) 94%, white);
	}

	.danger {
		color: #ef4444;
	}

	.projects-topbar {
		position: sticky;
		top: 1rem;
		z-index: 3;
		display: flex;
		justify-content: space-between;
		gap: 1.5rem;
		align-items: center;
		padding: 1.4rem 1.5rem;
		border-bottom: 1px solid var(--line);
		background:
			linear-gradient(180deg, color-mix(in srgb, var(--surface) 97%, white), color-mix(in srgb, var(--accent) 14%, var(--surface)));
		backdrop-filter: blur(16px);
	}

	.projects-workspace {
		display: grid;
		grid-template-columns: 280px minmax(0, 1fr) 320px;
		gap: 1rem;
		padding: 1.5rem;
		align-items: start;
	}

	.project-nav,
	.preview-card,
	.editor-card,
	.empty-state,
	.editor-subcard {
		padding: 1.2rem;
		border: 1px solid var(--line);
		border-radius: 1.2rem;
		background: color-mix(in srgb, var(--card) 94%, white);
	}

	.project-stack {
		display: grid;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.page-tab-row {
		display: grid;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.compact-tabs {
		margin-top: 0.4rem;
	}

	.page-tab {
		display: grid;
		gap: 0.15rem;
		padding: 0.9rem 1rem;
		border: 1px solid var(--line);
		border-radius: 1rem;
		background: color-mix(in srgb, var(--surface) 94%, white);
		text-align: left;
		text-decoration: none;
	}

	.page-tab.active {
		border-color: color-mix(in srgb, var(--primary) 40%, var(--line));
		background: color-mix(in srgb, var(--accent) 82%, white);
	}

	.page-tab small,
	.nav-subhead {
		color: var(--muted-foreground);
	}

	.nav-subhead {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: center;
	}

	.project-nav-item {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.8rem;
		align-items: start;
		width: 100%;
		padding: 0.9rem 0.95rem;
		border: 1px solid var(--line);
		border-radius: 1rem;
		background: color-mix(in srgb, var(--surface) 94%, white);
		text-align: left;
	}

	.project-nav-item.active {
		border-color: color-mix(in srgb, var(--primary) 40%, var(--line));
		background: color-mix(in srgb, var(--accent) 82%, white);
		box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary) 18%, transparent);
	}

	.project-nav-index {
		display: inline-grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: 999px;
		background: color-mix(in srgb, var(--accent) 80%, var(--surface));
		font-weight: 700;
	}

	.project-nav-copy {
		display: grid;
		gap: 0.2rem;
	}

	.project-nav-copy small {
		color: var(--muted-foreground);
		font-size: 0.85rem;
	}

	.empty-state {
		justify-items: start;
	}

	.project-preview-card {
		display: grid;
		gap: 0.8rem;
		padding: 1.1rem;
		border: 1px solid var(--line);
		border-radius: 1.1rem;
		background:
			linear-gradient(180deg, color-mix(in srgb, var(--surface) 95%, white), color-mix(in srgb, var(--accent) 18%, var(--surface)));
	}

	.status {
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--primary);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.preview-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.8rem 1rem;
		border: 1px solid var(--line);
		border-radius: 999px;
		background: color-mix(in srgb, var(--card) 96%, white);
	}

	.primary-preview {
		background: linear-gradient(135deg, var(--primary), var(--accent-foreground));
		color: var(--primary-foreground);
		border-color: transparent;
	}

	.serialized-fields {
		display: none;
	}

	@media (max-width: 1180px) {
		.projects-workspace {
			grid-template-columns: 260px minmax(0, 1fr);
		}

		.project-preview {
			grid-column: 1 / -1;
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 980px) {
		.editor-grid,
		.field-row,
		.projects-workspace,
		.project-preview {
			grid-template-columns: 1fr;
		}

		.projects-topbar,
		.nav-heading,
		.editor-card-header,
		.save-cluster {
			flex-direction: column;
			align-items: flex-start;
		}

		.projects-topbar {
			position: static;
		}
	}
</style>
