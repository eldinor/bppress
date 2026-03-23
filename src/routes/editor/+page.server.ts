import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	createEmptyPost,
	createEmptyProject,
	deleteEditablePost,
	type EditablePost,
	listEditablePosts,
	readProjectsPageContent,
	saveEditablePost,
	saveProjectsPageContent
} from '$lib/server/content-admin';

export const load: PageServerLoad = async ({ url }) => {
	const posts = await listEditablePosts();
	const selectedSlug = url.searchParams.get('post') ?? posts[0]?.slug ?? '';
	const selectedPost = posts.find((post: EditablePost) => post.slug === selectedSlug) ?? createEmptyPost();
	const projectsPage = await readProjectsPageContent();

	return {
		posts: posts.map(({ slug, title, date }: EditablePost) => ({ slug, title, date })),
		selectedPost,
		selectedSlug,
		projectsPage,
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

	addProject: async () => {
		const content = await readProjectsPageContent();
		content.items.push(createEmptyProject());
		await saveProjectsPageContent(content);
		throw redirect(303, '/editor?saved=project-added');
	},

	deleteProject: async ({ request }) => {
		const form = await request.formData();
		const index = Number(form.get('deleteIndex') ?? form.get('index') ?? '-1');
		const content = await readProjectsPageContent();
		content.items = content.items.filter((_item, itemIndex) => itemIndex !== index);
		await saveProjectsPageContent(content);
		throw redirect(303, '/editor?saved=project-deleted');
	}
};
