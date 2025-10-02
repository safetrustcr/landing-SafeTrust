import React, { useEffect, useRef } from "react";

interface ReCAPTCHAProps {
  onVerify: (verified: boolean) => void;
  siteKey?: string;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (
        container: string | HTMLElement,
        parameters: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
    };
    recaptchaWidgetId?: number;
  }
}

const ReCAPTCHA: React.FC<ReCAPTCHAProps> = ({ onVerify, siteKey }) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  if (!siteKey) {
    throw new Error("siteKey is required for ReCAPTCHA");
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.grecaptcha.ready(() => {
        if (recaptchaRef.current && !widgetIdRef.current) {
          widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              console.log("reCAPTCHA verified:", token);
              onVerify(true);
            },
            "expired-callback": () => {
              console.log("reCAPTCHA expired");
              onVerify(false);
            },
            "error-callback": () => {
              console.log("reCAPTCHA error");
              onVerify(false);
            },
          });
        }
      });
    };

    return () => {
      // Cleanup
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (e) {
          console.error("Error resetting reCAPTCHA:", e);
        }
      }
    };
  }, [siteKey, onVerify]);

  return (
    <div className="flex flex-col items-start">
      <label className="block text-sm font-medium text-black mb-2">
        Verification <span className="text-red-500">*</span>
      </label>
      <div ref={recaptchaRef} className="transform scale-100 origin-left" />
      <p className="text-xs text-black mt-2">
        Please verify that you&apos;re human
      </p>
    </div>
  );
};

export default ReCAPTCHA;
