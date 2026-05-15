'use client';

import { useMemo, useState } from 'react';
import { categories, categoryOrder, type CategoryId, type Language } from './site-data';

type ProblemTuple = readonly [string, string, readonly string[], readonly [number, number, number]];

type ProblemPresentation = {
  title: string;
  description: string;
  exactSources: readonly string[];
  sourceFamilies: string[];
  scores: readonly [number, number, number];
};

const copy = {
  sv: {
    brandName: 'Lös verkliga problem',
    brandSub: 'Sverige-först problem intelligence',
    navInsights: 'Insikter',
    navTop10: 'Top 10',
    navAllProblems: 'Alla problem',
    navMethod: 'Metod',
    navMission: 'Mission',
    heroEyebrow: 'Sverige talar genom återkommande vardagsfriktion',
    heroTitle: 'Lös verkliga problem',
    heroBody:
      'En Sverige-först vy över återkommande, genuina och byggbara problem — utvalda för founders som vill börja i verkliga behov, inte i hype.',
    heroPrimary: 'Visa top problems',
    heroSecondary: 'Bläddra i alla kategorier',
    proofLabel: 'Vad du tittar på',
    proofItems: [
      ['20', 'kuraterade kategorier'],
      ['200', 'utvalda problem'],
      ['SV / EN', 'bilingual upplevelse'],
    ],
    insightsLabel: 'Utvalda signaler',
    insightsTitle: 'Några av de mest byggbara Sverige-signalerna just nu',
    insightsBody:
      'Inte ett klagomålsflöde. Inte trendjakt. Ett mer koncentrerat urval av återkommande friktion där människor, hushåll och organisationer faktiskt behöver bättre lösningar.',
    browserEyebrow: 'Top 10 per kategori',
    browserTitle: 'Från bred signalbild till konkreta problem',
    browserBody:
      'Välj en kategori och läs de tio tydligaste möjligheterna i den. Rubrikerna är skrivna för att vara sakliga, användarnära och grundade i verklig svensk kontext.',
    filterLabel: 'Filtrera efter',
    categoryLabel: 'Kategori',
    currentView: 'Aktiv vy',
    allProblemsLabel: 'Alla problem',
    problems: 'Problem',
    score: 'Score',
    industry: 'Kategori',
    explanation: 'Kort förklaring',
    signalFamilies: 'Signaltyper',
    exactSources: 'Exempel på källor',
    whyThisMatters: 'Varför det är relevant',
    whyThisMattersBody:
      'Problemet återkommer i tillräckligt många sammanhang för att peka på verklig efterfrågan, men är samtidigt tillräckligt avgränsat för att kunna omsättas i en konkret produkt eller tjänst.',
    methodLabel: 'Hur vi tänker',
    methodTitle: 'Mer opportunity intelligence, mindre provokation',
    methodBody:
      'Startsidan ska kännas mer som en kuraterad founder-resurs än som ett arkiv av klagomål. Därför lyfter vi framför allt behov, koordinationsluckor, förutsägbarhet, tillgång och användbarhet.',
    methodCards: [
      ['Genuina behov', 'Problem formuleras som återkommande friktion med praktiska konsekvenser.'],
      ['Kulturell precision', 'Språket ska vara tydligt och sant utan att bli onödigt spetsigt eller anklagande.'],
      ['Byggbar riktning', 'Varje rad ska hjälpa en founder att se vart en lösning skulle kunna börja.'],
    ],
    missionLabel: 'Vårt uppdrag',
    missionTitle: 'Börja där Sverige faktiskt behöver bättre lösningar',
    missionBody:
      'Målet är inte att lista allt som är fel. Målet är att synliggöra återkommande problem som är verkliga, relevanta och värda att bygga kring — med en ton som fungerar i Sverige och inger förtroende.',
    ctaLabel: 'Nästa steg',
    ctaTitle: 'Bygg runt verklig efterfrågan',
    ctaBody:
      'Utforska kategorierna, hitta ett område där behovet återkommer och använd det som utgångspunkt för en mer fokuserad produktidé.',
    footerLeft: 'Lös verkliga problem — Sverige-först problem intelligence',
    footerRight: 'Kuraterat för verklig efterfrågan, inte för startup-teater.',
    rank: 'Rank',
    problemScore: 'Problem score',
    market: 'Marknad',
    trust: 'Tillit',
    open: 'Öppna',
    close: 'Stäng',
  },
  en: {
    brandName: 'Solve real-world problems',
    brandSub: 'Sweden-first problem intelligence',
    navInsights: 'Insights',
    navTop10: 'Top 10',
    navAllProblems: 'All problems',
    navMethod: 'Method',
    navMission: 'Mission',
    heroEyebrow: 'Sweden speaks through recurring everyday friction',
    heroTitle: 'Solve real-world problems',
    heroBody:
      'A Sweden-first view of recurring, genuine, buildable problems — curated for founders who want to start with real demand instead of startup hype.',
    heroPrimary: 'Show top problems',
    heroSecondary: 'Browse all categories',
    proofLabel: 'What you are looking at',
    proofItems: [
      ['20', 'curated categories'],
      ['200', 'selected problems'],
      ['SV / EN', 'bilingual experience'],
    ],
    insightsLabel: 'Featured signals',
    insightsTitle: 'A few of the most buildable Sweden signals right now',
    insightsBody:
      'Not a complaint feed. Not trend-chasing. A tighter selection of recurring friction where people, households, and organizations genuinely need better solutions.',
    browserEyebrow: 'Top 10 by category',
    browserTitle: 'From broad signal map to concrete opportunities',
    browserBody:
      'Choose a category and read the ten clearest opportunities within it. Headlines are written to stay grounded, user-centered, and culturally appropriate for a Sweden-first audience.',
    filterLabel: 'Filter by',
    categoryLabel: 'Category',
    currentView: 'Current view',
    allProblemsLabel: 'All problems',
    problems: 'Problem',
    score: 'Score',
    industry: 'Category',
    explanation: 'Short explanation',
    signalFamilies: 'Signal families',
    exactSources: 'Example sources',
    whyThisMatters: 'Why it matters',
    whyThisMattersBody:
      'The issue appears often enough across real contexts to signal demand, yet remains specific enough to be translated into a concrete product or service direction.',
    methodLabel: 'How we think',
    methodTitle: 'More opportunity intelligence, less provocation',
    methodBody:
      'The homepage should feel more like a curated founder resource than a complaint archive. So we emphasize unmet needs, coordination gaps, predictability, access, and usability.',
    methodCards: [
      ['Genuine needs', 'Problems are framed as recurring friction with practical downstream consequences.'],
      ['Cultural precision', 'The language should stay honest and specific without sounding accusatory or inflammatory.'],
      ['Buildable direction', 'Each row should help a founder see where a solution could realistically begin.'],
    ],
    missionLabel: 'Our mission',
    missionTitle: 'Start where Sweden genuinely needs better solutions',
    missionBody:
      'The goal is not to list everything that is wrong. The goal is to surface recurring problems that are real, relevant, and worth building around — in a tone that fits Sweden and earns trust.',
    ctaLabel: 'Next move',
    ctaTitle: 'Build around real demand',
    ctaBody:
      'Explore the categories, find an area where need repeats, and use it as the starting point for a sharper product direction.',
    footerLeft: 'Solve real-world problems — Sweden-first problem intelligence',
    footerRight: 'Curated for real demand, not startup theatre.',
    rank: 'Rank',
    problemScore: 'Problem score',
    market: 'Market',
    trust: 'Trust',
    open: 'Open',
    close: 'Close',
  },
} as const;

