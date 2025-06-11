
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, DollarSign, TrendingUp, Calendar, Phone, Mail, Clock, CheckCircle, Search, Filter, Plus, Eye, Edit, MapPin, Star } from 'lucide-react';
import { ReportGeneratorModal } from '@/components/agent/ReportGeneratorModal';
import { useNavigate } from 'react-router-dom';

const AgentDashboard = () => {
  const [showReportModal, setShowReportModal] = useState('active');
  const [showQuickAddModal, setShowQuickAddModal] = useState('active');
  const [showTaskModal, setShowTaskModal] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();

  const recentActivity = [
    { id: 1, type: 'placement', content: 'Successful placement: Mary Johnson at Sunrise Senior Living', time: '2 hours ago', value: '$1,250', client: 'Mary Johnson', facility: 'Sunrise Senior Living' },
    { id: 2, type: 'call', content: 'Follow-up call with Smith family', time: '4 hours ago', value: null, client: 'Robert Smith', facility: null },
    { id: 3, type: 'commission', content: 'Commission payment received', time: '1 day ago', value: '$3,200', client: 'Linda Davis', facility: 'Golden Years' },
    { id: 4, type: 'referral', content: 'New referral received from Dr. Martinez', time: '2 days ago', value: null, client: 'James Wilson', facility: null },
    { id: 5, type: 'tour', content: 'Facility tour scheduled for Thompson family', time: '3 days ago', value: null, client: 'Thompson Family', facility: 'Peaceful Valley AL' }
  ];

  const upcomingTasks = [
    { id: 1, task: 'Follow up with Johnson family about move-in date', priority: 'high', due: 'Today 2:00 PM', client: 'Johnson Family', type: 'follow-up' },
    { id: 2, task: 'Schedule facility tour for Davis family', priority: 'medium', due: 'Tomorrow 10:00 AM', client: 'Davis Family', type: 'tour' },
    { id: 3, task: 'Submit monthly commission report', priority: 'low', due: 'This week', client: null, type: 'admin' },
    { id: 4, task: 'Review intake form for new client', priority: 'high', due: 'Today 4:00 PM', client: 'Wilson Family', type: 'review' },
    { id: 5, task: 'Call back facility administrator', priority: 'medium', due: 'Tomorrow 2:00 PM', client: null, type: 'facility' }
  ];

  const activeClients = [
    { 
      id: 1, 
      name: 'Robert Smith', 
      stage: 'Assessment', 
      facility: 'Golden Years Memory Care', 
      lastContact: '1 day ago',
      phone: '(555) 123-4567',
      email: 'robert.smith@email.com',
      budget: '$3,500-$5,000',
      careNeeds: ['Memory Care', 'Medication Management'],
      urgency: 'medium'
    },
    { 
      id: 2, 
      name: 'Linda Davis', 
      stage: 'Facility Tours', 
      facility: 'Multiple options', 
      lastContact: '2 days ago',
      phone: '(555) 987-6543',
      email: 'linda.davis@email.com',
      budget: '$4,000-$6,000',
      careNeeds: ['Assisted Living', 'Physical Therapy'],
      urgency: 'high'
    },
    { 
      id: 3, 
      name: 'James Wilson', 
      stage: 'Contract Negotiation', 
      facility: 'Peaceful Valley AL', 
      lastContact: '3 hours ago',
      phone: '(555) 456-7890',
      email: 'james.wilson@email.com',
      budget: '$2,500-$4,000',
      careNeeds: ['Independent Living', 'Social Activities'],
      urgency: 'low'
    }
  ];

  const topFacilities = [
    { name: 'Sunrise Senior Living', placements: 15, commission: 18750, rating: 4.8, contact: 'Sarah Johnson' },
    { name: 'Golden Years Memory Care', placements: 12, commission: 16200, rating: 4.6, contact: 'Mike Rodriguez' },
    { name: 'Peaceful Valley AL', placements: 10, commission: 12500, rating: 4.7, contact: 'Lisa Chen' },
    { name: 'Oakwood Senior Community', placements: 8, commission: 9600, rating: 4.5, contact: 'David Brown' }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-300 bg-red-50 text-red-700';
      case 'medium': return 'border-yellow-300 bg-yellow-50 text-yellow-700';
      case 'low': return 'border-green-300 bg-green-50 text-green-700';
      default: return 'border-gray-300 bg-gray-50 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 text-red-700 bg-red-50';
      case 'medium': return 'border-yellow-200 text-yellow-700 bg-yellow-50';
      case 'low': return 'border-green-200 text-green-700 bg-green-50';
      default: return 'border-gray-200 text-gray-700 bg-gray-50';
    }
  };

  const filteredClients = activeClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'all' || client.stage.toLowerCase() === filterStatus.toLowerCase())
  );

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Placement Agent Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your placements, commissions, and client pipeline.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setShowReportModal(true)}>
            Generate Report
          </Button>
          <Button variant="outline" onClick={() => setShowQuickAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
          <Button 
            className="bg-primary-red hover:bg-red-600 text-white"
            onClick={() => navigate('/dashboard/agent/new-client')}
          >
            Add New Client
          </Button>
        </div>
      </div>

      {/* Enhanced Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary-sky" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-text-dark-gray">18</p>
                  <p className="text-gray-600">Active Clients</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium">+3 this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-text-dark-gray">7</p>
                  <p className="text-gray-600">Placements This Month</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium">Goal: 10</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-accent-gold" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-text-dark-gray">$8,750</p>
                  <p className="text-gray-600">Monthly Commission</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium">+12% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-primary-red" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-text-dark-gray">92%</p>
                  <p className="text-gray-600">Placement Rate</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium">Above target</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Active Clients Pipeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Active Client Pipeline
                </CardTitle>
                <CardDescription>Clients currently in the placement process</CardDescription>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search clients..." 
                    className="pl-10 w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                    <SelectItem value="facility tours">Tours</SelectItem>
                    <SelectItem value="contract negotiation">Contracts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <div key={client.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-text-dark-gray text-lg">{client.name}</h4>
                        <Badge 
                          variant="outline"
                          className={getUrgencyColor(client.urgency)}
                        >
                          {client.urgency} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{client.facility}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {client.careNeeds.map((need, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {need}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {client.phone}
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {client.email}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {client.budget}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge 
                        variant="outline"
                        className={
                          client.stage === 'Assessment' ? 'border-yellow-300 text-yellow-700' :
                          client.stage === 'Facility Tours' ? 'border-blue-300 text-blue-700' :
                          'border-green-300 text-green-700'
                        }
                      >
                        {client.stage}
                      </Badge>
                      <p className="text-xs text-gray-500">Last contact: {client.lastContact}</p>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button 
                variant="outline" 
                className="flex-1 mr-2"
                onClick={() => navigate('/dashboard/agent/new-client')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Client
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 ml-2"
                onClick={() => navigate('/dashboard/agent/all-clients')}
              >
                View All Clients
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Upcoming Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Upcoming Tasks
                </CardTitle>
                <CardDescription>Priority items for today and this week</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowTaskModal(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium text-text-dark-gray leading-tight">{task.task}</p>
                    <div className="flex items-center space-x-1">
                      {task.priority === 'high' && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                      {task.priority === 'medium' && <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>}
                      {task.priority === 'low' && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                    </div>
                  </div>
                  {task.client && (
                    <p className="text-xs text-gray-600 mb-2">Client: {task.client}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={getPriorityColor(task.priority)}
                    >
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-gray-500">{task.due}</span>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      Complete
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      Reschedule
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Recent Activity & Timeline
          </CardTitle>
          <CardDescription>Latest updates from your client portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex-shrink-0 mt-1">
                  {activity.type === 'placement' && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {activity.type === 'call' && <Phone className="h-5 w-5 text-primary-sky" />}
                  {activity.type === 'commission' && <DollarSign className="h-5 w-5 text-accent-gold" />}
                  {activity.type === 'referral' && <Mail className="h-5 w-5 text-primary-red" />}
                  {activity.type === 'tour' && <MapPin className="h-5 w-5 text-purple-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-text-dark-gray font-medium">{activity.content}</p>
                  {activity.client && (
                    <p className="text-sm text-gray-600">Client: {activity.client}</p>
                  )}
                  {activity.facility && (
                    <p className="text-sm text-gray-600">Facility: {activity.facility}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-gray-500">{activity.time}</p>
                    {activity.value && (
                      <Badge className="bg-green-100 text-green-800">
                        {activity.value}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View Full Activity Log
          </Button>
        </CardContent>
      </Card>

      {/* Enhanced Top Facilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2" />
            Top Performing Facilities
          </CardTitle>
          <CardDescription>Your most successful facility partnerships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topFacilities.map((facility, index) => (
              <div key={facility.name} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-sky rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark-gray">{facility.name}</h4>
                      <p className="text-sm text-gray-600">Contact: {facility.contact}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{facility.rating}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Placements</p>
                    <p className="font-semibold text-primary-sky">{facility.placements}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Commission</p>
                    <p className="font-semibold text-accent-gold">${facility.commission.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Goals Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Month's Goals</CardTitle>
            <CardDescription>Track your progress against monthly targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Placements</span>
                  <span className="text-gray-600">7/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-primary-sky h-3 rounded-full transition-all duration-300" style={{ width: '70%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">3 more to reach goal</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Commission Goal</span>
                  <span className="text-gray-600">$8,750/$12,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-accent-gold h-3 rounded-full transition-all duration-300" style={{ width: '73%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">$3,250 to reach goal</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">New Clients</span>
                  <span className="text-gray-600">5/8</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-primary-red h-3 rounded-full transition-all duration-300" style={{ width: '62%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">3 more to reach goal</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Frequently used tools and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex flex-col space-y-1" onClick={() => navigate('/dashboard/agent/new-client')}>
                <Plus className="h-5 w-5" />
                <span className="text-xs">New Client</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col space-y-1" onClick={() => navigate('/dashboard/agent/facility-map')}>
                <MapPin className="h-5 w-5" />
                <span className="text-xs">Find Facilities</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col space-y-1" onClick={() => setShowReportModal(true)}>
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs">Generate Report</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col space-y-1" onClick={() => navigate('/dashboard/agent/inbox')}>
                <Mail className="h-5 w-5" />
                <span className="text-xs">Send Email</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col space-y-1" onClick={() => navigate('/dashboard/calendar')}>
                <Calendar className="h-5 w-5" />
                <span className="text-xs">Schedule Tour</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col space-y-1" onClick={() => navigate('/dashboard/agent/contacts')}>
                <Users className="h-5 w-5" />
                <span className="text-xs">Contacts</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ReportGeneratorModal 
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  );
};

export default AgentDashboard;
