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
		border: 1px solid rgba(102, 178, 255, 0.2);
		border-radius: 1.25rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(240, 247, 255, 0.98)),
			#fff;
		box-shadow: 0 24px 60px rgba(19, 47, 76, 0.14);
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
		color: rgba(19, 47, 76, 0.7);
		border-bottom: 1px solid rgba(102, 178, 255, 0.16);
	}

	canvas {
		display: block;
		width: 100%;
		background: linear-gradient(180deg, #dceeff, #f4f9ff);
	}
</style>
