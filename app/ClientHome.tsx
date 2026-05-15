'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { categories, categoryOrder, type CategoryId, type Language } from './site-data';
import { absoluteUrl, SITE_NAME } from './site-config';

type ProblemTuple = readonly [string, string, readonly string[], readonly [number, number, number]];

type ProblemPresentation = {
  title: string;
  description: string;
  exactSources: readonly string[];
  sourceFamilies: string[];
  scores: readonly [number, number, number];
};

type SearchResult = {
  id: string;
  categoryId: CategoryId;
  categoryName: string;
  item: ProblemPresentation;
  rank: number;
  relevance: number;
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
    navArchitecture: 'Arkitektur',
    navPrivacy: 'Integritet',
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
    searchLabel: 'Sök i alla problem',
    searchPlaceholder: 'Sök efter bostad, vård, betalningar, pendling…',
    searchHint: 'Sökningen går över alla kategorier och försöker tolerera små stavfel och ordvarianter.',
    searchResultsTitle: 'Sökresultat',
    searchResultsNone: 'Ingen tydlig träff ännu. Testa bredare ord eller byt språk.',
    searchResultsCount: 'träffar',
    clearSearch: 'Rensa',
    routeLabel: 'Aktiv route',
    featuredLabel: 'Utvald kategori',
    backToTop: 'Till toppen',
    browseLabel: 'Fler sidor',
    privacyLink: 'Integritetspolicy',
    termsLink: 'Villkor',
    prototypeLink: 'Prototype',
    architectureLink: 'Arkitektur',
  },
  en: {
    brandName: 'Solve real-world problems',
    brandSub: 'Sweden-first problem intelligence',
    navInsights: 'Insights',
    navTop10: 'Top 10',
    navAllProblems: 'All problems',
    navMethod: 'Method',
    navMission: 'Mission',
    navArchitecture: 'Architecture',
    navPrivacy: 'Privacy',
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
    searchLabel: 'Search across all problems',
    searchPlaceholder: 'Search housing, care, payments, commuting…',
    searchHint: 'Search spans all categories and tries to tolerate small typos and wording variations.',
    searchResultsTitle: 'Search results',
    searchResultsNone: 'No clear match yet. Try broader keywords or switch language.',
    searchResultsCount: 'results',
    clearSearch: 'Clear',
    routeLabel: 'Current route',
    featuredLabel: 'Featured category',
    backToTop: 'Back to top',
    browseLabel: 'More pages',
    privacyLink: 'Privacy policy',
    termsLink: 'Terms',
    prototypeLink: 'Prototype',
    architectureLink: 'Architecture',
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

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a: string, b: string) {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;
  const matrix = Array.from({ length: b.length + 1 }, (_, idx) => [idx]);
  for (let idx = 0; idx <= a.length; idx += 1) {
    matrix[0][idx] = idx;
  }
  for (let row = 1; row <= b.length; row += 1) {
    for (let col = 1; col <= a.length; col += 1) {
      const cost = a[col - 1] === b[row - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      );
    }
  }
  return matrix[b.length][a.length];
}

function sourceFamily(tag: string, lang: Language) {
  const lower = tag.toLowerCase();

  if (['reddit', 'flashback', 'trustpilot', 'reco', 'linkedin'].some((token) => lower.includes(token))) {
    return lang === 'sv' ? 'Community- och marknadssignaler' : 'Community and market signals';
  }

  if (['arn', 'hallå konsument', 'konsumentverket'].some((token) => lower.includes(token))) {
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

function fuzzyScore(query: string, categoryName: string, item: ProblemPresentation) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return 0;

  const title = normalizeText(item.title);
  const description = normalizeText(item.description);
  const category = normalizeText(categoryName);
  const exactSources = normalizeText(item.exactSources.join(' '));
  const haystack = `${title} ${description} ${category} ${exactSources}`;

  if (haystack.includes(normalizedQuery)) return 120;

  const words = haystack.split(' ').filter(Boolean);
  const queryWords = normalizedQuery.split(' ').filter(Boolean);
  let score = 0;

  for (const term of queryWords) {
    if (title.includes(term)) score += 30;
    else if (description.includes(term)) score += 18;
    else if (category.includes(term)) score += 14;
    else if (words.some((word) => word.startsWith(term) || term.startsWith(word))) score += 10;
    else {
      const closeWord = words.some((word) => word.length > 3 && levenshtein(word, term) <= 2);
      if (closeWord) score += 7;
    }
  }

  return score;
}

function pageSchema(lang: Language) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: lang === 'sv' ? 'Lös verkliga problem' : 'Solve real-world problems',
    url: absoluteUrl('/'),
    inLanguage: lang === 'sv' ? 'sv-SE' : 'en',
    about: 'Sweden-first founder opportunity intelligence',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
  };
}

