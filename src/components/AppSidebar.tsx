import { LayoutDashboard, TrendingUp, Zap, FileText, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "대시보드", url: "/", icon: LayoutDashboard },
  { title: "SMP 예측", url: "/smp-forecast", icon: TrendingUp },
  { title: "RTS 예측", url: "/rts-forecast", icon: Zap },
  { title: "입찰 관리", url: "/bidding", icon: FileText },
  { title: "설정", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <div className="px-6 py-4">
          <div className="flex items-center gap-2">
            {!isCollapsed && (
              <>
                <div className="h-8 w-8 rounded-lg bg-gradient-primary" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">RTSnSMP Prediction System</span>
                  <span className="text-xs text-muted-foreground">제주 독립계통</span>
                </div>
              </>
            )}
            {isCollapsed && <div className="h-8 w-8 rounded-lg bg-gradient-primary mx-auto" />}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
