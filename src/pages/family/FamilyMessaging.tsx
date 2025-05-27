
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';

const FamilyMessaging = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sunrise Senior Living',
      lastMessage: 'We have an update on the care assessment...',
      time: '2:30 PM',
      unread: 2,
      avatar: 'SS',
      online: true
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      lastMessage: 'The medical records have been reviewed.',
      time: '11:45 AM',
      unread: 0,
      avatar: 'SJ',
      online: false
    },
    {
      id: 3,
      name: 'Mike Thompson (Agent)',
      lastMessage: 'I found three facilities that match your criteria.',
      time: 'Yesterday',
      unread: 1,
      avatar: 'MT',
      online: true
    },
    {
      id: 4,
      name: 'Maria Rodriguez (Coordinator)',
      lastMessage: 'Thank you for providing the additional information.',
      time: 'Yesterday',
      unread: 0,
      avatar: 'MR',
      online: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sunrise Senior Living',
      content: 'Hello! We wanted to update you on the care assessment scheduled for next week.',
      time: '2:15 PM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Thank you for the update. What should we expect during the assessment?',
      time: '2:18 PM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Sunrise Senior Living',
      content: 'The assessment will include a comprehensive review of care needs, a tour of our facilities, and a discussion of our service options. It typically takes about 2 hours.',
      time: '2:20 PM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'You',
      content: 'That sounds perfect. Should we bring any specific documents?',
      time: '2:25 PM',
      isOwn: true
    },
    {
      id: 5,
      sender: 'Sunrise Senior Living',
      content: 'Yes, please bring medical records, insurance information, and any current care plans. We have sent you a detailed checklist via email.',
      time: '2:30 PM',
      isOwn: false
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-dark-gray">Secure Messaging</h1>
        <p className="text-gray-600 mt-2">Communicate securely with your care team and facilities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedConversation === conversation.id ? 'bg-primary-sky/10' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-primary-navy text-white">
                          {conversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-text-dark-gray truncate">
                          {conversation.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-gray-500">{conversation.time}</p>
                          {conversation.unread > 0 && (
                            <Badge className="bg-primary-red text-white">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConv && (
            <>
              {/* Message Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary-navy text-white">
                        {selectedConv.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-text-dark-gray">{selectedConv.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedConv.online ? 'Online now' : 'Last seen 2 hours ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-primary-sky text-white'
                            : 'bg-gray-100 text-text-dark-gray'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isOwn ? 'text-sky-100' : 'text-gray-500'
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-primary-sky hover:bg-blue-600">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FamilyMessaging;
