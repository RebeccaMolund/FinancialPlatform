import svgPaths from "./svg-fs5x4je9fh";
import { imgVector } from "./svg-zgew2";

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">LG</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#14b8a6] content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Container">
      <Text />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#101828] text-[20px] whitespace-nowrap">Välkommen, Rebecca!</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container3 />
        <Heading />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex items-center p-[2px] relative shrink-0" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Icon">
        <div className="absolute inset-[12.5%_12.49%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0021 15">
            <path d={svgPaths.p25003780} fill="var(--fill-0, #007681)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Icon />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container2 />
        <div className="cursor-pointer relative rounded-[12px] shrink-0" data-name="Buttons">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative size-full">
            <Frame2 />
            <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[#007681] text-[14px] tracking-[0.056px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Redigera dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Select() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Select">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[16px] pr-[12px] py-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
            <div className="absolute inset-[4.17%_8.33%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22">
                <path d={svgPaths.p30b72580} fill="var(--fill-0, #3F4753)" id="Vector" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[#191c1f] text-[16px] text-left" style={{ fontVariationSettings: '"wdth" 100' }}>
            17/07/2025 - 17/08/2025
          </p>
          <div className="relative shrink-0 size-[20px]" data-name="Icon">
            <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[35.79%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6.175">
                <path d={svgPaths.p312e7240} fill="var(--fill-0, #3F4753)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container1 />
        <button className="cursor-pointer relative shrink-0 w-[320px]" data-name="Dropdown">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
            <Select />
          </div>
        </button>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p5a98780} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18f4d100} id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.6667V4.33333" id="Vector_3" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Totalblopp denna månad</p>
      </div>
    </div>
  );
}

function StatCard() {
  return (
    <div className="bg-[#fce7f3] relative shrink-0 w-full" data-name="StatCard">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative size-full">
          <Icon1 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] not-italic relative shrink-0 text-[#101828] text-[30px] whitespace-nowrap">12,5 M kr</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[301px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">EUR · fakturaladatum</p>
      </div>
    </div>
  );
}

function StatCard1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="StatCard">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[16px] py-[24px] relative size-full">
          <Container5 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-center min-w-[215px] overflow-clip relative rounded-[12px]" data-name="Card">
      <StatCard />
      <StatCard1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Antal fakturor</p>
      </div>
    </div>
  );
}

function StatCard2() {
  return (
    <div className="bg-[#dbeafe] relative shrink-0 w-full" data-name="StatCard">
      <div className="flex flex-row justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start justify-center px-[16px] py-[12px] relative size-full">
          <Icon2 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] not-italic relative shrink-0 text-[#101828] text-[30px] whitespace-nowrap">4 312</p>
      </div>
    </div>
  );
}

function StatCard3() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="StatCard">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[16px] py-[24px] relative size-full">
          <Container7 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">denna månad</p>
        </div>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start min-w-[215px] overflow-clip relative rounded-[12px]" data-name="Card">
      <StatCard2 />
      <StatCard3 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_42_3402)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 4V8L10.6667 9.33333" id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_42_3402">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Förfaller inom 30 dgr</p>
      </div>
    </div>
  );
}

function StatCard4() {
  return (
    <div className="bg-[#cefafe] relative shrink-0 w-full" data-name="StatCard">
      <div className="flex flex-row justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start justify-center px-[16px] py-[12px] relative size-full">
          <Icon3 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function StatCard5() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="StatCard">
      <div className="flex flex-col items-center size-full">
        <div className="[word-break:break-word] bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center not-italic px-[16px] py-[24px] relative size-full whitespace-nowrap">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] relative shrink-0 text-[#101828] text-[30px]">53</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px]">fakturor</p>
        </div>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start min-w-[215px] overflow-clip relative rounded-[12px]" data-name="Card">
      <StatCard4 />
      <StatCard5 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f197700} id="Vector_3" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3bf3e100} id="Vector_4" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Aktiva leverantörer</p>
      </div>
    </div>
  );
}

function StatCard6() {
  return (
    <div className="bg-[#f3e8ff] relative shrink-0 w-full" data-name="StatCard">
      <div className="flex flex-row justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start justify-center px-[16px] py-[12px] relative size-full">
          <Icon4 />
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] not-italic relative shrink-0 text-[#101828] text-[30px] whitespace-nowrap">949</p>
      </div>
    </div>
  );
}

