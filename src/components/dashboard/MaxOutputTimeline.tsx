import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Thermometer, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

// 최대출력 예측 데이터 (복합발전최대출력예측_그래프 참조)
const hourlyOutput = Array.from({ length: 24 }, (_, i) => {
  const isOff = i >= 13 && i <= 18;
  return {
    hour: `${i.toString().padStart(2, '0')}`,
    predicted: isOff ? 0 : 440 + Math.sin(i * 0.3) * 10,
    bid: isOff ? 0 : 425 + Math.sin(i * 0.3) * 8,
    actual: i < 12 ? (isOff ? 0 : 430 + Math.sin(i * 0.3) * 12) : undefined,
  };
});

// 기온 보정 데이터
const correctionData = [
  { plant: "복합#1 GT", rated: 450, corrected: 442, temp: 28.5, rmse: 2.68, mae: 2.07 },
  { plant: "복합#2 GT", rated: 450, corrected: 438, temp: 27.8, rmse: 2.71, mae: 2.12 },
  { plant: "복합#1 ST", rated: 200, corrected: 195, temp: 28.5, rmse: 1.85, mae: 1.42 },
  { plant: "복합#2 ST", rated: 200, corrected: 193, temp: 27.8, rmse: 1.91, mae: 1.48 },
];

const totalRated = correctionData.reduce((s, d) => s + d.rated, 0);
const totalCorrected = correctionData.reduce((s, d) => s + d.corrected, 0);

export function MaxOutputTimeline() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">복합발전 최대출력 예측</h3>
        <p className="text-sm text-muted-foreground">명일 복합발전 기온보정 최대출력</p>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg bg-secondary/50 border border-border p-3 text-center">
          <p className="text-xs text-muted-foreground">정격 합계</p>
          <p className="text-xl font-bold text-foreground">{totalRated}</p>
          <p className="text-xs text-muted-foreground">MW</p>
        </div>
        <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 text-center">
          <p className="text-xs text-muted-foreground">보정 최대출력</p>
          <p className="text-xl font-bold text-primary">{totalCorrected}</p>
          <p className="text-xs text-muted-foreground">MW</p>
        </div>
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-center">
          <p className="text-xs text-muted-foreground">기온 보정량</p>
          <p className="text-xl font-bold text-destructive flex items-center justify-center gap-1">
            <TrendingDown className="h-4 w-4" />
            {totalRated - totalCorrected}
          </p>
          <p className="text-xs text-muted-foreground">MW</p>
        </div>
      </div>

      <Tabs defaultValue="output" className="space-y-3">
        <TabsList className="w-full grid grid-cols-2 h-8">
          <TabsTrigger value="output" className="text-xs">최대출력 예측</TabsTrigger>
          <TabsTrigger value="correction" className="text-xs">기온 보정</TabsTrigger>
        </TabsList>

        {/* 최대출력 예측 탭: 미니 라인차트 */}
        <TabsContent value="output" className="mt-0">
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyOutput} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="hour" 
                  stroke="hsl(var(--muted-foreground))" 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  interval={3}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  domain={[-20, 460]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                    fontSize: 12,
                  }}
                  formatter={(value: number, name: string) => [`${value?.toFixed(0)} MW`, name]}
                />
                <ReferenceLine y={0} stroke="hsl(var(--border))" />
                <Line type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" strokeWidth={2} name="예측발전량" dot={false} />
                <Line type="monotone" dataKey="bid" stroke="hsl(var(--success))" strokeWidth={1.5} name="입찰발전량" dot={false} />
                <Line type="monotone" dataKey="actual" stroke="hsl(var(--foreground))" strokeWidth={2} name="실측발전량" dot={false} connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2 justify-center">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="h-2 w-4 rounded-sm bg-primary inline-block" /> 예측
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="h-2 w-4 rounded-sm bg-success inline-block" /> 입찰
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="h-2 w-4 rounded-sm bg-foreground inline-block" /> 실측
            </span>
          </div>
        </TabsContent>

        {/* 기온 보정 탭: 발전기별 보정 현황 */}
        <TabsContent value="correction" className="mt-0">
          <div className="space-y-2.5">
            {correctionData.map((d, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 border border-border"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{d.plant}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Thermometer className="h-3 w-3" />
                      {d.temp}°C
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-semibold text-primary">{d.corrected}</span>
                    <span className="text-xs text-muted-foreground">/ {d.rated} MW</span>
                  </div>
                  <div className="flex gap-2 mt-0.5">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-muted-foreground">
                      RMSE {d.rmse}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-muted-foreground">
                      MAE {d.mae}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
