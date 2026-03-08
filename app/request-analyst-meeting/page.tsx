"use client";

import { useState } from "react";
import {
  Section,
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
} from "@/components/ui";
import { CONTACT_INFO } from "@/lib/contact";
import { QuickContactSection, TrustedPartnersSidebar } from "@/components/contact";
import { DateTimePicker } from "@/components/contact/DateTimePicker";
import type { DateTimeSelection } from "@/components/contact/DateTimePicker";
import { submitScheduleDemoForm } from "@/lib/api/forms";

export default function RequestAnalystMeetingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    jobTitle: "",
    companySize: "",
    interests: "",
    message: "",
  });
  const [dateTimeSelection, setDateTimeSelection] = useState<DateTimeSelection | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await submitScheduleDemoForm({
      fullName: formData.name,
      email: formData.email,
      company: formData.company,
      jobTitle: formData.jobTitle || undefined,
      phone: formData.phone || undefined,
      companySize: formData.companySize || undefined,
      interests: formData.interests || undefined,
      preferredDateTimeUTC: dateTimeSelection?.dateTimeUTC || undefined,
      userTimezone: dateTimeSelection?.userTimezone || undefined,
      preferredTimeLocal: dateTimeSelection?.timeLocalLabel || undefined,
      additionalInfo: formData.message || undefined,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message || "Failed to submit. Please try again.");
    }
  };

  return (
    <>
      <Section padding="lg" background="muted">
        <Container size="lg">
          <div className="text-center space-y-4">
            <Badge variant="primary" size="md">
              Schedule a Demo
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">See Our Platform in Action</h1>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Schedule a personalized demo to discover how our healthcare market intelligence can
              transform your strategic decision-making.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="lg">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column – Form (2/3 width) */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Your Demo</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will contact you to schedule a convenient
                    time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="py-8 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Demo Request Received!</h3>
                      <p className="text-[var(--muted-foreground)] mb-4">
                        Thank you for your interest. Our team will reach out within 24 hours to
                        schedule your personalized demo.
                      </p>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        We will contact you at {formData.email}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium mb-2">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                            placeholder="Your Company"
                          />
                        </div>

                        <div>
                          <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
                            Job Title *
                          </label>
                          <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            required
                            value={formData.jobTitle}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                            placeholder="VP of Strategy"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>

                        <div>
                          <label htmlFor="companySize" className="block text-sm font-medium mb-2">
                            Company Size *
                          </label>
                          <select
                            id="companySize"
                            name="companySize"
                            required
                            value={formData.companySize}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                          >
                            <option value="">Select size</option>
                            <option value="1-50">1-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-500">201-500 employees</option>
                            <option value="501-1000">501-1,000 employees</option>
                            <option value="1000+">1,000+ employees</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="interests" className="block text-sm font-medium mb-2">
                          Areas of Interest *
                        </label>
                        <select
                          id="interests"
                          name="interests"
                          required
                          value={formData.interests}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                        >
                          <option value="">Select primary interest</option>
                          <option value="telemedicine">Telemedicine &amp; Digital Health</option>
                          <option value="pharmaceuticals">Pharmaceuticals</option>
                          <option value="medical-devices">Medical Devices</option>
                          <option value="biotechnology">Biotechnology</option>
                          <option value="ai-healthcare">AI in Healthcare</option>
                          <option value="healthcare-it">Healthcare IT</option>
                          <option value="diagnostics">Diagnostics</option>
                          <option value="multiple">Multiple Categories</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Date & Time Picker */}
                      <div>
                        <label className="block text-sm font-medium mb-3">
                          Preferred Date &amp; Time
                          <span className="ml-1 text-xs font-normal text-[var(--muted-foreground)]">
                            (optional)
                          </span>
                        </label>
                        <DateTimePicker onChange={setDateTimeSelection} />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Additional Information
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none bg-[var(--background)]"
                          placeholder="Tell us about your specific research needs or questions you'd like addressed during the demo..."
                        />
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-sm text-blue-900 mb-2">
                          What to Expect:
                        </h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Live walkthrough of our research platform and reports</li>
                          <li>• Discussion of your specific research needs</li>
                          <li>• Overview of subscription options and pricing</li>
                          <li>• Q&amp;A session with our product experts</li>
                        </ul>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        isLoading={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Request Demo"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <p className="text-sm text-[var(--muted-foreground)]">
                  Need immediate assistance?{" "}
                  <a href="/contact" className="text-[var(--primary)] hover:underline font-medium">
                    Contact us directly
                  </a>{" "}
                  or call{" "}
                  <a
                    href={`tel:${CONTACT_INFO.offices.usa.phone}`}
                    className="text-[var(--primary)] hover:underline font-medium"
                  >
                    {CONTACT_INFO.offices.usa.phoneFormatted}
                  </a>{" "}
                  (USA) /{" "}
                  <a
                    href={`tel:${CONTACT_INFO.offices.india.phone}`}
                    className="text-[var(--primary)] hover:underline font-medium"
                  >
                    {CONTACT_INFO.offices.india.phoneFormatted}
                  </a>{" "}
                  (India) - 24×7 Support
                </p>
              </div>
            </div>

            {/* Right Column – Quick Contact & Trusted Partners (1/3 width) */}
            <div className="space-y-6">
              <QuickContactSection />
              <TrustedPartnersSidebar />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Personalized Demo</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  30-45 minute session tailored to your specific needs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Learn from our research analysts and product experts
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">No Commitment</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Explore our platform with no obligation to purchase
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
