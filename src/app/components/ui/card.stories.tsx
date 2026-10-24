import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <CardHeader>
        <CardTitle>Monthly spend</CardTitle>
        <CardDescription>Summary for the selected period</CardDescription>
        <CardAction>•••</CardAction>
      </CardHeader>
      <CardContent>1,245,600 kr</CardContent>
      <CardFooter>Updated just now</CardFooter>
    </Card>
  ),
};
