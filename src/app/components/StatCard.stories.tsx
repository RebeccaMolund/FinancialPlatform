import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart3 } from "lucide-react";
import { StatCard } from "./StatCard";

const meta = {
  title: "Application/StatCard",
  component: StatCard,
  args: {
    title: "Total spend",
    value: "1,245,600 kr",
    subtitle: "Compared with previous month",
    icon: BarChart3,
    backgroundColor: "bg-[#fce7f3]",
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DarkModeColorMapping: Story = { args: { darkMode: true } };
