import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Database, Shield, Palette, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleSave = () => {
    toast.success("설정이 저장되었습니다.");
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">설정</h1>
        <p className="text-muted-foreground">시스템 환경 설정 및 사용자 정보 관리</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            프로필
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            알림
          </TabsTrigger>
          <TabsTrigger value="system">
            <Database className="mr-2 h-4 w-4" />
            시스템
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            보안
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            디스플레이
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>사용자 정보</CardTitle>
              <CardDescription>계정 정보 및 프로필 설정</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">사용자명</Label>
                  <Input id="username" defaultValue="admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" type="email" defaultValue="admin@komipo.co.kr" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">부서</Label>
                  <Input id="department" defaultValue="전력운영팀" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">직급</Label>
                  <Input id="position" defaultValue="운영관리자" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="role">권한</Label>
                <Select defaultValue="admin">
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">관리자</SelectItem>
                    <SelectItem value="operator">운영자</SelectItem>
                    <SelectItem value="viewer">조회자</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                프로필 저장
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>비밀번호 변경</CardTitle>
              <CardDescription>보안을 위해 정기적으로 비밀번호를 변경하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">현재 비밀번호</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">새 비밀번호</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">비밀번호 확인</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button onClick={handleSave} variant="outline" className="w-full">
                비밀번호 변경
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
              <CardDescription>시스템 알림 및 이벤트 설정</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>전체 알림</Label>
                  <p className="text-sm text-muted-foreground">모든 시스템 알림 수신</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>RTS 예측 알림</Label>
                  <p className="text-sm text-muted-foreground">발전기 기동·정지 예측 시 알림</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMP 급등/급락 알림</Label>
                  <p className="text-sm text-muted-foreground">SMP 급격한 변동 시 알림</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>입찰 결과 알림</Label>
                  <p className="text-sm text-muted-foreground">입찰 낙찰/미낙찰 결과 알림</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>ESS 충방전 알림</Label>
                  <p className="text-sm text-muted-foreground">ESS 충방전 시작/종료 알림</p>
                </div>
                <Switch />
              </div>

              <Separator />

              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                알림 설정 저장
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>데이터 연동 설정</CardTitle>
              <CardDescription>외부 시스템 API 연동 설정</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>KMA API 키</Label>
                <Input type="password" placeholder="기상청 API 키" defaultValue="••••••••••••" />
                <p className="text-xs text-muted-foreground">기상데이터 수집을 위한 API 키</p>
              </div>

              <div className="space-y-2">
                <Label>KPX API 키</Label>
                <Input type="password" placeholder="전력거래소 API 키" defaultValue="••••••••••••" />
                <p className="text-xs text-muted-foreground">전력시장 데이터 수집을 위한 API 키</p>
              </div>

              <div className="space-y-2">
                <Label>RTDB 접속 정보</Label>
                <Input placeholder="실시간 데이터베이스 주소" defaultValue="rtdb.komipo.local:1433" />
                <p className="text-xs text-muted-foreground">MiRi/PRISM RTDB 연결 정보</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>자동 데이터 수집</Label>
                  <p className="text-sm text-muted-foreground">15분 간격으로 데이터 자동 수집</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                연동 설정 저장
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI 모델 설정</CardTitle>
              <CardDescription>예측 모델 파라미터 조정</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>AI 자동 최적화</Label>
                  <p className="text-sm text-muted-foreground">입찰 전략 자동 최적화 사용</p>
                </div>
                <Switch checked={autoOptimize} onCheckedChange={setAutoOptimize} />
              </div>

              <div className="space-y-2">
                <Label>예측 모델</Label>
                <Select defaultValue="hybrid">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hybrid">LSTM + LightGBM 하이브리드</SelectItem>
                    <SelectItem value="lstm">LSTM Only</SelectItem>
                    <SelectItem value="lightgbm">LightGBM Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>재학습 주기</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">매일</SelectItem>
                    <SelectItem value="weekly">주간</SelectItem>
                    <SelectItem value="monthly">월간</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSave} variant="outline" className="w-full">
                모델 설정 저장
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>보안 설정</CardTitle>
              <CardDescription>시스템 보안 및 접근 제어</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>2단계 인증 (2FA)</Label>
                  <p className="text-sm text-muted-foreground">추가 보안을 위한 2단계 인증</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>세션 타임아웃</Label>
                  <p className="text-sm text-muted-foreground">30분 동안 활동 없을 시 자동 로그아웃</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>접근 IP 제한</Label>
                <Input placeholder="예: 192.168.1.0/24" />
                <p className="text-xs text-muted-foreground">허용된 IP 대역에서만 접속 가능</p>
              </div>

              <div className="space-y-2">
                <Label>로그 보관 기간</Label>
                <Select defaultValue="90">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30일</SelectItem>
                    <SelectItem value="90">90일</SelectItem>
                    <SelectItem value="180">180일</SelectItem>
                    <SelectItem value="365">1년</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                보안 설정 저장
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>디스플레이 설정</CardTitle>
              <CardDescription>화면 테마 및 표시 옵션</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>다크 모드</Label>
                  <p className="text-sm text-muted-foreground">어두운 테마 사용</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="space-y-2">
                <Label>메인 컬러</Label>
                <Select defaultValue="cyan">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cyan">청록 (Cyan)</SelectItem>
                    <SelectItem value="blue">파랑 (Blue)</SelectItem>
                    <SelectItem value="green">초록 (Green)</SelectItem>
                    <SelectItem value="purple">보라 (Purple)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>글꼴 크기</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">작게</SelectItem>
                    <SelectItem value="medium">보통</SelectItem>
                    <SelectItem value="large">크게</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>차트 애니메이션</Label>
                  <p className="text-sm text-muted-foreground">차트 로딩 시 애니메이션 효과</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>데이터 자동 새로고침</Label>
                  <p className="text-sm text-muted-foreground">실시간 데이터 자동 업데이트</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                디스플레이 설정 저장
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
