
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, Filter, Download } from "lucide-react";

const CustomerAssets = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock customer data
  useEffect(() => {
    setCustomer({ name: "TechCorp Industries" });
  }, [customerId]);

  // Mock comprehensive assets data
  const allAssets = [
    {
      id: 1,
      type: "domain",
      asset: "techcorp.com",
      ip: "203.0.113.10",
      ports: ["80", "443"],
      technologies: ["Apache 2.4", "PHP 8.1"],
      lastScan: "2 hours ago",
      riskLevel: "low",
      status: "active"
    },
    {
      id: 2,
      type: "subdomain",
      asset: "admin.techcorp.com",
      ip: "203.0.113.45",
      ports: ["22", "80", "443", "8080"],
      technologies: ["Apache 2.4", "PHP 8.1", "MySQL"],
      lastScan: "1 hour ago",
      riskLevel: "high",
      status: "vulnerable"
    },
    {
      id: 3,
      type: "subdomain",
      asset: "api.techcorp.com",
      ip: "203.0.113.67",
      ports: ["443", "3000"],
      technologies: ["Node.js", "Express", "Redis"],
      lastScan: "30 mins ago",
      riskLevel: "medium",
      status: "active"
    },
    {
      id: 4,
      type: "subdomain",
      asset: "staging.techcorp.com",
      ip: "203.0.113.89",
      ports: ["80", "443", "9000"],
      technologies: ["Nginx", "React", "Docker"],
      lastScan: "1 hour ago",
      riskLevel: "low",
      status: "development"
    },
    {
      id: 5,
      type: "ip",
      asset: "203.0.113.100",
      ip: "203.0.113.100",
      ports: ["21", "22", "80", "443"],
      technologies: ["vsftpd", "OpenSSH", "Nginx"],
      lastScan: "45 mins ago",
      riskLevel: "high",
      status: "misconfigured"
    },
    {
      id: 6,
      type: "subdomain",
      asset: "mail.techcorp.com",
      ip: "203.0.113.120",
      ports: ["25", "587", "993", "995"],
      technologies: ["Postfix", "Dovecot"],
      lastScan: "1 hour ago",
      riskLevel: "medium",
      status: "active"
    },
    {
      id: 7,
      type: "subdomain",
      asset: "cdn.techcorp.com",
      ip: "203.0.113.150",
      ports: ["80", "443"],
      technologies: ["CloudFlare", "Nginx"],
      lastScan: "2 hours ago",
      riskLevel: "low",
      status: "active"
    },
    {
      id: 8,
      type: "ip",
      asset: "203.0.113.200",
      ip: "203.0.113.200",
      ports: ["3306", "22"],
      technologies: ["MySQL 8.0", "OpenSSH"],
      lastScan: "30 mins ago",
      riskLevel: "high",
      status: "exposed"
    }
  ];

  const filteredAssets = allAssets.filter(asset => {
    const matchesSearch = asset.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.ip.includes(searchTerm) ||
                         asset.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === "all" || asset.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getRiskColor = (risk) => {
    switch (risk) {
      case "high": return "bg-red-500";
      case "medium": return "bg-amber-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "vulnerable": return "bg-red-100 text-red-800";
      case "misconfigured": return "bg-orange-100 text-orange-800";
      case "exposed": return "bg-red-100 text-red-800";
      case "development": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!customer) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate(`/customer/${customerId}`)}
                className="text-slate-300 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-slate-600" />
              <div>
                <h1 className="text-2xl font-bold text-white">{customer.name} - Assets</h1>
                <p className="text-sm text-slate-400">Complete asset inventory and analysis</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Asset Search & Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search assets, IPs, or technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  onClick={() => setFilterType("all")}
                  className={filterType === "all" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
                >
                  All ({allAssets.length})
                </Button>
                <Button
                  variant={filterType === "domain" ? "default" : "outline"}
                  onClick={() => setFilterType("domain")}
                  className={filterType === "domain" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
                >
                  Domains ({allAssets.filter(a => a.type === "domain").length})
                </Button>
                <Button
                  variant={filterType === "subdomain" ? "default" : "outline"}
                  onClick={() => setFilterType("subdomain")}
                  className={filterType === "subdomain" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
                >
                  Subdomains ({allAssets.filter(a => a.type === "subdomain").length})
                </Button>
                <Button
                  variant={filterType === "ip" ? "default" : "outline"}
                  onClick={() => setFilterType("ip")}
                  className={filterType === "ip" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
                >
                  IPs ({allAssets.filter(a => a.type === "ip").length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assets Table */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Asset Inventory</CardTitle>
            <CardDescription className="text-slate-400">
              {filteredAssets.length} assets found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Risk</TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">Asset</TableHead>
                  <TableHead className="text-slate-300">IP Address</TableHead>
                  <TableHead className="text-slate-300">Open Ports</TableHead>
                  <TableHead className="text-slate-300">Technologies</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Last Scan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id} className="border-slate-700 hover:bg-slate-700/30">
                    <TableCell>
                      <div className={`w-3 h-3 rounded-full ${getRiskColor(asset.riskLevel)}`} title={`${asset.riskLevel} risk`} />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-slate-600 text-slate-300 capitalize">
                        {asset.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-200 font-mono">{asset.asset}</TableCell>
                    <TableCell className="text-slate-200 font-mono">{asset.ip}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {asset.ports.slice(0, 3).map((port) => (
                          <Badge key={port} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                            {port}
                          </Badge>
                        ))}
                        {asset.ports.length > 3 && (
                          <Badge variant="secondary" className="bg-slate-700 text-slate-400 text-xs">
                            +{asset.ports.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {asset.technologies.slice(0, 2).map((tech) => (
                          <Badge key={tech} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {asset.technologies.length > 2 && (
                          <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                            +{asset.technologies.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(asset.status)}>
                        {asset.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">{asset.lastScan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerAssets;
