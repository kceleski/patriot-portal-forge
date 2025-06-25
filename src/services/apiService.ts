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

  // Edge Function calls
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

  static async submitIntakeForm(formData: any) {
    return this.handleRequest(() =>
      supabase.functions.invoke('submit-intake-form', {
        body: { formData }
      })
    );
  }

  // Direct database methods - using actual tables
  static async getFacilities() {
    const { data, error } = await supabase
      .from('facility')
      .select('*')
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

  // Get subscribed providers for featured directory
  static async getSubscribedProviders() {
    try {
      // Try the subscribed table first
      const { data, error } = await supabase
        .from('subscribed')
        .select('*')
        .order('uuid');

      if (!error && data) {
        return data;
      }

      // If subscribed table doesn't exist, try images of providers
      const { data: imageData, error: imageError } = await supabase
        .from('images of providers')
        .select('*')
        .order('"Facility Name"');

      if (imageError) throw imageError;
      return imageData || [];
    } catch (error) {
      console.error('Error fetching subscribed providers:', error);
      return [];
    }
  }

  // Search methods using existing data
  static async searchFacilities(searchTerm: string, filters?: any) {
    return this.searchFacilitiesDatabase(searchTerm, filters);
  }

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

  // Enhanced search across multiple data sources
  static async searchAllFacilities(searchTerm: string, filters?: any) {
    try {
      // Search main facility table
      const facilityResults = await this.searchFacilitiesDatabase(searchTerm, filters);
      
      // Search Storepoint data
      let storepointQuery = supabase.from('Storepoint').select('*');
      if (searchTerm) {
        storepointQuery = storepointQuery.or(`name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%`);
      }
      const { data: storepointData } = await storepointQuery;
      
      // Search Combined Data
      let combinedQuery = supabase.from('Combined Data').select('*');
      if (searchTerm) {
        combinedQuery = combinedQuery.or(`name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%`);
      }
      const { data: combinedData } = await combinedQuery;

      return {
        facilities: facilityResults || [],
        storepoint: storepointData || [],
        combined: combinedData || []
      };
    } catch (error) {
      console.error('Error in comprehensive search:', error);
      return { facilities: [], storepoint: [], combined: [] };
    }
  }

  // User profile methods - using auth.users for profile data
  static async getUserProfile() {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Not authenticated');

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

  // Payment and commission methods
  static async createSubscription(plan: string) {
    return this.paymentService('create_subscription', { plan });
  }

  static async processPlacementFee(monthlyRent: number, placementId: string) {
    return this.paymentService('process_placement_fee', { 
      monthly_rent: monthlyRent, 
      placement_id: placementId 
    });
  }

  static async createAgentPayout(agentId: string, commissionAmount: number) {
    return this.paymentService('create_agent_payout', {
      agent_id: agentId,
      commission_amount: commissionAmount
    });
  }

  // Facility-specific methods
  static async getFacilityMetrics(facilityId: string) {
    return this.facilityService('get_facility_metrics', { facility_id: facilityId });
  }

  // Data source methods for different provider types
  static async getHomeHealthProviders() {
    const { data, error } = await supabase
      .from('Home_Health_Providers')
      .select('*')
      .order('"Provider Name"');

    if (error) throw error;
    return data;
  }

  static async getVAProviders() {
    const { data, error } = await supabase
      .from('VA_Providers')
      .select('*')
      .order('"Facility Name"');

    if (error) throw error;
    return data;
  }

  static async getNationwideFacilities() {
    const { data, error } = await supabase
      .from('nationwide_facilities')
      .select('*')
      .order('"Provider Name"');

    if (error) throw error;
    return data;
  }

  static async getMedicalSupplyCompanies() {
    const { data, error } = await supabase
      .from('medical_supply_companies')
      .select('*')
      .order('businessname');

    if (error) throw error;
    return data;
  }

  // Analytics and interaction logging
  static async logAnalyticsEvent(eventType: string, metadata: any) {
    const { data, error } = await supabase
      .from('analytics')
      .insert({
        event_type: eventType,
        meta: metadata,
        timestamp: new Date().toISOString()
      });

    if (error) console.error('Analytics logging failed:', error);
    return data;
  }

  // Intake form methods
  static async getIntakeForms() {
    const { data, error } = await supabase
      .from('intake_forms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createIntakeForm(formData: any) {
    const { data, error } = await supabase
      .from('intake_forms')
      .insert(formData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Contact and interaction methods
  static async getContacts() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createContact(contactData: any) {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contactData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getInteractions() {
    const { data, error } = await supabase
      .from('interactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createInteraction(interactionData: any) {
    const { data, error } = await supabase
      .from('interactions')
      .insert(interactionData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
