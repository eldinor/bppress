import { promises as fs } from 'node:fs';
import path from 'node:path';
import type {
	FeatureEntry,
	HomePageContent,
	StatEntry,
	TestimonialEntry
} from '$lib/content/home-page';
import type { ProjectEntry, ProjectsPageContent } from '$lib/content/projects';
import type { InfoCard, StaticPageContent, StaticPagesContent } from '$lib/content/static-pages';

export type EditablePost = {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	tags: string[];
	cover: string;
	body: string;
};

const POSTS_DIR = path.join(process.cwd(), 'src', 'lib', 'posts');
const PROJECTS_FILE = path.join(process.cwd(), 'src', 'lib', 'content', 'projects.ts');
const STATIC_PAGES_FILE = path.join(process.cwd(), 'src', 'lib', 'content', 'static-pages.ts');
const HOME_PAGE_FILE = path.join(process.cwd(), 'src', 'lib', 'content', 'home-page.ts');

function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function evaluateLiteral<T>(literal: string): T {
	return new Function(`return (${literal});`)() as T;
}

function formatString(value: string, indent = '') {
	return JSON.stringify(value)
		.replace(/\n/g, `\\n${indent}`)
		.replace(/\t/g, '\\t');
}

function formatStringArray(values: string[]) {
	if (!values.length) {
		return '[]';
	}

	return `[${values.map((value) => JSON.stringify(value)).join(', ')}]`;
}

function serializePost(post: EditablePost) {
	return `<script module lang="ts">
\texport const metadata = {
\t\ttitle: ${formatString(post.title, '\t\t')},
\t\texcerpt: ${formatString(post.excerpt, '\t\t')},
\t\tdate: ${JSON.stringify(post.date)},
\t\ttags: ${formatStringArray(post.tags)},
\t\tcover: ${formatString(post.cover)}
\t};
</script>

${post.body.trim()}
`;
}

function serializeProjectsPageContent(content: ProjectsPageContent) {
	const items = content.items
		.map(
			(item) => `\t\t{
\t\t\ttitle: ${formatString(item.title, '\t\t\t')},
\t\t\tstatus: ${formatString(item.status, '\t\t\t')},
\t\t\tdescription: ${formatString(item.description, '\t\t\t')},
\t\t\thref: ${formatString(item.href)}
\t\t}`
		)
		.join(',\n');

return `export type ProjectEntry = {
\ttitle: string;
\tstatus: string;
\tdescription: string;
\thref: string;
};

export type ProjectsPageContent = {
\titems: ProjectEntry[];
\tcallout: {
\t\teyebrow: string;
\t\ttitle: string;
\t\tdescription: string;
\t\tprimaryLabel: string;
\t\tprimaryHref: string;
\t\tsecondaryLabel: string;
\t\tsecondaryHref: string;
\t};
};

export const projectsPageContent: ProjectsPageContent = {
\titems: [
${items}
\t],
\tcallout: {
\t\teyebrow: ${formatString(content.callout.eyebrow, '\t\t')},
\t\ttitle: ${formatString(content.callout.title, '\t\t')},
\t\tdescription: ${formatString(content.callout.description, '\t\t')},
\t\tprimaryLabel: ${formatString(content.callout.primaryLabel)},
\t\tprimaryHref: ${formatString(content.callout.primaryHref)},
\t\tsecondaryLabel: ${formatString(content.callout.secondaryLabel)},
\t\tsecondaryHref: ${formatString(content.callout.secondaryHref)}
\t}
};
`;
}

function serializeStaticPage(page: StaticPageContent, indent = '\t') {
	const cards = page.cards
		.map(
			(card) => `${indent}\t\t{
${indent}\t\t\ttitle: ${formatString(card.title, `${indent}\t\t\t`)},
${indent}\t\t\tdescription: ${formatString(card.description, `${indent}\t\t\t`)}
${indent}\t\t}`
		)
		.join(',\n');

	return `${indent}{
${indent}\tmetaTitle: ${formatString(page.metaTitle, `${indent}\t`)},
${indent}\tmetaDescription: ${formatString(page.metaDescription, `${indent}\t`)},
${indent}\teyebrow: ${formatString(page.eyebrow, `${indent}\t`)},
${indent}\ttitle: ${formatString(page.title, `${indent}\t`)},
${indent}\tlede: ${formatString(page.lede, `${indent}\t`)},
${indent}\tcards: [
${cards}
${indent}\t]
${indent}}`;
}

