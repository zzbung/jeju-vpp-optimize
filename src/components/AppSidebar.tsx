import { LayoutDashboard, TrendingUp, Zap, FileText, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import komipoLogo from "@/assets/komipo-logo.png";
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
  { title: "최대출력 예측", url: "/max-output-forecast", icon: Zap },
  { title: "입찰 관리", url: "/bidding", icon: FileText },
  { title: "설정", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <div className="px-4 py-3">
          <div className="flex items-center justify-center">
            {!isCollapsed ? (
              <img src={komipoLogo} alt="KOMIPO RTS&SMP" className="w-full h-auto object-contain max-h-16" />
            ) : (
              <img src={komipoLogo} alt="KOMIPO RTS&SMP" className="w-8 h-auto object-contain" />
            )}
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
