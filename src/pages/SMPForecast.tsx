import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

// Mock data for SMP forecast
const hourlyForecast = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, '0')}:00`,
  p10: 80 + Math.random() * 30,
  p50: 110 + Math.random() * 40,
  p90: 140 + Math.random() * 50,
  actual: i < 12 ? 115 + Math.random() * 35 : null,
}));

const weeklyTrend = Array.from({ length: 7 }, (_, i) => ({
  date: `10/${19 + i}`,
  avgSMP: 100 + Math.random() * 40,
  maxSMP: 140 + Math.random() * 50,
  minSMP: 70 + Math.random() * 30,
}));

const SMPForecast = () => {
  const currentAvg = 118.5;
  const previousAvg = 112.3;
  const change = ((currentAvg - previousAvg) / previousAvg) * 100;

  return (
    <div className="p-6 space-y-6 bg-background">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">SMP 예측 분석</h1>
        <p className="text-muted-foreground">System Marginal Price 실시간 예측 및 분석</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-primary/20 shadow-glow">
          <CardHeader className="pb-3">
            <CardDescription>현재 평균 SMP</CardDescription>
            <CardTitle className="text-3xl text-primary">{currentAvg.toFixed(1)} 원/kWh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {change > 0 ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={change > 0 ? "text-success" : "text-destructive"}>
                {change > 0 ? "+" : ""}{change.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground">vs 전일</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>예측 최고가</CardDescription>
            <CardTitle className="text-3xl text-foreground">185.2 원/kWh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">14:00 ~ 16:00 예상</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>예측 최저가</CardDescription>
            <CardTitle className="text-3xl text-foreground">82.3 원/kWh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">03:00 ~ 05:00 예상</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hourly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hourly">시간대별 예측</TabsTrigger>
          <TabsTrigger value="weekly">주간 추이</TabsTrigger>
          <TabsTrigger value="table">상세 데이터</TabsTrigger>
        </TabsList>

        <TabsContent value="hourly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>명일 SMP 예측 밴드</CardTitle>
              <CardDescription>P10, P50, P90 신뢰구간 기반 예측</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={hourlyForecast}>
                  <defs>
                    <linearGradient id="colorP90" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="hour" 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    label={{ value: '원/kWh', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                  <Area type="monotone" dataKey="p90" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorP90)" name="P90 (상한)" />
                  <Area type="monotone" dataKey="p10" stroke="hsl(var(--primary))" fillOpacity={0.1} fill="hsl(var(--primary))" name="P10 (하한)" />
                  <Line type="monotone" dataKey="p50" stroke="hsl(var(--chart-2))" strokeWidth={3} name="P50 (중간값)" dot={false} />
                  <Line type="monotone" dataKey="actual" stroke="hsl(var(--success))" strokeWidth={2} name="실측값" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>주간 SMP 추이</CardTitle>
              <CardDescription>최근 7일 평균/최고/최저 SMP</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                  <Line type="monotone" dataKey="maxSMP" stroke="hsl(var(--destructive))" strokeWidth={2} name="최고가" />
                  <Line type="monotone" dataKey="avgSMP" stroke="hsl(var(--primary))" strokeWidth={3} name="평균" />
                  <Line type="monotone" dataKey="minSMP" stroke="hsl(var(--chart-3))" strokeWidth={2} name="최저가" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>시간대별 상세 예측값</CardTitle>
              <CardDescription>24시간 SMP 예측 데이터</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>시간</TableHead>
                    <TableHead>P10 (하한)</TableHead>
                    <TableHead>P50 (중간)</TableHead>
                    <TableHead>P90 (상한)</TableHead>
                    <TableHead>실측값</TableHead>
                    <TableHead>상태</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hourlyForecast.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{row.hour}</TableCell>
                      <TableCell>{row.p10.toFixed(1)}</TableCell>
                      <TableCell className="text-primary font-semibold">{row.p50.toFixed(1)}</TableCell>
                      <TableCell>{row.p90.toFixed(1)}</TableCell>
                      <TableCell>
                        {row.actual ? (
                          <span className="text-success">{row.actual.toFixed(1)}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {row.p50 > 150 ? (
                          <Badge variant="destructive">고가</Badge>
                        ) : row.p50 < 100 ? (
                          <Badge variant="secondary">저가</Badge>
                        ) : (
                          <Badge variant="outline">정상</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SMPForecast;
