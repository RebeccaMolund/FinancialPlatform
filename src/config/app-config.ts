import type { AppSettings } from "../types/app-settings";

export const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  language: "sv",
  notifications: {
    dueInvoices: true,
    weeklyReport: false,
    newSupplier: true,
    budgetAlert: true,
  },
  defaultFormat: "csv",
  dateFormat: "dmy",
  currency: "SEK",
  twoFactor: false,
  logoSrc: null,
  displayName: "Rebecca Bergström",
  email: "rebecca.b@sundsvall.se",
};

export const STORAGE_KEYS = {
  page: "financial-dashboard.page",
  settings: "financial-dashboard.settings",
  savedAnalyses: "financial-dashboard.saved-analyses",
  dashboardRange: "financial-dashboard.range",
  dashboardCurrency: "financial-dashboard.currency",
  dashboardEditMode: "financial-dashboard.edit-mode",
} as const;
