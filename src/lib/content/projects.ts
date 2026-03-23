export type ProjectEntry = {
	title: string;
	status: string;
	description: string;
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
			href: "/showcase"
		},
		{
			title: "Babylon Viewer v2 WordPress Plugin by BabylonPress",
			status: "Actively used",
			description: "The Babylon Viewer v2 Plugin by BabylonPress aims to simplify a specific but common use cases: loading, viewing, and interacting with a 3D modeld at WordPress-driven sites.",
			href: "/showcase"
		},
		{
			title: "Examples of Yuka Game AI Implementations with Babylon.js",
			status: "Game AI",
			description: "Yuka provides a basic game entity concept and classes for state-driven and goal-driven agent design. Use the build-in vehicle model and steering behaviors in order to develop moving game entities.",
			href: "/showcase"
		}
	],
	callout: {
		eyebrow: "Next builds",
		title: "Use this area for real project entries, shipped demos, and client-facing case studies.",
		description: "As the site grows, this page can become the main index for production work, internal tools, and scene prototypes with direct links into full posts or live previews.",
		primaryLabel: "Open showcase",
		primaryHref: "/showcase",
		secondaryLabel: "Read posts",
		secondaryHref: "/blog"
	}
};
