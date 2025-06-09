import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, TrendingUp, Calendar, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { ReportGeneratorModal } from '@/components/agent/ReportGeneratorModal';
import { useNavigate } from 'react-router-dom';

const AgentDashboard = () => {
  const [showReportModal, setShowReportModal] = useState(false);
  const navigate = useNavigate();

  const recentActivity = [
    { id: 1, type: 'placement', content: 'Successful placement: Mary Johnson at Sunrise Senior Living', time: '2 hours ago', value: '$1,250' },
    { id: 2, type: 'call', content: 'Follow-up call with Smith family', time: '4 hours ago', value: null },
    { id: 3, type: 'commission', content: 'Commission payment received', time: '1 day ago', value: '$3,200' },
    { id: 4, type: 'referral', content: 'New referral received from Dr. Martinez', time: '2 days ago', value: null }
  ];

  const upcomingTasks = [
    { id: 1, task: 'Follow up with Johnson family about move-in date', priority: 'high', due: 'Today 2:00 PM' },
    { id: 2, task: 'Schedule facility tour for Davis family', priority: 'medium', due: 'Tomorrow 10:00 AM' },
    { id: 3, task: 'Submit monthly commission report', priority: 'low', due: 'This week' }
  ];

  const activeClients = [
    { id: 1, name: 'Robert Smith', stage: 'Assessment', facility: 'Golden Years Memory Care', lastContact: '1 day ago' },
    { id: 2, name: 'Linda Davis', stage: 'Facility Tours', facility: 'Multiple options', lastContact: '2 days ago' },
    { id: 3, name: 'James Wilson', stage: 'Contract Negotiation', facility: 'Peaceful Valley AL', lastContact: '3 hours ago' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Placement Agent Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your placements, commissions, and client pipeline.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setShowReportModal(true)}>
            Generate Report
          </Button>
          <Button 
            className="bg-primary-red hover:bg-red-600 text-white"
            onClick={() => navigate('/dashboard/agent/new-client')}
          >
            Add New Client
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">18</p>
                <p className="text-gray-600">Active Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">7</p>
                <p className="text-gray-600">Placements This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-accent-gold" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">$8,750</p>
                <p className="text-gray-600">Monthly Commission</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-primary-red" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">92%</p>
                <p className="text-gray-600">Placement Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Clients Pipeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Active Client Pipeline
            </CardTitle>
            <CardDescription>Clients currently in the placement process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold text-text-dark-gray">{client.name}</h4>
                    <p className="text-sm text-gray-600">{client.facility}</p>
                    <p className="text-xs text-gray-500">Last contact: {client.lastContact}</p>
                  </div>
                  <div className="flex items-center space-x-2">
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
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigate('/dashboard/agent/clients')}
            >
              View All Clients
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>Priority items for today and this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium text-text-dark-gray">{task.task}</p>
                    <div className="flex items-center">
                      {task.priority === 'high' && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                      {task.priority === 'medium' && <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>}
                      {task.priority === 'low' && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={
                        task.priority === 'high' ? 'border-red-200 text-red-700' :
                        task.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                        'border-green-200 text-green-700'
                      }
                    >
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-gray-500">{task.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates from your client portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'placement' && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {activity.type === 'call' && <Phone className="h-5 w-5 text-primary-sky" />}
                  {activity.type === 'commission' && <DollarSign className="h-5 w-5 text-accent-gold" />}
                  {activity.type === 'referral' && <Mail className="h-5 w-5 text-primary-red" />}
                </div>
                <div className="flex-1">
                  <p className="text-text-dark-gray">{activity.content}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-500">{activity.time}</p>
                    {activity.value && (
                      <Badge className="bg-green-100 text-green-800">
                        {activity.value}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* This Month's Goals - moved from Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Month's Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Placements</span>
                  <span>7/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-sky h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Commission Goal</span>
                  <span>$8,750/$12,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-accent-gold h-2 rounded-full" style={{ width: '73%' }}></div>
                </div>
              </div>
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
