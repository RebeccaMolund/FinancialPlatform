import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const TOTAL = 6846500;

const data = [
  { name: "1. Solent", pct: 19.02, color: "#0d9488" },
  { name: "2. Jämtkraft", pct: 17.18, color: "#14b8a6" },
  { name: "3. Nyman", pct: 14.36, color: "#2dd4bf" },
  { name: "4. Falun Energi", pct: 13.40, color: "#5eead4" },
  { name: "5. Peab", pct: 11.53, color: "#99f6e4" },
  { name: "6. Fyrfältet", pct: 7.11, color: "#0f766e" },
  { name: "7. Falu Energi", pct: 6.01, color: "#115e59" },
  { name: "8. Totalentreprenad", pct: 4.93, color: "#134e4a" },
  { name: "9. Fastoc", pct: 4.23, color: "#1a7a6e" },
  { name: "10. CKC", pct: 2.23, color: "#3fb8a8" },
].map(item => ({ ...item, value: item.pct, sek: Math.round((item.pct / 100) * TOTAL) }));

function formatSek(n: number) {
  return n.toLocaleString("sv-SE") + " kr";
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-md px-3 py-2 text-xs">
      <p className="font-semibold text-gray-800 mb-1">{item.name}</p>
      <p className="text-gray-600">{item.pct.toFixed(2)}%</p>
      <p className="text-gray-900 font-medium">{formatSek(item.sek)}</p>
    </div>
  );
}

function CenterLabel() {
  return (
    <g>
      <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-900" style={{ fontSize: 15, fontWeight: 700 }}>
        6 846 500 kr
      </text>
      <text x="50%" y="57%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-400" style={{ fontSize: 12 }}>
        Totalt
      </text>
    </g>
  );
}

export function SupplierDonutChart() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">Totalbelopp per leverantör - Top 10</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <div className="shrink-0" style={{ width: 220, height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  key="donut-pie"
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <CenterLabel />
                <Tooltip key="donut-tooltip" content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 flex flex-col gap-1 text-xs min-w-0">
            {data.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="size-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600 truncate">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900 shrink-0">{formatSek(item.sek)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
