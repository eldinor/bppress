import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	createEmptyInfoCard,
	createEmptyPost,
	createEmptyProject,
	deleteEditablePost,
	type EditablePost,
	listEditablePosts,
	readHomePageContent,
	readProjectsPageContent,
	readStaticPagesContent,
	saveEditablePost,
	saveHomePageContent,
	saveProjectsPageContent,
	saveStaticPagesContent
} from '$lib/server/content-admin';

export const load: PageServerLoad = async ({ url }) => {
	const posts = await listEditablePosts();
	const selectedSlug = url.searchParams.get('post') ?? posts[0]?.slug ?? '';
	const selectedPost = posts.find((post: EditablePost) => post.slug === selectedSlug) ?? createEmptyPost();
	const homePage = await readHomePageContent();
	const projectsPage = await readProjectsPageContent();
	const staticPages = await readStaticPagesContent();

	return {
		posts: posts.map(({ slug, title, date }: EditablePost) => ({ slug, title, date })),
		selectedPost,
		selectedSlug,
		homePage,
		projectsPage,
		staticPages,
		saved: url.searchParams.get('saved')
	};
};

function parseTags(value: FormDataEntryValue | null) {
	return String(value ?? '')
		.split(',')
		.map((tag) => tag.trim())
		.filter(Boolean);
}

