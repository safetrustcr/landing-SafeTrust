"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "../ReCAPTCHA";
import { isValidEmail } from "@/lib/validation/email";
import { trackFormSubmit, trackNewsletterSignup } from "@/lib/analytics/events";
import { Loader2, AlertCircle } from "lucide-react";
import styles from "@/styles/newsletter.module.css";

export interface NewsletterFormData {
  email: string;
  name?: string;
  agreedToNewsletter: boolean;
}

interface NewsletterFormProps {
  variant?: "default" | "compact";
  onSuccess?: () => void;
}

export function NewsletterForm({ variant = "default", onSuccess }: NewsletterFormProps) {
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: "",
    name: "",
    agreedToNewsletter: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; consent?: string }>({});

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const formClass = variant === "compact" ? styles.newsletterFormCompact : styles.newsletterForm;

  const validate = (): boolean => {
    const errors: { email?: string; consent?: string } = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.agreedToNewsletter) {
      errors.consent = "You must agree to receive newsletter updates";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!validate()) return;

    if (!recaptchaVerified || !recaptchaToken) {
      setError("Please complete the verification");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          name: formData.name?.trim() || undefined,
          agreedToNewsletter: formData.agreedToNewsletter,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed");
      }

      setSuccess(true);
      setFormData({ email: "", name: "", agreedToNewsletter: false });
      setRecaptchaToken(null);
      setRecaptchaVerified(false);

      trackFormSubmit("newsletter", "newsletter_signup", true);
      trackNewsletterSignup();
      onSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      trackFormSubmit("newsletter", "newsletter_signup", false, message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successMessage}>
        <h3>Welcome to SafeTrust!</h3>
        <p>Check your email for exclusive updates</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={formClass}>
      {error && (
        <div className={styles.errorMessage} role="alert">
          <span className="flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </span>
        </div>
      )}

      <div className={styles.inputGroup}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="bg-card border-border rounded-md text-muted-foreground pl-4 backdrop-blur-sm focus:border-primary focus:ring-primary/20 transition-colors duration-300"
          disabled={loading}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
        />
        {fieldErrors.email && (
          <p id="email-error" className="text-sm text-red-600">
            {fieldErrors.email}
          </p>
        )}
      </div>

      {variant === "default" && (
        <div className={styles.inputGroup}>
          <Input
            type="text"
            placeholder="Your name (optional)"
            value={formData.name || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="bg-card border-border rounded-md text-muted-foreground pl-4 backdrop-blur-sm focus:border-primary focus:ring-primary/20 transition-colors duration-300"
            disabled={loading}
          />
        </div>
      )}

      <label className={styles.consentLabel}>
        <input
          type="checkbox"
          checked={formData.agreedToNewsletter}
          onChange={(e) => setFormData((prev) => ({ ...prev, agreedToNewsletter: e.target.checked }))}
          disabled={loading}
          required
          aria-invalid={!!fieldErrors.consent}
          aria-describedby={fieldErrors.consent ? "consent-error-id" : undefined}
        />
        <span>
          I agree to receive newsletter updates from SafeTrust{" "}
          <span className="text-red-500">*</span>
        </span>
      </label>
      {fieldErrors.consent && (
        <p id="consent-error-id" className="text-sm text-red-600" role="alert">
          {fieldErrors.consent}
        </p>
      )}

      {siteKey ? (
        <ReCAPTCHA
          siteKey={siteKey}
          onVerify={setRecaptchaVerified}
          onToken={setRecaptchaToken}
        />
      ) : null}

      <Button
        type="submit"
        disabled={loading || !recaptchaVerified}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 transition-all duration-300"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={18} />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}
