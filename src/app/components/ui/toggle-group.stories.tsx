import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
  args: { type: "single", defaultValue: "month" },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="month" aria-label="Reporting period">
      <ToggleGroupItem value="week" aria-label="Week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month" aria-label="Month">Month</ToggleGroupItem>
      <ToggleGroupItem value="year" aria-label="Year">Year</ToggleGroupItem>
    </ToggleGroup>
  ),
};
export const VariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      {(["default", "outline"] as const).flatMap((variant) =>
        (["default", "sm", "lg"] as const).map((size) => (
          <ToggleGroup key={`${variant}-${size}`} type="single" variant={variant} size={size} defaultValue="second">
            <ToggleGroupItem value="first">First</ToggleGroupItem>
            <ToggleGroupItem value="second">Second</ToggleGroupItem>
          </ToggleGroup>
        )),
      )}
    </div>
  ),
};
export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="month" disabled aria-label="Reporting period">
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
      <ToggleGroupItem value="year">Year</ToggleGroupItem>
    </ToggleGroup>
  ),
};
