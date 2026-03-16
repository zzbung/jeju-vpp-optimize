import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import komipoLogo from "@/assets/komipo-logo.png";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SMPForecast from "./pages/SMPForecast";
import RTSForecast from "./pages/RTSForecast";
import Bidding from "./pages/Bidding";
import Settings from "./pages/Settings";
import MaxOutputForecast from "./pages/MaxOutputForecast";

const queryClient = new QueryClient();

const AppLayout = ({ children }: {children: React.ReactNode;}) =>
<SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-20 border-b border-border flex items-center px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <SidebarTrigger />
          <div className="ml-4 flex items-center gap-3">
            <img src={komipoLogo} alt="KOMIPO 로고" className="h-16 object-contain" />
            <span className="text-lg font-semibold text-foreground">제주 독립계통 실증</span>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  </SidebarProvider>;


const App = () =>
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/smp-forecast" element={<AppLayout><SMPForecast /></AppLayout>} />
          <Route path="/rts-forecast" element={<AppLayout><RTSForecast /></AppLayout>} />
          <Route path="/max-output-forecast" element={<AppLayout><MaxOutputForecast /></AppLayout>} />
          <Route path="/bidding" element={<AppLayout><Bidding /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;