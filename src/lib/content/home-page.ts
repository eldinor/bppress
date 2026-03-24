export type FeatureEntry = {
	title: string;
	description: string;
};

export type StatEntry = {
	value: string;
	label: string;
};

export type TestimonialEntry = {
	quote: string;
	name: string;
	role: string;
	company: string;
};

export type HomePageContent = {
	metaTitle: string;
	metaDescription: string;
	hero: {
		eyebrow: string;
		title: string;
		description: string;
		primaryLabel: string;
		primaryHref: string;
		secondaryLabel: string;
		secondaryHref: string;
		previewPrimaryLabel: string;
		previewPrimaryText: string;
		previewMetricLabel: string;
		previewMetricText: string;
		previewCode: string;
		previewList: string[];
	};
	trust: {
		label: string;
		logos: string[];
	};
	products: {
		eyebrow: string;
		title: string;
		description: string;
		features: FeatureEntry[];
	};
	whyChoose: {
		eyebrow: string;
		title: string;
		description: string;
		advantages: string[];
	};
	showcase: {
		eyebrow: string;
		title: string;
		description: string;
		largeLabel: string;
		largeText: string;
		metricOneLabel: string;
		metricOneText: string;
		metricTwoLabel: string;
		metricTwoText: string;
	};
	community: {
		eyebrow: string;
		title: string;
		stats: StatEntry[];
	};
	testimonials: {
		eyebrow: string;
		title: string;
		items: TestimonialEntry[];
	};
};

export const homePageContent: HomePageContent = {
	metaTitle: 'BP Press',
	metaDescription:
		'Move faster with intuitive UI tools built around a polished, production-ready component system.',
	hero: {
		eyebrow: 'Production-ready UI foundation',
		title: 'Move faster with intuitive UI tools',
		description:
			'Build polished, production-ready interfaces with a flexible component system and strong customization foundations.',
		primaryLabel: 'Get started',
		primaryHref: '/contact',
		secondaryLabel: 'View docs',
		secondaryHref: '/blog',
		previewPrimaryLabel: 'Component coverage',
		previewPrimaryText: 'Ready for product, docs, and dashboard flows',
		previewMetricLabel: 'Theme tokens',
		previewMetricText: 'Palette, spacing, and responsive rules in one place',
		previewCode: 'Grid + Container + Stack = clean delivery',
		previewList: ['Core', 'Advanced', 'Templates', 'Design Kits']
	},
	trust: {
		label: 'Trusted by product teams worldwide',
		logos: ['Northstar', 'Datapoint', 'Aperture', 'Relay', 'Granite', 'Monarch']
	},
	products: {
		eyebrow: 'Product overview',
		title: 'Main product pillars built for shipping fast',
		description:
			'A clean, component-led system with enough depth for technical teams and enough polish for customer-facing work.',
		features: [
			{
				title: 'Core Components',
				description:
					'Ready-to-use UI building blocks for fast delivery across product surfaces and landing pages.'
			},
			{
				title: 'Advanced Components',
				description:
					'Data-heavy modules and workflow-ready patterns for teams building beyond the basics.'
			},
			{
				title: 'Templates',
				description:
					'Prebuilt starting points that help teams move from idea to launch with less setup friction.'
			},
			{
				title: 'Design Kits',
				description:
					'A shared system for design and engineering so decisions stay aligned while projects grow.'
			}
		]
	},
	whyChoose: {
		eyebrow: 'Why choose us',
		title: 'Built for clarity, scale, and customization',
		description:
			'The experience stays calm and readable while giving teams enough range to build serious product surfaces.',
		advantages: [
			'Timeless aesthetics',
			'Intuitive customization',
			'Strong documentation',
			'Accessibility-first approach'
		]
	},
	showcase: {
		eyebrow: 'Showcase',
		title: 'Visual proof that the system feels polished in production',
		description:
			'Large surfaces, measured spacing, and clear hierarchy make the front page feel ready for real product work instead of a placeholder landing page.',
		largeLabel: 'Enterprise-ready layout',
		largeText: 'Consistent containers, balanced typography, and focused CTA paths.',
		metricOneLabel: 'Load path',
		metricOneText: 'Clear navigation and section rhythm',
		metricTwoLabel: 'Customization',
		metricTwoText: 'Theme-friendly and component-driven'
	},
	community: {
		eyebrow: 'Community',
		title: 'Signals of scale and credibility',
		stats: [
			{ value: '5.8M', label: 'weekly downloads' },
			{ value: '93.9k', label: 'GitHub stars' },
			{ value: '3k', label: 'contributors' },
			{ value: '120+', label: 'countries in the community' }
		]
	},
	testimonials: {
		eyebrow: 'Testimonials',
		title: 'Practical validation from teams shipping product work',
		items: [
			{
				quote: 'We shipped a cleaner product surface in days, not weeks.',
				name: 'Anika Patel',
				role: 'Product Design Lead',
				company: 'Northstar'
			},
			{
				quote:
					'The system feels structured enough for enterprise work without slowing the team down.',
				name: 'Jon Mercer',
				role: 'Frontend Engineering Manager',
				company: 'Relay'
			},
			{
				quote:
					'The balance of polish and flexibility made it easy to scale across marketing and docs.',
				name: 'Mila Chen',
				role: 'Developer Experience Director',
				company: 'Granite'
			}
		]
	}
};
