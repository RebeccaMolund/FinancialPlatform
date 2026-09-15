import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  Download,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  BookmarkPlus,
  CheckCircle2,
  LayoutDashboard,
  CornerDownLeft,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  parseISO,
} from "date-fns";
import { sv } from "date-fns/locale";
import type { MockRow } from "../../types/invoice";
import { getInvoices } from "../../services/invoices";

// ─── Filter state types ───────────────────────────────────────────────────────

interface DateRange {
  start: Date | null;
  end: Date | null;
}
interface NumRange {
  from: string;
  to: string;
}
interface OrderVal {
  mode: "befintligt" | "ej" | null;
  search: string;
  selected: string[];
}

type FilterVal = string | string[] | NumRange | DateRange | OrderVal | null;

// ─── Filter application ───────────────────────────────────────────────────────

function applyFilters(
  rows: MockRow[],
  fv: Record<string, FilterVal>,
): MockRow[] {
  return rows.filter((row) => {
    // text search filters
    const textMatch = (field: string, val: FilterVal) => {
      if (!val || typeof val !== "string" || !val.trim()) return true;
      return field.toLowerCase().includes(val.toLowerCase());
    };
    if (!textMatch(row.fakturanummer, fv.fakturanummer)) return false;
    if (!textMatch(row.projektkod, fv.projektkod)) return false;
    if (!textMatch(row.leverantor, fv.leverantorsadress)) return false;
    if (!textMatch(row.mottagare, fv.kontaktperson)) return false;
    if (!textMatch(row.mottagare, fv.koparnref)) return false;
    if (!textMatch(row.fakturanummer, fv.referensnummer)) return false;

    // multiselect / checklist filters
    const listMatch = (field: string, val: FilterVal) => {
      if (!val || !Array.isArray(val) || val.length === 0) return true;
      return val.includes(field);
    };
    if (!listMatch(row.leverantor, fv.leverantor)) return false;
    if (!listMatch(row.valuta, fv.valuta)) return false;
    if (!listMatch(row.mottagare, fv.mottagare)) return false;
    if (!listMatch(row.kostnadsstalle, fv.kostnadsstalle)) return false;
    if (!listMatch(row.fakturaformat, fv.fakturaformat)) return false;
    if (!listMatch(row.betalningsvillkor, fv.betalningsvillkor)) return false;
    if (!listMatch(row.avdelning, fv.avdelning)) return false;
    if (!listMatch(row.betalningsmetod, fv.betalningsmetod)) return false;

    // numeric range filters
    const numMatch = (field: number, val: FilterVal) => {
      if (!val || typeof val !== "object" || !("from" in val)) return true;
      const r = val as NumRange;
      if (r.from.trim() && field < parseFloat(r.from)) return false;
      if (r.to.trim() && field > parseFloat(r.to)) return false;
      return true;
    };
    if (!numMatch(row.radbelopp, fv.totalbelopp)) return false;
    if (!numMatch(row.momsbelopp, fv.momsbelopp)) return false;
    if (!numMatch(row.radbelopp, fv.kostnad)) return false;
    if (!numMatch(row.rabatprocent, fv.rabatprocent)) return false;
    if (!numMatch(row.antal, fv.antalrader)) return false;
    if (!numMatch(row.fraktkostnad, fv.fraktkostnad)) return false;
    if (!numMatch(row.styckpris, fv.valutakurs)) return false;

    // date range filters
    const dateMatch = (field: string, val: FilterVal) => {
      if (!val || typeof val !== "object" || !("start" in val)) return true;
      const dr = val as DateRange;
      const d = parseISO(field);
      if (dr.start && d < dr.start) return false;
      if (dr.end && d > dr.end) return false;
      return true;
    };
    if (!dateMatch(row.forfallodatum, fv.forfallodatum)) return false;
    if (!dateMatch(row.fakturadatum, fv.fakturadatum)) return false;
    if (!dateMatch(row.fakturadatum, fv.godkannandedatum)) return false;

    // ordernummer filter
    if (
      fv.ordernummer &&
      typeof fv.ordernummer === "object" &&
      "mode" in fv.ordernummer
    ) {
      const ov = fv.ordernummer as OrderVal;
      if (ov.mode === "befintligt" && !row.ordernummer) return false;
      if (ov.mode === "ej" && row.ordernummer) return false;
      if (
        ov.selected.length > 0 &&
        (!row.ordernummer || !ov.selected.includes(row.ordernummer))
      )
        return false;
    }

    // befintlighet (ordernummer presence)
    if (fv.befintlighet) {
      if (fv.befintlighet === "Befintligt" && !row.ordernummer) return false;
      if (fv.befintlighet === "Ej befintligt" && row.ordernummer) return false;
    }

    return true;
  });
}

// count active values for a filter pill badge
function countActive(val: FilterVal): number {
  if (!val) return 0;
  if (typeof val === "string") return val.trim() ? 1 : 0;
  if (Array.isArray(val)) return val.length;
  if ("from" in (val as any) && "to" in (val as any)) {
    const nr = val as NumRange;
    return (nr.from.trim() ? 1 : 0) + (nr.to.trim() ? 1 : 0);
  }
  if ("start" in (val as any)) {
    const dr = val as DateRange;
    return (dr.start ? 1 : 0) + (dr.end ? 1 : 0);
  }
  if ("mode" in (val as any)) {
    const ov = val as OrderVal;
    return (ov.mode ? 1 : 0) + ov.selected.length;
  }
  return 0;
}

// ─── AI scenarios ─────────────────────────────────────────────────────────────

interface Insight {
  type: "success" | "warning" | "info";
  text: string;
}
interface Scenario {
  query: string;
  headline: string;
  summary: string;
  insights: Insight[];
  chart1Title: string;
  chart1Color: string;
  chart2Title: string;
  chart2Color: string;
  chips: string[];
  preFilter?: Partial<Record<string, FilterVal>>;
}

