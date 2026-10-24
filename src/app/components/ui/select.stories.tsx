import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta = {
  title: "UI/Select",
  component: Select,
  args: { defaultValue: "sek" },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

function CurrencySelect({ disabled = false, invalid = false, size = "default" }: {
  disabled?: boolean;
  invalid?: boolean;
  size?: "default" | "sm";
}) {
  return (
    <Select defaultValue="sek" disabled={disabled}>
      <SelectTrigger
        size={size}
        aria-invalid={invalid || undefined}
        style={{ width: 220 }}
      >
        <SelectValue placeholder="Choose currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectLabel>Currency</SelectLabel>
        <SelectItem value="sek">SEK</SelectItem>
        <SelectItem value="eur">EUR</SelectItem>
        <SelectSeparator />
        <SelectItem value="usd">USD</SelectItem>
      </SelectContent>
    </Select>
  );
}

export const Default: Story = { render: () => <CurrencySelect /> };
export const Small: Story = { render: () => <CurrencySelect size="sm" /> };
export const Disabled: Story = { render: () => <CurrencySelect disabled /> };
export const Error: Story = { render: () => <CurrencySelect invalid /> };