const featuredProblemRefs: { id: CategoryId; index: number }[] = [
  { id: 'housing-real-estate', index: 9 },
  { id: 'elder-care', index: 4 },
  { id: 'fintech-payments', index: 0 },
  { id: 'mobility-micromobility', index: 4 },
];

const titleOverrides = {
  sv: {
    'Långa handläggningstider för ersättningar': 'Svårt att förutse tid till beslut i välfärdsärenden',
    'Svårt att nå handläggare': 'Svårt att få tydliga uppdateringar under pågående ärenden',
    'Offentlig upphandling missar användarbehov': 'Offentligt upphandlade tjänster kan vara svåra att anpassa till vardagliga användarbehov',
    'Kontroll mot bidragsfusk skapar felaktig misstänkliggörning': 'Verifieringskrav i ersättningsärenden upplevs som svåra att förstå och hantera',
    'Otillgängligt myndighetsspråk': 'Viktig samhällsinformation kan vara svår att förstå för olika användargrupper',
    'Bostadsdiskriminering och svag tillgång till hyresmarknaden': 'Svår väg till stabil tillgång på hyresmarknaden för nyanlända och hushåll utan etablerade referenser',
    'Utrikes födda kvinnor står längre från arbetsmarknaden': 'Många utrikes födda kvinnor möter flera samtidiga hinder till arbete',
    'BankID-beroende stänger ute vissa användare': 'Viktiga tjänster kräver digital identifiering som inte fungerar lika väl för alla användare',
    'Kvinnors hälsobesvär avfärdas eller fördröjs': 'Vissa kvinnorelaterade hälsobesvär får sen eller ojämn väg till diagnos och stöd',
  },
  en: {
    'Long benefit processing times': 'Decision timing in welfare cases is hard to predict',
    'Difficulty reaching public case officers': 'It is hard to get clear updates during ongoing public cases',
    'Public procurement misses user needs': 'Publicly procured services can be hard to adapt to everyday user needs',
    'Welfare fraud controls create false suspicion': 'Verification requirements in benefit cases can be difficult to understand and manage',
    'Inaccessible public information language': 'Important public information can be difficult for different user groups to understand',
    'Housing discrimination and weak rental access': 'Stable rental access remains difficult for newcomers and households without established references',
    'Immigrant women face labor-market exclusion': 'Many foreign-born women face several overlapping barriers to work',
    'BankID dependence excludes some users': 'Essential services depend on digital identity tools that do not work equally well for all users',
    'Women’s health complaints are dismissed or delayed': 'Some women’s health conditions still face slow or uneven paths to diagnosis and support',
  },
} as const;