const SCENARIOS: Scenario[] = [
  {
    query: "energi",
    headline: "Energikostnader – analys för perioden",
    summary:
      "Totala energikostnader uppgår till 704 985 kr. Fjärrvärme är den dominerande posten (36 %) följt av elkraft. Sundsvall Energi AB är enskilt störst och står för 41 % av energiinköpen.",
    insights: [
      {
        type: "warning",
        text: "Fjärrvärmepriset har stigit 12 % jämfört med samma period förra året.",
      },
      {
        type: "success",
        text: "Elkraftskostnaden minskade 7 % tack vare ny avtalsmodell med Jämtkraft.",
      },
      {
        type: "info",
        text: "3 fakturor från Sundsvall Energi AB saknar projektkod och kan inte allokeras.",
      },
    ],
    chart1Title: "Energikostnad per leverantör (kr)",
    chart1Color: "#0f9f96",
    chart2Title: "Energislag – antal enheter",
    chart2Color: "#818cf8",
    chips: ["Spend historiskt", "Enheter per kategori"],
    preFilter: { kategori: ["Energi"] } as any,
  },
  {
    query: "peab",
    headline: "Leverantörsanalys – Peab Sverige AB",
    summary:
      "Peab Sverige AB är er 5:e största leverantör med totala inköp på 251 900 kr. Maskinhyra dominerar (76 %). Genomsnittlig betalningstid är 28 dagar mot avtalade 30.",
    insights: [
      {
        type: "success",
        text: "Peab levererar i tid i 94 % av fallen – bäst av era maskinhyrleverantörer.",
      },
      {
        type: "warning",
        text: "Styckpriset på grävmaskiner ökade 8 % i senaste avtalsjusteringen.",
      },
      {
        type: "info",
        text: "Möjlig volymrabatt på 3 % om månatliga beställningar överstiger 85 000 kr.",
      },
    ],
    chart1Title: "Peab – kostnad per artikel (kr)",
    chart1Color: "#0f9f96",
    chart2Title: "Peab – fördelning per kategori",
    chart2Color: "#f59e0b",
    chips: ["Spend historiskt", "Top leverantörer"],
    preFilter: { leverantor: ["Peab Sverige AB"] },
  },
  {
    query: "material",
    headline: "Materialkostnader – kategorianalys",
    summary:
      "Materialkostnader är er enskilt största inköpskategori och uppgår till 1 101 200 kr. Stål och betong dominerar. Prisutvecklingen har stabiliserats men är 6 % över föregående år.",
    insights: [
      {
        type: "warning",
        text: "Stålpriserna har ökat 14 % YoY – se över möjligheter till längre prisavtal.",
      },
      {
        type: "success",
        text: "Betongpriset är stabilt och ligger 2 % under indexutvecklingen.",
      },
      {
        type: "info",
        text: "Armeringsnät köps från 4 leverantörer – konsolidering kan ge bättre pris.",
      },
    ],
    chart1Title: "Materialkostnad per leverantör (kr)",
    chart1Color: "#0f9f96",
    chart2Title: "Material – antal enheter per artikel",
    chart2Color: "#818cf8",
    chips: ["Medelpris per produkt", "Top 3 billigaste lev."],
    preFilter: { kategori: ["Material"] } as any,
  },
  {
    query: "fakturor",
    headline: "Fakturastatus – förfalloanalys",
    summary:
      "Totalt 25 fakturor registrerade. 8 fakturor förfaller inom 30 dagar. Andelen fakturor betalda i tid är 91 %, upp från 87 % föregående period.",
    insights: [
      {
        type: "warning",
        text: "3 fakturor har redan passerat förfallodatum – risk för dröjsmålsränta.",
      },
      {
        type: "info",
        text: "8 fakturor förfaller inom 30 dagar med ett sammanlagt värde på 476 300 kr.",
      },
      {
        type: "success",
        text: "Andelen e-fakturor ökade till 44 % – minskar manuell hantering.",
      },
    ],
    chart1Title: "Fakturor per fakturaformat",
    chart1Color: "#a78bfa",
    chart2Title: "Fakturor per leverantör (antal)",
    chart2Color: "#0f9f96",
    chips: ["Spend historiskt", "Enheter per kategori"],
    preFilter: {},
  },
  {
    query: "leverantörer",
    headline: "Leverantörsöversikt – alla leverantörer",
    summary:
      "Ni arbetar med 7 aktiva leverantörer i denna period. Fastec AB är störst sett till antal fakturor. Peab och Fastec tillsammans utgör 40 % av totalt inköpsvärde.",
    insights: [
      {
        type: "info",
        text: "Fastec AB har flest fakturor (5 st) och bred kategoritäckning.",
      },
      {
        type: "warning",
        text: "Colv Sverige AB fakturerar enbart i EUR – valutarisk bör bevakas.",
      },
      {
        type: "success",
        text: "Nyman AB förbättrade sin leveransprecision till 97 % denna period.",
      },
    ],
    chart1Title: "Inköpsvärde per leverantör (kr)",
    chart1Color: "#0f9f96",
    chart2Title: "Antal fakturor per leverantör",
    chart2Color: "#818cf8",
    chips: ["Top leverantörer", "Spend historiskt"],
    preFilter: {},
  },
  {
    query: "kostnad",
    headline: "Kostnadsöversikt – alla kategorier",
    summary:
      "Totalt inköpsvärde för perioden är 2 318 735 kr. Material och energi dominerar. Maskinhyra överskrider budget med 8 % drivet av ökad projektaktivitet.",
    insights: [
      {
        type: "info",
        text: "Totalt inköpsvärde: 2 318 735 kr fördelat på 25 fakturor och 7 leverantörer.",
      },
      { type: "warning", text: "Maskinhyra överskrider budget med 8,4 %." },
      {
        type: "success",
        text: "IT-kostnader minskade 11 % efter omförhandling av licensavtal.",
      },
    ],
    chart1Title: "Kostnad per kategori (kr)",
    chart1Color: "#0f9f96",
    chart2Title: "Kostnad per leverantör (kr)",
    chart2Color: "#818cf8",
    chips: ["Spend historiskt", "Enheter per kategori"],
    preFilter: {},
  },
];

function matchScenario(q: string): Scenario {
  const ql = q.toLowerCase();
  if (/energi|el\b|värme|fjärr|kwh/.test(ql)) return SCENARIOS[0];
  if (/peab/.test(ql)) return SCENARIOS[1];
  if (/material|betong|stål|gips|armer|isoler/.test(ql)) return SCENARIOS[2];
  if (/faktura|fakturor|förfall|betalning|försen/.test(ql)) return SCENARIOS[3];
  if (/leverantör|leverantörer|solent|jämtkraft|nyman/.test(ql))
    return SCENARIOS[4];
  return SCENARIOS[5];
}

// ─── Computed charts from rows ────────────────────────────────────────────────

