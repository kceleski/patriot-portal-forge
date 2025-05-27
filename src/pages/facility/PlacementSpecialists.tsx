
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCheck, Users, Star, Phone, Mail, Plus, Search, Award, TrendingUp } from 'lucide-react';

const PlacementSpecialists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const specialists = [
    {
      id: 1,
      name: 'Sarah Wilson',
      title: 'Senior Placement Specialist',
      email: 'sarah.wilson@sunrisesenior.com',
      phone: '(555) 123-4567',
      status: 'Active',
      rating: 4.9,
      totalPlacements: 156,
      monthlyPlacements: 8,
      conversionRate: 85,
      specialties: ['Memory Care', 'Assisted Living'],
      joinDate: '2022-03-15',
      certifications: ['Certified Senior Advisor', 'Alzheimer\'s Care Specialist'],
      languages: ['English', 'Spanish'],
      territory: 'Beverly Hills, West Hollywood'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Placement Coordinator',
      email: 'michael.chen@sunrisesenior.com',
      phone: '(555) 987-6543',
      status: 'Active',
      rating: 4.7,
      totalPlacements: 89,
      monthlyPlacements: 6,
      conversionRate: 78,
      specialties: ['Independent Living', 'Respite Care'],
      joinDate: '2023-01-10',
      certifications: ['Certified Aging Life Care Manager'],
      languages: ['English', 'Mandarin'],
      territory: 'Santa Monica, Venice'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Family Liaison Specialist',
      email: 'emily.rodriguez@sunrisesenior.com',
      phone: '(555) 456-7890',
      status: 'Active',
      rating: 4.8,
      totalPlacements: 112,
      monthlyPlacements: 7,
      conversionRate: 82,
      specialties: ['Family Counseling', 'Care Transitions'],
      joinDate: '2021-08-22',
      certifications: ['Licensed Social Worker', 'Geriatric Care Manager'],
      languages: ['English', 'Spanish', 'Portuguese'],
      territory: 'Pasadena, Glendale'
    }
  ];

  const teamMetrics = {
    totalSpecialists: 12,
    avgRating: 4.8,
    totalPlacements: 89,
    avgConversionRate: 82
  };

  const performance = [
    { month: 'July', placements: 25, conversions: 78 },
    { month: 'August', placements: 28, conversions: 82 },
    { month: 'September', placements: 31, conversions: 85 },
    { month: 'October', placements: 27, conversions: 80 },
    { month: 'November', placements: 33, conversions: 88 },
    { month: 'December', placements: 21, conversions: 84 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSpecialists = specialists.filter(specialist => {
    const matchesSearch = specialist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         specialist.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || specialist.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Placement Specialist Management</h1>
          <p className="text-gray-600 mt-2">Manage your placement team, track performance, and optimize assignments.</p>
        </div>
        <Button className="bg-primary-red hover:bg-red-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Specialist
        </Button>
      </div>

      <Tabs defaultValue="team" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="team">Team Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-6">
          {/* Team Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-primary-sky" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-text-dark-gray">{teamMetrics.totalSpecialists}</p>
                    <p className="text-gray-600">Total Specialists</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-accent-gold" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-text-dark-gray">{teamMetrics.avgRating}</p>
                    <p className="text-gray-600">Average Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <UserCheck className="h-8 w-8 text-primary-red" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-text-dark-gray">{teamMetrics.totalPlacements}</p>
                    <p className="text-gray-600">Monthly Placements</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-primary-navy" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-text-dark-gray">{teamMetrics.avgConversionRate}%</p>
                    <p className="text-gray-600">Avg Conversion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Search Specialists</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search specialists..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  Export Team Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Specialists Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSpecialists.map((specialist) => (
              <Card key={specialist.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-text-dark-gray">{specialist.name}</h3>
                      <p className="text-gray-600">{specialist.title}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(specialist.status)}>
                        {specialist.status}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{specialist.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Monthly Placements</div>
                      <div className="text-lg font-bold text-primary-sky">{specialist.monthlyPlacements}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Conversion Rate</div>
                      <div className="text-lg font-bold text-primary-red">{specialist.conversionRate}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Placements</div>
                      <div className="text-lg font-bold text-accent-gold">{specialist.totalPlacements}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Territory</div>
                      <div className="text-sm font-medium">{specialist.territory}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {specialist.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Certifications</h4>
                    <div className="space-y-1">
                      {specialist.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center text-xs">
                          <Award className="h-3 w-3 text-accent-gold mr-1" />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {specialist.phone}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary-sky hover:bg-blue-600">
                      Assign Client
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Team Performance Analytics
              </CardTitle>
              <CardDescription>Track placement team performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performance.map((month, index) => (
                  <div key={month.month} className="grid grid-cols-4 gap-4 items-center">
                    <div className="font-medium">{month.month}</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary-sky">{month.placements}</div>
                      <div className="text-xs text-gray-500">placements</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary-red">{month.conversions}%</div>
                      <div className="text-xs text-gray-500">conversion</div>
                    </div>
                    <div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-sky h-2 rounded-full" 
                          style={{ width: `${month.conversions}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performers This Month</CardTitle>
              <CardDescription>Specialists with the highest performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {specialists.sort((a, b) => b.monthlyPlacements - a.monthlyPlacements).map((specialist, index) => (
                  <div key={specialist.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary-sky rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-dark-gray">{specialist.name}</h4>
                        <p className="text-sm text-gray-600">{specialist.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary-red">{specialist.monthlyPlacements}</p>
                      <p className="text-sm text-gray-600">placements</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Assignments</CardTitle>
              <CardDescription>Manage specialist assignments and workload distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {specialists.map((specialist) => (
                  <div key={specialist.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-text-dark-gray">{specialist.name}</h4>
                      <Badge className="bg-blue-100 text-blue-800">
                        {Math.floor(Math.random() * 8) + 3} active assignments
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Territory:</span>
                        <div className="font-medium">{specialist.territory}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Workload:</span>
                        <div className="font-medium">{Math.floor(Math.random() * 30) + 70}%</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Next Available:</span>
                        <div className="font-medium">Dec {Math.floor(Math.random() * 20) + 15}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">
                        View Assignments
                      </Button>
                      <Button size="sm" className="bg-primary-sky hover:bg-blue-600">
                        New Assignment
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlacementSpecialists;
