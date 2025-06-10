
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, DollarSign, TrendingUp, FileText, Download, Plus, Filter } from 'lucide-react';

const FacilityPayments = () => {
  const recentPayments = [
    { id: 1, resident: 'Mary Johnson', amount: 4850, date: '2024-12-01', status: 'Paid', method: 'Bank Transfer' },
    { id: 2, resident: 'Robert Smith', amount: 5200, date: '2024-12-01', status: 'Paid', method: 'Credit Card' },
    { id: 3, resident: 'Linda Davis', amount: 4750, date: '2024-12-01', status: 'Pending', method: 'Check' },
    { id: 4, resident: 'James Wilson', amount: 5100, date: '2024-11-01', status: 'Paid', method: 'Bank Transfer' },
    { id: 5, resident: 'Patricia Brown', amount: 4900, date: '2024-11-01', status: 'Overdue', method: 'Bank Transfer' }
  ];

  const placementFees = [
    { id: 1, agent: 'Sarah Johnson Agency', resident: 'Mary Johnson', amount: 1455, date: '2024-12-01', status: 'Paid' },
    { id: 2, agent: 'Elite Care Placement', resident: 'Robert Smith', amount: 1560, date: '2024-11-15', status: 'Processing' },
    { id: 3, agent: 'Family First Advisors', resident: 'Linda Davis', amount: 1425, date: '2024-11-30', status: 'Pending' }
  ];

  const monthlyStats = {
    totalRevenue: 128450,
    totalPlacementFees: 4440,
    outstandingBalance: 9650,
    totalResidents: 132
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Payments & Revenue</h1>
          <p className="text-gray-600 mt-2">Track resident payments, placement fees, and financial analytics.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-primary-red hover:bg-red-600">
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
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
                <p className="text-2xl font-bold text-text-dark-gray">${monthlyStats.totalRevenue.toLocaleString()}</p>
                <p className="text-gray-600">Monthly Revenue</p>
                <p className="text-sm text-green-600">+8% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-primary-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">${monthlyStats.totalPlacementFees.toLocaleString()}</p>
                <p className="text-gray-600">Placement Fees</p>
                <p className="text-sm text-primary-sky">3 agents this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">${monthlyStats.outstandingBalance.toLocaleString()}</p>
                <p className="text-gray-600">Outstanding</p>
                <p className="text-sm text-red-600">2 overdue payments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-accent-gold" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{monthlyStats.totalResidents}</p>
                <p className="text-gray-600">Paying Residents</p>
                <p className="text-sm text-accent-gold">97% occupancy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="resident-payments" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resident-payments">Resident Payments</TabsTrigger>
          <TabsTrigger value="placement-fees">Placement Fees</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="resident-payments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Resident Payments</CardTitle>
                  <CardDescription>Monthly rent and fee payments from residents</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-text-dark-gray">{payment.resident}</h4>
                      <p className="text-sm text-gray-600">Payment Date: {payment.date}</p>
                      <p className="text-sm text-gray-600">Method: {payment.method}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-text-dark-gray">${payment.amount.toLocaleString()}</p>
                      <Badge className={
                        payment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="placement-fees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Placement Agent Commissions</CardTitle>
              <CardDescription>Commission payments to placement agents for successful referrals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {placementFees.map((fee) => (
                  <div key={fee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-text-dark-gray">{fee.agent}</h4>
                      <p className="text-sm text-gray-600">Resident: {fee.resident}</p>
                      <p className="text-sm text-gray-600">Placement Date: {fee.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-text-dark-gray">${fee.amount.toLocaleString()}</p>
                      <Badge className={
                        fee.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        fee.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {fee.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>December 2024</span>
                    <span className="font-semibold">$128,450</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>November 2024</span>
                    <span className="font-semibold">$119,200</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>October 2024</span>
                    <span className="font-semibold">$125,800</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Breakdown of payment methods used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Bank Transfer</span>
                    <span className="font-semibold">65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Credit Card</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Check</span>
                    <span className="font-semibold">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacilityPayments;
