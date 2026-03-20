import { getAllTags, getPostsByTagSlug, getTagBySlug } from '$lib/content/posts';

export function entries() {
	return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export function load({ params }) {
	const tag = getTagBySlug(params.tag);

	return {
		tag,
		posts: getPostsByTagSlug(params.tag)
	};
}
