import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileCheck, Clock, AlertCircle } from "lucide-react";

const biddingData = [
  { id: "BID20251020-001", time: "05:00~18:00", capacity: "150 MW", status: "완료", type: "자동" },
  { id: "BID20251020-002", time: "18:00~24:00", capacity: "120 MW", status: "대기", type: "자동" },
  { id: "BID20251019-003", time: "변경입찰", capacity: "80 MW", status: "승인", type: "수동" },
];

export function BiddingStatus() {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">입찰 현황</h3>
          <p className="text-sm text-muted-foreground">자동입찰 및 변경입찰 관리</p>
        </div>
        <Button size="sm" className="bg-gradient-primary">
          새 입찰 생성
        </Button>
      </div>

      <div className="space-y-3">
        {biddingData.map((bid) => (
          <div
            key={bid.id}
            className="p-4 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-mono font-semibold text-foreground">{bid.id}</span>
                  <Badge 
                    variant={bid.type === "자동" ? "default" : "outline"}
                    className="text-xs"
                  >
                    {bid.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{bid.time}</p>
              </div>
              {bid.status === "완료" && (
                <FileCheck className="h-5 w-5 text-success" />
              )}
              {bid.status === "대기" && (
                <Clock className="h-5 w-5 text-warning" />
              )}
              {bid.status === "승인" && (
                <AlertCircle className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{bid.capacity}</span>
              <Badge
                variant={
                  bid.status === "완료" ? "default" :
                  bid.status === "대기" ? "secondary" :
                  "outline"
                }
                className="text-xs"
              >
                {bid.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
