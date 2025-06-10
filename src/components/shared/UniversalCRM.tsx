
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserPlus, Search, Filter, Phone, Mail, Calendar, FileText, Edit } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  careNeeds: string[];
  lastContact: string;
  source: string;
  priority: 'High' | 'Medium' | 'Low';
  assignedTo?: string;
}

interface UniversalCRMProps {
  userType: 'healthcare' | 'agent';
  title?: string;
}

const UniversalCRM: React.FC<UniversalCRMProps> = ({ userType, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const sampleClients: Client[] = [
    {
      id: 1,
      name: 'Mary Johnson',
      email: 'mary.johnson@email.com',
      phone: '(555) 123-4567',
      status: 'Active',
      careNeeds: ['Memory Care', 'Medication Management'],
      lastContact: '2024-12-10',
      source: 'Referral',
      priority: 'High'
    },
    {
      id: 2,
      name: 'Robert Smith',
      email: 'robert.smith@email.com',
      phone: '(555) 234-5678',
      status: 'Pending Placement',
      careNeeds: ['Assisted Living', 'Physical Therapy'],
      lastContact: '2024-12-08',
      source: 'Website',
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Linda Davis',
      email: 'linda.davis@email.com',
      phone: '(555) 345-6789',
      status: 'Assessment',
      careNeeds: ['Independent Living', 'Social Activities'],
      lastContact: '2024-12-12',
      source: 'Phone Call',
      priority: 'Low'
    }
  ];

  const statuses = ['All', 'Active', 'Pending Placement', 'Assessment', 'Placed', 'Inactive'];

  const filteredClients = sampleClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending Placement': return 'bg-yellow-100 text-yellow-800';
      case 'Assessment': return 'bg-blue-100 text-blue-800';
      case 'Placed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">
            {title || `${userType === 'healthcare' ? 'Patient' : 'Client'} Management`}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your {userType === 'healthcare' ? 'patients' : 'clients'} and track their care journey.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            Import Contacts
          </Button>
          <Button className="bg-primary-red hover:bg-red-600">
            <UserPlus className="h-4 w-4 mr-2" />
            Add {userType === 'healthcare' ? 'Patient' : 'Client'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{sampleClients.length}</p>
                <p className="text-gray-600">Total {userType === 'healthcare' ? 'Patients' : 'Clients'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">
                  {sampleClients.filter(c => c.status === 'Active').length}
                </p>
                <p className="text-gray-600">Active Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-accent-gold" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">
                  {sampleClients.filter(c => c.priority === 'High').length}
                </p>
                <p className="text-gray-600">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary-red" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">
                  {sampleClients.filter(c => c.status === 'Placed').length}
                </p>
                <p className="text-gray-600">Successfully Placed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-clients" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-clients">All {userType === 'healthcare' ? 'Patients' : 'Clients'}</TabsTrigger>
          <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="follow-ups">Follow-ups</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="all-clients" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{userType === 'healthcare' ? 'Patient' : 'Client'} Directory</CardTitle>
                  <CardDescription>Search and manage your {userType === 'healthcare' ? 'patient' : 'client'} database</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={`Search ${userType === 'healthcare' ? 'patients' : 'clients'}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {filteredClients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-sky rounded-full flex items-center justify-center text-white font-semibold">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-dark-gray">{client.name}</h4>
                        <p className="text-sm text-gray-600">Care Needs: {client.careNeeds.join(', ')}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-xs text-gray-500">
                            <Mail className="h-3 w-3 mr-1" />
                            {client.email}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Phone className="h-3 w-3 mr-1" />
                            {client.phone}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            Last contact: {client.lastContact}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                        <Badge className={`${getPriorityColor(client.priority)} mt-1`}>
                          {client.priority}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent-activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest interactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Mary Johnson placed at Sunrise Senior Living</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">New assessment scheduled for Robert Smith</p>
                    <p className="text-sm text-gray-600">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Follow-up call needed for Linda Davis</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="follow-ups" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Follow-ups</CardTitle>
              <CardDescription>Upcoming tasks and appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Call Mary Johnson</h4>
                    <p className="text-sm text-gray-600">Check on settling in at new facility</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Today, 2:00 PM</p>
                    <Badge className="bg-red-100 text-red-800">High Priority</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Assessment Review - Robert Smith</h4>
                    <p className="text-sm text-gray-600">Review care assessment results</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Tomorrow, 10:00 AM</p>
                    <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Reports</CardTitle>
              <CardDescription>Analytics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">This Month</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>New {userType === 'healthcare' ? 'Patients' : 'Clients'}</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Successful Placements</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Rate</span>
                      <span className="font-medium">62.5%</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Care Types</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Memory Care</span>
                      <span className="font-medium">40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assisted Living</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Independent Living</span>
                      <span className="font-medium">25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UniversalCRM;
