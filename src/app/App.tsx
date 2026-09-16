import { useState, useEffect, lazy, Suspense } from "react";
import { Sidebar, type Page } from "./components/Sidebar";
import { Header, type CurrencyCode, type DateRange } from "./components/Header";
import type { SavedAnalysis } from "./pages/NyAnalys";
import type { AppSettings } from "../types/app-settings";
import { DEFAULT_SETTINGS, STORAGE_KEYS } from "../config/app-config";

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

function readStorage<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private browsing or restricted embeds.
  }
}

function restoreRange(value: Partial<DateRange> | null): DateRange {
  return {
    start: value?.start ? new Date(value.start) : new Date(2025, 6, 17),
    end: value?.end ? new Date(value.end) : new Date(2025, 7, 17),
  };
}

export default function App() {
  const [page, setPage] = useState<Page>(() => {
    const stored = readStorage<Page>(STORAGE_KEYS.page);
    return stored ?? "dashboard";
  });
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>(() =>
    (readStorage<SavedAnalysis[]>(STORAGE_KEYS.savedAnalyses) ?? []).map(
      (analysis) => ({ ...analysis, savedAt: new Date(analysis.savedAt) }),
    ),
  );
  const [pendingDashboardAnalysis, setPendingDashboardAnalysis] =
    useState<SavedAnalysis | null>(null);
  const [settings, setSettings] = useState<AppSettings>(() => {
    const stored = readStorage<Partial<AppSettings>>(STORAGE_KEYS.settings);
    return {
      ...DEFAULT_SETTINGS,
      ...stored,
      notifications: {
        ...DEFAULT_SETTINGS.notifications,
        ...stored?.notifications,
      },
    };
  });
  const [dashboardEditMode, setDashboardEditMode] = useState(
    () => readStorage<boolean>(STORAGE_KEYS.dashboardEditMode) ?? false,
  );
  const [dashboardRange, setDashboardRange] = useState<DateRange>(() =>
    restoreRange(readStorage<Partial<DateRange>>(STORAGE_KEYS.dashboardRange)),
  );
  const [dashboardCurrency, setDashboardCurrency] = useState<CurrencyCode>(
    () => readStorage<CurrencyCode>(STORAGE_KEYS.dashboardCurrency) ?? "SEK",
  );

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  useEffect(() => writeStorage(STORAGE_KEYS.page, page), [page]);
  useEffect(() => writeStorage(STORAGE_KEYS.settings, settings), [settings]);
  useEffect(
    () => writeStorage(STORAGE_KEYS.savedAnalyses, savedAnalyses),
    [savedAnalyses],
  );
  useEffect(
    () => writeStorage(STORAGE_KEYS.dashboardRange, dashboardRange),
    [dashboardRange],
  );
  useEffect(
    () => writeStorage(STORAGE_KEYS.dashboardCurrency, dashboardCurrency),
    [dashboardCurrency],
  );
  useEffect(
    () => writeStorage(STORAGE_KEYS.dashboardEditMode, dashboardEditMode),
    [dashboardEditMode],
  );

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
              currency={dashboardCurrency}
              onCurrencyChange={setDashboardCurrency}
            />
            <Dashboard
              savedAnalyses={savedAnalyses}
              pendingAnalysis={pendingDashboardAnalysis}
              onPendingConsumed={() => setPendingDashboardAnalysis(null)}
              darkMode={settings.darkMode}
              editMode={dashboardEditMode}
              onEditModeChange={setDashboardEditMode}
              range={dashboardRange}
              currency={dashboardCurrency}
            />
          </>
        );
      case "ny-analys":
        return (
          <NyAnalys
            onSave={handleSave}
            onAddToDashboard={handleAddToDashboard}
            darkMode={settings.darkMode}
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
      className="size-full bg-background"
      role="application"
      aria-label="Finansiellt kontrollcenter"
    >
      <Sidebar
        currentPage={page}
        onNavigate={setPage}
        darkMode={settings.darkMode}
      />

      <main
        className="flex min-w-0 flex-col size-full overflow-hidden pl-12 pb-0 lg:pl-16 max-[500px]:pl-0 max-[500px]:pb-16"
        aria-live="polite"
      >
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-background p-8">
              <div
                className="w-full max-w-6xl animate-pulse space-y-6"
                aria-label="Laddar innehåll"
              >
                <div className="grid grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-28 rounded-2xl bg-surface-high" />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[326px] rounded-[20px] border border-border bg-card p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                    >
                      <div className="flex items-center justify-between pb-4">
                        <div className="h-4 w-1/3 rounded bg-surface-high" />
                        <div className="flex gap-2">
                          <div className="h-8 w-8 rounded-lg bg-surface-high" />
                          <div className="h-8 w-14 rounded-lg bg-surface-high" />
                        </div>
                      </div>
                      <div className="h-40 w-full rounded-xl bg-surface-high" />
                      <div className="mt-4 flex gap-2">
                        <div className="h-3 w-1/4 rounded bg-surface-high" />
                        <div className="h-3 w-1/5 rounded bg-surface-high" />
                        <div className="h-3 w-1/3 rounded bg-surface-high" />
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
