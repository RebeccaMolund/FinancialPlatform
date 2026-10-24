import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "./command";

const meta = {
  title: "UI/Command",
  component: Command,
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command style={{ maxWidth: 360 }}>
      <CommandInput placeholder="Search actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>View dashboard <CommandShortcut>⌘D</CommandShortcut></CommandItem>
          <CommandItem>Export report <CommandShortcut>⌘E</CommandShortcut></CommandItem>
          <CommandItem disabled>Unavailable action</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
export const DisabledInput: Story = {
  render: () => (
    <Command style={{ maxWidth: 360 }}>
      <CommandInput placeholder="Search actions..." disabled />
      <CommandList><CommandEmpty>Search is disabled.</CommandEmpty></CommandList>
    </Command>
  ),
};
