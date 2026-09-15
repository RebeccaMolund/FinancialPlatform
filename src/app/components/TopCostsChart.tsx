import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getTopCostsData } from "../../services/top-costs";
import type { TopCostPoint } from "../../types/top-cost";

export function TopCostsChart() {
  const [data, setData] = useState<TopCostPoint[]>([]);

  useEffect(() => {
    let active = true;
    getTopCostsData().then((points) => {
      if (active) setData(points);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <Card className="border-none shadow-none flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">
          10 största kostnader - Artikelnivå
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 pb-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 8, right: 16, top: 0, bottom: 0 }}
          >
            <XAxis
              type="number"
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#6b7280", fontSize: 11 }}
              width={170}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(20,184,166,0.12)" }}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                fontSize: 12,
              }}
            />
            <Bar dataKey="value" fill="#0f9f96" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
