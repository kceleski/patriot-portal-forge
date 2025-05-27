
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Send, Clock, CheckCircle, AlertCircle, Search, Plus, Filter } from 'lucide-react';

const ReferralManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const referrals = [
    {
      id: 'REF-001',
      clientName: 'Mary Johnson',
      facilityName: 'Sunrise Senior Living',
      status: 'Pending Review',
      priority: 'High',
      submittedDate: '2024-12-10',
      lastUpdate: '2024-12-12',
      careLevel: 'Assisted Living',
      estimatedMoveIn: '2025-01-15',
      referralSource: 'Family',
      notes: 'Client prefers private room with garden view.',
      documents: ['Medical Records', 'Insurance Info', 'Care Assessment']
    },
    {
      id: 'REF-002',
      clientName: 'Robert Smith',
      facilityName: 'Golden Years Memory Care',
      status: 'Approved',
      priority: 'Medium',
      submittedDate: '2024-12-08',
      lastUpdate: '2024-12-11',
      careLevel: 'Memory Care',
      estimatedMoveIn: '2024-12-20',
      referralSource: 'Hospital Discharge',
      notes: 'Requires specialized dementia care program.',
      documents: ['Medical Records', 'Neurological Assessment', 'Family Meeting Notes']
    },
    {
      id: 'REF-003',
      clientName: 'Linda Davis',
      facilityName: 'Peaceful Valley Assisted Living',
      status: 'Under Review',
      priority: 'Low',
      submittedDate: '2024-12-05',
      lastUpdate: '2024-12-10',
      careLevel: 'Independent Living',
      estimatedMoveIn: '2025-02-01',
      referralSource: 'Self-Referral',
      notes: 'Healthy and independent, seeking social community.',
      documents: ['Health Screening', 'Financial Verification']
    },
    {
      id: 'REF-004',
      clientName: 'James Wilson',
      facilityName: 'Oakwood Senior Community',
      status: 'Rejected',
      priority: 'Medium',
      submittedDate: '2024-12-01',
      lastUpdate: '2024-12-03',
      careLevel: 'Skilled Nursing',
      estimatedMoveIn: 'N/A',
      referralSource: 'Physician',
      notes: 'Care level exceeds facility capabilities.',
      documents: ['Medical Records', 'Physician Notes']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.facilityName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || referral.status.toLowerCase().replace(' ', '-') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: referrals.length,
    pending: referrals.filter(r => r.status === 'Pending Review').length,
    approved: referrals.filter(r => r.status === 'Approved').length,
    rejected: referrals.filter(r => r.status === 'Rejected').length
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Referral Management System</h1>
          <p className="text-gray-600 mt-2">Track and manage client referrals to care facilities.</p>
        </div>
        <Button className="bg-primary-red hover:bg-red-600">
          <Plus className="h-4 w-4 mr-2" />
          New Referral
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{stats.total}</p>
                <p className="text-gray-600">Total Referrals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{stats.pending}</p>
                <p className="text-gray-600">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{stats.approved}</p>
                <p className="text-gray-600">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{stats.rejected}</p>
                <p className="text-gray-600">Rejected</p>
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
            Search & Filter Referrals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by client or facility name..."
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
                <SelectItem value="pending-review">Pending Review</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referrals List */}
      <div className="space-y-6">
        {filteredReferrals.map((referral) => (
          <Card key={referral.id}>
            <CardContent className="p-6">
              <Tabs defaultValue="overview" className="w-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-dark-gray">{referral.clientName}</h3>
                    <p className="text-gray-600">Referral ID: {referral.id} | {referral.facilityName}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(referral.status)}>
                      {referral.status}
                    </Badge>
                    <Badge className={getPriorityColor(referral.priority)}>
                      {referral.priority} Priority
                    </Badge>
                  </div>
                </div>

                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="communications">Communications</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Referral Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Care Level:</span> {referral.careLevel}</p>
                        <p><span className="font-medium">Submitted:</span> {referral.submittedDate}</p>
                        <p><span className="font-medium">Last Update:</span> {referral.lastUpdate}</p>
                        <p><span className="font-medium">Source:</span> {referral.referralSource}</p>
                        <p><span className="font-medium">Est. Move-in:</span> {referral.estimatedMoveIn}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Notes</h4>
                      <p className="text-sm text-gray-700 bg-secondary-off-white p-3 rounded-lg">
                        {referral.notes}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Timeline</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-primary-sky rounded-full mr-3"></div>
                          <div>
                            <p className="text-sm font-medium">Referral Submitted</p>
                            <p className="text-xs text-gray-500">{referral.submittedDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-accent-gold rounded-full mr-3"></div>
                          <div>
                            <p className="text-sm font-medium">Last Status Update</p>
                            <p className="text-xs text-gray-500">{referral.lastUpdate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark-gray mb-2">Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Update Status
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          Send Follow-up
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          Schedule Meeting
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-4">
                  <div>
                    <h4 className="font-semibold text-text-dark-gray mb-3">Attached Documents</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {referral.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{doc}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Document
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="communications" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-text-dark-gray">Communication Log</h4>
                      <Button size="sm" className="bg-primary-sky hover:bg-blue-600">
                        <Send className="h-4 w-4 mr-2" />
                        New Message
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium">Follow-up call with facility</p>
                          <span className="text-xs text-gray-500">Dec 12, 2024</span>
                        </div>
                        <p className="text-sm text-gray-700">Discussed care requirements and availability. Facility confirmed they can accommodate client needs.</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium">Initial referral sent</p>
                          <span className="text-xs text-gray-500">Dec 10, 2024</span>
                        </div>
                        <p className="text-sm text-gray-700">Referral package submitted with all required documentation.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReferralManagement;
