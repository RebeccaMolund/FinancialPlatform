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

interface DateFieldButtonProps {
  label: string;
  open: boolean;
  onClick: () => void;
}

export function DateFieldButton({ label, open, onClick }: DateFieldButtonProps) {
  return (
    /* Outer shell — bg-[#fbfcff] rounded-[24px] from the import's root */
    <button
      onClick={onClick}
      aria-expanded={open}
      aria-haspopup="dialog"
      className="bg-[#fbfcff] rounded-[24px] overflow-clip focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14b8a6] focus-visible:ring-offset-1 transition-opacity hover:opacity-90 active:opacity-75"
    >
      {/* TextField1 — drop-shadow, rounded-[12px] */}
      <div className="drop-shadow-[0px_0px_7.5px_rgba(0,47,85,0.17)] flex flex-col items-start justify-center overflow-clip rounded-[12px]">

        {/* StateLayer — inner row */}
        <div className="rounded-tl-[4px] rounded-tr-[4px] w-full">
          <div className="flex flex-row items-center">
            <div className="flex gap-[4px] items-center px-[16px] py-[4px]">

              {/* Trailing icon — calendar (svg p398f0df0), fill #3F4753 */}
              <div className="flex items-center justify-center shrink-0">
                <div className="flex flex-col items-center justify-center overflow-clip rounded-[8px] shrink-0 w-[32px]">
                  <div className="flex h-[32px] items-center justify-center w-full">
                    <div className="overflow-clip shrink-0 size-[20px] relative">
                      <div className="absolute inset-[8.33%_12.5%]">
                        <svg
                          className="absolute block inset-0 size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 15 16.6667"
                          aria-hidden="true"
                        >
                          <path d={svgPaths.p398f0df0} fill="#3F4753" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date text — font Roboto, #191c1f, 16px, tracking-[0.5px] */}
              <div className="flex flex-col items-start justify-center shrink-0">
                <div className="flex items-center shrink-0">
                  <span
                    className="text-[#191c1f] text-[16px] leading-[24px] tracking-[0.5px] whitespace-nowrap font-normal"
                    style={{ fontFamily: "'Roboto', sans-serif", fontVariationSettings: '"wdth" 100' }}
                  >
                    {label}
                  </span>
                </div>
              </div>

              {/* Leading icon — chevron (svg p13733a00), fill #49454F, rotates when open */}
              <div className="flex items-center justify-center shrink-0 size-[32px]">
                <div className="flex flex-col items-center justify-center overflow-clip rounded-[100px] shrink-0 w-[32px]">
                  <div className="flex h-[40px] items-center justify-center w-full">
                    <div className="overflow-clip shrink-0 size-[24px] relative">
                      <div className="absolute bottom-[35.83%] left-1/4 right-1/4 top-[33.33%]">
                        <svg
                          className={`absolute block inset-0 size-full transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 12 7.4"
                          aria-hidden="true"
                        >
                          <path d={svgPaths.p13733a00} fill="#49454F" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
