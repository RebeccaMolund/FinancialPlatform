import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  args: { orientation: "horizontal" },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <span>Overview</span>
      <Separator {...args} style={{ margin: "1rem 0" }} />
      <span>Invoices</span>
    </div>
  ),
};
export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", height: 40, gap: "1rem" }}>
      <span>Overview</span>
      <Separator {...args} style={{ alignSelf: "stretch" }} />
      <span>Invoices</span>
    </div>
  ),
};
