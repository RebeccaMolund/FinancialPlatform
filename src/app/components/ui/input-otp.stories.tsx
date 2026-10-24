import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./input-otp";

const meta = {
  title: "UI/InputOTP",
  component: InputOTP,
  args: {
    maxLength: 6,
    "aria-label": "One-time password",
    render: () => null,
  },
  argTypes: { render: { control: false } },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

function Slots({
  disabled = false,
  invalid = false,
}: {
  disabled?: boolean;
  invalid?: boolean;
}) {
  return (
    <InputOTP maxLength={6} disabled={disabled} aria-invalid={invalid || undefined}>
      <InputOTPGroup>
        {[0, 1, 2].map((index) => <InputOTPSlot key={index} index={index} />)}
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        {[3, 4, 5].map((index) => <InputOTPSlot key={index} index={index} />)}
      </InputOTPGroup>
    </InputOTP>
  );
}

export const Default: Story = { render: () => <Slots /> };
export const Disabled: Story = { render: () => <Slots disabled /> };
export const Error: Story = { render: () => <Slots invalid /> };
