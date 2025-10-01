export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  validate: (value: string) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string | null;
}

export interface FormTouched {
  [key: string]: boolean;
}

export interface UseFormValidationReturn {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  handleChange: (name: string, value: string) => void;
  handleBlur: (name: string) => void;
  validateAll: () => boolean;
  reset: () => void;
  setValues: (values: FormValues) => void;
}

export interface EmailServiceResponse {
  success: boolean;
  message: string;
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  files: Array<{ name: string; size: number }>;
  timestamp: string;
}

export interface SubmitStatus {
  type: 'success' | 'error';
  message: string;
}