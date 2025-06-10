
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Download, Search, DollarSign, Calendar, Send } from 'lucide-react';

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  dueDate: string;
  createdDate: string;
  services: string[];
}

interface UniversalInvoicingProps {
  userType: 'healthcare' | 'agent';
  title?: string;
}

const UniversalInvoicing: React.FC<UniversalInvoicingProps> = ({ userType, title }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const sampleInvoices: Invoice[] = [
    {
      id: '1',
      number: 'INV-2024-001',
      client: 'Mary Johnson',
      amount: 850,
      status: 'Paid',
      dueDate: '2024-12-01',
      createdDate: '2024-11-15',
      services: userType === 'healthcare' ? ['Care Assessment', 'Referral Services'] : ['Placement Services', 'Consultation']
    },
    {
      id: '2',
      number: 'INV-2024-002',
      client: 'Robert Smith',
      amount: 1200,
      status: 'Sent',
      dueDate: '2024-12-15',
      createdDate: '2024-11-30',
      services: userType === 'healthcare' ? ['Initial Assessment', 'Care Plan Development'] : ['Family Consultation', 'Facility Matching']
    },
    {
      id: '3',
      number: 'INV-2024-003',
      client: 'Linda Davis',
      amount: 650,
      status: 'Overdue',
      dueDate: '2024-11-30',
      createdDate: '2024-11-01',
      services: userType === 'healthcare' ? ['Follow-up Care'] : ['Tour Coordination']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = sampleInvoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingRevenue = sampleInvoices.filter(inv => inv.status === 'Sent').reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = sampleInvoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">
            {title || 'Invoicing & Billing'}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage invoices, track payments, and monitor your revenue.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-primary-red hover:bg-red-600">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">${totalRevenue.toLocaleString()}</p>
                <p className="text-gray-600">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">${pendingRevenue.toLocaleString()}</p>
                <p className="text-gray-600">Pending Payment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">${overdueAmount.toLocaleString()}</p>
                <p className="text-gray-600">Overdue Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Send className="h-8 w-8 text-accent-gold" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{sampleInvoices.length}</p>
                <p className="text-gray-600">Total Invoices</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-invoices" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-invoices">All Invoices</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="all-invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Invoice Management</CardTitle>
                  <CardDescription>Track and manage all your invoices</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-sky rounded-full flex items-center justify-center text-white font-semibold">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-dark-gray">{invoice.number}</h4>
                        <p className="text-sm text-gray-600">Client: {invoice.client}</p>
                        <p className="text-sm text-gray-600">Services: {invoice.services.join(', ')}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">Created: {invoice.createdDate}</span>
                          <span className="text-xs text-gray-500">Due: {invoice.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-text-dark-gray">${invoice.amount.toLocaleString()}</p>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        {invoice.status === 'Draft' && (
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Draft Invoices</CardTitle>
              <CardDescription>Invoices that haven't been sent yet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No draft invoices found</p>
                <Button className="mt-4">Create New Invoice</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Payments</CardTitle>
              <CardDescription>Invoices awaiting payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleInvoices.filter(inv => inv.status === 'Sent' || inv.status === 'Overdue').map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-text-dark-gray">{invoice.number}</h4>
                      <p className="text-sm text-gray-600">{invoice.client}</p>
                      <p className="text-sm text-gray-600">Due: {invoice.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-text-dark-gray">${invoice.amount.toLocaleString()}</p>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                      {invoice.status === 'Overdue' && (
                        <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                          Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue breakdown by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>December 2024</span>
                    <span className="font-semibold">${totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>November 2024</span>
                    <span className="font-semibold">$2,150</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>October 2024</span>
                    <span className="font-semibold">$1,890</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Breakdown</CardTitle>
                <CardDescription>Revenue by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userType === 'healthcare' ? (
                    <>
                      <div className="flex justify-between">
                        <span>Care Assessments</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Referral Services</span>
                        <span className="font-semibold">30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Care Plan Development</span>
                        <span className="font-semibold">25%</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span>Placement Services</span>
                        <span className="font-semibold">60%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Consultation</span>
                        <span className="font-semibold">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tour Coordination</span>
                        <span className="font-semibold">15%</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UniversalInvoicing;
