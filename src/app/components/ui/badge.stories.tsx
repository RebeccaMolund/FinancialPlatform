import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  args: { children: "Status" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {(["default", "secondary", "destructive", "outline"] as const).map((variant) => (
        <Badge key={variant} variant={variant}>{variant}</Badge>
      ))}
    </div>
  ),
};
