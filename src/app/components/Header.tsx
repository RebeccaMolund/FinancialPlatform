import { useState } from "react";
import { ChevronLeft, ChevronRight, Pencil, Check } from "lucide-react";
import { Button } from "./ui/button";
import { DateFieldButton } from "./DateFieldButton";
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
} from "date-fns";
import { sv } from "date-fns/locale";

function DateRangePicker({ onClose }: { onClose: () => void }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today);
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: new Date(2025, 6, 17),
    end: new Date(2025, 7, 17),
  });
  const [selecting, setSelecting] = useState<"start" | "end">("start");

  const monthStart = startOfMonth(viewMonth);
  const days = eachDayOfInterval({
    start: startOfWeek(monthStart, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(viewMonth), { weekStartsOn: 1 }),
  });

  function handleDay(day: Date) {
    if (selecting === "start") {
      setRange({ start: day, end: null });
      setSelecting("end");
    } else {
      if (range.start && day < range.start) {
        setRange({ start: day, end: range.start });
      } else {
        setRange((r) => ({ ...r, end: day }));
      }
      setSelecting("start");
    }
  }

  function inRange(day: Date) {
    if (!range.start || !range.end) return false;
    return isWithinInterval(day, { start: range.start, end: range.end });
  }

  return (
    <div
      className="absolute right-0 top-full mt-2 z-[100] rounded-2xl border border-gray-100 p-4 w-72"
      style={{
        backgroundColor: "var(--card)",
        boxShadow: "0 4px 24px rgba(0,47,85,0.12)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setViewMonth(subMonths(viewMonth, 1))}
          className="p-1 rounded-lg hover:bg-[#14b8a6]/15 hover:text-[#14b8a6] transition-colors"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-sm font-semibold text-gray-800 capitalize">
          {format(viewMonth, "MMMM yyyy", { locale: sv })}
        </span>
        <button
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
          className="p-1 rounded-lg hover:bg-[#14b8a6]/15 hover:text-[#14b8a6] transition-colors"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"].map((d) => (
          <div key={d} className="text-center text-xs text-gray-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day, i) => {
          const isStart = range.start && isSameDay(day, range.start);
          const isEnd = range.end && isSameDay(day, range.end);
          const inside = inRange(day) && !isStart && !isEnd;
          const isCurrentMonth = day.getMonth() === viewMonth.getMonth();
          return (
            <button
              key={i}
              onClick={() => handleDay(day)}
              className={[
                "text-xs py-1.5 rounded-lg transition-colors font-medium",
                !isCurrentMonth ? "text-gray-300" : "text-gray-700",
                isStart || isEnd ? "bg-[#14b8a6] !text-white" : "",
                inside ? "bg-[#14b8a6]/15 text-[#14b8a6]" : "",
                isCurrentMonth && !isStart && !isEnd && !inside
                  ? "hover:bg-[#14b8a6]/15 hover:text-[#14b8a6]"
                  : "",
              ].join(" ")}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      {/* Selected range display */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>{range.start ? format(range.start, "dd/MM/yyyy") : "–"}</span>
        <span className="text-gray-300">→</span>
        <span>{range.end ? format(range.end, "dd/MM/yyyy") : "–"}</span>
      </div>

      <Button
        className="mt-3 w-full bg-[#14b8a6] hover:bg-[#0f766e] text-white text-sm"
        onClick={onClose}
      >
        Använd intervall
      </Button>
    </div>
  );
}

interface HeaderProps {
  editMode?: boolean;
  onEditModeToggle?: () => void;
}

export function Header({ editMode, onEditModeToggle }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [range] = useState({
    start: new Date(2025, 6, 17),
    end: new Date(2025, 7, 17),
  });

  const label = `${format(range.start, "dd/MM/yyyy")} - ${format(range.end, "dd/MM/yyyy")}`;

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-transparent">
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 bg-[#14b8a6] rounded-full flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <span
            className="text-white text-xs font-bold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            LG
          </span>
        </div>
        <h1
          className="text-[20px] leading-[28px] text-[#101828] whitespace-nowrap"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
        >
          Välkommen, Rebecca!
        </h1>
        {onEditModeToggle && (
          <button
            type="button"
            onClick={onEditModeToggle}
            aria-pressed={editMode}
            aria-label={
              editMode
                ? "Avsluta redigering av dashboard"
                : "Redigera dashboard"
            }
            className="flex items-center gap-2 px-6 py-3 rounded-[12px] transition-colors hover:bg-[#007681]/8"
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 500,
            }}
          >
            {editMode ? (
              <>
                <Check className="size-4" style={{ color: "#007681" }} />
                <span
                  className="text-[14px] tracking-[0.056px]"
                  style={{ color: "#007681" }}
                >
                  Klar
                </span>
              </>
            ) : (
              <>
                <Pencil className="size-4" style={{ color: "#007681" }} />
                <span
                  className="text-[14px] tracking-[0.056px]"
                  style={{ color: "#007681" }}
                >
                  Redigera dashboard
                </span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="relative">
        <DateFieldButton
          label={label}
          open={open}
          onClick={() => setOpen((o) => !o)}
          ariaLabel="Välj datumintervall"
        />
        {open && (
          <>
            <div
              className="fixed inset-0 z-[99]"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <DateRangePicker onClose={() => setOpen(false)} />
          </>
        )}
      </div>
    </header>
  );
}
