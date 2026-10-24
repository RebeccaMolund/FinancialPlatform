import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { Input } from "./input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

const meta = {
  title: "UI/Form",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function FormExample({ invalid = false }: { invalid?: boolean }) {
  const form = useForm<{ supplier: string }>({
    defaultValues: { supplier: invalid ? "" : "Northwind Supplies" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => undefined)}
        style={{ display: "grid", gap: "0.75rem", maxWidth: 360 }}
      >
        <FormField
          control={form.control}
          name="supplier"
          rules={{ required: "Supplier is required." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier</FormLabel>
              <FormControl>
                <Input {...field} aria-invalid={invalid || undefined} />
              </FormControl>
              {invalid && <FormMessage />}
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

export const Default: Story = { render: () => <FormExample /> };
export const Error: Story = { render: () => <FormExample invalid /> };
