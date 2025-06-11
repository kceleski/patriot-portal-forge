
import React, { useEffect, useRef, useState } from 'react';
import { voiceCommandService } from '@/services/voiceCommandService';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ElevenLabsWidgetProps {
  variant: 'fullscreen' | 'floating';
}

interface ElevenLabsConfig {
  agentId: string;
  apiKey: string;
  hasApiKey: boolean;
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
  const { toast } = useToast();
  const scriptLoadedRef = useRef(false);
  const widgetInitializedRef = useRef(false);
  const [config, setConfig] = useState<ElevenLabsConfig | null>(null);

  // Load ElevenLabs configuration
  const loadConfig = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        console.warn('No session found for ElevenLabs widget');
        return;
      }

      const { data, error } = await supabase.functions.invoke('elevenlabs-config', {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`
        }
      });
      
      if (error) {
        console.error('Failed to load ElevenLabs config for widget:', error);
        return;
      }

      if (data?.error) {
        console.error('ElevenLabs config error:', data.error);
        return;
      }

      setConfig(data);
      console.log('ElevenLabs widget config loaded successfully');
    } catch (error) {
      console.error('Error loading config for widget:', error);
    }
  };

  useEffect(() => {
    loadConfig();
  }, [user]);

  useEffect(() => {
    // Don't load script if no config
    if (!config) return;

    // Prevent multiple script loads
    if (scriptLoadedRef.current) return;

    // Check if the script is already loaded
    const existingScript = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://elevenlabs.io/convai-widget/index.js';
      script.async = true;
      
      script.onload = () => {
        console.log('ElevenLabs script loaded successfully');
        scriptLoadedRef.current = true;
        initializeWidgetFunctions();
      };

      script.onerror = () => {
        console.error('Failed to load ElevenLabs script');
      };

      document.body.appendChild(script);
    } else {
      scriptLoadedRef.current = true;
      initializeWidgetFunctions();
    }

    // Cleanup function
    return () => {
      // Don't remove script on unmount to prevent re-loading
    };
  }, [config]);

  const initializeWidgetFunctions = () => {
    if (widgetInitializedRef.current) return;
    
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

    widgetInitializedRef.current = true;
  };

  // Don't render if no config is loaded
  if (!config) {
    return null;
  }

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
        agent-id={config.agentId}
        variant="expanded"
        data-context={contextData}
      />
    );
  }

  return (
    <elevenlabs-convai 
      agent-id={config.agentId}
      data-context={contextData}
    />
  );
};

export default ElevenLabsWidget;
