import {
  FormErrors,
  FormTouched,
  FormValues,
  UseFormValidationReturn,
  ValidationRules,
} from "@/types/contact-form-types";
import { useState, useCallback } from "react";

const useFormValidation = (
  initialValues: FormValues,
  rules: ValidationRules
): UseFormValidationReturn => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});

  const validateField = useCallback(
    (name: string, value: string): string | null => {
      const rule = rules[name];
      if (!rule) return null;
      return rule.validate(value);
    },
    [rules]
  );

  const handleChange = useCallback(
    (name: string, value: string): void => {
      setValues((prev) => ({ ...prev, [name]: value }));

      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (name: string): void => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, values[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [values, validateField]
  );

  const validateAll = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    Object.keys(rules).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);
    setTouched(
      Object.keys(rules).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    return Object.keys(newErrors).length === 0;
  }, [values, rules, validateField]);

  const reset = useCallback((): void => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
  };
};

export default useFormValidation