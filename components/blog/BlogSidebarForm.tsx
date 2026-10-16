"use client";

import { useState, useRef } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Captcha, type CaptchaRef } from "@/components/ui";
import { CountrySelect } from "@/components/ui/country-select";
import { submitContactForm, isFormError } from "@/lib/api";
import { getDefaultCountry, type Country } from "@/lib/data/countries";

export default function BlogSidebarForm() {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      phone: formData.phone ? `${formData.dialCode}${formData.phone}` : undefined,
      country: formData.country,
      countryCode: formData.countryCode,
      dialCode: formData.dialCode,
      subject: formData.subject,
      message: formData.message,
    };

    const response = await submitContactForm(apiData);
    setIsSubmitting(false);

    if (isFormError(response)) {
      setError(response.message);
      return;
    }

    setSubmitted(true);

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
    <Card>
      <CardHeader>
        <CardTitle>Get Expert Insights</CardTitle>
        <p className="text-sm text-[var(--muted-foreground)]">
          Fill out the form and our team will get back to you within 24 hours.
        </p>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="sb-fullName" className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="sb-fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-[var(--input)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="sb-email" className="block text-sm font-medium mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="sb-email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-[var(--input)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label htmlFor="sb-country" className="block text-sm font-medium mb-1">
                Country *
              </label>
              <CountrySelect
                value={formData.countryCode}
                onChange={handleCountryChange}
                required
              />
            </div>

            <div>
              <label htmlFor="sb-phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="sb-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-[var(--input)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label htmlFor="sb-company" className="block text-sm font-medium mb-1">
                Company Name *
              </label>
              <input
                type="text"
                id="sb-company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-[var(--input)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="Your Company"
              />
            </div>

            <div>
              <label htmlFor="sb-subject" className="block text-sm font-medium mb-1">
                Subject *
              </label>
              <select
                id="sb-subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-[var(--input)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
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
              <label htmlFor="sb-message" className="block text-sm font-medium mb-1">
                Message *
              </label>
              <textarea
                id="sb-message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-[var(--input)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none bg-[var(--background)]"
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
              size="md"
              fullWidth
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
