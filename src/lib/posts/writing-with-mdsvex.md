<script module lang="ts">
	export const metadata = {
		title: 'Writing with mdsvex in SvelteKit',
		excerpt:
			'How Markdown posts become first-class content modules and why that works so well for small technical blogs.',
		date: '2026-03-17',
		tags: ['mdsvex', 'markdown', 'sveltekit']
	};
</script>

# Writing with mdsvex in SvelteKit

`mdsvex` turns Markdown into something much more flexible than a static document. A post still reads like a post, but it can also import components, declare metadata, and participate naturally in the rest of the app.

## Why it feels good in practice

The authoring experience stays familiar:

- Write headings, paragraphs, and lists as normal Markdown.
- Export `metadata` from a module script for the blog listing.
- Import a Svelte component only when the article actually needs one.

## Why it fits this project

This blog is small on purpose. The content model does not need a database or external CMS yet. Storing posts next to the codebase keeps everything simple and transparent.

## A good default

For technical blogs, mdsvex hits a sweet spot between plain writing and component-driven publishing. It is enough structure to support rich posts, but not so much structure that writing becomes tedious.
