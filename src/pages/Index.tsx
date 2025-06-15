
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Globe, Zap, Plus, Activity } from "lucide-react";
import { CustomerDialog } from "@/components/CustomerDialog";
import { AssetDialog } from "@/components/AssetDialog";

const Index = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "TechCorp Industries",
      domains: 15,
      ipRanges: 3,
      lastScan: "2 hours ago",
      riskLevel: "medium",
      status: "active"
    },
    {
      id: 2,
      name: "SecureBank Ltd",
      domains: 32,
      ipRanges: 8,
      lastScan: "1 day ago",
      riskLevel: "high",
      status: "scanning"
    },
    {
      id: 3,
      name: "MedCore Systems",
      domains: 22,
      ipRanges: 5,
      lastScan: "4 hours ago",
      riskLevel: "low",
      status: "active"
    },
    {
      id: 4,
      name: "RetailChain Global",
      domains: 45,
      ipRanges: 12,
      lastScan: "6 hours ago",
      riskLevel: "high",
      status: "active"
    },
    {
      id: 5,
      name: "CloudFirst Solutions",
      domains: 18,
      ipRanges: 4,
      lastScan: "3 hours ago",
      riskLevel: "medium",
      status: "scanning"
    },
    {
      id: 6,
      name: "ManufacturingPlus Inc",
      domains: 28,
      ipRanges: 7,
      lastScan: "8 hours ago",
      riskLevel: "low",
      status: "active"
    },
    {
      id: 7,
      name: "EnergyGrid Corp",
      domains: 56,
      ipRanges: 15,
      lastScan: "12 hours ago",
      riskLevel: "high",
      status: "inactive"
    }
  ]);

  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [showAssetDialog, setShowAssetDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-red-500";
      case "medium": return "bg-amber-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "scanning": return "bg-blue-100 text-blue-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCustomerClick = (customer: any) => {
    navigate(`/customer/${customer.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">AttackSurface Pro</h1>
                <p className="text-sm text-slate-400">Attack Surface Management Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-blue-400 text-blue-400">
                Consultant: nate drier
              </Badge>
              <Button
                onClick={() => setShowCustomerDialog(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Customer
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{customers.length}</div>
              <p className="text-xs text-slate-400">Active engagements</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Assets Monitored</CardTitle>
              <Globe className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {customers.reduce((acc, customer) => acc + customer.domains + customer.ipRanges, 0)}
              </div>
              <p className="text-xs text-slate-400">Domains & IP ranges</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Active Scans</CardTitle>
              <Activity className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3</div>
              <p className="text-xs text-slate-400">Currently running</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">High Risk Findings</CardTitle>
              <Zap className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">7</div>
              <p className="text-xs text-slate-400">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Customer List */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Customer Portfolio</CardTitle>
            <CardDescription className="text-slate-400">
              Manage your penetration testing engagements and attack surface monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-slate-500 transition-colors cursor-pointer"
                  onClick={() => handleCustomerClick(customer)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getRiskColor(customer.riskLevel)}`} />
                    <div>
                      <h3 className="font-medium text-white">{customer.name}</h3>
                      <p className="text-sm text-slate-400">
                        {customer.domains} domains • {customer.ipRanges} IP ranges • Last scan: {customer.lastScan}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCustomer(customer);
                        setShowAssetDialog(true);
                      }}
                    >
                      Add Assets
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <CustomerDialog
        open={showCustomerDialog}
        onOpenChange={setShowCustomerDialog}
        onCustomerCreated={(customer) => {
          setCustomers([...customers, { ...customer, id: Date.now() }]);
        }}
      />

      <AssetDialog
        open={showAssetDialog}
        onOpenChange={setShowAssetDialog}
        customer={selectedCustomer}
        onAssetsAdded={(assets) => {
          console.log("Assets added:", assets);
          // Handle asset addition logic here
        }}
      />
    </div>
  );
};

export default Index;
