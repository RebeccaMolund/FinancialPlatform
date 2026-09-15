import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { getSupplierData } from "../../services/supplier";
import type { SupplierPoint } from "../../types/supplier";

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
  const [data, setData] = useState<SupplierPoint[]>([]);

  useEffect(() => {
    let active = true;
    getSupplierData().then((points) => {
      if (active) setData(points);
    });
    return () => {
      active = false;
    };
  }, []);

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
