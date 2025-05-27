
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Mail, Phone, Calendar, FileText, DollarSign, Plus, Search, Filter } from 'lucide-react';

const CRM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const contacts = [
    {
      id: 1,
      name: 'Mary Johnson',
      type: 'Client',
      email: 'mary.johnson@email.com',
      phone: '(555) 123-4567',
      status: 'Active',
      lastContact: '2024-12-10',
      nextFollowUp: '2024-12-15',
      careNeeds: 'Assisted Living',
      budget: '$4,000-$6,000',
      notes: 'Daughter is primary decision maker. Prefers facilities near downtown.',
      tags: ['High Priority', 'Family Involved'],
      source: 'Referral'
    },
    {
      id: 2,
      name: 'Dr. Sarah Martinez',
      type: 'Referral Source',
      email: 'sarah.martinez@medicenter.com',
      phone: '(555) 987-6543',
      status: 'Active',
      lastContact: '2024-12-08',
      nextFollowUp: '2024-12-20',
      careNeeds: 'N/A',
      budget: 'N/A',
      notes: 'Geriatrician who regularly refers patients. Send monthly updates.',
      tags: ['VIP', 'Medical Professional'],
      source: 'Professional Network'
    },
    {
      id: 3,
      name: 'Linda Davis',
      type: 'Prospect',
      email: 'linda.davis@email.com',
      phone: '(555) 456-7890',
      status: 'Warm Lead',
      lastContact: '2024-12-05',
      nextFollowUp: '2024-12-18',
      careNeeds: 'Independent Living',
      budget: '$3,000-$4,500',
      notes: 'Recently widowed. Looking for social community. Not urgent.',
      tags: ['Social Focus'],
      source: 'Website Inquiry'
    }
  ];

  const emailTemplates = [
    { id: 1, name: 'Initial Consultation Follow-up', category: 'Follow-up' },
    { id: 2, name: 'Facility Tour Invitation', category: 'Scheduling' },
    { id: 3, name: 'Monthly Referral Source Update', category: 'Professional' },
    { id: 4, name: 'Placement Confirmation', category: 'Completion' }
  ];

  const tasks = [
    { id: 1, description: 'Call Johnson family about tour feedback', due: 'Today 2:00 PM', priority: 'High', contactId: 1 },
    { id: 2, description: 'Send facility options to Davis', due: 'Tomorrow 10:00 AM', priority: 'Medium', contactId: 3 },
    { id: 3, description: 'Monthly check-in with Dr. Martinez', due: 'This week', priority: 'Low', contactId: 2 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Warm Lead':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cold Lead':
        return 'bg-blue-100 text-blue-800';
      case 'Placed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status.toLowerCase().replace(' ', '-') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">CRM - Customer Relationship Management</h1>
          <p className="text-gray-600 mt-2">Manage contacts, track communications, and automate follow-ups.</p>
        </div>
        <Button className="bg-primary-red hover:bg-red-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      <Tabs defaultValue="contacts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="emails">Email Templates</TabsTrigger>
          <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Search & Filter Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search contacts..."
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
                    <SelectItem value="warm-lead">Warm Lead</SelectItem>
                    <SelectItem value="cold-lead">Cold Lead</SelectItem>
                    <SelectItem value="placed">Placed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  Export Contacts
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contacts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredContacts.map((contact) => (
              <Card key={contact.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-text-dark-gray">{contact.name}</h3>
                      <p className="text-gray-600">{contact.type}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(contact.status)}>
                        {contact.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      {contact.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      {contact.phone}
                    </div>
                    {contact.careNeeds !== 'N/A' && (
                      <div className="text-sm">
                        <span className="font-medium">Care Needs:</span> {contact.careNeeds}
                      </div>
                    )}
                    {contact.budget !== 'N/A' && (
                      <div className="text-sm">
                        <span className="font-medium">Budget:</span> {contact.budget}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Notes</h4>
                    <p className="text-sm text-gray-700 bg-secondary-off-white p-2 rounded">
                      {contact.notes}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                    <div>
                      <span className="font-medium">Last Contact:</span> {contact.lastContact}
                    </div>
                    <div>
                      <span className="font-medium">Next Follow-up:</span> {contact.nextFollowUp}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary-sky hover:bg-blue-600">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Task Management
              </CardTitle>
              <CardDescription>Organize and track your follow-up activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-text-dark-gray">{task.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>Due: {task.due}</span>
                        <Badge 
                          variant="outline"
                          className={
                            task.priority === 'High' ? 'border-red-300 text-red-700' :
                            task.priority === 'Medium' ? 'border-yellow-300 text-yellow-700' :
                            'border-green-300 text-green-700'
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Complete
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-primary-sky hover:bg-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Add New Task
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emails" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email Templates
              </CardTitle>
              <CardDescription>Pre-written templates for common communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-text-dark-gray">{template.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{template.category}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                      <Button size="sm" className="bg-primary-sky hover:bg-blue-600">
                        Use Template
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-accent-gold hover:bg-yellow-500 text-text-dark-gray">
                <Plus className="h-4 w-4 mr-2" />
                Create New Template
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoicing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Invoicing & Commission Tracking
              </CardTitle>
              <CardDescription>Generate invoices and track commission payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-dark-gray mb-1">$8,750</div>
                  <div className="text-sm text-gray-600">This Month's Commission</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-dark-gray mb-1">$2,150</div>
                  <div className="text-sm text-gray-600">Pending Payments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-dark-gray mb-1">7</div>
                  <div className="text-sm text-gray-600">Invoices Generated</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-text-dark-gray">Recent Invoices</h4>
                  <Button size="sm" className="bg-primary-red hover:bg-red-600">
                    <Plus className="h-4 w-4 mr-2" />
                    New Invoice
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Invoice #INV-001 - Mary Johnson</p>
                      <p className="text-sm text-gray-600">Placement commission</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary-red">$1,250</p>
                      <Badge className="bg-green-100 text-green-800">Paid</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Invoice #INV-002 - Robert Smith</p>
                      <p className="text-sm text-gray-600">Assessment and placement</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary-red">$1,875</p>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
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

export default CRM;
