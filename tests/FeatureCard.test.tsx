import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FeatureCard } from "@/components/Features/FeatureCard";
import type { Feature } from "@/data/features";

vi.mock("framer-motion", () => ({
  motion: {
    article: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <article {...props}>{children}</article>
    ),
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockFeature: Feature = {
  id: "test-feature",
  icon: <span data-testid="feature-icon">Icon</span>,
  title: "Secure Escrow",
  description: "Hold deposits safely in blockchain",
  details: "Funds are held in smart contracts until conditions are met.",
  cta: "Read more",
  link: "/features/secure-escrow",
  category: "security",
};

const mockFeatureNoCta: Feature = {
  id: "no-cta",
  icon: <span>I</span>,
  title: "Basic Feature",
  description: "Short description",
  details: "Extended details here.",
  category: "trust",
};

describe("FeatureCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders feature title and description", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    expect(screen.getByText("Secure Escrow")).toBeInTheDocument();
    expect(screen.getByText("Hold deposits safely in blockchain")).toBeInTheDocument();
  });

  it("renders feature icon", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    expect(screen.getByTestId("feature-icon")).toBeInTheDocument();
  });

  it("does not show details by default", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    expect(screen.queryByText("Funds are held in smart contracts until conditions are met.")).not.toBeInTheDocument();
  });

  it("shows details on mouse enter and hides on mouse leave", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    const card = screen.getByRole("article");
    fireEvent.mouseEnter(card);
    expect(screen.getByText("Funds are held in smart contracts until conditions are met.")).toBeInTheDocument();
    fireEvent.mouseLeave(card);
    expect(screen.queryByText("Funds are held in smart contracts until conditions are met.")).not.toBeInTheDocument();
  });

  it("shows read more link when hovered and cta/link are present", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    fireEvent.mouseEnter(screen.getByRole("article"));
    const link = screen.getByRole("link", { name: "Read more" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/features/secure-escrow");
  });

  it("does not render read more link when feature has no cta or link", () => {
    render(<FeatureCard feature={mockFeatureNoCta} index={0} />);
    fireEvent.mouseEnter(screen.getByRole("article"));
    expect(screen.queryByRole("link", { name: "Read more" })).not.toBeInTheDocument();
  });

  it("has accessible structure with aria-labelledby and aria-describedby", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("aria-labelledby", "feature-title-test-feature");
    expect(article).toHaveAttribute("aria-describedby", "feature-desc-test-feature");
  });

  it("has role article", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("is focusable and reveals details on focus for keyboard users", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    const card = screen.getByRole("article");
    card.focus();
    expect(screen.getByText("Funds are held in smart contracts until conditions are met.")).toBeInTheDocument();
  });
});
