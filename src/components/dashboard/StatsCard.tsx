import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-primary"
}: StatsCardProps) {
  return (
    <Card className="p-6 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <p className={`text-sm font-medium ${
              changeType === "increase" ? "text-success" :
              changeType === "decrease" ? "text-destructive" :
              "text-muted-foreground"
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className={`h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-gradient-primary opacity-10" />
    </Card>
  );
}
