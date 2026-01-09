import Logo from "@/assets/logoIcon.svg";
import {
  Search,
  Settings,
  RefreshCw,
  Bell,
  Filter,
  Zap,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TopHeader = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3.5 border-b border-border/30  ">
      <div className="flex items-center gap-3.5 ">
        <div className="relative group">
          <div className="w-10 h-10  bg-primary  rounded-md flex items-center justify-center">
            <img
              src={Logo}
              alt="Port Killer"
              className="w-5 h-5 text-primary-foreground"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex  flex-col items-start">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg">Port Killer</h1>
              <span className="text-xs font-semibold text-primary bg-primary/15 px-2 py-0.5 rounded">
                1.0
              </span>
            </div>
            <span className="text-sm font-medium text-secondary-foreground">
              Professional Port Manager
            </span>
          </div>
        </div>
      </div>

      {/* Colorful Search Interface */}
      <div className="max-w-md w-full">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search ports, processes, services..."
            className="relative w-full pl-11 pr-28 py-2.5 bg-background border-2 border-primary/20 rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200 placeholder:text-muted-foreground backdrop-blur-sm"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-7 w-7 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
              title="Filter"
            >
              <Search className="w-3.5 h-3.5 text-accent" />
            </Button>
          </div>
        </div>
      </div>

      {/* Vibrant Action Bar */}
      <div className="flex items-center gap-2.5">
        {/* Refresh with Colorful Animation */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-xl bg-primary/10 hover:bg-primary/20 transition-all duration-300 group hover:scale-105"
          title="Refresh data"
        >
          <RefreshCw className="w-4.5 h-4.5 text-primary group-hover:rotate-180 transition-transform duration-500" />
        </Button>

        {/* Notifications with Colorful Badge */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-xl bg-destructive/10 hover:bg-destructive/20 transition-all duration-300 hover:scale-105"
            title="Notifications"
          >
            <Bell className="w-4.5 h-4.5 text-destructive" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-br from-destructive to-destructive/80 rounded-full border-2 border-background animate-pulse" />
          </Button>
          <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-destructive/30 rounded-full animate-ping" />
        </div>

        {/* Settings with Accent Color */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-xl bg-accent/10 hover:bg-accent/20 transition-all duration-300 group hover:scale-105"
            title="Settings"
          >
            <Settings className="w-4.5 h-4.5 text-accent group-hover:rotate-90 transition-transform duration-300" />
          </Button>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full border-2 border-background animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