function StatCard7() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="StatCard">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[16px] py-[24px] relative size-full">
          <Container8 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">unika</p>
        </div>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start min-w-[215px] overflow-clip relative rounded-[12px]" data-name="Card">
      <StatCard6 />
      <StatCard7 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-center flex flex-wrap gap-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] font-medium leading-[1.38] relative shrink-0 text-[#364153] text-[16px] tracking-[0.016px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Spend-analys historisk (per valuta)
        </p>
      </div>
    </div>
  );
}

function Text5() {
  return <div className="bg-[#14b8a6] relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Text" />;
}

function Button() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Text5 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M10.5 11.6667V5.83333" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 11.6667V2.33333" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M3.5 11.6667V8.16667" id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f3f4f6] h-[32px] relative rounded-[10px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[10px] relative size-full">
        <Icon5 />
        <Icon6 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[32px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Button />
        <Button1 />
        <div className="cursor-pointer relative rounded-[12px] shrink-0 size-[32px]" data-name="Icon button">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
            <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Icon">
              <div className="absolute inset-[16.67%_41.67%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 12">
                  <path d={svgPaths.p14f7fa00} fill="var(--fill-0, #3F4753)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartCard1() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="ChartCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Paragraph />
        <Container9 />
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[1.67%_1.85%_19.58%_6.15%]" data-name="Group">
      <div className="absolute inset-[-0.28%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 516.12 182.125">
          <g id="Group">
            <path d="M0 181.625H516.12" id="Vector" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
            <path d="M0 136.344H516.12" id="Vector_2" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
            <path d="M0 91.0625H516.12" id="Vector_3" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
            <path d="M0 45.7812H516.12" id="Vector_4" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
            <path d="M0 0.5H516.12" id="Vector_5" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[1.67%_1.85%_19.58%_6.15%]" data-name="Group">
      <Group1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex font-['IBM_Plex_Sans:Regular',sans-serif] font-normal inset-[79.95%_9.58%_13.27%_13.89%] items-start justify-between leading-[1.3] text-[#393c40] text-[12px] text-center tracking-[0.06px] whitespace-nowrap" data-name="Frame">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Jan
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Feb
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Mar
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Apr
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Maj
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] font-normal inset-[0.85%_94.44%_19.92%_3.42%] items-end justify-between leading-[1.28] text-[#505357] text-[11px] text-right tracking-[0.066px]" data-name="Frame">
      <p className="h-[11px] relative shrink-0 w-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        6k
      </p>
      <p className="h-[11px] relative shrink-0 w-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        5k
      </p>
      <p className="h-[11px] relative shrink-0 w-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        3k
      </p>
      <p className="h-[11px] relative shrink-0 w-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        2k
      </p>
      <p className="h-[11px] relative shrink-0 w-[8px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        0
      </p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[54.17%_85.09%_19.58%_10.75%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3031 60.375">
        <g id="Group">
          <path d={svgPaths.p259d4b80} fill="var(--fill-0, #14B8A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[41.04%_66.69%_19.58%_29.15%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3031 90.5625">
        <g id="Group">
          <path d={svgPaths.p246bdc00} fill="var(--fill-0, #14B8A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[21.35%_48.29%_19.58%_47.55%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3031 135.844">
        <g id="Group">
          <path d={svgPaths.p2ae92e00} fill="var(--fill-0, #14B8A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[27.92%_29.89%_19.58%_65.95%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3031 120.75">
        <g id="Group">
          <path d={svgPaths.p1544da20} fill="var(--fill-0, #14B8A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[54.17%_11.49%_19.58%_84.35%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3031 60.375">
        <g id="Group">
          <path d={svgPaths.p3ad8f580} fill="var(--fill-0, #14B8A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[21.35%_11.49%_19.58%_10.75%]" data-name="Group">
      <Group5 />
      <Group6 />
      <Group7 />
      <Group8 />
      <Group9 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[21.35%_11.49%_19.58%_10.75%]" data-name="Group">
      <Group4 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[21.35%_11.49%_19.58%_10.75%]" data-name="Group">
      <Group3 />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute inset-[60.73%_80.32%_19.58%_15.52%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3031 45.2812">
        <g id="Group">
          <path d={svgPaths.p3d08b000} fill="var(--fill-0, #00897B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute inset-[54.17%_61.92%_19.58%_33.92%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3031 60.375">
        <g id="Group">
          <path d={svgPaths.p3ad8f580} fill="var(--fill-0, #00897B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute inset-[47.6%_43.52%_19.58%_52.32%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3031 75.4688">
        <g id="Group">
          <path d={svgPaths.p37c64880} fill="var(--fill-0, #00897B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute inset-[41.04%_25.12%_19.58%_70.72%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3031 90.5625">
        <g id="Group">
          <path d={svgPaths.p246bdc00} fill="var(--fill-0, #00897B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute inset-[67.29%_6.72%_19.58%_89.12%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3031 30.1875">
        <g id="Group">
          <path d={svgPaths.p6d77510} fill="var(--fill-0, #00897B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[41.04%_6.72%_19.58%_15.52%]" data-name="Group">
      <Group13 />
      <Group14 />
      <Group15 />
      <Group16 />
      <Group17 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[41.04%_6.72%_19.58%_15.52%]" data-name="Group">
      <Group12 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[41.04%_6.72%_19.58%_15.52%]" data-name="Group">
      <Group11 />
    </div>
  );
}

function Surface() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Surface">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Group />
        <Frame />
        <Frame1 />
        <Group2 />
        <Group10 />
      </div>
    </div>
  );
}

