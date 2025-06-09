
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Send, Search, Filter, Star, Paperclip, Users, Building2, FileText, Download } from 'lucide-react';

interface Message {
  id: string;
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  type: 'client' | 'facility' | 'system';
  attachments?: string[];
}

interface Facility {
  id: string;
  name: string;
  location: string;
  priceRange: string;
  rating: number;
  availableBeds: number;
  careTypes: string[];
}

const InboxMessaging: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      from: 'sarah.johnson@sunsetsenior.com',
      subject: 'New Availability - Memory Care Unit',
      preview: 'We have a new opening in our memory care unit that might be perfect for your client...',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      isStarred: true,
      type: 'facility'
    },
    {
      id: '2',
      from: 'Robert Martinez',
      subject: 'Tour Request for January 20th',
      preview: 'Hi, I would like to schedule a tour for my mother this Saturday...',
      timestamp: '2024-01-15T09:15:00Z',
      isRead: true,
      isStarred: false,
      type: 'client'
    },
    {
      id: '3',
      from: 'HealthProAssist System',
      subject: 'Monthly Commission Statement',
      preview: 'Your commission statement for December 2023 is ready for review...',
      timestamp: '2024-01-14T16:00:00Z',
      isRead: true,
      isStarred: false,
      type: 'system',
      attachments: ['December_Commission_Statement.pdf']
    }
  ]);

  const [facilities] = useState<Facility[]>([
    {
      id: '1',
      name: 'Sunset Senior Living',
      location: 'Los Angeles, CA',
      priceRange: '$3,500 - $5,200',
      rating: 4.8,
      availableBeds: 3,
      careTypes: ['Assisted Living', 'Memory Care']
    },
    {
      id: '2',
      name: 'Golden Years Care Center',
      location: 'Beverly Hills, CA',
      priceRange: '$4,200 - $6,800',
      rating: 4.6,
      availableBeds: 1,
      careTypes: ['Memory Care', 'Specialized Care']
    },
    {
      id: '3',
      name: 'Pacific View Assisted Living',
      location: 'Santa Monica, CA',
      priceRange: '$3,000 - $4,500',
      rating: 4.7,
      availableBeds: 5,
      careTypes: ['Assisted Living', 'Independent Living']
    }
  ]);

  const handleCompare = () => {
    if (selectedFacilities.length < 2) {
      alert('Please select at least 2 facilities to compare');
      return;
    }

    // Generate comparison document
    const selectedFacilityData = facilities.filter(f => selectedFacilities.includes(f.id));
    generateComparisonEmail(selectedFacilityData);
  };

  const generateComparisonEmail = (facilitiesToCompare: Facility[]) => {
    const comparisonData = {
      subject: `Facility Comparison - ${facilitiesToCompare.length} Options`,
      body: `
        Dear Client,

        Based on your requirements, I've prepared a comparison of ${facilitiesToCompare.length} facilities that match your needs:

        ${facilitiesToCompare.map((facility, index) => `
        ${index + 1}. ${facility.name}
        Location: ${facility.location}
        Price Range: ${facility.priceRange}
        Rating: ${facility.rating}/5.0
        Available Beds: ${facility.availableBeds}
        Care Types: ${facility.careTypes.join(', ')}
        `).join('\n')}

        I'd be happy to schedule tours at any of these facilities that interest you. Please let me know which ones you'd like to visit.

        Best regards,
        [Your Name]
        HealthProAssist Placement Specialist
        [Your Phone] | [Your Email]
      `,
      recipients: '',
      facilities: facilitiesToCompare
    };

    // In a real implementation, this would open an email client or send via API
    console.log('Generated comparison email:', comparisonData);
    setIsCompareModalOpen(false);
    setSelectedFacilities([]);
  };

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'client': return <Users className="h-4 w-4" />;
      case 'facility': return <Building2 className="h-4 w-4" />;
      case 'system': return <FileText className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'client': return 'bg-blue-100 text-blue-800';
      case 'facility': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-brand-navy mb-2">Inbox & Messaging</h1>
            <p className="text-gray-600 text-lg">Manage communications and facility comparisons</p>
          </div>
          
          <div className="flex space-x-3">
            <Dialog open={isCompareModalOpen} onOpenChange={setIsCompareModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-brand-gold hover:bg-yellow-500 text-brand-navy">
                  <Users className="h-4 w-4 mr-2" />
                  Compare Facilities
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Compare Facilities</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-600">Select facilities to generate a comparison document for your client:</p>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {facilities.map((facility) => (
                      <div key={facility.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          checked={selectedFacilities.includes(facility.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFacilities([...selectedFacilities, facility.id]);
                            } else {
                              setSelectedFacilities(selectedFacilities.filter(id => id !== facility.id));
                            }
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{facility.name}</h4>
                          <p className="text-sm text-gray-600">{facility.location} • {facility.priceRange}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs">{facility.rating}</span>
                            <span className="text-xs text-gray-500">• {facility.availableBeds} available</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      {selectedFacilities.length} facilities selected
                    </p>
                    <Button 
                      onClick={handleCompare}
                      disabled={selectedFacilities.length < 2}
                      className="bg-brand-sky hover:bg-blue-600"
                    >
                      Generate Comparison
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button className="bg-brand-sky hover:bg-blue-600">
              <Send className="h-4 w-4 mr-2" />
              Compose
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Messages ({filteredMessages.length})</CardTitle>
                  <Button size="sm" variant="outline">
                    <Filter className="h-3 w-3" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                        !message.isRead ? 'bg-blue-50' : ''
                      } ${selectedMessage?.id === message.id ? 'bg-blue-100' : ''}`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            {getMessageIcon(message.type)}
                            <Badge className={getMessageTypeColor(message.type)}>
                              {message.type}
                            </Badge>
                            {message.isStarred && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                            {message.attachments && <Paperclip className="h-3 w-3 text-gray-400" />}
                          </div>
                          <p className={`font-medium text-sm truncate ${!message.isRead ? 'font-bold' : ''}`}>
                            {message.from}
                          </p>
                          <p className="text-sm text-gray-900 truncate">{message.subject}</p>
                          <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                        </div>
                        <div className="text-xs text-gray-500 ml-2">
                          {new Date(message.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Content */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{selectedMessage.subject}</CardTitle>
                      <p className="text-gray-600 mt-1">From: {selectedMessage.from}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(selectedMessage.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Star className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        Reply
                      </Button>
                      <Button size="sm" variant="outline">
                        Forward
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedMessage.attachments && (
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-medium text-sm">Attachments:</p>
                        {selectedMessage.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center space-x-2 mt-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{attachment}</span>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="prose max-w-none">
                      <p>{selectedMessage.preview}</p>
                      {/* In a real implementation, this would show the full message content */}
                      <p className="text-gray-600 mt-4">
                        [Full message content would be displayed here...]
                      </p>
                    </div>
                    
                    <div className="flex space-x-3 pt-4 border-t">
                      <Button className="bg-brand-sky hover:bg-blue-600">
                        <Send className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline">Forward</Button>
                      <Button variant="outline">Archive</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Mail className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Select a message to view its content</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxMessaging;
