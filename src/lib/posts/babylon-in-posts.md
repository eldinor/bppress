<script module lang="ts">
	export const metadata = {
		title: 'Embedding Babylon.js Scenes Inside Posts',
		excerpt:
			'This post shows how a Markdown article can render a fully interactive Babylon.js scene with regular Svelte components.',
		date: '2026-03-20',
		tags: ['sveltekit', 'babylonjs', '3d']
	};
</script>

<script lang="ts">
	import BabylonScene from '$lib/components/BabylonScene.svelte';
	import { createShowcaseScene } from '$lib/babylon/createShowcaseScene';
</script>

# Embedding Babylon.js Scenes Inside Posts

SvelteKit, Vite, and TypeScript give us a clean foundation for a small publishing app. With `mdsvex`, a post is not limited to plain Markdown anymore. It can also import regular Svelte components, which means Babylon scenes can live right inside the article body.

<BabylonScene title="Showcase scene embedded in Markdown" setup={createShowcaseScene} />

## Why this approach works well

- The post content stays in Markdown, which is comfortable for writing.
- Babylon logic stays in TypeScript files, which keeps the scene code reusable.
- The scene wrapper handles mounting, rendering, and cleanup, so each post only imports the pieces it needs.

## Next ideas

- Load GLB models with `@babylonjs/loaders`.
- Create a gallery of scene snippets for different posts.
- Add frontmatter fields for hero images, categories, or author details.
