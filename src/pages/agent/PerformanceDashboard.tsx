
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Users, Target, Calendar, Award, BarChart, Download } from 'lucide-react';

const PerformanceDashboard = () => {
  const monthlyData = [
    { month: 'Jan', placements: 8, commission: 9500, leads: 25 },
    { month: 'Feb', placements: 6, commission: 7200, leads: 22 },
    { month: 'Mar', placements: 10, commission: 12800, leads: 30 },
    { month: 'Apr', placements: 7, commission: 8750, leads: 28 },
    { month: 'May', placements: 9, commission: 11200, leads: 32 },
    { month: 'Jun', placements: 11, commission: 14300, leads: 35 },
    { month: 'Jul', placements: 8, commission: 10100, leads: 29 },
    { month: 'Aug', placements: 12, commission: 15600, leads: 38 },
    { month: 'Sep', placements: 9, commission: 11800, leads: 31 },
    { month: 'Oct', placements: 10, commission: 13200, leads: 33 },
    { month: 'Nov', placements: 13, commission: 16900, leads: 41 },
    { month: 'Dec', placements: 7, commission: 8750, leads: 18 }
  ];

  const topFacilities = [
    { name: 'Sunrise Senior Living', placements: 15, commission: 18750, satisfaction: 4.8 },
    { name: 'Golden Years Memory Care', placements: 12, commission: 16200, satisfaction: 4.6 },
    { name: 'Peaceful Valley AL', placements: 10, commission: 12500, satisfaction: 4.7 },
    { name: 'Oakwood Senior Community', placements: 8, commission: 9600, satisfaction: 4.5 }
  ];

  const goals = [
    { metric: 'Monthly Placements', current: 7, target: 10, unit: 'placements' },
    { metric: 'Monthly Commission', current: 8750, target: 12000, unit: '$' },
    { metric: 'Conversion Rate', current: 85, target: 90, unit: '%' },
    { metric: 'Client Satisfaction', current: 4.7, target: 4.8, unit: '/5' }
  ];

  const achievements = [
    { title: 'Top Performer', description: 'Highest placements in Q3', icon: Award, earned: true },
    { title: 'Client Champion', description: '95%+ satisfaction rating', icon: Users, earned: true },
    { title: 'Commission King', description: '$100k+ annual commission', icon: DollarSign, earned: false },
    { title: 'Consistency Award', description: 'Met targets 6 months straight', icon: Target, earned: false }
  ];

  const currentYear = new Date().getFullYear();
  const ytdPlacements = monthlyData.slice(0, 11).reduce((sum, month) => sum + month.placements, 0);
  const ytdCommission = monthlyData.slice(0, 11).reduce((sum, month) => sum + month.commission, 0);
  const avgPlacementValue = ytdCommission / ytdPlacements;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Performance Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your performance metrics, goals, and achievements.</p>
        </div>
        <div className="flex space-x-3">
          <Select defaultValue="2024">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{ytdPlacements}</p>
                <p className="text-gray-600">YTD Placements</p>
                <p className="text-sm text-green-600">+12% vs last year</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-accent-gold" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">${ytdCommission.toLocaleString()}</p>
                <p className="text-gray-600">YTD Commission</p>
                <p className="text-sm text-green-600">+18% vs last year</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-primary-red" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">${avgPlacementValue.toFixed(0)}</p>
                <p className="text-gray-600">Avg Placement Value</p>
                <p className="text-sm text-green-600">+5% vs last year</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-primary-navy" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">85%</p>
                <p className="text-gray-600">Conversion Rate</p>
                <p className="text-sm text-yellow-600">-2% vs last year</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Monthly Performance Trend
            </CardTitle>
            <CardDescription>Placements and commission over the year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.slice(-6).map((month, index) => (
                <div key={month.month} className="grid grid-cols-4 gap-4 items-center">
                  <div className="font-medium">{month.month}</div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary-sky">{month.placements}</div>
                    <div className="text-xs text-gray-500">placements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-accent-gold">${month.commission.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">commission</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary-red">{month.leads}</div>
                    <div className="text-xs text-gray-500">leads</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goals Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Goals Progress
            </CardTitle>
            <CardDescription>Track your progress against monthly targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {goals.map((goal, index) => {
                const percentage = goal.unit === '$' 
                  ? (goal.current / goal.target) * 100
                  : goal.unit === '%'
                  ? (goal.current / goal.target) * 100
                  : goal.unit === '/5'
                  ? (goal.current / goal.target) * 100
                  : (goal.current / goal.target) * 100;
                
                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-text-dark-gray">{goal.metric}</span>
                      <span className="text-sm text-gray-600">
                        {goal.unit === '$' ? '$' : ''}{goal.current}{goal.unit !== '$' && goal.unit !== '/5' ? goal.unit : ''} / 
                        {goal.unit === '$' ? '$' : ''}{goal.target}{goal.unit !== '$' && goal.unit !== '/5' ? goal.unit : ''}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          percentage >= 100 ? 'bg-green-500' :
                          percentage >= 80 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Facilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Top Performing Facilities
          </CardTitle>
          <CardDescription>Facilities with the highest placements and commission</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topFacilities.map((facility, index) => (
              <div key={facility.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary-sky rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark-gray">{facility.name}</h4>
                    <p className="text-sm text-gray-600">
                      {facility.placements} placements • {facility.satisfaction}/5 rating
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-accent-gold">${facility.commission.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total commission</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Achievements & Badges
          </CardTitle>
          <CardDescription>Recognition for outstanding performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={index} 
                  className={`p-4 border rounded-lg text-center ${
                    achievement.earned 
                      ? 'bg-accent-gold/10 border-accent-gold' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <IconComponent 
                    className={`h-8 w-8 mx-auto mb-2 ${
                      achievement.earned ? 'text-accent-gold' : 'text-gray-400'
                    }`} 
                  />
                  <h4 className={`font-semibold mb-1 ${
                    achievement.earned ? 'text-text-dark-gray' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${
                    achievement.earned ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                  {achievement.earned && (
                    <Badge className="mt-2 bg-accent-gold text-text-dark-gray">
                      Earned
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>AI-powered recommendations to improve your performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Opportunity</h4>
              <p className="text-blue-800">
                Your conversion rate has decreased by 2% compared to last year. Consider focusing on lead qualification 
                to improve the quality of prospects in your pipeline.
              </p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">✅ Strength</h4>
              <p className="text-green-800">
                Your placements at Sunrise Senior Living have increased by 25% this quarter. 
                Consider strengthening this partnership for continued growth.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Watch</h4>
              <p className="text-yellow-800">
                December typically shows lower activity. Plan your outreach strategy early to 
                maintain momentum through the holiday season.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceDashboard;
