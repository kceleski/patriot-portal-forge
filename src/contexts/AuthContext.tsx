
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
  organization_admin?: boolean;
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
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && event === 'SIGNED_IN') {
          // Fetch or create user profile after sign in
          setTimeout(() => {
            fetchOrCreateUserProfile(session.user);
          }, 100);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchOrCreateUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchOrCreateUserProfile = async (authUser: User) => {
    try {
      console.log('Fetching profile for user:', authUser.id);
      
      // First try to get existing profile
      let { data: existingProfile, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (fetchError && fetchError.code === 'PGRST116') {
        // No profile exists, create one from auth metadata
        console.log('Creating new user profile from metadata:', authUser.user_metadata);
        
        const newUserData = {
          id: authUser.id,
          email: authUser.email || '',
          role: authUser.user_metadata?.user_type || 'family',
          tier: authUser.user_metadata?.subscription_tier || 'essentials',
          first_name: authUser.user_metadata?.first_name || '',
          last_name: authUser.user_metadata?.last_name || '',
          organization: authUser.user_metadata?.organization || '',
          phone: authUser.user_metadata?.phone || '',
          // Note: organization_admin field doesn't exist in DB yet, so we'll default to false
          // organization_admin: authUser.user_metadata?.organization_admin || false
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('users')
          .insert(newUserData)
          .select()
          .single();

        if (createError) {
          console.error('Error creating user profile:', createError);
          throw createError;
        }

        existingProfile = createdProfile;
        console.log('Created new user profile:', existingProfile);
      } else if (fetchError) {
        console.error('Error fetching user profile:', fetchError);
        throw fetchError;
      }

      if (existingProfile) {
        // Map database fields to UserProfile interface
        const userProfile: UserProfile = {
          id: existingProfile.id,
          email: existingProfile.email,
          user_type: existingProfile.role as 'family' | 'healthcare' | 'agent' | 'facility' | 'admin',
          subscription_tier: existingProfile.tier as 'essentials' | 'elevate' | 'pinnacle',
          first_name: existingProfile.first_name,
          last_name: existingProfile.last_name,
          organization: existingProfile.organization,
          phone: existingProfile.phone,
          // For now, determine org admin status based on having an organization
          // This will need to be updated when we add the organization_admin field to the database
          organization_admin: existingProfile.organization_admin || (!!existingProfile.organization && existingProfile.organization !== '')
        };
        
        console.log('Setting user profile:', userProfile);
        setProfile(userProfile);
      }
    } catch (error) {
      console.error('Error in fetchOrCreateUserProfile:', error);
      toast({
        title: "Profile Error",
        description: "There was an issue loading your profile. Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Success",
      description: "Signed in successfully!",
    });
  };

  const signUp = async (email: string, password: string, userData: any) => {
    const { error } = await supabase.auth.signUp({
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
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Success",
      description: "Account created successfully! Please check your email to verify your account.",
    });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Success",
      description: "Signed out successfully!",
    });
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    try {
      const { error } = await supabase
        .from('users')
        .update({
          first_name: updates.first_name,
          last_name: updates.last_name,
          organization: updates.organization,
          phone: updates.phone,
          role: updates.user_type,
          tier: updates.subscription_tier,
          // Note: organization_admin field doesn't exist in DB yet
          // organization_admin: updates.organization_admin
        })
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Alias for updateProfile to match the expected interface
  const updateUserProfile = updateProfile;

  const hasFeatureAccess = (feature: string): boolean => {
    if (!profile) return false;

    const { user_type, subscription_tier } = profile;

    // Feature access matrix
    const featureAccess: Record<string, Record<string, string[]>> = {
      healthcare: {
        pinnacle: ['ai_chat', 'website_integration', 'webinar_hosting', 'virtual_tours', 'marketing_support', 'landing_page', 'advanced_filters'],
        elevate: ['virtual_tours', 'marketing_support', 'landing_page', 'advanced_filters'],
        essentials: ['landing_page']
      },
      agent: {
        elevate: ['full_crm', 'invoicing', 'task_management', 'basic_crm', 'advanced_filters'],
        essentials: ['basic_crm']
      },
      family: {
        pinnacle: ['advanced_ai', 'downloadable_reports', 'care_consultation', 'basic_search'],
        elevate: ['advanced_ai', 'downloadable_reports', 'basic_search'],
        essentials: ['basic_search']
      },
      facility: {
        pinnacle: ['all_features', 'advanced_filters'],
        elevate: ['most_features', 'advanced_filters'],
        essentials: ['basic_features']
      },
      admin: {
        pinnacle: ['all_features', 'admin_access', 'user_management'],
        elevate: ['all_features', 'admin_access', 'user_management'],
        essentials: ['all_features', 'admin_access', 'user_management']
      }
    };

    return featureAccess[user_type]?.[subscription_tier]?.includes(feature) || false;
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
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
