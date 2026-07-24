"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  heading: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-4 sm:gap-5 ${alignment} ${className}`}
    >
      {eyebrow ? (
        <span className="eyebrow inline-flex items-center gap-3">
          <span className="h-px w-8 bg-emerald-300" aria-hidden />
          {eyebrow}
        </span>
      ) : null}

      <h2 className="h-section max-w-[20ch]">{heading}</h2>

      {intro ? (
        <p className={`body-lg max-w-[58ch] ${align === "center" ? "mx-auto" : ""}`}>
          {intro}
        </p>
      ) : null}
    </motion.div>
  );
}
