'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { categories, categoryOrder, type CategoryId, type Language, ui } from './site-data';

const subjects: Record<CategoryId, { sv: string; en: string }> = {
  smb: { sv: 'svenska småföretag', en: 'Swedish small businesses' },
  housing: { sv: 'boende och bostadsrättsföreningar', en: 'residents and housing associations' },
  welfare: { sv: 'anhöriga och omsorgsteam', en: 'families and care teams' },
  integration: { sv: 'människor som är nya i Sverige', en: 'people new to Sweden' },
  climate: { sv: 'svenska hushåll', en: 'Swedish households' },
  public: { sv: 'invånare och småföretag', en: 'residents and small businesses' },
};

function normalizeLower(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1).replace(/[?.!]$/, '');
}

function toQuestion(lang: Language, categoryId: CategoryId, title: string) {
  const base = normalizeLower(title);
  const subject = subjects[categoryId][lang];
  if (lang === 'sv') return `Varför fastnar ${subject} fortfarande i ${base}?`;
  return `Why do ${subject} still struggle with ${base}?`;
}

export function HomePage() {
  const [lang, setLang] = useState<Language>('sv');
  const [current, setCurrent] = useState<CategoryId>('smb');
  const [expanded, setExpanded] = useState(0);

  const copy = ui[lang];
  const category = categories[current];
  const categoryMeta = category[lang];
  const items = category.items;

  const chrome = useMemo(() => ({
    sv: {
      title: 'ALLA PROBLEM',
      sub: 'Filtrera till vänster. Läs de viktigaste problemen till höger. Klicka på + för att öppna en kort förklaring av vad problemet faktiskt är.',
      filterBy: 'Filtrera efter',
      category: 'Kategori',
      problems: 'Problem',
      score: 'Problemscore',
      industry: 'Kategori',
      explanation: 'Kort förklaring',
      signals: 'Signaler',
      whyThisMatters: 'Varför det spelar roll',
      open: 'Öppna',
      close: 'Stäng',
      insightTitle: 'Kuraterat före komplett',
      insightBody: 'Den publika upplevelsen ska kännas redaktionell och självklar: välj kategori, läs de viktigaste frågorna, öppna raden och förstå vad problemet faktiskt är. Tyngre insamling, scoring och klustring ska ske bakom kulisserna.',
      methodTitle: 'Hur vi prioriterar',
      methodBody: 'Varje problem rankas efter severity, frekvens, whitespace, svensk relevans, tillit och sannolik adoption. Bara tio problem visas per kategori.',
      missionTitle: 'Lös verkliga problem',
      missionBody: 'Bygg där svenska människor, hushåll, företag och institutioner redan känner tydlig friktion.',
    },
    en: {
      title: 'ALL PROBLEMS',
      sub: 'Filter on the left. Read the strongest problems on the right. Click + to expand a short explanation of what the problem actually is.',
      filterBy: 'Filter by',
      category: 'Category',
      problems: 'Problems',
      score: 'Problem score',
      industry: 'Category',
      explanation: 'Short explanation',
      signals: 'Signals',
      whyThisMatters: 'Why it matters',
      open: 'Open',
      close: 'Close',
      insightTitle: 'Curated over complete',
      insightBody: 'The public experience should feel editorial and obvious: choose a category, read the strongest questions, open a row, and understand what the problem actually is. Heavier collection, scoring and clustering should stay behind the curtain.',
      methodTitle: 'How we prioritise',
      methodBody: 'Each problem is ranked by severity, frequency, whitespace, Swedish relevance, trust and likely adoption. Only ten problems are shown per category.',
      missionTitle: 'Solve real-world problems',
      missionBody: 'Build where people, households, companies and institutions in Sweden already feel clear friction.',
    },
  })[lang], [lang]);

  return (
    <main className="home-page">
      <div className="nav-shell">
        <div className="container">
          <nav>
            <div className="brand">
              <div className="brand-mark">SV</div>
              <div className="brand-copy">
                <strong>{copy.brandName}</strong>
                <span>{copy.brandSub}</span>
              </div>
            </div>

            <div className="nav-links">
              <a href="#problem-browser">{copy.navTop10}</a>
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
            </div>
          </nav>
        </div>
      </div>

      <section className="problem-browser" id="problem-browser">
        <div className="container browser-wrap">
          <div className="browser-title-block">
            <div className="eyebrow"><span className="eyebrow-dot" />{copy.heroEyebrow}</div>
            <h1>{chrome.title}</h1>
            <p>{chrome.sub}</p>
          </div>

          <div className="browser-grid">
            <aside className="filter-panel">
              <div className="filter-head">
                <span className="filter-kicker">⌁ {chrome.filterBy}</span>
                <strong>{chrome.category}</strong>
              </div>
              <div className="filter-list" role="tablist" aria-label={chrome.category}>
                {categoryOrder.map((id) => {
                  const active = id === current;
                  return (
                    <button
                      key={id}
                      className={`filter-option ${active ? 'active' : ''}`}
                      onClick={() => {
                        setCurrent(id);
                        setExpanded(0);
                      }}
                      role="tab"
                      aria-selected={active}
                    >
                      <span className="check-box" aria-hidden="true">{active ? '✓' : ''}</span>
                      <span>{categories[id][lang].name}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <section className="problem-panel">
              <div className="table-headline">
                <div>
                  <h2>{categoryMeta.name}</h2>
                  <p>{categoryMeta.subtitle}</p>
                </div>
                <div className="code-pill">{copy.countLabel}</div>
              </div>

              <div className="problem-table">
                <div className="problem-table-head">
                  <span>{chrome.problems}</span>
                  <span>{chrome.score}</span>
                  <span>{chrome.industry}</span>
                  <span />
                </div>

                <div className="problem-table-body">
                  {items.map((item, idx) => {
                    const data = item[lang];
                    const [title, desc, tags, scores] = data;
                    const isOpen = expanded === idx;
                    const headline = toQuestion(lang, current, title);
                    return (
                      <article className={`problem-row ${isOpen ? 'open' : ''}`} key={`${current}-${idx}`}>
                        <div className="problem-row-main">
                          <div className="problem-question-block">
                            <div className="row-rank">{copy.rank} #{idx + 1}</div>
                            <h3>{headline}</h3>
                          </div>
                          <div className="problem-score">{scores[0]}</div>
                          <div className="problem-industry">{categoryMeta.name}</div>
                          <button
                            className="expand-btn"
                            type="button"
                            aria-expanded={isOpen}
                            aria-label={isOpen ? chrome.close : chrome.open}
                            onClick={() => setExpanded(isOpen ? -1 : idx)}
                          >
                            <span>{isOpen ? '–' : '+'}</span>
                          </button>
                        </div>

                        {isOpen && (
                          <div className="problem-expand">
                            <div className="expand-copy">
                              <span className="expand-label">{chrome.explanation}</span>
                              <p>{desc}</p>
                            </div>
                            <div className="expand-meta">
                              <div className="mini-metric">
                                <span>{copy.problemScore}</span>
                                <strong>{scores[0]}</strong>
                              </div>
                              <div className="mini-metric">
                                <span>{copy.market}</span>
                                <strong>{scores[1]}</strong>
                              </div>
                              <div className="mini-metric">
                                <span>{copy.trust}</span>
                                <strong>{scores[2]}</strong>
                              </div>
                            </div>
                            <div className="tag-strip">
                              <span className="expand-label">{chrome.signals}</span>
                              <div className="tag-row">{tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                            </div>
                            <div className="expand-note">
                              <span className="expand-label">{chrome.whyThisMatters}</span>
                              <p>{lang === 'sv' ? 'Det här problemet återkommer tillräckligt ofta och kostar tillräckligt mycket för att vara relevant för founders som letar efter verklig efterfrågan.' : 'This problem recurs often enough and costs enough to matter for founders looking for real demand.'}</p>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="lower-band" id="insight">
        <div className="container lower-grid">
          <article className="info-card">
            <span className="label">{copy.navInsight}</span>
            <h3>{chrome.insightTitle}</h3>
            <p>{chrome.insightBody}</p>
          </article>
          <article className="info-card accent" id="method">
            <span className="label label-invert">{copy.navMethod}</span>
            <h3>{chrome.methodTitle}</h3>
            <p>{chrome.methodBody}</p>
            <div className="method-score-grid">
              {copy.methodScores.map(([title, body]) => (
                <div className="method-score" key={title}>
                  <strong>{title}</strong>
                  <span>{body}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="mission-band">
        <div className="container">
          <div className="mission-card">
            <span className="label">{copy.missionLabel}</span>
            <h3>{chrome.missionTitle}</h3>
            <p>{chrome.missionBody}</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-row">
          <div>{copy.footerLeft}</div>
          <div><Link href="/architecture">{copy.footerRight}</Link></div>
        </div>
      </footer>
    </main>
  );
}
