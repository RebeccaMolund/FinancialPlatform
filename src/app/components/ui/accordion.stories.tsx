import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  args: { type: "single", collapsible: true },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible style={{ width: "100%", maxWidth: 500 }}>
      <AccordionItem value="overview">
        <AccordionTrigger>Overview</AccordionTrigger>
        <AccordionContent>Summary content for this section.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="details">
        <AccordionTrigger>Details</AccordionTrigger>
        <AccordionContent>Additional information appears here.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="unavailable" disabled>
        <AccordionTrigger>Unavailable</AccordionTrigger>
        <AccordionContent>This item is disabled.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