function Surface1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Surface">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_42_3421)" id="Surface">
          <path d="M0 0H14V14H0V0Z" fill="var(--fill-0, #14B8A6)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_42_3421">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem() {
  return (
    <div className="content-stretch flex gap-[3px] items-center relative shrink-0" data-name="List Item">
      <Surface1 />
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] font-normal leading-[1.3] relative shrink-0 text-[#3f4753] text-[12px] text-center tracking-[0.06px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        SEK
      </p>
    </div>
  );
}

function Surface2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Surface">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_42_3340)" id="Surface">
          <path d="M0 0H14V14H0V0Z" fill="var(--fill-0, #00897B)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_42_3340">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="content-stretch flex gap-[3px] items-center relative shrink-0" data-name="List Item">
      <Surface2 />
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] font-normal leading-[1.3] relative shrink-0 text-[#3f4753] text-[12px] text-center tracking-[0.06px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        EUR
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <ListItem />
        <ListItem1 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="opacity-0 relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] whitespace-nowrap">Feb</p>
      </div>
    </div>
  );
}

function DefaultTooltipContent() {
  return (
    <div className="bg-white opacity-0 relative rounded-[10px] shrink-0 w-full" data-name="DefaultTooltipContent2">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[11px] relative size-full">
        <Paragraph1 />
      </div>
    </div>
  );
}

function TooltipBoundingBox() {
  return (
    <div className="absolute left-[229.5px] opacity-0 top-[61px] w-[41px]" data-name="TooltipBoundingBox2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <DefaultTooltipContent />
      </div>
    </div>
  );
}

function BarChart() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="BarChart">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Surface />
        <Frame3 />
        <TooltipBoundingBox />
      </div>
    </div>
  );
}

function ChartCard() {
  return (
    <div className="bg-white flex-[1_0_0] h-[326px] min-w-px relative rounded-[12px]" data-name="ChartCard">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[20px] relative size-full">
        <ChartCard1 />
        <BarChart />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] font-medium leading-[1.38] relative shrink-0 text-[#364153] text-[16px] tracking-[0.016px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Totalbelopp per leverantör – Top 10
        </p>
      </div>
    </div>
  );
}

function Text6() {
  return <div className="bg-[#14b8a6] relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Text" />;
}

function Button2() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Text6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_42_3324)" id="Icon">
          <path d={svgPaths.p3850b980} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p12950400} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p18416f00} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3c697600} id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2fd01340} id="Vector_5" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p18728540} id="Vector_6" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p9ce91e0} id="Vector_7" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p36b83880} id="Vector_8" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_42_3324">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#f3f4f6] h-[32px] relative rounded-[10px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[10px] relative size-full">
        <Icon7 />
        <Icon8 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[32px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Button2 />
        <Button3 />
        <div className="cursor-pointer relative rounded-[12px] shrink-0 size-[32px]" data-name="Icon button">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
            <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Icon">
              <div className="absolute inset-[16.67%_41.67%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 12">
                  <path d={svgPaths.p14f7fa00} fill="var(--fill-0, #3F4753)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartCard3() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="ChartCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Paragraph2 />
        <Container10 />
      </div>
    </div>
  );
}

