<script lang="ts">
	import { onMount } from 'svelte';
	import type { Engine, Scene } from '@babylonjs/core';

	type SetupCallback = (
		scene: Scene,
		canvas: HTMLCanvasElement,
		engine: Engine
	) => void | (() => void) | Promise<void | (() => void)>;

	let {
		setup,
		height = 420,
		title = 'Interactive Babylon scene'
	}: {
		setup: SetupCallback;
		height?: number;
		title?: string;
	} = $props();

	let canvas: HTMLCanvasElement;

	onMount(() => {
		let teardown: void | (() => void);
		let engine: Engine | undefined;
		let scene: Scene | undefined;
		let cancelled = false;
		let removeResize = () => {};

		const boot = async () => {
			const babylon = await import('@babylonjs/core');

			if (cancelled) {
				return;
			}

			engine = new babylon.Engine(canvas, true, {
				adaptToDeviceRatio: true,
				preserveDrawingBuffer: true,
				stencil: true
			});
			scene = new babylon.Scene(engine);
			teardown = await setup(scene, canvas, engine);

			engine.runRenderLoop(() => {
				scene?.render();
			});

			const handleResize = () => {
				engine?.resize();
			};

			window.addEventListener('resize', handleResize);
			removeResize = () => window.removeEventListener('resize', handleResize);
		};

		void boot();

		return () => {
			cancelled = true;
			removeResize();
			if (typeof teardown === 'function') {
				teardown();
			}
			scene?.dispose();
			engine?.dispose();
		};
	});
</script>

<div class="scene-shell">
	<div class="scene-header">
		<span>{title}</span>
		<span>Babylon.js</span>
	</div>
	<canvas bind:this={canvas} style={`height:${height}px`}></canvas>
</div>

<style>
	.scene-shell {
		overflow: hidden;
		border: 1px solid color-mix(in srgb, var(--primary) 22%, var(--line));
		border-radius: 1.25rem;
		background:
			linear-gradient(180deg, color-mix(in srgb, var(--card) 98%, white), color-mix(in srgb, var(--accent) 38%, white)),
			#fff;
		box-shadow:
			0 28px 64px -38px rgba(23, 64, 108, 0.28),
			0 0 0 1px rgba(255, 255, 255, 0.65) inset;
	}

	.scene-header {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.9rem 1rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--foreground) 60%, var(--primary));
		border-bottom: 1px solid color-mix(in srgb, var(--primary) 18%, var(--line));
	}

	canvas {
		display: block;
		width: 100%;
		background: linear-gradient(180deg, #dff1ff, #f8fbff 68%, #eef7ff);
	}
</style>
