
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ApiService } from '@/services/apiService';
import { DollarSign, Calendar, User, Building } from 'lucide-react';
import moment from 'moment';

interface Placement {
  id: string;
  placement_date: string;
  monthly_rent: number;
  commission_status: string;
  agent_id: string;
  facility_id: string;
  senior_id: string;
  seniors: {
    name: string;
    contact_name: string;
  };
  facility: {
    name: string;
  };
  users: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const PaymentLogging = () => {
  const [pendingPlacements, setPendingPlacements] = useState<Placement[]>([]);
  const [selectedPlacement, setSelectedPlacement] = useState<Placement | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchPendingPlacements = async () => {
    try {
      const { data, error } = await supabase
        .from('placements')
        .select(`
          *,
          seniors (name, contact_name),
          facility (name),
          users (first_name, last_name, email)
        `)
        .eq('commission_status', 'pending')
        .order('placement_date', { ascending: false });

      if (error) throw error;
      setPendingPlacements(data || []);
    } catch (error) {
      console.error('Error fetching pending placements:', error);
      toast({
        title: "Error",
        description: "Failed to load pending placements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPlacements();
  }, []);

  const handleLogPayment = (placement: Placement) => {
    setSelectedPlacement(placement);
    setPaymentAmount(placement.monthly_rent?.toString() || '');
  };

  const handleCloseModal = () => {
    setSelectedPlacement(null);
    setPaymentAmount('');
  };

  const handleSubmitPayment = async () => {
    if (!selectedPlacement || !user) return;
    
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid payment amount",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      // Calculate commissions
      const agentCommission = amount * 0.8; // 80% to agent
      const hpaRevenue = amount * 0.2; // 20% to HPA

      // Log facility payment
      const { error: paymentError } = await supabase
        .from('facility_payments')
        .insert({
          placement_id: selectedPlacement.id,
          facility_id: selectedPlacement.facility_id,
          amount: amount,
          logged_by: user.id,
        });

      if (paymentError) throw paymentError;

      // Update placement with commission details
      const { error: placementError } = await supabase
        .from('placements')
        .update({
          first_month_rent_fee: amount,
          commission_amount: agentCommission,
          hpa_revenue: hpaRevenue,
          commission_status: 'paid',
        })
        .eq('id', selectedPlacement.id);

      if (placementError) throw placementError;

      // Trigger agent payout via Stripe
      try {
        await ApiService.createAgentPayout(selectedPlacement.agent_id, agentCommission);
        
        toast({
          title: "Success",
          description: `Payment logged and agent payout of $${agentCommission.toFixed(2)} initiated`,
        });
      } catch (payoutError) {
        console.error('Payout error:', payoutError);
        toast({
          title: "Partial Success",
          description: "Payment logged but agent payout failed. Manual payout may be required.",
          variant: "destructive",
        });
      }

      fetchPendingPlacements();
      handleCloseModal();
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Error",
        description: "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary-dark-blue">Facility Payment Logging</h2>
        <Badge variant="secondary">
          {pendingPlacements.length} Pending Payments
        </Badge>
      </div>

      {pendingPlacements.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No pending facility payments.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pendingPlacements.map((placement) => (
            <Card key={placement.id} className="bg-secondary-off-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{placement.seniors?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span>{placement.facility?.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Placed: {moment(placement.placement_date).format('MMM D, YYYY')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Monthly Rent: ${placement.monthly_rent?.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="font-medium">Agent: </span>
                      {placement.users?.first_name} {placement.users?.last_name} ({placement.users?.email})
                    </div>
                  </div>

                  <Button
                    onClick={() => handleLogPayment(placement)}
                    className="bg-accent-gold hover:bg-accent-gold/80"
                  >
                    Log Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedPlacement} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Log Facility Payment</DialogTitle>
          </DialogHeader>
          
          {selectedPlacement && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Placement Details</h3>
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Senior:</span> {selectedPlacement.seniors?.name}</div>
                  <div><span className="font-medium">Facility:</span> {selectedPlacement.facility?.name}</div>
                  <div><span className="font-medium">Agent:</span> {selectedPlacement.users?.first_name} {selectedPlacement.users?.last_name}</div>
                  <div><span className="font-medium">Monthly Rent:</span> ${selectedPlacement.monthly_rent?.toLocaleString()}</div>
                </div>
              </div>

              <div>
                <Label htmlFor="payment-amount">Facility Payment Amount</Label>
                <Input
                  id="payment-amount"
                  type="number"
                  step="0.01"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter payment amount"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will trigger an 80% commission payout to the agent
                </p>
              </div>

              {paymentAmount && !isNaN(parseFloat(paymentAmount)) && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Payment Breakdown</h4>
                  <div className="space-y-1 text-sm">
                    <div>Agent Commission (80%): ${(parseFloat(paymentAmount) * 0.8).toFixed(2)}</div>
                    <div>HPA Revenue (20%): ${(parseFloat(paymentAmount) * 0.2).toFixed(2)}</div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitPayment}
                  disabled={processing || !paymentAmount || isNaN(parseFloat(paymentAmount))}
                  className="bg-accent-gold hover:bg-accent-gold/80"
                >
                  {processing ? 'Processing...' : 'Log Payment & Payout Agent'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
