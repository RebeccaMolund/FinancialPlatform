import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Avatar>
        <AvatarImage src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%230f9f96'/%3E%3C/svg%3E" alt="Profile" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar><AvatarFallback>CD</AvatarFallback></Avatar>
    </div>
  ),
};
