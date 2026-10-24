import type { ComponentProps } from "react";
import type { Accordion } from "./accordion";
import type { Alert } from "./alert";
import type { AlertDialog } from "./alert-dialog";
import type { Avatar } from "./avatar";
import type { Badge } from "./badge";
import type { Breadcrumb } from "./breadcrumb";
import type { Calendar } from "./calendar";
import type { Card } from "./card";
import type { Checkbox } from "./checkbox";
import type { ChartContainer } from "./chart";
import type { Command } from "./command";
import type { ContextMenu } from "./context-menu";
import type { Dialog } from "./dialog";
import type { Drawer } from "./drawer";
import type { DropdownMenu } from "./dropdown-menu";
import type { Form } from "./form";
import type { HoverCard } from "./hover-card";
import type { Input } from "./input";
import type { InputOTP } from "./input-otp";
import type { Menubar } from "./menubar";
import type { NavigationMenu } from "./navigation-menu";
import type { Popover } from "./popover";
import type { Progress } from "./progress";
import type { RadioGroup } from "./radio-group";
import type { ScrollArea } from "./scroll-area";
import type { Select } from "./select";
import type { Separator } from "./separator";
import type { Sheet, SheetContent } from "./sheet";
import type { Skeleton } from "./skeleton";
import type { Slider } from "./slider";
import type { SidebarMenuButton } from "./sidebar";
import type { Switch } from "./switch";
import type { Table } from "./table";
import type { Tabs } from "./tabs";
import type { Textarea } from "./textarea";
import type { Toggle } from "./toggle";
import type { ToggleGroup } from "./toggle-group";
import type { Tooltip } from "./tooltip";
export type { ButtonProps } from "./button";

/** Props for an expandable single- or multi-section disclosure. */
export type AccordionProps = ComponentProps<typeof Accordion>;

/** Props for a confirmation dialog root. */
export type AlertDialogProps = ComponentProps<typeof AlertDialog>;

/** Props for a semantic information or destructive alert container. */
export type AlertProps = ComponentProps<typeof Alert>;

/** Props for the avatar image and fallback container. */
export type AvatarProps = ComponentProps<typeof Avatar>;

/** Props for a status badge, including its visual variant. */
export type BadgeProps = ComponentProps<typeof Badge>;

/** Props for the breadcrumb navigation landmark. */
export type BreadcrumbProps = ComponentProps<typeof Breadcrumb>;

/** Props accepted by the calendar date picker. */
export type CalendarProps = ComponentProps<typeof Calendar>;

/** Props for the application's card surface container. */
export type CardProps = ComponentProps<typeof Card>;

/** Props for the responsive chart container and its theme-aware series configuration. */
export type ChartContainerProps = ComponentProps<typeof ChartContainer>;

/** Props for a native right-click context menu. */
export type ContextMenuProps = ComponentProps<typeof ContextMenu>;

/** Props for the accessible checkbox control, including checked and disabled states. */
export type CheckboxProps = ComponentProps<typeof Checkbox>;

/** Props for the searchable command menu root. */
export type CommandProps = ComponentProps<typeof Command>;

/** Props for the modal dialog root. */
export type DialogProps = ComponentProps<typeof Dialog>;

/** Props for the drawer root. */
export type DrawerProps = ComponentProps<typeof Drawer>;

/** Props for the dropdown menu root used to group selectable menu items. */
export type DropdownMenuProps = ComponentProps<typeof DropdownMenu>;

/** Props accepted by the React Hook Form provider wrapper. */
export type FormProps = ComponentProps<typeof Form>;

/** Props for a hover-triggered supplemental content card. */
export type HoverCardProps = ComponentProps<typeof HoverCard>;

/** Props for the native input wrapper, including its invalid and disabled states. */
export type InputProps = ComponentProps<typeof Input>;

/** Props for the one-time-password input, including its length and disabled state. */
export type InputOTPProps = ComponentProps<typeof InputOTP>;

/** Props for the horizontal application menu root. */
export type MenubarProps = ComponentProps<typeof Menubar>;

/** Props for the accessible hierarchical navigation menu root. */
export type NavigationMenuProps = ComponentProps<typeof NavigationMenu>;

/** Props for the floating popover root. */
export type PopoverProps = ComponentProps<typeof Popover>;

/** Props for the determinate or indeterminate progress indicator. */
export type ProgressProps = ComponentProps<typeof Progress>;

/** Props for a mutually exclusive radio selection group. */
export type RadioGroupProps = ComponentProps<typeof RadioGroup>;

/** Props for the scrollable content viewport. */
export type ScrollAreaProps = ComponentProps<typeof ScrollArea>;

/** Props for the select root; use with the related SelectTrigger and SelectItem components. */
export type SelectProps = ComponentProps<typeof Select>;

/** Props for a decorative or semantic horizontal/vertical divider. */
export type SeparatorProps = ComponentProps<typeof Separator>;

/** Props for the sheet root that coordinates its trigger and content. */
export type SheetProps = ComponentProps<typeof Sheet>;

/** Props for sheet content, including its supported placement side. */
export type SheetContentProps = ComponentProps<typeof SheetContent>;

/** Props for a loading placeholder block. */
export type SkeletonProps = ComponentProps<typeof Skeleton>;

/** Props for the value slider, including range and disabled states. */
export type SliderProps = ComponentProps<typeof Slider>;

/** Props for sidebar menu buttons, including supported variants and sizes. */
export type SidebarMenuButtonProps = ComponentProps<typeof SidebarMenuButton>;

/** Props for the binary switch control. */
export type SwitchProps = ComponentProps<typeof Switch>;

/** Props for the tabs root that coordinates its trigger and content children. */
export type TabsProps = ComponentProps<typeof Tabs>;

/** Props for a semantic data table root. */
export type TableProps = ComponentProps<typeof Table>;

/** Props for the native multiline text input, including invalid and disabled states. */
export type TextareaProps = ComponentProps<typeof Textarea>;

/** Props for a pressable on/off toggle, including its variants and sizes. */
export type ToggleProps = ComponentProps<typeof Toggle>;

/** Props for the single- or multiple-selection toggle group. */
export type ToggleGroupProps = ComponentProps<typeof ToggleGroup>;

/** Props for a tooltip root and its trigger/content composition. */
export type TooltipProps = ComponentProps<typeof Tooltip>;
