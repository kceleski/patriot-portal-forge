
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockScenarios, mockUsers, mockFacilities, MockScenario } from '@/data/mockData';
import { Users, Building2, Stethoscope, Heart, Play, MapPin, Star, Phone } from 'lucide-react';

const PresentationMockData: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<MockScenario | null>(null);

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'family': return Heart;
      case 'healthcare': return Stethoscope;
      case 'agent': return Users;
      case 'facility': return Building2;
      default: return Users;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'essentials': return 'bg-gray-100 text-gray-800';
      case 'elevate': return 'bg-blue-100 text-blue-800';
      case 'pinnacle': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-brand-off-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            HealthProAssist Demo Scenarios
          </h1>
          <p className="text-lg text-text-secondary">
            Interactive presentation data for demonstrating platform capabilities
          </p>
        </div>

        <Tabs defaultValue="scenarios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            <TabsTrigger value="users">Mock Users</TabsTrigger>
            <TabsTrigger value="facilities">Mock Facilities</TabsTrigger>
            <TabsTrigger value="workflow">Workflow Demo</TabsTrigger>
          </TabsList>

          <TabsContent value="scenarios" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockScenarios.map((scenario) => {
                const Icon = getUserTypeIcon(scenario.user.user_type);
                return (
                  <Card key={scenario.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => setSelectedScenario(scenario)}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-5 w-5 text-brand-navy" />
                          <Badge className={getTierColor(scenario.user.subscription_tier)}>
                            {scenario.user.subscription_tier}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Demo
                        </Button>
                      </div>
                      <CardTitle className="text-xl">{scenario.title}</CardTitle>
                      <CardDescription>{scenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm text-text-primary mb-1">User</h4>
                          <p className="text-sm text-text-secondary">
                            {scenario.user.first_name} {scenario.user.last_name} ({scenario.user.user_type})
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-text-primary mb-1">Context</h4>
                          <p className="text-sm text-text-secondary line-clamp-3">
                            {scenario.context}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {selectedScenario && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-900">
                    {selectedScenario.title} - Workflow
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Step-by-step demonstration workflow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Context</h4>
                      <p className="text-blue-800">{selectedScenario.context}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Workflow Steps</h4>
                      <ol className="list-decimal list-inside space-y-2">
                        {selectedScenario.workflow_steps.map((step, index) => (
                          <li key={index} className="text-blue-800">{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Expected Outcome</h4>
                      <p className="text-blue-800">{selectedScenario.expected_outcome}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockUsers.map((user) => {
                const Icon = getUserTypeIcon(user.user_type);
                return (
                  <Card key={user.id}>
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-2 p-3 bg-brand-navy rounded-full w-12 h-12 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">
                        {user.first_name} {user.last_name}
                      </CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-center">
                        <Badge className={getTierColor(user.subscription_tier)}>
                          {user.subscription_tier}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Type:</span> {user.user_type}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {user.phone}
                        </div>
                        {user.organization && (
                          <div>
                            <span className="font-medium">Org:</span> {user.organization}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockFacilities.map((facility) => (
                <Card key={facility.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{facility.type}</Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-brand-gold text-brand-gold mr-1" />
                        <span className="text-sm font-medium">{facility.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{facility.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {facility.address}, {facility.city}, {facility.state}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {facility.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Capacity:</span> {facility.capacity}
                      </div>
                      <div>
                        <span className="font-medium">Available:</span> {facility.current_availability}
                      </div>
                      <div>
                        <span className="font-medium">Price:</span> ${facility.price_min.toLocaleString()}-${facility.price_max.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        <span className="text-xs">{facility.phone}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {facility.amenities.slice(0, 3).map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {facility.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{facility.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workflow" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Demo Workflow</CardTitle>
                <CardDescription>
                  Use these buttons to simulate different user journeys during your presentation
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Heart className="h-6 w-6" />
                  <span>Family Journey</span>
                  <span className="text-xs opacity-70">Search → Compare → Tour</span>
                </Button>
                <Button className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Stethoscope className="h-6 w-6" />
                  <span>Healthcare Referral</span>
                  <span className="text-xs opacity-70">Patient → Referral → Placement</span>
                </Button>
                <Button className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Agent CRM</span>
                  <span className="text-xs opacity-70">Lead → Client → Commission</span>
                </Button>
                <Button className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Building2 className="h-6 w-6" />
                  <span>Facility Marketing</span>
                  <span className="text-xs opacity-70">Listing → Leads → Occupancy</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PresentationMockData;