const descriptionOverrides = {
  sv: {
    'Långa handläggningstider för ersättningar': 'Många hushåll behöver bättre förutsägbarhet kring när beslut, utbetalning och nästa steg i ersättningsärenden faktiskt kommer.',
    'Svårt att nå handläggare': 'Användare behöver tydligare status, enklare kontaktvägar och bättre överblick under pågående ärenden.',
    'Kontroll mot bidragsfusk skapar felaktig misstänkliggörning': 'Det finns ett återkommande behov av att göra kontroller, intyg och verifieringssteg mer begripliga och mindre belastande för legitima användare.',
    'Otillgängligt myndighetsspråk': 'Det finns ett tydligt behov av enklare, mer inkluderande och mer situationsanpassad samhällsinformation.',
    'Bostadsdiskriminering och svag tillgång till hyresmarknaden': 'Många hushåll behöver en tydligare och tryggare väg in i hyresmarknaden när referenser, kötid eller etablering saknas.',
    'BankID-beroende stänger ute vissa användare': 'Viktiga tjänster blir svåra att nå för personer som saknar rätt identitetshandlingar, smartphone eller trygg digital vana.',
  },
  en: {
    'Long benefit processing times': 'Many households need better predictability around when decisions, payments, and next steps in benefit cases will actually happen.',
    'Difficulty reaching public case officers': 'Users need clearer status visibility, simpler contact paths, and better orientation during ongoing cases.',
    'Welfare fraud controls create false suspicion': 'There is recurring demand for making checks, documentation, and verification steps easier to understand and less burdensome for legitimate users.',
    'Inaccessible public information language': 'There is a clear need for simpler, more inclusive, and more situation-aware public information.',
    'Housing discrimination and weak rental access': 'Many households need a clearer and safer path into the rental market when references, queue time, or establishment are limited.',
    'BankID dependence excludes some users': 'Essential services become hard to access for people who lack the right identity documents, a smartphone, or confident digital habits.',
  },
} as const;

function sourceFamily(tag: string, lang: Language) {
  const lower = tag.toLowerCase();

  if (['reddit', 'flashback', 'trustpilot', 'reco', 'linkedin'].some((token) => lower.includes(token))) {
    return lang === 'sv' ? 'Community- och marknadssignaler' : 'Community and market signals';
  }

  if (['arn', 'hallå konsument', 'hallå konsument', 'konsumentverket'].some((token) => lower.includes(token))) {
    return lang === 'sv' ? 'Konsumentskydd & klagomålsdata' : 'Consumer protection and complaint data';
  }

  if (
    [
      '1177',
      'arbetsförmedlingen',
      'boverket',
      'digg',
      'ehalsomyndigheten',
      'energimyndigheten',
      'folkhälsomyndigheten',
      'försäkringskassan',
      'imy',
      'ivo',
      'konkurrensverket',
      'lakemedelsverket',
      'livsmedelsverket',
      'migrationsverket',
      'msb',
      'myndigheterna',
      'naturvardsverket',
      'polisen',
      'postnord',
      'pts',
      'riksbank',
      'scb',
      'sj.se',
      'skr',
      'skatteverket',
      'skolverket',
      'socialstyrelsen',
      'trafikverket',
      'transportstyrelsen',
      'upphandlingsmyndigheten',
      'uhr',
      'do.se',
    ].some((token) => lower.includes(token))
  ) {
    return lang === 'sv' ? 'Offentliga & institutionella signaler' : 'Public and institutional signals';
  }

  return lang === 'sv' ? 'Bransch- och expertsignaler' : 'Sector and expert signals';
}

