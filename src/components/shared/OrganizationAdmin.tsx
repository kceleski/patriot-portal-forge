
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Mail, 
  Phone, 
  Edit, 
  Trash2, 
  Search,
  Building2,
  FileBarChart,
  Settings
} from 'lucide-react';

interface OrganizationAdminProps {
  userType: 'healthcare' | 'agent' | 'facility';
  organizationName: string;
}

const OrganizationAdmin: React.FC<OrganizationAdminProps> = ({ userType, organizationName }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const orgEmployees = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@organization.com',
      phone: '(555) 123-4567',
      role: userType === 'facility' ? 'Care Coordinator' : 'Senior Specialist',
      status: 'Active',
      department: userType === 'facility' ? 'Care Services' : 'Client Services',
      lastLogin: '2024-12-13 09:30 AM',
      permissions: ['client_management', 'reporting']
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@organization.com',
      phone: '(555) 234-5678',
      role: userType === 'facility' ? 'Placement Specialist' : 'Care Coordinator',
      status: 'Active',
      department: userType === 'facility' ? 'Admissions' : 'Care Services',
      lastLogin: '2024-12-13 08:45 AM',
      permissions: ['client_management', 'intake_forms']
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@organization.com',
      phone: '(555) 345-6789',
      role: 'Marketing Coordinator',
      status: 'Inactive',
      department: 'Marketing',
      lastLogin: '2024-12-10 02:15 PM',
      permissions: ['reporting']
    }
  ];

  const orgStats = {
    totalEmployees: orgEmployees.length,
    activeUsers: orgEmployees.filter(e => e.status === 'Active').length,
    totalClients: userType === 'facility' ? 145 : 89,
    monthlyRevenue: userType === 'facility' ? 485000 : 125000
  };

  const filteredEmployees = orgEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray flex items-center">
            <Shield className="h-8 w-8 mr-3 text-blue-600" />
            Organization Admin
          </h1>
          <p className="text-gray-600 mt-2">Manage {organizationName} employees and settings</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Org Settings
          </Button>
          <Button className="bg-primary-red hover:bg-red-600">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Organization Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{orgStats.totalEmployees}</p>
                <p className="text-gray-600">Total Employees</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{orgStats.activeUsers}</p>
                <p className="text-gray-600">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-accent-gold" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{orgStats.totalClients}</p>
                <p className="text-gray-600">{userType === 'facility' ? 'Residents' : 'Clients'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileBarChart className="h-8 w-8 text-primary-red" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">${orgStats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-gray-600">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="employees">Employee Management</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Employee Directory</CardTitle>
                  <CardDescription>Manage organization employees and their access</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-sky rounded-full flex items-center justify-center text-white font-semibold">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-dark-gray">{employee.name}</h4>
                        <p className="text-sm text-gray-600">{employee.role} • {employee.department}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-xs text-gray-500">
                            <Mail className="h-3 w-3 mr-1" />
                            {employee.email}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Phone className="h-3 w-3 mr-1" />
                            {employee.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <Badge className={employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {employee.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">Last: {employee.lastLogin}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role & Permission Management</CardTitle>
              <CardDescription>Configure what each role can access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-4">Permission management interface</p>
                <Button>Configure Permissions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Analytics</CardTitle>
              <CardDescription>Performance metrics for your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileBarChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-4">Analytics dashboard for organization performance</p>
                <Button>View Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>Configure organization-wide settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Settings className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-4">Organization configuration settings</p>
                <Button>Manage Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationAdmin;
