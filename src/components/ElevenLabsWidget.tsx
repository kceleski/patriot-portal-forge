
import React, { useEffect } from 'react';
import { voiceCommandService } from '@/services/voiceCommandService';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ElevenLabsWidgetProps {
  variant: 'fullscreen' | 'floating';
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': {
        'agent-id': string;
        variant?: string;
        'data-context'?: string;
      };
    }
  }
}

const ElevenLabsWidget: React.FC<ElevenLabsWidgetProps> = ({ variant }) => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    // Check if the script is already loaded
    const existingScript = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://elevenlabs.io/convai-widget/index.js';
      script.async = true;
      document.body.appendChild(script);

      // Set up global functions for voice commands
      (window as any).voiceCommandService = voiceCommandService;
      
      // Expose helpful functions to the widget
      (window as any).avaCommands = {
        getPageContext: () => voiceCommandService.getPageContext(),
        clickByText: (text: string) => voiceCommandService.clickElementByText(text),
        fillForm: (label: string, value: string) => voiceCommandService.fillFormByLabel(label, value),
        performSearch: (query: string) => voiceCommandService.performSearchOnPage(query),
        showNotification: (message: string, type: 'success' | 'error' | 'info' = 'info') => {
          if (type === 'success') voiceCommandService.showSuccess(message);
          else if (type === 'error') voiceCommandService.showError(message);
          else voiceCommandService.showInfo(message);
        }
      };
    }
  }, []);

  // Create context data for the widget
  const contextData = JSON.stringify({
    currentPage: location.pathname,
    userLoggedIn: !!user,
    userType: user?.user_metadata?.user_type || 'guest',
    pageContext: typeof window !== 'undefined' ? voiceCommandService.getPageContext() : {}
  });

  if (variant === 'fullscreen') {
    return (
      <elevenlabs-convai 
        agent-id="R9M1zBEUj8fTGAij61wb" 
        variant="expanded"
        data-context={contextData}
      />
    );
  }

  return (
    <elevenlabs-convai 
      agent-id="R9M1zBEUj8fTGAij61wb"
      data-context={contextData}
    />
  );
};

export default ElevenLabsWidget;
