import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  args: { defaultValue: "monthly" },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function Choices({ disabled = false, invalid = false }: {
  disabled?: boolean;
  invalid?: boolean;
}) {
  return (
    <RadioGroup defaultValue="monthly" disabled={disabled} aria-invalid={invalid || undefined}>
      {[
        ["monthly", "Monthly"],
        ["quarterly", "Quarterly"],
        ["yearly", "Yearly"],
      ].map(([value, label]) => (
        <div key={value} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <RadioGroupItem value={value} id={value} />
          <Label htmlFor={value}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export const Default: Story = { render: () => <Choices /> };
export const Disabled: Story = { render: () => <Choices disabled /> };
export const Error: Story = { render: () => <Choices invalid /> };
