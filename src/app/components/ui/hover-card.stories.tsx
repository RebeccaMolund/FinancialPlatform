import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./hover-card";

const meta = {
  title: "UI/HoverCard",
  component: HoverCard,
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

function HoverCardExample({ open = false }: { open?: boolean }) {
  return (
    <HoverCard defaultOpen={open}>
      <HoverCardTrigger asChild><button type="button">Supplier details</button></HoverCardTrigger>
      <HoverCardContent>
        <strong>Northwind Supplies</strong>
        <p>Account information shown on hover or focus.</p>
      </HoverCardContent>
    </HoverCard>
  );
}

export const Default: Story = {
  render: () => <HoverCardExample />,
};
export const Open: Story = { render: () => <HoverCardExample open /> };
