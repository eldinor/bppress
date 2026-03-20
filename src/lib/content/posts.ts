import type { Component } from 'svelte';
import { error } from '@sveltejs/kit';
import type { Post, PostMetadata, TagSummary } from '$lib/types';

type PostModule = {
	default: Component;
	metadata: Omit<PostMetadata, 'slug'>;
};

const postModules = import.meta.glob('/src/lib/posts/*.md', { eager: true }) as Record<
	string,
	PostModule
>;

function slugFromPath(path: string) {
	return path.split('/').pop()?.replace('.md', '') ?? '';
}

function normalizePost(path: string, module: PostModule): Post {
	const slug = slugFromPath(path);

	return {
		slug,
		component: module.default,
		...module.metadata
	};
}

export function slugifyTag(tag: string) {
	return tag
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function getAllPosts(): Post[] {
	return Object.entries(postModules)
		.map(([path, module]) => normalizePost(path, module))
		.sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());
}

export function getPostSummaries(): PostMetadata[] {
	return getAllPosts().map(({ component: _component, ...post }) => post);
}

export function getPostBySlug(slug: string): Post {
	const post = getAllPosts().find((entry) => entry.slug === slug);

	if (!post) {
		throw error(404, `Post "${slug}" not found`);
	}

	return post;
}

export function getAllTags(): TagSummary[] {
	const counts = new Map<string, number>();

	for (const post of getAllPosts()) {
		for (const tag of post.tags ?? []) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}

	return Array.from(counts.entries())
		.map(([name, count]) => ({
			name,
			slug: slugifyTag(name),
			count
		}))
		.sort((left, right) => left.name.localeCompare(right.name));
}

export function getTagBySlug(slug: string): TagSummary {
	const tag = getAllTags().find((entry) => entry.slug === slug);

	if (!tag) {
		throw error(404, `Tag "${slug}" not found`);
	}

	return tag;
}

export function getPostsByTagSlug(slug: string): PostMetadata[] {
	const tag = getTagBySlug(slug);

	return getPostSummaries().filter((post) => (post.tags ?? []).includes(tag.name));
}
