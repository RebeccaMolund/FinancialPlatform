import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  args: { children: "Button", variant: "default", size: "default" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const VariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      {(["default", "destructive", "outline", "secondary", "ghost", "link"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <code style={{ width: "6rem" }}>{variant}</code>
          {(["default", "sm", "lg", "icon"] as const).map((size) => (
            <Button key={size} variant={variant} size={size}>
              {size.startsWith("icon") ? "＋" : size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
export const Disabled: Story = { args: { disabled: true } };
export const Error: Story = { args: { "aria-invalid": true } };
