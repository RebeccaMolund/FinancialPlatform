import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", width: 320 }}>
      <Skeleton style={{ width: 120, height: 20 }} />
      <Skeleton style={{ width: "100%", height: 14 }} />
      <Skeleton style={{ width: "80%", height: 14 }} />
      <Skeleton style={{ width: 72, height: 72, borderRadius: "50%" }} />
    </div>
  ),
};
