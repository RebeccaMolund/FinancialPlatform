import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", Sek: 2000, Euro: 1500 },
  { month: "Feb", Sek: 3000, Euro: 2000 },
  { month: "Mar", Sek: 4500, Euro: 2500 },
  { month: "April", Sek: 4000, Euro: 3000 },
  { month: "Maj", Sek: 2000, Euro: 1000 },
];

export function SpendAnalysisChart() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">Spend-analys historisk (per valuta)</CardTitle>
</CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis key="x-axis" dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis key="y-axis" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              key="tooltip"
              cursor={{ fill: "rgba(20,184,166,0.12)" }}
              contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 12 }}
            />
            <Legend key="legend" wrapperStyle={{ fontSize: "12px" }} iconType="square" />
            <Bar key="bar-sek" dataKey="Sek" name="SEK" fill="#14b8a6" radius={[4, 4, 0, 0]} />
            <Bar key="bar-euro" dataKey="Euro" name="Euro" fill="#a78bfa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
