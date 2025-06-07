
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, User, Heart, Clock, MapPin, Phone } from 'lucide-react';
import PlacementFeeModal from '@/components/PlacementFeeModal';

const FamilyDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recentActivity = [
    { id: 1, type: 'message', content: 'New message from Sunrise Senior Living', time: '2 hours ago' },
    { id: 2, type: 'appointment', content: 'Care assessment scheduled', time: '1 day ago' },
    { id: 3, type: 'update', content: 'Care plan updated', time: '3 days ago' }
  ];

  const careTeam = [
    { name: 'Dr. Sarah Johnson', role: 'Primary Care Physician', phone: '(555) 123-4567' },
    { name: 'Maria Rodriguez', role: 'Care Coordinator', phone: '(555) 987-6543' },
    { name: 'Mike Thompson', role: 'Placement Agent', phone: '(555) 456-7890' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-heading">Family Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your care plan.</p>
        </div>
        <Button 
          className="bg-brand-red hover:bg-red-600"
          onClick={() => setIsModalOpen(true)}
        >
          Request an Agent
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-brand-red" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-primary">1</p>
                <p className="text-gray-600">Active Care Plan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-brand-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-primary">3</p>
                <p className="text-gray-600">Unread Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-brand-gold" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-primary">2</p>
                <p className="text-gray-600">Upcoming Appointments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-brand-navy" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-primary">5</p>
                <p className="text-gray-600">Saved Favorites</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center font-heading">
                <Clock className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription>Stay updated on your care journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {activity.type === 'message' && <MessageSquare className="h-5 w-5 text-brand-sky" />}
                      {activity.type === 'appointment' && <Calendar className="h-5 w-5 text-brand-gold" />}
                      {activity.type === 'update' && <User className="h-5 w-5 text-brand-red" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-text-primary">{activity.content}</p>
                      <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Care Team */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center font-heading">
                <User className="h-5 w-5 mr-2" />
                Your Care Team
              </CardTitle>
              <CardDescription>Your dedicated support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {careTeam.map((member, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-text-primary font-heading">{member.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-1" />
                      {member.phone}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Current Care Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Current Care Plan</CardTitle>
          <CardDescription>Overview of your selected care solution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-4 font-heading">Facility Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Sunrise Senior Living - Beverly Hills</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="text-brand-sky border-brand-sky">
                    Assisted Living
                  </Badge>
                </div>
                <p className="text-gray-600">
                  Premium assisted living with 24/7 care, personalized service plans, and resort-style amenities.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-text-primary mb-4 font-heading">Next Steps</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-brand-gold mr-2" />
                  <span>Care Assessment - Dec 15, 2024</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-brand-gold mr-2" />
                  <span>Move-in Date - Jan 1, 2025</span>
                </div>
                <Button className="w-full bg-brand-sky hover:bg-blue-600 mt-4">
                  View Full Care Plan
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placement Fee Modal */}
      <PlacementFeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default FamilyDashboard;
