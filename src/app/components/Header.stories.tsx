import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./Header";

const meta = {
  title: "Application/Header",
  component: Header,
  args: {
    editMode: false,
    range: {
      start: new Date("2025-01-01T12:00:00"),
      end: new Date("2025-01-31T12:00:00"),
    },
    currency: "SEK",
    onCurrencyChange: () => undefined,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const EditMode: Story = { args: { editMode: true } };
export const EmptyDateRange: Story = {
  args: { range: { start: null, end: null } },
};
