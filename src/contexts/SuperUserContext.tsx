
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SuperUser {
  id: string;
  username: string;
  role: 'super_admin';
  accessLevel: 'all';
  currentPortal: 'family' | 'healthcare' | 'agent' | 'facility';
}

interface SuperUserContextType {
  user: SuperUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  switchPortal: (portal: 'family' | 'healthcare' | 'agent' | 'facility') => void;
  hasAccess: (feature: string) => boolean;
}

const SuperUserContext = createContext<SuperUserContextType | undefined>(undefined);

export const useSuperUser = () => {
  const context = useContext(SuperUserContext);
  if (!context) {
    throw new Error('useSuperUser must be used within SuperUserProvider');
  }
  return context;
};

export const SuperUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SuperUser | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('superUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Super user credentials
    if (username === 'dev' && password === 'dev123') {
      const superUser: SuperUser = {
        id: 'super-user-001',
        username: 'dev',
        role: 'super_admin',
        accessLevel: 'all',
        currentPortal: 'agent'
      };
      
      setUser(superUser);
      localStorage.setItem('superUser', JSON.stringify(superUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('superUser');
  };

  const switchPortal = (portal: 'family' | 'healthcare' | 'agent' | 'facility') => {
    if (user) {
      const updatedUser = { ...user, currentPortal: portal };
      setUser(updatedUser);
      localStorage.setItem('superUser', JSON.stringify(updatedUser));
    }
  };

  const hasAccess = (feature: string): boolean => {
    // Super user has access to everything
    return !!user && user.accessLevel === 'all';
  };

  return (
    <SuperUserContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      switchPortal,
      hasAccess
    }}>
      {children}
    </SuperUserContext.Provider>
  );
};
