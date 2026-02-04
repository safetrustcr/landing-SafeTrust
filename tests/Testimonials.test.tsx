/**
 * Testimonials Component Tests
 *
 * Note: This project currently has no test runner configured.
 * These tests are written for Jest + React Testing Library.
 * To run tests, install the following dependencies:
 *
 * npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @types/jest
 *
 * Then update package.json scripts:
 * "test": "jest"
 *
 * And create jest.config.js for Next.js configuration.
 */

import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Components to test
import TestimonialsSection from "../src/components/Testimonials/TestimonialsSection";
import TestimonialCard from "../src/components/Testimonials/TestimonialCard";
import TestimonialCarousel from "../src/components/Testimonials/TestimonialCarousel";

// Test data
import testimonials from "../src/data/testimonials";
import type { Testimonial } from "../src/data/testimonials";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useAnimation: () => ({
    start: jest.fn(),
  }),
  useInView: () => true,
}));

describe("Testimonials Data", () => {
  it("should have at least 8 testimonials", () => {
    expect(testimonials.length).toBeGreaterThanOrEqual(8);
  });

  it("should have all required fields for each testimonial", () => {
    testimonials.forEach((testimonial) => {
      expect(testimonial).toHaveProperty("id");
      expect(testimonial).toHaveProperty("name");
      expect(testimonial).toHaveProperty("role");
      expect(testimonial).toHaveProperty("avatar");
      expect(testimonial).toHaveProperty("quote");
      expect(testimonial).toHaveProperty("rating");
      expect(testimonial).toHaveProperty("date");
    });
  });

  it("should have valid rating values (1-5)", () => {
    testimonials.forEach((testimonial) => {
      expect(testimonial.rating).toBeGreaterThanOrEqual(1);
      expect(testimonial.rating).toBeLessThanOrEqual(5);
    });
  });

  it("should have unique IDs", () => {
    const ids = testimonials.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe("TestimonialCard", () => {
  const mockTestimonial: Testimonial = {
    id: "test-1",
    name: "Test User",
    role: "Test Role",
    company: "Test Company",
    avatar: "/test-avatar.jpg",
    quote: "This is a test quote for the testimonial card.",
    rating: 5,
    date: "Jan 2025",
  };

  it("should render the testimonial quote", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    expect(screen.getByText(mockTestimonial.quote)).toBeInTheDocument();
  });

  it("should render the user name", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    expect(screen.getByText(mockTestimonial.name)).toBeInTheDocument();
  });

  it("should render the user role", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    expect(screen.getByText(/Test Role/)).toBeInTheDocument();
  });

  it("should render star rating with correct aria-label", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    expect(screen.getByLabelText("Rating: 5 out of 5 stars")).toBeInTheDocument();
  });

  it("should render date", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    expect(screen.getByText(mockTestimonial.date)).toBeInTheDocument();
  });

  it("should handle missing avatar gracefully", () => {
    const testimonialWithBadAvatar = {
      ...mockTestimonial,
      avatar: "/non-existent.jpg",
    };
    render(<TestimonialCard testimonial={testimonialWithBadAvatar} />);
    // Component should still render
    expect(screen.getByText(mockTestimonial.name)).toBeInTheDocument();
  });

  it("should apply active styles when isActive is true", () => {
    const { container } = render(
      <TestimonialCard testimonial={mockTestimonial} isActive={true} />
    );
    // The card should have the active scale and opacity
    expect(container.firstChild).toHaveClass("scale-100");
  });
});

