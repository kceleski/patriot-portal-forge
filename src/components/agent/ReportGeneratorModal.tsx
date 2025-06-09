
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, BarChart3, Users } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportGeneratorModal = ({ isOpen, onClose }: ReportGeneratorModalProps) => {
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  const reportTypes = [
    { id: 'performance', label: 'Performance Report', icon: BarChart3 },
    { id: 'commission', label: 'Commission Report', icon: FileText },
    { id: 'client', label: 'Client Activity Report', icon: Users },
    { id: 'placement', label: 'Placement Report', icon: FileText }
  ];

  const metrics = [
    'Total Placements',
    'Commission Earned',
    'Conversion Rate',
    'Client Satisfaction',
    'Lead Sources',
    'Facility Performance',
    'Monthly Trends'
  ];

  const handleMetricChange = (metric: string, checked: boolean) => {
    if (checked) {
      setSelectedMetrics([...selectedMetrics, metric]);
    } else {
      setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
    }
  };

  const handleGenerateReport = async () => {
    setGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGenerating(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Generate Report
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-3 block">Report Type</label>
            <div className="grid grid-cols-2 gap-3">
              {reportTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <Card 
                    key={type.id}
                    className={`cursor-pointer transition-colors ${
                      reportType === type.id ? 'ring-2 ring-brand-sky' : ''
                    }`}
                    onClick={() => setReportType(type.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <IconComponent className="h-6 w-6 mx-auto mb-2 text-brand-sky" />
                      <p className="text-sm font-medium">{type.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">Date Range</label>
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">Include Metrics</label>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((metric) => (
                <div key={metric} className="flex items-center space-x-2">
                  <Checkbox
                    id={metric}
                    checked={selectedMetrics.includes(metric)}
                    onCheckedChange={(checked) => handleMetricChange(metric, checked as boolean)}
                  />
                  <label htmlFor={metric} className="text-sm">{metric}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleGenerateReport}
              disabled={!reportType || generating}
              className="bg-brand-sky hover:bg-blue-600"
            >
              {generating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
