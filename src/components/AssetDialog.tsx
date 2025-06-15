
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Globe, Server, Plus, X } from "lucide-react";

interface AssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: any;
  onAssetsAdded: (assets: any) => void;
}

export const AssetDialog = ({ open, onOpenChange, customer, onAssetsAdded }: AssetDialogProps) => {
  const [domains, setDomains] = useState<string[]>([]);
  const [ipRanges, setIpRanges] = useState<string[]>([]);
  const [currentDomain, setCurrentDomain] = useState("");
  const [currentIpRange, setCurrentIpRange] = useState("");
  const [bulkDomains, setBulkDomains] = useState("");
  const [bulkIpRanges, setBulkIpRanges] = useState("");
  
  const { toast } = useToast();

  const addDomain = () => {
    if (currentDomain && !domains.includes(currentDomain)) {
      setDomains([...domains, currentDomain]);
      setCurrentDomain("");
    }
  };

  const addIpRange = () => {
    if (currentIpRange && !ipRanges.includes(currentIpRange)) {
      setIpRanges([...ipRanges, currentIpRange]);
      setCurrentIpRange("");
    }
  };

  const removeDomain = (domain: string) => {
    setDomains(domains.filter(d => d !== domain));
  };

  const removeIpRange = (ipRange: string) => {
    setIpRanges(ipRanges.filter(ip => ip !== ipRange));
  };

  const processBulkDomains = () => {
    const newDomains = bulkDomains
      .split('\n')
      .map(d => d.trim())
      .filter(d => d && !domains.includes(d));
    
    setDomains([...domains, ...newDomains]);
    setBulkDomains("");
  };

  const processBulkIpRanges = () => {
    const newIpRanges = bulkIpRanges
      .split('\n')
      .map(ip => ip.trim())
      .filter(ip => ip && !ipRanges.includes(ip));
    
    setIpRanges([...ipRanges, ...newIpRanges]);
    setBulkIpRanges("");
  };

  const handleSubmit = () => {
    if (domains.length === 0 && ipRanges.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one domain or IP range",
        variant: "destructive",
      });
      return;
    }

    const assets = {
      domains,
      ipRanges,
      customerId: customer?.id
    };

    onAssetsAdded(assets);
    onOpenChange(false);
    
    // Reset form
    setDomains([]);
    setIpRanges([]);
    setCurrentDomain("");
    setCurrentIpRange("");
    setBulkDomains("");
    setBulkIpRanges("");

    toast({
      title: "Success",
      description: `Added ${domains.length} domains and ${ipRanges.length} IP ranges`,
    });
  };

  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Assets for {customer.name}</DialogTitle>
          <DialogDescription className="text-slate-400">
            Define the attack surface by adding domains and IP ranges to monitor
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="domains" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-700">
            <TabsTrigger value="domains" className="data-[state=active]:bg-slate-600">
              <Globe className="h-4 w-4 mr-2" />
              Domains
            </TabsTrigger>
            <TabsTrigger value="ip-ranges" className="data-[state=active]:bg-slate-600">
              <Server className="h-4 w-4 mr-2" />
              IP Ranges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="domains" className="space-y-4">
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={currentDomain}
                  onChange={(e) => setCurrentDomain(e.target.value)}
                  placeholder="example.com"
                  className="bg-slate-700 border-slate-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && addDomain()}
                />
                <Button
                  type="button"
                  onClick={addDomain}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Bulk Add (one per line)</Label>
                <Textarea
                  value={bulkDomains}
                  onChange={(e) => setBulkDomains(e.target.value)}
                  placeholder="domain1.com&#10;domain2.com&#10;subdomain.example.com"
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={4}
                />
                <Button
                  type="button"
                  onClick={processBulkDomains}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Add Bulk Domains
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Added Domains ({domains.length})</Label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto bg-slate-700/50 p-3 rounded-lg">
                  {domains.map((domain, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-600/20 text-blue-300 border-blue-600/30"
                    >
                      {domain}
                      <button
                        onClick={() => removeDomain(domain)}
                        className="ml-2 hover:text-red-400"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {domains.length === 0 && (
                    <p className="text-slate-400 text-sm">No domains added yet</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ip-ranges" className="space-y-4">
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={currentIpRange}
                  onChange={(e) => setCurrentIpRange(e.target.value)}
                  placeholder="192.168.1.0/24 or 10.0.0.1-10.0.0.100"
                  className="bg-slate-700 border-slate-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && addIpRange()}
                />
                <Button
                  type="button"
                  onClick={addIpRange}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Bulk Add (one per line)</Label>
                <Textarea
                  value={bulkIpRanges}
                  onChange={(e) => setBulkIpRanges(e.target.value)}
                  placeholder="192.168.1.0/24&#10;10.0.0.0/16&#10;172.16.1.1-172.16.1.50"
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={4}
                />
                <Button
                  type="button"
                  onClick={processBulkIpRanges}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Add Bulk IP Ranges
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Added IP Ranges ({ipRanges.length})</Label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto bg-slate-700/50 p-3 rounded-lg">
                  {ipRanges.map((ipRange, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-green-600/20 text-green-300 border-green-600/30"
                    >
                      {ipRange}
                      <button
                        onClick={() => removeIpRange(ipRange)}
                        className="ml-2 hover:text-red-400"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {ipRanges.length === 0 && (
                    <p className="text-slate-400 text-sm">No IP ranges added yet</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t border-slate-700">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Assets ({domains.length + ipRanges.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