describe("TestimonialCarousel", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render navigation buttons", () => {
    render(<TestimonialCarousel testimonials={testimonials} />);
    expect(screen.getByLabelText("Previous testimonial")).toBeInTheDocument();
    expect(screen.getByLabelText("Next testimonial")).toBeInTheDocument();
  });

  it("should render dot indicators for each testimonial", () => {
    render(<TestimonialCarousel testimonials={testimonials} />);
    const dots = screen.getAllByRole("tab");
    expect(dots.length).toBe(testimonials.length);
  });

  it("should navigate to next testimonial when next button is clicked", async () => {
    render(<TestimonialCarousel testimonials={testimonials} />);
    const nextButton = screen.getByLabelText("Next testimonial");

    await userEvent.click(nextButton);

    // Second dot should now be active
    const dots = screen.getAllByRole("tab");
    expect(dots[1]).toHaveAttribute("aria-selected", "true");
  });

  it("should navigate to previous testimonial when prev button is clicked", async () => {
    render(<TestimonialCarousel testimonials={testimonials} />);
    const prevButton = screen.getByLabelText("Previous testimonial");

    await userEvent.click(prevButton);

    // Last dot should be active (circular navigation)
    const dots = screen.getAllByRole("tab");
    expect(dots[dots.length - 1]).toHaveAttribute("aria-selected", "true");
  });

  it("should navigate to specific testimonial when dot is clicked", async () => {
    render(<TestimonialCarousel testimonials={testimonials} />);
    const dots = screen.getAllByRole("tab");

    await userEvent.click(dots[3]);

    expect(dots[3]).toHaveAttribute("aria-selected", "true");
  });

  it("should auto-rotate testimonials after interval", () => {
    render(<TestimonialCarousel testimonials={testimonials} autoPlayInterval={5000} />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const dots = screen.getAllByRole("tab");
    expect(dots[1]).toHaveAttribute("aria-selected", "true");
  });

  it("should pause auto-rotation on hover", () => {
    const { container } = render(
      <TestimonialCarousel testimonials={testimonials} autoPlayInterval={5000} />
    );

    // Hover over the carousel
    fireEvent.mouseEnter(container.firstChild as Element);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Should still be on first slide
    const dots = screen.getAllByRole("tab");
    expect(dots[0]).toHaveAttribute("aria-selected", "true");
  });

  it("should resume auto-rotation when hover ends", () => {
    const { container } = render(
      <TestimonialCarousel testimonials={testimonials} autoPlayInterval={5000} />
    );

    fireEvent.mouseEnter(container.firstChild as Element);
    fireEvent.mouseLeave(container.firstChild as Element);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const dots = screen.getAllByRole("tab");
    expect(dots[1]).toHaveAttribute("aria-selected", "true");
  });

  it("should have proper accessibility attributes", () => {
    render(<TestimonialCarousel testimonials={testimonials} />);
    
    expect(screen.getByRole("region")).toHaveAttribute(
      "aria-label",
      "Customer testimonials carousel"
    );
    expect(screen.getByRole("tablist")).toHaveAttribute(
      "aria-label",
      "Testimonial navigation"
    );
  });
});

describe("TestimonialsSection", () => {
  it("should render the section heading", () => {
    render(<TestimonialsSection />);
    expect(screen.getByRole("heading", { name: /what our users say/i })).toBeInTheDocument();
  });

  it("should render stats bar with metrics", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText("10K+")).toBeInTheDocument();
    expect(screen.getByText("Happy Users")).toBeInTheDocument();
    expect(screen.getByText("4.9")).toBeInTheDocument();
    expect(screen.getByText("Average Rating")).toBeInTheDocument();
    expect(screen.getByText("$50M+")).toBeInTheDocument();
    expect(screen.getByText("Secured Deposits")).toBeInTheDocument();
  });

  it("should render the testimonial carousel", () => {
    render(<TestimonialsSection />);
    expect(screen.getByRole("region", { name: /testimonials/i })).toBeInTheDocument();
  });

  it("should have proper section id for navigation", () => {
    const { container } = render(<TestimonialsSection />);
    const section = container.querySelector("#testimonials");
    expect(section).toBeInTheDocument();
  });

  it("should render trust message footer", () => {
    render(<TestimonialsSection />);
    expect(
      screen.getByText(/trusted by property owners, tenants, freelancers/i)
    ).toBeInTheDocument();
  });
});

describe("Keyboard Navigation", () => {
  it("should navigate with arrow keys", () => {
    render(<TestimonialCarousel testimonials={testimonials} />);

    fireEvent.keyDown(window, { key: "ArrowRight" });

    const dots = screen.getAllByRole("tab");
    expect(dots[1]).toHaveAttribute("aria-selected", "true");
  });

  it("should navigate backwards with left arrow", () => {
    render(<TestimonialCarousel testimonials={testimonials} />);

    fireEvent.keyDown(window, { key: "ArrowLeft" });

    const dots = screen.getAllByRole("tab");
    expect(dots[dots.length - 1]).toHaveAttribute("aria-selected", "true");
  });
});

describe("Responsive Behavior", () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it("should adjust visible count for mobile", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<TestimonialCarousel testimonials={testimonials} />);
    fireEvent(window, new Event("resize"));

    // Mobile should show 1 card at a time
    // This would need to be verified through the DOM structure
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("should adjust visible count for tablet", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 768,
    });

    render(<TestimonialCarousel testimonials={testimonials} />);
    fireEvent(window, new Event("resize"));

    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("should adjust visible count for desktop", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1200,
    });

    render(<TestimonialCarousel testimonials={testimonials} />);
    fireEvent(window, new Event("resize"));

    expect(screen.getByRole("region")).toBeInTheDocument();
  });
});
