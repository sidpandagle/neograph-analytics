'use client';

// import { useState } from 'react';
import Link from 'next/link';
import { Grid, Card, CardContent, CardTitle, CardDescription } from '@/components/ui';

interface TeamMember {
  id: number;
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface MeetTheTeamProps {
  teamMembers: TeamMember[];
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  // const [isExpanded, setIsExpanded] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="border border-[var(--border)] h-full">
      <CardContent className="space-y-4 p-6">
        {/* Header with profile image + name/role */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {member.imageUrl ? (
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[var(--primary)]"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[var(--cmi-primary-fill)] text-[var(--primary-foreground)] flex items-center justify-center text-xl font-semibold">
                {getInitials(member.name)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/authors/${member.id}`}
                className="hover:text-[var(--primary)] transition-colors"
              >
                <CardTitle className="text-lg mb-1">{member.name}</CardTitle>
              </Link>
              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand-linkedin)] hover:text-[var(--brand-linkedin-hover)] transition-colors"
                  aria-label={`${member.name}'s LinkedIn profile`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </div>
            <CardDescription className="text-sm">{member.role}</CardDescription>
          </div>
        </div>

        {/* Bio - short or full depending on state */}
        <div className="text-[var(--muted-foreground)]">
          <p className="text-sm leading-relaxed line-clamp-4">
            {member.bio}
          </p>
        </div>

        {/* View Profile Button */}
        <Link
          href={`/authors/${member.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors pt-2"
        >
          View Author Profile
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>

        {/* Expanded content: expertise + credentials */}
        {/* {isExpanded && (
          <div className="space-y-4 animate-fadeIn pt-2 border-t border-[var(--border)]">
            {member.expertise && member.expertise.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-[var(--foreground)] mb-2">
                  Areas of Expertise
                </h4>
                <ul className="space-y-1">
                  {member.expertise.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]"
                    >
                      <svg
                        className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {member.credentials && member.credentials.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-[var(--foreground)] mb-2">
                  Credentials & Education
                </h4>
                <ul className="space-y-1">
                  {member.credentials.map((cred, idx) => (
                    <li key={idx} className="text-sm text-[var(--muted-foreground)]">
                      • {cred}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )} */}

        {/* Expand/Collapse Button */}
        {/* <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 text-sm font-medium text-[var(--primary)] hover:opacity-80 transition-opacity pt-2"
        >
          {isExpanded ? 'Show Less' : 'Read Full Bio'}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button> */}
      </CardContent>
    </Card>
  );
}

export default function MeetTheTeam({ teamMembers }: MeetTheTeamProps) {
  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section id="meet-the-team" className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-bold text-[var(--blue-deep)] mb-3">
        Meet the Team
      </h2>
      <p className="text-[var(--muted-foreground)] mb-8">
        This report was prepared by our expert analysts with deep industry knowledge and
        research experience.
      </p>

      <Grid cols={2} gap="lg">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </Grid>
    </section>
  );
}
