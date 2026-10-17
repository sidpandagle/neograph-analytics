import type {
  ContactFormData,
  RequestSampleFormData,
  PurchaseInquiryFormData,
  FormSubmissionResponse,
} from './forms.types';
import type { ApiResponse } from './config';

/**
 * Type guard to check if response is an error
 */
export function isFormError(
  response: ApiResponse<FormSubmissionResponse>
): response is { success: false; error: string; message: string } {
  return response.success === false;
}

/**
 * Submit contact form — sends email via Resend through API route
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return json;
  } catch {
    return {
      success: false,
      error: 'network_error',
      message: 'Unable to send message. Please check your connection and try again.',
    };
  }
}

/**
 * Submit request sample form — sends email via Resend through API route
 */
export async function submitRequestSampleForm(
  data: RequestSampleFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  try {
    const res = await fetch('/api/request-sample', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return json;
  } catch {
    return {
      success: false,
      error: 'network_error',
      message: 'Unable to send request. Please check your connection and try again.',
    };
  }
}

/**
 * Submit a checkout purchase inquiry — sends email via Resend through API route
 */
export async function submitPurchaseInquiry(
  data: PurchaseInquiryFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  try {
    const res = await fetch('/api/purchase-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return json;
  } catch {
    return {
      success: false,
      error: 'network_error',
      message: 'Unable to send your inquiry. Please check your connection and try again.',
    };
  }
}
