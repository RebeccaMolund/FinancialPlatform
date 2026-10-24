import type { Meta, StoryObj } from "@storybook/react-vite";
import { ImageWithFallback } from "./ImageWithFallback";

const meta = {
  title: "Application/ImageWithFallback",
  component: ImageWithFallback,
  args: {
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='80'%3E%3Crect width='160' height='80' fill='%23d9f8f4'/%3E%3Ctext x='12' y='46' font-size='14'%3EImage%20preview%3C/text%3E%3C/svg%3E",
    alt: "Example illustration",
    style: { width: 160, height: 80, objectFit: "cover" },
  },
} satisfies Meta<typeof ImageWithFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FallbackAfterImageError: Story = {
  args: { src: "/storybook-missing-image.png" },
};
