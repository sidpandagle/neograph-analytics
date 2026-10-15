import Link from 'next/link';
import { Section, Container, Button } from '@/components/ui';

export default function ConsultingServiceNotFound() {
  return (
    <div>
      <Section className="min-h-[60vh] flex items-center justify-center">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
            <p className="text-lg text-[var(--muted-foreground)] mb-8">
              The consulting service you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/services">
                <Button size="lg">View All Services</Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">Go Home</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
