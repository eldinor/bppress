import { error } from '@sveltejs/kit';
import { getPostBySlug, getPostSummaries } from '$lib/content/posts';

export function entries() {
	return getPostSummaries().map((post) => ({ slug: post.slug }));
}

export function load({ params }) {
	if (!params.slug) {
		throw error(404, 'Post not found');
	}

	return {
		post: getPostBySlug(params.slug)
	};
}
