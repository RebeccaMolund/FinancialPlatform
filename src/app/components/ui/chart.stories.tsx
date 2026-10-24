import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart";

const chartConfig = {
  amount: {
    label: "Spend",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

const meta = {
  title: "UI/Chart",
  component: ChartContainer,
  args: { config: chartConfig, children: <></> },
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
  { month: "Jan", amount: 24 },
  { month: "Feb", amount: 31 },
  { month: "Mar", amount: 18 },
];

export const Default: Story = {
  render: (args) => (
    <ChartContainer {...args} className="h-64 w-full">
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="amount" fill="var(--color-chart-1)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};
