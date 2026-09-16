import type { DefaultDashboardCard } from "../types/dashboard-config";

export const DEFAULT_DASHBOARD_CARDS: DefaultDashboardCard[] = [
  {
    instanceId: "spend-0",
    type: "builtin",
    builtinKey: "spend",
    variant: "bar",
    color: "#14b8a6",
  },
  {
    instanceId: "suppliers-0",
    type: "builtin",
    builtinKey: "suppliers",
    variant: "donut",
    color: "#14b8a6",
  },
  {
    instanceId: "topcosts-0",
    type: "builtin",
    builtinKey: "topcosts",
    variant: "hbar",
    color: "#14b8a6",
  },
  {
    instanceId: "duedate-0",
    type: "builtin",
    builtinKey: "duedate",
    variant: "area",
    color: "#a78bfa",
  },
];
