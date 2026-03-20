<script lang="ts">
  import { page } from "$app/state";
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();

  const navigation = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/showcase", label: "Showcase" },
    { href: "/contact", label: "Contact" },
  ];

  function isActive(href: string, pathname: string) {
    if (href === "/") {
      return pathname === "/";
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
        <img class="brand-mark" src="/logo-babylonpress-GB-s.png" alt="BabylonPress logo" height="60" />
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
                aria-current={isActive(item.href, page.url.pathname) ? "page" : undefined}
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
    background: color-mix(in srgb, var(--background) 88%, transparent);
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
    display: block;
    width: auto;
    height: 80px;
    object-fit: contain;
    border-radius: 0.9rem;
    box-shadow: var(--shadow-subtle);
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
    color: var(--muted-foreground);
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
    color: var(--muted-foreground);
    transition:
      background 160ms ease,
      color 160ms ease,
      border-color 160ms ease;
  }

  .nav-list a:hover,
  .nav-list a.active {
    color: var(--text);
    border-color: var(--line);
    background: var(--accent);
  }

  .site-main {
    padding-bottom: 3rem;
  }

  .site-footer {
    border-top: 1px solid var(--line);
    background: color-mix(in srgb, var(--card) 86%, transparent);
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
    color: var(--muted-foreground);
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
    color: var(--muted-foreground);
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
