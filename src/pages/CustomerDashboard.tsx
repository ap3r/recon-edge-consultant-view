
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Shield, Globe, Cloud, Database, Activity, AlertTriangle, UserX } from "lucide-react";

const CustomerDashboard = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  // Mock customer data - in real app this would come from your data store
  useEffect(() => {
    // Simulate fetching customer data
    const mockCustomer = {
      id: customerId,
      name: "TechCorp Industries",
      industry: "Technology",
      contactEmail: "security@techcorp.com",
      description: "Leading technology company specializing in cloud infrastructure",
      riskTolerance: "medium",
      domains: ["techcorp.com", "api.techcorp.com", "cdn.techcorp.com", "mail.techcorp.com"],
      cloudProviders: ["AWS", "Azure", "Google Cloud"],
      acquisitions: [
        { company: "DataFlow Systems", date: "2023-03", value: "$15M" },
        { company: "SecureNet Inc", date: "2022-11", value: "$8M" }
      ],
      breaches: [
        { date: "2021-06", description: "Minor data exposure via misconfigured S3 bucket", severity: "Low" }
      ],
      breachedCredentials: 127, // New field for breached credentials count
      osintData: {
        socialMedia: ["LinkedIn", "Twitter", "GitHub"],
        employees: 450,
        techStack: ["React", "Node.js", "PostgreSQL", "Docker", "Kubernetes"]
      }
    };
    setCustomer(mockCustomer);
  }, [customerId]);

  // Mock interesting hosts data
  const interestingHosts = [
    {
      ip: "203.0.113.45",
      hostname: "admin.techcorp.com",
      ports: ["22", "80", "443", "8080"],
      technologies: ["Apache 2.4", "PHP 8.1", "MySQL"],
      riskLevel: "high"
    },
    {
      ip: "203.0.113.67",
      hostname: "api.techcorp.com",
      ports: ["443", "3000"],
      technologies: ["Node.js", "Express", "Redis"],
      riskLevel: "medium"
    },
    {
      ip: "203.0.113.89",
      hostname: "staging.techcorp.com",
      ports: ["80", "443", "9000"],
      technologies: ["Nginx", "React", "Docker"],
      riskLevel: "low"
    }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case "high": return "bg-red-500";
      case "medium": return "bg-amber-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
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
                onClick={() => navigate('/')}
                className="text-slate-300 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-slate-600" />
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-blue-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">{customer.name}</h1>
                  <p className="text-sm text-slate-400">Customer Dashboard</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="border-blue-400 text-blue-400">
              {customer.industry}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Customer Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Domains</CardTitle>
              <Globe className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{customer.domains.length}</div>
              <p className="text-xs text-slate-400">Monitored domains</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Cloud Providers</CardTitle>
              <Cloud className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{customer.cloudProviders.length}</div>
              <p className="text-xs text-slate-400">Identified providers</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Employees</CardTitle>
              <Database className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{customer.osintData.employees}</div>
              <p className="text-xs text-slate-400">Via OSINT</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Breached Credentials</CardTitle>
              <UserX className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{customer.breachedCredentials}</div>
              <p className="text-xs text-slate-400">Found in breaches</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Risk Level</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white capitalize">{customer.riskTolerance}</div>
              <p className="text-xs text-slate-400">Overall assessment</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* OSINT Data */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">OSINT Intelligence</CardTitle>
              <CardDescription className="text-slate-400">
                Open source intelligence gathered about the organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-slate-200 font-medium mb-2">Cloud Providers</h4>
                <div className="flex flex-wrap gap-2">
                  {customer.cloudProviders.map((provider) => (
                    <Badge key={provider} variant="secondary" className="bg-slate-700 text-slate-300">
                      {provider}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-slate-200 font-medium mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {customer.osintData.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="border-slate-600 text-slate-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-slate-200 font-medium mb-2">Social Media Presence</h4>
                <div className="flex flex-wrap gap-2">
                  {customer.osintData.socialMedia.map((platform) => (
                    <Badge key={platform} variant="outline" className="border-blue-600 text-blue-400">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historical Data */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Historical Intelligence</CardTitle>
              <CardDescription className="text-slate-400">
                Business acquisitions and security incidents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-slate-200 font-medium mb-2">Recent Acquisitions</h4>
                <div className="space-y-2">
                  {customer.acquisitions.map((acquisition, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                      <div>
                        <div className="text-slate-200 font-medium">{acquisition.company}</div>
                        <div className="text-xs text-slate-400">{acquisition.date}</div>
                      </div>
                      <Badge variant="outline" className="border-green-600 text-green-400">
                        {acquisition.value}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-slate-200 font-medium mb-2">Security Incidents</h4>
                <div className="space-y-2">
                  {customer.breaches.map((breach, index) => (
                    <div key={index} className="p-2 bg-slate-700/30 rounded">
                      <div className="flex justify-between items-start mb-1">
                        <div className="text-xs text-slate-400">{breach.date}</div>
                        <Badge variant="outline" className="border-amber-600 text-amber-400">
                          {breach.severity}
                        </Badge>
                      </div>
                      <div className="text-slate-200 text-sm">{breach.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Most Interesting Hosts */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-white">Most Interesting Hosts</CardTitle>
                <CardDescription className="text-slate-400">
                  High-value targets and critical infrastructure
                </CardDescription>
              </div>
              <Button
                onClick={() => navigate(`/customer/${customerId}/assets`)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                View All Assets
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Risk</TableHead>
                  <TableHead className="text-slate-300">IP Address</TableHead>
                  <TableHead className="text-slate-300">Hostname</TableHead>
                  <TableHead className="text-slate-300">Open Ports</TableHead>
                  <TableHead className="text-slate-300">Technologies</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interestingHosts.map((host, index) => (
                  <TableRow key={index} className="border-slate-700 hover:bg-slate-700/30">
                    <TableCell>
                      <div className={`w-3 h-3 rounded-full ${getRiskColor(host.riskLevel)}`} />
                    </TableCell>
                    <TableCell className="text-slate-200 font-mono">{host.ip}</TableCell>
                    <TableCell className="text-slate-200">{host.hostname}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {host.ports.map((port) => (
                          <Badge key={port} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                            {port}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {host.technologies.slice(0, 2).map((tech) => (
                          <Badge key={tech} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {host.technologies.length > 2 && (
                          <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                            +{host.technologies.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Domains Overview */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Monitored Domains</CardTitle>
            <CardDescription className="text-slate-400">
              All domains currently under surveillance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {customer.domains.map((domain) => (
                <div key={domain} className="p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                  <div className="text-slate-200 font-medium">{domain}</div>
                  <div className="text-xs text-slate-400 mt-1">Last scanned: 2 hours ago</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
