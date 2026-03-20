<script module lang="ts">
	export const metadata = {
		title: 'From Markdown to 3D',
		excerpt:
			'A simple workflow for moving from a written idea to an embedded Babylon.js scene inside the same post.',
		date: '2026-03-15',
		tags: ['babylonjs', 'workflow', '3d']
	};
</script>

# From Markdown to 3D

One of the nicest parts of this setup is that a post can start as plain writing and become interactive later without changing the overall publishing flow.

## A practical workflow

1. Start with the article structure and outline the idea in Markdown.
2. Add metadata so the post appears correctly in the blog listing.
3. Create or reuse a Babylon scene setup function in `src/lib/babylon`.
4. Import the scene wrapper and render it inline where the visual explanation belongs.

## Why this matters

Interactive posts work best when the scene supports the writing rather than replacing it. The article explains the concept, and the embedded canvas gives the reader something tactile to explore.

## Good candidates for 3D posts

- Explaining camera controls
- Showing lighting changes
- Comparing materials
- Walking through model loading and scene composition