function serializeStaticPagesContent(content: StaticPagesContent) {
	return `export type InfoCard = {
\ttitle: string;
\tdescription: string;
};

export type StaticPageContent = {
\tmetaTitle: string;
\tmetaDescription: string;
\teyebrow: string;
\ttitle: string;
\tlede: string;
\tcards: InfoCard[];
};

export type StaticPagesContent = {
\tabout: StaticPageContent;
\tcontact: StaticPageContent;
};

export const staticPagesContent: StaticPagesContent = {
\tabout: ${serializeStaticPage(content.about)},
\tcontact: ${serializeStaticPage(content.contact)}
};
`;
}

function serializeFeatureArray(values: FeatureEntry[], indent = '\t\t') {
	return values
		.map(
			(item) => `${indent}{
${indent}\ttitle: ${formatString(item.title, `${indent}\t`)},
${indent}\tdescription: ${formatString(item.description, `${indent}\t`)}
${indent}}`
		)
		.join(',\n');
}

function serializeStatsArray(values: StatEntry[], indent = '\t\t') {
	return values
		.map(
			(item) => `${indent}{
${indent}\tvalue: ${formatString(item.value, `${indent}\t`)},
${indent}\tlabel: ${formatString(item.label, `${indent}\t`)}
${indent}}`
		)
		.join(',\n');
}

function serializeTestimonialsArray(values: TestimonialEntry[], indent = '\t\t') {
	return values
		.map(
			(item) => `${indent}{
${indent}\tquote: ${formatString(item.quote, `${indent}\t`)},
${indent}\tname: ${formatString(item.name, `${indent}\t`)},
${indent}\trole: ${formatString(item.role, `${indent}\t`)},
${indent}\tcompany: ${formatString(item.company, `${indent}\t`)}
${indent}}`
		)
		.join(',\n');
}

function serializeStringList(values: string[], indent = '\t\t') {
	if (!values.length) {
		return '[]';
	}

	return `[
${values.map((value) => `${indent}${formatString(value)}`).join(',\n')}
\t\t]`;
}

