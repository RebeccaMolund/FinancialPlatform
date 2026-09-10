import { LayoutDashboard, BarChart2, Bookmark, Settings } from "lucide-react";

export type Page = "dashboard" | "ny-analys" | "sparade" | "installningar";

const navItems: { icon: React.ElementType; label: string; page: Page }[] = [
  { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
  { icon: BarChart2, label: "Ny analys", page: "ny-analys" },
  { icon: Bookmark, label: "Sparade analyser", page: "sparade" },
  { icon: Settings, label: "Kontoinställningar", page: "installningar" },
];

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside
      className="group fixed left-0 top-0 h-full z-50 flex flex-col py-6 overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-sm"
      style={{ width: "64px" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.width = "220px")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.width = "64px")
      }
      aria-label="Sidnavigering"
    >
      <nav aria-label="Huvudnavigering" className="flex flex-col gap-1">
        {navItems.map(({ icon: Icon, label, page }) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onNavigate(page)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={[
                "flex items-center gap-3 mx-2 px-3 py-3 rounded-xl whitespace-nowrap transition-colors duration-150 text-left",
                isActive
                  ? "bg-[#14b8a6]/15 text-[#14b8a6]"
                  : "text-gray-400 hover:bg-[#14b8a6]/15 hover:text-[#14b8a6]",
              ].join(" ")}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