function presentProblem(lang: Language, tuple: ProblemTuple): ProblemPresentation {
  const [rawTitle, rawDescription, exactSources, scores] = tuple;
  const title = titleOverrides[lang][rawTitle as keyof (typeof titleOverrides)[typeof lang]] ?? rawTitle;
  const description =
    descriptionOverrides[lang][rawTitle as keyof (typeof descriptionOverrides)[typeof lang]] ?? rawDescription;
  const sourceFamilies = Array.from(new Set(exactSources.map((tag) => sourceFamily(tag, lang)))).slice(0, 3);

  return {
    title,
    description,
    exactSources,
    sourceFamilies,
    scores,
  };
}

export function HomePage() {
  const [lang, setLang] = useState<Language>('sv');
  const [current, setCurrent] = useState<CategoryId>(categoryOrder[0]);
  const [expanded, setExpanded] = useState(0);

  const text = copy[lang];
  const category = categories[current];
  const categoryMeta = category[lang];
  const categoryItems = category.items.map((item) => presentProblem(lang, item[lang]));

  const stats = useMemo(() => {
    const categoryCount = categoryOrder.length;
    const problemCount = categoryOrder.reduce((total, id) => total + categories[id].items.length, 0);
    return { categoryCount, problemCount };
  }, []);

  const featured = featuredProblemRefs.map(({ id, index }) => {
    const meta = categories[id][lang];
    const problem = presentProblem(lang, categories[id].items[index][lang]);
    return { id, categoryName: meta.name, problem };
  });

  return (
    <main className="home-page">
      <div className="nav-shell">
        <div className="container">
          <nav>
            <a className="brand" href="#home">
              <div className="brand-mark">SE</div>
              <div className="brand-copy">
                <strong>{text.brandName}</strong>
                <span>{text.brandSub}</span>
              </div>
            </a>

            <div className="nav-links">
              <a href="#insights">{text.navInsights}</a>
              <a href="#top-10-problems">{text.navTop10}</a>
              <a href="#all-problems">{text.navAllProblems}</a>
              <a href="#method">{text.navMethod}</a>
              <a href="#mission">{text.navMission}</a>
            </div>

            <div className="nav-actions">
              <div className="lang-toggle" aria-label="Language toggle">
                <button className={lang === 'sv' ? 'active' : ''} onClick={() => setLang('sv')}>
                  SV
                </button>
                <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
                  EN
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <section className="hero-shell" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              {text.heroEyebrow}
            </div>
            <h1>{text.heroTitle}</h1>
            <p>{text.heroBody}</p>
            <div className="hero-actions">
              <a className="btn primary" href="#top-10-problems">
                {text.heroPrimary}
              </a>
              <a className="btn ghost" href="#all-problems">
                {text.heroSecondary}
              </a>
            </div>
          </div>

          <div className="hero-side">
            <div className="hero-proof-card">
              <span className="label">{text.proofLabel}</span>
              <div className="hero-proof-grid">
                <div>
                  <strong>{stats.categoryCount}</strong>
                  <span>{text.proofItems[0][1]}</span>
                </div>
                <div>
                  <strong>{stats.problemCount}</strong>
                  <span>{text.proofItems[1][1]}</span>
                </div>
                <div>
                  <strong>{text.proofItems[2][0]}</strong>
                  <span>{text.proofItems[2][1]}</span>
                </div>
              </div>
            </div>

            <div className="hero-note-card">
              <span className="mini-kicker">Sweden-first</span>
              <p>
                {lang === 'sv'
                  ? 'Mer kuraterad founder intelligence. Mindre ton av allmän frustration.'
                  : 'More curated founder intelligence. Less generic complaint energy.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="insights-section" id="insights">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              {text.insightsLabel}
            </div>
            <h2>{text.insightsTitle}</h2>
            <p>{text.insightsBody}</p>
          </div>

          <div className="insight-grid">
            {featured.map(({ id, categoryName, problem }) => (
              <article className="insight-card" key={`${id}-${problem.title}`}>
                <div className="insight-topline">
                  <span>{categoryName}</span>
                  <strong>{problem.scores[0]}</strong>
                </div>
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
                <div className="signal-row">
                  {problem.sourceFamilies.map((source) => (
                    <span className="signal-pill" key={source}>
                      {source}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="problem-browser" id="top-10-problems">
        <div className="container browser-wrap">
          <div className="section-head browser-head">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              {text.browserEyebrow}
            </div>
            <h2>{text.browserTitle}</h2>
            <p>{text.browserBody}</p>
          </div>

          <div className="browser-grid" id="all-problems">
            <aside className="filter-panel">
              <div className="filter-head">
                <span className="filter-kicker">⌁ {text.filterLabel}</span>
                <strong>{text.categoryLabel}</strong>
              </div>

              <div className="filter-current">
                <span>{text.currentView}</span>
                <p>{categoryMeta.name}</p>
              </div>

              <div className="filter-list" role="tablist" aria-label={text.categoryLabel}>
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
                      <span className="check-box" aria-hidden="true">
                        {active ? '✓' : ''}
                      </span>
                      <span>{categories[id][lang].name}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <section className="problem-panel">
              <div className="browser-title-inline">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-dot" />
                    {text.allProblemsLabel}
                  </div>
                  <h3>{categoryMeta.name}</h3>
                  <p>{categoryMeta.subtitle}</p>
                </div>
              </div>

              <div className="problem-table">
                <div className="problem-table-head">
                  <span>{text.problems}</span>
                  <span>{text.score}</span>
                  <span>{text.industry}</span>
                  <span />
                </div>

                <div className="problem-table-body">
                  {categoryItems.map((item, idx) => {
                    const isOpen = expanded === idx;
                    return (
                      <article className={`problem-row ${isOpen ? 'open' : ''}`} key={`${current}-${idx}`}>
                        <div className="problem-row-main">
                          <div className="problem-question-block">
                            <div className="row-rank">
                              {text.rank} #{idx + 1}
                            </div>
                            <h4>{item.title}</h4>
                          </div>
                          <div className="problem-score">{item.scores[0]}</div>
                          <div className="problem-industry">{categoryMeta.name}</div>
                          <button
                            className="expand-btn"
                            type="button"
                            aria-expanded={isOpen}
                            aria-label={isOpen ? text.close : text.open}
                            onClick={() => setExpanded(isOpen ? -1 : idx)}
                          >
                            <span>{isOpen ? '–' : '+'}</span>
                          </button>
                        </div>

                        {isOpen && (
                          <div className="problem-expand">
                            <div className="expand-copy">
                              <span className="expand-label">{text.explanation}</span>
                              <p>{item.description}</p>
                            </div>
                            <div className="expand-meta">
                              <div className="mini-metric">
                                <span>{text.problemScore}</span>
                                <strong>{item.scores[0]}</strong>
                              </div>
                              <div className="mini-metric">
                                <span>{text.market}</span>
                                <strong>{item.scores[1]}</strong>
                              </div>
                              <div className="mini-metric">
                                <span>{text.trust}</span>
                                <strong>{item.scores[2]}</strong>
                              </div>
                            </div>
                            <div className="tag-strip">
                              <span className="expand-label">{text.signalFamilies}</span>
                              <div className="tag-row">
                                {item.sourceFamilies.map((tag) => (
                                  <span className="tag" key={tag}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="expand-note">
                              <span className="expand-label">{text.exactSources}</span>
                              <p>{item.exactSources.join(' · ')}</p>
                            </div>
                            <div className="expand-note">
                              <span className="expand-label">{text.whyThisMatters}</span>
                              <p>{text.whyThisMattersBody}</p>
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

      <section className="method-section" id="method">
        <div className="container method-grid">
          <div className="method-copy">
            <span className="label">{text.methodLabel}</span>
            <h3>{text.methodTitle}</h3>
            <p>{text.methodBody}</p>
          </div>
          <div className="method-cards">
            {text.methodCards.map(([title, body]) => (
              <article className="method-card" key={title}>
                <strong>{title}</strong>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mission-band" id="mission">
        <div className="container mission-grid">
          <div className="mission-card">
            <span className="label">{text.missionLabel}</span>
            <h3>{text.missionTitle}</h3>
            <p>{text.missionBody}</p>
          </div>

          <div className="cta-card">
            <span className="label">{text.ctaLabel}</span>
            <h3>{text.ctaTitle}</h3>
            <p>{text.ctaBody}</p>
            <div className="hero-actions compact">
              <a className="btn primary" href="#all-problems">
                {text.heroSecondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-row">
          <div>{text.footerLeft}</div>
          <div>{text.footerRight}</div>
        </div>
      </footer>
    </main>
  );
}
