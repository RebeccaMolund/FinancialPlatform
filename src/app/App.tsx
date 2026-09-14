import { useState, useEffect, lazy, Suspense } from "react";
import { Sidebar, type Page } from "./components/Sidebar";
import { Header, type DateRange } from "./components/Header";
import type { SavedAnalysis } from "./pages/NyAnalys";

const Dashboard = lazy(() =>
  import("./pages/Dashboard").then((module) => ({ default: module.Dashboard })),
);
const NyAnalys = lazy(() =>
  import("./pages/NyAnalys").then((module) => ({ default: module.NyAnalys })),
);
const SparadeAnalyser = lazy(() =>
  import("./pages/SparadeAnalyser").then((module) => ({
    default: module.SparadeAnalyser,
  })),
);
const Installningar = lazy(() =>
  import("./pages/Installningar").then((module) => ({
    default: module.Installningar,
  })),
);

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

const DEFAULT_SETTINGS: AppSettings = {
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

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
  const [pendingDashboardAnalysis, setPendingDashboardAnalysis] =
    useState<SavedAnalysis | null>(null);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [dashboardEditMode, setDashboardEditMode] = useState(false);
  const [dashboardRange, setDashboardRange] = useState<DateRange>({
    start: new Date(2025, 6, 17),
    end: new Date(2025, 7, 17),
  });

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  function handleSave(analysis: SavedAnalysis) {
    setSavedAnalyses((prev) => [analysis, ...prev]);
  }

  function handleAddToDashboard(analysis: SavedAnalysis) {
    setPendingDashboardAnalysis(analysis);
  }

  function handleDeleteSaved(id: string) {
    setSavedAnalyses((prev) => prev.filter((a) => a.id !== id));
  }

  function renderPage() {
    switch (page) {
      case "dashboard":
        return (
          <>
            <Header
              editMode={dashboardEditMode}
              onEditModeToggle={() => setDashboardEditMode((e) => !e)}
              range={dashboardRange}
              onRangeChange={setDashboardRange}
            />
            <Dashboard
              savedAnalyses={savedAnalyses}
              pendingAnalysis={pendingDashboardAnalysis}
              onPendingConsumed={() => setPendingDashboardAnalysis(null)}
              darkMode={settings.darkMode}
              editMode={dashboardEditMode}
              onEditModeChange={setDashboardEditMode}
              range={dashboardRange}
            />
          </>
        );
      case "ny-analys":
        return (
          <NyAnalys
            onSave={handleSave}
            onAddToDashboard={handleAddToDashboard}
          />
        );
      case "sparade":
        return (
          <SparadeAnalyser
            savedAnalyses={savedAnalyses}
            onDelete={handleDeleteSaved}
            onOpen={() => setPage("ny-analys")}
            onAddToDashboard={handleAddToDashboard}
            dashboardIds={[]}
          />
        );
      case "installningar":
        return (
          <Installningar settings={settings} onSettingsChange={setSettings} />
        );
      default:
        return null;
    }
  }

  return (
    <div
      className={`size-full ${settings.darkMode ? "bg-zinc-900" : "bg-[#f5f6fa]"}`}
      role="application"
      aria-label="Finansiellt kontrollcenter"
    >
      <Sidebar
        currentPage={page}
        onNavigate={setPage}
        darkMode={settings.darkMode}
      />

      <main
        className="flex flex-col size-full overflow-hidden pl-16"
        aria-live="polite"
      >
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-[#f5f6fa] p-8">
              <div
                className="w-full max-w-6xl animate-pulse space-y-6"
                aria-label="Laddar innehåll"
              >
                <div className="grid grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-28 rounded-2xl bg-gray-200/80" />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[326px] rounded-[20px] border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                    >
                      <div className="flex items-center justify-between pb-4">
                        <div className="h-4 w-1/3 rounded bg-gray-200" />
                        <div className="flex gap-2">
                          <div className="h-8 w-8 rounded-lg bg-gray-200" />
                          <div className="h-8 w-14 rounded-lg bg-gray-200" />
                        </div>
                      </div>
                      <div className="h-40 w-full rounded-xl bg-gray-200" />
                      <div className="mt-4 flex gap-2">
                        <div className="h-3 w-1/4 rounded bg-gray-200" />
                        <div className="h-3 w-1/5 rounded bg-gray-200" />
                        <div className="h-3 w-1/3 rounded bg-gray-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        >
          {renderPage()}
        </Suspense>
      </main>
    </div>
  );
}
