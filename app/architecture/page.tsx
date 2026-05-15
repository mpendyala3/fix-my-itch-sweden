import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl, PAGE_DESCRIPTIONS, PAGE_TITLES } from '../site-config';

const stages = [
  {
    title: 'Source inputs',
    points: ['Reddit, Flashback, X and public communities', 'SCB, Vinnova, Konsumentverket, Försäkringskassan', 'Trustpilot SE, Reco, ARN, Hallå Konsument'],
  },
  {
    title: 'Collection + compliance',
    points: ['Source registry and ingestion cadence', 'Raw evidence store with metadata', 'PII redaction, consent flags and takedown hooks'],
  },
  {
    title: 'Scoring + editorial layer',
    points: ['Cluster similar complaints into founder-readable problems', 'Score severity, frequency, whitespace and trust', 'Human curation narrows the public product to Top 10 per category'],
  },
  {
    title: 'Public experience',
    points: ['Category-first Top 10 homepage', 'Architecture route for transparency', 'Swedish-primary with natural English toggle'],
  },
];

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLES.architecture },
  description: PAGE_DESCRIPTIONS.architecture,
  alternates: {
    canonical: absoluteUrl('/architecture/'),
  },
  openGraph: {
    title: PAGE_TITLES.architecture,
    description: PAGE_DESCRIPTIONS.architecture,
    url: absoluteUrl('/architecture/'),
  },
  twitter: {
    title: PAGE_TITLES.architecture,
    description: PAGE_DESCRIPTIONS.architecture,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: absoluteUrl('/'),
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Architecture',
      item: absoluteUrl('/architecture/'),
    },
  ],
};

export default function ArchitecturePage() {
  return (
    <main className="architecture-page" id="main-content">
      <div className="container architecture-wrap">
        <nav aria-label="Breadcrumb" className="breadcrumb-row">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Architecture</span>
        </nav>

        <header className="architecture-header">
          <div>
            <div className="eyebrow dark">
              <span className="eyebrow-dot" />Architecture map
            </div>
            <h1>Solve real-world problems — how the platform works</h1>
            <p className="architecture-sub">
              A Sweden-first intelligence system that collects public problem signals, applies compliance and editorial gates,
              scores founder-worthy opportunities, and publishes only the Top 10 problems for each category.
            </p>
          </div>
          <aside className="architecture-meta">
            <strong>Design principles</strong>
            <ul>
              <li>Swedish first, natural English second</li>
              <li>Evidence-led and editorially clear</li>
              <li>Human judgment before publication</li>
              <li>No public all-problems dump</li>
            </ul>
          </aside>
        </header>

        <section className="architecture-grid" aria-label="Architecture stages">
          {stages.map((stage) => (
            <article className="architecture-card" key={stage.title}>
              <h2>{stage.title}</h2>
              <ul>
                {stage.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <div className="architecture-band">
          <div className="band-pill">Compliance / takedown / audit loop across the platform</div>
        </div>

        <nav className="architecture-actions" aria-label="Architecture page links">
          <Link className="btn ghost" href="/">
            Back to homepage
          </Link>
          <Link className="btn ghost" href="/prototype/">
            Prototype route
          </Link>
        </nav>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </main>
  );
}
