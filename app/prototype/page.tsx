import type { Metadata } from 'next';
import { HomePage } from '../ClientHome';
import { absoluteUrl, PAGE_DESCRIPTIONS, PAGE_TITLES } from '../site-config';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLES.prototype },
  description: PAGE_DESCRIPTIONS.prototype,
  alternates: {
    canonical: absoluteUrl('/prototype/'),
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: PAGE_TITLES.prototype,
    description: PAGE_DESCRIPTIONS.prototype,
    url: absoluteUrl('/prototype/'),
  },
  twitter: {
    title: PAGE_TITLES.prototype,
    description: PAGE_DESCRIPTIONS.prototype,
  },
};

export default function PrototypePage() {
  return <HomePage routeLabel="Prototype" />;
}
