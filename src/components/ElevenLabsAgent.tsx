import React, { useState } from 'react';
import { useConversation } from '@elevenlabs/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Volume2, VolumeX, Phone, Settings } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import AvatarDisplay from './AvatarDisplay';
import FloatingAvatarButton from './FloatingAvatarButton';
import { voiceCommandService } from '@/services/voiceCommandService';

const ElevenLabsAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isVolumeEnabled, setIsVolumeEnabled] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState('9BWtsMINqrJLrRacOk9x'); // Default to Aria
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Voice options with ElevenLabs voice IDs
  const voiceOptions = [
    { id: 'tnSpp4vdxKPjI9w0GnoV', name: 'Hope', description: 'Friendly and professional' },
    { id: 'tnSpp4vdxKPjI9w0GnoV', name: 'Liam', description: 'Clear and confident' },
    { id: 'cgSgspJ2msm6clMCkdW9', name: 'Charlotte', description: 'Warm and helpful' },
    { id: 'SAz9YHcvj6GT2YYXdXww', name: 'River', description: 'Calm and reassuring' },
    { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', description: 'Authoritative and clear' }
  ];

  // Enhanced client tools that can manipulate the DOM and app state
  const clientTools = {
    // Navigation tools - updated to match ElevenLabs parameter name
    navigateToPage: (parameters: { page_name: string }) => {
      console.log('🚀 Navigating to:', parameters.page_name);
      try {
        navigate(parameters.page_name);
        voiceCommandService.showSuccess(`Navigated to ${parameters.page_name}`);
        return `Successfully navigated to ${parameters.page_name}`;
      } catch (error) {
        voiceCommandService.showError(`Failed to navigate to ${parameters.page_name}`);
        return `Failed to navigate to ${parameters.page_name}`;
      }
    },

    // Enhanced search functionality
    performSearch: (parameters: { query: string, location?: string }) => {
      console.log('🔍 Performing search:', parameters);
      try {
        const searchUrl = `/find-care?q=${encodeURIComponent(parameters.query)}&location=${encodeURIComponent(parameters.location || '')}`;
        navigate(searchUrl);
        voiceCommandService.showSuccess(`Searching for ${parameters.query}`);
        return `Search initiated for ${parameters.query} in ${parameters.location || 'current area'}`;
      } catch (error) {
        voiceCommandService.showError('Failed to perform search');
        return `Failed to search for ${parameters.query}`;
      }
    },

    // DOM manipulation with voice service integration
    clickElement: (parameters: { text?: string, selector?: string }) => {
      console.log('👆 Clicking element:', parameters);
      
      if (parameters.text) {
        const success = voiceCommandService.clickElementByText(parameters.text);
        if (success) {
          voiceCommandService.showSuccess(`Clicked on "${parameters.text}"`);
          return `Successfully clicked on element containing "${parameters.text}"`;
        } else {
          voiceCommandService.showError(`Could not find clickable element with text "${parameters.text}"`);
          return `Element with text "${parameters.text}" not found`;
        }
      }
      
      if (parameters.selector) {
        const element = document.querySelector(parameters.selector) as HTMLElement;
        if (element) {
          element.click();
          voiceCommandService.showSuccess(`Clicked element with selector "${parameters.selector}"`);
          return `Successfully clicked element with selector "${parameters.selector}"`;
        } else {
          voiceCommandService.showError(`Element with selector "${parameters.selector}" not found`);
          return `Element with selector "${parameters.selector}" not found`;
        }
      }
      
      return 'No valid selector or text provided';
    },

    // Form completion assistance
    fillFormField: (parameters: { label: string, value: string }) => {
      console.log('📝 Filling form field:', parameters);
      const success = voiceCommandService.fillFormByLabel(parameters.label, parameters.value);
      if (success) {
        voiceCommandService.showSuccess(`Filled "${parameters.label}" with "${parameters.value}"`);
        return `Successfully filled field "${parameters.label}" with "${parameters.value}"`;
      } else {
        voiceCommandService.showError(`Could not find form field labeled "${parameters.label}"`);
        return `Form field "${parameters.label}" not found`;
      }
    },

    // Enhanced scroll functionality
    scrollToSection: (parameters: { sectionId?: string, text?: string }) => {
      console.log('📜 Scrolling to section:', parameters);
      
      if (parameters.text) {
        const success = voiceCommandService.scrollToElementByText(parameters.text);
        if (success) {
          return `Scrolled to section containing "${parameters.text}"`;
        } else {
          return `Section with text "${parameters.text}" not found`;
        }
      }
      
      if (parameters.sectionId) {
        const element = document.getElementById(parameters.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          voiceCommandService.highlightElement(`#${parameters.sectionId}`, 2000);
          return `Scrolled to section "${parameters.sectionId}"`;
        } else {
          return `Section "${parameters.sectionId}" not found`;
        }
      }
      
      return 'No valid section identifier provided';
    },

    // Get comprehensive page info
    getCurrentPageInfo: (parameters: any) => {
      const pageInfo = voiceCommandService.getPageContext();
      const contextInfo = {
        ...pageInfo,
        userLoggedIn: !!user,
        userType: user?.user_metadata?.user_type || 'guest',
        currentPath: location.pathname,
        currentSearch: location.search
      };
      console.log('📄 Page context:', contextInfo);
      return `Current page info: ${JSON.stringify(contextInfo)}`;
    },

    // Show notifications
    showNotification: (parameters: { message: string, type?: 'success' | 'error' | 'info' }) => {
      const { message, type = 'info' } = parameters;
      console.log('🔔 Showing notification:', { message, type });
      
      if (type === 'success') voiceCommandService.showSuccess(message);
      else if (type === 'error') voiceCommandService.showError(message);
      else voiceCommandService.showInfo(message);
      
      return `Notification displayed: ${message}`;
    },

    // Perform search on current page
    searchOnPage: (parameters: { query: string }) => {
      console.log('🔍 Searching on page:', parameters);
      const results = voiceCommandService.performSearchOnPage(parameters.query);
      if (results.length > 0) {
        voiceCommandService.showSuccess(`Found ${results.length} search results for "${parameters.query}"`);
        return `Found ${results.length} search results on page for "${parameters.query}"`;
      } else {
        voiceCommandService.showInfo(`No search inputs found on this page for "${parameters.query}"`);
        return `No search functionality found on current page`;
      }
    },

    // Get available interactive elements
    getPageElements: (parameters: any) => {
      const context = voiceCommandService.getPageContext();
      const summary = {
        buttons: context.buttons.slice(0, 10), // Limit to first 10
        links: context.links.slice(0, 10).map((link: any) => link.text),
        forms: context.forms.length,
        currentUrl: context.url
      };
      return `Page elements: ${JSON.stringify(summary)}`;
    }
  };

  const conversation = useConversation({
    onConnect: () => {
      console.log("AVA Agent connected");
      voiceCommandService.showSuccess("AVA Assistant connected and ready to help!");
    },
    onMessage: (message) => {
      console.log("Message received:", message);
    },
    onError: (error) => {
      console.error("Conversation error:", error);
      voiceCommandService.showError("Connection error occurred");
    },
    onDisconnect: () => {
      console.log("AVA Agent disconnected");
      toast("AVA Assistant disconnected");
    },
    clientTools,
    overrides: {
      agent: {
        prompt: {
          prompt: `You are AVA, an intelligent healthcare assistant for HealthProAssist. You have powerful capabilities to help users navigate the website, search for care facilities, fill out forms, and interact with page elements.

CURRENT CONTEXT:
- Page: ${location.pathname}
- User: ${!!user ? 'Logged in' : 'Not logged in'}
- User Type: ${user?.user_metadata?.user_type || 'guest'}

YOUR CAPABILITIES:
1. NAVIGATION: Use navigateToPage() to move between pages like "/find-care", "/dashboard", "/calendar"
2. SEARCH: Use performSearch() to search for facilities with query and location
3. DOM INTERACTION: Use clickElement() to click buttons/links by text or selector
4. FORM FILLING: Use fillFormField() to complete forms by field label
5. PAGE ANALYSIS: Use getCurrentPageInfo() and getPageElements() to understand the page
6. SCROLLING: Use scrollToSection() to navigate to page sections
7. NOTIFICATIONS: Use showNotification() to give user feedback

WORKFLOW EXAMPLES:
- "Find memory care in Phoenix" → performSearch({query: "memory care", location: "Phoenix"})
- "Click the login button" → clickElement({text: "login"})
- "Fill my name as John Smith" → fillFormField({label: "name", value: "John Smith"})
- "Go to my dashboard" → navigateToPage({page_name: "/dashboard"})

Always use your tools to actually perform actions, don't just describe what you would do. Be helpful, conversational, and proactive in using your capabilities to assist users with their healthcare journey.`
        },
        firstMessage: "Hi! I'm AVA, your intelligent healthcare assistant. I can help you navigate the site, search for care facilities, fill out forms, and interact with page elements using voice commands. What would you like me to help you with today?",
        language: "en"
      },
      tts: {
        voiceId: selectedVoice
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
      voiceCommandService.showError("Failed to start conversation. Please check microphone permissions.");
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

  const handleVoiceChange = (voiceId: string) => {
    setSelectedVoice(voiceId);
    const selectedVoiceName = voiceOptions.find(v => v.id === voiceId)?.name || 'Selected voice';
    voiceCommandService.showInfo(`Voice changed to ${selectedVoiceName}`);
  };

  return (
    <>
      {/* Floating AVA Button */}
      {!isOpen && (
        <FloatingAvatarButton 
          onClick={() => setIsOpen(true)}
          status={status}
          isSpeaking={isSpeaking}
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 flex flex-col backdrop-blur-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-navy to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AvatarDisplay 
                status={status} 
                isSpeaking={isSpeaking} 
                size="small"
              />
              <div>
                <h3 className="font-semibold">AVA Assistant</h3>
                <p className="text-xs opacity-75">
                  {status === 'connected' 
                    ? (isSpeaking ? 'Speaking...' : 'Listening...') 
                    : 'Ready to connect'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <Settings className="h-4 w-4" />
              </Button>
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
            {/* Settings Panel */}
            {showSettings && (
              <div className="w-full bg-gray-50 p-3 rounded-lg space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Voice Selection</label>
                  <Select value={selectedVoice} onValueChange={handleVoiceChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {voiceOptions.map((voice) => (
                        <SelectItem key={voice.id} value={voice.id}>
                          <div>
                            <div className="font-medium">{voice.name}</div>
                            <div className="text-xs text-gray-500">{voice.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Intelligent Voice AI Assistant
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                I can navigate pages, search for care, fill forms, and interact with page elements using voice commands
              </p>
            </div>

            {/* Large animated avatar */}
            <AvatarDisplay 
              status={status} 
              isSpeaking={isSpeaking} 
              size="large"
            />

            {/* Status Text */}
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                {status === 'connected' ? 
                  (isSpeaking ? 'AVA is speaking...' : 'Listening for commands...') : 
                  'Ready to connect'
                }
              </p>
              {status === 'connected' && (
                <div className="text-xs text-gray-500 mt-2 space-y-1">
                  <p>Try: "Navigate to find care" or "Search for memory care"</p>
                  <p>"Click the login button" or "Fill my name as John"</p>
                </div>
              )}
            </div>

            {/* Volume Control */}
            {status === 'connected' && !showSettings && (
              <div className="w-full">
                <label className="text-xs text-gray-600 mb-2 block">Volume</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                  className="flex-1 bg-gradient-to-r from-brand-sky to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Start Voice Chat
                </Button>
              ) : (
                <Button
                  onClick={endConversation}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg"
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
