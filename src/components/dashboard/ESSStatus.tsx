import { Card } from "@/components/ui/card";
import { Battery, TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const essData = {
  soc: 68,
  power: -2.5,
  status: "충전",
  capacity: "10 MWh",
  dailyEnergy: "15.2 MWh"
};

export function ESSStatus() {
  const isCharging = essData.power < 0;

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">ESS 운영 상태</h3>
          <p className="text-sm text-muted-foreground">실시간 충방전 모니터링</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Battery className="h-6 w-6 text-primary" />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">SOC (State of Charge)</span>
            <span className="text-2xl font-bold text-primary">{essData.soc}%</span>
          </div>
          <Progress value={essData.soc} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">현재 출력</p>
            <div className="flex items-center gap-2">
              {isCharging ? (
                <TrendingDown className="h-4 w-4 text-primary" />
              ) : (
                <TrendingUp className="h-4 w-4 text-warning" />
              )}
              <span className="text-lg font-semibold text-foreground">
                {Math.abs(essData.power)} MW
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{essData.status}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">설비용량</p>
            <p className="text-lg font-semibold text-foreground">{essData.capacity}</p>
          </div>

          <div className="space-y-1 col-span-2">
            <p className="text-xs text-muted-foreground">금일 누적 충방전량</p>
            <p className="text-lg font-semibold text-foreground">{essData.dailyEnergy}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
