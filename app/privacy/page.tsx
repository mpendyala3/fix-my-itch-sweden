import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl, PAGE_DESCRIPTIONS, PAGE_TITLES } from '../site-config';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLES.privacy },
  description: PAGE_DESCRIPTIONS.privacy,
  alternates: {
    canonical: absoluteUrl('/privacy/'),
  },
  openGraph: {
    title: PAGE_TITLES.privacy,
    description: PAGE_DESCRIPTIONS.privacy,
    url: absoluteUrl('/privacy/'),
  },
  twitter: {
    title: PAGE_TITLES.privacy,
    description: PAGE_DESCRIPTIONS.privacy,
  },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page" id="main-content">
      <div className="container legal-wrap">
        <nav aria-label="Breadcrumb" className="breadcrumb-row">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Privacy</span>
        </nav>

        <header className="legal-header">
          <h1>Privacy policy</h1>
          <p>
            This website is a static GitHub Pages deployment that showcases curated founder research. We keep personal data handling minimal and do not run non-essential cookies on the public site by default.
          </p>
        </header>

        <section className="legal-section">
          <h2>What data is processed</h2>
          <p>
            Standard web hosting logs may be processed by GitHub Pages and related infrastructure providers. If you contact the site owner directly, the information you send is used only to respond to your request.
          </p>
        </section>

        <section className="legal-section">
          <h2>Cookies and tracking</h2>
          <p>
            The site does not currently set non-essential analytics or advertising cookies. If privacy-impacting analytics are added later, consent controls should be introduced before those scripts run.
          </p>
        </section>

        <section className="legal-section">
          <h2>Your choices</h2>
          <p>
            Avoid sharing sensitive personal information through contact channels. If you need data removed from public content or want to raise a privacy concern, contact the site owner and include the relevant URL.
          </p>
        </section>
      </div>
    </main>
  );
}