function Group19() {
  return (
    <div className="col-1 h-[76.825px] ml-[110.67px] mt-[8.18px] relative row-1 w-[59.326px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.3255 76.8249">
        <g id="Group">
          <path d={svgPaths.p39f73d80} fill="var(--fill-0, #0D9488)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group20() {
  return (
    <div className="col-1 h-[35.895px] ml-[36.15px] mt-0 relative row-1 w-[82.512px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82.5124 35.8952">
        <g id="Group">
          <path d={svgPaths.p1b1bd470} fill="var(--fill-0, #14B8A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group21() {
  return (
    <div className="col-1 h-[63.536px] ml-[0.21px] mt-[17.18px] relative row-1 w-[48.613px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.6127 63.5357">
        <g id="Group">
          <path d={svgPaths.p1cf3d300} fill="var(--fill-0, #2DD4BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group22() {
  return (
    <div className="col-1 h-[61.584px] ml-0 mt-[81.9px] relative row-1 w-[41.458px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.4575 61.5844">
        <g id="Group">
          <path d={svgPaths.p2178e600} fill="var(--fill-0, #5EEAD4)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group23() {
  return (
    <div className="col-1 h-[41.858px] ml-[25.39px] mt-[127.77px] relative row-1 w-[54.035px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54.0349 41.8581">
        <g id="Group">
          <path d={svgPaths.p11eab480} fill="var(--fill-0, #99F6E4)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group24() {
  return (
    <div className="col-1 h-[28.925px] ml-[80.06px] mt-[141.08px] relative row-1 w-[35.172px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.1723 28.9248">
        <g id="Group">
          <path d={svgPaths.p242e7c70} fill="var(--fill-0, #0F766E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group25() {
  return (
    <div className="col-1 h-[34.652px] ml-[108.29px] mt-[128.68px] relative row-1 w-[34.979px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.9792 34.6517">
        <g id="Group">
          <path d={svgPaths.p3e1ff1c0} fill="var(--fill-0, #115E59)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group26() {
  return (
    <div className="col-1 h-[31.683px] ml-[127.63px] mt-[113.13px] relative row-1 w-[32.448px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.4481 31.6826">
        <g id="Group">
          <path d={svgPaths.p3a668b0} fill="var(--fill-0, #134E4A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group27() {
  return (
    <div className="col-1 h-[25.168px] ml-[138.95px] mt-[97.04px] relative row-1 w-[29.325px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.3252 25.1682">
        <g id="Group">
          <path d={svgPaths.p26c31fb0} fill="var(--fill-0, #1A7A6E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group28() {
  return (
    <div className="col-1 h-[12.049px] ml-[144.16px] mt-[87.09px] relative row-1 w-[25.785px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.7846 12.049">
        <g id="Group">
          <path d={svgPaths.p2c7cb080} fill="var(--fill-0, #3FB8A8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group18() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Group">
      <Group19 />
      <Group20 />
      <Group21 />
      <Group22 />
      <Group23 />
      <Group24 />
      <Group25 />
      <Group26 />
      <Group27 />
      <Group28 />
    </div>
  );
}

function Pie() {
  return (
    <div className="relative shrink-0" data-name="Pie">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center leading-[0] px-[30px] py-[11px] relative size-full">
        <Group18 />
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['IBM_Plex_Sans:Medium',sans-serif] font-medium left-1/2 text-[0px] text-black text-center top-[calc(50%-19px)] tracking-[0.016px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          <span className="leading-[1.38] text-[16px]">
            6,85 Mkr
            <br aria-hidden />
          </span>
          <span className="font-['IBM_Plex_Sans:Regular',sans-serif] font-normal leading-[1.3] text-[#505357] text-[12px] tracking-[0.06px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Totalt
          </span>
        </p>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_42_3352)" id="Icon">
          <path d="M0 0H14V14H0V0Z" fill="var(--fill-0, #0D9488)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_42_3352">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[1.48] min-w-px relative text-[#3f4753] text-[14px] tracking-[0.014px] whitespace-nowrap" data-name="Category">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>{`Solent `}</p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        1 302 001 kr
      </p>
    </div>
  );
}

function ListItemMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Icon9 />
        <Category />
      </div>
    </div>
  );
}

function Surface3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Surface">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_42_3421)" id="Surface">
          <path d="M0 0H14V14H0V0Z" fill="var(--fill-0, #14B8A6)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_42_3421">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[1.48] min-w-px relative text-[#3f4753] text-[14px] tracking-[0.014px] whitespace-nowrap" data-name="Category">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>{`Jämtkraft `}</p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        1 176 028 kr
      </p>
    </div>
  );
}

function ListItemMargin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Surface3 />
        <Category1 />
      </div>
    </div>
  );
}

function Surface4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Surface">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_42_3306)" id="Surface">
          <path d="M0 0H14V14H0V0Z" fill="var(--fill-0, #2DD4BF)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_42_3306">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[1.48] min-w-px relative text-[#3f4753] text-[14px] tracking-[0.014px] whitespace-nowrap" data-name="Category">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Nyman
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        983 237 kr
      </p>
    </div>
  );
}

function ListItemMargin2() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Surface4 />
        <Category2 />
      </div>
    </div>
  );
}

function Surface5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Surface">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_42_3291)" id="Surface">
          <path d="M0 0H14V14H0V0Z" fill="var(--fill-0, #5EEAD4)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_42_3291">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[1.48] min-w-px relative text-[#3f4753] text-[14px] tracking-[0.014px] whitespace-nowrap" data-name="Category">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Falun
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        917 431 kr
      </p>
    </div>
  );
}

function ListItemMargin3() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Surface5 />
        <Category3 />
      </div>
    </div>
  );
}

