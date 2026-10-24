import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const meta = {
  title: "UI/Table",
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Recent invoices</TableCaption>
      <TableHeader>
        <TableRow><TableHead>Supplier</TableHead><TableHead>Status</TableHead><TableHead>Amount</TableHead></TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableCell>Northwind</TableCell><TableCell>Paid</TableCell><TableCell>12,400 kr</TableCell></TableRow>
        <TableRow><TableCell>Contoso</TableCell><TableCell>Due</TableCell><TableCell>8,200 kr</TableCell></TableRow>
      </TableBody>
    </Table>
  ),
};
