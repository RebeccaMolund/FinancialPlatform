import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateFieldButton } from "./DateFieldButton";

const meta = {
  title: "Application/DateFieldButton",
  component: DateFieldButton,
  args: {
    label: "1 jan. 2025 – 31 jan. 2025",
    open: false,
    onClick: () => undefined,
  },
} satisfies Meta<typeof DateFieldButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { open: true } };
