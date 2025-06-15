
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cloud, Search, Play, RefreshCw, ExternalLink } from "lucide-react";

interface CloudAsset {
  id: number;
  type: "s3" | "azure" | "gcp";
  name: string;
  url: string;
  accessible: boolean;
  permissions: string[];
  lastChecked: string;
  riskLevel: "low" | "medium" | "high";
}

const CloudAssetDiscovery = ({ customerName }: { customerName: string }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [customPatterns, setCustomPatterns] = useState("");

  // Mock cloud assets data
  const [cloudAssets] = useState<CloudAsset[]>([
    {
      id: 1,
      type: "s3",
      name: "techcorp-backups",
      url: "https://techcorp-backups.s3.amazonaws.com",
      accessible: true,
      permissions: ["ListBucket", "GetObject"],
      lastChecked: "2 hours ago",
      riskLevel: "high"
    },
    {
      id: 2,
      type: "s3",
      name: "techcorp-dev",
      url: "https://techcorp-dev.s3.amazonaws.com",
      accessible: false,
      permissions: [],
      lastChecked: "2 hours ago",
      riskLevel: "low"
    },
    {
      id: 3,
      type: "azure",
      name: "techcorpstorage",
      url: "https://techcorpstorage.blob.core.windows.net",
      accessible: true,
      permissions: ["Read", "List"],
      lastChecked: "1 hour ago",
      riskLevel: "medium"
    },
    {
      id: 4,
      type: "gcp",
      name: "techcorp-prod-data",
      url: "https://storage.googleapis.com/techcorp-prod-data",
      accessible: false,
      permissions: [],
      lastChecked: "30 mins ago",
      riskLevel: "low"
    }
  ]);

  const handleStartScan = () => {
    setIsScanning(true);
    // Mock scanning process
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-red-500";
      case "medium": return "bg-amber-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getCloudIcon = (type: string) => {
    switch (type) {
      case "s3": return "🪣";
      case "azure": return "☁️";
      case "gcp": return "🏗️";
      default: return "☁️";
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Cloud Asset Discovery
            </CardTitle>
            <CardDescription className="text-slate-400">
              Automated detection of cloud storage assets using naming patterns
            </CardDescription>
          </div>
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
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="patterns" className="text-slate-300">Custom Naming Patterns</Label>
          <Input
            id="patterns"
            placeholder="Enter custom patterns (e.g., companyname-*, *-backup, dev-*)"
            value={customPatterns}
            onChange={(e) => setCustomPatterns(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
          <p className="text-xs text-slate-400 mt-1">
            Default patterns include: {customerName.toLowerCase()}-*, *-{customerName.toLowerCase()}, {customerName.toLowerCase()}*
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-slate-700">
              <TableHead className="text-slate-300">Risk</TableHead>
              <TableHead className="text-slate-300">Provider</TableHead>
              <TableHead className="text-slate-300">Asset Name</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
              <TableHead className="text-slate-300">Permissions</TableHead>
              <TableHead className="text-slate-300">Last Checked</TableHead>
              <TableHead className="text-slate-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cloudAssets.map((asset) => (
              <TableRow key={asset.id} className="border-slate-700 hover:bg-slate-700/30">
                <TableCell>
                  <div className={`w-3 h-3 rounded-full ${getRiskColor(asset.riskLevel)}`} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{getCloudIcon(asset.type)}</span>
                    <Badge variant="outline" className="border-slate-600 text-slate-300 uppercase">
                      {asset.type}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-slate-200 font-mono">{asset.name}</TableCell>
                <TableCell>
                  <Badge 
                    variant={asset.accessible ? "destructive" : "secondary"}
                    className={asset.accessible ? "bg-red-600" : "bg-slate-600"}
                  >
                    {asset.accessible ? "Accessible" : "Protected"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {asset.permissions.length > 0 ? (
                      asset.permissions.slice(0, 2).map((perm) => (
                        <Badge key={perm} variant="outline" className="border-amber-600 text-amber-400 text-xs">
                          {perm}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-slate-500 text-sm">None</span>
                    )}
                    {asset.permissions.length > 2 && (
                      <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                        +{asset.permissions.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-slate-400 text-sm">{asset.lastChecked}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-white"
                    onClick={() => window.open(asset.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CloudAssetDiscovery;
