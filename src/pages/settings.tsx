import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Palette,
  Moon,
  Sun,
  Monitor,
  ChevronRight,
  Settings as SettingsIcon,
  Info,
  Bell,
  User,
  Globe,
  Database,
} from "lucide-react";
import {
  ThemeMode,
  getSavedThemeMode,
  saveTheme,
  applyTheme,
} from "@/features/themes";

type MenuItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
};

const Settings = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string>("theme");

  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = getSavedThemeMode();
    setSelectedTheme(savedTheme);
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: "theme",
      label: "Theme",
      icon: Palette,
      description: "Appearance and colors",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      description: "Alerts and sounds",
    },
    {
      id: "about",
      label: "About",
      icon: Info,
      description: "App information",
    },
  ];

  const themeOptions = [
    {
      value: "light",
      label: "Light",
      description: "Bright Theme",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      description: "Dark Theme",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      description: "System Theme",
      icon: Monitor,
    },
  ];

  const handleThemeChange = async (value: ThemeMode) => {
    setSelectedTheme(value);
    saveTheme(value);
    await applyTheme(value);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "theme":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Theme Settings
              </h2>
              <p className="text-muted-foreground">
                Choose your preferred application theme
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Select Theme
              </h3>
              <RadioGroup
                value={selectedTheme}
                onValueChange={(value) => handleThemeChange(value as ThemeMode)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div key={option.value}>
                      <RadioGroupItem
                        value={option.value}
                        id={`theme-${option.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`theme-${option.value}`}
                        className={cn(
                          "flex flex-col items-center justify-between p-6 border-2 rounded-xl cursor-pointer transition-all",
                          "hover:border-primary/50 hover:bg-primary/5",
                          "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10",
                          "border-border bg-card",
                        )}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={cn(
                              "p-2 rounded-lg",
                              selectedTheme === option.value
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground",
                            )}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-foreground">
                            {option.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                          {option.description}
                        </p>
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          </div>
        );
      case "about":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">About</h2>
              <p className="text-muted-foreground">
                Application information, version details, and developer
                information
              </p>
            </div>

            {/* App Information Card */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Port Killer
                  </h3>
                  <p className="text-muted-foreground">
                    A powerful tool for managing and monitoring network ports on
                    your system.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Version Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">
                    Version Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Version
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        1.0.0
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Build Date
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        License
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        MIT
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Platform
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        Desktop
                      </span>
                    </div>
                  </div>
                </div>

                {/* System Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">
                    System Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Tauri Version
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        2.0
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        React Version
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        19.1.0
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        TypeScript
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        5.8.3
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Environment
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        Production
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer Information */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Developer Information
                  </h3>
                  <p className="text-muted-foreground">
                    Information about the development team and project
                    maintainers
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lead Developer */}
                <div className="space-y-4 p-4 rounded-lg border border-border bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-semibold">MH</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Mhbaando</h4>
                      <p className="text-xs text-muted-foreground">
                        Lead Developer
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Full-stack developer specializing in system utilities and
                    desktop applications.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                      TypeScript
                    </span>
                    <span className="px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                      Rust
                    </span>
                    <span className="px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                      Tauri
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4 p-4 rounded-lg border border-border bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        Project Details
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Open Source Initiative
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Repository
                      </span>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        GitHub
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Issues
                      </span>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Report Bug
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Documentation
                      </span>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Read Docs
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Contributing
                      </span>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Contribute
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Technologies Used
                  </h3>
                  <p className="text-muted-foreground">
                    Modern technologies powering this application
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Tauri", desc: "Desktop Framework" },
                  { name: "React", desc: "UI Library" },
                  { name: "TypeScript", desc: "Programming Language" },
                  { name: "Tailwind CSS", desc: "Styling" },
                  { name: "shadcn/ui", desc: "UI Components" },
                  { name: "Vite", desc: "Build Tool" },
                  { name: "Rust", desc: "Backend Language" },
                  { name: "Lucide Icons", desc: "Icon Library" },
                ].map((tech, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border bg-background/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="font-medium text-foreground mb-1">
                      {tech.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {tech.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Copyright Notice */}
            <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
              <p>
                © {new Date().getFullYear()} Port Killer. All rights reserved.
              </p>
              <p className="mt-1">
                This software is licensed under the MIT License.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {menuItems.find((item) => item.id === activeMenu)?.label}
              </h2>
              <p className="text-muted-foreground">
                {menuItems.find((item) => item.id === activeMenu)?.description}
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card">
              <p className="text-muted-foreground text-center py-8">
                Settings for this section are coming soon.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "flex flex-col h-full border-r border-border bg-card transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20",
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center p-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2 rounded-lg",
                sidebarOpen ? "bg-primary/10" : "mx-auto",
              )}
            >
              <SettingsIcon className="w-5 h-5 text-primary" />
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="font-semibold text-foreground">Settings</h2>
                <p className="text-xs text-muted-foreground">
                  Application Settings
                </p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ChevronRight
              className={cn(
                "w-4 h-4 transition-transform",
                !sidebarOpen && "rotate-180",
              )}
            />
          </Button>
        </div>

        {/* Sidebar Menu Items */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full py-6",
                    sidebarOpen
                      ? "justify-start gap-3 px-4"
                      : "justify-center px-2",
                    isActive && "bg-secondary",
                    !sidebarOpen && isActive && "bg-primary/10",
                  )}
                  onClick={() => setActiveMenu(item.id)}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  {sidebarOpen && (
                    <div className="flex-1 text-left">
                      <div className="font-medium text-foreground">
                        {item.label}
                      </div>
                      {sidebarOpen && item.description && (
                        <div className="text-xs text-muted-foreground truncate">
                          {item.description}
                        </div>
                      )}
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full w-full overflow-y-auto">
          <div className="max-w-4xl p-8 mx-auto min-h-full">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