export const actions: Actions = {
	savePost: async ({ request }) => {
		const form = await request.formData();

		try {
			const post = await saveEditablePost(
				{
					slug: String(form.get('slug') ?? ''),
					title: String(form.get('title') ?? ''),
					excerpt: String(form.get('excerpt') ?? ''),
					date: String(form.get('date') ?? ''),
					tags: parseTags(form.get('tags')),
					cover: String(form.get('cover') ?? ''),
					body: String(form.get('body') ?? '')
				},
				String(form.get('originalSlug') ?? '')
			);

			throw redirect(303, `/editor?post=${post.slug}&saved=post`);
		} catch (error) {
			return fail(400, { message: (error as Error).message });
		}
	},

	deletePost: async ({ request }) => {
		const form = await request.formData();
		const slug = String(form.get('slug') ?? '');

		try {
			await deleteEditablePost(slug);
			throw redirect(303, '/editor?saved=post-deleted');
		} catch (error) {
			return fail(400, { message: (error as Error).message });
		}
	},

	saveProjectsPage: async ({ request }) => {
		const form = await request.formData();
		const titles = form.getAll('projectTitle').map(String);
		const statuses = form.getAll('projectStatus').map(String);
		const descriptions = form.getAll('projectDescription').map(String);
		const hrefs = form.getAll('projectHref').map(String);

		try {
			await saveProjectsPageContent({
				items: titles
					.map((title, index) => ({
						title: title.trim(),
						status: (statuses[index] ?? '').trim(),
						description: (descriptions[index] ?? '').trim(),
						href: (hrefs[index] ?? '').trim()
					}))
					.filter((item) => item.title || item.status || item.description || item.href),
				callout: {
					eyebrow: String(form.get('calloutEyebrow') ?? ''),
					title: String(form.get('calloutTitle') ?? ''),
					description: String(form.get('calloutDescription') ?? ''),
					primaryLabel: String(form.get('primaryLabel') ?? ''),
					primaryHref: String(form.get('primaryHref') ?? ''),
					secondaryLabel: String(form.get('secondaryLabel') ?? ''),
					secondaryHref: String(form.get('secondaryHref') ?? '')
				}
			});

			throw redirect(303, '/editor?saved=projects');
		} catch (error) {
			return fail(400, { message: (error as Error).message });
		}
	},

	saveHomePage: async ({ request }) => {
		const form = await request.formData();
		const featureTitles = form.getAll('featureTitle').map(String);
		const featureDescriptions = form.getAll('featureDescription').map(String);
		const statValues = form.getAll('statValue').map(String);
		const statLabels = form.getAll('statLabel').map(String);
		const testimonialQuotes = form.getAll('testimonialQuote').map(String);
		const testimonialNames = form.getAll('testimonialName').map(String);
		const testimonialRoles = form.getAll('testimonialRole').map(String);
		const testimonialCompanies = form.getAll('testimonialCompany').map(String);
		const parseLines = (value: FormDataEntryValue | null) =>
			String(value ?? '')
				.split(/\r?\n/)
				.map((item) => item.trim())
				.filter(Boolean);

		try {
			await saveHomePageContent({
				metaTitle: String(form.get('metaTitle') ?? ''),
				metaDescription: String(form.get('metaDescription') ?? ''),
				hero: {
					eyebrow: String(form.get('heroEyebrow') ?? ''),
					title: String(form.get('heroTitle') ?? ''),
					description: String(form.get('heroDescription') ?? ''),
					primaryLabel: String(form.get('heroPrimaryLabel') ?? ''),
					primaryHref: String(form.get('heroPrimaryHref') ?? ''),
					secondaryLabel: String(form.get('heroSecondaryLabel') ?? ''),
					secondaryHref: String(form.get('heroSecondaryHref') ?? ''),
					previewPrimaryLabel: String(form.get('previewPrimaryLabel') ?? ''),
					previewPrimaryText: String(form.get('previewPrimaryText') ?? ''),
					previewMetricLabel: String(form.get('previewMetricLabel') ?? ''),
					previewMetricText: String(form.get('previewMetricText') ?? ''),
					previewCode: String(form.get('previewCode') ?? ''),
					previewList: parseLines(form.get('previewList'))
				},
				trust: {
					label: String(form.get('trustLabel') ?? ''),
					logos: parseLines(form.get('trustLogos'))
				},
				products: {
					eyebrow: String(form.get('productsEyebrow') ?? ''),
					title: String(form.get('productsTitle') ?? ''),
					description: String(form.get('productsDescription') ?? ''),
					features: featureTitles.map((title, index) => ({
						title: title.trim(),
						description: (featureDescriptions[index] ?? '').trim()
					}))
				},
				whyChoose: {
					eyebrow: String(form.get('whyChooseEyebrow') ?? ''),
					title: String(form.get('whyChooseTitle') ?? ''),
					description: String(form.get('whyChooseDescription') ?? ''),
					advantages: parseLines(form.get('advantages'))
				},
				showcase: {
					eyebrow: String(form.get('showcaseEyebrow') ?? ''),
					title: String(form.get('showcaseTitle') ?? ''),
					description: String(form.get('showcaseDescription') ?? ''),
					largeLabel: String(form.get('showcaseLargeLabel') ?? ''),
					largeText: String(form.get('showcaseLargeText') ?? ''),
					metricOneLabel: String(form.get('showcaseMetricOneLabel') ?? ''),
					metricOneText: String(form.get('showcaseMetricOneText') ?? ''),
					metricTwoLabel: String(form.get('showcaseMetricTwoLabel') ?? ''),
					metricTwoText: String(form.get('showcaseMetricTwoText') ?? '')
				},
				community: {
					eyebrow: String(form.get('communityEyebrow') ?? ''),
					title: String(form.get('communityTitle') ?? ''),
					stats: statValues.map((value, index) => ({
						value: value.trim(),
						label: (statLabels[index] ?? '').trim()
					}))
				},
				testimonials: {
					eyebrow: String(form.get('testimonialsEyebrow') ?? ''),
					title: String(form.get('testimonialsTitle') ?? ''),
					items: testimonialQuotes.map((quote, index) => ({
						quote: quote.trim(),
						name: (testimonialNames[index] ?? '').trim(),
						role: (testimonialRoles[index] ?? '').trim(),
						company: (testimonialCompanies[index] ?? '').trim()
					}))
				}
			});

			throw redirect(303, '/editor?saved=home');
		} catch (error) {
			return fail(400, { message: (error as Error).message });
		}
	},

	addProject: async () => {
		const content = await readProjectsPageContent();
		content.items.push(createEmptyProject());
		await saveProjectsPageContent(content);
		throw redirect(303, '/editor?saved=project-added');
	},

	saveStaticPages: async ({ request }) => {
		const form = await request.formData();
		const parsePage = (prefix: 'about' | 'contact') => ({
			metaTitle: String(form.get(`${prefix}MetaTitle`) ?? ''),
			metaDescription: String(form.get(`${prefix}MetaDescription`) ?? ''),
			eyebrow: String(form.get(`${prefix}Eyebrow`) ?? ''),
			title: String(form.get(`${prefix}Title`) ?? ''),
			lede: String(form.get(`${prefix}Lede`) ?? ''),
			cards: form
				.getAll(`${prefix}CardTitle`)
				.map((title, index) => ({
					title: String(title).trim(),
					description: String(form.getAll(`${prefix}CardDescription`)[index] ?? '').trim()
				}))
				.filter((card) => card.title || card.description)
		});

		try {
			await saveStaticPagesContent({
				about: parsePage('about'),
				contact: parsePage('contact')
			});

			throw redirect(303, '/editor?saved=pages');
		} catch (error) {
			return fail(400, { message: (error as Error).message });
		}
	},

	deleteProject: async ({ request }) => {
		const form = await request.formData();
		const index = Number(form.get('deleteIndex') ?? form.get('index') ?? '-1');
		const content = await readProjectsPageContent();
		content.items = content.items.filter((_item, itemIndex) => itemIndex !== index);
		await saveProjectsPageContent(content);
		throw redirect(303, '/editor?saved=project-deleted');
	},

	addStaticPageCard: async ({ request }) => {
		const form = await request.formData();
		const page = String(form.get('page') ?? '');
		if (page !== 'about' && page !== 'contact') {
			return fail(400, { message: 'Unknown page.' });
		}

		const content = await readStaticPagesContent();
		content[page].cards.push(createEmptyInfoCard());
		await saveStaticPagesContent(content);
		throw redirect(303, '/editor?saved=page-card-added');
	}
};
