
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Search, Play, RefreshCw, Download } from "lucide-react";

interface Subdomain {
  id: number;
  subdomain: string;
  ip: string;
  ports: string[];
  status: "active" | "inactive";
  source: "subfinder" | "amass" | "wordlist" | "certificate";
  lastSeen: string;
  riskLevel: "low" | "medium" | "high";
}

const SubdomainEnumeration = ({ domains }: { domains: string[] }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedTool, setSelectedTool] = useState("subfinder");
  const [customWordlist, setCustomWordlist] = useState("");
  const [selectedDomain, setSelectedDomain] = useState(domains[0] || "");

  // Mock subdomain data
  const [subdomains] = useState<Subdomain[]>([
    {
      id: 1,
      subdomain: "admin.techcorp.com",
      ip: "203.0.113.45",
      ports: ["22", "80", "443"],
      status: "active",
      source: "subfinder",
      lastSeen: "2 hours ago",
      riskLevel: "high"
    },
    {
      id: 2,
      subdomain: "api.techcorp.com",
      ip: "203.0.113.67",
      ports: ["443", "3000"],
      status: "active",
      source: "amass",
      lastSeen: "1 hour ago",
      riskLevel: "medium"
    },
    {
      id: 3,
      subdomain: "staging.techcorp.com",
      ip: "203.0.113.89",
      ports: ["80", "443"],
      status: "active",
      source: "wordlist",
      lastSeen: "30 mins ago",
      riskLevel: "low"
    },
    {
      id: 4,
      subdomain: "dev.techcorp.com",
      ip: "203.0.113.120",
      ports: ["80", "8080"],
      status: "active",
      source: "certificate",
      lastSeen: "1 hour ago",
      riskLevel: "medium"
    },
    {
      id: 5,
      subdomain: "old.techcorp.com",
      ip: "203.0.113.150",
      ports: [],
      status: "inactive",
      source: "subfinder",
      lastSeen: "3 days ago",
      riskLevel: "low"
    }
  ]);

  const handleStartScan = () => {
    setIsScanning(true);
    // Mock scanning process
    setTimeout(() => {
      setIsScanning(false);
    }, 5000);
  };

  const handleExportResults = () => {
    const csvContent = "Subdomain,IP,Ports,Status,Source,Last Seen,Risk Level\n" +
      subdomains.map(sub => 
        `${sub.subdomain},${sub.ip},"${sub.ports.join(';')}",${sub.status},${sub.source},${sub.lastSeen},${sub.riskLevel}`
      ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subdomains_${selectedDomain}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-red-500";
      case "medium": return "bg-amber-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case "subfinder": return "border-blue-600 text-blue-400";
      case "amass": return "border-green-600 text-green-400";
      case "wordlist": return "border-purple-600 text-purple-400";
      case "certificate": return "border-amber-600 text-amber-400";
      default: return "border-slate-600 text-slate-400";
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Subdomain Enumeration
            </CardTitle>
            <CardDescription className="text-slate-400">
              Automated subdomain discovery using multiple tools and techniques
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleExportResults}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              onClick={handleStartScan}
              disabled={isScanning}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Scan
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="domain" className="text-slate-300">Target Domain</Label>
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {domains.map((domain) => (
                  <SelectItem key={domain} value={domain} className="text-white hover:bg-slate-600">
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="tool" className="text-slate-300">Enumeration Tool</Label>
            <Select value={selectedTool} onValueChange={setSelectedTool}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="subfinder" className="text-white hover:bg-slate-600">Subfinder</SelectItem>
                <SelectItem value="amass" className="text-white hover:bg-slate-600">Amass</SelectItem>
                <SelectItem value="wordlist" className="text-white hover:bg-slate-600">Wordlist</SelectItem>
                <SelectItem value="all" className="text-white hover:bg-slate-600">All Tools</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="wordlist" className="text-slate-300">Custom Wordlist</Label>
            <Input
              id="wordlist"
              placeholder="Upload or paste wordlist"
              value={customWordlist}
              onChange={(e) => setCustomWordlist(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Card className="bg-slate-700/30 border-slate-600">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{subdomains.filter(s => s.status === "active").length}</div>
              <p className="text-sm text-slate-400">Active Subdomains</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-700/30 border-slate-600">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{subdomains.filter(s => s.riskLevel === "high").length}</div>
              <p className="text-sm text-slate-400">High Risk</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-700/30 border-slate-600">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{subdomains.filter(s => s.ports.length > 0).length}</div>
              <p className="text-sm text-slate-400">With Open Ports</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-700/30 border-slate-600">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{new Set(subdomains.map(s => s.source)).size}</div>
              <p className="text-sm text-slate-400">Sources Used</p>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-slate-700">
              <TableHead className="text-slate-300">Risk</TableHead>
              <TableHead className="text-slate-300">Subdomain</TableHead>
              <TableHead className="text-slate-300">IP Address</TableHead>
              <TableHead className="text-slate-300">Open Ports</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
              <TableHead className="text-slate-300">Source</TableHead>
              <TableHead className="text-slate-300">Last Seen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subdomains.map((subdomain) => (
              <TableRow key={subdomain.id} className="border-slate-700 hover:bg-slate-700/30">
                <TableCell>
                  <div className={`w-3 h-3 rounded-full ${getRiskColor(subdomain.riskLevel)}`} />
                </TableCell>
                <TableCell className="text-slate-200 font-mono">{subdomain.subdomain}</TableCell>
                <TableCell className="text-slate-200 font-mono">{subdomain.ip}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {subdomain.ports.length > 0 ? (
                      subdomain.ports.slice(0, 3).map((port) => (
                        <Badge key={port} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                          {port}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-slate-500 text-sm">None</span>
                    )}
                    {subdomain.ports.length > 3 && (
                      <Badge variant="secondary" className="bg-slate-700 text-slate-400 text-xs">
                        +{subdomain.ports.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={subdomain.status === "active" ? "default" : "secondary"}
                    className={subdomain.status === "active" ? "bg-green-600" : "bg-slate-600"}
                  >
                    {subdomain.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getSourceColor(subdomain.source)}>
                    {subdomain.source}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-400 text-sm">{subdomain.lastSeen}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SubdomainEnumeration;
