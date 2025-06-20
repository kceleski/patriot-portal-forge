
import React from 'react';
import { Mic, MicOff } from 'lucide-react';

interface AvatarDisplayProps {
  status: 'connected' | 'disconnected' | 'connecting' | 'disconnecting';
  isSpeaking?: boolean;
  size?: 'small' | 'medium' | 'large';
  showMicIcon?: boolean;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ 
  status, 
  isSpeaking = false, 
  size = 'medium',
  showMicIcon = true 
}) => {
  const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-16 h-16', 
    large: 'w-24 h-24'
  };

  const containerSizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-28 h-28'
  };

  const micSizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6'
  };

  return (
    <div className={`relative ${containerSizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-500 ${
      status === 'connected' ? 
        (isSpeaking ? 'bg-gradient-to-br from-red-100 to-pink-100 scale-110' : 'bg-gradient-to-br from-green-100 to-blue-100 scale-105') : 
        status === 'connecting' ?
        'bg-gradient-to-br from-yellow-100 to-orange-100 scale-105' :
        status === 'disconnecting' ?
        'bg-gradient-to-br from-orange-100 to-red-100 scale-105' :
        'bg-gradient-to-br from-gray-100 to-gray-200'
    }`}>
      {/* Animated background ring */}
      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
        status === 'connected' 
          ? (isSpeaking ? 'animate-ping bg-red-300 opacity-30' : 'animate-pulse bg-green-300 opacity-20') 
          : status === 'connecting'
          ? 'animate-pulse bg-yellow-300 opacity-20'
          : status === 'disconnecting'
          ? 'animate-pulse bg-orange-300 opacity-20'
          : ''
      }`}></div>
      
      {/* Avatar image */}
      <img 
        src="/lovable-uploads/95e67145-b581-4808-bd33-f359bc1a755b.png" 
        alt="AVA Assistant" 
        className={`${sizeClasses[size]} rounded-full object-cover z-10 transition-all duration-300 ${
          isSpeaking ? 'animate-bounce' : ''
        }`}
      />
      
      {/* Microphone status icon */}
      {showMicIcon && (
        status === 'connected' ? (
          <Mic className={`absolute bottom-0 right-0 ${micSizeClasses[size]} p-1 rounded-full bg-white shadow-lg transition-colors duration-300 ${
            isSpeaking ? 'text-red-500' : 'text-green-600'
          }`} />
        ) : status === 'connecting' ? (
          <Mic className={`absolute bottom-0 right-0 ${micSizeClasses[size]} p-1 rounded-full bg-white shadow-lg text-yellow-500 animate-pulse`} />
        ) : status === 'disconnecting' ? (
          <Mic className={`absolute bottom-0 right-0 ${micSizeClasses[size]} p-1 rounded-full bg-white shadow-lg text-orange-500 animate-pulse`} />
        ) : (
          <MicOff className={`absolute bottom-0 right-0 ${micSizeClasses[size]} p-1 rounded-full bg-white shadow-lg text-gray-400`} />
        )
      )}
      
      {/* Breathing effect for idle state */}
      {status === 'connected' && !isSpeaking && (
        <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-50 animate-pulse"></div>
      )}
    </div>
  );
};

export default AvatarDisplay;
