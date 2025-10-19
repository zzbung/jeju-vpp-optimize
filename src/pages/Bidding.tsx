import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, CheckCircle, Clock, AlertCircle, Plus, Download, Upload, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock data for bidding
const biddingHistory = [
  {
    id: "BID20251020-001",
    date: "2025-10-20",
    type: "자동입찰",
    status: "완료",
    marketType: "Day-Ahead",
    totalMW: 500,
    avgPrice: 118.5,
    result: "낙찰",
  },
  {
    id: "BID20251020-002",
    date: "2025-10-20",
    type: "T-75 변경",
    status: "대기중",
    marketType: "Day-Ahead",
    totalMW: 450,
    avgPrice: 122.3,
    result: "-",
  },
  {
    id: "BID20251019-001",
    date: "2025-10-19",
    type: "자동입찰",
    status: "완료",
    marketType: "Day-Ahead",
    totalMW: 480,
    avgPrice: 115.2,
    result: "낙찰",
  },
  {
    id: "BID20251019-002",
    date: "2025-10-19",
    type: "수동입찰",
    status: "완료",
    marketType: "Real-Time",
    totalMW: 320,
    avgPrice: 125.8,
    result: "부분낙찰",
  },
];

const hourlyBidData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, '0')}:00`,
  capacity: 20 + Math.random() * 10,
  price: 100 + Math.random() * 40,
}));

const Bidding = () => {
  const [selectedMarket, setSelectedMarket] = useState("day-ahead");
  const [bidCapacity, setBidCapacity] = useState("");
  const [bidPrice, setBidPrice] = useState("");

  const handleSubmitBid = () => {
    if (!bidCapacity || !bidPrice) {
      toast.error("모든 필드를 입력해주세요.");
      return;
    }
    toast.success("입찰이 성공적으로 제출되었습니다.", {
      description: `용량: ${bidCapacity}MW, 가격: ${bidPrice}원/kWh`,
    });
    setBidCapacity("");
    setBidPrice("");
  };

  const handleAutoOptimize = () => {
    toast.success("AI 최적화 입찰이 생성되었습니다.", {
      description: "SMP 예측과 RTS 일정을 반영하여 최적 입찰안을 생성했습니다.",
    });
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">입찰 관리</h1>
        <p className="text-muted-foreground">전력시장 입찰 전략 수립 및 관리</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/20 shadow-glow">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              금일 낙찰
            </CardDescription>
            <CardTitle className="text-3xl text-success">480 MW</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              대기중
            </CardDescription>
            <CardTitle className="text-3xl text-warning">450 MW</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              총 입찰건수
            </CardDescription>
            <CardTitle className="text-3xl text-foreground">24</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              낙찰률
            </CardDescription>
            <CardTitle className="text-3xl text-foreground">87.5%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">입찰 생성</TabsTrigger>
          <TabsTrigger value="history">입찰 이력</TabsTrigger>
          <TabsTrigger value="schedule">시간대별 입찰</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>수동 입찰 생성</CardTitle>
                <CardDescription>직접 입찰 용량과 가격을 설정합니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="market">시장 구분</Label>
                  <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                    <SelectTrigger id="market">
                      <SelectValue placeholder="시장 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day-ahead">Day-Ahead 시장</SelectItem>
                      <SelectItem value="real-time">Real-Time 시장</SelectItem>
                      <SelectItem value="ancillary">보조서비스</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">입찰 용량 (MW)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="예: 150"
                    value={bidCapacity}
                    onChange={(e) => setBidCapacity(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">입찰 가격 (원/kWh)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="예: 118.5"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                  />
                </div>

                <Button onClick={handleSubmitBid} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  입찰 제출
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  AI 자동 최적화 입찰
                </CardTitle>
                <CardDescription>SMP/RTS 예측 기반 최적 입찰안 생성</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">추천 시장</span>
                    <span className="font-medium">Day-Ahead</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">최적 용량</span>
                    <span className="font-medium text-primary">485 MW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">추천 가격</span>
                    <span className="font-medium text-primary">121.5 원/kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">예상 수익</span>
                    <span className="font-medium text-success">+12.3%</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">✓ SMP 상승 예상 구간 타겟팅</p>
                  <p className="mb-2">✓ RTS 기동·정지 일정 반영</p>
                  <p>✓ 수익 최대화 시나리오 적용</p>
                </div>

                <Button onClick={handleAutoOptimize} variant="default" className="w-full">
                  <Zap className="mr-2 h-4 w-4" />
                  AI 최적화 입찰 생성
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    엑셀 다운로드
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Upload className="mr-2 h-4 w-4" />
                    KPX 업로드
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>입찰 이력</CardTitle>
              <CardDescription>최근 입찰 내역 및 결과</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>입찰 ID</TableHead>
                    <TableHead>날짜</TableHead>
                    <TableHead>유형</TableHead>
                    <TableHead>시장</TableHead>
                    <TableHead>용량</TableHead>
                    <TableHead>평균가격</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>결과</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {biddingHistory.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell className="font-mono text-sm">{bid.id}</TableCell>
                      <TableCell>{bid.date}</TableCell>
                      <TableCell>
                        <Badge variant={bid.type === "자동입찰" ? "default" : "secondary"}>
                          {bid.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{bid.marketType}</TableCell>
                      <TableCell className="font-semibold">{bid.totalMW} MW</TableCell>
                      <TableCell>{bid.avgPrice} 원/kWh</TableCell>
                      <TableCell>
                        {bid.status === "완료" ? (
                          <Badge className="bg-success">완료</Badge>
                        ) : (
                          <Badge variant="outline" className="text-warning">대기중</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {bid.result === "낙찰" && <Badge className="bg-success">낙찰</Badge>}
                        {bid.result === "부분낙찰" && <Badge className="bg-warning">부분낙찰</Badge>}
                        {bid.result === "-" && <span className="text-muted-foreground">-</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>시간대별 입찰 현황</CardTitle>
              <CardDescription>24시간 입찰 용량 및 가격 설정</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>시간</TableHead>
                    <TableHead>입찰 용량</TableHead>
                    <TableHead>입찰 가격</TableHead>
                    <TableHead>예측 SMP</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hourlyBidData.slice(0, 12).map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{row.hour}</TableCell>
                      <TableCell>{row.capacity.toFixed(1)} MW</TableCell>
                      <TableCell>{row.price.toFixed(1)} 원/kWh</TableCell>
                      <TableCell className="text-primary">{(row.price + 5).toFixed(1)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">대기</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">수정</Button>
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

export default Bidding;
