import { Activity, TrendingUp, Zap, DollarSign } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { SMPForecastChart } from "@/components/dashboard/SMPForecastChart";
import { MaxOutputTimeline } from "@/components/dashboard/MaxOutputTimeline";
import { ESSStatus } from "@/components/dashboard/ESSStatus";
import { BiddingStatus } from "@/components/dashboard/BiddingStatus";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">운영 대시보드</h1>
          <p className="text-muted-foreground">제주 독립계통 복합발전소 실시간 모니터링</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="현재 SMP"
            value="112원"
            change="+8.5% vs 전일"
            changeType="increase"
            icon={DollarSign}
            iconColor="text-chart-1"
          />
          <StatsCard
            title="총 발전량"
            value="285 MW"
            change="복합 #1,2 가동"
            changeType="neutral"
            icon={Activity}
            iconColor="text-chart-2"
          />
          <StatsCard
            title="재생에너지"
            value="152 MW"
            change="+12% 출력"
            changeType="increase"
            icon={Zap}
            iconColor="text-chart-4"
          />
          <StatsCard
            title="금일 수익"
            value="28.5백만"
            change="+5.2% 목표달성"
            changeType="increase"
            icon={TrendingUp}
            iconColor="text-chart-5"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SMPForecastChart />
          </div>
          <div>
            <ESSStatus />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MaxOutputTimeline />
          <BiddingStatus />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
