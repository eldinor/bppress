import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { ProjectEntry, ProjectsPageContent } from '$lib/content/projects';

export type EditablePost = {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	tags: string[];
	body: string;
};

const POSTS_DIR = path.join(process.cwd(), 'src', 'lib', 'posts');
const PROJECTS_FILE = path.join(process.cwd(), 'src', 'lib', 'content', 'projects.ts');

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
\t\ttags: ${formatStringArray(post.tags)}
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
\t\t\tmode: ${formatString(item.mode)},
\t\t\tactionLabel: ${formatString(item.actionLabel, '\t\t\t')},
\t\t\thref: ${formatString(item.href)}
\t\t}`
		)
		.join(',\n');

return `export type ProjectEntry = {
\ttitle: string;
\tstatus: string;
\tdescription: string;
\tmode: 'link' | 'placeholder';
\tactionLabel: string;
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

export function createEmptyPost(): EditablePost {
	return {
		slug: '',
		title: '',
		excerpt: '',
		date: new Date().toISOString().slice(0, 10),
		tags: [],
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
	}>(metadataMatch[1]);

	const body = source.replace(/^<script module lang="ts">[\s\S]*?<\/script>\s*/m, '').trim();

	return {
		slug,
		title: metadata.title,
		excerpt: metadata.excerpt,
		date: metadata.date,
		tags: metadata.tags ?? [],
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
		mode: 'link',
		actionLabel: 'Read more',
		href: '/showcase'
	};
}