function Surface6() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Surface">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_42_3318)" id="Surface">
          <path d="M0 0H14V14H0V0Z" fill="var(--fill-0, #99F6E4)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_42_3318">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[1.48] min-w-px relative text-[#3f4753] text-[14px] tracking-[0.014px] whitespace-nowrap" data-name="Category">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Peab
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>{` 789 262 kr`}</p>
    </div>
  );
}

function ListItemMargin4() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Surface6 />
        <Category4 />
      </div>
    </div>
  );
}

function Surface7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Surface">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_42_3278)" id="Surface">
          <path d="M0 0H14V14H0V0Z" fill="var(--fill-0, #0F766E)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_42_3278">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[1.48] min-w-px relative text-[#3f4753] text-[14px] tracking-[0.014px] whitespace-nowrap" data-name="Category">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Fyrfältet
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>{` 486 586 kr`}</p>
    </div>
  );
}

function ListItemMargin5() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Surface7 />
        <Category5 />
      </div>
    </div>
  );
}

function Surface8() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Surface">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_42_3284)" id="Surface">
          <path d="M0 0H14V14H0V0Z" fill="var(--fill-0, #115E59)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_42_3284">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category6() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[1.48] min-w-px relative text-[#3f4753] text-[14px] tracking-[0.014px] whitespace-nowrap" data-name="Category">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Fastec
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        411 474 kr
      </p>
    </div>
  );
}

function ListItemMargin6() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Surface8 />
        <Category6 />
      </div>
    </div>
  );
}

function Surface9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Surface">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_42_3388)" id="Surface">
          <path d="M0 0H14V14H0V0Z" fill="var(--fill-0, #134E4A)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_42_3388">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category7() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[1.48] min-w-px relative text-[#3f4753] text-[14px] tracking-[0.014px] whitespace-nowrap" data-name="Category">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Totalentr
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        337 532 kr
      </p>
    </div>
  );
}

function ListItemMargin7() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Surface9 />
        <Category7 />
      </div>
    </div>
  );
}

function Surface10() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Surface">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_42_3303)" id="Surface">
          <path d="M0 0H14V14H0V0Z" fill="var(--fill-0, #1A7A6E)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_42_3303">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category8() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[1.48] min-w-px relative text-[#3f4753] text-[14px] tracking-[0.014px] whitespace-nowrap" data-name="Category">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Fastoc
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        289 607 kr
      </p>
    </div>
  );
}

function ListItemMargin8() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Surface10 />
        <Category8 />
      </div>
    </div>
  );
}

function Surface11() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Surface">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_42_3281)" id="Surface">
          <path d="M0 0H14V14H0V0Z" fill="var(--fill-0, #3FB8A8)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_42_3281">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Category9() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[1.48] min-w-px relative text-[#3f4753] text-[14px] tracking-[0.014px] whitespace-nowrap" data-name="Category">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        CKC
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        152 577 kr
      </p>
    </div>
  );
}

function ListItemMargin9() {
  return (
    <div className="relative shrink-0 w-full" data-name="List Item:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Surface11 />
        <Category9 />
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[8px] relative size-full">
        <ListItemMargin />
        <ListItemMargin1 />
        <ListItemMargin2 />
        <ListItemMargin3 />
        <ListItemMargin4 />
        <ListItemMargin5 />
        <ListItemMargin6 />
        <ListItemMargin7 />
        <ListItemMargin8 />
        <ListItemMargin9 />
      </div>
    </div>
  );
}

function PieChart() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="PieChart">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Pie />
        <List />
      </div>
    </div>
  );
}

function ChartCard2() {
  return (
    <div className="bg-white flex-[1_0_0] h-[326px] min-w-px relative rounded-[12px]" data-name="ChartCard">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[20px] relative size-full">
        <ChartCard3 />
        <PieChart />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <ChartCard />
      <ChartCard2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] font-medium leading-[1.38] relative shrink-0 text-[#364153] text-[16px] tracking-[0.016px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          10 största kostnader – Artikelnivå
        </p>
      </div>
    </div>
  );
}

