import type { Meta, StoryObj } from "@storybook/react-vite";
import { VariantPicker, type VariantPickerProps } from "./ChartPickers";

const options: VariantPickerProps["options"] = [
  { value: "bar", label: "Bar", icon: "bar" },
  { value: "hbar", label: "Horizontal", icon: "horizontal" },
  { value: "line", label: "Line", icon: "line" },
  { value: "area", label: "Area", icon: "area" },
  { value: "pie", label: "Pie", icon: "pie" },
  { value: "donut", label: "Donut", icon: "donut" },
];

const meta = {
  title: "Application/VariantPicker",
  component: VariantPicker,
  args: {
    current: "bar",
    options,
    onChange: () => undefined,
  },
} satisfies Meta<typeof VariantPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
