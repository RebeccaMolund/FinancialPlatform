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
  darkMode?: boolean;
}

export function Sidebar({
  currentPage,
  onNavigate,
  darkMode = false,
}: SidebarProps) {
  return (
    <aside
      className={[
        "group fixed left-0 top-0 z-50 flex h-full flex-col overflow-hidden py-6 shadow-sm transition-all duration-300 ease-in-out",
        "bg-sidebar w-12 lg:w-16",
        "max-[500px]:bottom-0 max-[500px]:right-0 max-[500px]:top-auto max-[500px]:h-16 max-[500px]:w-full max-[500px]:flex-row max-[500px]:items-center max-[500px]:justify-center max-[500px]:px-1 max-[500px]:py-1",
      ].join(" ")}
      onMouseEnter={(e) =>
        window.innerWidth > 500 &&
        ((e.currentTarget as HTMLElement).style.width = "220px")
      }
      onMouseLeave={(e) =>
        window.innerWidth > 500 &&
        ((e.currentTarget as HTMLElement).style.width = "64px")
      }
      aria-label="Sidnavigering"
    >
      <nav
        aria-label="Huvudnavigering"
        className="flex flex-col gap-1 max-[500px]:w-full max-[500px]:flex-row max-[500px]:justify-around"
      >
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
                "mx-2 flex items-center gap-3 rounded-xl px-3 py-3 text-left whitespace-nowrap transition-colors duration-150 max-[500px]:mx-0 max-[500px]:flex-1 max-[500px]:flex-col max-[500px]:gap-0.5 max-[500px]:px-1 max-[500px]:py-1 max-[500px]:text-center",
                isActive
                  ? "bg-[#0f9f96]/15 text-[#0f9f96]"
                  : "text-muted-foreground hover:bg-[#0f9f96]/15 hover:text-[#0f9f96]",
              ].join(" ")}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100 max-[500px]:text-[10px] max-[500px]:leading-3 max-[500px]:opacity-100">
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
