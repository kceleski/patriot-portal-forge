
import React, { useState } from 'react';
import { useConversation } from '@elevenlabs/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, X, Mic, MicOff, Volume2, VolumeX, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

const ElevenLabsAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isVolumeEnabled, setIsVolumeEnabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Client tools that can manipulate the DOM and app state
  const clientTools = {
    // Navigation tools
    navigateToPage: (parameters: { page: string }) => {
      console.log('Navigating to:', parameters.page);
      navigate(parameters.page);
      toast.success(`Navigated to ${parameters.page}`);
      return `Successfully navigated to ${parameters.page}`;
    },

    // Search functionality
    performSearch: (parameters: { query: string, location?: string }) => {
      console.log('Performing search:', parameters);
      navigate(`/find-care?q=${encodeURIComponent(parameters.query)}&location=${encodeURIComponent(parameters.location || '')}`);
      toast.success(`Searching for ${parameters.query}`);
      return `Search initiated for ${parameters.query}`;
    },

    // DOM manipulation
    showToastMessage: (parameters: { message: string, type?: 'success' | 'error' | 'info' }) => {
      const { message, type = 'info' } = parameters;
      if (type === 'success') toast.success(message);
      else if (type === 'error') toast.error(message);
      else toast(message);
      return `Toast message displayed: ${message}`;
    },

    // Form completion assistance
    fillFormField: (parameters: { fieldId: string, value: string }) => {
      const element = document.getElementById(parameters.fieldId) as HTMLInputElement;
      if (element) {
        element.value = parameters.value;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        return `Filled field ${parameters.fieldId} with ${parameters.value}`;
      }
      return `Field ${parameters.fieldId} not found`;
    },

    // Scroll to section
    scrollToSection: (parameters: { sectionId: string }) => {
      const element = document.getElementById(parameters.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return `Scrolled to section ${parameters.sectionId}`;
      }
      return `Section ${parameters.sectionId} not found`;
    },

    // Click button or element
    clickElement: (parameters: { selector: string }) => {
      const element = document.querySelector(parameters.selector) as HTMLElement;
      if (element) {
        element.click();
        return `Clicked element ${parameters.selector}`;
      }
      return `Element ${parameters.selector} not found`;
    },

    // Get current page info
    getCurrentPageInfo: () => {
      return {
        currentPath: location.pathname,
        currentSearch: location.search,
        userLoggedIn: !!user,
        userType: user?.user_metadata?.user_type || 'guest'
      };
    },

    // Open modal or drawer
    openModal: (parameters: { modalType: string, data?: any }) => {
      console.log('Opening modal:', parameters);
      // This would trigger your modal state management
      toast.success(`Opening ${parameters.modalType} modal`);
      return `Opened ${parameters.modalType} modal`;
    }
  };

  const conversation = useConversation({
    onConnect: () => {
      console.log("AVA Agent connected");
      toast.success("AVA Assistant connected");
    },
    onMessage: (message) => {
      console.log("Message received:", message);
    },
    onError: (error) => {
      console.error("Conversation error:", error);
      toast.error("Connection error occurred");
    },
    onDisconnect: () => {
      console.log("AVA Agent disconnected");
      toast("AVA Assistant disconnected");
    },
    clientTools,
    overrides: {
      agent: {
        prompt: {
          prompt: `You are AVA, a helpful healthcare assistant for HealthProAssist. You can help users navigate the website, search for care facilities, fill out forms, and provide information about healthcare services. 
          
          Current context:
          - Current page: ${location.pathname}
          - User logged in: ${!!user}
          - User type: ${user?.user_metadata?.user_type || 'guest'}
          
          You have access to tools that can:
          - Navigate to different pages
          - Perform searches
          - Fill form fields
          - Show notifications
          - Scroll to sections
          - Click elements
          - Open modals
          
          Be helpful, conversational, and guide users through their healthcare journey.`
        },
        firstMessage: "Hi! I'm AVA, your healthcare assistant. I can help you navigate the site, search for care facilities, or answer questions about our services. What can I help you with today?",
        language: "en"
      }
    }
  });

  const { status, isSpeaking } = conversation;

  const startConversation = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: "R9M1zBEUj8fTGAij61wb"
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
      toast.error("Failed to start conversation. Please check microphone permissions.");
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error("Failed to end conversation:", error);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (conversation.setVolume) {
      conversation.setVolume({ volume: newVolume });
    }
  };

  const toggleVolume = () => {
    setIsVolumeEnabled(!isVolumeEnabled);
    handleVolumeChange(isVolumeEnabled ? 0 : 0.5);
  };

  return (
    <>
      {/* Floating AVA Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-brand-red hover:bg-red-600 shadow-lg relative"
          >
            <MessageSquare className="h-6 w-6 text-white" />
            {status === 'connected' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </Button>
          
          {/* AVA Badge */}
          <div className="absolute -top-2 -left-2 bg-brand-gold text-brand-navy text-xs font-bold px-2 py-1 rounded-full">
            AVA
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-brand-navy text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center">
                <span className="text-brand-navy font-bold text-sm">AVA</span>
              </div>
              <div>
                <h3 className="font-semibold">AVA Assistant</h3>
                <p className="text-xs opacity-75">
                  Status: {status} {isSpeaking ? '(Speaking...)' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVolume}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                {isVolumeEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
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

          {/* Content Area */}
          <div className="flex-1 p-4 flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Voice AI Assistant
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                I can help you navigate, search for care, and complete forms using voice commands
              </p>
            </div>

            {/* Microphone Status Indicator */}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              status === 'connected' ? 
                (isSpeaking ? 'bg-red-100 animate-pulse' : 'bg-green-100') : 
                'bg-gray-100'
            }`}>
              {status === 'connected' ? (
                <Mic className={`h-8 w-8 transition-colors duration-300 ${
                  isSpeaking ? 'text-red-500' : 'text-green-600'
                }`} />
              ) : (
                <MicOff className="h-8 w-8 text-gray-400" />
              )}
            </div>

            {/* Status Text */}
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                {status === 'connected' ? 
                  (isSpeaking ? 'AVA is speaking...' : 'Listening for commands...') : 
                  'Ready to connect'
                }
              </p>
              {status === 'connected' && (
                <p className="text-xs text-gray-500 mt-1">
                  Try: "Navigate to find care" or "Search for memory care"
                </p>
              )}
            </div>

            {/* Volume Control */}
            {status === 'connected' && (
              <div className="w-full">
                <label className="text-xs text-gray-600 mb-2 block">Volume</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              {status !== 'connected' ? (
                <Button
                  onClick={startConversation}
                  className="flex-1 bg-brand-sky hover:bg-blue-600"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Start Voice Chat
                </Button>
              ) : (
                <Button
                  onClick={endConversation}
                  variant="destructive"
                  className="flex-1"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  End Chat
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ElevenLabsAgent;
