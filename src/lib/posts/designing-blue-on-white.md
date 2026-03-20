<script module lang="ts">
	export const metadata = {
		title: 'Designing a Blue-on-White Reading Theme',
		excerpt:
			'Notes on moving the blog toward a cleaner editorial style with white surfaces, blue accents, and calm contrast.',
		date: '2026-03-16',
		tags: ['design', 'ui', 'theme']
	};
</script>

# Designing a Blue-on-White Reading Theme

The current visual direction keeps the page bright and quiet while still borrowing from product-oriented UI systems. White surfaces make long-form reading easier, and blue accents give the site a crisp technical identity without making it feel cold.

## The palette

- White and very pale blue for backgrounds.
- A deep blue for text and headings.
- A brighter accent blue for links, emphasis, and controls.
- Soft shadows to separate content without adding visual noise.

## The tradeoff

A purely minimal interface can feel flat. To avoid that, the cards, hero area, and scene blocks use small gradients and elevation so the pages still have shape.

## Next refinement ideas

- Add a subtle active state for the current route.
- Introduce a shared post header component.
- Add author and reading-time metadata on article pages.
