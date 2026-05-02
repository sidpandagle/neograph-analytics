import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllConsultingServices, getConsultingServiceBySlug } from '@/lib/api/consulting';
import { Section, Container, Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';

interface ConsultingServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const services = getAllConsultingServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ConsultingServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getConsultingServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Consulting Services`,
    description: service.description,
  };
}

export default async function ConsultingServicePage({ params }: ConsultingServicePageProps) {
  const { slug } = await params;
  const service = getConsultingServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section */}
      <Section className="bg-[var(--muted)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Link
              href="/consulting"
              className="inline-flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-6 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Services
            </Link>
            <Badge variant="default" className="mb-4">{service.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-[var(--muted-foreground)]">
              {service.description}
            </p>
          </div>
        </Container>
      </Section>

      {/* Overview Section */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  {service.overview}
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Key Highlights Section */}
      <Section className="bg-[var(--muted)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Key Highlights</h2>
            <div className="grid gap-6">
              {service.keyHighlights.map((highlight, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                      </div>
                      <p className="text-[var(--muted-foreground)] leading-relaxed flex-1">
                        {highlight}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Include Section */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">What&apos;s Included</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="grid md:grid-cols-2 gap-4">
                  {service.servicesInclude.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[var(--muted-foreground)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-[var(--muted-foreground)] mb-8">
              Partner with our experts to leverage {service.title.toLowerCase()} services
              and drive strategic growth for your organization.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg">Request Consultation</Button>
              <Link href="/consulting">
                <Button size="lg" variant="outline">View All Services</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
