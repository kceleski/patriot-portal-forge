
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PenTool, Save, FileText, User, Heart, DollarSign } from 'lucide-react';

interface ClientContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientData: any) => void;
}

interface ClientData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  
  // Care Needs
  careLevel: string;
  medicalConditions: string[];
  mobility: string;
  cognitiveStatus: string;
  specialNeeds: string;
  
  // Financial Information
  budget: { min: number; max: number };
  paymentMethod: string;
  insuranceInfo: string;
  
  // Preferences
  location: string;
  amenities: string[];
  notes: string;
  
  // Digital Signature
  signatureAgreed: boolean;
  signatureDate: string;
}

const ClientContactModal: React.FC<ClientContactModalProps> = ({ isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  
  const [clientData, setClientData] = useState<ClientData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    careLevel: '',
    medicalConditions: [],
    mobility: '',
    cognitiveStatus: '',
    specialNeeds: '',
    budget: { min: 0, max: 0 },
    paymentMethod: '',
    insuranceInfo: '',
    location: '',
    amenities: [],
    notes: '',
    signatureAgreed: false,
    signatureDate: ''
  });

  const handleSave = () => {
    if (validateForm()) {
      onSave(clientData);
      onClose();
    }
  };

  const validateForm = () => {
    return clientData.firstName && clientData.lastName && clientData.phone;
  };

  const handleSignature = () => {
    setClientData({
      ...clientData,
      signatureAgreed: true,
      signatureDate: new Date().toISOString()
    });
    setSignatureModalOpen(false);
  };

  const medicalConditionOptions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Alzheimer\'s', 'Dementia',
    'Arthritis', 'Osteoporosis', 'COPD', 'Stroke', 'Parkinson\'s'
  ];

  const amenityOptions = [
    'Private Room', 'Shared Room', 'Kitchenette', 'Balcony', 'Pet-Friendly',
    'Garden Access', 'Transportation', 'Activities', 'Dining Options', 'Wi-Fi'
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-brand-navy">New Client Contact</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Personal</span>
              </TabsTrigger>
              <TabsTrigger value="care" className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Care Needs</span>
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Financial</span>
              </TabsTrigger>
              <TabsTrigger value="agreement" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Agreement</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={clientData.firstName}
                        onChange={(e) => setClientData({...clientData, firstName: e.target.value})}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={clientData.lastName}
                        onChange={(e) => setClientData({...clientData, lastName: e.target.value})}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={clientData.dateOfBirth}
                        onChange={(e) => setClientData({...clientData, dateOfBirth: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={clientData.phone}
                        onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={clientData.email}
                      onChange={(e) => setClientData({...clientData, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={clientData.address}
                      onChange={(e) => setClientData({...clientData, address: e.target.value})}
                      placeholder="Enter full address"
                      rows={2}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        value={clientData.emergencyContact}
                        onChange={(e) => setClientData({...clientData, emergencyContact: e.target.value})}
                        placeholder="Contact name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                      <Input
                        id="emergencyPhone"
                        value={clientData.emergencyPhone}
                        onChange={(e) => setClientData({...clientData, emergencyPhone: e.target.value})}
                        placeholder="Emergency phone number"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="care" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Care Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="careLevel">Care Level Required</Label>
                    <Select value={clientData.careLevel} onValueChange={(value) => setClientData({...clientData, careLevel: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select care level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="independent">Independent Living</SelectItem>
                        <SelectItem value="assisted">Assisted Living</SelectItem>
                        <SelectItem value="memory">Memory Care</SelectItem>
                        <SelectItem value="skilled">Skilled Nursing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Medical Conditions</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {medicalConditionOptions.map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            id={condition}
                            checked={clientData.medicalConditions.includes(condition)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setClientData({
                                  ...clientData,
                                  medicalConditions: [...clientData.medicalConditions, condition]
                                });
                              } else {
                                setClientData({
                                  ...clientData,
                                  medicalConditions: clientData.medicalConditions.filter(c => c !== condition)
                                });
                              }
                            }}
                          />
                          <label htmlFor={condition} className="text-sm">{condition}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mobility">Mobility Status</Label>
                      <Select value={clientData.mobility} onValueChange={(value) => setClientData({...clientData, mobility: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mobility status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="independent">Independent</SelectItem>
                          <SelectItem value="walker">Uses Walker</SelectItem>
                          <SelectItem value="wheelchair">Wheelchair</SelectItem>
                          <SelectItem value="assistance">Needs Assistance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="cognitiveStatus">Cognitive Status</Label>
                      <Select value={clientData.cognitiveStatus} onValueChange={(value) => setClientData({...clientData, cognitiveStatus: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cognitive status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="mild">Mild Impairment</SelectItem>
                          <SelectItem value="moderate">Moderate Impairment</SelectItem>
                          <SelectItem value="severe">Severe Impairment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="specialNeeds">Special Needs/Notes</Label>
                    <Textarea
                      id="specialNeeds"
                      value={clientData.specialNeeds}
                      onChange={(e) => setClientData({...clientData, specialNeeds: e.target.value})}
                      placeholder="Any special care requirements or notes"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Budget Range (Monthly)</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label htmlFor="budgetMin">Minimum</Label>
                        <Input
                          id="budgetMin"
                          type="number"
                          value={clientData.budget.min}
                          onChange={(e) => setClientData({
                            ...clientData, 
                            budget: {...clientData.budget, min: parseInt(e.target.value) || 0}
                          })}
                          placeholder="Minimum budget"
                        />
                      </div>
                      <div>
                        <Label htmlFor="budgetMax">Maximum</Label>
                        <Input
                          id="budgetMax"
                          type="number"
                          value={clientData.budget.max}
                          onChange={(e) => setClientData({
                            ...clientData, 
                            budget: {...clientData.budget, max: parseInt(e.target.value) || 0}
                          })}
                          placeholder="Maximum budget"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="paymentMethod">Primary Payment Method</Label>
                    <Select value={clientData.paymentMethod} onValueChange={(value) => setClientData({...clientData, paymentMethod: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private Pay</SelectItem>
                        <SelectItem value="insurance">Long-term Care Insurance</SelectItem>
                        <SelectItem value="medicare">Medicare</SelectItem>
                        <SelectItem value="medicaid">Medicaid</SelectItem>
                        <SelectItem value="va">VA Benefits</SelectItem>
                        <SelectItem value="combination">Combination</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="insuranceInfo">Insurance Information</Label>
                    <Textarea
                      id="insuranceInfo"
                      value={clientData.insuranceInfo}
                      onChange={(e) => setClientData({...clientData, insuranceInfo: e.target.value})}
                      placeholder="Insurance provider, policy numbers, etc."
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Preferred Location/Area</Label>
                    <Input
                      id="location"
                      value={clientData.location}
                      onChange={(e) => setClientData({...clientData, location: e.target.value})}
                      placeholder="City, neighborhood, or specific area"
                    />
                  </div>
                  
                  <div>
                    <Label>Preferred Amenities</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {amenityOptions.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={clientData.amenities.includes(amenity)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setClientData({
                                  ...clientData,
                                  amenities: [...clientData.amenities, amenity]
                                });
                              } else {
                                setClientData({
                                  ...clientData,
                                  amenities: clientData.amenities.filter(a => a !== amenity)
                                });
                              }
                            }}
                          />
                          <label htmlFor={amenity} className="text-sm">{amenity}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agreement" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Placement Agreement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Payment Structure Agreement</h4>
                    <div className="text-sm space-y-2">
                      <p><strong>Commission Structure:</strong></p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Standard placement commission: First month's rent</li>
                        <li>Agent receives 80% of commission</li>
                        <li>HealthProAssist receives 20% of commission</li>
                        <li>Payment due within 30 days of successful placement</li>
                        <li>No charges for consultation or search services</li>
                      </ul>
                      
                      <p className="mt-4"><strong>Services Included:</strong></p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Comprehensive facility search and matching</li>
                        <li>Tour coordination and accompaniment</li>
                        <li>Negotiation assistance</li>
                        <li>Move-in coordination support</li>
                        <li>90-day follow-up and support</li>
                      </ul>
                      
                      <p className="mt-4 text-xs text-gray-600">
                        By signing below, the client acknowledges understanding of the payment structure 
                        and agrees to the terms of service for placement assistance.
                      </p>
                    </div>
                  </div>
                  
                  {!clientData.signatureAgreed ? (
                    <Button 
                      onClick={() => setSignatureModalOpen(true)}
                      className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-navy"
                    >
                      <PenTool className="h-4 w-4 mr-2" />
                      Digital Signature Required
                    </Button>
                  ) : (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-600">Signed</Badge>
                        <span className="text-green-800">
                          Digitally signed on {new Date(clientData.signatureDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={clientData.notes}
                      onChange={(e) => setClientData({...clientData, notes: e.target.value})}
                      placeholder="Any additional notes or special considerations"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!validateForm() || !clientData.signatureAgreed}
              className="bg-brand-sky hover:bg-blue-600"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Client
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Digital Signature Modal */}
      <Dialog open={signatureModalOpen} onOpenChange={setSignatureModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Digital Signature</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <PenTool className="h-8 w-8 mx-auto mb-2" />
                <p>Signature Capture Area</p>
                <p className="text-sm">(Simulated for demo)</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="agreement" />
              <label htmlFor="agreement" className="text-sm">
                I agree to the terms and payment structure outlined above
              </label>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setSignatureModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSignature} className="bg-brand-gold hover:bg-yellow-500 text-brand-navy">
                Confirm Signature
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClientContactModal;
