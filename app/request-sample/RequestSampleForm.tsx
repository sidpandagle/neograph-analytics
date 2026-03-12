"use client";

import { useState, useRef } from "react";
import { Section, Container, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Captcha, type CaptchaRef } from "@/components/ui";
import { CountrySelect } from "@/components/ui/country-select";
import { CONTACT_INFO } from "@/lib/contact";
import { QuickContactSection, TrustedPartnersSidebar } from "@/components/contact";
import { submitRequestSampleForm, isFormError } from "@/lib/api";
import { getDefaultCountry, type Country } from "@/lib/data/countries";

interface RequestSampleFormProps {
  reportTitle?: string;
  reportSlug?: string;
}

export default function RequestSampleForm({ reportTitle = "", reportSlug = "" }: RequestSampleFormProps) {
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

    // Validate CAPTCHA
    if (!captchaRef.current?.validate()) {
      setError("Please enter the captcha correctly.");
      return;
    }

    setIsSubmitting(true);

    // Prepare data for API - combine dialCode with phone and only send country name
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

    // Submit to API
    const response = await submitRequestSampleForm(apiData);

    setIsSubmitting(false);

    if (isFormError(response)) {
      // Handle error
      setError(response.message);
      return;
    }

    // Success
    setSubmitted(true);
  };

  return (
    <>
      <Section padding="lg" background="muted">
        <Container size="lg">
          <div className="text-center space-y-4">
            <Badge variant="primary" size="md">
              Request Sample
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">Get a Free Report Sample</h1>
            {reportTitle && (
              <p className="text-xl font-medium text-[var(--foreground)] max-w-3xl mx-auto">
                {reportTitle}
              </p>
            )}
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Preview the quality and depth of our research before making a purchase decision. Receive a comprehensive sample within 24 hours.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="lg">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form (2/3 width) */}
            <div className="lg:col-span-2">
              <Card>
              <CardHeader>
                <CardTitle>Request Your Free Sample</CardTitle>
                <CardDescription>
                  Fill out the form below and we will send you a comprehensive sample report.
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
                    <h3 className="text-xl font-semibold mb-2">Request Submitted!</h3>
                    <p className="text-[var(--muted-foreground)] mb-4">
                      Your sample request has been received. We will send the report to your email within 24 hours.
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Check your spam folder if you do not see it in your inbox.
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
                        Specify which report you would like to receive a sample of
                      </p>
                    </div>

                    <div>
                      <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2">
                        Additional Information
                      </label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        rows={4}
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none bg-[var(--background)]"
                        placeholder="Any specific sections or questions you'd like addressed in the sample..."
                      />
                    </div>

                    <Captcha
                      ref={captchaRef}
                      onValidationChange={setCaptchaValid}
                    />

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> By submitting this form, you agree to receive the sample report and occasional updates about our research. We respect your privacy and never share your information.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Request Free Sample"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

              <div className="mt-8 text-center">
              <p className="text-sm text-[var(--muted-foreground)]">
                Questions about our sample reports?{" "}
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
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Comprehensive Sample</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Get 10-15 pages showcasing our methodology and insights
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Receive your sample report within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">No Obligation</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Completely free with no purchase required
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
