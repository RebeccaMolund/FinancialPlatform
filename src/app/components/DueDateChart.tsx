import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { day: "1", value: 65 },
  { day: "6", value: 68 },
  { day: "11", value: 55 },
  { day: "16", value: 25 },
  { day: "21", value: 70 },
  { day: "26", value: 45 },
  { day: "31", value: 40 },
];

export function DueDateChart() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">Kommande per förfallodag</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="dueDateGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              key="x-axis"
              dataKey="day"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              key="y-axis"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip key="tooltip" cursor={{ stroke: "rgba(20,184,166,0.4)", strokeWidth: 1 }} contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 12 }} />
            <Area
              key="area-value"
              type="monotone"
              dataKey="value"
              stroke="#a78bfa"
              strokeWidth={2}
              fill="url(#dueDateGradient)"
              dot={{ fill: "#a78bfa", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#a78bfa", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
