
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Users, TrendingUp, Calendar, Bed, DollarSign, UserCheck, AlertCircle } from 'lucide-react';

const FacilityDashboard = () => {
  const recentActivity = [
    { id: 1, type: 'admission', content: 'New resident admission: Mary Johnson', time: '3 hours ago' },
    { id: 2, type: 'inquiry', content: 'Placement inquiry from Dr. Martinez', time: '5 hours ago' },
    { id: 3, type: 'specialist', content: 'New placement specialist registered', time: '1 day ago' },
    { id: 4, type: 'webinar', content: 'Monthly family webinar completed', time: '2 days ago' }
  ];

  const occupancyData = {
    total: 150,
    occupied: 132,
    pending: 8,
    available: 10,
    waitingList: 25
  };

  const monthlyStats = {
    admissions: 12,
    inquiries: 45,
    tours: 28,
    revenue: 485000
  };

  const upcomingEvents = [
    { id: 1, title: 'Family Orientation Webinar', date: '2024-12-15', time: '2:00 PM', attendees: 15 },
    { id: 2, title: 'Care Team Meeting', date: '2024-12-16', time: '10:00 AM', attendees: 8 },
    { id: 3, title: 'Monthly Placement Review', date: '2024-12-18', time: '3:00 PM', attendees: 12 }
  ];

  const placementSpecialists = [
    { name: 'Sarah Wilson', title: 'Senior Placement Specialist', placements: 8, rating: 4.9 },
    { name: 'Michael Chen', title: 'Placement Coordinator', placements: 6, rating: 4.7 },
    { name: 'Emily Rodriguez', title: 'Family Liaison', placements: 7, rating: 4.8 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Facility Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your facility operations, occupancy, and placement team.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            Generate Report
          </Button>
          <Button className="bg-primary-red hover:bg-red-600">
            Schedule Tour
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Bed className="h-8 w-8 text-primary-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{occupancyData.occupied}</p>
                <p className="text-gray-600">Current Residents</p>
                <p className="text-sm text-green-600">{((occupancyData.occupied / occupancyData.total) * 100).toFixed(1)}% occupied</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-accent-gold" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{occupancyData.available}</p>
                <p className="text-gray-600">Available Beds</p>
                <p className="text-sm text-primary-red">{occupancyData.pending} pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-primary-red" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{monthlyStats.inquiries}</p>
                <p className="text-gray-600">Monthly Inquiries</p>
                <p className="text-sm text-green-600">+15% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-primary-navy" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">${monthlyStats.revenue.toLocaleString()}</p>
                <p className="text-gray-600">Monthly Revenue</p>
                <p className="text-sm text-green-600">+8% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Occupancy Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Occupancy Overview
            </CardTitle>
            <CardDescription>Current facility capacity and utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-sky">{occupancyData.total}</div>
                <div className="text-sm text-gray-600">Total Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{occupancyData.occupied}</div>
                <div className="text-sm text-gray-600">Occupied</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{occupancyData.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{occupancyData.available}</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Occupancy Rate</span>
                  <span>{((occupancyData.occupied / occupancyData.total) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-sky h-2 rounded-full" 
                    style={{ width: `${(occupancyData.occupied / occupancyData.total) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-3 bg-secondary-off-white rounded-lg">
                  <div className="text-lg font-bold text-text-dark-gray">{occupancyData.waitingList}</div>
                  <div className="text-sm text-gray-600">Waiting List</div>
                </div>
                <div className="text-center p-3 bg-secondary-off-white rounded-lg">
                  <div className="text-lg font-bold text-text-dark-gray">{monthlyStats.tours}</div>
                  <div className="text-sm text-gray-600">Tours This Month</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Scheduled webinars and meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-text-dark-gray text-sm">{event.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{event.date} at {event.time}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="text-xs">
                      {event.attendees} attendees
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Placement Specialists Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserCheck className="h-5 w-5 mr-2" />
            Placement Specialists Performance
          </CardTitle>
          <CardDescription>Track your placement team's performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {placementSpecialists.map((specialist, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-text-dark-gray">{specialist.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{specialist.title}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Placements:</span>
                    <span className="font-semibold">{specialist.placements}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Rating:</span>
                    <span className="font-semibold text-yellow-600">{specialist.rating}/5</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View Profile
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates and facility activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'admission' && <UserCheck className="h-5 w-5 text-green-500" />}
                  {activity.type === 'inquiry' && <Users className="h-5 w-5 text-primary-sky" />}
                  {activity.type === 'specialist' && <UserCheck className="h-5 w-5 text-accent-gold" />}
                  {activity.type === 'webinar' && <Calendar className="h-5 w-5 text-primary-red" />}
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Building className="h-8 w-8 mx-auto mb-3 text-primary-sky" />
            <h3 className="font-semibold text-text-dark-gray mb-2">Manage Listings</h3>
            <Button size="sm" className="bg-primary-sky hover:bg-blue-600">
              Update Listings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-3 text-accent-gold" />
            <h3 className="font-semibold text-text-dark-gray mb-2">View Analytics</h3>
            <Button size="sm" className="bg-accent-gold hover:bg-yellow-500 text-text-dark-gray">
              Open Analytics
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-3 text-primary-red" />
            <h3 className="font-semibold text-text-dark-gray mb-2">Team Management</h3>
            <Button size="sm" className="bg-primary-red hover:bg-red-600">
              Manage Team
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-3 text-primary-navy" />
            <h3 className="font-semibold text-text-dark-gray mb-2">Schedule Webinar</h3>
            <Button size="sm" className="bg-primary-navy hover:bg-blue-900">
              New Webinar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacilityDashboard;
