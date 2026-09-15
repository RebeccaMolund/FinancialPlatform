import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { SpendPoint } from "../../types/spend";
import { getSpendData } from "../../services/spend";

export function SpendAnalysisChart() {
  const [data, setData] = useState<SpendPoint[]>([]);

  useEffect(() => {
    let active = true;
    getSpendData().then((points) => {
      if (active) setData(points);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">
          Spend-analys historisk (per valuta)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              key="x-axis"
              dataKey="month"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              key="y-axis"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              key="tooltip"
              cursor={{ fill: "rgba(20,184,166,0.12)" }}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                fontSize: 12,
              }}
            />
            <Legend
              key="legend"
              wrapperStyle={{ fontSize: "12px" }}
              iconType="square"
            />
            <Bar
              key="bar-sek"
              dataKey="Sek"
              name="SEK"
              fill="#0f9f96"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              key="bar-euro"
              dataKey="Euro"
              name="Euro"
              fill="#a78bfa"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
