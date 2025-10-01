import { ValidationRules } from "@/types/contact-form-types";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactFormSchema: ValidationRules = {
  name: {
    required: true,
    minLength: 2,
    validate: (value: string): string | null => {
      if (!value) return 'Name is required';
      if (value.length < 2) return 'Name must be at least 2 characters';
      return null;
    }
  },
  email: {
    required: true,
    pattern: emailRegex,
    validate: (value: string): string | null => {
      if (!value) return 'Email is required';
      if (!emailRegex.test(value)) return 'Please enter a valid email address';
      return null;
    }
  },
  subject: {
    required: true,
    validate: (value: string): string | null => {
      if (!value) return 'Subject is required';
      return null;
    }
  },
  message: {
    required: true,
    minLength: 10,
    validate: (value: string): string | null => {
      if (!value) return 'Message is required';
      if (value.length < 10) return 'Message must be at least 10 characters';
      return null;
    }
  }
};

export default contactFormSchema