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

  // User profile methods with better error handling
  static async getUserProfile() {
    return this.userService('get_profile');
  }

  static async updateUserProfile(updates: any) {
    return this.userService('update_profile', { updates });
  }

  // Facility-specific methods
  static async getFacilityDetails(facilityId: string) {
    return this.facilityService('get_facility_details', { facility_id: facilityId });
  }

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
