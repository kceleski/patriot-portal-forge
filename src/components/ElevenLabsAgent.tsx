
import React, { useState, useEffect, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { MessageCircle, Minimize2, Maximize2, Volume2, VolumeX, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface TranscriptEntry {
  timestamp: string;
  type: 'user' | 'agent' | 'tool' | 'system';
  content: string;
  toolName?: string;
}

const ElevenLabsAgent = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [lastToolUsed, setLastToolUsed] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Auto-minimize after DOM manipulation tools
  const domManipulationTools = ['navigateToPage', 'clickElement', 'fillFormField', 'performSearch', 'scrollToSection'];

  useEffect(() => {
    if (lastToolUsed && domManipulationTools.includes(lastToolUsed)) {
      const timer = setTimeout(() => {
        setIsMinimized(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [lastToolUsed]);

  const addToTranscript = (type: TranscriptEntry['type'], content: string, toolName?: string) => {
    const entry: TranscriptEntry = {
      timestamp: new Date().toLocaleTimeString(),
      type,
      content,
      toolName
    };
    setTranscript(prev => [...prev, entry]);
  };

  const clientTools = {
    // Navigation
    navigateToPage: {
      description: 'Navigate to a specific page in the application',
      parameters: {
        type: 'object',
        properties: {
          page_name: {
            type: 'string',
            description: 'The page to navigate to'
          }
        },
        required: ['page_name']
      },
      handler: ({ page_name }: { page_name: string }) => {
        console.log('Navigation requested to:', page_name);
        addToTranscript('tool', `Navigating to: ${page_name}`, 'navigateToPage');
        setLastToolUsed('navigateToPage');
        
        const pageRoutes: Record<string, string> = {
          'home': '/',
          'facilities': '/facilities-gallery',
          'find-care': '/find-care',
          'pricing': '/pricing',
          'login': '/login',
          'register': '/register',
          'dashboard': '/dashboard',
          'gallery': '/facilities-gallery',
          'facilities-gallery': '/facilities-gallery',
          'facilities-directory': '/facilities-directory',
          'resources': '/resources'
        };

        const route = pageRoutes[page_name.toLowerCase()] || `/${page_name}`;
        navigate(route);
        
        toast({
          title: 'Navigation',
          description: `Navigating to ${page_name}...`
        });

        return `Successfully navigating to ${page_name}`;
      }
    },

    // Search functionality
    performSearch: {
      description: 'Perform a search operation',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query'
          },
          filters: {
            type: 'object',
            description: 'Optional search filters'
          }
        },
        required: ['query']
      },
      handler: ({ query, filters }: { query: string; filters?: any }) => {
        console.log('Search requested:', query, filters);
        addToTranscript('tool', `Searching for: ${query}`, 'performSearch');
        setLastToolUsed('performSearch');
        
        toast({
          title: 'Search',
          description: `Searching for "${query}"...`
        });

        return `Search initiated for: ${query}`;
      }
    },

    // DOM interaction
    clickElement: {
      description: 'Click on a specific element',
      parameters: {
        type: 'object',
        properties: {
          selector: {
            type: 'string',
            description: 'CSS selector for the element to click'
          },
          elementText: {
            type: 'string',
            description: 'Text content of the element (optional)'
          }
        },
        required: ['selector']
      },
      handler: ({ selector, elementText }: { selector: string; elementText?: string }) => {
        console.log('Click requested on:', selector, elementText);
        addToTranscript('tool', `Clicking element: ${elementText || selector}`, 'clickElement');
        setLastToolUsed('clickElement');
        
        const element = document.querySelector(selector) as HTMLElement;
        if (element) {
          element.click();
          toast({
            title: 'Element Clicked',
            description: `Clicked on ${elementText || selector}`
          });
          return `Successfully clicked on ${elementText || selector}`;
        }
        return `Element not found: ${selector}`;
      }
    },

    fillFormField: {
      description: 'Fill a form field with a value',
      parameters: {
        type: 'object',
        properties: {
          selector: {
            type: 'string',
            description: 'CSS selector for the form field'
          },
          value: {
            type: 'string',
            description: 'Value to fill in the field'
          }
        },
        required: ['selector', 'value']
      },
      handler: ({ selector, value }: { selector: string; value: string }) => {
        console.log('Fill field requested:', selector, value);
        addToTranscript('tool', `Filling field ${selector} with: ${value}`, 'fillFormField');
        setLastToolUsed('fillFormField');
        
        const element = document.querySelector(selector) as HTMLInputElement;
        if (element) {
          element.value = value;
          element.dispatchEvent(new Event('input', { bubbles: true }));
          element.dispatchEvent(new Event('change', { bubbles: true }));
          toast({
            title: 'Field Filled',
            description: `Filled ${selector} with "${value}"`
          });
          return `Successfully filled field with ${value}`;
        }
        return `Field not found: ${selector}`;
      }
    },

    scrollToSection: {
      description: 'Scroll to a specific section of the page',
      parameters: {
        type: 'object',
        properties: {
          sectionId: {
            type: 'string',
            description: 'ID of the section to scroll to'
          }
        },
        required: ['sectionId']
      },
      handler: ({ sectionId }: { sectionId: string }) => {
        console.log('Scroll requested to:', sectionId);
        addToTranscript('tool', `Scrolling to section: ${sectionId}`, 'scrollToSection');
        setLastToolUsed('scrollToSection');
        
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return `Scrolled to section: ${sectionId}`;
        }
        return `Section not found: ${sectionId}`;
      }
    },

    // Information tools
    getCurrentPageInfo: {
      description: 'Get information about the current page',
      parameters: {
        type: 'object',
        properties: {}
      },
      handler: () => {
        const pageInfo = {
          url: window.location.href,
          title: document.title,
          path: window.location.pathname
        };
        addToTranscript('tool', `Getting page info: ${pageInfo.title}`, 'getCurrentPageInfo');
        return `Current page: ${pageInfo.title} at ${pageInfo.path}`;
      }
    },

    getPageElements: {
      description: 'Get list of interactive elements on the page',
      parameters: {
        type: 'object',
        properties: {
          elementType: {
            type: 'string',
            description: 'Type of elements to find (buttons, links, inputs, etc.)'
          }
        }
      },
      handler: ({ elementType }: { elementType?: string }) => {
        const selector = elementType ? elementType : 'button, a, input, select, textarea';
        const elements = document.querySelectorAll(selector);
        const elementList = Array.from(elements).slice(0, 10).map((el, idx) => 
          `${idx + 1}. ${el.tagName.toLowerCase()}${el.textContent ? ': ' + el.textContent.trim().substring(0, 50) : ''}`
        );
        addToTranscript('tool', `Found ${elements.length} elements of type: ${elementType || 'interactive'}`, 'getPageElements');
        return `Found ${elements.length} elements:\n${elementList.join('\n')}`;
      }
    },

    showNotification: {
      description: 'Show a notification to the user',
      parameters: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Message to show'
          },
          type: {
            type: 'string',
            enum: ['success', 'error', 'info', 'warning'],
            description: 'Type of notification'
          }
        },
        required: ['message']
      },
      handler: ({ message, type = 'info' }: { message: string; type?: string }) => {
        addToTranscript('tool', `Showing notification: ${message}`, 'showNotification');
        toast({
          title: type.charAt(0).toUpperCase() + type.slice(1),
          description: message,
          variant: type === 'error' ? 'destructive' : 'default'
        });
        return `Notification shown: ${message}`;
      }
    },

    searchOnPage: {
      description: 'Search for text on the current page',
      parameters: {
        type: 'object',
        properties: {
          searchTerm: {
            type: 'string',
            description: 'Text to search for on the page'
          }
        },
        required: ['searchTerm']
      },
      handler: ({ searchTerm }: { searchTerm: string }) => {
        addToTranscript('tool', `Searching page for: ${searchTerm}`, 'searchOnPage');
        const bodyText = document.body.innerText.toLowerCase();
        const found = bodyText.includes(searchTerm.toLowerCase());
        return found ? `Found "${searchTerm}" on the page` : `"${searchTerm}" not found on the page`;
      }
    }
  };

  const conversation = useConversation({
    clientTools,
    onConnect: () => {
      console.log('Conversation connected');
      setIsConnected(true);
      addToTranscript('system', 'Conversation started');
    },
    onDisconnect: () => {
      console.log('Conversation disconnected');
      setIsConnected(false);
      addToTranscript('system', 'Conversation ended');
    },
    onMessage: (event: any) => {
      console.log('Message received:', event);
      if (event.source === 'user') {
        addToTranscript('user', event.message);
      } else if (event.source === 'agent') {
        addToTranscript('agent', event.message);
      }
    },
    onError: (error: any) => {
      console.error('Conversation error:', error);
      addToTranscript('system', `Error: ${error.message || 'Unknown error'}`);
    }
  });

  const handleStartConversation = async () => {
    try {
      if (!process.env.REACT_APP_ELEVENLABS_AGENT_ID) {
        toast({
          title: 'Configuration Error',
          description: 'ElevenLabs Agent ID not configured',
          variant: 'destructive'
        });
        return;
      }

      await conversation.startSession({
        agentId: process.env.REACT_APP_ELEVENLABS_AGENT_ID
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      toast({
        title: 'Connection Error',
        description: 'Failed to start conversation',
        variant: 'destructive'
      });
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          className="rounded-full w-16 h-16 bg-brand-red hover:bg-brand-red/90 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="p-4 bg-white shadow-lg border-brand-red border-2">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium">{isConnected ? 'Agent Ready' : 'Agent Offline'}</span>
            {lastToolUsed && (
              <Badge variant="outline" className="text-xs">
                Last: {lastToolUsed}
              </Badge>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(false)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-brand-red text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-6 w-6" />
            <span className="font-semibold">AI Assistant</span>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-white hover:bg-white/20"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(true)}
              className="text-white hover:bg-white/20"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Transcript Panel */}
        {showTranscript && (
          <div className="bg-gray-50 p-4 max-h-40 overflow-y-auto border-b">
            <h3 className="font-semibold mb-2">Conversation Log</h3>
            <div className="space-y-1 text-sm">
              {transcript.slice(-10).map((entry, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-gray-500">{entry.timestamp}</span>
                  <Badge variant={entry.type === 'tool' ? 'secondary' : 'outline'} className="text-xs">
                    {entry.type}
                  </Badge>
                  <span className="flex-1 truncate">{entry.content}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conversation Controls */}
        <div className="p-4 flex flex-col items-center gap-4">
          {!isConnected ? (
            <Button onClick={handleStartConversation} className="w-full">
              Start Conversation
            </Button>
          ) : (
            <Button onClick={handleEndConversation} variant="outline" className="w-full">
              End Conversation
            </Button>
          )}
          <p className="text-sm text-gray-600 text-center">
            {isConnected ? 'Click the microphone to start talking' : 'Click to connect to the AI assistant'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElevenLabsAgent;
