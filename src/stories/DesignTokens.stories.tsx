import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Design system/Design tokens",
  parameters: {
    controls: { disable: true },
    themePair: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const colors = [
  "--background",
  "--foreground",
  "--surface-lowest",
  "--surface-low",
  "--surface-high",
  "--surface-highest",
  "--surface-variant",
  "--card",
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--accent",
  "--destructive",
  "--border",
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
];

function ThemeTokens({ theme }: { theme: "light" | "dark" }) {
  return (
    <section className={theme === "dark" ? "dark" : ""}>
      <div
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
          padding: "1.25rem",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>{theme} theme</h2>
        <h3 style={{ fontSize: "0.875rem", marginTop: "1rem" }}>Color</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "0.5rem",
          }}
        >
          {colors.map((token) => (
            <div
              key={token}
              style={{
                background: `var(${token})`,
                color:
                  token.endsWith("foreground") || token === "--foreground"
                    ? "var(--background)"
                    : "var(--foreground)",
                border: "1px solid var(--border)",
                borderRadius: "0.375rem",
                padding: "0.5rem",
                fontSize: "0.75rem",
              }}
            >
              {token}
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: "0.875rem", marginTop: "1rem" }}>Spacing</h3>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          {[1, 2, 4, 6, 8].map((step) => (
            <div
              key={step}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <code style={{ width: "3rem", fontSize: "0.75rem" }}>
                {step * 4}px
              </code>
              <div
                style={{
                  width: `${step * 0.25}rem`,
                  height: "0.75rem",
                  background: "var(--primary)",
                  borderRadius: "0.125rem",
                }}
              />
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: "0.875rem", marginTop: "1rem" }}>Typography</h3>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--font-size)",
              fontWeight: "var(--font-weight-normal)",
            }}
          >
            Inter / base size / normal weight
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--font-size)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            Inter / base size / medium weight
          </p>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "var(--font-size)",
              fontWeight: "var(--font-weight-normal)",
            }}
          >
            IBM Plex Sans / base size / normal weight
          </p>
        </div>
      </div>
    </section>
  );
}

export const LightAndDark: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>
      <ThemeTokens theme="light" />
      <ThemeTokens theme="dark" />
    </div>
  ),
};
