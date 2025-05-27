
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, DollarSign, Calendar, Download, Send, Plus, Filter, TrendingUp } from 'lucide-react';

const InvoicingTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const invoices = [
    {
      id: 'INV-2024-001',
      clientName: 'Mary Johnson',
      facilityName: 'Sunrise Senior Living',
      amount: 1250.00,
      status: 'Paid',
      issueDate: '2024-11-01',
      dueDate: '2024-11-30',
      paidDate: '2024-11-28',
      services: ['Care Assessment', 'Placement Services', 'Follow-up Care'],
      description: 'Monthly placement and care coordination services'
    },
    {
      id: 'INV-2024-002',
      clientName: 'Robert Smith',
      facilityName: 'Golden Years Memory Care',
      amount: 1875.00,
      status: 'Pending',
      issueDate: '2024-12-01',
      dueDate: '2024-12-31',
      paidDate: null,
      services: ['Memory Care Assessment', 'Specialized Placement', 'Family Consultation'],
      description: 'Specialized memory care placement services'
    },
    {
      id: 'INV-2024-003',
      clientName: 'Linda Davis',
      facilityName: 'Peaceful Valley Assisted Living',
      amount: 950.00,
      status: 'Overdue',
      issueDate: '2024-10-01',
      dueDate: '2024-10-31',
      paidDate: null,
      services: ['Initial Assessment', 'Placement Services'],
      description: 'Standard placement services and assessment'
    },
    {
      id: 'INV-2024-004',
      clientName: 'James Wilson',
      facilityName: 'Oakwood Senior Community',
      amount: 750.00,
      status: 'Draft',
      issueDate: '2024-12-12',
      dueDate: '2025-01-12',
      paidDate: null,
      services: ['Consultation', 'Care Planning'],
      description: 'Initial consultation and care planning services'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalRevenue: invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0),
    pendingAmount: invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0),
    overdueAmount: invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0),
    totalInvoices: invoices.length
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Invoicing Tools</h1>
          <p className="text-gray-600 mt-2">Manage invoices, track payments, and generate financial reports.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button className="bg-primary-red hover:bg-red-600">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-gray-600">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">${stats.pendingAmount.toLocaleString()}</p>
                <p className="text-gray-600">Pending Payments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">${stats.overdueAmount.toLocaleString()}</p>
                <p className="text-gray-600">Overdue Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{stats.totalInvoices}</p>
                <p className="text-gray-600">Total Invoices</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Search & Filter Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <div className="space-y-6">
        {filteredInvoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardContent className="p-6">
              <Tabs defaultValue="details" className="w-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-dark-gray">{invoice.id}</h3>
                    <p className="text-gray-600">{invoice.clientName} | {invoice.facilityName}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                    <span className="text-2xl font-bold text-primary-red">
                      ${invoice.amount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Invoice Details</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Invoice Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Issue Date:</span> {invoice.issueDate}</p>
                        <p><span className="font-medium">Due Date:</span> {invoice.dueDate}</p>
                        {invoice.paidDate && (
                          <p><span className="font-medium">Paid Date:</span> {invoice.paidDate}</p>
                        )}
                        <p><span className="font-medium">Amount:</span> ${invoice.amount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Description</h4>
                      <p className="text-sm text-gray-700 bg-secondary-off-white p-3 rounded-lg">
                        {invoice.description}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="services" className="mt-4">
                  <div>
                    <h4 className="font-semibold text-text-dark-gray mb-3">Services Provided</h4>
                    <div className="space-y-2">
                      {invoice.services.map((service, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="text-sm">{service}</span>
                          <Badge variant="outline">
                            ${(invoice.amount / invoice.services.length).toFixed(2)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <Send className="h-4 w-4 mr-2" />
                          Send Reminder
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          Edit Invoice
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-3">Payment Actions</h4>
                      <div className="space-y-2">
                        {invoice.status === 'Draft' && (
                          <Button size="sm" className="w-full bg-primary-sky hover:bg-blue-600">
                            Send Invoice
                          </Button>
                        )}
                        {(invoice.status === 'Pending' || invoice.status === 'Overdue') && (
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                            Mark as Paid
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="w-full">
                          Payment History
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Create Invoice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Quick Create Invoice
          </CardTitle>
          <CardDescription>Generate a new invoice quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mary">Mary Johnson</SelectItem>
                <SelectItem value="robert">Robert Smith</SelectItem>
                <SelectItem value="linda">Linda Davis</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select facility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunrise">Sunrise Senior Living</SelectItem>
                <SelectItem value="golden">Golden Years Memory Care</SelectItem>
                <SelectItem value="peaceful">Peaceful Valley Assisted Living</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Amount ($)" type="number" />
            <Button className="bg-primary-red hover:bg-red-600">
              Create Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicingTools;
