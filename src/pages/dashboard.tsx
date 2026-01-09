import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Play,
  StopCircle,
  AlertCircle,
  CheckCircle,
  XCircle,
  ExternalLink,
  Server,
  Cpu,
  MemoryStick,
  Eye,
  Search,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type PortStatus = "active" | "inactive" | "warning" | "error";
type Protocol = "tcp" | "udp" | "http" | "https" | "websocket";

interface PortInfo {
  id: string;
  port: number;
  name: string;
  description: string;
  status: PortStatus;
  protocol: Protocol;
  processId?: number;
  processName?: string;
  pid?: number;
  user?: string;
  memoryUsage?: string;
  cpuUsage?: string;
  connections: number;
  lastActivity: string;
  uptime: string;
  localAddress: string;
  remoteAddress?: string;
  securityLevel: "low" | "medium" | "high";
  isSystemPort: boolean;
  tags: string[];
}

const Dashboard = () => {
  const [selectedPort, setSelectedPort] = useState<string | null>("port-3000");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<PortStatus | "all">("all");
  const [showSystemPorts, setShowSystemPorts] = useState(true);

  // Mock data for application ports
  const ports: PortInfo[] = [
    {
      id: "port-3000",
      port: 3000,
      name: "React Development Server",
      description: "Frontend development server for React applications",
      status: "active",
      protocol: "http",
      processId: 12345,
      processName: "node",
      pid: 12345,
      user: "developer",
      memoryUsage: "256 MB",
      cpuUsage: "12%",
      connections: 3,
      lastActivity: "2 minutes ago",
      uptime: "5 hours",
      localAddress: "127.0.0.1:3000",
      remoteAddress: "192.168.1.100:55000",
      securityLevel: "low",
      isSystemPort: false,
      tags: ["development", "frontend", "hot-reload"],
    },
    {
      id: "port-8000",
      port: 8000,
      name: "Python API Server",
      description: "Backend API server for web applications",
      status: "active",
      protocol: "http",
      processId: 23456,
      processName: "python",
      pid: 23456,
      user: "api",
      memoryUsage: "512 MB",
      cpuUsage: "24%",
      connections: 42,
      lastActivity: "Just now",
      uptime: "2 days",
      localAddress: "0.0.0.0:8000",
      securityLevel: "medium",
      isSystemPort: false,
      tags: ["backend", "api", "production"],
    },
    {
      id: "port-5432",
      port: 5432,
      name: "PostgreSQL Database",
      description: "Relational database management system",
      status: "active",
      protocol: "tcp",
      processId: 34567,
      processName: "postgres",
      pid: 34567,
      user: "postgres",
      memoryUsage: "1.2 GB",
      cpuUsage: "8%",
      connections: 18,
      lastActivity: "5 minutes ago",
      uptime: "7 days",
      localAddress: "127.0.0.1:5432",
      securityLevel: "high",
      isSystemPort: true,
      tags: ["database", "persistence", "critical"],
    },
    {
      id: "port-8080",
      port: 8080,
      name: "Java Application Server",
      description: "Enterprise Java application server",
      status: "warning",
      protocol: "http",
      processId: 45678,
      processName: "java",
      pid: 45678,
      user: "appuser",
      memoryUsage: "2.1 GB",
      cpuUsage: "65%",
      connections: 128,
      lastActivity: "1 minute ago",
      uptime: "1 day",
      localAddress: "0.0.0.0:8080",
      securityLevel: "medium",
      isSystemPort: false,
      tags: ["enterprise", "java", "high-memory"],
    },
    {
      id: "port-6379",
      port: 6379,
      name: "Redis Cache",
      description: "In-memory data structure store",
      status: "active",
      protocol: "tcp",
      processId: 56789,
      processName: "redis-server",
      pid: 56789,
      user: "redis",
      memoryUsage: "128 MB",
      cpuUsage: "3%",
      connections: 24,
      lastActivity: "30 seconds ago",
      uptime: "14 days",
      localAddress: "127.0.0.1:6379",
      securityLevel: "medium",
      isSystemPort: true,
      tags: ["cache", "memory", "fast"],
    },
    {
      id: "port-27017",
      port: 27017,
      name: "MongoDB Database",
      description: "NoSQL document database",
      status: "error",
      protocol: "tcp",
      processId: 67890,
      processName: "mongod",
      pid: 67890,
      user: "mongodb",
      memoryUsage: "890 MB",
      cpuUsage: "95%",
      connections: 0,
      lastActivity: "10 minutes ago",
      uptime: "3 hours",
      localAddress: "127.0.0.1:27017",
      securityLevel: "high",
      isSystemPort: false,
      tags: ["database", "nosql", "document"],
    },
    {
      id: "port-9200",
      port: 9200,
      name: "Elasticsearch",
      description: "Search and analytics engine",
      status: "inactive",
      protocol: "http",
      processId: 78901,
      processName: "elasticsearch",
      pid: 78901,
      user: "elastic",
      memoryUsage: "0 MB",
      cpuUsage: "0%",
      connections: 0,
      lastActivity: "1 hour ago",
      uptime: "0",
      localAddress: "127.0.0.1:9200",
      securityLevel: "high",
      isSystemPort: false,
      tags: ["search", "analytics", "big-data"],
    },
    {
      id: "port-5601",
      port: 5601,
      name: "Kibana Dashboard",
      description: "Data visualization dashboard for Elasticsearch",
      status: "active",
      protocol: "https",
      processId: 89012,
      processName: "kibana",
      pid: 89012,
      user: "kibana",
      memoryUsage: "420 MB",
      cpuUsage: "15%",
      connections: 8,
      lastActivity: "Just now",
      uptime: "1 day",
      localAddress: "127.0.0.1:5601",
      securityLevel: "medium",
      isSystemPort: false,
      tags: ["visualization", "dashboard", "monitoring"],
    },
  ];

  const filteredPorts = ports.filter((port) => {
    const matchesSearch =
      searchQuery === "" ||
      port.port.toString().includes(searchQuery) ||
      port.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      port.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      port.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesStatus =
      filterStatus === "all" || port.status === filterStatus;

    const matchesSystem = showSystemPorts || !port.isSystemPort;

    return matchesSearch && matchesStatus && matchesSystem;
  });

  const selectedPortData = ports.find((port) => port.id === selectedPort);

  const getStatusIcon = (status: PortStatus) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "inactive":
        return <StopCircle className="w-4 h-4 text-gray-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: PortStatus) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      case "warning":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/20";
    }
  };

  const getSecurityColor = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low":
        return "bg-green-500/10 text-green-500";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500";
      case "high":
        return "bg-red-500/10 text-red-500";
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Search and Filter Bar */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search ports, applications, or tags..."
              className="w-full h-10 text-secondary-foreground pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-end justify-end gap-2 flex-1">
            <Button
              variant={filterStatus === "all" ? "secondary" : "outline"}
              size="default"
              className="w-16 h-10 text-secondary-foreground hover:text-secondary hover:bg-primary!"
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "active" ? "secondary" : "outline"}
              size="sm"
              className="h-10 text-secondary-foreground hover:text-secondary hover:bg-primary!"
              onClick={() => setFilterStatus("active")}
            >
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Active
            </Button>
            <Button
              variant={filterStatus === "warning" ? "secondary" : "outline"}
              size="sm"
              className="h-10 text-secondary-foreground hover:text-secondary hover:bg-primary!"
              onClick={() => setFilterStatus("warning")}
            >
              <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
              Warning
            </Button>
            <Button
              variant={filterStatus === "error" ? "secondary" : "outline"}
              size="sm"
              className="h-10 text-secondary-foreground hover:text-secondary hover:bg-primary!"
              onClick={() => setFilterStatus("error")}
            >
              <XCircle className="w-4 h-4 mr-2 text-red-500" />
              Error
            </Button>
          </div>

          <Button
            variant={showSystemPorts ? "secondary" : "outline"}
            size="sm"
            className="h-10 text-secondary-foreground hover:text-secondary hover:bg-primary"
            onClick={() => setShowSystemPorts(!showSystemPorts)}
          >
            <Filter className="w-4 h-4 mr-2" />
            {showSystemPorts ? "Show All" : "Hide System"}
          </Button>
        </div>
      </div>

      {/* Main Content - 70/30 Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Port List - 70% */}
        <div className="w-[70%] border-r border-border overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-card/50 text-sm font-medium text-muted-foreground">
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-1">Port</div>
              <div className="col-span-3">Process</div>
              <div className="col-span-1">PID</div>
              <div className="col-span-3">Address</div>
              <div className="col-span-2">Uptime</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Port List */}
            <div className="flex-1 overflow-y-auto">
              {filteredPorts.map((port) => (
                <div
                  key={port.id}
                  className={cn(
                    "grid grid-cols-12 gap-4 p-4 border-b border-border cursor-pointer transition-colors hover:bg-secondary/30",
                    selectedPort === port.id && "bg-secondary/50",
                  )}
                  onClick={() => setSelectedPort(port.id)}
                >
                  <div className="col-span-1 flex items-center justify-center">
                    {getStatusIcon(port.status)}
                  </div>
                  <div className="col-span-1">
                    <div className="font-mono font-bold text-foreground">
                      {port.port}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="font-medium text-foreground truncate">
                      {port.processName || port.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {port.description}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="font-mono text-sm text-foreground">
                      {port.pid || "N/A"}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="font-mono text-xs text-foreground truncate">
                      {port.localAddress}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-foreground truncate">
                      {port.uptime}
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-primary/10 hover:bg-primary/20"
                      title="Watch port"
                    >
                      <Eye className="w-4 h-4 text-primary" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className=" bg-destructive/10 hover:bg-destructive/20 hover:text-destructive text-destructive border border-border"
                      title="Kill port"
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground">
                  Showing {filteredPorts.length} of {ports.length} ports
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-foreground">
                      {ports.filter((p) => p.status === "active").length} Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-foreground">
                      {ports.filter((p) => p.status === "warning").length}{" "}
                      Warning
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-foreground">
                      {ports.filter((p) => p.status === "error").length} Error
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Port Details - 30% */}
        <div className="w-[30%] overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">
                Port Details
              </h2>
              <p className="text-sm text-muted-foreground">
                Detailed information about selected port
              </p>
            </div>

            {selectedPortData ? (
              <div className="flex-1 overflow-y-auto p-6">
                {/* Port Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-3 rounded-lg",
                        getStatusColor(selectedPortData.status),
                      )}
                    >
                      {getStatusIcon(selectedPortData.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-foreground">
                          Port {selectedPortData.port}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedPortData.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Description
                  </h4>
                  <p className="text-sm text-foreground">
                    {selectedPortData.description}
                  </p>
                </div>

                {/* Basic Information */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Protocol
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {selectedPortData.protocol.toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Local Address
                      </div>
                      <div className="text-sm font-medium text-foreground font-mono">
                        {selectedPortData.localAddress}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Connections
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {selectedPortData.connections}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Uptime
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {selectedPortData.uptime}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process Information */}
                {selectedPortData.processName && (
                  <div className="space-y-4 mb-6">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Process Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Process Name
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          {selectedPortData.processName}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">PID</div>
                        <div className="text-sm font-medium text-foreground">
                          {selectedPortData.pid}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          User
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          {selectedPortData.user}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          System Port
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          {selectedPortData.isSystemPort ? "Yes" : "No"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Resource Usage */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Resource Usage
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Cpu className="w-4 h-4 text-blue-500" />
                        <div className="text-xs text-muted-foreground">
                          CPU Usage
                        </div>
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        {selectedPortData.cpuUsage}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <MemoryStick className="w-4 h-4 text-purple-500" />
                        <div className="text-xs text-muted-foreground">
                          Memory Usage
                        </div>
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        {selectedPortData.memoryUsage}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Actions
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full h-10 text-secondary-foreground hover:bg-primary! hover:text-secondary"
                    >
                      <StopCircle className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full h-10 text-secondary-foreground hover:bg-primary! hover:text-secondary"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Restart
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <Server className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No Port Selected
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select a port from the list to view detailed information
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
