import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorPicker } from "./ChartPickers";

const colors = ["#0f9f96", "#7c3aed", "#f59e0b", "#ef4444"];

const meta = {
  title: "Application/ColorPicker",
  component: ColorPicker,
  args: {
    current: colors[0],
    colors,
    onChange: () => undefined,
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
