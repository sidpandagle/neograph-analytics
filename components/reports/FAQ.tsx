import { Card, CardContent } from "@/components/ui";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-bold text-[var(--blue-deep)] mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-[var(--primary)] text-white">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[var(--foreground)] text-lg mb-3">
                    {faq.question}
                  </p>
                  <p className="text-[var(--muted-foreground)]">{faq.answer}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
