import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Lock, User } from "lucide-react";
import komipoLogo from "@/assets/komipo-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username && password) {
      toast({
        title: "로그인 성공",
        description: "KOMIPO RTS&SMP 플랫폼에 오신 것을 환영합니다.",
      });
      navigate("/");
    } else {
      toast({
        title: "로그인 실패",
        description: "아이디와 비밀번호를 입력해주세요.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-primary opacity-5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-accent opacity-5 blur-3xl" />
      </div>

      <Card className="w-full max-w-md p-8 relative z-10 border-border/50 shadow-glow-primary">
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <img src={komipoLogo} alt="KOMIPO RTS&SMP" className="h-48 w-auto" />
          </div>
          <p className="text-muted-foreground">RTS & SMP 예측·입찰 최적화 플랫폼</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground">사용자 ID</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="아이디를 입력하세요"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-secondary/50 border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">비밀번호</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-secondary/50 border-border"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity font-semibold"
          >
            로그인
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>제주 독립계통 운영자 전용</p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
