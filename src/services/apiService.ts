
import { supabase } from '@/integrations/supabase/client';

export class ApiService {
  static async userService(action: string, payload?: any) {
    const { data, error } = await supabase.functions.invoke('user-service', {
      body: { action, ...payload }
    });
    if (error) throw error;
    return data;
  }

  static async facilityService(action: string, payload?: any) {
    const { data, error } = await supabase.functions.invoke('facility-service', {
      body: { action, ...payload }
    });
    if (error) throw error;
    return data;
  }

  static async paymentService(action: string, payload?: any) {
    const { data, error } = await supabase.functions.invoke('payment-service', {
      body: { action, ...payload }
    });
    if (error) throw error;
    return data;
  }

  static async avaAssistant(action: string, payload?: any) {
    const { data, error } = await supabase.functions.invoke('ava-assistant', {
      body: { action, ...payload }
    });
    if (error) throw error;
    return data;
  }

  static async voiceSynthesis(text: string, voiceId?: string) {
    const { data, error } = await supabase.functions.invoke('voice-synthesis', {
      body: { text, voice_id: voiceId }
    });
    if (error) throw error;
    return data;
  }

  // Facility search methods
  static async searchFacilities(filters: {
    location?: string;
    care_type?: string;
    price_min?: number;
    price_max?: number;
  }) {
    return this.facilityService('search_facilities', filters);
  }

  // Payment methods
  static async createSubscription(plan: string) {
    return this.paymentService('create_subscription', { plan });
  }

  static async processPlacementFee(monthlyRent: number, placementId: string) {
    return this.paymentService('process_placement_fee', { 
      monthly_rent: monthlyRent, 
      placement_id: placementId 
    });
  }

  // User profile methods
  static async getUserProfile() {
    return this.userService('get_profile');
  }

  static async updateUserProfile(updates: any) {
    return this.userService('update_profile', { updates });
  }
}
