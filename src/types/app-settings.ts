export interface AppSettings {
  darkMode: boolean;
  language: "sv" | "en";
  notifications: {
    dueInvoices: boolean;
    weeklyReport: boolean;
    newSupplier: boolean;
    budgetAlert: boolean;
  };
  defaultFormat: "csv" | "pdf";
  dateFormat: "dmy" | "ymd";
  currency: "SEK" | "EUR";
  twoFactor: boolean;
  logoSrc: string | null;
  displayName: string;
  email: string;
}
