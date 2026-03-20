import type { Component } from 'svelte';
import { error } from '@sveltejs/kit';
import type { Post, PostMetadata } from '$lib/types';

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
