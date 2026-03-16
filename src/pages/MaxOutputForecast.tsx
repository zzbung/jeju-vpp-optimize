import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Zap, Thermometer, TrendingUp, BarChart3 } from "lucide-react";
import tempCorrectionImg from "@/assets/temperature-correction.png";
import maxOutputImg from "@/assets/max-output-prediction.png";

const plantData = [
  {
    id: "GT-1",
    name: "복합#1 가스터빈",
    capacity: 450,
    correctedMax: 442,
    currentTemp: 28.5,
    referenceTemp: 15,
    correction: -8,
    confidence: 94,
  },
  {
    id: "ST-1",
    name: "복합#1 증기터빈",
    capacity: 200,
    correctedMax: 195,
    currentTemp: 28.5,
    referenceTemp: 15,
    correction: -5,
    confidence: 91,
  },
  {
    id: "GT-2",
    name: "복합#2 가스터빈",
    capacity: 450,
    correctedMax: 438,
    currentTemp: 27.8,
    referenceTemp: 15,
    correction: -12,
    confidence: 92,
  },
  {
    id: "ST-2",
    name: "복합#2 증기터빈",
    capacity: 200,
    correctedMax: 193,
    currentTemp: 27.8,
    referenceTemp: 15,
    correction: -7,
    confidence: 89,
  },
];

const hourlyOutput = Array.from({ length: 24 }, (_, i) => {
  const isOff = i >= 13 && i <= 18;
  return {
    hour: `${i.toString().padStart(2, '0')}:00`,
    predicted: isOff ? 0 : 430 + Math.random() * 20,
    bid: isOff ? 0 : 425 + Math.random() * 15,
    actual: i < 12 ? (isOff ? 0 : 420 + Math.random() * 25) : null,
  };
});

const MaxOutputForecast = () => {
  const totalCapacity = plantData.reduce((sum, p) => sum + p.capacity, 0);
  const totalCorrected = plantData.reduce((sum, p) => sum + p.correctedMax, 0);
  const avgCorrection = plantData.reduce((sum, p) => sum + p.correction, 0) / plantData.length;

  return (
    <div className="p-6 space-y-6 bg-background">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">복합발전 최대출력 예측</h1>
        <p className="text-muted-foreground">기온보정 기반 복합발전 최대출력 예측 분석</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/20 shadow-glow">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              정격 용량
            </CardDescription>
            <CardTitle className="text-3xl text-primary">{totalCapacity} MW</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              보정 최대출력
            </CardDescription>
            <CardTitle className="text-3xl text-foreground">{totalCorrected} MW</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              기온 보정량
            </CardDescription>
            <CardTitle className="text-3xl text-foreground">{avgCorrection.toFixed(1)} MW</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              예측 정확도
            </CardDescription>
            <CardTitle className="text-3xl text-foreground">
              {(plantData.reduce((s, p) => s + p.confidence, 0) / plantData.length).toFixed(1)}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="plants" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plants">발전기별 현황</TabsTrigger>
          <TabsTrigger value="output">최대출력 예측</TabsTrigger>
          <TabsTrigger value="correction">기온 보정</TabsTrigger>
        </TabsList>

        <TabsContent value="plants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>발전기별 최대출력 예측 현황</CardTitle>
              <CardDescription>기온보정 적용 후 각 발전기의 최대출력 예측값</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>발전기</TableHead>
                    <TableHead>정격 용량</TableHead>
                    <TableHead>보정 최대출력</TableHead>
                    <TableHead>현재 기온</TableHead>
                    <TableHead>기준 기온</TableHead>
                    <TableHead>보정량</TableHead>
                    <TableHead>신뢰도</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plantData.map((plant) => (
                    <TableRow key={plant.id}>
                      <TableCell className="font-medium">{plant.name}</TableCell>
                      <TableCell>{plant.capacity} MW</TableCell>
                      <TableCell className="text-primary font-semibold">{plant.correctedMax} MW</TableCell>
                      <TableCell>{plant.currentTemp}°C</TableCell>
                      <TableCell>{plant.referenceTemp}°C</TableCell>
                      <TableCell>
                        <Badge variant={plant.correction < 0 ? "destructive" : "default"}>
                          {plant.correction > 0 ? "+" : ""}{plant.correction} MW
                        </Badge>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plantData.map((plant) => (
              <Card key={plant.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{plant.name}</CardTitle>
                  <CardDescription>{plant.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">보정 출력</span>
                    <span className="font-semibold">{plant.correctedMax}/{plant.capacity} MW</span>
                  </div>
                  <Progress value={(plant.correctedMax / plant.capacity) * 100} />
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">기온 보정</span>
                    <span className="text-sm font-medium text-destructive">{plant.correction} MW</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="output" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>복합발전 GT#1 최대출력예측 vs 발전량</CardTitle>
              <CardDescription>예측발전량, 입찰발전량, 실측발전량 비교</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <img 
                  src={maxOutputImg} 
                  alt="복합발전 GT#1 최대출력예측 vs 발전량" 
                  className="w-full rounded-lg border border-border"
                />
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={hourlyOutput}>
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
                  <Line type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" strokeWidth={2} name="예측발전량" dot={false} />
                  <Line type="monotone" dataKey="bid" stroke="hsl(var(--success))" strokeWidth={2} name="입찰발전량" dot={false} />
                  <Line type="monotone" dataKey="actual" stroke="hsl(var(--foreground))" strokeWidth={2} name="실측발전량" dot={false} connectNulls={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>기온 보정 분석</CardTitle>
              <CardDescription>BRCC 기온 관측값 vs LDAPS 기온 보정 전/후 비교 (RMSE, MAE 개선)</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src={tempCorrectionImg} 
                alt="복합발전 GT#1 기온 보정 전후 비교" 
                className="w-full rounded-lg border border-border"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaxOutputForecast;
