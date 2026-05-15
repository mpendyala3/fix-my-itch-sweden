import type { Metadata } from 'next';
import { HomePage } from './ClientHome';
import { absoluteUrl, PAGE_DESCRIPTIONS, PAGE_TITLES } from './site-config';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLES.home },
  description: PAGE_DESCRIPTIONS.home,
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    title: PAGE_TITLES.home,
    description: PAGE_DESCRIPTIONS.home,
    url: absoluteUrl('/'),
  },
  twitter: {
    title: PAGE_TITLES.home,
    description: PAGE_DESCRIPTIONS.home,
  },
};

export default function Page() {
  return <HomePage />;
}
