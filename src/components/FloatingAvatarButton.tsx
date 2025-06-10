
import React from 'react';
import { Button } from '@/components/ui/button';
import AvatarDisplay from './AvatarDisplay';

interface FloatingAvatarButtonProps {
  onClick: () => void;
  status: 'connected' | 'disconnected';
  isSpeaking?: boolean;
}

const FloatingAvatarButton: React.FC<FloatingAvatarButtonProps> = ({ 
  onClick, 
  status, 
  isSpeaking = false 
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onClick}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-red to-red-600 hover:from-red-600 hover:to-red-700 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white relative overflow-visible p-0"
      >
        <AvatarDisplay 
          status={status} 
          isSpeaking={isSpeaking} 
          size="small" 
          showMicIcon={false}
        />
        
        {/* Connection status indicator */}
        {status === 'connected' && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
        )}
      </Button>
      
      {/* AVA Badge with enhanced styling */}
      <div className="absolute -top-3 -left-3 bg-gradient-to-r from-brand-gold to-yellow-400 text-brand-navy text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-yellow-300">
        AVA
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-red to-red-600 opacity-20 blur-xl animate-pulse"></div>
    </div>
  );
};

export default FloatingAvatarButton;
