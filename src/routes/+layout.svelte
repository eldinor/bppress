<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const navigation = [
		{ href: '/', label: 'Home' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/about', label: 'About' },
		{ href: '/showcase', label: 'Showcase' },
		{ href: '/contact', label: 'Contact' }
	];

	function isActive(href: string, pathname: string) {
		if (href === '/') {
			return pathname === '/';
		}

		return pathname === href || pathname.startsWith(`${href}/`);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="shell">
	<header class="site-header">
		<div class="header-inner">
			<a class="brand" href="/">
				<span class="brand-mark">BP</span>
				<span class="brand-copy">
					<strong>BP Press</strong>
					<small>Ideas, scenes, and technical notes</small>
				</span>
			</a>

			<nav aria-label="Main navigation">
				<ul class="nav-list">
					{#each navigation as item}
						<li>
							<a
								href={item.href}
								class:active={isActive(item.href, page.url.pathname)}
								aria-current={isActive(item.href, page.url.pathname) ? 'page' : undefined}
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</header>

	<main class="site-main">
		{@render children()}
	</main>

	<footer class="site-footer">
		<div class="footer-inner">
			<div>
				<strong>BP Press</strong>
				<p>A small SvelteKit blog for writing, experiments, and Babylon.js posts.</p>
			</div>
			<div class="footer-links">
				<a href="/blog">Latest posts</a>
				<a href="/showcase">Scene showcase</a>
				<a href="/contact">Contact</a>
			</div>
		</div>
	</footer>
</div>

<style>
	.shell {
		min-height: 100vh;
	}

	.site-header {
		position: sticky;
		top: 0;
		z-index: 10;
		backdrop-filter: blur(18px);
		background: rgba(247, 251, 255, 0.84);
		border-bottom: 1px solid var(--line);
	}

	.header-inner,
	.footer-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		min-height: 78px;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.9rem;
		text-decoration: none;
	}

	.brand-mark {
		display: grid;
		place-items: center;
		width: 2.8rem;
		height: 2.8rem;
		border-radius: 0.9rem;
		background: linear-gradient(135deg, #66b2ff, #1976d2);
		color: white;
		font-weight: 800;
		letter-spacing: 0.04em;
		box-shadow: 0 14px 34px rgba(25, 118, 210, 0.28);
	}

	.brand-copy {
		display: flex;
		flex-direction: column;
	}

	.brand-copy strong {
		font-size: 1rem;
	}

	.brand-copy small {
		margin-top: 0.15rem;
		color: var(--muted);
		font-size: 0.82rem;
	}

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.nav-list a {
		display: inline-flex;
		align-items: center;
		padding: 0.72rem 1rem;
		border: 1px solid transparent;
		border-radius: 999px;
		text-decoration: none;
		color: var(--muted);
		transition:
			background 160ms ease,
			color 160ms ease,
			border-color 160ms ease;
	}

	.nav-list a:hover,
	.nav-list a.active {
		color: var(--text);
		border-color: var(--line);
		background: var(--accent-soft);
	}

	.site-main {
		padding-bottom: 3rem;
	}

	.site-footer {
		border-top: 1px solid var(--line);
		background: rgba(255, 255, 255, 0.82);
	}

	.footer-inner {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		padding-top: 2rem;
		padding-bottom: 2.5rem;
	}

	.footer-inner p {
		margin: 0.5rem 0 0;
		max-width: 34rem;
		color: var(--muted);
		line-height: 1.7;
	}

	.footer-links {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-content: flex-start;
	}

	.footer-links a {
		text-decoration: none;
		color: var(--muted);
	}

	@media (max-width: 820px) {
		.header-inner,
		.footer-inner {
			flex-direction: column;
			align-items: flex-start;
		}

		.header-inner {
			padding-top: 1rem;
			padding-bottom: 1rem;
		}
	}
</style>
