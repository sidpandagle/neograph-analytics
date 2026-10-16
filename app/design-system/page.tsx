'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Section,
  Grid,
  Skeleton,
  SkeletonText,
  SkeletonCard,
} from '@/components/ui';

export default function DesignSystemPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  return (
    <div className="min-h-screen">
      <Section padding="lg" background="muted">
        <div className="text-center space-y-4">
          <Badge variant="primary" size="md">
            Phase 2
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Design System Showcase</h1>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            A premium B2B design language with enterprise-grade components
          </p>
        </div>
      </Section>

      <Section padding="lg">
        <div className="space-y-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Buttons</h2>
              <p className="text-[var(--muted-foreground)]">
                Multiple variants with hover states and loading indicators
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-3">
                  Variants
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="danger">Danger Button</Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-3">
                  Sizes
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-3">
                  States
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    isLoading={isLoading}
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => setIsLoading(false), 2000);
                    }}
                  >
                    {isLoading ? 'Loading...' : 'Click to Load'}
                  </Button>
                  <Button disabled>Disabled Button</Button>
                  <Button fullWidth className="max-w-md">
                    Full Width Button
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Cards</h2>
              <p className="text-[var(--muted-foreground)]">
                Flexible card components with hover animations
              </p>
            </div>

            <Grid cols={3} gap="lg">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>
                    This card has hover effects enabled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Hover over this card to see the subtle animation and shadow
                    effect. Perfect for clickable items like blog posts or reports.
                  </p>
                </CardContent>
                <CardFooter>
                  <Badge variant="primary">Featured</Badge>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Static Card</CardTitle>
                  <CardDescription>
                    This card has no hover effects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    This card maintains a consistent appearance. Use this for
                    informational content that doesn&apos;t require interaction.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Shadow Card</CardTitle>
                  <CardDescription>
                    Card with shadow instead of border
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    This card uses a shadow for depth instead of a border,
                    creating a floating appearance.
                  </p>
                </CardContent>
              </Card>
            </Grid>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Badges</h2>
              <p className="text-[var(--muted-foreground)]">
                Color-coded badges for status and categories
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-3">
                  Variants
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-3">
                  Sizes
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge size="sm" variant="primary">
                    Small
                  </Badge>
                  <Badge size="md" variant="primary">
                    Medium
                  </Badge>
                  <Badge size="lg" variant="primary">
                    Large
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-3">
                  Use Cases
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success">Published</Badge>
                  <Badge variant="warning">Draft</Badge>
                  <Badge variant="danger">Archived</Badge>
                  <Badge variant="primary">Featured</Badge>
                  <Badge variant="outline">New</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Layout Components</h2>
              <p className="text-[var(--muted-foreground)]">
                Responsive grid and container utilities
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Responsive Grid</CardTitle>
                <CardDescription>
                  Automatically adapts to screen size
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Grid cols={4} gap="md">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div
                      key={item}
                      className="bg-[var(--muted)] p-4 rounded-lg text-center"
                    >
                      <p className="font-medium">Item {item}</p>
                    </div>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-semibold mb-2">
                  Skeleton Loaders
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  Loading states for better UX
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowSkeleton(!showSkeleton)}
              >
                {showSkeleton ? 'Show Content' : 'Show Skeleton'}
              </Button>
            </div>

            {showSkeleton ? (
              <Grid cols={3} gap="lg">
                <SkeletonCard hasImage hasAvatar />
                <SkeletonCard hasImage />
                <SkeletonCard hasAvatar />
              </Grid>
            ) : (
              <Grid cols={3} gap="lg">
                <Card>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--cmi-primary-fill)] flex items-center justify-center text-[var(--primary-foreground)] font-semibold">
                      JD
                    </div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        2 days ago
                      </p>
                    </div>
                  </div>
                  <CardTitle className="mb-2">Latest Research</CardTitle>
                  <CardDescription>
                    Comprehensive analysis of healthcare market trends in 2024
                  </CardDescription>
                </Card>

                <Card>
                  <div className="w-full h-32 bg-blue-600 rounded-lg mb-4" />
                  <CardTitle className="mb-2">Market Insights</CardTitle>
                  <CardDescription>
                    Key findings from our recent industry survey
                  </CardDescription>
                </Card>

                <Card>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--cmi-primary-fill)] flex items-center justify-center text-[var(--primary-foreground)] font-semibold">
                      AS
                    </div>
                    <div>
                      <p className="font-medium">Alice Smith</p>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        5 days ago
                      </p>
                    </div>
                  </div>
                  <CardTitle className="mb-2">Industry Report</CardTitle>
                  <CardDescription>
                    Deep dive into pharmaceutical innovations
                  </CardDescription>
                </Card>
              </Grid>
            )}

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[var(--muted-foreground)]">
                Individual Skeleton Components
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium">Text Lines</p>
                  <SkeletonText lines={4} lastLineWidth="80%" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium">Rectangular</p>
                  <Skeleton className="w-full h-32" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium">Circular</p>
                  <div className="flex gap-2">
                    <Skeleton variant="circular" width={64} height={64} />
                    <Skeleton variant="circular" width={64} height={64} />
                    <Skeleton variant="circular" width={64} height={64} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Typography</h2>
              <p className="text-[var(--muted-foreground)]">
                High readability typography scale
              </p>
            </div>

            <Card>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Heading 1</h1>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    text-4xl font-bold
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold mb-2">Heading 2</h2>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    text-3xl font-semibold
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Heading 3</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    text-2xl font-semibold
                  </p>
                </div>
                <div>
                  <p className="text-base mb-2">
                    Body text - The quick brown fox jumps over the lazy dog.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    text-base
                  </p>
                </div>
                <div>
                  <p className="text-sm mb-2 text-[var(--muted-foreground)]">
                    Small text - Supporting information and metadata
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    text-sm
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Color Palette</h2>
              <p className="text-[var(--muted-foreground)]">
                Neutral colors with consistent theming
              </p>
            </div>

            <Grid cols={3} gap="lg">
              <Card>
                <div className="w-full h-24 bg-[var(--primary)] rounded-lg mb-3" />
                <p className="font-medium">Primary</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  var(--primary)
                </p>
              </Card>
              <Card>
                <div className="w-full h-24 bg-[var(--secondary)] border border-[var(--border)] rounded-lg mb-3" />
                <p className="font-medium">Secondary</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  var(--secondary)
                </p>
              </Card>
              <Card>
                <div className="w-full h-24 bg-[var(--muted)] rounded-lg mb-3" />
                <p className="font-medium">Muted</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  var(--muted)
                </p>
              </Card>
            </Grid>
          </div>
        </div>
      </Section>
    </div>
  );
}