function Text7() {
  return <div className="bg-[#14b8a6] relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Text" />;
}

function Button4() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Text7 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M7.58333 9.91667V5.25" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M10.5 9.91667V2.91667" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p8832196} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 9.91667V8.16667" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#f3f4f6] h-[32px] relative rounded-[10px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[10px] relative size-full">
        <Icon10 />
        <Icon11 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[32px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Button4 />
        <Button5 />
        <div className="cursor-pointer relative rounded-[12px] shrink-0 size-[32px]" data-name="Icon button">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
            <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Icon">
              <div className="absolute inset-[16.67%_41.67%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 12">
                  <path d={svgPaths.p14f7fa00} fill="var(--fill-0, #3F4753)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartCard5() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="ChartCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Paragraph3 />
        <Container11 />
      </div>
    </div>
  );
}

function Guidelines() {
  return (
    <div className="absolute inset-[0_0.08%_9.76%_0]" data-name="Guidelines">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 561.573 222">
        <g id="Guidelines">
          <path d="M0.5 0V222" id="Vector" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
          <path d="M140.643 0V222" id="Vector_2" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
          <path d="M280.787 0V222" id="Vector_3" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
          <path d="M420.93 0V222" id="Vector_4" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
          <path d="M561.073 0V222" id="Vector_5" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
        </g>
      </svg>
    </div>
  );
}

function List1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] font-normal h-[215px] items-end justify-between leading-[1.28] max-w-[120px] min-w-px relative text-[#393c40] text-[11px] text-right tracking-[0.066px]" data-name="List">
      <p className="h-[15.495px] relative shrink-0 w-[79px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Fjärrvärme kWh
      </p>
      <p className="h-[15.495px] relative shrink-0 w-[58px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Elkraft kWh
      </p>
      <p className="h-[15.495px] relative shrink-0 w-[84px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Grävmaskin hyra
      </p>
      <p className="h-[15.495px] relative shrink-0 w-[68px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Armeringsnät
      </p>
      <p className="h-[15.495px] relative shrink-0 w-[109px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Betongblandare 350L
      </p>
      <p className="h-[15.495px] relative shrink-0 w-[80px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Isolering 50mm
      </p>
      <p className="h-[15.495px] relative shrink-0 w-[53px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Gipsskivor
      </p>
      <p className="h-[15.495px] relative shrink-0 w-[85px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Stålbalk HEB200
      </p>
    </div>
  );
}

function Bars() {
  return (
    <div className="flex-[1_0_0] h-[221.4px] min-w-px relative" data-name="Bars">
      <div className="absolute inset-[0_36.84%_90.74%_0]" data-name="bar">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 274.737 20.5">
          <path d={svgPaths.p2bed3100} fill="var(--fill-0, #14B8A6)" id="bar" />
        </svg>
      </div>
      <div className="absolute inset-[12.96%_24.21%_77.78%_0]" data-name="bar">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 329.684 20.5">
          <path d={svgPaths.pc959d00} fill="var(--fill-0, #14B8A6)" id="bar" />
        </svg>
      </div>
      <div className="absolute inset-[25.93%_31.58%_64.81%_0]" data-name="bar">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 297.632 20.5">
          <path d={svgPaths.pc23e000} fill="var(--fill-0, #14B8A6)" id="bar" />
        </svg>
      </div>
      <div className="absolute inset-[38.89%_28.42%_51.85%_0]" data-name="bar">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 311.368 20.5">
          <path d={svgPaths.p3a4cb480} fill="var(--fill-0, #14B8A6)" id="bar" />
        </svg>
      </div>
      <div className="absolute inset-[51.85%_21.05%_38.89%_0]" data-name="bar">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 343.421 20.5">
          <path d={svgPaths.p2ff68e70} fill="var(--fill-0, #14B8A6)" id="bar" />
        </svg>
      </div>
      <div className="absolute inset-[64.81%_10.53%_25.93%_0]" data-name="bar">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 389.21 20.5">
          <path d={svgPaths.p9eb2c80} fill="var(--fill-0, #14B8A6)" id="bar" />
        </svg>
      </div>
      <div className="absolute inset-[77.78%_5.26%_12.96%_0]" data-name="bar">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 412.105 20.5">
          <path d={svgPaths.p24272a00} fill="var(--fill-0, #14B8A6)" id="bar" />
        </svg>
      </div>
      <div className="absolute inset-[90.74%_0_0_0]" data-name="bar">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 435 20.5">
          <path d={svgPaths.p24dc3d40} fill="var(--fill-0, #14B8A6)" id="bar" />
        </svg>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <List1 />
        <Bars />
      </div>
    </div>
  );
}

