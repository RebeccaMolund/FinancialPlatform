import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

const meta = {
  title: "UI/Drawer",
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function DrawerExample({ open = false }: { open?: boolean }) {
  return (
    <Drawer defaultOpen={open}>
      <DrawerTrigger asChild><Button variant="outline">Open drawer</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>Update the dashboard filters.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter><Button>Apply</Button></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export const Default: Story = {
  render: () => <DrawerExample />,
};
export const Open: Story = { render: () => <DrawerExample open /> };
