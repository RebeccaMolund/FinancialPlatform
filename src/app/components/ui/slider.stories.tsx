import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./slider";

const meta = {
  title: "UI/Slider",
  component: Slider,
  args: { defaultValue: [40], min: 0, max: 100, step: 10 },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Range: Story = { args: { defaultValue: [25, 75] } };
export const Disabled: Story = { args: { disabled: true } };
