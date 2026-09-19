/**
 * DateFieldButton — interactive wrapper around the Figma TextField import.
 *
 * Design tokens sourced directly from src/imports/TextField/index.tsx:
 *   bg:          #fbfcff   (outer wrapper bg)
 *   text:        #191c1f   (input text)  — contrast vs #fbfcff ≈ 19:1  ✓ WCAG AAA
 *   icon-fill-0: #3F4753   (calendar)   — contrast vs #fbfcff ≈ 10:1  ✓ WCAG AAA
 *   icon-fill-1: #49454F   (chevron)    — contrast vs #fbfcff ≈ 9.6:1 ✓ WCAG AAA
 *   shadow:      drop-shadow-[0px_0px_7.5px_rgba(0,47,85,0.17)]
 *   radius:      rounded-[12px] (field), rounded-[24px] (outer)
 *   font:        Roboto Regular, tracking-[0.5px], text-[16px], leading-[24px]
 *
 * SVG paths from src/imports/TextField/svg-gzvro74ho3.ts — imported as-is.
 */

import svgPaths from "@/imports/TextField/svg-gzvro74ho3";
import { ChevronDown } from "lucide-react";

interface DateFieldButtonProps {
  label: string;
  open: boolean;
  onClick: () => void;
  ariaLabel?: string;
}

export function DateFieldButton({
  label,
  open,
  onClick,
  ariaLabel,
}: DateFieldButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? "Datumfält"}
      aria-expanded={open}
      aria-haspopup="dialog"
      className="h-[40px] w-full bg-card rounded-full border border-border overflow-clip focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-opacity hover:opacity-90 active:opacity-75 text-foreground sm:h-[48px] sm:max-w-full"
    >
      <div className="flex items-center gap-[4px] px-[16px] max-sm:px-[12px]">
        {/* Calendar icon */}
        <span className="flex size-[20px] shrink-0 items-center justify-center">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 15 16.6667"
            aria-hidden="true"
          >
            <path d={svgPaths.p398f0df0} fill="currentColor" />
          </svg>
        </span>

        {/* Date text */}
        <span
          className="max-w-[calc(100vw-150px)] truncate text-[14px] leading-[24px] tracking-[0.5px] whitespace-nowrap font-normal sm:max-w-none sm:text-[16px]"
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontVariationSettings: '"wdth" 100',
          }}
        >
          {label}
        </span>

        {/* Chevron — rotates when open */}
        <ChevronDown
          className={`ml-auto size-4 shrink-0 opacity-50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </div>
    </button>
  );
}
