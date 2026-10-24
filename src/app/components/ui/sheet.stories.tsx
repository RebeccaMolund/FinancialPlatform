import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

const meta = {
  title: "UI/Sheet",
  component: Sheet,
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

function SheetExample({ side = "right", open = false }: {
  side?: "top" | "bottom" | "left" | "right";
  open?: boolean;
}) {
  return (
    <Sheet defaultOpen={open}>
      <SheetTrigger asChild><Button variant="outline">Open sheet</Button></SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Dashboard filters</SheetTitle>
          <SheetDescription>Adjust the selected reporting period.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export const Default: Story = { render: () => <SheetExample /> };
export const Open: Story = { render: () => <SheetExample open /> };
export const Top: Story = { render: () => <SheetExample side="top" open /> };
export const Bottom: Story = { render: () => <SheetExample side="bottom" open /> };
export const Left: Story = { render: () => <SheetExample side="left" open /> };
export const Right: Story = { render: () => <SheetExample side="right" open /> };
