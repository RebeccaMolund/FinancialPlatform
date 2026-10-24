import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "./Sidebar";

const meta = {
  title: "Application/Sidebar",
  component: Sidebar,
  args: {
    currentPage: "dashboard",
    onNavigate: () => undefined,
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {};
export const AnalysisSelected: Story = { args: { currentPage: "ny-analys" } };
export const SavedAnalysesSelected: Story = { args: { currentPage: "sparade" } };
export const SettingsSelected: Story = { args: { currentPage: "installningar" } };
