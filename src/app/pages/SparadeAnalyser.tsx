import { useState } from "react";
import {
  Trash2,
  ExternalLink,
  Sparkles,
  BarChart2,
  Filter,
  LayoutDashboard,
  CheckCircle2,
} from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Card, CardContent } from "../components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { SavedAnalysis } from "./NyAnalys";

const fmtY = (v: number) =>
  v >= 1_000_000
    ? `${(v / 1_000_000).toFixed(1)}M`
    : v >= 1_000
      ? `${Math.round(v / 1_000)}k`
      : String(v);

interface Props {
  savedAnalyses: SavedAnalysis[];
  onDelete: (id: string) => void;
  onOpen: (analysis: SavedAnalysis) => void;
  onAddToDashboard: (analysis: SavedAnalysis) => void;
  dashboardIds: string[];
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="size-16 rounded-2xl bg-[#0f9f96]/10 flex items-center justify-center mb-4">
        <Sparkles className="size-8 text-[#0f9f96]" />
      </div>
      <h2 className="text-lg font-semibold text-foreground mb-2">
        Inga sparade analyser ännu
      </h2>
      <p className="text-sm text-muted-foreground max-w-sm">
        Kör en AI-analys och klicka på "Spara analys" för att spara dina
        resultat här.
      </p>
    </div>
  );
}

function AnalysisCard({
  analysis,
  onDelete,
  onOpen,
  onAddToDashboard,
  onDashboard,
}: {
  analysis: SavedAnalysis;
  onDelete: () => void;
  onOpen: () => void;
  onAddToDashboard: () => void;
  onDashboard: boolean;
}) {
  return (
    <Card className="border-none shadow-none bg-card overflow-hidden group">
      <CardContent className="p-0">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b border-border">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="text-sm font-semibold text-foreground leading-snug">
              {analysis.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={onOpen}
                className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-[#0f9f96] transition-colors"
                title="Öppna analys"
              >
                <ExternalLink className="size-3.5" />
              </button>
              <button
                onClick={onDelete}
                className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-red-500 transition-colors"
                title="Ta bort"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
          {analysis.query && (
            <p className="text-xs text-muted-foreground italic truncate">
              "{analysis.query}"
            </p>
          )}
        </div>

        {/* Mini chart */}
        <div className="px-5 pt-3 pb-0">
          <p className="text-[11px] text-muted-foreground mb-1.5">
            {analysis.chart1Title}
          </p>
          <ResponsiveContainer width="100%" height={110}>
            <BarChart
              data={analysis.chart1Data}
              barCategoryGap="30%"
              margin={{ left: 0, right: 4, top: 2, bottom: 0 }}
            >
              <XAxis
                key="sa-x"
                dataKey="k"
                tick={{ fill: "#9ca3af", fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis
                key="sa-y"
                tick={{ fill: "#9ca3af", fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={fmtY}
                width={30}
              />
              <Tooltip
                key="sa-tt"
                cursor={{ fill: "rgba(20,184,166,0.10)" }}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  fontSize: 11,
                }}
                formatter={(v: number) => [v.toLocaleString("sv-SE"), ""]}
              />
              <Bar
                key="sa-bar"
                dataKey="v"
                fill={analysis.chart1Color}
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-0 border-t border-border mt-3">
          <div className="px-5 py-3 border-r border-border">
            <p className="text-[10px] text-muted-foreground mb-0.5">Rader</p>
            <p className="text-sm font-semibold text-foreground">
              {analysis.resultCount.toLocaleString("sv-SE")}
            </p>
          </div>
          <div className="px-5 py-3 border-r border-border">
            <p className="text-[10px] text-muted-foreground mb-0.5">Totalt</p>
            <p className="text-sm font-semibold text-foreground">
              {Math.round(analysis.totalRadbelopp / 1000)}k kr
            </p>
          </div>
          <div className="px-5 py-3">
            <p className="text-[10px] text-muted-foreground mb-0.5">Filter</p>
            <p className="text-sm font-semibold text-foreground">
              {analysis.activeFilterCount}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-muted border-t border-border">
          <div className="flex items-center gap-3">
            {analysis.activeFilterCount > 0 && (
              <span className="flex items-center gap-1 text-[10px] text-[#0f9f96] font-medium">
                <Filter className="size-3" />
                {analysis.activeFilterCount} aktiva filter
              </span>
            )}
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <BarChart2 className="size-3" />
              {analysis.chart1Title.split("–")[0].trim()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">
              {format(analysis.savedAt, "d MMM yyyy, HH:mm", { locale: sv })}
            </span>
            <button
              onClick={onAddToDashboard}
              title={
                onDashboard ? "Redan på dashboard" : "Lägg till på dashboard"
              }
              className={[
                "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium border transition-colors",
                onDashboard
                  ? "bg-[#0f9f96]/15 text-[#0f9f96] border-[#0f9f96]/30 cursor-default"
                  : "border-border text-muted-foreground hover:bg-muted hover:text-[#0f9f96] hover:border-[#0f9f96]/30",
              ].join(" ")}
            >
              <LayoutDashboard className="size-3" />
              {onDashboard ? "På dashboarden" : "Lägg till dashboard"}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SparadeAnalyser({
  savedAnalyses,
  onDelete,
  onOpen,
  onAddToDashboard,
  dashboardIds,
}: Props) {
  const [toast, setToast] = useState(false);

  function handleAddToDashboard(a: SavedAnalysis) {
    onAddToDashboard(a);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }

  return (
    <main className="flex-1 min-w-0 overflow-auto px-4 py-4 sm:px-6 sm:py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Sparade analyser
          </h1>
          {savedAnalyses.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {savedAnalyses.length} sparade analyser
            </p>
          )}
        </div>
      </div>

      {savedAnalyses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {savedAnalyses.map((a) => (
            <AnalysisCard
              key={a.id}
              analysis={a}
              onDelete={() => onDelete(a.id)}
              onOpen={() => onOpen(a)}
              onAddToDashboard={() => handleAddToDashboard(a)}
              onDashboard={dashboardIds.includes(a.id)}
            />
          ))}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[500] flex items-center gap-2.5 px-4 py-3 bg-foreground text-background text-sm font-medium rounded-2xl shadow-xl">
          <CheckCircle2 className="size-4 text-[#0f9f96] shrink-0" />
          Diagrammet lades till på dashboarden
        </div>
      )}
    </main>
  );
}
