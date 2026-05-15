import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl, PAGE_DESCRIPTIONS, PAGE_TITLES } from '../site-config';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLES.terms },
  description: PAGE_DESCRIPTIONS.terms,
  alternates: {
    canonical: absoluteUrl('/terms/'),
  },
  openGraph: {
    title: PAGE_TITLES.terms,
    description: PAGE_DESCRIPTIONS.terms,
    url: absoluteUrl('/terms/'),
  },
  twitter: {
    title: PAGE_TITLES.terms,
    description: PAGE_DESCRIPTIONS.terms,
  },
};

export default function TermsPage() {
  return (
    <main className="legal-page" id="main-content">
      <div className="container legal-wrap">
        <nav aria-label="Breadcrumb" className="breadcrumb-row">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Terms</span>
        </nav>

        <header className="legal-header">
          <h1>Terms of use</h1>
          <p>
            Solve real-world problems Sweden is an informational website. Its content is intended to inspire product thinking and research, not to provide legal, medical, financial, or regulatory advice.
          </p>
        </header>

        <section className="legal-section">
          <h2>Content usage</h2>
          <p>
            You may reference the public website for discussion and internal research, but you should independently verify any assumptions before building products, making investments, or taking compliance-sensitive action.
          </p>
        </section>

        <section className="legal-section">
          <h2>No warranties</h2>
          <p>
            The site is provided as-is. While the project aims to stay evidence-led and current, no guarantee is made that every insight, score, or source reference is complete or up to date at all times.
          </p>
        </section>

        <section className="legal-section">
          <h2>Responsible use</h2>
          <p>
            Do not use this website in ways that attempt to damage, overload, scrape abusively, or misrepresent the published content. Respect applicable law, platform terms, and source attribution norms.
          </p>
        </section>
      </div>
    </main>
  );
}
