import Link from 'next/link';

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

export default function ArchitecturePage() {
  return (
    <main className="architecture-page">
      <div className="container architecture-wrap">
        <div className="architecture-header">
          <div>
            <div className="eyebrow dark"><span className="eyebrow-dot" />Architecture map</div>
            <h1>Solve real-world problems — how the platform works</h1>
            <p className="architecture-sub">
              A Sweden-first intelligence system that collects public problem signals, applies compliance and editorial gates,
              scores founder-worthy opportunities, and publishes only the Top 10 problems for each category.
            </p>
          </div>
          <div className="architecture-meta">
            <strong>Design principles</strong>
            <ul>
              <li>Swedish first, natural English second</li>
              <li>Evidence-led and editorially clear</li>
              <li>Human judgment before publication</li>
              <li>No public all-problems dump</li>
            </ul>
          </div>
        </div>

        <div className="architecture-grid">
          {stages.map((stage) => (
            <section className="architecture-card" key={stage.title}>
              <h2>{stage.title}</h2>
              <ul>
                {stage.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </section>
          ))}
        </div>

        <div className="architecture-band">
          <div className="band-pill">Compliance / takedown / audit loop across the platform</div>
        </div>

        <div className="architecture-actions">
          <Link className="btn ghost" href="/">Back to homepage</Link>
          <a className="btn primary" href="/architecture.html">Open legacy diagram</a>
        </div>
      </div>
    </main>
  );
}
