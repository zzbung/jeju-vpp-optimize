import { Card } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { hour: 0, p10: 85, p50: 95, p90: 105 },
  { hour: 1, p10: 82, p50: 92, p90: 102 },
  { hour: 2, p10: 80, p50: 90, p90: 100 },
  { hour: 3, p10: 78, p50: 88, p90: 98 },
  { hour: 4, p10: 77, p50: 87, p90: 97 },
  { hour: 5, p10: 79, p50: 89, p90: 99 },
  { hour: 6, p10: 85, p50: 95, p90: 105 },
  { hour: 7, p10: 92, p50: 102, p90: 112 },
  { hour: 8, p10: 98, p50: 108, p90: 118 },
  { hour: 9, p10: 102, p50: 112, p90: 122 },
  { hour: 10, p10: 105, p50: 115, p90: 125 },
  { hour: 11, p10: 108, p50: 118, p90: 128 },
  { hour: 12, p10: 110, p50: 120, p90: 130 },
  { hour: 13, p10: 109, p50: 119, p90: 129 },
  { hour: 14, p10: 107, p50: 117, p90: 127 },
  { hour: 15, p10: 105, p50: 115, p90: 125 },
  { hour: 16, p10: 102, p50: 112, p90: 122 },
  { hour: 17, p10: 100, p50: 110, p90: 120 },
  { hour: 18, p10: 105, p50: 115, p90: 125 },
  { hour: 19, p10: 110, p50: 120, p90: 130 },
  { hour: 20, p10: 108, p50: 118, p90: 128 },
  { hour: 21, p10: 102, p50: 112, p90: 122 },
  { hour: 22, p10: 95, p50: 105, p90: 115 },
  { hour: 23, p10: 88, p50: 98, p90: 108 },
];

export function SMPForecastChart() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">SMP 예측 (명일)</h3>
        <p className="text-sm text-muted-foreground">P10 / P50 / P90 구간별 예측가격</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorP90" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorP50" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.5} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="hour" 
            stroke="hsl(var(--muted-foreground))"
            label={{ value: '시간 (Hour)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            label={{ value: 'SMP (원/kWh)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Area
            type="monotone"
            dataKey="p90"
            stroke="hsl(var(--chart-3))"
            fill="url(#colorP90)"
            strokeWidth={1}
          />
          <Area
            type="monotone"
            dataKey="p50"
            stroke="hsl(var(--chart-1))"
            fill="url(#colorP50)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="p10"
            stroke="hsl(var(--chart-2))"
            fill="transparent"
            strokeWidth={1}
            strokeDasharray="5 5"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-chart-2 border-2 border-chart-2" style={{ opacity: 0.6 }} />
          <span className="text-muted-foreground">P10 (하한)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-chart-1" />
          <span className="text-muted-foreground">P50 (중간)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-chart-3" />
          <span className="text-muted-foreground">P90 (상한)</span>
        </div>
      </div>
    </Card>
  );
}
