// Form submission types based on the API design

export type FormCategory = 'contact' | 'request-sample' | 'purchase-inquiry';

export type FormStatus = 'pending' | 'processed' | 'archived';

// Contact Form Data
export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  phone?: string;
  country: string; // Country name (e.g., "United States", "India")
  countryCode: string,
  dialCode: string,
  subject: string;
  message: string;
}

// Request Sample Form Data
export interface RequestSampleFormData {
  fullName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone?: string;
  country: string; // Country name (e.g., "United States", "India")
  countryCode: string,
  dialCode: string,
  reportTitle: string;
  additionalInfo?: string;
}

// Purchase Inquiry Form Data (checkout page)
export interface PurchaseInquiryFormData {
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  reportTitle: string;
  reportSlug: string;
  quotedPrice?: string;
}

// Metadata for form submissions
export interface FormMetadata {
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  pageURL?: string;
}

// Base form submission request
export interface FormSubmissionRequest<T = ContactFormData | RequestSampleFormData | PurchaseInquiryFormData> {
  category: FormCategory;
  data: T;
  metadata?: FormMetadata;
}

// Form submission response
export interface FormSubmissionResponse {
  success: boolean;
  submissionId: string;
  category: FormCategory;
  message: string;
  createdAt: string;
}

// Error response (for form-specific error handling)
export interface FormErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode?: number;
}
