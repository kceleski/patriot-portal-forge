
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Search, Filter, UserPlus, Phone, Mail, MapPin, Calendar, Eye, Edit, Trash2, MessageSquare, Star, DollarSign, Clock, Download } from 'lucide-react';
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
  urgency: string;
  facility: string;
  notes: string;
  referralSource: string;
}

const AllClients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [sortBy, setSortBy] = useState('lastContact');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock client data with more comprehensive information
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
      lastContact: '2024-01-20',
      urgency: 'medium',
      facility: 'Golden Years Memory Care',
      notes: 'Family is looking for a facility close to their home. Prefers private room.',
      referralSource: 'Dr. Martinez'
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
      lastContact: '2024-01-18',
      urgency: 'low',
      facility: 'Sunrise Senior Living',
      notes: 'Successfully placed. Very satisfied with services.',
      referralSource: 'Hospital Social Worker'
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
      lastContact: '2024-01-22',
      urgency: 'high',
      facility: 'Evaluating options',
      notes: 'Initial consultation completed. Needs immediate placement.',
      referralSource: 'Family Referral'
    },
    {
      id: '4',
      firstName: 'Linda',
      lastName: 'Davis',
      email: 'linda.davis@email.com',
      phone: '(555) 789-0123',
      status: 'Active',
      careNeeds: ['Assisted Living', 'Physical Therapy'],
      budget: '$4,000 - $6,000',
      location: 'Pasadena, CA',
      dateAdded: '2024-01-10',
      lastContact: '2024-01-19',
      urgency: 'high',
      facility: 'Multiple options under review',
      notes: 'Toured 3 facilities. Decision expected next week.',
      referralSource: 'Online Search'
    },
    {
      id: '5',
      firstName: 'James',
      lastName: 'Brown',
      email: 'james.brown@email.com',
      phone: '(555) 345-6789',
      status: 'Inactive',
      careNeeds: ['Memory Care', 'Medication Management'],
      budget: '$3,000 - $4,500',
      location: 'Long Beach, CA',
      dateAdded: '2023-11-15',
      lastContact: '2023-12-20',
      urgency: 'low',
      facility: 'N/A',
      notes: 'Family decided to pursue home care instead.',
      referralSource: 'Healthcare Provider'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Placed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Prospect':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = 
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || client.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesUrgency = urgencyFilter === 'all' || client.urgency.toLowerCase() === urgencyFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesUrgency;
  }).sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'name':
        aValue = `${a.firstName} ${a.lastName}`;
        bValue = `${b.firstName} ${b.lastName}`;
        break;
      case 'lastContact':
        aValue = new Date(a.lastContact);
        bValue = new Date(b.lastContact);
        break;
      case 'dateAdded':
        aValue = new Date(a.dateAdded);
        bValue = new Date(b.dateAdded);
        break;
      default:
        return 0;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };

  const handleAddNote = () => {
    // In a real app, this would update the client's notes
    console.log('Adding note:', newNote);
    setNewNote('');
    setShowAddNote(false);
  };

  const exportClients = () => {
    // In a real app, this would export the client data
    console.log('Exporting clients...');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-brand-navy mb-2">All Clients</h1>
            <p className="text-gray-600 text-lg">Manage your client relationships and track their care journey</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={exportClients}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              onClick={() => navigate('/dashboard/agent/new-client')}
              className="bg-brand-sky hover:bg-blue-600"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Search & Filter Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="lastContact">Last Contact</SelectItem>
                  <SelectItem value="dateAdded">Date Added</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="asc">Ascending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Client Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-red-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockClients.filter(c => c.urgency === 'high').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Clients List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleClientClick(client)}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {client.firstName} {client.lastName}
                    </h3>
                    <div className="flex space-x-2 mt-2">
                      <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                      <Badge className={getUrgencyColor(client.urgency)}>{client.urgency}</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle edit
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <a 
                      href={`mailto:${client.email}`} 
                      className="hover:text-brand-sky"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {client.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <a 
                      href={`tel:${client.phone}`} 
                      className="hover:text-brand-sky"
                      onClick={(e) => e.stopPropagation()}
                    >
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
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    Last contact: {new Date(client.lastContact).toLocaleDateString()}
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
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Facility:</span> {client.facility}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClientClick(client);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-brand-sky hover:bg-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle contact
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
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
                {searchTerm || statusFilter !== 'all' || urgencyFilter !== 'all'
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

        {/* Client Details Modal */}
        <Dialog open={showClientDetails} onOpenChange={setShowClientDetails}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedClient && `${selectedClient.firstName} ${selectedClient.lastName}`}
              </DialogTitle>
              <DialogDescription>
                Client details and interaction history
              </DialogDescription>
            </DialogHeader>
            
            {selectedClient && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Contact Information</h4>
                  <div className="space-y-2 mb-6">
                    <p><span className="font-medium">Email:</span> {selectedClient.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedClient.phone}</p>
                    <p><span className="font-medium">Location:</span> {selectedClient.location}</p>
                    <p><span className="font-medium">Referral Source:</span> {selectedClient.referralSource}</p>
                  </div>

                  <h4 className="font-semibold mb-3">Care Requirements</h4>
                  <div className="space-y-2 mb-6">
                    <p><span className="font-medium">Budget:</span> {selectedClient.budget}</p>
                    <p><span className="font-medium">Care Needs:</span></p>
                    <div className="flex flex-wrap gap-1">
                      {selectedClient.careNeeds.map((need, index) => (
                        <Badge key={index} variant="secondary">{need}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Status & Progress</h4>
                  <div className="space-y-2 mb-6">
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(selectedClient.status)}>
                        {selectedClient.status}
                      </Badge>
                      <Badge className={getUrgencyColor(selectedClient.urgency)}>
                        {selectedClient.urgency} priority
                      </Badge>
                    </div>
                    <p><span className="font-medium">Current Facility:</span> {selectedClient.facility}</p>
                    <p><span className="font-medium">Date Added:</span> {new Date(selectedClient.dateAdded).toLocaleDateString()}</p>
                    <p><span className="font-medium">Last Contact:</span> {new Date(selectedClient.lastContact).toLocaleDateString()}</p>
                  </div>

                  <h4 className="font-semibold mb-3">Notes</h4>
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="text-sm">{selectedClient.notes}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowAddNote(true)}
                    className="w-full"
                  >
                    Add Note
                  </Button>
                </div>
              </div>
            )}

            <DialogFooter className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowClientDetails(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setShowClientDetails(false);
                // Navigate to edit client page
              }}>
                Edit Client
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Note Modal */}
        <Dialog open={showAddNote} onOpenChange={setShowAddNote}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Note</DialogTitle>
              <DialogDescription>
                Add a note for {selectedClient && `${selectedClient.firstName} ${selectedClient.lastName}`}
              </DialogDescription>
            </DialogHeader>
            <Textarea
              placeholder="Enter your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={4}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddNote(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNote}>
                Add Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AllClients;
