<script lang="ts">
  import { page } from "$app/state";
  import "../app.css";

  let { children } = $props();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/showcase", label: "Showcase" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  let theme = $state<"dark" | "light">("dark");

  const applyTheme = (nextTheme: "dark" | "light") => {
    theme = nextTheme;
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  };

  const toggleTheme = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (href: string, pathname: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };
</script>

<svelte:head>
  <script>
    const storedTheme = localStorage.getItem("theme");
    const theme = storedTheme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
  </script>
</svelte:head>

<div class="site-shell">
  <header class="site-header">
    <div class="shell-inner">
      <a class="brand" href="/">
        <span class="brand-mark">BP</span>
        <span class="brand-copy">
          <strong>BabylonPress</strong>
          <small>Dark-first product and publishing system</small>
        </span>
      </a>

      <nav class="desktop-nav" aria-label="Main navigation">
        {#each navItems as item}
          <a
            href={item.href}
            class:active={isActive(item.href, page.url.pathname)}
            aria-current={isActive(item.href, page.url.pathname) ? "page" : undefined}
          >
            {item.label}
          </a>
        {/each}
      </nav>

      <div class="header-actions">
        <button
          class="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          aria-pressed={theme === "light"}
          onclick={toggleTheme}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <a class="primary-link" href="/contact">Get started</a>
      </div>

      <details class="mobile-nav">
        <summary aria-label="Open navigation">
          <span></span>
          <span></span>
          <span></span>
        </summary>
        <div class="mobile-panel">
          <button
            class="theme-toggle mobile-theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "light"}
            onclick={toggleTheme}
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>

          {#each navItems as item}
            <a
              href={item.href}
              class:active={isActive(item.href, page.url.pathname)}
              aria-current={isActive(item.href, page.url.pathname) ? "page" : undefined}
            >
              {item.label}
            </a>
          {/each}

          <a class="primary-link mobile-primary" href="/contact">Get started</a>
        </div>
      </details>
    </div>
  </header>

  <main class="site-main">
    {@render children()}
  </main>

  <footer class="site-footer">
    <div class="shell-inner footer-grid">
      <div>
        <strong>BabylonPress</strong>
        <p>
          A cohesive dark-first publishing site for product updates, technical stories, and
          interactive showcase work.
        </p>
      </div>
      <div class="footer-links">
        <a href="/projects">Projects</a>
        <a href="/blog">Blog</a>
        <a href="/showcase">Showcase</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  </footer>
</div>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 40;
    width: 100%;
    background: var(--topbar-bg);
    border-bottom: 1px solid var(--topbar-border);
    backdrop-filter: blur(18px);
  }

  .shell-inner {
    width: min(100%, var(--content-max));
    margin: 0 auto;
    padding: 0 var(--page-padding);
  }

  .site-header .shell-inner {
    width: 100%;
    max-width: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 4.75rem;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-primary);
    text-decoration: none;
  }

  .brand-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.9rem;
    background: linear-gradient(135deg, var(--primary-main), var(--secondary-main));
    color: #fff;
    font-weight: 700;
    box-shadow: 0 12px 24px rgba(25, 118, 210, 0.24);
  }

  .brand-copy {
    display: grid;
  }

  .brand-copy strong {
    font-size: 0.98rem;
  }

  .brand-copy small {
    color: var(--text-secondary);
    font-size: 0.8rem;
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .desktop-nav a,
  .mobile-panel a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
  }

  .desktop-nav a.active,
  .mobile-panel a.active,
  .desktop-nav a:hover,
  .mobile-panel a:hover {
    color: var(--primary-light);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .theme-toggle,
  .primary-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.875rem;
    padding: 0.75rem 1rem;
    border-radius: var(--button-radius);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .theme-toggle {
    border: 1px solid var(--divider-strong);
    background: rgba(255, 255, 255, 0.04);
    color: var(--text-primary);
    cursor: pointer;
  }

  .theme-toggle:hover {
    border-color: rgba(66, 165, 245, 0.4);
    background: rgba(66, 165, 245, 0.1);
  }

  .primary-link {
    border: 1px solid transparent;
    background: var(--primary-main);
    color: #fff;
    box-shadow: 0 12px 24px rgba(25, 118, 210, 0.24);
  }

  .primary-link:hover {
    background: var(--primary-dark);
    color: #fff;
  }

  .mobile-nav {
    display: none;
    position: relative;
  }

  .mobile-nav summary {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;
    width: 2.875rem;
    height: 2.875rem;
    padding: 0.75rem;
    border: 1px solid var(--divider-strong);
    border-radius: var(--button-radius);
    background: var(--background-paper);
    list-style: none;
    cursor: pointer;
  }

  .mobile-nav summary::-webkit-details-marker {
    display: none;
  }

  .mobile-nav summary span {
    width: 100%;
    height: 2px;
    border-radius: 999px;
    background: var(--text-primary);
  }

  .mobile-panel {
    position: absolute;
    right: 0;
    top: calc(100% + 0.75rem);
    display: grid;
    gap: 0.75rem;
    width: min(18rem, calc(100vw - 2rem));
    padding: 1rem;
    border: 1px solid var(--divider);
    border-radius: var(--card-radius);
    background: var(--surface-strong);
    box-shadow: var(--card-shadow);
  }

  .mobile-theme-toggle,
  .mobile-primary {
    width: 100%;
  }

  .site-footer {
    border-top: 1px solid var(--divider);
    background: rgba(255, 255, 255, 0.02);
  }

  .footer-grid {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .footer-grid p {
    margin-top: 0.75rem;
    max-width: 34rem;
    color: var(--text-secondary);
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-content: flex-start;
  }

  .footer-links a {
    color: var(--text-secondary);
    text-decoration: none;
  }

  @media (max-width: 899px) {
    .desktop-nav,
    .header-actions {
      display: none;
    }

    .mobile-nav {
      display: block;
    }

    .footer-grid {
      flex-direction: column;
    }
  }
</style>
