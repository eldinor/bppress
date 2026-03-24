export type ProjectEntry = {
	title: string;
	status: string;
	description: string;
	mode: 'link' | 'placeholder';
	actionLabel: string;
	href: string;
};

export type ProjectsPageContent = {
	items: ProjectEntry[];
	callout: {
		eyebrow: string;
		title: string;
		description: string;
		primaryLabel: string;
		primaryHref: string;
		secondaryLabel: string;
		secondaryHref: string;
	};
};

export const projectsPageContent: ProjectsPageContent = {
	items: [
		{
			title: "GLB Optimizer with WEBP and KTX2 Texture Converter Online",
			status: "Regular releases",
			description: "Using GPU compressed textures is becoming more and more important in the computer graphics / gaming land as it allows to use more assets within the same memory budget.",
			mode: "link",
			actionLabel: "Read more",
			href: "/showcase"
		},
		{
			title: "Babylon Viewer v2 WordPress Plugin by BabylonPress",
			status: "Actively used",
			description: "The Babylon Viewer v2 Plugin by BabylonPress aims to simplify a specific but common use cases: loading, viewing, and interacting with a 3D modeld at WordPress-driven sites.",
			mode: "link",
			actionLabel: "Read more",
			href: "/showcase"
		},
		{
			title: "Yuka Game AI Implementations with Babylon.js",
			status: "Game AI",
			description: "Yuka provides a basic game entity concept and classes for state-driven and goal-driven agent design. Use the build-in vehicle model and steering behaviors in order to develop moving game entities.",
			mode: "link",
			actionLabel: "Read more",
			href: "/showcase"
		},
		{
			title: "Babylon.js 8 + Vite 6 Typescript Template with Havok Physics",
			status: "Templates",
			description: "Freshiest Babylon.js, Vite, Typescript and all other dependencies. WebGPU engine by default, WebGL2 supported as well. Havok Physics already set up and included in the demo scene.",
			mode: "link",
			actionLabel: "Coming soon",
			href: ""
		},
		{
			title: "Babylon Cloner",
			status: "Cloner System",
			description: "This system for Babylon.js allows you take an array of meshes, clone them and display the results in a variety of patterns.",
			mode: "link",
			actionLabel: "Coming soon",
			href: ""
		},
		{
			title: "Babylon.js Inspector v2 Custom Extensions",
			status: "Collection",
			description: "A collection of custom ServiceDefinitions and ExtensionFeeds for Babylon.js Inspector v2.",
			mode: "link",
			actionLabel: "Coming soon",
			href: ""
		}
	],
	callout: {
		eyebrow: "Dev Templates",
		title: "BabylonPress GLB GLTF Viewer",
		description: "BabylonPress GLB Viewer is a desktop GLB viewer for Windows built with Electron and Babylon Viewer. It is designed as a lightweight desktop shell, with file opening, recent files, drag-and-drop, view settings, camera settings, and in-app help.\r\n\r\n",
		primaryLabel: "Download v1.0.3",
		primaryHref: "https://github.com/eldinor/electrobaby/releases/tag/v1.0.3",
		secondaryLabel: "More information",
		secondaryHref: "https://github.com/eldinor/electrobaby"
	}
};
