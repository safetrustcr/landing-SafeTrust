import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterForm } from "../src/components/Newsletter/NewsletterForm";

vi.mock("../src/components/ReCAPTCHA ", () => ({
  default: ({
    onVerify,
    onToken,
  }: {
    onVerify: (v: boolean) => void;
    onToken?: (t: string) => void;
  }) => {
    return (
      <div data-testid="recaptcha">
        <button
          type="button"
          onClick={() => {
            onVerify(true);
            onToken?.("mock-token");
          }}
        >
          Verify
        </button>
      </div>
    );
  },
}));

vi.mock("@/lib/analytics/events", () => ({
  trackFormSubmit: vi.fn(),
  trackNewsletterSignup: vi.fn(),
}));

describe("NewsletterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = "test-key";
  });

  it("renders email input and subscribe button", () => {
    render(<NewsletterForm />);
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });

  it("renders consent checkbox as required", () => {
    render(<NewsletterForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /agree to receive newsletter/i,
    });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeRequired();
  });

  it("shows validation error when email is invalid", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByPlaceholderText("Enter your email"), "invalid");
    await user.click(screen.getByRole("button", { name: /verify/i }));
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it("shows error when consent is not checked", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByPlaceholderText("Enter your email"), "test@example.com");
    await user.click(screen.getByRole("button", { name: /verify/i }));
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/must agree/i)).toBeInTheDocument();
    });
  });

  it("shows error when reCAPTCHA not verified", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByPlaceholderText("Enter your email"), "test@example.com");
    await user.click(screen.getByRole("checkbox", { name: /agree to receive newsletter/i }));
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/complete the verification/i)).toBeInTheDocument();
    });
  });

  it("disables submit button until reCAPTCHA is verified", async () => {
    render(<NewsletterForm />);

    const submitButton = screen.getByRole("button", { name: /subscribe/i });
    expect(submitButton).toBeDisabled();

    await userEvent.click(screen.getByRole("button", { name: /verify/i }));
    expect(submitButton).not.toBeDisabled();
  });

  it("shows loading state during submission", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }))
    ) as typeof fetch;

    render(<NewsletterForm />);
    await user.type(screen.getByPlaceholderText("Enter your email"), "test@example.com");
    await user.click(screen.getByRole("checkbox", { name: /agree to receive newsletter/i }));
    await user.click(screen.getByRole("button", { name: /verify/i }));
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(screen.getByText(/subscribing/i)).toBeInTheDocument();
  });

  it("shows success message after successful submission", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }))
    ) as typeof fetch;

    render(<NewsletterForm />);
    await user.type(screen.getByPlaceholderText("Enter your email"), "test@example.com");
    await user.click(screen.getByRole("checkbox", { name: /agree to receive newsletter/i }));
    await user.click(screen.getByRole("button", { name: /verify/i }));
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/welcome to safetrust/i)).toBeInTheDocument();
    });
  });

  it("compact variant does not show name field", () => {
    render(<NewsletterForm variant="compact" />);
    expect(screen.queryByPlaceholderText(/your name/i)).not.toBeInTheDocument();
  });

  it("default variant shows name field", () => {
    render(<NewsletterForm variant="default" />);
    expect(screen.getByPlaceholderText(/your name \(optional\)/i)).toBeInTheDocument();
  });
});
