"use client";

import React, { useState, useEffect, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CaptchaProps {
  onValidationChange?: (isValid: boolean) => void;
  className?: string;
}

export interface CaptchaRef {
  reset: () => void;
  validate: () => boolean;
}

export const Captcha = forwardRef<CaptchaRef, CaptchaProps>(
  ({ onValidationChange, className }, ref) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [isValid, setIsValid] = useState(false);

    const generateQuestion = () => {
      const n1 = Math.floor(Math.random() * 10) + 1;
      const n2 = Math.floor(Math.random() * 10) + 1;
      setNum1(n1);
      setNum2(n2);
      setUserAnswer("");
      setIsValid(false);
      onValidationChange?.(false);
    };

    useEffect(() => {
      generateQuestion();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setUserAnswer(value);

      const correctAnswer = num1 + num2;
      const valid = parseInt(value) === correctAnswer;
      setIsValid(valid);
      onValidationChange?.(valid);
    };

    const validate = () => {
      const correctAnswer = num1 + num2;
      return parseInt(userAnswer) === correctAnswer;
    };

    const reset = () => {
      generateQuestion();
    };

    React.useImperativeHandle(ref, () => ({
      reset,
      validate,
    }));

    return (
      <div className={cn("space-y-2", className)}>
        <label htmlFor="captcha" className="block text-sm font-medium">
          Enter Captcha *
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg">
            <span className="text-lg font-semibold">
              {num1} + {num2} =
            </span>
          </div>
          <input
            type="number"
            id="captcha"
            name="captcha"
            required
            value={userAnswer}
            onChange={handleChange}
            className={cn(
              "w-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-[var(--background)]",
              isValid && userAnswer
                ? "border-[var(--cmi-primary)] focus:ring-[var(--primary)]"
                : "border-[var(--border)] focus:ring-[var(--primary)]"
            )}
            placeholder="?"
            aria-label="Captcha answer"
          />
          {userAnswer && (
            <div className="flex-shrink-0">
              {isValid ? (
                <svg
                  className="w-5 h-5 text-[var(--cmi-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-[var(--status-error-icon)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
          )}
        </div>
        <p className="text-xs text-[var(--muted-foreground)]">
          Please solve this simple math problem to verify you are human
        </p>
      </div>
    );
  }
);

Captcha.displayName = "Captcha";
