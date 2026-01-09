import Logo from "@/assets/logoIcon.svg";
import { Search, Settings, RefreshCw, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

interface TopHeaderProps {
  onSettingsClick?: () => void;
}

const TopHeader = ({ onSettingsClick }: TopHeaderProps) => {
  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick();
    }
  };

  return (
    <div className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-background">
      <div className="flex items-center gap-3.5">
        <div className="relative group">
          <NavLink to="/">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <img
                src={Logo}
                alt="Port Killer"
                className="w-5 h-5 text-primary-foreground"
              />
            </div>
          </NavLink>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-foreground">Port Killer</h1>
              <span className="text-xs font-semibold text-primary-foreground bg-primary px-2 py-0.5 rounded">
                1.0
              </span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Professional Port Manager
            </span>
          </div>
        </div>
      </div>

      {/* Search Interface */}
      <div className="max-w-md w-full">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search ports, processes, services..."
            className="relative w-full pl-11 pr-28 py-2.5 bg-background border-2 border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200 placeholder:text-muted-foreground"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-7 w-7 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              title="Filter"
            >
              <Search className="w-3.5 h-3.5 text-foreground" />
            </Button>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-2.5">
        {/* Refresh Button */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300 group hover:scale-105"
          title="Refresh data"
        >
          <RefreshCw className="w-4.5 h-4.5 text-foreground group-hover:rotate-180 transition-transform duration-500" />
        </Button>

        {/* Notifications Button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
            title="Notifications"
          >
            <Bell className="w-4.5 h-4.5 text-foreground" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background" />
          </Button>
        </div>

        {/* Settings Button */}
        <div className="relative">
          <NavLink to="/settings">
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300 group hover:scale-105"
              title="Settings"
              onClick={handleSettingsClick}
            >
              <Settings className="w-4.5 h-4.5 text-foreground group-hover:rotate-90 transition-transform duration-300" />
            </Button>
          </NavLink>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
