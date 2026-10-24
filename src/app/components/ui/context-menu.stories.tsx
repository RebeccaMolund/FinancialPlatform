import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./context-menu";

const meta = {
  title: "UI/ContextMenu",
  component: ContextMenu,
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div style={{ border: "1px dashed var(--border)", padding: "2rem" }}>
          Right-click target
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>Unavailable</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
