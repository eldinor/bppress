export type InfoCard = {
	title: string;
	description: string;
};

export type StaticPageContent = {
	metaTitle: string;
	metaDescription: string;
	eyebrow: string;
	title: string;
	lede: string;
	cards: InfoCard[];
};

export type StaticPagesContent = {
	about: StaticPageContent;
	contact: StaticPageContent;
};

export const staticPagesContent: StaticPagesContent = {
	about: {
		metaTitle: 'About | BP Press',
		metaDescription: 'A Studio for Interactive 3D Web Experiences',
		eyebrow: 'About',
		title: 'A Studio for Interactive 3D Web Experiences".',
		lede:
			'BabylonPress.org is a showcase and resource hub dedicated to exploring interactive 3D graphics and applications on the web using the Babylon.js engine. The site demonstrates how modern browser technologies such as WebGL and emerging WebGPU can bring immersive, real-time 3D experiences directly into web pages.',
		cards: [
			{
				title: 'What lives here',
				description:
					'The site is meant for short essays, launch notes, implementation walkthroughs, and Babylon.js demos embedded directly into posts.'
			},
			{
				title: 'How it is built',
				description:
					'SvelteKit handles routing, mdsvex keeps Markdown flexible, and Babylon.js powers interactive 3D content when a story benefits from it.'
			},
			{
				title: 'Why this shape',
				description:
					'The goal is to keep publishing lightweight. Posts live in the codebase, stay easy to edit, and can grow from plain writing into interactive explainers without changing format.'
			}
		]
	},
	contact: {
		metaTitle: 'Contact | BP Press',
		metaDescription:
			'Ways to get in touch about collaborations, writing, and Babylon.js experiments.',
		eyebrow: 'Contact',
		title: 'Open to conversations about writing, product work, and interactive web ideas.',
		lede:
			'This page is a lightweight placeholder for now, but it gives the site a clear home for future contact details and collaboration links.',
		cards: [
			{
				title: 'Editorial',
				description:
					'Use this space for writing inquiries, guest posts, or publication-related messages.'
			},
			{
				title: 'Interactive work',
				description:
					'Use this area for scene demos, technical prototypes, and Babylon.js collaboration notes.'
			},
			{
				title: 'Next step',
				description:
					'When you are ready, replace this copy with a real email address, social links, or a contact form endpoint.'
			}
		]
	}
};
