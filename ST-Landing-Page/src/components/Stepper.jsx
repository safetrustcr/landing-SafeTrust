import React, { useState } from 'react';
import '../styles/stepper.css';

const steps = [
  {
    title: 'Funds locked',
    description: 'Funds locked into the escrow on booking.',
  },
  {
    title: 'Held on-chain',
    description: 'Held on-chain securely while active.',
  },
  {
    title: 'Both confirm',
    description: 'Both parties confirm to trigger release.',
  },
  {
    title: 'Auto-released',
    description: 'Smart contract releases funds automatically.',
  },
];

export default function Stepper() {
  const [activeStep, setActiveStep] = useState(2); // Default is 2 (Step 3: "Both confirm" in progress)

  // Calculate progress ratio percentage for custom CSS variable
  const progressRatio = (activeStep / (steps.length - 1)) * 100;

  return (
    <div className="stepper-card">
      <div className="stepper-list">
        {/* Background connector line */}
        <div className="stepper-line-bg"></div>

        {/* Active colored connector line using CSS variable --progress-ratio */}
        <div
          className="stepper-line-active"
          style={{ '--progress-ratio': `${progressRatio}%` }}
        ></div>

        {/* Dynamic step nodes */}
        {steps.map((step, idx) => {
          let stateClass = 'pending';
          let badgeText = 'Pending';
          let isCompleted = false;

          if (idx < activeStep) {
            stateClass = 'completed';
            badgeText = 'Completed';
            isCompleted = true;
          } else if (idx === activeStep) {
            stateClass = 'in-progress';
            badgeText = 'In Progress';
          }

          return (
            <div
              key={idx}
              className="step-item"
              onClick={() => setActiveStep(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveStep(idx);
                }
              }}
              aria-label={`Step ${idx + 1}: ${step.title}. Status: ${badgeText}. Click to set.`}
            >
              {/* Step Circle */}
              <div className={`step-circle-container ${stateClass}`}>
                {isCompleted ? (
                  <svg className="step-check-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Step Content */}
              <div className="step-info">
                <h3 className="step-name">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
                <span className={`status-badge ${stateClass}`}>
                  {badgeText}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
