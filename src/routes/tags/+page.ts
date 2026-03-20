import { getAllTags } from '$lib/content/posts';

export function load() {
	return {
		tags: getAllTags()
	};
}
