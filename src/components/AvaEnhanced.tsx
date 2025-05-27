
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Send, Mic, MicOff, Phone, Video, Volume2, VolumeX } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ApiService } from '@/services/apiService';
import { useApi } from '@/hooks/useApi';
import { useNavigate } from 'react-router-dom';

// Enhanced AVA with voice-to-map functionality
const AvaEnhanced = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm AVA, your AI Care Assistant. I can help you search for facilities using voice commands. Try saying 'Show me memory care facilities in Phoenix that accept VA benefits'!",
      sender: 'ava',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const { execute: sendMessage, loading: isLoading } = useApi(
    ApiService.avaAssistant,
    { showErrorToast: true }
  );

  const { execute: synthesizeVoice } = useApi(
    ApiService.voiceSynthesis,
    { showErrorToast: false }
  );

  const { execute: searchFacilities } = useApi(
    ApiService.searchFacilities,
    { showErrorToast: false }
  );

  const playAudioResponse = async (text: string) => {
    if (!voiceEnabled || !text) return;
    
    try {
      setIsSpeaking(true);
      const data = await synthesizeVoice(text);

      if (data?.audioContent) {
        const audioBlob = new Blob([Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };
        
        await audio.play();
      }
    } catch (error) {
      console.error('Voice synthesis error:', error);
      setIsSpeaking(false);
    }
  };

  const processVoiceSearch = (searchText: string) => {
    // Extract search parameters from voice input
    const params: any = {};
    
    // Extract location
    const locationMatch = searchText.match(/in\s+([^,\s]+(?:\s+[^,\s]+)*)/i);
    if (locationMatch) {
      params.location = locationMatch[1];
    }
    
    // Extract care type
    if (searchText.toLowerCase().includes('memory care')) {
      params.care_type = 'Memory Care';
    } else if (searchText.toLowerCase().includes('assisted living')) {
      params.care_type = 'Assisted Living';
    } else if (searchText.toLowerCase().includes('skilled nursing')) {
      params.care_type = 'Skilled Nursing';
    }
    
    // Extract VA benefits
    if (searchText.toLowerCase().includes('va benefits') || searchText.toLowerCase().includes('veteran')) {
      // This would be handled in the filtering logic
    }
    
    return params;
  };

  const handleVoiceSearch = async (searchText: string) => {
    try {
      const searchParams = processVoiceSearch(searchText);
      console.log('Voice search parameters:', searchParams);
      
      // Perform the search
      const results = await searchFacilities(searchParams);
      
      if (results?.facilities) {
        const count = results.facilities.length;
        const location = searchParams.location || 'your area';
        const careType = searchParams.care_type || 'care facilities';
        
        let responseText = '';
        if (count > 0) {
          responseText = `I found ${count} ${careType.toLowerCase()} in ${location}. I'm updating the map to show these results for you now.`;
          
          // Navigate to map page with search results
          navigate('/facilities/map', { 
            state: { 
              searchResults: results.facilities,
              searchParams: searchParams 
            }
          });
        } else {
          responseText = `I didn't find any ${careType.toLowerCase()} matching your criteria in ${location}. Would you like me to broaden the search?`;
        }
        
        // Add response to chat
        const avaResponse = {
          id: messages.length + 2,
          text: responseText,
          sender: 'ava',
          timestamp: new Date().toLocaleTimeString()
        };
        
        setMessages(prev => [...prev, avaResponse]);
        
        // Play voice response
        await playAudioResponse(responseText);
      }
    } catch (error) {
      console.error('Voice search error:', error);
      const errorResponse = {
        id: messages.length + 2,
        text: "I'm having trouble processing that search right now. Please try again or use the search filters directly.",
        sender: 'ava',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorResponse]);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage('');

    // Check if this is a voice search command
    const isSearchCommand = currentMessage.toLowerCase().includes('show me') ||
                           currentMessage.toLowerCase().includes('find') ||
                           currentMessage.toLowerCase().includes('search for');

    if (isSearchCommand) {
      await handleVoiceSearch(currentMessage);
      return;
    }

    try {
      const assistantType = profile?.user_type === 'healthcare' ? 'healthcare_professional' :
                           profile?.user_type === 'agent' ? 'placement_agent' :
                           profile?.user_type === 'facility' ? 'facility_administrator' :
                           'end_user';

      const data = await sendMessage('chat', {
        assistant_type: assistantType,
        message: currentMessage,
        conversation_id: conversationId
      });

      if (data) {
        const avaResponse = {
          id: messages.length + 2,
          text: data.response,
          sender: 'ava',
          timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, avaResponse]);
        setConversationId(data.conversation_id);

        // Play voice response
        await playAudioResponse(data.response);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = {
        id: messages.length + 2,
        text: "I apologize, but I'm having trouble responding right now. Please try again.",
        sender: 'ava',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorResponse]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoice = async () => {
    if (!isListening) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setMessage(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } else {
        console.warn('Speech recognition not supported in this browser');
      }
    } else {
      setIsListening(false);
    }
  };

  return (
    <>
      {/* Floating AVA Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-primary-red hover:bg-red-600 shadow-lg animate-pulse"
          >
            <MessageSquare className="h-6 w-6 text-white" />
          </Button>
          
          {/* AVA Badge */}
          <div className="absolute -top-2 -left-2 bg-accent-gold text-text-dark-gray text-xs font-bold px-2 py-1 rounded-full">
            AVA
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 flex flex-col animate-slide-in-right">
          {/* Header */}
          <div className="bg-primary-navy text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center">
                <span className="text-text-dark-gray font-bold text-sm">AVA</span>
              </div>
              <div>
                <h3 className="font-semibold">AVA Assistant</h3>
                <p className="text-xs opacity-75">
                  {isSpeaking ? 'Speaking...' : user ? `${profile?.user_type || 'Care'} Specialist` : 'AI Care Specialist'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <Video className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-primary-sky text-white'
                      : 'bg-secondary-off-white text-text-dark-gray'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-sky-100' : 'text-gray-500'
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary-off-white text-text-dark-gray max-w-xs px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setMessage('Show me assisted living facilities near me')}
              >
                Find Facilities
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setMessage('Find memory care in Phoenix')}
              >
                Memory Care
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setMessage('Show facilities that accept VA benefits')}
              >
                VA Benefits
              </Button>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me to find facilities or type your message..."
                  className="w-full p-3 pr-12 border border-gray-300 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-primary-sky"
                  rows={1}
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleVoice}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
                    isListening ? 'text-primary-red' : 'text-gray-400'
                  }`}
                  disabled={isLoading}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading}
                className="bg-primary-sky hover:bg-blue-600 rounded-full h-10 w-10 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Voice Indicator */}
            {isListening && (
              <div className="mt-2 flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-primary-red rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary-red rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary-red rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <span className="text-xs text-gray-500 ml-2">Listening for search command...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AvaEnhanced;
