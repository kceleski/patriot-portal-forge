
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, DollarSign, Users, Target, Calendar, Award, BarChart, Download, Star, ArrowUp, ArrowDown, Minus } from 'lucide-react';

const PerformanceDashboard = () => {
  const monthlyData = [
    { month: 'Jan', placements: 8, commission: 9500, leads: 25, conversion: 32 },
    { month: 'Feb', placements: 6, commission: 7200, leads: 22, conversion: 27 },
    { month: 'Mar', placements: 10, commission: 12800, leads: 30, conversion: 33 },
    { month: 'Apr', placements: 7, commission: 8750, leads: 28, conversion: 25 },
    { month: 'May', placements: 9, commission: 11200, leads: 32, conversion: 28 },
    { month: 'Jun', placements: 11, commission: 14300, leads: 35, conversion: 31 },
    { month: 'Jul', placements: 8, commission: 10100, leads: 29, conversion: 28 },
    { month: 'Aug', placements: 12, commission: 15600, leads: 38, conversion: 32 },
    { month: 'Sep', placements: 9, commission: 11800, leads: 31, conversion: 29 },
    { month: 'Oct', placements: 10, commission: 13200, leads: 33, conversion: 30 },
    { month: 'Nov', placements: 13, commission: 16900, leads: 41, conversion: 32 },
    { month: 'Dec', placements: 7, commission: 8750, leads: 18, conversion: 39 }
  ];

  const topFacilities = [
    { name: 'Sunrise Senior Living', placements: 15, commission: 18750, satisfaction: 4.8, avgDays: 12 },
    { name: 'Golden Years Memory Care', placements: 12, commission: 16200, satisfaction: 4.6, avgDays: 15 },
    { name: 'Peaceful Valley AL', placements: 10, commission: 12500, satisfaction: 4.7, avgDays: 18 },
    { name: 'Oakwood Senior Community', placements: 8, commission: 9600, satisfaction: 4.5, avgDays: 22 }
  ];

  const goals = [
    { metric: 'Monthly Placements', current: 7, target: 10, unit: 'placements', trend: 'up' },
    { metric: 'Monthly Commission', current: 8750, target: 12000, unit: '$', trend: 'up' },
    { metric: 'Conversion Rate', current: 85, target: 90, unit: '%', trend: 'down' },
    { metric: 'Client Satisfaction', current: 4.7, target: 4.8, unit: '/5', trend: 'up' },
    { metric: 'Avg. Placement Time', current: 18, target: 15, unit: 'days', trend: 'down' },
    { metric: 'Active Clients', current: 18, target: 25, unit: 'clients', trend: 'up' }
  ];

  const achievements = [
    { title: 'Top Performer', description: 'Highest placements in Q3', icon: Award, earned: true, date: '2024-09-30' },
    { title: 'Client Champion', description: '95%+ satisfaction rating', icon: Users, earned: true, date: '2024-08-15' },
    { title: 'Commission King', description: '$100k+ annual commission', icon: DollarSign, earned: false, progress: 75 },
    { title: 'Consistency Award', description: 'Met targets 6 months straight', icon: Target, earned: false, progress: 50 },
    { title: 'Speed Demon', description: 'Average placement under 14 days', icon: TrendingUp, earned: false, progress: 30 },
    { title: 'Relationship Builder', description: '50+ facility partnerships', icon: Star, earned: true, date: '2024-07-20' }
  ];

  const weeklyMetrics = [
    { week: 'This Week', placements: 2, calls: 15, tours: 5, emails: 28 },
    { week: 'Last Week', placements: 1, calls: 12, tours: 3, emails: 22 },
    { week: '2 Weeks Ago', placements: 3, calls: 18, tours: 7, emails: 31 },
    { week: '3 Weeks Ago', placements: 1, calls: 10, tours: 4, emails: 19 }
  ];

  const currentYear = new Date().getFullYear();
  const ytdPlacements = monthlyData.slice(0, 11).reduce((sum, month) => sum + month.placements, 0);
  const ytdCommission = monthlyData.slice(0, 11).reduce((sum, month) => sum + month.commission, 0);
  const avgPlacementValue = ytdCommission / ytdPlacements;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-8 p-6">
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

      {/* Enhanced Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary-sky" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-text-dark-gray">{ytdPlacements}</p>
                  <p className="text-gray-600">YTD Placements</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+12%</span>
                </div>
                <p className="text-xs text-gray-500">vs last year</p>
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
                  <p className="text-2xl font-bold text-text-dark-gray">${ytdCommission.toLocaleString()}</p>
                  <p className="text-gray-600">YTD Commission</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+18%</span>
                </div>
                <p className="text-xs text-gray-500">vs last year</p>
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
                  <p className="text-2xl font-bold text-text-dark-gray">${avgPlacementValue.toFixed(0)}</p>
                  <p className="text-gray-600">Avg Placement Value</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+5%</span>
                </div>
                <p className="text-xs text-gray-500">vs last year</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-primary-navy" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-text-dark-gray">85%</p>
                  <p className="text-gray-600">Conversion Rate</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-red-600">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">-2%</span>
                </div>
                <p className="text-xs text-gray-500">vs last year</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Monthly Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Monthly Performance Trend
            </CardTitle>
            <CardDescription>Placements, commission, and leads over the year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-2 text-xs font-medium text-gray-600 border-b pb-2">
                <div>Month</div>
                <div className="text-center">Placements</div>
                <div className="text-center">Commission</div>
                <div className="text-center">Leads</div>
                <div className="text-center">Conv. %</div>
              </div>
              {monthlyData.slice(-6).map((month, index) => (
                <div key={month.month} className="grid grid-cols-5 gap-2 items-center py-2 border-b border-gray-100">
                  <div className="font-medium">{month.month}</div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary-sky">{month.placements}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-accent-gold">${(month.commission / 1000).toFixed(1)}k</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary-red">{month.leads}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-600">{month.conversion}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Goals Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Goals Progress
            </CardTitle>
            <CardDescription>Track your progress against targets</CardDescription>
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
                  : goal.unit === 'days'
                  ? ((goal.target / goal.current) * 100) // Inverse for days (less is better)
                  : (goal.current / goal.target) * 100;
                
                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-text-dark-gray">{goal.metric}</span>
                        {getTrendIcon(goal.trend)}
                      </div>
                      <span className="text-sm text-gray-600">
                        {goal.unit === '$' ? '$' : ''}{goal.current}{goal.unit !== '$' && goal.unit !== '/5' ? goal.unit : ''} / 
                        {goal.unit === '$' ? '$' : ''}{goal.target}{goal.unit !== '$' && goal.unit !== '/5' ? goal.unit : ''}
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className="h-2"
                    />
                    <div className="flex justify-between items-center mt-1">
                      <span className={`text-xs font-medium ${getTrendColor(goal.trend)}`}>
                        {percentage.toFixed(0)}% complete
                      </span>
                      <span className="text-xs text-gray-500">
                        {goal.unit === 'days' 
                          ? `${goal.target - goal.current} days improvement needed`
                          : `${goal.target - goal.current} to go`
                        }
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Weekly Activity Breakdown
          </CardTitle>
          <CardDescription>Your activity patterns over the past month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {weeklyMetrics.map((week, index) => (
              <div key={week.week} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-lg mb-3 text-center">{week.week}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Placements:</span>
                    <span className="font-medium">{week.placements}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Calls:</span>
                    <span className="font-medium">{week.calls}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tours:</span>
                    <span className="font-medium">{week.tours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Emails:</span>
                    <span className="font-medium">{week.emails}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Top Performing Facilities */}
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
              <div key={facility.name} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary-sky rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark-gray">{facility.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{facility.placements} placements</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span>{facility.satisfaction}/5</span>
                      </div>
                      <span>{facility.avgDays} avg days</span>
                    </div>
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

      {/* Enhanced Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Achievements & Badges
          </CardTitle>
          <CardDescription>Recognition for outstanding performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={index} 
                  className={`p-4 border rounded-lg text-center transition-all hover:shadow-md ${
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
                  <p className={`text-sm mb-2 ${
                    achievement.earned ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                  {achievement.earned ? (
                    <div>
                      <Badge className="bg-accent-gold text-text-dark-gray mb-1">
                        Earned
                      </Badge>
                      {achievement.date && (
                        <p className="text-xs text-gray-600">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Progress value={achievement.progress} className="h-2 mb-2" />
                      <p className="text-xs text-gray-600">
                        {achievement.progress}% complete
                      </p>
                    </div>
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
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                💡 Opportunity
              </h4>
              <p className="text-blue-800">
                Your conversion rate has decreased by 2% compared to last year. Consider focusing on lead qualification 
                to improve the quality of prospects in your pipeline. Schedule more initial consultations to better assess client needs.
              </p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                <Star className="h-4 w-4 mr-2" />
                ✅ Strength
              </h4>
              <p className="text-green-800">
                Your placements at Sunrise Senior Living have increased by 25% this quarter. 
                Consider strengthening this partnership and asking for referrals to other facilities in their network.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                ⚠️ Watch
              </h4>
              <p className="text-yellow-800">
                December typically shows lower activity due to holidays. Plan your outreach strategy early and 
                focus on warm leads. Consider offering virtual tours to maintain momentum.
              </p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                🎯 Action Item
              </h4>
              <p className="text-purple-800">
                You're 3 placements away from your monthly goal. Focus on your 5 most qualified prospects 
                and schedule facility tours this week to accelerate the placement process.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceDashboard;
