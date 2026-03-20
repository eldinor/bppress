import { getPostSummaries } from '$lib/content/posts';

export function load() {
	const posts = getPostSummaries();

	return {
		featuredPost: posts[0],
		recentPosts: posts.slice(0, 3)
	};
}
