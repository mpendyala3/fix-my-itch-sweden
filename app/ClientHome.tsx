'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { categories, categoryOrder, type CategoryId, type Language, ui } from './site-data';

function withBasePath(path: string) {
  const basePath = process.env.NODE_ENV === 'production' ? '/fix-my-itch-sweden' : '';
  if (!path.startsWith('/')) return `${basePath}/${path}`;
  return `${basePath}${path}`;
}

export function HomePage() {
  const [lang, setLang] = useState<Language>('sv');
  const [current, setCurrent] = useState<CategoryId>('smb');

  const copy = ui[lang];
  const category = categories[current];
  const categoryMeta = category[lang];
  const items = category.items;
  const architectureHref = withBasePath('/architecture');

  const methodScores = useMemo(() => copy.methodScores, [copy]);

  return (
    <main>
      <div className="nav-shell">
        <div className="container">
          <nav>
            <div className="brand">
              <div className="brand-mark">FI</div>
              <div className="brand-copy">
                <strong>{copy.brandName}</strong>
                <span>{copy.brandSub}</span>
              </div>
            </div>
            <div className="nav-links">
              <a href="#top10">{copy.navTop10}</a>
              <a href="#insight">{copy.navInsight}</a>
              <a href="#method">{copy.navMethod}</a>
              <Link href="/architecture">{copy.navArchitecture}</Link>
            </div>
            <div className="nav-actions">
              <div className="lang-toggle" aria-label="Language toggle">
                <button className={lang === 'sv' ? 'active' : ''} onClick={() => setLang('sv')}>SV</button>
                <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
              </div>
              <Link className="btn ghost" href="/architecture">{copy.navArchBtn}</Link>
              <a className="btn primary" href="#top10">{copy.navCta}</a>
            </div>
          </nav>
        </div>
      </div>

      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="eyebrow"><span className="eyebrow-dot" />{copy.heroEyebrow}</div>
              <h1>{copy.heroTitle}</h1>
              <p className="lead">{copy.heroLead}</p>
              <div className="hero-cta">
                <a className="btn primary" href="#top10">{copy.heroPrimary}</a>
                <a className="btn ghost" href="#method">{copy.heroSecondary}</a>
              </div>
              <div className="hero-proof">
                <div className="proof-card"><strong>10</strong><span>{copy.proof1}</span></div>
                <div className="proof-card"><strong>6</strong><span>{copy.proof2}</span></div>
                <div className="proof-card"><strong>May 2026</strong><span>{copy.proof3}</span></div>
              </div>
            </div>
            <div className="preview-shell">
              <div className="preview-header">
                <span>{copy.previewHeader}</span>
                <span className="status-pill">{copy.previewStatus}</span>
              </div>
              <div className="score-preview">
                <h3>{copy.previewTitle}</h3>
                <p>{copy.previewBody}</p>
                <div className="score-row">
                  <div className="metric-box"><span>{copy.metric1}</span><strong>84</strong></div>
                  <div className="metric-box"><span>{copy.metric2}</span><strong>{lang === 'sv' ? 'Hög' : 'High'}</strong></div>
                  <div className="metric-box"><span>{copy.metric3}</span><strong>{lang === 'sv' ? 'Lagom' : 'Balanced'}</strong></div>
                </div>
              </div>
              <div className="preview-note">{copy.previewNote}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="top10">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>{copy.topTitle}</h2>
              <p>{copy.topLead}</p>
            </div>
          </div>
          <div className="category-strip">
            <div className="category-row">
              {categoryOrder.map((id) => (
                <button
                  key={id}
                  className={`category-btn ${id === current ? 'active' : ''}`}
                  onClick={() => setCurrent(id)}
                >
                  {categories[id][lang].name}
                </button>
              ))}
            </div>
          </div>
          <div className="top-headline">
            <div>
              <h3>{categoryMeta.name}</h3>
              <p>{categoryMeta.subtitle}</p>
            </div>
            <div className="code-pill">{copy.countLabel}</div>
          </div>
          <div className="problem-grid">
            {items.map((item, idx) => {
              const data = item[lang];
              const [title, desc, tags, scores] = data;
              return (
                <article className="problem-card" key={`${current}-${idx}`}>
                  <div className="problem-top">
                    <div className="rank">{copy.rank} #{idx + 1}</div>
                    <div className="score-tags"><span className="score-tag">{copy.itch} {scores[0]}</span></div>
                  </div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                  <div className="tag-row">{tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                  <div className="problem-foot">
                    <div className="mini-metric"><span>{copy.itch}</span><strong>{scores[0]}</strong></div>
                    <div className="mini-metric"><span>{copy.market}</span><strong>{scores[1]}</strong></div>
                    <div className="mini-metric"><span>{copy.trust}</span><strong>{scores[2]}</strong></div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="insight">
        <div className="container">
          <div className="insight-grid">
            <article className="insight-card">
              <span className="label">{copy.insightLabel}</span>
              <h3>{copy.insightTitle}</h3>
              <p>{copy.insightBody1}</p>
              <p>{copy.insightBody2}</p>
              <a className="btn primary" href="#method">{copy.insightCta}</a>
            </article>
            <aside className="method-card" id="method">
              <span className="label label-invert">{copy.methodLabel}</span>
              <h3>{copy.methodTitle}</h3>
              <p>{copy.methodBody}</p>
              <div className="method-score-grid">
                {methodScores.map(([title, body]) => (
                  <div className="method-score" key={title}>
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="mission-card">
            <span className="label">{copy.missionLabel}</span>
            <h3>{copy.missionTitle}</h3>
            <p>{copy.missionBody}</p>
            <div className="mission-row">
              <div className="mission-mini"><strong>{copy.missionMini1}</strong><span>{copy.missionMini1Body}</span></div>
              <div className="mission-mini"><strong>{copy.missionMini2}</strong><span>{copy.missionMini2Body}</span></div>
              <div className="mission-mini"><strong>{copy.missionMini3}</strong><span>{copy.missionMini3Body}</span></div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-row">
            <div>{copy.footerLeft}</div>
            <div><a href={architectureHref}>{copy.footerRight}</a></div>
          </div>
        </div>
      </footer>
    </main>
  );
}
