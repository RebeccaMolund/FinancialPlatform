import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";

const meta = {
  title: "UI/Popover",
  component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

function PopoverExample({ open = false }: { open?: boolean }) {
  return (
    <Popover defaultOpen={open}>
      <PopoverTrigger asChild><Button variant="outline">Date range</Button></PopoverTrigger>
      <PopoverContent>
        <strong>Choose a period</strong>
        <p>Popover content is positioned relative to its trigger.</p>
      </PopoverContent>
    </Popover>
  );
}

export const Default: Story = {
  render: () => <PopoverExample />,
};
export const Open: Story = { render: () => <PopoverExample open /> };
