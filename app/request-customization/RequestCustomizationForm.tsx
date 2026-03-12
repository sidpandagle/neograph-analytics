"use client";

import { useState, useRef } from "react";
import { Section, Container, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Captcha, type CaptchaRef } from "@/components/ui";
import { CountrySelect } from "@/components/ui/country-select";
import { CONTACT_INFO } from "@/lib/contact";
import { QuickContactSection, TrustedPartnersSidebar } from "@/components/contact";
import { submitRequestCustomizationForm, isFormError } from "@/lib/api";
import { getDefaultCountry, type Country } from "@/lib/data/countries";

interface RequestCustomizationFormProps {
  reportTitle?: string;
  reportSlug?: string;
}

export default function RequestCustomizationForm({ reportTitle = "", reportSlug = "" }: RequestCustomizationFormProps) {
  const defaultCountry = getDefaultCountry();
  const captchaRef = useRef<CaptchaRef>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    country: defaultCountry.name,
    countryCode: defaultCountry.code,
    dialCode: defaultCountry.dialCode,
    jobTitle: "",
    reportTitle: reportTitle,
    reportSlug: reportSlug,
    additionalInfo: "",
  });
  const [, setCaptchaValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountryChange = (country: Country) => {
    setFormData({
      ...formData,
      country: country.name,
      countryCode: country.code,
      dialCode: country.dialCode,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!captchaRef.current?.validate()) {
      setError("Please enter the captcha correctly.");
      return;
    }

    setIsSubmitting(true);

    const apiData = {
      fullName: formData.fullName,
      email: formData.email,
      company: formData.company,
      jobTitle: formData.jobTitle,
      phone: formData.phone ? `${formData.dialCode}${formData.phone}` : undefined,
      country: formData.country,
      countryCode: formData.countryCode,
      dialCode: formData.dialCode,
      reportTitle: formData.reportTitle,
      reportSlug: formData.reportSlug || undefined,
      additionalInfo: formData.additionalInfo || undefined,
    };

    const response = await submitRequestCustomizationForm(apiData);

    setIsSubmitting(false);

    if (isFormError(response)) {
      setError(response.message);
      return;
    }

    setSubmitted(true);
  };

  return (
    <>
      <Section padding="lg" background="muted" className="pb-8">
        <Container size="lg">
          <div className="text-center space-y-4">
            <Badge variant="primary" size="md">
              Request Customisation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">Tailor the Report to Your Needs</h1>
            {reportTitle && (
              <p className="text-xl font-medium text-[var(--foreground)] max-w-3xl mx-auto">
                {reportTitle}
              </p>
            )}
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Tell us what you need — additional regions, segments, company profiles, or data points. We will build a version of this report specifically for your business.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-8">
        <Container size="lg">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form (2/3 width) */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Request Report Customisation</CardTitle>
                  <CardDescription>
                    Describe your customisation requirements and our analysts will get back to you with a tailored solution.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="py-8 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Customisation Request Submitted!</h3>
                      <p className="text-[var(--muted-foreground)] mb-4">
                        Our analysts have received your request and will reach out within 24 hours with a tailored proposal.
                      </p>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        Check your spam folder if you do not see our response in your inbox.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-red-800">{error}</p>
                          </div>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            required
                            value={formData.fullName}
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
                          <label htmlFor="country" className="block text-sm font-medium mb-2">
                            Country *
                          </label>
                          <CountrySelect
                            value={formData.countryCode}
                            onChange={handleCountryChange}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                            placeholder="123-456-7890"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="reportTitle" className="block text-sm font-medium mb-2">
                          Report Title *
                        </label>
                        <input
                          type="text"
                          id="reportTitle"
                          name="reportTitle"
                          required
                          value={formData.reportTitle}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                          placeholder="E.g., Telemedicine Market Report 2025-2032"
                        />
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">
                          Specify which report you would like customised
                        </p>
                      </div>

                      <div>
                        <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2">
                          Customisation Requirements *
                        </label>
                        <textarea
                          id="additionalInfo"
                          name="additionalInfo"
                          rows={5}
                          required
                          value={formData.additionalInfo}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none bg-[var(--background)]"
                          placeholder="Describe what you need — e.g., additional geographies (Latin America, Southeast Asia), specific market segments, competitor deep-dives, proprietary data integration, or any other tailored data points..."
                        />
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">
                          The more detail you provide, the more accurate our proposal will be
                        </p>
                      </div>

                      <Captcha
                        ref={captchaRef}
                        onValidationChange={setCaptchaValid}
                      />

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-green-800">
                          <strong>Note:</strong> All reports include up to 20% free customisation. Additional customisation may be quoted separately. Our analysts will review your requirements and respond within 24 hours.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        isLoading={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Customisation Request"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <p className="text-sm text-[var(--muted-foreground)]">
                  Questions about customisation options?{" "}
                  <a href="/contact" className="text-[var(--primary)] hover:underline font-medium">
                    Contact us
                  </a>
                  {" "}or call{" "}
                  <a href={`tel:${CONTACT_INFO.offices.usa.phone}`} className="text-[var(--primary)] hover:underline font-medium">
                    {CONTACT_INFO.offices.usa.phoneFormatted}
                  </a>
                  {" "}(USA) /{" "}
                  <a href={`tel:${CONTACT_INFO.offices.india.phone}`} className="text-[var(--primary)] hover:underline font-medium">
                    {CONTACT_INFO.offices.india.phoneFormatted}
                  </a>
                  {" "}(India) - 24×7 Support
                </p>
              </div>
            </div>

            {/* Right Column - Quick Contact & Trusted Partners (1/3 width) */}
            <div className="space-y-6">
              <QuickContactSection />
              <TrustedPartnersSidebar />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Tailored to You</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Add regions, segments, competitors, or custom data points
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Fast Turnaround</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Receive your customisation proposal within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Expert Analysts</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Dedicated analysts to handle your specific research needs
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
