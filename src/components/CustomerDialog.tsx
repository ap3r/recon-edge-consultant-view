
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCustomerCreated: (customer: any) => void;
}

export const CustomerDialog = ({ open, onOpenChange, onCustomerCreated }: CustomerDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    contactEmail: "",
    description: "",
    riskTolerance: ""
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.contactEmail) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newCustomer = {
      ...formData,
      domains: 0,
      ipRanges: 0,
      lastScan: "Never",
      riskLevel: "low",
      status: "inactive"
    };

    onCustomerCreated(newCustomer);
    onOpenChange(false);
    setFormData({
      name: "",
      industry: "",
      contactEmail: "",
      description: "",
      riskTolerance: ""
    });

    toast({
      title: "Success",
      description: "Customer created successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Customer</DialogTitle>
          <DialogDescription className="text-slate-400">
            Add a new client to your penetration testing portfolio
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">Company Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="e.g., TechCorp Industries"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry" className="text-slate-200">Industry</Label>
            <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="financial">Financial Services</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">Contact Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="security@company.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="riskTolerance" className="text-slate-200">Risk Tolerance</Label>
            <Select value={formData.riskTolerance} onValueChange={(value) => setFormData({ ...formData, riskTolerance: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select risk tolerance" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="low">Low - Minimal disruption allowed</SelectItem>
                <SelectItem value="medium">Medium - Standard testing approach</SelectItem>
                <SelectItem value="high">High - Aggressive testing permitted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-200">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Additional notes about the engagement..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Customer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
