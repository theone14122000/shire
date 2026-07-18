/**
 * Shared type definitions used across the home components.
 *
 * When the MySQL backend is wired up, the data shapes returned by the API
 * should match these types so the UI doesn't have to change.
 */

export type ImagePlaceholderKind =
  | "hero"
  | "lifestyle"
  | "product"
  | "gallery"
  | "editorial"
  | "feature"
  | "ambience";

export type ImagePlaceholderProps = {
  /** What this slot represents in the design. */
  kind: ImagePlaceholderKind;
  /** Short label shown inside the dashed frame. */
  label?: string;
  /** Optional caption shown beneath the label. */
  caption?: string;
  /** Aspect ratio (Tailwind class). Defaults to 4/5. */
  aspect?: "16/9" | "4/5" | "4/3" | "3/4" | "1/1" | "5/4" | "2/3" | "21/9" | "3/2";
  /** Optional override className for layout adjustments. */
  className?: string;
  /** Show a small "image slot" badge in the corner. */
  showBadge?: boolean;
};

export type SectionProps = {
  id?: string;
  className?: string;
};
