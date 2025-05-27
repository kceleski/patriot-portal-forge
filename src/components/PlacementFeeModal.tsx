
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApi } from '@/hooks/useApi';
import { ApiService } from '@/services/apiService';
import { DollarSign, Shield, Clock } from 'lucide-react';

interface PlacementFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  facilityName?: string;
  monthlyRent?: number;
}

const PlacementFeeModal: React.FC<PlacementFeeModalProps> = ({
  isOpen,
  onClose,
  facilityName = 'Selected Facility',
  monthlyRent = 3500
}) => {
  const [placementId] = useState(`placement_${Date.now()}`);

  const { execute: processPayment, loading } = useApi(
    ApiService.processPlacementFee,
    { showSuccessToast: true, successMessage: 'Payment processed successfully!' }
  );

  const handlePayment = async () => {
    const result = await processPayment(monthlyRent, placementId);
    if (result?.client_secret) {
      // In a real implementation, you would integrate with Stripe Elements here
      console.log('Payment intent created:', result.client_secret);
      onClose();
    }
  };

  const placementFee = monthlyRent;
  const agentCommission = Math.round(placementFee * 0.8);
  const hpaRevenue = Math.round(placementFee * 0.2);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-text-dark-gray">
            Request Placement Agent
          </DialogTitle>
          <DialogDescription>
            Secure professional assistance for facility placement at {facilityName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary-sky" />
                <span>Professional Placement Service</span>
              </CardTitle>
              <CardDescription>
                Our certified placement agents will guide you through the entire process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-accent-gold mx-auto mb-2" />
                  <h4 className="font-semibold">24-48 Hours</h4>
                  <p className="text-sm text-gray-600">Response Time</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 text-primary-sky mx-auto mb-2" />
                  <h4 className="font-semibold">Licensed</h4>
                  <p className="text-sm text-gray-600">Certified Agents</p>
                </div>
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-primary-red mx-auto mb-2" />
                  <h4 className="font-semibold">No Hidden Fees</h4>
                  <p className="text-sm text-gray-600">Transparent Pricing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Placement Fee Details</CardTitle>
              <CardDescription>
                One-time fee equal to first month's rent (industry standard)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Monthly Rent</Label>
                  <span className="font-semibold">${monthlyRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Label>Placement Fee (100% of monthly rent)</Label>
                  <span className="font-semibold">${placementFee.toLocaleString()}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Due</span>
                    <span className="text-primary-red">${placementFee.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Included */}
          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Shield className="h-4 w-4 text-primary-sky mr-2" />
                  <span>Personal consultation with licensed placement specialist</span>
                </li>
                <li className="flex items-center">
                  <Shield className="h-4 w-4 text-primary-sky mr-2" />
                  <span>Facility tour coordination and scheduling</span>
                </li>
                <li className="flex items-center">
                  <Shield className="h-4 w-4 text-primary-sky mr-2" />
                  <span>Contract negotiation and review</span>
                </li>
                <li className="flex items-center">
                  <Shield className="h-4 w-4 text-primary-sky mr-2" />
                  <span>Move-in coordination and support</span>
                </li>
                <li className="flex items-center">
                  <Shield className="h-4 w-4 text-primary-sky mr-2" />
                  <span>30-day follow-up and satisfaction guarantee</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button 
              onClick={handlePayment}
              className="bg-primary-red hover:bg-red-600"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay $${placementFee.toLocaleString()}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlacementFeeModal;
