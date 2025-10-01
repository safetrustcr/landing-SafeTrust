"use client";

import emailService from "@/hooks/email-service";
import contactFormSchema from "@/hooks/form-validation";
import useFormValidation from "@/hooks/use-form-validation";
import { FormData, FormValues, SubmitStatus } from "@/types/contact-form-types";
import {
  Mail,
  User,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import FileUpload from "./FileUpload";
import ReCAPTCHA from "../ReCAPTCHA ";
import { Button } from "../ui/button";

declare global {
  interface Window {
    formDraft?: string;
  }
}

export const ContactForm: React.FC = () => {
  const initialValues: FormValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
  } = useFormValidation(initialValues, contactFormSchema);

  const [files, setFiles] = useState<File[]>([]);
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.values(values).some((v) => v)) {
        const draft = JSON.stringify(values);
        window.formDraft = draft;
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [values]);

  useEffect(() => {
    if (window.formDraft) {
      try {
        const parsed: FormValues = JSON.parse(window.formDraft);
        setValues(parsed);
      } catch (e) {
        console.error("Failed to load draft:", e);
      }
    }
  }, [setValues]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateAll()) {
      setSubmitStatus({
        type: "error",
        message: "Please fix the errors below",
      });
      return;
    }

    if (!captchaVerified) {
      setSubmitStatus({
        type: "error",
        message: "Please verify you are not a robot",
      });
      return;
    }

    setSubmitting(true);

    const formData: FormData = {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
      files: files.map((f) => ({ name: f.name, size: f.size })),
      timestamp: new Date().toISOString(),
    };

    emailService
      .sendEmail(formData)
      .then((result) => {
        setSubmitStatus({ type: "success", message: result.message });
        reset();
        setFiles([]);
        setCaptchaVerified(false);
        delete window.formDraft;
      })
      .catch((error: Error) => {
        setSubmitStatus({ type: "error", message: error.message });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-foreground py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Mail className="text-primary" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Get In Touch
            </h1>
            <p className="text-primary-600">
              We&apos;d love to hear from you. Send us a message!
            </p>
          </div>

          {submitStatus && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                submitStatus.type === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {submitStatus.type === "success" ? (
                <CheckCircle
                  className="text-green-600 flex-shrink-0 mt-0.5"
                  size={20}
                />
              ) : (
                <AlertCircle
                  className="text-red-600 flex-shrink-0 mt-0.5"
                  size={20}
                />
              )}
              <p
                className={`text-sm font-medium ${
                  submitStatus.type === "success"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {submitStatus.message}
              </p>
            </div>
          )}

          <div className="space-y-6">
            <FormField
              label="Full Name"
              name="name"
              value={values.name}
              error={errors.name}
              touched={touched.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John Doe"
              icon={User}
              required
            />

            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={values.email}
              error={errors.email}
              touched={touched.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="john@example.com"
              icon={Mail}
              required
            />

            <FormField
              label="Subject"
              name="subject"
              value={values.subject}
              error={errors.subject}
              touched={touched.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="How can we help?"
              icon={MessageSquare}
              required
            />

            <FormField
              label="Message"
              name="message"
              value={values.message}
              error={errors.message}
              touched={touched.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell us more about your inquiry..."
              as="textarea"
              required
            />

            <FileUpload files={files} onFilesChange={setFiles} />

            <ReCAPTCHA onVerify={setCaptchaVerified} siteKey={sitekey} />

            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full text-white flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Sending...
                </>
              ) : (
                <>
                  <Mail size={20} />
                  Send Message
                </>
              )}
            </Button>
          </div>

          <p className="text-center text-xs text-primary mt-6">
            Your information is secure and will never be shared with third
            parties.
          </p>
        </div>
      </div>
    </div>
  );
};
