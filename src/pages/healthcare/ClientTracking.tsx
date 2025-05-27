
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Search, Plus, Filter, Calendar, MapPin, Phone, Mail } from 'lucide-react';

const ClientTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const clients = [
    {
      id: 1,
      name: 'Mary Johnson',
      age: 78,
      status: 'Active',
      facility: 'Sunrise Senior Living',
      careLevel: 'Assisted Living',
      admissionDate: '2024-01-15',
      lastAssessment: '2024-11-15',
      nextReview: '2025-02-15',
      phone: '(555) 123-4567',
      email: 'mary.johnson@email.com',
      emergencyContact: 'John Johnson (Son)',
      emergencyPhone: '(555) 987-6543',
      medicalConditions: ['Diabetes', 'Hypertension'],
      medications: ['Metformin', 'Lisinopril'],
      notes: 'Patient is adjusting well to facility. Family visits regularly.'
    },
    {
      id: 2,
      name: 'Robert Smith',
      age: 82,
      status: 'Pending Placement',
      facility: 'N/A',
      careLevel: 'Memory Care',
      admissionDate: null,
      lastAssessment: '2024-12-10',
      nextReview: '2024-12-20',
      phone: '(555) 234-5678',
      email: 'robert.smith@email.com',
      emergencyContact: 'Sarah Smith (Daughter)',
      emergencyPhone: '(555) 876-5432',
      medicalConditions: ['Alzheimer\'s Disease', 'Osteoarthritis'],
      medications: ['Donepezil', 'Ibuprofen'],
      notes: 'Requires specialized memory care facility. Family prefers location near downtown.'
    },
    {
      id: 3,
      name: 'Linda Davis',
      age: 75,
      status: 'Assessment',
      facility: 'N/A',
      careLevel: 'Independent Living',
      admissionDate: null,
      lastAssessment: '2024-12-12',
      nextReview: '2024-12-19',
      phone: '(555) 345-6789',
      email: 'linda.davis@email.com',
      emergencyContact: 'Michael Davis (Son)',
      emergencyPhone: '(555) 765-4321',
      medicalConditions: ['Mild Cognitive Impairment'],
      medications: ['Vitamin D', 'Omega-3'],
      notes: 'Recently widowed, looking for social engagement opportunities.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Assessment':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending Placement':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status.toLowerCase().replace(' ', '-') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Client Tracking Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor and manage your client portfolio.</p>
        </div>
        <Button className="bg-primary-red hover:bg-red-600">
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search clients by name..."
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
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="pending-placement">Pending Placement</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id}>
            <CardContent className="p-6">
              <Tabs defaultValue="overview" className="w-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-dark-gray">{client.name}</h3>
                    <p className="text-gray-600">Age: {client.age} | Care Level: {client.careLevel}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="medical">Medical</TabsTrigger>
                  <TabsTrigger value="placement">Placement</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Current Status</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Facility:</span> {client.facility || 'Not placed'}</p>
                        <p><span className="font-medium">Last Assessment:</span> {client.lastAssessment}</p>
                        <p><span className="font-medium">Next Review:</span> {client.nextReview}</p>
                        {client.admissionDate && (
                          <p><span className="font-medium">Admission Date:</span> {client.admissionDate}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Notes</h4>
                      <p className="text-sm text-gray-700 bg-secondary-off-white p-3 rounded-lg">
                        {client.notes}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="medical" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Medical Conditions</h4>
                      <div className="space-y-1">
                        {client.medicalConditions.map((condition, index) => (
                          <Badge key={index} variant="outline" className="mr-1 mb-1">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Current Medications</h4>
                      <div className="space-y-1">
                        {client.medications.map((medication, index) => (
                          <Badge key={index} variant="secondary" className="mr-1 mb-1">
                            {medication}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="placement" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Placement Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Preferred Care Level:</span> {client.careLevel}</p>
                        <p><span className="font-medium">Current Facility:</span> {client.facility || 'None'}</p>
                        {client.status === 'Pending Placement' && (
                          <Button className="mt-2 bg-primary-sky hover:bg-blue-600" size="sm">
                            View Recommended Facilities
                          </Button>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Timeline</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-primary-sky rounded-full mr-3"></div>
                          <span>Assessment completed: {client.lastAssessment}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-accent-gold rounded-full mr-3"></div>
                          <span>Next review: {client.nextReview}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Client Contact</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          {client.phone}
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          {client.email}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Emergency Contact</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Name:</span> {client.emergencyContact}</p>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          {client.emergencyPhone}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-dark-gray mb-2">No Clients Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search criteria.' 
                : 'Start by adding your first client to the system.'
              }
            </p>
            <Button className="bg-primary-red hover:bg-red-600">
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientTracking;
