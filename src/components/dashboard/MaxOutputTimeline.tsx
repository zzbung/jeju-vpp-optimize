import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Thermometer } from "lucide-react";

const outputEvents = [
  { plant: "복합#1 GT", output: "450 MW", temp: "28.5°C", status: "예측" },
  { plant: "복합#1 ST", output: "200 MW", temp: "28.5°C", status: "예측" },
  { plant: "복합#2 GT", output: "445 MW", temp: "27.8°C", status: "예측" },
  { plant: "복합#2 ST", output: "195 MW", temp: "27.8°C", status: "예측" },
];

export function MaxOutputTimeline() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">복합발전 최대출력 예측</h3>
        <p className="text-sm text-muted-foreground">명일 복합발전 기온보정 최대출력</p>
      </div>
      <div className="space-y-3">
        {outputEvents.map((event, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{event.plant}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Thermometer className="h-3 w-3" />
                  {event.temp}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-mono font-semibold text-primary">{event.output}</span>
              <Badge variant="outline" className="border-primary/30 text-primary">
                {event.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
