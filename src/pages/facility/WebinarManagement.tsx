
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Video, Clock, Plus, Edit, Eye, Play } from 'lucide-react';

const WebinarManagement = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingWebinars = [
    {
      id: 1,
      title: 'Understanding Memory Care: A Family Guide',
      date: '2024-12-15',
      time: '2:00 PM PST',
      duration: 60,
      registered: 45,
      capacity: 100,
      host: 'Dr. Sarah Wilson',
      status: 'Published',
      description: 'Learn about our specialized memory care program and how it can benefit your loved one.',
      topics: ['Memory Care Services', 'Daily Activities', 'Family Support', 'Safety Measures']
    },
    {
      id: 2,
      title: 'Assisted Living Orientation',
      date: '2024-12-18',
      time: '10:00 AM PST',
      duration: 45,
      registered: 32,
      capacity: 75,
      host: 'Michael Chen',
      status: 'Published',
      description: 'An introduction to our assisted living community and services.',
      topics: ['Living Arrangements', 'Care Services', 'Amenities', 'Pricing']
    },
    {
      id: 3,
      title: 'Holiday Activities & Events',
      date: '2024-12-20',
      time: '3:00 PM PST',
      duration: 30,
      registered: 28,
      capacity: 50,
      host: 'Emily Rodriguez',
      status: 'Draft',
      description: 'Join us to learn about our special holiday programming and events.',
      topics: ['Holiday Activities', 'Family Events', 'Special Dining', 'Entertainment']
    }
  ];

  const completedWebinars = [
    {
      id: 4,
      title: 'Nutrition & Wellness for Seniors',
      date: '2024-11-28',
      time: '2:00 PM PST',
      duration: 60,
      attended: 67,
      registered: 78,
      host: 'Dr. Maria Santos',
      status: 'Completed',
      recording: true,
      feedback: 4.7
    },
    {
      id: 5,
      title: 'Financial Planning for Senior Care',
      date: '2024-11-15',
      time: '1:00 PM PST',
      duration: 75,
      attended: 89,
      registered: 102,
      host: 'Robert Kim',
      status: 'Completed',
      recording: true,
      feedback: 4.9
    }
  ];

  const webinarStats = {
    totalWebinars: 24,
    avgAttendance: 78,
    totalRegistrations: 1245,
    avgRating: 4.6
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Webinar Management</h1>
          <p className="text-gray-600 mt-2">Create, schedule, and manage educational webinars for families and professionals.</p>
        </div>
        <Button className="bg-primary-red hover:bg-red-600">
          <Plus className="h-4 w-4 mr-2" />
          Create Webinar
        </Button>
      </div>

      {/* Webinar Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Video className="h-8 w-8 text-primary-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{webinarStats.totalWebinars}</p>
                <p className="text-gray-600">Total Webinars</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-accent-gold" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{webinarStats.totalRegistrations}</p>
                <p className="text-gray-600">Total Registrations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-primary-red" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{webinarStats.avgAttendance}%</p>
                <p className="text-gray-600">Avg Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-primary-navy" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{webinarStats.avgRating}</p>
                <p className="text-gray-600">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Webinars
              </CardTitle>
              <CardDescription>Manage your scheduled webinars and registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingWebinars.map((webinar) => (
                  <Card key={webinar.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-text-dark-gray mb-2">{webinar.title}</h3>
                          <p className="text-gray-700 mb-3">{webinar.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                {webinar.date} at {webinar.time}
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="h-4 w-4 text-gray-500 mr-2" />
                                {webinar.duration} minutes
                              </div>
                              <div className="flex items-center text-sm">
                                <Users className="h-4 w-4 text-gray-500 mr-2" />
                                Host: {webinar.host}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Registration:</span>
                                <span className="font-medium">{webinar.registered}/{webinar.capacity}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary-sky h-2 rounded-full" 
                                  style={{ width: `${(webinar.registered / webinar.capacity) * 100}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500">
                                {((webinar.registered / webinar.capacity) * 100).toFixed(0)}% full
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-semibold text-sm mb-2">Topics Covered</h4>
                            <div className="flex flex-wrap gap-1">
                              {webinar.topics.map((topic, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getStatusColor(webinar.status)}>
                            {webinar.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-1" />
                          Attendees
                        </Button>
                        {webinar.status === 'Published' && (
                          <Button size="sm" className="bg-primary-sky hover:bg-blue-600">
                            <Video className="h-4 w-4 mr-1" />
                            Start Webinar
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Webinars</CardTitle>
              <CardDescription>Review past webinars and access recordings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedWebinars.map((webinar) => (
                  <div key={webinar.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-dark-gray">{webinar.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>{webinar.date}</span>
                        <span>Host: {webinar.host}</span>
                        <span>Attended: {webinar.attended}/{webinar.registered}</span>
                        <span>Rating: {webinar.feedback}/5</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(webinar.status)}>
                        {webinar.status}
                      </Badge>
                      {webinar.recording && (
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Recording
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Webinar Analytics</CardTitle>
              <CardDescription>Performance metrics and insights for your webinar program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-text-dark-gray mb-4">Attendance Trends</h4>
                  <div className="space-y-3">
                    {['November', 'October', 'September', 'August'].map((month, index) => (
                      <div key={month} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{month}</span>
                          <span>{85 - index * 3}% attendance</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-sky h-2 rounded-full" 
                            style={{ width: `${85 - index * 3}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-dark-gray mb-4">Top Performing Webinars</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium text-sm">Financial Planning for Senior Care</h5>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>102 registrations</span>
                        <span>4.9/5 rating</span>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium text-sm">Memory Care Services Overview</h5>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>95 registrations</span>
                        <span>4.8/5 rating</span>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium text-sm">Nutrition & Wellness for Seniors</h5>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>78 registrations</span>
                        <span>4.7/5 rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Webinar Settings</CardTitle>
              <CardDescription>Configure default settings and templates for your webinars</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-text-dark-gray mb-3">Default Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-dark-gray mb-2">
                        Default Duration (minutes)
                      </label>
                      <Select defaultValue="60">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-dark-gray mb-2">
                        Default Capacity
                      </label>
                      <Input type="number" defaultValue="100" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-dark-gray mb-3">Email Templates</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Registration Confirmation</span>
                      <Button variant="outline" size="sm">Edit Template</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Reminder Email (24h before)</span>
                      <Button variant="outline" size="sm">Edit Template</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Follow-up Email</span>
                      <Button variant="outline" size="sm">Edit Template</Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-dark-gray mb-3">Integration Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="text-sm font-medium">Zoom Integration</span>
                        <p className="text-xs text-gray-600">Connected to your Zoom account</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="text-sm font-medium">Calendar Sync</span>
                        <p className="text-xs text-gray-600">Sync with Google Calendar</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
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

export default WebinarManagement;