function computeCharts(rows: MockRow[], scenario: Scenario | null) {
  if (scenario) {
    // group by leverantör for chart1
    const byLev = Object.entries(
      rows.reduce<Record<string, number>>((acc, r) => {
        acc[r.leverantor] = (acc[r.leverantor] || 0) + r.radbelopp;
        return acc;
      }, {}),
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    // group by kategori for chart2
    const byKat = Object.entries(
      rows.reduce<Record<string, number>>((acc, r) => {
        acc[r.kategori] = (acc[r.kategori] || 0) + r.antal;
        return acc;
      }, {}),
    ).sort((a, b) => b[1] - a[1]);

    return {
      chart1: byLev.map(([k, v]) => ({ k: k.split(" ")[0], v })),
      chart2: byKat.map(([k, v]) => ({ k, v })),
    };
  }
  // default: cost by category + units by supplier
  const byCat = Object.entries(
    rows.reduce<Record<string, number>>((acc, r) => {
      acc[r.kategori] = (acc[r.kategori] || 0) + r.radbelopp;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const byLev = Object.entries(
    rows.reduce<Record<string, number>>((acc, r) => {
      acc[r.leverantor] = (acc[r.leverantor] || 0) + r.antal;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return {
    chart1: byCat.map(([k, v]) => ({ k, v })),
    chart2: byLev.map(([k, v]) => ({ k: k.split(" ")[0], v })),
  };
}

// ─── Filter definitions ───────────────────────────────────────────────────────

type FilterType =
  | "text"
  | "daterange"
  | "numrange"
  | "multiselect"
  | "checklist"
  | "ordernummer"
  | "toggle"
  | "avsnitt";
interface FilterDef {
  id: string;
  label: string;
  type: FilterType;
}

const FILTERS: FilterDef[] = [
  { id: "fakturanummer", label: "Fakturanummer", type: "text" },
  { id: "ordernummer", label: "Ordernummer", type: "ordernummer" },
  { id: "totalbelopp", label: "Totalt belopp", type: "numrange" },
  { id: "koparnref", label: "Köparens referens", type: "text" },
  { id: "momsbelopp", label: "Totalt momsbelopp", type: "numrange" },
  { id: "valuta", label: "Valuta", type: "checklist" },
  { id: "leverantor", label: "Leverantör", type: "multiselect" },
  { id: "mottagare", label: "Mottagare", type: "multiselect" },
  { id: "forfallodatum", label: "Förfallodatum", type: "daterange" },
  { id: "fakturadatum", label: "Fakturadatum", type: "daterange" },
  { id: "kostnadsstalle", label: "Kostnadsställe", type: "multiselect" },
  { id: "fakturaformat", label: "Fakturaformat", type: "checklist" },
  { id: "kostnad", label: "Kostnad", type: "numrange" },
  { id: "befintlighet", label: "Befintlighet", type: "toggle" },
  { id: "betalningsvillkor", label: "Betalningsvillkor", type: "multiselect" },
  { id: "projektkod", label: "Projektkod", type: "text" },
  { id: "leverantorsadress", label: "Leverantörsadress", type: "text" },
  { id: "kontaktperson", label: "Kontaktperson", type: "text" },
  { id: "godkannandedatum", label: "Godkännandedatum", type: "daterange" },
  { id: "valutakurs", label: "Valutakurs", type: "numrange" },
  { id: "betalningsmetod", label: "Betalningsmetod", type: "checklist" },
  { id: "avdelning", label: "Avdelning", type: "multiselect" },
  { id: "referensnummer", label: "Referensnummer", type: "text" },
  { id: "naturforman", label: "Naturförmån", type: "checklist" },
  { id: "momsregnr", label: "Momsregistreringsnummer", type: "text" },
  { id: "rabatprocent", label: "Rabatprocent", type: "numrange" },
  { id: "antalrader", label: "Antal rader", type: "numrange" },
  { id: "fraktkostnad", label: "Fraktkostnad", type: "numrange" },
  { id: "internkommentar", label: "Intern kommentar", type: "text" },
  { id: "avsnitt", label: "Avsnitt", type: "avsnitt" },
];

const OPTIONS: Record<string, string[]> = {
  leverantor: [
    "Peab Sverige AB",
    "CKC AB",
    "Fastec AB",
    "Sundsvall Energi AB",
    "Fyrfasen Energi AB",
    "Colv Sverige AB",
    "Lambertinson",
    "Nyman AB",
    "Jämtkraft AB",
  ],
  mottagare: [
    "Bygg & Betong AB",
    "Henrik Olsson",
    "Anna Berg",
    "Bojan Byggmästare",
    "S & Verksamheten AB",
  ],
  kostnadsstalle: [
    "Marknadsforing B2B",
    "Projektkostn. Projekt Orion",
    "Ekonomi & Redovisning",
    "Drift, Region Väst",
    "Produktionsavdelning, Bygg",
  ],
  betalningsvillkor: [
    "30 dagar netto",
    "60 dagar netto",
    "Förskottsbetalning",
    "Delbetalning",
  ],
  avdelning: ["Ekonomi", "Inköp", "Produktion", "IT", "HR", "Marknad"],
  valuta: ["SEK", "EUR", "USD", "GBP", "JPY"],
  fakturaformat: ["PDF", "E-faktura (Peppol)", "EDI", "Papper"],
  betalningsmetod: ["Banköverföring", "Autogiro", "Kreditkort", "Bankgiro"],
  naturforman: ["Bil", "Bostad", "Måltid", "Övrigt"],
  avsnitt: ["Antal", "Styckpris", "Radbelopp", "Rabatt", "Momsprocent"],
};

// ─── Shared UI helpers ────────────────────────────────────────────────────────

function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  cb: () => void,
) {
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, cb]);
}

function CheckItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className="flex items-center justify-between w-full py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-sm text-foreground"
    >
      <span>{label}</span>
      <span
        className={`size-4 rounded flex items-center justify-center border shrink-0 transition-colors ${checked ? "bg-[#0f9f96] border-[#0f9f96]" : "border-border"}`}
      >
        {checked && <Check className="size-3 text-white" strokeWidth={3} />}
      </span>
    </button>
  );
}

// ─── Mini calendar (controlled via onRangeChange) ─────────────────────────────

function MiniCalendar({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (r: DateRange) => void;
}) {
  const [view, setView] = useState(new Date());
  const [phase, setPhase] = useState<"start" | "end">("start");
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(view), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(view), { weekStartsOn: 1 }),
  });

  function pick(day: Date) {
    if (phase === "start") {
      onChange({ start: day, end: null });
      setPhase("end");
    } else {
      const s = value.start!;
      onChange(day < s ? { start: day, end: s } : { start: s, end: day });
      setPhase("start");
    }
  }

  function inRange(d: Date) {
    return value.start && value.end
      ? isWithinInterval(d, { start: value.start, end: value.end })
      : false;
  }

  return (
    <div className="w-60">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setView(subMonths(view, 1))}
          className="p-1 rounded hover:bg-[#0f9f96]/15 hover:text-[#0f9f96] transition-colors"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-xs font-semibold text-foreground capitalize">
          {format(view, "MMMM yyyy", { locale: sv })}
        </span>
        <button
          onClick={() => setView(addMonths(view, 1))}
          className="p-1 rounded hover:bg-[#0f9f96]/15 hover:text-[#0f9f96] transition-colors"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {["M", "T", "O", "T", "F", "L", "S"].map((d, i) => (
          <div
            key={i}
            className="text-center text-[10px] text-muted-foreground py-1"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((day, i) => {
          const isStart = value.start && isSameDay(day, value.start);
          const isEnd = value.end && isSameDay(day, value.end);
          const inside = inRange(day) && !isStart && !isEnd;
          const dim = day.getMonth() !== view.getMonth();
          return (
            <button
              key={i}
              onClick={() => pick(day)}
              className={[
                "text-[11px] py-1 rounded-lg transition-colors font-medium",
                dim ? "text-muted-foreground" : "text-foreground",
                isStart || isEnd ? "!bg-[#0f9f96] !text-white" : "",
                inside ? "bg-[#0f9f96]/15 text-[#0f9f96]" : "",
                !dim && !isStart && !isEnd && !inside
                  ? "hover:bg-[#0f9f96]/15 hover:text-[#0f9f96]"
                  : "",
              ].join(" ")}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-border flex justify-between text-[11px] text-muted-foreground">
        <span>{value.start ? format(value.start, "dd/MM/yyyy") : "Från"}</span>
        <span className="text-muted-foreground">→</span>
        <span>{value.end ? format(value.end, "dd/MM/yyyy") : "Till"}</span>
      </div>
    </div>
  );
}

// ─── Dropdown content (controlled) ───────────────────────────────────────────

function DropdownContent({
  def,
  value,
  onChange,
  onClose,
}: {
  def: FilterDef;
  value: FilterVal;
  onChange: (v: FilterVal) => void;
  onClose: () => void;
}) {
  // local draft — committed on Tillämpa
  const [draft, setDraft] = useState<FilterVal>(value ?? null);

  function commit() {
    onChange(draft);
    onClose();
  }

  const apply = (
    <button
      onClick={commit}
      className="w-full mt-3 py-2 bg-[#0f9f96] hover:bg-[#0f766e] text-white text-xs font-medium rounded-lg transition-colors"
    >
      Tillämpa
    </button>
  );

  const opts = OPTIONS[def.id] ?? [];

  switch (def.type) {
    case "text": {
      const v = (draft as string) ?? "";
      return (
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            {def.label}
          </label>
          <input
            autoFocus
            value={v}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Sök..."
            className="w-full px-3 py-2 bg-muted rounded-lg text-xs border border-border focus:outline-none focus:border-[#0f9f96]"
          />
          {apply}
        </div>
      );
    }

    case "daterange": {
      const dr: DateRange =
        draft && "start" in (draft as any)
          ? (draft as DateRange)
          : { start: null, end: null };
      return (
        <div>
          <MiniCalendar value={dr} onChange={(r) => setDraft(r)} />
          {apply}
        </div>
      );
    }

    case "numrange": {
      const nr: NumRange =
        draft && "from" in (draft as any)
          ? (draft as NumRange)
          : { from: "", to: "" };
      return (
        <div>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="text-[10px] text-muted-foreground mb-1 block">
                Från
              </label>
              <input
                type="number"
                value={nr.from}
                onChange={(e) => setDraft({ ...nr, from: e.target.value })}
                placeholder="0"
                className="w-full px-3 py-2 bg-muted rounded-lg text-xs border border-border focus:outline-none focus:border-[#0f9f96]"
              />
            </div>
            <span className="text-muted-foreground mb-2.5">—</span>
            <div className="flex-1">
              <label className="text-[10px] text-muted-foreground mb-1 block">
                Till
              </label>
              <input
                type="number"
                value={nr.to}
                onChange={(e) => setDraft({ ...nr, to: e.target.value })}
                placeholder="∞"
                className="w-full px-3 py-2 bg-muted rounded-lg text-xs border border-border focus:outline-none focus:border-[#0f9f96]"
              />
            </div>
          </div>
          {apply}
        </div>
      );
    }

    case "toggle": {
      const tv = draft as string | null;
      return (
        <div className="flex flex-col gap-2">
          {["Befintligt", "Ej befintligt"].map((opt) => (
            <button
              key={opt}
              onClick={() => setDraft(tv === opt ? null : opt)}
              className={`w-full py-2 rounded-lg text-xs font-medium border transition-colors ${tv === opt ? "bg-[#0f9f96]/15 text-[#0f9f96] border-[#0f9f96]/30" : "border-border text-foreground hover:bg-muted"}`}
            >
              {opt}
            </button>
          ))}
          {apply}
        </div>
      );
    }

    case "ordernummer": {
      const ov: OrderVal =
        draft && "mode" in (draft as any)
          ? (draft as OrderVal)
          : { mode: null, search: "", selected: [] };
      const orders = [
        "ORD-1234",
        "ORD-1235",
        "ORD-1236",
        "ORD-1237",
        "ORD-1238",
        "ORD-1239",
        "ORD-1240",
        "ORD-12345",
        "ORD-12344a",
        "ORD-12456f",
      ];
      return (
        <div>
          <div className="flex gap-2 mb-3">
            {(["befintligt", "ej"] as const).map((m) => (
              <button
                key={m}
                onClick={() =>
                  setDraft({ ...ov, mode: ov.mode === m ? null : m })
                }
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${ov.mode === m ? "bg-[#0f9f96]/15 text-[#0f9f96] border-[#0f9f96]/30" : "border-border text-muted-foreground hover:bg-muted"}`}
              >
                {m === "befintligt" ? "Befintligt" : "Ej befintligt"}
              </button>
            ))}
          </div>
          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              value={ov.search}
              onChange={(e) => setDraft({ ...ov, search: e.target.value })}
              placeholder="Sök ordernummer..."
              className="w-full pl-8 pr-3 py-2 bg-muted rounded-lg text-xs border border-border focus:outline-none focus:border-[#0f9f96]"
            />
          </div>
          <div className="flex flex-col gap-0.5 max-h-36 overflow-y-auto">
            {orders
              .filter((o) => o.toLowerCase().includes(ov.search.toLowerCase()))
              .map((o) => (
                <CheckItem
                  key={o}
                  label={o}
                  checked={ov.selected.includes(o)}
                  onChange={() =>
                    setDraft({
                      ...ov,
                      selected: ov.selected.includes(o)
                        ? ov.selected.filter((x) => x !== o)
                        : [...ov.selected, o],
                    })
                  }
                />
              ))}
          </div>
          {apply}
        </div>
      );
    }

    case "avsnitt":
    case "checklist":
    case "multiselect":
    default: {
      const sv2 = (draft as string[]) ?? [];
      const [q, setQ] = useState("");
      const filtered = opts.filter((o) =>
        o.toLowerCase().includes(q.toLowerCase()),
      );
      return (
        <div>
          {def.type === "multiselect" && (
            <div className="relative mb-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Sök..."
                className="w-full pl-8 pr-3 py-2 bg-muted rounded-lg text-xs border border-border focus:outline-none focus:border-[#0f9f96]"
              />
            </div>
          )}
          <div className="flex flex-col gap-0.5 max-h-48 overflow-y-auto">
            {filtered.map((o) => (
              <CheckItem
                key={o}
                label={o}
                checked={sv2.includes(o)}
                onChange={() =>
                  setDraft(
                    sv2.includes(o) ? sv2.filter((x) => x !== o) : [...sv2, o],
                  )
                }
              />
            ))}
          </div>
          {apply}
        </div>
      );
    }
  }
}

// ─── Filter pill ──────────────────────────────────────────────────────────────

function FilterPill({
  def,
  value,
  onChange,
  darkMode = false,
}: {
  def: FilterDef;
  value: FilterVal;
  onChange: (v: FilterVal) => void;
  darkMode?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const [alignUp, setAlignUp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(
    ref,
    useCallback(() => setOpen(false), []),
  );

  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setAlignRight(rect.left + 280 > window.innerWidth - 16);
      setAlignUp(rect.bottom + 360 > window.innerHeight);
    }
  }, [open]);

  const active = countActive(value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={[
          "flex items-center gap-1.5 pl-3 pr-2.5 py-2 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap",
          open || active > 0
            ? "bg-[#0f9f96]/15 text-[#0f9f96] border-[#0f9f96]/30"
            : "bg-card border-border text-muted-foreground hover:bg-[#0f9f96]/10 hover:text-[#0f9f96] hover:border-[#0f9f96]/30",
        ].join(" ")}
      >
        {def.label}
        {active > 0 && (
          <span className="bg-[#0f9f96] text-white rounded-full size-4 flex items-center justify-center text-[10px] font-bold shrink-0">
            {active}
          </span>
        )}
        {open ? (
          <ChevronUp className="size-3 opacity-60" />
        ) : (
          <ChevronDown className="size-3 opacity-60" />
        )}
      </button>
      {open && (
        <div
          className={[
            "absolute z-[300] rounded-2xl border p-4 min-w-[220px]",
            "bg-card border-border",
            alignRight ? "right-0" : "left-0",
            alignUp ? "bottom-full mb-2" : "top-full mt-2",
          ].join(" ")}
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
        >
          <DropdownContent
            key={def.id}
            def={def}
            value={value}
            onChange={(v) => {
              onChange(v);
            }}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

// ─── AI insight card ──────────────────────────────────────────────────────────

function InsightCard({
  scenario,
  darkMode = false,
}: {
  scenario: Scenario;
  darkMode?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border overflow-hidden flex flex-col",
        "bg-card border-border",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-start gap-3 px-5 py-4 border-b",
          "border-border",
        ].join(" ")}
      >
        <div className="size-7 rounded-xl bg-[#0f9f96]/15 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="size-3.5 text-[#0f9f96]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground leading-snug">
            {scenario.headline}
          </p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {scenario.summary}
          </p>
        </div>
      </div>
      <div
        className={["flex flex-col divide-y flex-1", "divide-border"].join(" ")}
      >
        {scenario.insights.map((ins, i) => {
          const Icon =
            ins.type === "success"
              ? TrendingUp
              : ins.type === "warning"
                ? AlertTriangle
                : TrendingDown;
          const color =
            ins.type === "success"
              ? "text-emerald-600 bg-emerald-50"
              : ins.type === "warning"
                ? "text-amber-600 bg-amber-50"
                : "text-blue-600 bg-blue-50";
          return (
            <div key={i} className="flex items-start gap-2.5 px-5 py-3">
              <span
                className={`size-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${color}`}
              >
                <Icon className="size-3" />
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {ins.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type ChartPoint = {
  k: string;
  v: number;
};

// ─── Saved analysis type (exported for App.tsx) ───────────────────────────────

export interface SavedAnalysis {
  id: string;
  name: string;
  query: string;
  savedAt: Date;
  scenarioHeadline: string | null;
  scenarioSummary: string | null;
  filterValues: Record<string, FilterVal>;
  activeFilterCount: number;
  resultCount: number;
  totalRadbelopp: number;
  chart1Title: string;
  chart1Color: string;
  chart2Title: string;
  chart2Color: string;
  chart1Data: ChartPoint[];
  chart2Data: ChartPoint[];
}

// ─── Y-axis tick formatter ────────────────────────────────────────────────────

const fmtY = (v: number) =>
  v >= 1_000_000
    ? `${(v / 1_000_000).toFixed(1)}M`
    : v >= 1_000
      ? `${Math.round(v / 1_000)}k`
      : String(v);

type ChartVariant = "bar" | "hbar" | "line" | "area" | "pie" | "donut";

const CHART_COLORS = [
  "#0f9f96",
  "#818cf8",
  "#a78bfa",
  "#fb7185",
  "#f59e0b",
  "#34d399",
  "#60a5fa",
  "#f97316",
];

const VARIANT_OPTIONS: { value: ChartVariant; label: string }[] = [
  { value: "bar", label: "Stapel" },
  { value: "hbar", label: "Horisontell" },
  { value: "line", label: "Linje" },
  { value: "area", label: "Area" },
  { value: "pie", label: "Tårta" },
  { value: "donut", label: "Munkring" },
];

// Single chart renderer — self-contained with ResponsiveContainer
function AnalysisChart({
  data,
  variant,
  color,
}: {
  data: ChartPoint[];
  variant: ChartVariant;
  color: string;
}) {
  const ttStyle = {
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    fontSize: 12,
  };
  const gradId = `ag-${color.replace("#", "")}`;

  if (variant === "pie" || variant === "donut") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            key="ac-pie"
            data={data}
            dataKey="v"
            nameKey="k"
            cx="50%"
            cy="50%"
            innerRadius={variant === "donut" ? 70 : 0}
            outerRadius={110}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((_, i) => (
              <Cell
                key={`ac-cell-${i}`}
                fill={CHART_COLORS[i % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            key="ac-tt"
            contentStyle={ttStyle}
            formatter={(v: number) => [v.toLocaleString("sv-SE"), ""]}
          />
          <Legend
            key="ac-legend"
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ fontSize: 11, paddingLeft: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
  if (variant === "hbar") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 8, right: 16, top: 4, bottom: 0 }}
        >
          <CartesianGrid
            key="ac-cg"
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            horizontal={false}
          />
          <XAxis
            key="ac-x"
            type="number"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtY}
          />
          <YAxis
            key="ac-y"
            type="category"
            dataKey="k"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            width={120}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            key="ac-tt"
            cursor={{ fill: "rgba(20,184,166,0.10)" }}
            contentStyle={ttStyle}
            formatter={(v: number) => [v.toLocaleString("sv-SE"), ""]}
          />
          <Bar key="ac-bar" dataKey="v" fill={color} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  if (variant === "line") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={data}
          margin={{ left: 0, right: 12, top: 4, bottom: 0 }}
        >
          <CartesianGrid
            key="ac-cg"
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            key="ac-x"
            dataKey="k"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            key="ac-y"
            tick={{ fill: "#9ca3af", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtY}
            width={40}
          />
          <Tooltip
            key="ac-tt"
            contentStyle={ttStyle}
            formatter={(v: number) => [v.toLocaleString("sv-SE"), ""]}
          />
          <Line
            key="ac-line"
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 3, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  if (variant === "area") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={data}
          margin={{ left: 0, right: 12, top: 4, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            key="ac-cg"
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            key="ac-x"
            dataKey="k"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            key="ac-y"
            tick={{ fill: "#9ca3af", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtY}
            width={40}
          />
          <Tooltip
            key="ac-tt"
            contentStyle={ttStyle}
            formatter={(v: number) => [v.toLocaleString("sv-SE"), ""]}
          />
          <Area
            key="ac-area"
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradId})`}
            dot={{ fill: color, r: 3, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  // bar (default)
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        barCategoryGap="30%"
        margin={{ left: 0, right: 12, top: 4, bottom: 0 }}
      >
        <CartesianGrid
          key="ac-cg"
          strokeDasharray="3 3"
          stroke="#f0f0f0"
          vertical={false}
        />
        <XAxis
          key="ac-x"
          dataKey="k"
          tick={{ fill: "#6b7280", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval={0}
        />
        <YAxis
          key="ac-y"
          tick={{ fill: "#9ca3af", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={fmtY}
          width={40}
        />
        <Tooltip
          key="ac-tt"
          cursor={{ fill: "rgba(20,184,166,0.10)" }}
          contentStyle={ttStyle}
          formatter={(v: number) => [v.toLocaleString("sv-SE"), ""]}
        />
        <Bar key="ac-bar" dataKey="v" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Export modal
function ExportModal({
  defaultName,
  onClose,
  darkMode,
}: {
  defaultName: string;
  onClose: () => void;
  darkMode?: boolean;
}) {
  const [fileName, setFileName] = useState(
    defaultName.replace(/[^a-zA-ZåäöÅÄÖ0-9\s-]/g, "").trim() || "analys-export",
  );
  const [format, setFormat] = useState<"csv" | "pdf">("csv");
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={[
          "relative rounded-2xl w-full max-w-sm p-6",
          "bg-card border border-border",
        ].join(" ")}
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
      >
        <h3 className="text-base font-semibold text-foreground mb-4">
          Exportera data
        </h3>
        <label className="text-xs font-medium text-muted-foreground block mb-1.5">
          Filnamn
        </label>
        <input
          autoFocus
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full px-3 py-2 bg-muted rounded-xl text-sm border border-border focus:outline-none focus:border-[#0f9f96] mb-4"
        />
        <label className="text-xs font-medium text-muted-foreground block mb-2">
          Filformat
        </label>
        <div className="flex gap-3 mb-5">
          {(["csv", "pdf"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={[
                "flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors",
                format === f
                  ? "bg-[#0f9f96]/15 text-[#0f9f96] border-[#0f9f96]/30"
                  : "border-border text-muted-foreground hover:bg-muted",
              ].join(" ")}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:bg-muted transition-colors"
          >
            Avbryt
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[#0f9f96] hover:bg-[#0f766e] text-white transition-colors"
          >
            Exportera {format.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}

const SUGGESTIONS = [
  "Visa energikostnader per leverantör",
  "Vilka fakturor förfaller snart?",
  "Analysera Peab Sverige AB",
  "Materialkostnader denna period",
  "Top leverantörer efter belopp",
  "Kostnadsöversikt per kategori",
];

const allChips = [
  "Medelpris över tid",
  "Enheter per kategori",
  "Top 3 billigaste lev.",
  "Medelpris per produkt",
  "Spend historiskt",
  "Top leverantörer",
];

const NY_ANALYSIS_STORAGE_KEY = "financial-dashboard.new-analysis";

function readAnalysisField<T>(field: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(NY_ANALYSIS_STORAGE_KEY);
    const state = stored
      ? (JSON.parse(stored) as Partial<Record<string, unknown>>)
      : {};
    return (state[field] as T) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeAnalysisState(field: string, value: unknown) {
  try {
    const stored = localStorage.getItem(NY_ANALYSIS_STORAGE_KEY);
    const state = stored ? (JSON.parse(stored) as Record<string, unknown>) : {};
    localStorage.setItem(
      NY_ANALYSIS_STORAGE_KEY,
      JSON.stringify({ ...state, [field]: value }),
    );
  } catch {
    // Storage can be unavailable in private browsing or restricted embeds.
  }
}

function restoreFilterValues(): Record<string, FilterVal> {
  const stored = readAnalysisField<Record<string, FilterVal>>(
    "filterValues",
    {},
  );
  return Object.fromEntries(
    Object.entries(stored).map(([key, value]) => {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        return [key, value];
      }
      const candidate = value as unknown as Record<string, unknown>;
      if (!("start" in candidate) && !("end" in candidate)) {
        return [key, value];
      }
      return [
        key,
        {
          ...candidate,
          start: candidate.start ? new Date(candidate.start as string) : null,
          end: candidate.end ? new Date(candidate.end as string) : null,
        },
      ];
    }),
  ) as Record<string, FilterVal>;
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function NyAnalys({
  onSave,
  onAddToDashboard,
  darkMode = false,
}: {
  onSave?: (a: SavedAnalysis) => void;
  onAddToDashboard?: (a: SavedAnalysis) => void;
  darkMode?: boolean;
}) {
  const [invoiceRows, setInvoiceRows] = useState<MockRow[]>([]);
  const [query, setQuery] = useState(() => readAnalysisField("query", ""));
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(() => {
    const storedQuery = readAnalysisField("query", "");
    return storedQuery ? matchScenario(storedQuery) : null;
  });
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterValues, setFilterValues] =
    useState<Record<string, FilterVal>>(restoreFilterValues);
  const [activeChips, setActiveChips] = useState<string[]>(() =>
    readAnalysisField("activeChips", [
      "Medelpris över tid",
      "Enheter per kategori",
    ]),
  );
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [savedToast, setSavedToast] = useState(false);
  const [chartVariant, setChartVariant] = useState<ChartVariant>(() =>
    readAnalysisField("chartVariant", "bar"),
  );
  const [chartColor, setChartColor] = useState(() =>
    readAnalysisField("chartColor", "#0f9f96"),
  );
  const [exportOpen, setExportOpen] = useState(false);
  const [sortCol, setSortCol] = useState<keyof MockRow | null>(() =>
    readAnalysisField("sortCol", null),
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">(() =>
    readAnalysisField("sortDir", "asc"),
  );
  const [currentPage, setCurrentPage] = useState(() =>
    readAnalysisField("currentPage", 1),
  );

  useEffect(() => {
    let active = true;
    getInvoices().then((rows) => {
      if (active) setInvoiceRows(rows);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => writeAnalysisState("query", query), [query]);
  useEffect(
    () => writeAnalysisState("filterValues", filterValues),
    [filterValues],
  );
  useEffect(
    () => writeAnalysisState("activeChips", activeChips),
    [activeChips],
  );
  useEffect(
    () => writeAnalysisState("chartVariant", chartVariant),
    [chartVariant],
  );
  useEffect(() => writeAnalysisState("chartColor", chartColor), [chartColor]);
  useEffect(() => writeAnalysisState("sortCol", sortCol), [sortCol]);
  useEffect(() => writeAnalysisState("sortDir", sortDir), [sortDir]);
  useEffect(
    () => writeAnalysisState("currentPage", currentPage),
    [currentPage],
  );

  function updateFilter(id: string, val: FilterVal) {
    setFilterValues((prev) => ({ ...prev, [id]: val }));
  }

  function clearAllFilters() {
    setFilterValues({});
  }

  function runSearch(q: string) {
    if (!q.trim()) return;
    setLoading(true);
    setActiveScenario(null);
    setTimeout(() => {
      const s = matchScenario(q);
      setActiveScenario(s);
      // pre-apply the scenario's filter
      if (s.preFilter && Object.keys(s.preFilter).length > 0) {
        const safePreFilter = Object.entries(s.preFilter).reduce<
          Record<string, FilterVal>
        >((acc, [key, value]) => {
          if (value !== undefined) acc[key] = value;
          return acc;
        }, {});
        setFilterValues((prev) => ({ ...prev, ...safePreFilter }));
      }
      setLoading(false);
    }, 1100);
  }

  function doSave() {
    if (!saveName.trim()) return;
    const analysis: SavedAnalysis = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: saveName.trim(),
      query,
      savedAt: new Date(),
      scenarioHeadline: activeScenario?.headline ?? null,
      scenarioSummary: activeScenario?.summary ?? null,
      filterValues,
      activeFilterCount: Object.values(filterValues).reduce(
        (s, v) => s + countActive(v),
        0,
      ),
      resultCount: filteredRows.length,
      totalRadbelopp: filteredRows.reduce((s, r) => s + r.radbelopp, 0),
      chart1Title: activeScenario?.chart1Title ?? "Kostnad per kategori (kr)",
      chart1Color: activeScenario?.chart1Color ?? "#0f9f96",
      chart2Title: activeScenario?.chart2Title ?? "Enheter per leverantör",
      chart2Color: activeScenario?.chart2Color ?? "#818cf8",
      chart1Data: charts.chart1,
      chart2Data: charts.chart2,
    };
    onSave?.(analysis);
    setSaveOpen(false);
    setSaveName("");
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  }

  // combine AI pre-filter with user filters
  const effectiveFilters = useMemo(() => filterValues, [filterValues]);

  const filteredRows = useMemo(
    () => applyFilters(invoiceRows, effectiveFilters),
    [invoiceRows, effectiveFilters],
  );

  const charts = useMemo(
    () => computeCharts(filteredRows, activeScenario),
    [filteredRows, activeScenario],
  );

  const activeFilterCount = Object.values(filterValues).reduce(
    (sum, v) => sum + countActive(v),
    0,
  );

  const totalRadbelopp = filteredRows.reduce((s, r) => s + r.radbelopp, 0);

  const ROWS_PER_PAGE = 10;

  const sortedRows = useMemo(() => {
    if (!sortCol) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const av = a[sortCol as keyof MockRow];
      const bv = b[sortCol as keyof MockRow];
      const cmp =
        typeof av === "number"
          ? (av as number) - (bv as number)
          : String(av).localeCompare(String(bv), "sv");
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filteredRows, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / ROWS_PER_PAGE));
  const pagedRows = sortedRows.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE,
  );

  function handleSort(col: keyof MockRow) {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("asc");
    }
    setCurrentPage(1);
  }

  return (
    <main
      className={[
        "flex-1 overflow-auto p-8 pt-6",
        "bg-background text-foreground",
      ].join(" ")}
    >
      <h1 className="text-2xl font-semibold text-foreground mb-6">AI analys</h1>

      {/* Search row */}
      <div className="flex gap-3 mb-4 items-stretch">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch(query)}
            placeholder="Beskriv vad du vill analysera..."
            className={[
              "w-full h-full pl-11 pr-14 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9f96]/30 focus:border-[#0f9f96]",
              "bg-card border-border text-foreground placeholder:text-muted-foreground",
            ].join(" ")}
          />
          {query && (
            <button
              onClick={() => runSearch(query)}
              title="Analysera"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-xl bg-muted hover:bg-[#0f9f96]/20 text-[#0f9f96] transition-colors"
            >
              <CornerDownLeft className="size-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setFilterOpen((o) => !o)}
          aria-label={filterOpen ? "Stäng filter" : "Öppna filter"}
          className={[
            "flex items-center gap-2 rounded-xl px-5 text-sm font-medium transition-colors whitespace-nowrap max-[500px]:size-11 max-[500px]:justify-center max-[500px]:gap-0 max-[500px]:p-0",
            filterOpen
              ? "bg-[#0f766e] text-white"
              : "bg-[#0f9f96] hover:bg-[#0f766e] text-white",
          ].join(" ")}
        >
          <SlidersHorizontal className="size-4" />
          <span className="max-[500px]:sr-only">Filtrera</span>
          {activeFilterCount > 0 && (
            <span className="bg-white/30 rounded-full px-1.5 text-[11px] font-bold">
              {activeFilterCount}
            </span>
          )}
          {filterOpen && <X className="size-3.5 opacity-80" />}
        </button>
      </div>

      {/* Suggestion chips */}
      {!query && !activeScenario && !loading && (
        <div className="relative mb-6 px-1 sm:px-10">
          <Carousel
            opts={{ align: "start", dragFree: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {SUGGESTIONS.map((s) => (
                <CarouselItem key={s} className="basis-auto pl-2">
                  <button
                    onClick={() => {
                      setQuery(s);
                      runSearch(s);
                    }}
                    className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-[#0f9f96]/30 hover:bg-[#0f9f96]/10 hover:text-[#0f9f96]"
                  >
                    <ArrowRight className="size-3" />
                    {s}
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 max-[500px]:hidden" />
            <CarouselNext className="right-0 max-[500px]:hidden" />
          </Carousel>
        </div>
      )}

      {/* Filter bar */}
      {filterOpen && (
        <div
          className={[
            "mb-5 p-4 rounded-2xl border",
            "bg-card border-border",
          ].join(" ")}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Filter{" "}
              {activeFilterCount > 0 && (
                <span className="ml-1 text-[#0f9f96]">
                  · {filteredRows.length} av {invoiceRows.length} rader visas
                </span>
              )}
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-muted-foreground hover:text-[#0f9f96] transition-colors"
              >
                Rensa alla
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <FilterPill
                key={f.id}
                def={f}
                value={filterValues[f.id] ?? null}
                onChange={(v) => updateFilter(f.id, v)}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mb-6 space-y-3">
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-8 rounded-xl bg-[#0f9f96]/15 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface-high rounded-lg animate-pulse w-2/3" />
                <div className="h-3 bg-surface-high rounded-lg animate-pulse w-full" />
              </div>
            </div>
            <div className="flex gap-4 pt-3 border-t border-border">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-12 bg-surface-low rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl h-64 animate-pulse" />
            <div className="bg-card rounded-2xl h-64 animate-pulse" />
          </div>
        </div>
      )}

      {/* Results */}
      {!loading &&
        (activeScenario ||
          filteredRows.length < invoiceRows.length ||
          true) && (
          <>
            {/* ── Action bar: Spara / Lägg till på dashboard ── */}
            {activeScenario && (
              <div className="flex items-center gap-3 mb-5">
                <div className="relative">
                  <button
                    onClick={() => {
                      setSaveName(query || "Min analys");
                      setSaveOpen((o) => !o);
                    }}
                    className={[
                      "flex items-center gap-2 px-4 py-2.5 border text-sm font-medium rounded-xl transition-colors",
                      "bg-card border-border text-foreground hover:bg-muted",
                    ].join(" ")}
                  >
                    <BookmarkPlus className="size-4" />
                    Spara analys
                  </button>
                  {saveOpen && (
                    <div
                      className={[
                        "absolute left-0 top-full mt-2 z-50 rounded-2xl border p-4 w-72",
                        "bg-card border-border",
                      ].join(" ")}
                      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
                    >
                      <p className="text-xs font-semibold text-foreground mb-2">
                        Spara analys
                      </p>
                      <input
                        autoFocus
                        value={saveName}
                        onChange={(e) => setSaveName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && doSave()}
                        placeholder="Namnge din analys..."
                        className="w-full px-3 py-2 bg-muted rounded-lg text-sm border border-border focus:outline-none focus:border-[#0f9f96] mb-3"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSaveOpen(false)}
                          className="flex-1 py-2 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:bg-muted transition-colors"
                        >
                          Avbryt
                        </button>
                        <button
                          onClick={doSave}
                          className="flex-1 py-2 rounded-lg text-xs font-medium bg-[#0f9f96] hover:bg-[#0f766e] text-white transition-colors"
                        >
                          Spara
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {onAddToDashboard && (
                  <button
                    onClick={() => {
                      const a: SavedAnalysis = {
                        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                        name: query || activeScenario.headline,
                        query,
                        savedAt: new Date(),
                        scenarioHeadline: activeScenario.headline,
                        scenarioSummary: activeScenario.summary,
                        filterValues,
                        activeFilterCount,
                        resultCount: filteredRows.length,
                        totalRadbelopp: filteredRows.reduce(
                          (s, r) => s + r.radbelopp,
                          0,
                        ),
                        chart1Title: activeScenario.chart1Title,
                        chart1Color: activeScenario.chart1Color,
                        chart2Title: activeScenario.chart2Title,
                        chart2Color: activeScenario.chart2Color,
                        chart1Data: charts.chart1,
                        chart2Data: charts.chart2,
                      };
                      onAddToDashboard(a);
                      setSavedToast(true);
                      setTimeout(() => setSavedToast(false), 2500);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 border border-border text-foreground hover:bg-[#0f9f96]/10 hover:text-[#0f9f96] hover:border-[#0f9f96]/30 text-sm font-medium rounded-xl transition-colors"
                  >
                    <LayoutDashboard className="size-4" />
                    Lägg till på dashboard
                  </button>
                )}
              </div>
            )}

            {/* Insight (1/3) + Chart (2/3) side by side */}
            <div
              className={
                activeScenario ? "grid grid-cols-3 gap-6 mb-6" : "mb-6"
              }
            >
              {activeScenario && (
                <InsightCard scenario={activeScenario} darkMode={darkMode} />
              )}

              {/* Single chart card (2/3 width) */}
              <Card
                className={[
                  "border-none shadow-none col-span-2",
                  "bg-card",
                ].join(" ")}
              >
                <CardContent className="pt-4 pb-4 px-5">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activeScenario
                        ? activeScenario.chart1Title
                        : "Kostnad per kategori (kr)"}
                    </p>
                    <div className="flex items-center gap-3 shrink-0">
                      {/* Color swatches */}
                      <div className="flex gap-1.5">
                        {CHART_COLORS.map((c) => (
                          <Button
                            key={c}
                            onClick={() => setChartColor(c)}
                            className={[
                              "size-5 rounded-full transition-transform hover:scale-110",
                              chartColor === c
                                ? "ring-2 ring-offset-1 ring-gray-400 scale-110"
                                : "",
                            ].join(" ")}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      {/* Chart type pills */}
                      <div className="flex gap-1">
                        {VARIANT_OPTIONS.map((o) => (
                          <button
                            key={o.value}
                            onClick={() => setChartVariant(o.value)}
                            className={[
                              "px-2.5 py-1 rounded-lg text-xs font-medium transition-colors",
                              chartVariant === o.value
                                ? "bg-[#0f9f96]/15 text-[#0f9f96]"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            ].join(" ")}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <AnalysisChart
                    data={charts.chart1}
                    variant={chartVariant}
                    color={chartColor}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <Card className={["border-none shadow-none", "bg-card"].join(" ")}>
              <CardContent className="p-0">
                <div
                  className={[
                    "flex items-center justify-between px-6 py-4 border-b",
                    "border-border",
                  ].join(" ")}
                >
                  <div>
                    <span className="text-sm font-semibold text-foreground">
                      Resultat
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      · {filteredRows.length} rader
                      {activeFilterCount > 0 &&
                        ` (filtrerat från ${invoiceRows.length})`}{" "}
                      · {totalRadbelopp.toLocaleString("sv-SE")} kr totalt
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {activeFilterCount > 0 && (
                      <span className="px-3 py-1.5 bg-[#0f9f96]/10 text-[#0f9f96] text-xs rounded-full font-medium">
                        {activeFilterCount} aktiva filter
                      </span>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExportOpen(true)}
                      className="gap-1.5 border-border text-muted-foreground hover:bg-[#0f9f96]/15 hover:text-[#0f9f96] hover:border-[#0f9f96]/30 rounded-lg"
                    >
                      <Download className="size-3.5" />
                      Exportera
                    </Button>
                  </div>
                </div>

                <div
                  className={[
                    "grid grid-cols-[2fr_2fr_1.2fr_0.8fr_1fr_1fr] px-6 py-3 border-b bg-muted/60",
                    "border-border",
                  ].join(" ")}
                >
                  {(
                    [
                      ["Artikelnamn", "artikel"],
                      ["Leverantör", "leverantor"],
                      ["Kategori", null],
                      ["Antal", "antal"],
                      ["Styckpris", "styckpris"],
                      ["Radbelopp", "radbelopp"],
                    ] as [string, keyof MockRow | null][]
                  ).map(([label, col]) => (
                    <button
                      key={label}
                      onClick={() => col && handleSort(col)}
                      className={[
                        "flex items-center gap-1 text-xs font-medium transition-colors",
                        col
                          ? "cursor-pointer hover:text-[#0f9f96]"
                          : "cursor-default",
                        sortCol === col
                          ? "text-[#0f9f96]"
                          : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {label}
                      {col &&
                        (sortCol === col ? (
                          <span className="text-[10px]">
                            {sortDir === "asc" ? "↑" : "↓"}
                          </span>
                        ) : (
                          <ArrowUpDown className="size-3 opacity-40" />
                        ))}
                    </button>
                  ))}
                </div>

                {pagedRows.length === 0 ? (
                  <div className="px-6 py-12 text-center text-sm text-muted-foreground">
                    Inga rader matchar de aktiva filtren.
                  </div>
                ) : (
                  pagedRows.map((row) => (
                    <div
                      key={row.id}
                      className={[
                        "grid grid-cols-[2fr_2fr_1.2fr_0.8fr_1fr_1fr] px-6 py-4 border-b hover:bg-[#0f9f96]/5 transition-colors text-sm",
                        "border-border",
                      ].join(" ")}
                    >
                      <span className="text-foreground font-medium">
                        {row.artikel}
                      </span>
                      <span className="text-muted-foreground">
                        {row.leverantor}
                      </span>
                      <span className="text-muted-foreground">
                        {row.kategori}
                      </span>
                      <span className="text-muted-foreground">
                        {row.antal.toLocaleString("sv-SE")}
                      </span>
                      <span className="text-muted-foreground">
                        {row.styckpris.toLocaleString("sv-SE")}
                      </span>
                      <span className="text-foreground font-medium">
                        {row.radbelopp.toLocaleString("sv-SE")}
                      </span>
                    </div>
                  ))
                )}

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-xs text-muted-foreground">
                    Visar {pagedRows.length} av {sortedRows.length} rader
                  </span>
                  {totalPages > 1 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-2 py-1 hover:text-[#0f9f96] disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ‹
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(
                          (n) =>
                            n === 1 ||
                            n === totalPages ||
                            Math.abs(n - currentPage) <= 1,
                        )
                        .reduce<(number | "…")[]>((acc, n, idx, arr) => {
                          if (
                            idx > 0 &&
                            (n as number) - (arr[idx - 1] as number) > 1
                          )
                            acc.push("…");
                          acc.push(n);
                          return acc;
                        }, [])
                        .map((item, i) =>
                          item === "…" ? (
                            <span
                              key={`ellipsis-${i}`}
                              className="px-1 text-muted-foreground"
                            >
                              …
                            </span>
                          ) : (
                            <button
                              key={item}
                              onClick={() => setCurrentPage(item as number)}
                              className={`px-2.5 py-1 rounded ${currentPage === item ? "bg-[#0f9f96] text-white" : "hover:text-[#0f9f96]"}`}
                            >
                              {item}
                            </button>
                          ),
                        )}
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 hover:text-[#0f9f96] disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}

      {/* Export modal */}
      {exportOpen && (
        <ExportModal
          defaultName={query || activeScenario?.headline || "analys"}
          onClose={() => setExportOpen(false)}
          darkMode={darkMode}
        />
      )}

      {/* Save toast */}
      {savedToast && (
        <div
          className={[
            "fixed bottom-6 right-6 z-[500] flex items-center gap-2.5 px-4 py-3 text-sm font-medium rounded-2xl shadow-xl",
            "bg-foreground text-background border border-border",
          ].join(" ")}
        >
          <CheckCircle2 className="size-4 text-[#0f9f96] shrink-0" />
          Diagrammet lades till på dashboarden
        </div>
      )}

      {/* Empty state */}
      {!activeScenario && !loading && !query && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="size-16 rounded-2xl bg-[#0f9f96]/10 flex items-center justify-center mb-4">
            <Sparkles className="size-8 text-[#0f9f96]" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Vad vill du analysera?
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            Beskriv din fråga i fritext eller välj ett förslag ovan. AI:n söker
            automatiskt igenom alla dina inköpsdata.
          </p>
        </div>
      )}
    </main>
  );
}
