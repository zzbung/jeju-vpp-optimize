import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Power, PowerOff } from "lucide-react";

const rtsEvents = [
  { plant: "복합#1", type: "start", time: "05:00", status: "예측" },
  { plant: "복합#2", type: "start", time: "06:30", status: "예측" },
  { plant: "복합#1", type: "stop", time: "18:00", status: "예측" },
  { plant: "복합#2", type: "stop", time: "19:30", status: "예측" },
];

export function RTSTimeline() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">RTS 기동·정지 예측</h3>
        <p className="text-sm text-muted-foreground">명일 복합발전 운영계획</p>
      </div>
      <div className="space-y-3">
        {rtsEvents.map((event, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              {event.type === "start" ? (
                <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                  <Power className="h-5 w-5 text-success" />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
                  <PowerOff className="h-5 w-5 text-destructive" />
                </div>
              )}
              <div>
                <p className="font-medium text-foreground">{event.plant}</p>
                <p className="text-sm text-muted-foreground">
                  {event.type === "start" ? "기동" : "정지"} 예정
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-mono font-semibold text-primary">{event.time}</span>
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