function serializeHomePageContent(content: HomePageContent) {
	return `export type FeatureEntry = {
\ttitle: string;
\tdescription: string;
};

export type StatEntry = {
\tvalue: string;
\tlabel: string;
};

export type TestimonialEntry = {
\tquote: string;
\tname: string;
\trole: string;
\tcompany: string;
};

export type HomePageContent = {
\tmetaTitle: string;
\tmetaDescription: string;
\thero: {
\t\teyebrow: string;
\t\ttitle: string;
\t\tdescription: string;
\t\tprimaryLabel: string;
\t\tprimaryHref: string;
\t\tsecondaryLabel: string;
\t\tsecondaryHref: string;
\t\tpreviewPrimaryLabel: string;
\t\tpreviewPrimaryText: string;
\t\tpreviewMetricLabel: string;
\t\tpreviewMetricText: string;
\t\tpreviewCode: string;
\t\tpreviewList: string[];
\t};
\ttrust: {
\t\tlabel: string;
\t\tlogos: string[];
\t};
\tproducts: {
\t\teyebrow: string;
\t\ttitle: string;
\t\tdescription: string;
\t\tfeatures: FeatureEntry[];
\t};
\twhyChoose: {
\t\teyebrow: string;
\t\ttitle: string;
\t\tdescription: string;
\t\tadvantages: string[];
\t};
\tshowcase: {
\t\teyebrow: string;
\t\ttitle: string;
\t\tdescription: string;
\t\tlargeLabel: string;
\t\tlargeText: string;
\t\tmetricOneLabel: string;
\t\tmetricOneText: string;
\t\tmetricTwoLabel: string;
\t\tmetricTwoText: string;
\t};
\tcommunity: {
\t\teyebrow: string;
\t\ttitle: string;
\t\tstats: StatEntry[];
\t};
\ttestimonials: {
\t\teyebrow: string;
\t\ttitle: string;
\t\titems: TestimonialEntry[];
\t};
};

export const homePageContent: HomePageContent = {
\tmetaTitle: ${formatString(content.metaTitle)},
\tmetaDescription: ${formatString(content.metaDescription)},
\thero: {
\t\teyebrow: ${formatString(content.hero.eyebrow, '\t\t')},
\t\ttitle: ${formatString(content.hero.title, '\t\t')},
\t\tdescription: ${formatString(content.hero.description, '\t\t')},
\t\tprimaryLabel: ${formatString(content.hero.primaryLabel)},
\t\tprimaryHref: ${formatString(content.hero.primaryHref)},
\t\tsecondaryLabel: ${formatString(content.hero.secondaryLabel)},
\t\tsecondaryHref: ${formatString(content.hero.secondaryHref)},
\t\tpreviewPrimaryLabel: ${formatString(content.hero.previewPrimaryLabel)},
\t\tpreviewPrimaryText: ${formatString(content.hero.previewPrimaryText, '\t\t')},
\t\tpreviewMetricLabel: ${formatString(content.hero.previewMetricLabel)},
\t\tpreviewMetricText: ${formatString(content.hero.previewMetricText, '\t\t')},
\t\tpreviewCode: ${formatString(content.hero.previewCode)},
\t\tpreviewList: ${serializeStringList(content.hero.previewList)}
\t},
\ttrust: {
\t\tlabel: ${formatString(content.trust.label, '\t\t')},
\t\tlogos: ${serializeStringList(content.trust.logos)}
\t},
\tproducts: {
\t\teyebrow: ${formatString(content.products.eyebrow)},
\t\ttitle: ${formatString(content.products.title, '\t\t')},
\t\tdescription: ${formatString(content.products.description, '\t\t')},
\t\tfeatures: [
${serializeFeatureArray(content.products.features)}
\t\t]
\t},
\twhyChoose: {
\t\teyebrow: ${formatString(content.whyChoose.eyebrow)},
\t\ttitle: ${formatString(content.whyChoose.title, '\t\t')},
\t\tdescription: ${formatString(content.whyChoose.description, '\t\t')},
\t\tadvantages: ${serializeStringList(content.whyChoose.advantages)}
\t},
\tshowcase: {
\t\teyebrow: ${formatString(content.showcase.eyebrow)},
\t\ttitle: ${formatString(content.showcase.title, '\t\t')},
\t\tdescription: ${formatString(content.showcase.description, '\t\t')},
\t\tlargeLabel: ${formatString(content.showcase.largeLabel)},
\t\tlargeText: ${formatString(content.showcase.largeText, '\t\t')},
\t\tmetricOneLabel: ${formatString(content.showcase.metricOneLabel)},
\t\tmetricOneText: ${formatString(content.showcase.metricOneText, '\t\t')},
\t\tmetricTwoLabel: ${formatString(content.showcase.metricTwoLabel)},
\t\tmetricTwoText: ${formatString(content.showcase.metricTwoText, '\t\t')}
\t},
\tcommunity: {
\t\teyebrow: ${formatString(content.community.eyebrow)},
\t\ttitle: ${formatString(content.community.title, '\t\t')},
\t\tstats: [
${serializeStatsArray(content.community.stats)}
\t\t]
\t},
\ttestimonials: {
\t\teyebrow: ${formatString(content.testimonials.eyebrow)},
\t\ttitle: ${formatString(content.testimonials.title, '\t\t')},
\t\titems: [
${serializeTestimonialsArray(content.testimonials.items)}
\t\t]
\t}
};
`;
}

export function createEmptyPost(): EditablePost {
	return {
		slug: '',
		title: '',
		excerpt: '',
		date: new Date().toISOString().slice(0, 10),
		tags: [],
		cover: '',
		body: '# New Post\n\nStart writing here.'
	};
}

export async function listEditablePosts() {
	const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
	const files = entries.filter((entry: { isFile(): boolean; name: string }) => entry.isFile() && entry.name.endsWith('.md'));
	const posts = await Promise.all(
		files.map((entry: { name: string }) => readEditablePost(entry.name.replace(/\.md$/, '')))
	);

	return posts.sort((left: EditablePost, right: EditablePost) => right.date.localeCompare(left.date));
}

