import type { Scenario } from "../types/analysis";

export const SCENARIOS: Scenario[] = [
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
