'use client';

import { Card, CardContent, Badge } from '@/components/ui';
import type { ApiAuthor } from '@/lib/api';

interface AuthorProfileProps {
  author: ApiAuthor;
  totalReports: number;
}

export default function AuthorProfile({ author, totalReports }: AuthorProfileProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <section className="mb-12">
      <div className="bg-[#F8F9FA] py-12 px-4 rounded-2xl border border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {author.imageUrl ? (
                <img
                  src={author.imageUrl}
                  alt={author.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-[var(--primary)] shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-3xl md:text-4xl font-semibold shadow-lg">
                  {getInitials(author.name)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                  {author.name}
                </h1>
                {author.linkedinUrl && (
                  <a
                    href={author.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0A66C2] hover:text-[#004182] transition-colors w-fit"
                    aria-label={`${author.name}'s LinkedIn profile`}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
              </div>

              {author.role && (
                <Badge variant="primary" size="md" className="mb-4">
                  {author.role}
                </Badge>
              )}

              {author.bio && (
                <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-6">
                  {author.bio}
                </p>
              )}

              {/* Stats Card */}
              <Card className="border-none shadow-sm bg-white/80">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-8 h-8 text-[var(--primary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        Total Reports Authored
                      </p>
                      <p className="text-2xl font-bold text-[var(--foreground)]">
                        {totalReports}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
