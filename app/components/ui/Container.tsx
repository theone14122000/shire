// components/ui/Container.tsx
import type { ReactNode, ElementType } from "react";

/**
 * Container — consistent horizontal padding & max-width shell.
 * The page composition uses this so each section is layout-stable.
 */
export function Container({
  children,
  className = "",
  as,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component className={`container-luxe ${className}`.trim()}>
      {children}
    </Component>
  );
}