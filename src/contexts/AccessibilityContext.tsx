// src/contexts/AccessibilityContext.tsx

import React, { createContext, useContext, useState, useMemo } from 'react';

interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'extra-large';
  voiceEnabled: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    voiceEnabled: true,
    highContrast: false,
    reduceMotion: false,
  });

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  };

  const value = useMemo(() => ({ settings, updateSettings }), [settings]);

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
