export interface MockRow {
  id: string;
  fakturanummer: string;
  ordernummer: string | null;
  artikel: string;
  leverantor: string;
  kategori: string;
  antal: number;
  styckpris: number;
  radbelopp: number;
  valuta: string;
  mottagare: string;
  forfallodatum: string; // ISO date string
  fakturadatum: string;
  kostnadsstalle: string;
  fakturaformat: string;
  betalningsvillkor: string;
  projektkod: string;
  avdelning: string;
  betalningsmetod: string;
  rabatprocent: number;
  fraktkostnad: number;
  momsbelopp: number;
}
