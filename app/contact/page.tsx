"use client";

import { useState, useRef } from "react";
import { Section, Container, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Captcha, type CaptchaRef } from "@/components/ui";
import { CountrySelect } from "@/components/ui/country-select";
import { CONTACT_INFO } from "@/lib/contact";
import { QuickContactSection, TrustedPartnersSidebar } from "@/components/contact";
import { submitContactForm, isFormError } from "@/lib/api";
import { getDefaultCountry, type Country } from "@/lib/data/countries";

export default function ContactPage() {
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
    subject: "",
    message: "",
  });
  const [, setCaptchaValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      phone: formData.phone ? `${formData.dialCode}${formData.phone}` : undefined,
      country: formData.country,
      countryCode: formData.countryCode,
      dialCode: formData.dialCode,
      subject: formData.subject,
      message: formData.message,
    };

    // Submit to API
    const response = await submitContactForm(apiData);

    setIsSubmitting(false);

    if (isFormError(response)) {
      // Handle error
      setError(response.message);
      return;
    }

    // Success
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      const resetCountry = getDefaultCountry();
      setFormData({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        country: resetCountry.name,
        countryCode: resetCountry.code,
        dialCode: resetCountry.dialCode,
        subject: "",
        message: "",
      });
      setCaptchaValid(false);
      captchaRef.current?.reset();
      setSubmitted(false);
      setError(null);
    }, 3000);
  };

  return (
    <>
      <section className="relative overflow-hidden rounded-panel bg-[var(--cmi-ink)] px-6 py-7 md:px-11 md:py-11">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'28\' viewBox=\'0 0 28 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E")',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--cmi-on-blue-dim)] px-4 py-1.5 rounded-pill bg-white/10">
              Get in Touch
            </span>
            <h1 className="text-[2.75rem] md:text-5xl text-white leading-[1.1] tracking-[-0.02em]">
              Contact <span className="text-[var(--cmi-sky)]">NeoGraph Analytics</span>
            </h1>
            <p className="text-lg text-[var(--cmi-on-blue)] max-w-2xl mx-auto leading-[1.8]">
              Have questions about our research? We are here to help. Reach out for inquiries, demos, or custom research needs.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <Container size="lg">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form (2/3 width) */}
            <div className="lg:col-span-2">
              <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we will get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="py-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                    <p className="text-[var(--muted-foreground)]">
                      Your message has been sent successfully. We will be in touch soon.
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
                          Email Address *
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
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

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
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="research">Research Report Question</option>
                        <option value="custom">Custom Research Request</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="support">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none bg-[var(--background)]"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <Captcha
                      ref={captchaRef}
                      onValidationChange={setCaptchaValid}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Contact & Trusted Partners (1/3 width) */}
          <div className="space-y-6">
            <QuickContactSection />
            <TrustedPartnersSidebar />
          </div>
        </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mt-12">
            {/* Email Card */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-ocean-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  {CONTACT_INFO.email}
                </a>
              </CardContent>
            </Card>

            {/* WhatsApp Card */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Chat on WhatsApp</h3>
                <a
                  href={CONTACT_INFO.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  {CONTACT_INFO.whatsapp.formatted}
                </a>
              </CardContent>
            </Card>

            {/* USA Office Card */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Badge variant="primary" className="mb-4">Americas HQ</Badge>
                <div className="w-12 h-12 bg-ocean-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">{CONTACT_INFO.offices.usa.name}</h3>
                <a
                  href={`tel:${CONTACT_INFO.offices.usa.phone}`}
                  className="text-[var(--primary)] font-medium hover:underline block mb-2"
                >
                  {CONTACT_INFO.offices.usa.phoneFormatted}
                </a>
                <p className="text-xs text-[var(--muted-foreground)] mb-1">{CONTACT_INFO.offices.usa.company}</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {CONTACT_INFO.offices.usa.addressLine1}<br />
                  {CONTACT_INFO.offices.usa.city}, {CONTACT_INFO.offices.usa.state} {CONTACT_INFO.offices.usa.postalCode}<br />
                  {CONTACT_INFO.offices.usa.country}
                </p>
              </CardContent>
            </Card>

            {/* India Office Card */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Badge variant="outline" className="mb-4">APAC Operations</Badge>
                <div className="w-12 h-12 bg-ocean-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">{CONTACT_INFO.offices.india.name}</h3>
                <a
                  href={`tel:${CONTACT_INFO.offices.india.phone}`}
                  className="text-[var(--primary)] font-medium hover:underline block mb-2"
                >
                  {CONTACT_INFO.offices.india.phoneFormatted}
                </a>
                <p className="text-xs text-[var(--muted-foreground)] mb-1">{CONTACT_INFO.offices.india.company}</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {CONTACT_INFO.offices.india.addressLine1}<br />
                  {CONTACT_INFO.offices.india.addressLine2}, {CONTACT_INFO.offices.india.city}<br />
                  {CONTACT_INFO.offices.india.state} – {CONTACT_INFO.offices.india.postalCode}<br />
                  {CONTACT_INFO.offices.india.country}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 24x7 Support Banner */}
          <Card className="bg-ocean-50 border-ocean-100 mt-12">
            <CardContent className="py-4">
              <div className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6 text-ocean-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-medium text-ocean-900">24×7 Sales &amp; Support Available</p>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  );
}
