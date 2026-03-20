import { getPostSummaries } from '$lib/content/posts';

export function load() {
	return {
		posts: getPostSummaries()
	};
}
