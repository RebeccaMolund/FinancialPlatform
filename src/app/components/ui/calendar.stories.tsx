import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "./calendar";

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  args: { mode: "single" },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithSelectedDate: Story = {
  args: { selected: new Date("2025-01-15T12:00:00") },
};
export const WithDisabledDays: Story = {
  args: { disabled: [{ before: new Date("2025-01-10T12:00:00") }] },
};
