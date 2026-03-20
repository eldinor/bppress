<script module lang="ts">
	export const metadata = {
		title: 'Launch Notes for BP Press',
		excerpt:
			'A quick introduction to the stack, the publishing flow, and why this blog is designed around interactive posts.',
		date: '2026-03-18',
		tags: ['announcement', 'sveltekit', 'typescript']
	};
</script>

# Launch Notes for BP Press

BP Press is a small publishing space built with SvelteKit, Vite, and TypeScript. The goal is simple: keep the writing flow lightweight while leaving room for richer interactive content when a story needs it.

## What the stack gives us

- Fast local development with Vite.
- File-based routing through SvelteKit.
- Strong editor support and safer refactors with TypeScript.
- Markdown posts that can still import Svelte components when needed.

## What this means for writing

Most posts can stay plain and readable. A regular article can just be a Markdown file with a small metadata block. When a post needs an interactive example, animation, or 3D scene, the content format already supports it.

## Publishing philosophy

This site is meant to feel close to a notebook rather than a heavy CMS. Posts live in the repo, can be reviewed in code, and stay easy to version along with the rest of the site.
