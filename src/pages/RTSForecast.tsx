import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Power, Clock, Zap, TrendingUp } from "lucide-react";

// Mock data for RTS forecast
const plantData = [
  {
    id: "GT-1",
    name: "가스터빈 1호기",
    status: "운전중",
    capacity: 150,
    currentOutput: 142,
    nextRTS: "2025-10-20T05:30",
    rtsType: "기동",
    confidence: 92,
  },
  {
    id: "GT-2",
    name: "가스터빈 2호기",
    status: "정지",
    capacity: 150,
    currentOutput: 0,
    nextRTS: "2025-10-20T08:15",
    rtsType: "기동",
    confidence: 88,
  },
  {
    id: "ST-1",
    name: "증기터빈 1호기",
    status: "운전중",
    capacity: 200,
    currentOutput: 195,
    nextRTS: "2025-10-20T18:30",
    rtsType: "정지",
    confidence: 85,
  },
];

const rtsTimeline = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, '0')}:00`,
  demand: 450 + Math.random() * 200,
  renewable: 200 + Math.random() * 150,
  thermal: 300 + Math.random() * 100,
}));

const RTSForecast = () => {
  const totalCapacity = plantData.reduce((sum, p) => sum + p.capacity, 0);
  const totalOutput = plantData.reduce((sum, p) => sum + p.currentOutput, 0);
  const utilizationRate = (totalOutput / totalCapacity) * 100;

  return (
    <div className="p-6 space-y-6 bg-background">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">RTS 예측 분석</h1>
        <p className="text-muted-foreground">Ready-to-Start 발전기 기동·정지 예측</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/20 shadow-glow">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              총 발전용량
            </CardDescription>
            <CardTitle className="text-3xl text-primary">{totalCapacity} MW</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Power className="h-4 w-4" />
              현재 출력
            </CardDescription>
            <CardTitle className="text-3xl text-foreground">{totalOutput} MW</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              가동률
            </CardDescription>
            <CardTitle className="text-3xl text-foreground">{utilizationRate.toFixed(1)}%</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              다음 RTS
            </CardDescription>
            <CardTitle className="text-2xl text-foreground">05:30</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-success">GT-1 기동예정</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plants" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plants">발전기별 현황</TabsTrigger>
          <TabsTrigger value="timeline">타임라인 예측</TabsTrigger>
          <TabsTrigger value="balance">수급 균형</TabsTrigger>
        </TabsList>

        <TabsContent value="plants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>발전기별 RTS 예측 상태</CardTitle>
              <CardDescription>각 발전기의 기동·정지 예상 시각 및 신뢰도</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>발전기</TableHead>
                    <TableHead>현재 상태</TableHead>
                    <TableHead>용량</TableHead>
                    <TableHead>현재 출력</TableHead>
                    <TableHead>다음 RTS</TableHead>
                    <TableHead>예측 타입</TableHead>
                    <TableHead>신뢰도</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plantData.map((plant) => (
                    <TableRow key={plant.id}>
                      <TableCell className="font-medium">{plant.name}</TableCell>
                      <TableCell>
                        {plant.status === "운전중" ? (
                          <Badge className="bg-success">운전중</Badge>
                        ) : (
                          <Badge variant="secondary">정지</Badge>
                        )}
                      </TableCell>
                      <TableCell>{plant.capacity} MW</TableCell>
                      <TableCell className="text-primary font-semibold">{plant.currentOutput} MW</TableCell>
                      <TableCell>{new Date(plant.nextRTS).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</TableCell>
                      <TableCell>
                        {plant.rtsType === "기동" ? (
                          <Badge variant="default">기동</Badge>
                        ) : (
                          <Badge variant="outline">정지</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={plant.confidence} className="w-20" />
                          <span className="text-sm text-muted-foreground">{plant.confidence}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plantData.map((plant) => (
              <Card key={plant.id} className={plant.status === "운전중" ? "border-success/30" : ""}>
                <CardHeader>
                  <CardTitle className="text-lg">{plant.name}</CardTitle>
                  <CardDescription>{plant.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">출력</span>
                    <span className="font-semibold">{plant.currentOutput}/{plant.capacity} MW</span>
                  </div>
                  <Progress value={(plant.currentOutput / plant.capacity) * 100} />
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">다음 {plant.rtsType}</span>
                    <span className="text-sm font-medium">{new Date(plant.nextRTS).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>24시간 RTS 타임라인</CardTitle>
              <CardDescription>발전기별 기동·정지 예측 일정</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "05:30", plant: "GT-1", type: "기동", reason: "재생에너지 출력 감소 예상" },
                  { time: "08:15", plant: "GT-2", type: "기동", reason: "오전 수요 증가 대응" },
                  { time: "14:00", plant: "GT-1", type: "정지", reason: "태양광 발전 피크 예상" },
                  { time: "18:30", plant: "ST-1", type: "정지", reason: "저녁 수요 감소 예상" },
                  { time: "20:00", plant: "GT-2", type: "정지", reason: "심야 저부하 진입" },
                ].map((event, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card/50">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      {idx < 4 && <div className="h-full w-0.5 bg-border mt-2" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">{event.time}</span>
                        <Badge variant={event.type === "기동" ? "default" : "outline"}>{event.type}</Badge>
                        <span className="text-sm text-muted-foreground">{event.plant}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>전력 수급 균형 예측</CardTitle>
              <CardDescription>수요 vs 공급 (재생에너지 + 화력) 24시간 예측</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={rtsTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="hour" 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    label={{ value: 'MW', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                  <Bar dataKey="renewable" stackId="supply" fill="hsl(var(--success))" name="재생에너지" />
                  <Bar dataKey="thermal" stackId="supply" fill="hsl(var(--primary))" name="화력발전" />
                  <Line type="monotone" dataKey="demand" stroke="hsl(var(--destructive))" strokeWidth={3} name="전력수요" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RTSForecast;
