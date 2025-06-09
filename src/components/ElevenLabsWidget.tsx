
import React, { useEffect } from 'react';

interface ElevenLabsWidgetProps {
  variant: 'fullscreen' | 'floating';
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': {
        'agent-id': string;
        variant?: string;
      };
    }
  }
}

const ElevenLabsWidget: React.FC<ElevenLabsWidgetProps> = ({ variant }) => {
  useEffect(() => {
    // Check if the script is already loaded
    const existingScript = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://elevenlabs.io/convai-widget/index.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (variant === 'fullscreen') {
    return (
      <elevenlabs-convai 
        agent-id="agent_01jx5am7c9f2m9vnp81ygyvvvt" 
        variant="expanded"
      />
    );
  }

  return (
    <elevenlabs-convai 
      agent-id="agent_01jx5am7c9f2m9vnp81ygyvvvt"
    />
  );
};

export default ElevenLabsWidget;
