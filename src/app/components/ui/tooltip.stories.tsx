import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

function TooltipExample({ open = false }: { open?: boolean }) {
  return (
    <TooltipProvider>
      <Tooltip defaultOpen={open}>
        <TooltipTrigger>Hover or focus for details</TooltipTrigger>
        <TooltipContent>Additional context for this control.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export const Default: Story = {
  render: () => <TooltipExample />,
};
export const Open: Story = { render: () => <TooltipExample open /> };
