import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "./toggle";

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  args: { children: "Pin", variant: "default", size: "default" },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const VariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {(["default", "outline"] as const).flatMap((variant) =>
        (["default", "sm", "lg"] as const).map((size) => (
          <Toggle key={`${variant}-${size}`} variant={variant} size={size}>
            {variant} / {size}
          </Toggle>
        )),
      )}
    </div>
  ),
};
export const Pressed: Story = { args: { pressed: true } };
export const Disabled: Story = { args: { disabled: true } };
