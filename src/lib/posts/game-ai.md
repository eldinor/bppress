<script module lang="ts">
	export const metadata = {
		title: "Exploring Game AI with Yuka and Babylon.js",
		excerpt: "All what you need for a web-based 3D game.",
		date: "2026-03-20",
		tags: ["babylonjs", "3d", "game ai"],
		cover: "/images/spcar.png"
	};
</script>

<script lang="ts">
	import BabylonScene from '$lib/components/BabylonScene.svelte';
	import { createShowcaseScene } from '$lib/babylon/createShowcaseScene';
</script>

The examples at https://yuka.babylonpress.org/examples/ present a
collection of demonstrations showing how **game AI techniques can be
implemented in the browser** using the **Yuka JavaScript library
together with Babylon.js** for 3D rendering. The goal of these examples
is to illustrate how autonomous agents, navigation systems, and
behavioral logic can operate inside real-time interactive web scenes.

Yuka provides a framework for building **intelligent entities and
decision-making systems** commonly used in games and simulations. When
combined with Babylon.js, these AI systems can be visualized in fully
interactive 3D environments running directly in the browser through
modern graphics technologies such as WebGL.

The collection includes demonstrations of several core AI concepts:

-   **Finite State Machines (FSM)** that allow agents to switch between
    behaviors depending on internal conditions or external events.
-   **Goal-driven behavior systems** where agents select actions in
    order to achieve defined objectives.
-   **Navigation mesh pathfinding**, enabling characters to move across
    complex environments while avoiding obstacles.
-   **Steering behaviors** such as path following, seeking, and
    wandering that simulate natural movement patterns.
-   **Interactive logic experiments**, including small AI-driven
    gameplay examples.

Each example focuses on a specific concept and keeps the structure
intentionally clear. Typically, a **Yuka entity manages the AI logic and
movement**, while a **Babylon.js mesh represents the visual object in
the scene**. Synchronizing the two allows developers to observe how AI
decisions translate into movement and interaction inside the 3D world.

Together, these demonstrations show how modern web technologies make it
possible to experiment with **game AI, autonomous agents, and
interactive simulations directly in the browser**, without relying on
traditional desktop game engines.