export function HomePage({ routeLabel }: { routeLabel?: string }) {
  const [lang, setLang] = useState<Language>('en');
  const [current, setCurrent] = useState<CategoryId>(categoryOrder[0]);
  const [expanded, setExpanded] = useState(0);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const searchTerm = new URLSearchParams(window.location.search).get('q');
    if (searchTerm) setQuery(searchTerm);
  }, []);

  const text = copy[lang];
  const category = categories[current];
  const categoryMeta = category[lang];
  const categoryItems = category.items.map((item) => presentProblem(lang, item[lang]));

  const featured = featuredProblemRefs.map(({ id, index }) => {
    const meta = categories[id][lang];
    const problem = presentProblem(lang, categories[id].items[index][lang]);
    return { id, categoryName: meta.name, problem };
  });

  const searchResults = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [] as SearchResult[];

    const results: SearchResult[] = [];

    categoryOrder.forEach((id) => {
      const meta = categories[id][lang];
      categories[id].items.forEach((entry, index) => {
        const item = presentProblem(lang, entry[lang]);
        const relevance = fuzzyScore(trimmed, meta.name, item);
        if (relevance > 0) {
          results.push({
            id: `${id}-${index}`,
            categoryId: id,
            categoryName: meta.name,
            item,
            rank: index + 1,
            relevance,
          });
        }
      });
    });

    return results.sort((a, b) => b.relevance - a.relevance || b.item.scores[0] - a.item.scores[0]).slice(0, 12);
  }, [lang, query]);

  const showingSearch = query.trim().length > 0;

  const homePageSchema = useMemo(() => JSON.stringify(pageSchema(lang)), [lang]);

  return (
    <>
      <header className="nav-shell" id="home">
        <div className="container">
          <nav aria-label="Primary">
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
              <Link href="/architecture/">{text.navArchitecture}</Link>
            </div>

            <div className="nav-actions">
              <div className="lang-toggle" aria-label="Language toggle">
                <button className={lang === 'sv' ? 'active' : ''} onClick={() => setLang('sv')} type="button">
                  SV
                </button>
                <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')} type="button">
                  EN
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="home-page" id="main-content">
        <section className="hero-shell">
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

            <aside className="hero-side" aria-label="Summary information">
              <div className="hero-note-card">
                <span className="mini-kicker">Sweden-first</span>
                <p>
                  {lang === 'sv'
                    ? 'Mer kuraterad founder intelligence. Mindre ton av allmän frustration.'
                    : 'More curated founder intelligence. Less generic complaint energy.'}
                </p>
                {routeLabel ? (
                  <p className="route-badge">
                    <strong>{text.routeLabel}:</strong> {routeLabel}
                  </p>
                ) : null}
              </div>
            </aside>
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
                  <button className="inline-link" type="button" onClick={() => setCurrent(id)}>
                    {text.featuredLabel}: {categoryName}
                  </button>
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

            <form className="search-panel" role="search" aria-label={text.searchLabel} noValidate>
              <label className="search-label" htmlFor="site-search">
                {text.searchLabel}
              </label>
              <div className="search-row">
                <input
                  id="site-search"
                  name="q"
                  type="search"
                  autoComplete="off"
                  enterKeyHint="search"
                  placeholder={text.searchPlaceholder}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-describedby="site-search-hint site-search-results"
                />
                {query ? (
                  <button className="btn ghost search-clear" type="button" onClick={() => setQuery('')}>
                    {text.clearSearch}
                  </button>
                ) : null}
              </div>
              <p className="search-hint" id="site-search-hint">
                {text.searchHint}
              </p>
              <p className="search-status" id="site-search-results" aria-live="polite">
                {showingSearch ? `${searchResults.length} ${text.searchResultsCount}` : categoryMeta.name}
              </p>
            </form>

            <div className="browser-grid" id="all-problems">
              <aside className="filter-panel">
                <div className="filter-head">
                  <span className="filter-kicker">⌁ {text.filterLabel}</span>
                  <strong>{text.categoryLabel}</strong>
                </div>

                <div className="filter-current">
                  <span>{text.currentView}</span>
                  <p>{showingSearch ? text.searchResultsTitle : categoryMeta.name}</p>
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
                        type="button"
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

              <section className="problem-panel" aria-label={showingSearch ? text.searchResultsTitle : categoryMeta.name}>
                <div className="browser-title-inline">
                  <div>
                    <div className="eyebrow">
                      <span className="eyebrow-dot" />
                      {showingSearch ? text.searchResultsTitle : text.allProblemsLabel}
                    </div>
                    <h3>{showingSearch ? text.searchResultsTitle : categoryMeta.name}</h3>
                    <p>{showingSearch ? text.searchHint : categoryMeta.subtitle}</p>
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
                    {showingSearch ? (
                      searchResults.length ? (
                        searchResults.map((result, idx) => {
                          const isOpen = expanded === idx;
                          return (
                            <article className={`problem-row ${isOpen ? 'open' : ''}`} key={result.id}>
                              <div className="problem-row-main">
                                <div className="problem-question-block">
                                  <div className="row-rank">
                                    {text.rank} #{result.rank}
                                  </div>
                                  <h4>{result.item.title}</h4>
                                </div>
                                <div className="problem-score">{result.item.scores[0]}</div>
                                <div className="problem-industry">{result.categoryName}</div>
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

                              {isOpen ? (
                                <div className="problem-expand">
                                  <div className="expand-copy">
                                    <span className="expand-label">{text.explanation}</span>
                                    <p>{result.item.description}</p>
                                  </div>
                                  <div className="expand-meta">
                                    <div className="mini-metric">
                                      <span>{text.problemScore}</span>
                                      <strong>{result.item.scores[0]}</strong>
                                    </div>
                                    <div className="mini-metric">
                                      <span>{text.market}</span>
                                      <strong>{result.item.scores[1]}</strong>
                                    </div>
                                    <div className="mini-metric">
                                      <span>{text.trust}</span>
                                      <strong>{result.item.scores[2]}</strong>
                                    </div>
                                  </div>
                                  <div className="tag-strip">
                                    <span className="expand-label">{text.signalFamilies}</span>
                                    <div className="tag-row">
                                      {result.item.sourceFamilies.map((tag) => (
                                        <span className="tag" key={tag}>
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="expand-note">
                                    <span className="expand-label">{text.exactSources}</span>
                                    <p>{result.item.exactSources.join(' · ')}</p>
                                  </div>
                                </div>
                              ) : null}
                            </article>
                          );
                        })
                      ) : (
                        <div className="empty-state">
                          <p>{text.searchResultsNone}</p>
                        </div>
                      )
                    ) : (
                      categoryItems.map((item, idx) => {
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

                            {isOpen ? (
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
                            ) : null}
                          </article>
                        );
                      })
                    )}
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
              <h2>{text.methodTitle}</h2>
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
            <article className="mission-card">
              <span className="label">{text.missionLabel}</span>
              <h2>{text.missionTitle}</h2>
              <p>{text.missionBody}</p>
            </article>

            <aside className="cta-card">
              <span className="label">{text.ctaLabel}</span>
              <h2>{text.ctaTitle}</h2>
              <p>{text.ctaBody}</p>
              <div className="hero-actions compact">
                <a className="btn primary" href="#all-problems">
                  {text.heroSecondary}
                </a>
              </div>
            </aside>
          </div>
        </section>

        <footer>
          <div className="container footer-grid">
            <div>
              <div className="footer-title">{text.footerLeft}</div>
              <p>{text.footerRight}</p>
            </div>
            <nav aria-label={text.browseLabel}>
              <div className="footer-nav-title">{text.browseLabel}</div>
              <div className="footer-links">
                <Link href="/architecture/">{text.architectureLink}</Link>
                <Link href="/prototype/">{text.prototypeLink}</Link>
                <Link href="/privacy/">{text.privacyLink}</Link>
                <Link href="/terms/">{text.termsLink}</Link>
                <a href="#home">{text.backToTop}</a>
              </div>
            </nav>
          </div>
        </footer>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homePageSchema }} />
    </>
  );
}
