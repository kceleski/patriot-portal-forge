
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  CreditCard, 
  Shield, 
  Crown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Database
} from 'lucide-react';

const SuperUserDashboard = () => {
  const systemStats = {
    totalUsers: 1247,
    totalFacilities: 156,
    totalOrganizations: 89,
    monthlyRevenue: 125000,
    activeSubscriptions: 1156,
    pendingApprovals: 23,
    systemHealth: 'Excellent',
    uptime: '99.9%'
  };

  const quickActions = [
    { icon: Users, label: 'Manage Users', description: 'Add, edit, or remove user accounts' },
    { icon: Building2, label: 'Manage Facilities', description: 'Oversee facility listings and verifications' },
    { icon: Shield, label: 'System Security', description: 'Monitor security and access controls' },
    { icon: Database, label: 'Database Admin', description: 'Direct database management tools' },
    { icon: Settings, label: 'System Config', description: 'Configure system-wide settings' },
    { icon: TrendingUp, label: 'Analytics', description: 'View comprehensive system analytics' }
  ];

  const recentAlerts = [
    { id: 1, type: 'warning', message: 'High API usage detected on facility service', time: '5 min ago' },
    { id: 2, type: 'info', message: 'Scheduled maintenance completed successfully', time: '2 hours ago' },
    { id: 3, type: 'success', message: 'New backup completed', time: '6 hours ago' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray flex items-center">
            <Crown className="h-8 w-8 mr-3 text-yellow-600" />
            Super User Control Panel
          </h1>
          <p className="text-gray-600 mt-2">Complete system administration and oversight</p>
        </div>
        <div className="flex space-x-3">
          <Badge className="bg-green-100 text-green-800">
            System Status: {systemStats.systemHealth}
          </Badge>
          <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Emergency Controls
          </Button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{systemStats.totalUsers}</p>
                <p className="text-gray-600">Total Users</p>
                <p className="text-sm text-green-600">+12% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{systemStats.totalFacilities}</p>
                <p className="text-gray-600">Active Facilities</p>
                <p className="text-sm text-green-600">+8% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">${systemStats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-gray-600">Monthly Revenue</p>
                <p className="text-sm text-green-600">+15% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{systemStats.uptime}</p>
                <p className="text-gray-600">System Uptime</p>
                <p className="text-sm text-green-600">Last 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2">
                  <action.icon className="h-5 w-5 text-brand-navy" />
                  <span className="font-semibold">{action.label}</span>
                </div>
                <p className="text-sm text-gray-600 text-left">{action.description}</p>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              System Alerts
            </CardTitle>
            <CardDescription>Recent system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-4 p-3 border rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    {alert.type === 'info' && <Clock className="h-4 w-4 text-blue-500" />}
                    {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-dark-gray">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current system performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">API Response Time</span>
                <Badge className="bg-green-100 text-green-800">120ms</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Database Performance</span>
                <Badge className="bg-green-100 text-green-800">Optimal</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Sessions</span>
                <Badge className="bg-blue-100 text-blue-800">234</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pending Approvals</span>
                <Badge className="bg-yellow-100 text-yellow-800">{systemStats.pendingApprovals}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperUserDashboard;
