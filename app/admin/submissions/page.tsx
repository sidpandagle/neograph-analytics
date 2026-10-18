import type { Metadata } from 'next';
import SubmissionsClient from './SubmissionsClient';

export const metadata: Metadata = {
  title: 'Form submissions',
  // Belt and braces with robots.ts: this page holds personal data of people
  // who filled a form and must never be indexed or followed.
  robots: { index: false, follow: false, nocache: true },
};

// The page shell is static; everything inside it is fetched per request with
// the viewer's own token.
export default function AdminSubmissionsPage() {
  return <SubmissionsClient />;
}
