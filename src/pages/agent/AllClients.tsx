
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Filter, Users, Phone, Mail, Calendar, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllClients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const clients = [
    { 
      id: 1, 
      name: 'Mary Johnson', 
      email: 'mary.johnson@email.com',
      phone: '(555) 123-4567',
      status: 'Active', 
      facility: 'Sunrise Senior Living', 
      lastContact: '2 days ago',
      careType: 'Assisted Living',
      budget: '$4,000 - $6,000'
    },
    { 
      id: 2, 
      name: 'Robert Smith', 
      email: 'robert.smith@email.com',
      phone: '(555) 987-6543',
      status: 'Pending Placement', 
      facility: 'N/A', 
      lastContact: '1 day ago',
      careType: 'Memory Care',
      budget: '$6,000 - $8,000'
    },
    { 
      id: 3, 
      name: 'Linda Davis', 
      email: 'linda.davis@email.com',
      phone: '(555) 456-7890',
      status: 'Assessment', 
      facility: 'N/A', 
      lastContact: '3 hours ago',
      careType: 'Skilled Nursing',
      budget: '$8,000+'
    },
    { 
      id: 4, 
      name: 'James Wilson', 
      email: 'james.wilson@email.com',
      phone: '(555) 234-5678',
      status: 'Contract Negotiation', 
      facility: 'Peaceful Valley AL', 
      lastContact: '1 week ago',
      careType: 'Assisted Living',
      budget: '$3,500 - $5,200'
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate('/dashboard/agent')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-text-dark-gray">All Clients</h1>
          <p className="text-gray-600">Manage your client pipeline and track placement progress</p>
        </div>
        <Button 
          onClick={() => navigate('/dashboard/agent/new-client')}
          className="bg-primary-red hover:bg-red-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending Placement">Pending Placement</SelectItem>
                <SelectItem value="Assessment">Assessment</SelectItem>
                <SelectItem value="Contract Negotiation">Contract Negotiation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Client List */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-text-dark-gray">{client.name}</h3>
                    <Badge 
                      variant="outline"
                      className={
                        client.status === 'Active' ? 'border-green-300 text-green-700 bg-green-50' :
                        client.status === 'Assessment' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                        client.status === 'Pending Placement' ? 'border-orange-300 text-orange-700 bg-orange-50' :
                        'border-blue-300 text-blue-700 bg-blue-50'
                      }
                    >
                      {client.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Care Type:</strong> {client.careType}</p>
                      <p><strong>Budget:</strong> {client.budget}</p>
                    </div>
                    <div>
                      <p><strong>Current Facility:</strong> {client.facility}</p>
                      <p><strong>Last Contact:</strong> {client.lastContact}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Mail className="h-4 w-4" />
                        <a 
                          href={`mailto:${client.email}`}
                          className="text-primary-sky hover:underline"
                        >
                          {client.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <a 
                          href={`tel:${client.phone}`}
                          className="text-primary-sky hover:underline"
                        >
                          {client.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                  <Button size="sm" className="bg-primary-sky hover:bg-blue-600">
                    Update Status
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No clients found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'No clients match your current filters.' 
                : 'Start by adding your first client to begin tracking placements.'
              }
            </p>
            <Button 
              onClick={() => navigate('/dashboard/agent/new-client')}
              className="bg-primary-red hover:bg-red-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AllClients;
