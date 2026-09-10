import { useState, useEffect } from "react";
import { Sidebar, type Page } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./pages/Dashboard";
import { NyAnalys, type SavedAnalysis } from "./pages/NyAnalys";
import { SparadeAnalyser } from "./pages/SparadeAnalyser";
import { Installningar } from "./pages/Installningar";

export interface AppSettings {
  darkMode: boolean;
  language: "sv" | "en";
  notifications: { dueInvoices: boolean; weeklyReport: boolean; newSupplier: boolean; budgetAlert: boolean };
  defaultFormat: "csv" | "pdf";
  dateFormat: "dmy" | "ymd";
  currency: "SEK" | "EUR";
  twoFactor: boolean;
  logoSrc: string | null;
  displayName: string;
  email: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  language: "sv",
  notifications: { dueInvoices: true, weeklyReport: false, newSupplier: true, budgetAlert: true },
  defaultFormat: "csv",
  dateFormat: "dmy",
  currency: "SEK",
  twoFactor: false,
  logoSrc: null,
  displayName: "Rebecca Bergström",
  email: "rebecca.b@sundsvall.se",
};

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
  const [pendingDashboardAnalysis, setPendingDashboardAnalysis] = useState<SavedAnalysis | null>(null);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [dashboardEditMode, setDashboardEditMode] = useState(false);

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  function handleSave(analysis: SavedAnalysis) {
    setSavedAnalyses(prev => [analysis, ...prev]);
  }

  function handleAddToDashboard(analysis: SavedAnalysis) {
    setPendingDashboardAnalysis(analysis);
  }

  function handleDeleteSaved(id: string) {
    setSavedAnalyses(prev => prev.filter(a => a.id !== id));
  }

  return (
    <div className={`size-full ${settings.darkMode ? "bg-zinc-900" : "bg-[#f5f6fa]"}`}>
      <Sidebar currentPage={page} onNavigate={setPage} />

      <div className="flex flex-col size-full overflow-hidden pl-16">
        {page === "dashboard" && (
          <Header
            editMode={dashboardEditMode}
            onEditModeToggle={() => setDashboardEditMode(e => !e)}
          />
        )}
        {page === "dashboard" && (
          <Dashboard
            savedAnalyses={savedAnalyses}
            pendingAnalysis={pendingDashboardAnalysis}
            onPendingConsumed={() => setPendingDashboardAnalysis(null)}
            darkMode={settings.darkMode}
            editMode={dashboardEditMode}
            onEditModeChange={setDashboardEditMode}
          />
        )}
        {page === "ny-analys" && (
          <NyAnalys onSave={handleSave} onAddToDashboard={handleAddToDashboard} />
        )}
        {page === "sparade" && (
          <SparadeAnalyser
            savedAnalyses={savedAnalyses}
            onDelete={handleDeleteSaved}
            onOpen={() => setPage("ny-analys")}
            onAddToDashboard={handleAddToDashboard}
            dashboardIds={[]}
          />
        )}
        {page === "installningar" && (
          <Installningar settings={settings} onSettingsChange={setSettings} />
        )}
      </div>
    </div>
  );
}
