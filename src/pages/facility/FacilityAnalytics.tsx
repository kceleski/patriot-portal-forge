
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, DollarSign, Eye, Download, Calendar, BarChart } from 'lucide-react';

const FacilityAnalytics = () => {
  const overviewMetrics = {
    totalViews: 12450,
    viewsChange: '+15%',
    inquiries: 245,
    inquiriesChange: '+8%',
    tours: 156,
    toursChange: '+22%',
    conversions: 78,
    conversionsChange: '+12%'
  };

  const monthlyData = [
    { month: 'Jan', views: 980, inquiries: 24, tours: 18, admissions: 8 },
    { month: 'Feb', views: 1120, inquiries: 28, tours: 22, admissions: 10 },
    { month: 'Mar', views: 1350, inquiries: 32, tours: 25, admissions: 12 },
    { month: 'Apr', views: 1180, inquiries: 29, tours: 20, admissions: 9 },
    { month: 'May', views: 1420, inquiries: 35, tours: 28, admissions: 14 },
    { month: 'Jun', views: 1580, inquiries: 38, tours: 30, admissions: 15 }
  ];

  const leadSources = [
    { source: 'CareConnect Network', leads: 89, percentage: 36, trend: '+12%' },
    { source: 'Google Search', leads: 67, percentage: 27, trend: '+8%' },
    { source: 'Referrals', leads: 45, percentage: 18, trend: '+15%' },
    { source: 'Social Media', leads: 28, percentage: 11, trend: '+5%' },
    { source: 'Direct Website', leads: 16, percentage: 8, trend: '+3%' }
  ];

  const demographicData = [
    { ageGroup: '65-74', percentage: 25, count: 33 },
    { ageGroup: '75-84', percentage: 45, count: 59 },
    { ageGroup: '85+', percentage: 30, count: 40 }
  ];

  const competitorData = [
    { name: 'Golden Years Memory Care', occupancy: 95, avgPrice: '$5,800', rating: 4.6 },
    { name: 'Peaceful Valley AL', occupancy: 88, avgPrice: '$4,200', rating: 4.7 },
    { name: 'Oakwood Senior Community', occupancy: 82, avgPrice: '$6,500', rating: 4.5 }
  ];

  const revenueMetrics = {
    monthlyRevenue: 485000,
    revenueChange: '+8%',
    averageRate: 5200,
    rateChange: '+3%',
    occupancyRate: 88,
    occupancyChange: '+2%'
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive analytics for your facility performance and market insights.</p>
        </div>
        <div className="flex space-x-3">
          <Select defaultValue="30days">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-primary-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{overviewMetrics.totalViews.toLocaleString()}</p>
                <p className="text-gray-600">Total Views</p>
                <p className="text-sm text-green-600">{overviewMetrics.viewsChange} vs last period</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-accent-gold" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{overviewMetrics.inquiries}</p>
                <p className="text-gray-600">Inquiries</p>
                <p className="text-sm text-green-600">{overviewMetrics.inquiriesChange} vs last period</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-primary-red" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{overviewMetrics.tours}</p>
                <p className="text-gray-600">Tours Scheduled</p>
                <p className="text-sm text-green-600">{overviewMetrics.toursChange} vs last period</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-primary-navy" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{overviewMetrics.conversions}</p>
                <p className="text-gray-600">Conversions</p>
                <p className="text-sm text-green-600">{overviewMetrics.conversionsChange} vs last period</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Monthly Performance Trend
            </CardTitle>
            <CardDescription>Key metrics over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((month, index) => (
                <div key={month.month} className="grid grid-cols-5 gap-4 items-center">
                  <div className="font-medium">{month.month}</div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary-sky">{month.views}</div>
                    <div className="text-xs text-gray-500">views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-accent-gold">{month.inquiries}</div>
                    <div className="text-xs text-gray-500">inquiries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary-red">{month.tours}</div>
                    <div className="text-xs text-gray-500">tours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary-navy">{month.admissions}</div>
                    <div className="text-xs text-gray-500">admissions</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Where your inquiries are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadSources.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{source.source}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold">{source.leads}</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {source.trend}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-sky h-2 rounded-full" 
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">{source.percentage}% of total leads</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Revenue Analytics
          </CardTitle>
          <CardDescription>Financial performance and occupancy metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-red mb-2">
                ${revenueMetrics.monthlyRevenue.toLocaleString()}
              </div>
              <div className="text-gray-600 mb-1">Monthly Revenue</div>
              <Badge className="bg-green-100 text-green-800">
                {revenueMetrics.revenueChange} vs last month
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-gold mb-2">
                ${revenueMetrics.averageRate.toLocaleString()}
              </div>
              <div className="text-gray-600 mb-1">Average Monthly Rate</div>
              <Badge className="bg-green-100 text-green-800">
                {revenueMetrics.rateChange} vs last month
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-sky mb-2">
                {revenueMetrics.occupancyRate}%
              </div>
              <div className="text-gray-600 mb-1">Occupancy Rate</div>
              <Badge className="bg-green-100 text-green-800">
                {revenueMetrics.occupancyChange} vs last month
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Resident Demographics</CardTitle>
            <CardDescription>Age distribution of current residents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demographicData.map((demo, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{demo.ageGroup} years</span>
                    <span className="text-sm font-bold">{demo.count} residents</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-navy h-2 rounded-full" 
                      style={{ width: `${demo.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">{demo.percentage}% of residents</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Competitor Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Competitor Analysis</CardTitle>
            <CardDescription>How you compare to nearby facilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitorData.map((competitor, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-text-dark-gray mb-2">{competitor.name}</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Occupancy:</span>
                      <div className="font-semibold">{competitor.occupancy}%</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Avg Price:</span>
                      <div className="font-semibold">{competitor.avgPrice}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Rating:</span>
                      <div className="font-semibold">{competitor.rating}/5</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-secondary-off-white rounded-lg">
              <h4 className="font-semibold text-text-dark-gray mb-1">Your Position</h4>
              <p className="text-sm text-gray-700">
                You rank #2 in occupancy rate and #1 in customer satisfaction in your area.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>AI-powered recommendations based on your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Opportunity</h4>
              <p className="text-blue-800">
                Your inquiry-to-tour conversion rate is 15% higher than the industry average. 
                Consider increasing your marketing budget on CareConnect Network where you see the highest engagement.
              </p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">✅ Strength</h4>
              <p className="text-green-800">
                Your tour-to-admission conversion rate of 65% is exceptional. Your facility tour experience 
                is clearly resonating with prospective residents and families.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Watch</h4>
              <p className="text-yellow-800">
                Social media leads have the lowest conversion rate. Consider reviewing your social media content 
                strategy to better attract qualified prospects.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacilityAnalytics;
