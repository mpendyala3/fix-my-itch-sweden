import type { Metadata } from 'next';
import Link from 'next/link';
import { PAGE_DESCRIPTIONS, PAGE_TITLES, absoluteUrl } from './site-config';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLES.notFound },
  description: PAGE_DESCRIPTIONS.notFound,
  alternates: {
    canonical: absoluteUrl('/404/'),
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="error-page" id="main-content">
      <div className="container error-wrap">
        <p className="error-code">404</p>
        <h1>Page not found</h1>
        <p>
          The route you requested does not exist. You can return to the homepage, review the architecture page, or open the live prototype route.
        </p>
        <nav className="hero-actions" aria-label="Recovery links">
          <Link className="btn primary" href="/">
            Home
          </Link>
          <Link className="btn ghost" href="/architecture/">
            Architecture
          </Link>
          <Link className="btn ghost" href="/prototype/">
            Prototype
          </Link>
        </nav>
      </div>
    </main>
  );
}
