import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const TOTAL = 6846500;

const data = [
  { name: "1. Solent", pct: 19.02, color: "#0d9488" },
  { name: "2. Jämtkraft", pct: 17.18, color: "#0f9f96" },
  { name: "3. Nyman", pct: 14.36, color: "#1ab5a8" },
  { name: "4. Falun Energi", pct: 13.4, color: "#5eead4" },
  { name: "5. Peab", pct: 11.53, color: "#99f6e4" },
  { name: "6. Fyrfältet", pct: 7.11, color: "#0f766e" },
  { name: "7. Falu Energi", pct: 6.01, color: "#115e59" },
  { name: "8. Totalentreprenad", pct: 4.93, color: "#134e4a" },
  { name: "9. Fastoc", pct: 4.23, color: "#1a7a6e" },
  { name: "10. CKC", pct: 2.23, color: "#3fb8a8" },
].map((item) => ({
  ...item,
  value: item.pct,
  sek: Math.round((item.pct / 100) * TOTAL),
}));

function formatSek(n: number) {
  return n.toLocaleString("sv-SE") + " kr";
}

function CenterLabel() {
  return (
    <g>
      <text
        x="50%"
        y="46%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-gray-900"
        style={{ fontSize: 15, fontWeight: 700 }}
      >
        6 846 500 kr
      </text>
      <text
        x="50%"
        y="57%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-gray-400"
        style={{ fontSize: 12 }}
      >
        Totalt
      </text>
    </g>
  );
}

export function SupplierDonutChart() {
  const radius = 80;
  const strokeWidth = 28;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">
          Totalbelopp per leverantör - Top 10
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6 min-w-0 w-full">
          <div className="shrink-0 min-w-0" style={{ width: 220, height: 220 }}>
            <svg
              viewBox="0 0 220 220"
              width="100%"
              height="100%"
              aria-label="Supplier donut chart"
              role="img"
            >
              <g transform="translate(110 110) rotate(-90)">
                {data.map((entry, index) => {
                  const segmentLength = (entry.value / 100) * circumference;
                  const dashOffset = -cumulative;
                  cumulative += segmentLength;

                  return (
                    <circle
                      key={`svg-cell-${index}`}
                      r={radius}
                      cx={0}
                      cy={0}
                      fill="none"
                      stroke={entry.color}
                      strokeWidth={strokeWidth}
                      strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="butt"
                    />
                  );
                })}
              </g>
              <g transform="translate(110 110)">
                <CenterLabel />
              </g>
            </svg>
          </div>
          <div className="flex-1 flex flex-col gap-1 text-xs min-w-0 max-w-[290px] overflow-hidden">
            {data.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 min-w-0 w-full"
              >
                <div className="flex items-center gap-2 min-w-0 overflow-hidden flex-1">
                  <div
                    className="size-2.5 rounded-sm shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 truncate min-w-0 max-w-full">
                    {item.name}
                  </span>
                </div>
                <span className="font-medium text-gray-900 shrink-0 text-right">
                  {formatSek(item.sek)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
