import svgPaths from "./svg-gzvro74ho3";

function StateLayer1() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center relative shrink-0 w-full" data-name="State-layer">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Icon">
        <div className="absolute inset-[8.33%_12.5%]" data-name="icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16.6667">
            <path d={svgPaths.p398f0df0} fill="var(--fill-0, #3F4753)" id="icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[32px]" data-name="Content">
      <StateLayer1 />
    </div>
  );
}

function InputTextContainer() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Input text container">
      <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1f] text-[16px] tracking-[0.5px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[24px]">17/07/2025 - 17/08/2025</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Content">
      <InputTextContainer />
    </div>
  );
}

function StateLayer2() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center relative shrink-0 w-full" data-name="State-layer">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute bottom-[35.83%] left-1/4 right-1/4 top-[33.33%]" data-name="icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7.4">
            <path d={svgPaths.p13733a00} fill="var(--fill-0, #49454F)" id="icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shrink-0 w-[32px]" data-name="Content">
      <StateLayer2 />
    </div>
  );
}

function StateLayer() {
  return (
    <div className="relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full" data-name="State-layer">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[16px] py-[4px] relative size-full">
          <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Trailing icon">
            <Content />
          </div>
          <Content1 />
          <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Leading icon">
            <Content2 />
          </div>
        </div>
      </div>
    </div>
  );
}

function TextField1() {
  return (
    <div className="content-stretch drop-shadow-[0px_0px_7.5px_rgba(0,47,85,0.17)] flex flex-col items-start justify-center overflow-clip relative rounded-[12px] shrink-0 w-[298px]" data-name="Text field">
      <StateLayer />
    </div>
  );
}

export default function TextField() {
  return (
    <div className="bg-[#fbfcff] content-stretch flex flex-col items-start overflow-clip relative rounded-[24px] size-full" data-name="Text field">
      <TextField1 />
    </div>
  );
}