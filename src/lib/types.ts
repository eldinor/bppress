import type { Component } from 'svelte';

export type PostMetadata = {
	title: string;
	slug: string;
	excerpt: string;
	date: string;
	tags?: string[];
	cover?: string;
};

export type Post = PostMetadata & {
	component: Component;
};

export type TagSummary = {
	name: string;
	slug: string;
	count: number;
};