function Ruler() {
  return (
    <div className="h-[14.35px] relative shrink-0 w-full" data-name="Ruler">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="[word-break:break-word] bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-['IBM_Plex_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[1.28] pl-[112.5px] relative size-full text-[#505357] text-[11px] text-center tracking-[0.066px] whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
            0
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
            25
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
            50
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
            75
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
            100
          </p>
        </div>
      </div>
    </div>
  );
}

function BarChart1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="BarChart">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Guidelines />
        <Content />
        <Ruler />
      </div>
    </div>
  );
}

function ChartCard4() {
  return (
    <div className="bg-white flex-[1_0_0] h-[326px] min-w-px relative rounded-[12px]" data-name="ChartCard">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[20px] relative size-full">
        <ChartCard5 />
        <BarChart1 />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[20px] relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] font-medium leading-[1.38] relative shrink-0 text-[#364153] text-[16px] tracking-[0.016px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Kommande per förfallodag
        </p>
      </div>
    </div>
  );
}

function Text8() {
  return <div className="bg-[#a78bfa] relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Text" />;
}

function Button6() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Text8 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p8832196} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p17a27300} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#f3f4f6] h-[32px] relative rounded-[10px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[10px] relative size-full">
        <Icon12 />
        <Icon13 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[32px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Button6 />
        <Button7 />
        <div className="cursor-pointer relative rounded-[12px] shrink-0 size-[32px]" data-name="Icon button">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
            <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Icon">
              <div className="absolute inset-[16.67%_41.67%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 12">
                  <path d={svgPaths.p14f7fa00} fill="var(--fill-0, #3F4753)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartCard7() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="ChartCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Paragraph4 />
        <Container12 />
      </div>
    </div>
  );
}

