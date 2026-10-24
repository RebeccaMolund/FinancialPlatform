import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "./scroll-area";

const meta = {
  title: "UI/ScrollArea",
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea style={{ height: 180, width: 280, border: "1px solid var(--border)", padding: "1rem" }}>
      {Array.from({ length: 12 }, (_, index) => (
        <p key={index}>Invoice row {index + 1}</p>
      ))}
    </ScrollArea>
  ),
};
