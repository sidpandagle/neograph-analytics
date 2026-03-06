import type {
  ContactFormData,
  RequestSampleFormData,
  FormSubmissionRequest,
  FormSubmissionResponse,
  FormMetadata,
} from './forms.types';
import type { ApiResponse } from './config';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

/**
 * Get browser metadata for form submissions
 */
function getFormMetadata(): FormMetadata {
  return {
    submittedAt: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    referrer: typeof window !== 'undefined' ? window.document.referrer : undefined,
    pageURL: typeof window !== 'undefined' ? window.location.href : undefined,
  };
}

/**
 * Generic function to submit form data to the API
 */
async function submitForm<T extends ContactFormData | RequestSampleFormData>(
  category: 'contact' | 'request-sample' | 'request-customization',
  data: T
): Promise<ApiResponse<FormSubmissionResponse>> {
  try {
    const payload: FormSubmissionRequest<T> = {
      category,
      data,
      metadata: getFormMetadata(),
    };

    const response = await fetch(`${API_BASE_URL}/api/v1/forms/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'submission_failed',
        message: result.message || 'Failed to submit form. Please try again.',
        statusCode: response.status,
      };
    }

    return result;
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: 'network_error',
      message: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Submit contact form
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  return submitForm('contact', data);
}

/**
 * Submit request sample form
 */
export async function submitRequestSampleForm(
  data: RequestSampleFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  return submitForm('request-sample', data);
}

/**
 * Submit request customization form
 */
export async function submitRequestCustomizationForm(
  data: RequestSampleFormData
): Promise<ApiResponse<FormSubmissionResponse>> {
  return submitForm('request-customization', data);
}

/**
 * Type guard to check if response is an error
 */
export function isFormError(
  response: ApiResponse<FormSubmissionResponse>
): response is { success: false; error: string; message: string } {
  return response.success === false;
}
