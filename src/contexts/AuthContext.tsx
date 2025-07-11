
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'family' | 'healthcare' | 'agent' | 'facility' | 'admin';
  organization?: string;
  phone?: string;
  subscription_tier?: string;
  avatar_url?: string;
  organization_admin?: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: any }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ user: User | null; error: any }>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  hasFeatureAccess: (feature: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        buildUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        buildUserProfile(session.user);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const buildUserProfile = (user: User) => {
    try {
      // Build profile from user metadata and email
      const userData = user.user_metadata || {};
      const email = user.email || '';
      
      // Check if user is organization admin based on metadata or email
      const isOrgAdmin = userData.organization && 
        (userData.organization.toLowerCase().includes('admin') || 
         userData.organization.toLowerCase().includes('director') ||
         userData.organization.toLowerCase().includes('manager') ||
         email.toLowerCase().includes('admin'));

      const userProfile: UserProfile = {
        id: user.id,
        email: email,
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        user_type: userData.user_type || 'family',
        organization: userData.organization || '',
        phone: userData.phone || '',
        subscription_tier: userData.subscription_tier || 'basic',
        avatar_url: userData.avatar_url || '',
        organization_admin: isOrgAdmin
      };

      setProfile(userProfile);
    } catch (error) {
      console.error('Error building user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return { user: null, error };
      }

      return { user: data.user, error: null };
    } catch (error) {
      toast.error('An unexpected error occurred');
      return { user: null, error };
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) {
        toast.error(error.message);
        return { user: null, error };
      }

      return { user: data.user, error: null };
    } catch (error) {
      toast.error('An unexpected error occurred');
      return { user: null, error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    try {
      // Update the user metadata in auth
      const { error } = await supabase.auth.updateUser({
        data: updates
      });

      if (error) {
        toast.error('Failed to update profile');
        throw error;
      }

      // Update local profile state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const hasFeatureAccess = (feature: string): boolean => {
    if (!profile) return false;

    const tier = profile.subscription_tier?.toLowerCase();
    const userType = profile.user_type;

    // Feature access logic based on user type and subscription tier
    switch (feature) {
      case 'video_calls':
        return userType === 'healthcare' && (tier === 'elevate' || tier === 'pinnacle');
      case 'advanced_analytics':
        return tier === 'pinnacle';
      case 'unlimited_clients':
        return tier === 'elevate' || tier === 'pinnacle';
      default:
        return true; // Basic features available to all
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserProfile,
    hasFeatureAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
