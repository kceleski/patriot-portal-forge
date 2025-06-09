
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search, Filter, UserPlus, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  careNeeds: string[];
  budget: string;
  location: string;
  dateAdded: string;
  lastContact: string;
}

const AllClients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock client data
  const mockClients: Client[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      status: 'Active',
      careNeeds: ['Assisted Living', 'Memory Care'],
      budget: '$3,500 - $5,000',
      location: 'Los Angeles, CA',
      dateAdded: '2024-01-15',
      lastContact: '2024-01-20'
    },
    {
      id: '2',
      firstName: 'Mary',
      lastName: 'Johnson',
      email: 'mary.johnson@email.com',
      phone: '(555) 987-6543',
      status: 'Placed',
      careNeeds: ['Skilled Nursing'],
      budget: '$5,000 - $7,500',
      location: 'Beverly Hills, CA',
      dateAdded: '2023-12-10',
      lastContact: '2024-01-18'
    },
    {
      id: '3',
      firstName: 'Robert',
      lastName: 'Wilson',
      email: 'robert.wilson@email.com',
      phone: '(555) 456-7890',
      status: 'Prospect',
      careNeeds: ['Independent Living'],
      budget: '$2,000 - $3,500',
      location: 'Santa Monica, CA',
      dateAdded: '2024-01-22',
      lastContact: '2024-01-22'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Placed':
        return 'bg-blue-100 text-blue-800';
      case 'Prospect':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = 
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-brand-navy mb-2">All Clients</h1>
            <p className="text-gray-600 text-lg">Manage your client relationships and track their care journey</p>
          </div>
          <Button 
            onClick={() => navigate('/dashboard/agent/new-client')}
            className="bg-brand-sky hover:bg-blue-600"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Client
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Search & Filter Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="placed">Placed</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                Export List
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Client Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-brand-sky" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Clients</p>
                  <p className="text-2xl font-bold text-gray-900">{mockClients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-green-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockClients.filter(c => c.status === 'Active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Placed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockClients.filter(c => c.status === 'Placed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-yellow-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Prospects</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockClients.filter(c => c.status === 'Prospect').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clients List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {client.firstName} {client.lastName}
                    </h3>
                    <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href={`mailto:${client.email}`} className="hover:text-brand-sky">
                      {client.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href={`tel:${client.phone}`} className="hover:text-brand-sky">
                      {client.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {client.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Added: {new Date(client.dateAdded).toLocaleDateString()}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Care Needs:</p>
                  <div className="flex flex-wrap gap-1">
                    {client.careNeeds.map((need, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Budget:</span> {client.budget}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1 bg-brand-sky hover:bg-blue-600">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria.' 
                  : 'Get started by adding your first client.'}
              </p>
              <Button 
                onClick={() => navigate('/dashboard/agent/new-client')}
                className="bg-brand-sky hover:bg-blue-600"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Client
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AllClients;
