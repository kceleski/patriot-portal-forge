
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TempUser {
  id: string;
  email: string;
  userType: 'family' | 'healthcare' | 'agent' | 'facility';
  name: string;
}

interface TempAuthContextType {
  user: TempUser | null;
  login: (userType: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const TempAuthContext = createContext<TempAuthContextType | undefined>(undefined);

export const useTempAuth = () => {
  const context = useContext(TempAuthContext);
  if (!context) {
    throw new Error('useTempAuth must be used within TempAuthProvider');
  }
  return context;
};

export const TempAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TempUser | null>(null);

  const login = (userType: string) => {
    const mockUser: TempUser = {
      id: `temp-${userType}-user`,
      email: `demo@${userType}.com`,
      userType: userType as any,
      name: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)} User`
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <TempAuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </TempAuthContext.Provider>
  );
};
