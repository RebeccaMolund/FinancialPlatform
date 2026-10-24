import { useEffect, type ReactNode } from "react";
import type { Preview } from "@storybook/react-vite";
import "../src/styles/index.css";

function ThemeWrapper({
  children,
  dark,
}: {
  children: ReactNode;
  dark: boolean;
}) {
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [dark]);

  return (
    <div
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        minHeight: "100%",
        padding: "1.5rem",
      }}
    >
      {children}
    </div>
  );
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Application color theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => (
      <ThemeWrapper
        dark={
          !context.parameters.themePair &&
          context.globals.theme === "dark"
        }
      >
        <Story />
      </ThemeWrapper>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autodocs: "tag",
    },
  },
  tags: ["autodocs"],
};

export default preview;
