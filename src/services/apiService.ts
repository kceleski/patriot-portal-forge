
import { supabase } from '@/integrations/supabase/client';

export class ApiService {
  private static async handleRequest<T>(
    request: () => Promise<{ data: T; error: any }>
  ): Promise<T> {
    const { data, error } = await request();
    if (error) {
      console.error('API Error:', error);
      throw new Error(error.message || 'An error occurred');
    }
    return data;
  }

  static async userService(action: string, payload?: any) {
    return this.handleRequest(() =>
      supabase.functions.invoke('user-service', {
        body: { action, ...payload }
      })
    );
  }

  static async facilityService(action: string, payload?: any) {
    return this.handleRequest(() =>
      supabase.functions.invoke('facility-service', {
        body: { action, ...payload }
      })
    );
  }

  static async paymentService(action: string, payload?: any) {
    return this.handleRequest(() =>
      supabase.functions.invoke('payment-service', {
        body: { action, ...payload }
      })
    );
  }

  static async avaAssistant(action: string, payload?: any) {
    return this.handleRequest(() =>
      supabase.functions.invoke('ava-assistant', {
        body: { action, ...payload }
      })
    );
  }

  static async voiceSynthesis(text: string, voiceId?: string) {
    return this.handleRequest(() =>
      supabase.functions.invoke('voice-synthesis', {
        body: { text, voice_id: voiceId }
      })
    );
  }

  // New method for submitting the comprehensive intake form
  static async submitIntakeForm(formData: any) {
    return this.handleRequest(() =>
      supabase.functions.invoke('submit-intake-form', {
        body: { formData }
      })
    );
  }

  // Enhanced facility search with better error handling
  static async searchFacilities(filters: {
    location?: string;
    care_type?: string;
    price_min?: number;
    price_max?: number;
  }) {
    return this.facilityService('search_facilities', filters);
  }

  // Enhanced payment methods
  static async createSubscription(plan: string) {
    return this.paymentService('create_subscription', { plan });
  }

  static async processPlacementFee(monthlyRent: number, placementId: string) {
    return this.paymentService('process_placement_fee', { 
      monthly_rent: monthlyRent, 
      placement_id: placementId 
    });
  }

  // User profile methods - using auth.users for profile data
  static async getUserProfile() {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Not authenticated');

    // Get user metadata directly from auth user
    return {
      id: user.id,
      first_name: user.user_metadata?.first_name || '',
      last_name: user.user_metadata?.last_name || '',
      email: user.email || '',
      phone: user.user_metadata?.phone || '',
      user_type: user.user_metadata?.user_type || 'family',
      subscription_tier: user.user_metadata?.subscription_tier || 'essentials',
      organization: user.user_metadata?.organization || ''
    };
  }

  static async updateUserProfile(updates: any) {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Not authenticated');

    // Update user metadata in auth
    const { data, error } = await supabase.auth.updateUser({
      data: {
        ...user.user_metadata,
        ...updates
      }
    });

    if (error) throw error;
    return {
      id: data.user?.id,
      first_name: data.user?.user_metadata?.first_name || '',
      last_name: data.user?.user_metadata?.last_name || '',
      email: data.user?.email || '',
      phone: data.user?.user_metadata?.phone || '',
      user_type: data.user?.user_metadata?.user_type || 'family',
      subscription_tier: data.user?.user_metadata?.subscription_tier || 'essentials',
      organization: data.user?.user_metadata?.organization || ''
    };
  }

  // Direct database methods for better performance
  static async getFacilities() {
    const { data, error } = await supabase
      .from('facility')
      .select('*')
      .eq('subscription_status', 'active')
      .order('is_featured', { ascending: false })
      .order('rating', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getFacilityDetails(facilityId: string) {
    const { data, error } = await supabase
      .from('facility')
      .select(`
        *,
        facility_images(*),
        facility_amenities(
          *,
          amenities(*)
        )
      `)
      .eq('id', facilityId)
      .single();

    if (error) throw error;
    return data;
  }

  static async getClients() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createClient(clientData: any) {
    const { data, error } = await supabase
      .from('clients')
      .insert(clientData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getAppointments() {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        appointment_participants(*)
      `)
      .order('start_time', { ascending: true });

    if (error) throw error;
    return data;
  }

  static async createAppointment(appointmentData: any) {
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointmentData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Facility-specific methods
  static async getFacilityMetrics(facilityId: string) {
    return this.facilityService('get_facility_metrics', { facility_id: facilityId });
  }

  // Agent commission payout
  static async createAgentPayout(agentId: string, commissionAmount: number) {
    return this.paymentService('create_agent_payout', {
      agent_id: agentId,
      commission_amount: commissionAmount
    });
  }

  // Search methods using existing data
  static async searchFacilitiesDatabase(searchTerm: string, filters?: any) {
    let query = supabase
      .from('facility')
      .select('*');

    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,facility_type.ilike.%${searchTerm}%`);
    }

    if (filters?.care_type) {
      query = query.eq('facility_type', filters.care_type);
    }

    if (filters?.price_min) {
      query = query.gte('price_range_min', filters.price_min);
    }

    if (filters?.price_max) {
      query = query.lte('price_range_max', filters.price_max);
    }

    const { data, error } = await query.order('rating', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get subscribed providers for featured directory
  static async getSubscribedProviders() {
    const { data, error } = await supabase
      .from('subscribed')
      .select('*')
      .order('uuid');

    if (error) throw error;
    return data;
  }
}