function Guidelines1() {
  return (
    <div className="-translate-y-1/2 absolute h-[207px] left-[4.99%] right-[1.25%] top-[calc(50%-17.5px)]" data-name="Guidelines">
      <div className="absolute inset-[-0.24%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 526 208">
          <g id="Guidelines">
            <path d="M0 0.5H526" id="Vector" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
            <path d="M0 52.25H526" id="Vector_2" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
            <path d="M0 104H526" id="Vector_3" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
            <path d="M0 155.75H526" id="Vector_4" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
            <path d="M0 207.5H526" id="Vector_5" stroke="var(--stroke-0, #F0F0F0)" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Y() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[216px] items-center justify-between leading-[normal] not-italic relative shrink-0 text-[#9ca3af] text-[10px] text-right w-[15px]" data-name="Y">
      <p className="relative shrink-0 w-full">80</p>
      <p className="relative shrink-0 w-full">60</p>
      <p className="relative shrink-0 w-full">40</p>
      <p className="relative shrink-0 w-full">20</p>
      <p className="relative shrink-0 w-full">0</p>
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents inset-[14.03%_0.5%_0.94%_0.5%]" data-name="Group">
      <div className="absolute inset-[14.03%_0.5%_0.94%_0.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-29.75px] mask-size-[525.727px_212px]" style={{ maskImage: `url("${imgVector}")` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 525.727 180.25">
          <path d={svgPaths.p39a07300} fill="url(#paint0_linear_42_3274)" fillOpacity="0.6" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_42_3274" x1="0" x2="0" y1="0" y2="180.25">
              <stop stopColor="#A78BFA" stopOpacity="0.3" />
              <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[14.03%_0.5%_31.31%_0.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-29.75px] mask-size-[525.727px_212px]" style={{ maskImage: `url("${imgVector}")` }} data-name="Vector">
        <div className="absolute inset-[-0.86%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 525.931 117.875">
            <path d={svgPaths.p2c034200} id="Vector" stroke="var(--stroke-0, #A78BFA)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[14.03%_0.5%_0.94%_0.5%]" data-name="Group">
      <Group31 />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[0_0.5%]" data-name="Clip path group">
      <Group30 />
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents inset-[0_0.5%]" data-name="Group">
      <ClipPathGroup />
    </div>
  );
}

function Group32() {
  return (
    <div className="-translate-y-1/2 absolute contents left-0 right-[-0.19%] top-[calc(50%-18px)]" data-name="Group">
      <div className="-translate-y-1/2 absolute aspect-[6/6] left-0 right-[98.87%] top-[calc(50%-63px)]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <path d={svgPaths.p969ae00} fill="var(--fill-0, #A78BFA)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
      <div className="-translate-y-1/2 absolute aspect-[6/6] left-[16.57%] right-[82.3%] top-[calc(50%-71px)]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <path d={svgPaths.p969ae00} fill="var(--fill-0, #A78BFA)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
      <div className="-translate-y-1/2 absolute aspect-[6/6] left-[32.96%] right-[65.91%] top-[calc(50%-38px)]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <path d={svgPaths.p969ae00} fill="var(--fill-0, #A78BFA)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
      <div className="-translate-y-1/2 absolute aspect-[6/6] left-[49.53%] right-[49.34%] top-[calc(50%+40px)]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <path d={svgPaths.p969ae00} fill="var(--fill-0, #A78BFA)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
      <div className="-translate-y-1/2 absolute aspect-[6/6] left-[65.91%] right-[32.96%] top-[calc(50%-76px)]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <path d={svgPaths.p969ae00} fill="var(--fill-0, #A78BFA)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
      <div className="-translate-y-1/2 absolute aspect-[6/6] left-[82.49%] right-[16.38%] top-[calc(50%-12px)]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <path d={svgPaths.p969ae00} fill="var(--fill-0, #A78BFA)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
      <div className="-translate-y-1/2 absolute aspect-[6/6] left-[99.06%] right-[-0.19%] top-[calc(50%+1px)]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <path d={svgPaths.p969ae00} fill="var(--fill-0, #A78BFA)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Chart() {
  return (
    <div className="flex-[1_0_0] h-[212px] min-w-px relative" data-name="Chart">
      <Group29 />
      <Group32 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[5px] items-start relative shrink-0 w-full">
      <Y />
      <Chart />
    </div>
  );
}

function X() {
  return (
    <div className="relative shrink-0 w-full" data-name="X">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="[word-break:break-word] content-stretch flex font-['IBM_Plex_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[1.28] px-[18px] relative size-full text-[#6b7280] text-[11px] text-center tracking-[0.066px] whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
            1
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
            6
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
            11
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
            16
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
            21
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
            26
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
            31
          </p>
        </div>
      </div>
    </div>
  );
}

function Surface12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Surface">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[5px] relative size-full">
          <Frame6 />
          <X />
        </div>
      </div>
    </div>
  );
}

function AreaChart() {
  return (
    <div className="h-[252px] relative shrink-0 w-full" data-name="AreaChart">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Guidelines1 />
        <Surface12 />
      </div>
    </div>
  );
}

function ChartCard6() {
  return (
    <div className="bg-white flex-[1_0_0] h-[326px] min-w-px relative rounded-[12px]" data-name="ChartCard">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[20px] relative size-full">
        <ChartCard7 />
        <AreaChart />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <ChartCard4 />
      <ChartCard6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Container4 />
        <Frame7 />
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex-[880_0_0] min-h-px relative w-full" data-name="Dashboard">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-center px-[32px] py-[24px] relative size-full">
          <Header />
          <ContainerMargin />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[952px] items-start left-0 overflow-clip pl-[64px] right-0 top-0" data-name="Container">
      <Dashboard />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1fc96a00} id="Vector" stroke="var(--stroke-0, #14B8A6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p33089d00} id="Vector_2" stroke="var(--stroke-0, #14B8A6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p49cfa80} id="Vector_3" stroke="var(--stroke-0, #14B8A6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1cfbf300} id="Vector_4" stroke="var(--stroke-0, #14B8A6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[rgba(20,184,166,0.15)] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Icon14 />
        </div>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] relative size-full">
        <Button8 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M15 16.6667V8.33333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 16.6667V3.33333" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M5 16.6667V11.6667" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Icon15 />
        </div>
      </div>
    </div>
  );
}

function ButtonMargin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] relative size-full">
        <Button9 />
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pc3ae900} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Icon16 />
        </div>
      </div>
    </div>
  );
}

function ButtonMargin2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] relative size-full">
        <Button10 />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.ped54800} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3b27f100} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Icon17 />
        </div>
      </div>
    </div>
  );
}

function ButtonMargin3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] relative size-full">
        <Button11 />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-white bottom-0 content-stretch flex flex-col items-start left-0 overflow-clip py-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[64px]" data-name="Sidebar">
      <ButtonMargin />
      <ButtonMargin1 />
      <ButtonMargin2 />
      <ButtonMargin3 />
    </div>
  );
}

export default function FinancialDashboard() {
  return (
    <div className="bg-[#f0f4f9] relative size-full" data-name="Financial Dashboard 2">
      <Container />
      <Sidebar />
    </div>
  );
}