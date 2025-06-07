import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, Send, Paperclip, Search, Phone, Video } from 'lucide-react';
// import { ApiService } from '@/services/apiService'; // Uncomment when ready
// import { useApi } from '@/hooks/useApi'; // Uncomment when ready

const SecureMessaging: React.FC = () => {
  const { profile } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]); // To be filled by API
  const [loading, setLoading] = useState(true);

  // useEffect to fetch messages when component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      // TODO: Implement ApiService.getMessages() and call it here
      // const result = await getMessages(profile.id);
      // setMessages(result.messages);
      console.log("Fetching messages...");
      setLoading(false);
    };

    if (profile?.id) {
      // fetchMessages();
    }
  }, [profile]);


  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    console.log('Sending message:', newMessage);
    // TODO: Implement ApiService.sendMessage(newMessage)
    setNewMessage('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="senior-heading">Secure Messages</h1>
        <p className="senior-text">Communicate safely with your care team</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Messages would be rendered here from state */}
          {messages.length === 0 && !loading && (
            <Card className="senior-card text-center p-12">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No messages yet</h3>
              <p className="text-gray-600">Start a new conversation to see it here.</p>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="senior-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2"><Send className="w-5 h-5" /><span>New Message</span></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">To: Your Care Team</label></div>
              <div>
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={6}
                  className="text-senior-base resize-none"
                />
              </div>
              <Button onClick={handleSendMessage} className="w-full senior-button bg-senior-500 hover:bg-senior-600 text-white" disabled={!newMessage.trim()}>
                <Send className="w-4 h-4 mr-2" />Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecureMessaging;