export async function readEditablePost(slug: string): Promise<EditablePost> {
	const filePath = path.join(POSTS_DIR, `${slug}.md`);
	const source = await fs.readFile(filePath, 'utf8');
	const metadataMatch = source.match(/export const metadata = (\{[\s\S]*?\});/);
	if (!metadataMatch) {
		throw new Error(`Could not parse metadata from ${slug}.md`);
	}

	const metadata = evaluateLiteral<{
		title: string;
		excerpt: string;
		date: string;
		tags?: string[];
		cover?: string;
	}>(metadataMatch[1]);

	const body = source.replace(/^<script module lang="ts">[\s\S]*?<\/script>\s*/m, '').trim();

	return {
		slug,
		title: metadata.title,
		excerpt: metadata.excerpt,
		date: metadata.date,
		tags: metadata.tags ?? [],
		cover: metadata.cover ?? '',
		body
	};
}

export async function saveEditablePost(input: EditablePost, originalSlug?: string) {
	const nextSlug = slugify(input.slug || input.title);
	if (!nextSlug) {
		throw new Error('Post slug cannot be empty.');
	}

	const normalized: EditablePost = {
		...input,
		slug: nextSlug,
		tags: input.tags.map((tag) => tag.trim()).filter(Boolean)
	};

	const nextPath = path.join(POSTS_DIR, `${nextSlug}.md`);
	const previousSlug = originalSlug ? slugify(originalSlug) : '';
	const previousPath = previousSlug ? path.join(POSTS_DIR, `${previousSlug}.md`) : '';

	if (previousSlug && previousSlug !== nextSlug) {
		try {
			await fs.access(nextPath);
			throw new Error(`A post with slug "${nextSlug}" already exists.`);
		} catch (error) {
			const filesystemError = error as { code?: string };
			if (filesystemError.code !== 'ENOENT') {
				throw error;
			}
		}
	}

	await fs.writeFile(nextPath, serializePost(normalized), 'utf8');

	if (previousSlug && previousSlug !== nextSlug) {
		await fs.unlink(previousPath);
	}

	return normalized;
}

export async function deleteEditablePost(slug: string) {
	const normalizedSlug = slugify(slug);
	if (!normalizedSlug) {
		throw new Error('Post slug cannot be empty.');
	}

	await fs.unlink(path.join(POSTS_DIR, `${normalizedSlug}.md`));
}

export async function readProjectsPageContent(): Promise<ProjectsPageContent> {
	const source = await fs.readFile(PROJECTS_FILE, 'utf8');
	const match = source.match(/export const projectsPageContent: ProjectsPageContent = (\{[\s\S]*\});/);
	if (!match) {
		throw new Error('Could not parse projects page content.');
	}

	return evaluateLiteral<ProjectsPageContent>(match[1]);
}

export async function saveProjectsPageContent(content: ProjectsPageContent) {
	await fs.writeFile(PROJECTS_FILE, serializeProjectsPageContent(content), 'utf8');
}

export function createEmptyProject(): ProjectEntry {
	return {
		title: 'New Project',
		status: 'Draft',
		description: 'Describe the project here.',
		href: '/showcase'
	};
}

export async function readStaticPagesContent(): Promise<StaticPagesContent> {
	const source = await fs.readFile(STATIC_PAGES_FILE, 'utf8');
	const match = source.match(/export const staticPagesContent: StaticPagesContent = (\{[\s\S]*\});/);
	if (!match) {
		throw new Error('Could not parse static pages content.');
	}

	return evaluateLiteral<StaticPagesContent>(match[1]);
}

export async function saveStaticPagesContent(content: StaticPagesContent) {
	await fs.writeFile(STATIC_PAGES_FILE, serializeStaticPagesContent(content), 'utf8');
}

export function createEmptyInfoCard(): InfoCard {
	return {
		title: 'New Card',
		description: 'Add supporting page copy here.'
	};
}

export async function readHomePageContent(): Promise<HomePageContent> {
	const source = await fs.readFile(HOME_PAGE_FILE, 'utf8');
	const match = source.match(/export const homePageContent: HomePageContent = (\{[\s\S]*\});/);
	if (!match) {
		throw new Error('Could not parse home page content.');
	}

	return evaluateLiteral<HomePageContent>(match[1]);
}

export async function saveHomePageContent(content: HomePageContent) {
	await fs.writeFile(HOME_PAGE_FILE, serializeHomePageContent(content), 'utf8');
}
