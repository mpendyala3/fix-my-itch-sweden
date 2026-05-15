'use client';

import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="error-page" id="main-content">
          <div className="container error-wrap">
            <p className="error-code">500</p>
            <h1>Something went wrong</h1>
            <p>
              An unexpected error interrupted the page. You can try again, return home, or continue to the architecture route.
            </p>
            <p className="error-detail">{error.digest ? `Reference: ${error.digest}` : 'Client-side application error'}</p>
            <div className="hero-actions" aria-label="Recovery actions">
              <button className="btn primary" type="button" onClick={() => reset()}>
                Try again
              </button>
              <Link className="btn ghost" href="/">
                Home
              </Link>
              <Link className="btn ghost" href="/architecture/">
                Architecture
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
