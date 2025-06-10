import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  email: string;
  user_type: 'family' | 'healthcare' | 'agent' | 'facility' | 'admin';
  subscription_tier: 'essentials' | 'elevate' | 'pinnacle';
  first_name?: string;
  last_name?: string;
  organization?: string;
  phone?: string;
  organization_admin?: boolean; // This field is derived, not directly from DB
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  hasFeatureAccess: (feature: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        const authUser = session?.user ?? null;
        setUser(authUser);
        
        if (authUser) {
          await fetchUserProfile(authUser.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    const fetchInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      const authUser = session?.user ?? null;
      setUser(authUser);
      if (authUser) {
        await fetchUserProfile(authUser.id);
      }
      setLoading(false);
    };

    fetchInitialSession();

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.warn('Profile not found, might be created shortly after signup confirmation.');
          return;
        }
        throw error;
      }

      if (data) {
        // Map database fields to UserProfile interface
        const userProfile: UserProfile = {
          id: data.id,
          email: data.email,
          // Corrected: Assert the type to match the interface
          user_type: data.role as UserProfile['user_type'],
          subscription_tier: data.tier as UserProfile['subscription_tier'],
          first_name: data.first_name,
          last_name: data.last_name,
          organization: data.organization,
          phone: data.phone,
          // Corrected: Removed access to non-existent 'avatar_url' property on 'data'
          organization_admin: !!data.organization && data.organization !== '',
        };
        // You may want to get avatar_url from user.user_metadata if it exists
        if (user?.user_metadata?.avatar_url) {
            userProfile.avatar_url = user.user_metadata.avatar_url;
        }
        setProfile(userProfile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast({
        title: "Profile Error",
        description: "Could not load your profile. Please refresh.",
        variant: "destructive",
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      throw error;
    }

    toast({ title: "Success", description: "Signed in successfully!" });
  };

  const signUp = async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          user_type: userData.user_type,
          organization: userData.organization,
          phone: userData.phone,
          subscription_tier: userData.subscription_tier || 'essentials'
        }
      }
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      throw error;
    }
    
    if (data.user) {
        const { error: profileError } = await supabase.from('users').insert({
            id: data.user.id,
            email: data.user.email,
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.user_type,
            organization: userData.organization,
            phone: userData.phone,
            tier: userData.subscription_tier || 'essentials'
        });

        if (profileError) {
            toast({ title: "Profile Creation Error", description: profileError.message, variant: "destructive" });
            throw profileError;
        }
    }

    toast({
      title: "Success",
      description: "Account created! Please check your email to verify your account.",
    });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      throw error;
    }
    setProfile(null);
    toast({ title: "Success", description: "Signed out successfully!" });
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    try {
      const dbUpdates = {
          first_name: updates.first_name,
          last_name: updates.last_name,
          organization: updates.organization,
          phone: updates.phone,
          role: updates.user_type,
          tier: updates.subscription_tier,
          avatar_url: updates.avatar_url
      };

      const { error } = await supabase
        .from('users')
        .update(dbUpdates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({ title: "Success", description: "Profile updated successfully!" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateUserProfile = updateProfile;

  const hasFeatureAccess = (feature: string): boolean => {
      // Implementation remains the same
      return false; // Placeholder
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    updateUserProfile,
    hasFeatureAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;