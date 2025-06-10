
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
  Clock
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const systemStats = {
    totalUsers: 1247,
    totalFacilities: 156,
    totalOrganizations: 89,
    monthlyRevenue: 125000,
    activeSubscriptions: 1156,
    pendingApprovals: 23
  };

  const recentActivity = [
    { id: 1, type: 'user', content: 'New healthcare organization registered: Metro Health Services', time: '2 hours ago', status: 'pending' },
    { id: 2, type: 'facility', content: 'Facility verification completed: Sunrise Senior Living', time: '4 hours ago', status: 'approved' },
    { id: 3, type: 'payment', content: 'Payment issue reported by Golden Years Care', time: '6 hours ago', status: 'urgent' },
    { id: 4, type: 'org', content: 'Organization admin access granted to Valley Healthcare', time: '1 day ago', status: 'completed' }
  ];

  const organizationRequests = [
    { id: 1, org: 'Metro Health Services', type: 'Healthcare Provider', users: 12, status: 'pending' },
    { id: 2, org: 'Caring Hands Agency', type: 'Placement Agent', users: 8, status: 'pending' },
    { id: 3, org: 'Peaceful Meadows', type: 'Facility', users: 15, status: 'review' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray flex items-center">
            <Crown className="h-8 w-8 mr-3 text-yellow-600" />
            Super Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Complete system oversight and management</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <AlertTriangle className="h-4 w-4 mr-2" />
            System Health
          </Button>
          <Button className="bg-primary-red hover:bg-red-600">
            Emergency Controls
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Pending Approvals
                </CardTitle>
                <CardDescription>Items requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organizationRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold text-text-dark-gray">{request.org}</h4>
                        <p className="text-sm text-gray-600">{request.type} • {request.users} users</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>System Activity</CardTitle>
                <CardDescription>Latest platform activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-3 border rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {activity.status === 'urgent' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                        {activity.status === 'pending' && <Clock className="h-4 w-4 text-yellow-500" />}
                        {activity.status === 'approved' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {activity.status === 'completed' && <CheckCircle className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-text-dark-gray">{activity.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                      <Badge className={
                        activity.status === 'urgent' ? 'bg-red-100 text-red-800' :
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="organizations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Management</CardTitle>
              <CardDescription>Manage organizational accounts and admin permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-4">Organization management interface will be implemented here</p>
                <Button>Manage Organizations</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage all user accounts across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-4">User management interface will be implemented here</p>
                <Button>Manage Users</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Facility Management</CardTitle>
              <CardDescription>Oversee all facility listings and verifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-4">Facility management interface will be implemented here</p>
                <Button>Manage Facilities</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Administration</CardTitle>
              <CardDescription>System configuration and maintenance tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-4">System administration tools will be implemented here</p>
                <Button>System Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;
