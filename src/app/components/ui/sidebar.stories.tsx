import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./sidebar";

const meta = {
  title: "UI/Sidebar",
  component: SidebarMenuButton,
  args: { children: "Dashboard", isActive: true, variant: "default", size: "default" },
} satisfies Meta<typeof SidebarMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

function SidebarExample(props: ComponentProps<typeof SidebarMenuButton>) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem><SidebarMenuButton {...props} /></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

export const Default: Story = { render: (args) => <SidebarExample {...args} /> };
export const VariantsAndSizes: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu buttons</SidebarGroupLabel>
            <SidebarMenu>
              {(["default", "outline"] as const).flatMap((variant) =>
                (["default", "sm", "lg"] as const).map((size) => (
                  <SidebarMenuItem key={`${variant}-${size}`}>
                    <SidebarMenuButton variant={variant} size={size}>
                      {variant} / {size}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )),
              )}
              <SidebarMenuItem><SidebarMenuButton disabled>Disabled</SidebarMenuButton></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
};
