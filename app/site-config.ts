export const SITE_URL = 'https://mpendyala3.github.io/solve-real-world-problems-sweden';
export const SITE_NAME = 'Solve real-world problems Sweden';
export const SITE_TITLE = 'Solve real-world problems Sweden';
export const SITE_DESCRIPTION =
  'Sweden-first founder intelligence: bilingual, curated real-world problems across housing, health, welfare, mobility, and everyday life.';
export const SITE_TITLE_TEMPLATE = '%s | Solve real-world problems Sweden';

export const PAGE_TITLES = {
  home: 'Real-world problems Sweden | Founder signal map',
  architecture: 'Founder signal architecture | Sweden problem map',
  prototype: 'Prototype review | Sweden founder signal map',
  privacy: 'Privacy policy | Sweden founder signal map',
  terms: 'Site terms | Sweden founder signal map',
  notFound: 'Page not found | Sweden founder signal map',
} as const;

export const PAGE_DESCRIPTIONS = {
  home: 'Explore Sweden-first problem intelligence for founders: 20 categories, 200 curated signals, and bilingual insight into recurring needs worth building for.',
  architecture:
    'See how founder signals are collected, reviewed, and translated into Sweden-first opportunity mapping with traceable public sources and editorial checks.',
  prototype:
    'Review the live prototype of the Sweden-first founder signal map with curated categories, ranked problems, bilingual copy, and searchable opportunity signals.',
  privacy:
    'Read how this Sweden-first static website handles hosting, contact requests, limited personal data, and privacy choices for visitors and collaborators.',
  terms:
    'Review the website terms, content boundaries, acceptable use, and practical disclaimers for the Sweden-first founder signal map and related pages.',
  notFound:
    'The page you requested could not be found. Return to the Sweden founder signal map, architecture overview, or prototype pages to continue browsing.',
} as const;

export function absoluteUrl(path = '/') {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}
