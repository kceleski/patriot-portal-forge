
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, TrendingUp, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const HealthcareDashboard = () => {
  const recentActivity = [
    { id: 1, type: 'referral', content: 'New referral submitted for Mary Johnson', time: '1 hour ago' },
    { id: 2, type: 'placement', content: 'Client placement confirmed at Sunrise Senior Living', time: '3 hours ago' },
    { id: 3, type: 'invoice', content: 'Invoice #1234 generated', time: '5 hours ago' },
    { id: 4, type: 'update', content: 'Client care plan updated', time: '1 day ago' }
  ];

  const upcomingTasks = [
    { id: 1, task: 'Follow up on Johnson referral', priority: 'high', due: 'Today' },
    { id: 2, task: 'Complete care assessment for new client', priority: 'medium', due: 'Tomorrow' },
    { id: 3, task: 'Review facility contracts', priority: 'low', due: 'This week' }
  ];

  const clients = [
    { id: 1, name: 'Mary Johnson', status: 'Active', facility: 'Sunrise Senior Living', lastUpdate: '2 days ago' },
    { id: 2, name: 'Robert Smith', status: 'Pending Placement', facility: 'N/A', lastUpdate: '1 day ago' },
    { id: 3, name: 'Linda Davis', status: 'Assessment', facility: 'N/A', lastUpdate: '3 hours ago' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Healthcare Professional Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your clients, referrals, and track placements.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            Generate Report
          </Button>
          <Button className="bg-primary-red hover:bg-red-600">
            New Client
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">24</p>
                <p className="text-gray-600">Active Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-accent-gold" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">12</p>
                <p className="text-gray-600">Pending Referrals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-primary-red" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">89%</p>
                <p className="text-gray-600">Placement Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-primary-navy" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">8</p>
                <p className="text-gray-600">Upcoming Assessments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Clients */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Recent Clients
            </CardTitle>
            <CardDescription>Latest client activity and status updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold text-text-dark-gray">{client.name}</h4>
                    <p className="text-sm text-gray-600">
                      {client.facility !== 'N/A' ? `Placed at ${client.facility}` : 'Awaiting placement'}
                    </p>
                    <p className="text-xs text-gray-500">Last updated: {client.lastUpdate}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={client.status === 'Active' ? 'default' : client.status === 'Assessment' ? 'secondary' : 'outline'}
                      className={
                        client.status === 'Active' ? 'bg-green-100 text-green-800' :
                        client.status === 'Assessment' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-orange-100 text-orange-800'
                      }
                    >
                      {client.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
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
            <CardDescription>Priority items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium text-text-dark-gray">{task.task}</p>
                    {task.priority === 'high' && <AlertCircle className="h-4 w-4 text-red-500" />}
                    {task.priority === 'medium' && <Clock className="h-4 w-4 text-yellow-500" />}
                    {task.priority === 'low' && <CheckCircle className="h-4 w-4 text-green-500" />}
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
            <FileText className="h-5 w-5 mr-2" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates across your client portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'referral' && <FileText className="h-5 w-5 text-primary-sky" />}
                  {activity.type === 'placement' && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {activity.type === 'invoice' && <TrendingUp className="h-5 w-5 text-accent-gold" />}
                  {activity.type === 'update' && <Users className="h-5 w-5 text-primary-red" />}
                </div>
                <div className="flex-1">
                  <p className="text-text-dark-gray">{activity.content}</p>
                  <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthcareDashboard;
