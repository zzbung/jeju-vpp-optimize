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
          <div className="flex items-center justify-center">
            {!isCollapsed ? (
              <img src={komipoLogo} alt="KOMIPO RTS&SMP" className="h-40 w-auto" />
            ) : (
              <img src={komipoLogo} alt="KOMIPO RTS&SMP" className="h-16 w-auto" />
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
