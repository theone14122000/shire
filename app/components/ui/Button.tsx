"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

const EASE = [0.22, 1, 0.36, 1] as const;

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonOnlyProps = CommonProps & {
  as?: "button";
  href?: never;
} & Omit<ComponentProps<"button">, "children" | "className">;

type LinkOnlyProps = CommonProps & {
  as: "link";
  href: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

type AnchorOnlyProps = CommonProps & {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
} & Omit<ComponentProps<"a">, "href" | "children" | "className">;

export type ButtonProps = ButtonOnlyProps | LinkOnlyProps | AnchorOnlyProps;

/**
 * Button — renders as <button>, Next <Link>, or <a> depending on usage.
 * The motion wrapper is a span so we never mix Framer's animation
 * prop shape with native HTML element prop types.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const base = `${variantClass[variant]} ${className}`.trim();

  if (props.as === "link") {
    const { variant: _v, className: _c, children: _ch, as: _a, href, ...rest } =
      props;
    return (
      <motion.span
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="inline-flex"
      >
        <Link href={href} className={base} {...rest}>
          {props.children}
        </Link>
      </motion.span>
    );
  }

  if (props.as === "a") {
    const { variant: _v, className: _c, children: _ch, as: _a, ...rest } =
      props;
    return (
      <motion.span
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="inline-flex"
      >
        <a className={base} {...rest}>
          {props.children}
        </a>
      </motion.span>
    );
  }

  // Default: <button>
  const { variant: _v, className: _c, children: _ch, as: _a, ...rest } =
    props as ButtonOnlyProps;
  return (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="inline-flex"
    >
      <button className={base} {...rest}>
        {props.children}
      </button>
    </motion.span>
  );
}
