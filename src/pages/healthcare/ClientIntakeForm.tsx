import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApiService } from '@/services/apiService';
import { useApi } from '@/hooks/useApi';
import { Save, Send, FileText, User, Heart, Pill } from 'lucide-react';

interface FunctionalAbility {
  mobility: string;
  self_care: string;
  communication: string;
  cognitive_function: string;
}

interface CognitiveStatus {
  orientation: string;
  memory: string;
  decision_making: string;
}

interface Vitals {
  blood_pressure: string;
  heart_rate: string;
  temperature: string;
  weight: string;
}

interface IntakeFormData {
  patient_name: string;
  facility_name: string;
  reason_for_visit: string;
  primary_diagnosis: string;
  secondary_diagnosis: string;
  allergies: string;
  level_of_care: string;
  code_status: string;
  medications: string[];
  medication_assistance_level: string;
  functional_ability: FunctionalAbility;
  cognitive_status: CognitiveStatus;
  vitals: Vitals;
  dietary_restrictions: string;
  can_be_met_by_facility: boolean;
  dnr_directive_active: boolean;
  allow_flu_vaccine: boolean;
  allow_covid_vaccine: boolean;
  allow_tuberculin_test: boolean;
  patient_signature_date: string;
  physician_signature_date: string;
}

export const ClientIntakeForm: React.FC = () => {
  const initialFormData: IntakeFormData = {
    // Patient Information
    patient_name: '',
    facility_name: '',
    reason_for_visit: '',
    
    // Medical Information
    primary_diagnosis: '',
    secondary_diagnosis: '',
    allergies: '',
    level_of_care: '',
    code_status: '',
    
    // Medications
    medications: [],
    medication_assistance_level: '',
    
    // Functional Assessment
    functional_ability: {
      mobility: '',
      self_care: '',
      communication: '',
      cognitive_function: ''
    },
    
    // Cognitive Status
    cognitive_status: {
      orientation: '',
      memory: '',
      decision_making: ''
    },
    
    // Vital Signs
    vitals: {
      blood_pressure: '',
      heart_rate: '',
      temperature: '',
      weight: ''
    },
    
    // Additional Care Information
    dietary_restrictions: '',
    can_be_met_by_facility: false,
    dnr_directive_active: false,
    allow_flu_vaccine: false,
    allow_covid_vaccine: false,
    allow_tuberculin_test: false,
    
    // Signatures
    patient_signature_date: '',
    physician_signature_date: ''
  };

  const [formData, setFormData] = useState<IntakeFormData>(initialFormData);

  const { execute: submitForm, loading } = useApi(ApiService.submitIntakeForm, {
    showSuccessToast: true,
    successMessage: "Intake form submitted successfully!"
  });

  const handleInputChange = (field: keyof IntakeFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (section: keyof Pick<IntakeFormData, 'functional_ability' | 'cognitive_status' | 'vitals'>, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      await submitForm(formData);
      // Reset form after successful submission
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1 font-heading text-text-primary">Client Intake Form</h1>
        <p className="text-body-large text-text-secondary mt-1">Comprehensive medical and care assessment form for new clients.</p>
      </div>

      <Card className="bg-background-card border-ui-border">
        <CardHeader>
          <CardTitle className="flex items-center text-text-primary">
            <FileText className="w-5 h-5 mr-2" />
            Healthcare Assessment Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="patient-info" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="patient-info" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Patient Info
              </TabsTrigger>
              <TabsTrigger value="medical" className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Medical
              </TabsTrigger>
              <TabsTrigger value="medications" className="flex items-center">
                <Pill className="w-4 h-4 mr-2" />
                Medications
              </TabsTrigger>
              <TabsTrigger value="assessment" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Assessment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patient-info" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="patient_name" className="text-text-primary">Patient Name *</Label>
                  <Input
                    id="patient_name"
                    value={formData.patient_name}
                    onChange={(e) => handleInputChange('patient_name', e.target.value)}
                    placeholder="Full patient name"
                    className="bg-white border-ui-border text-text-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facility_name" className="text-text-primary">Facility Name</Label>
                  <Input
                    id="facility_name"
                    value={formData.facility_name}
                    onChange={(e) => handleInputChange('facility_name', e.target.value)}
                    placeholder="Name of care facility"
                    className="bg-white border-ui-border text-text-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason_for_visit" className="text-text-primary">Reason for Visit/Assessment</Label>
                <Textarea
                  id="reason_for_visit"
                  value={formData.reason_for_visit}
                  onChange={(e) => handleInputChange('reason_for_visit', e.target.value)}
                  placeholder="Describe the reason for this assessment..."
                  className="bg-white border-ui-border text-text-primary min-h-[100px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primary_diagnosis" className="text-text-primary">Primary Diagnosis</Label>
                  <Input
                    id="primary_diagnosis"
                    value={formData.primary_diagnosis}
                    onChange={(e) => handleInputChange('primary_diagnosis', e.target.value)}
                    placeholder="Primary medical diagnosis"
                    className="bg-white border-ui-border text-text-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary_diagnosis" className="text-text-primary">Secondary Diagnosis</Label>
                  <Input
                    id="secondary_diagnosis"
                    value={formData.secondary_diagnosis}
                    onChange={(e) => handleInputChange('secondary_diagnosis', e.target.value)}
                    placeholder="Secondary medical diagnosis"
                    className="bg-white border-ui-border text-text-primary"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="allergies" className="text-text-primary">Known Allergies</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  placeholder="List all known allergies and reactions..."
                  className="bg-white border-ui-border text-text-primary"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-text-primary">Level of Care Required</Label>
                  <RadioGroup 
                    value={formData.level_of_care} 
                    onValueChange={(value) => handleInputChange('level_of_care', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="independent" id="independent" />
                      <Label htmlFor="independent" className="text-text-primary">Independent Living</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="assisted" id="assisted" />
                      <Label htmlFor="assisted" className="text-text-primary">Assisted Living</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="memory" id="memory" />
                      <Label htmlFor="memory" className="text-text-primary">Memory Care</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="skilled" id="skilled" />
                      <Label htmlFor="skilled" className="text-text-primary">Skilled Nursing</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-text-primary">Code Status</Label>
                  <RadioGroup 
                    value={formData.code_status} 
                    onValueChange={(value) => handleInputChange('code_status', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full" id="full" />
                      <Label htmlFor="full" className="text-text-primary">Full Code</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dnr" id="dnr" />
                      <Label htmlFor="dnr" className="text-text-primary">Do Not Resuscitate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dni" id="dni" />
                      <Label htmlFor="dni" className="text-text-primary">Do Not Intubate</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medications" className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label className="text-text-primary">Medication Assistance Level</Label>
                <RadioGroup 
                  value={formData.medication_assistance_level} 
                  onValueChange={(value) => handleInputChange('medication_assistance_level', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="independent" id="med-independent" />
                    <Label htmlFor="med-independent" className="text-text-primary">Independent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reminders" id="med-reminders" />
                    <Label htmlFor="med-reminders" className="text-text-primary">Reminders Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="administration" id="med-administration" />
                    <Label htmlFor="med-administration" className="text-text-primary">Full Administration</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-text-primary">Vaccination Consent</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="flu_vaccine"
                      checked={formData.allow_flu_vaccine}
                      onCheckedChange={(checked) => handleInputChange('allow_flu_vaccine', checked)}
                    />
                    <Label htmlFor="flu_vaccine" className="text-text-primary">Allow Annual Flu Vaccination</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="covid_vaccine"
                      checked={formData.allow_covid_vaccine}
                      onCheckedChange={(checked) => handleInputChange('allow_covid_vaccine', checked)}
                    />
                    <Label htmlFor="covid_vaccine" className="text-text-primary">Allow COVID-19 Vaccination</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tuberculin_test"
                      checked={formData.allow_tuberculin_test}
                      onCheckedChange={(checked) => handleInputChange('allow_tuberculin_test', checked)}
                    />
                    <Label htmlFor="tuberculin_test" className="text-text-primary">Allow Tuberculin Testing</Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assessment" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-h4 font-semibold text-text-primary mb-4">Vital Signs</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="blood_pressure" className="text-text-primary">Blood Pressure</Label>
                      <Input
                        id="blood_pressure"
                        value={formData.vitals.blood_pressure}
                        onChange={(e) => handleNestedInputChange('vitals', 'blood_pressure', e.target.value)}
                        placeholder="120/80"
                        className="bg-white border-ui-border text-text-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heart_rate" className="text-text-primary">Heart Rate</Label>
                      <Input
                        id="heart_rate"
                        value={formData.vitals.heart_rate}
                        onChange={(e) => handleNestedInputChange('vitals', 'heart_rate', e.target.value)}
                        placeholder="72 bpm"
                        className="bg-white border-ui-border text-text-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temperature" className="text-text-primary">Temperature</Label>
                      <Input
                        id="temperature"
                        value={formData.vitals.temperature}
                        onChange={(e) => handleNestedInputChange('vitals', 'temperature', e.target.value)}
                        placeholder="98.6°F"
                        className="bg-white border-ui-border text-text-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-text-primary">Weight</Label>
                      <Input
                        id="weight"
                        value={formData.vitals.weight}
                        onChange={(e) => handleNestedInputChange('vitals', 'weight', e.target.value)}
                        placeholder="150 lbs"
                        className="bg-white border-ui-border text-text-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dietary_restrictions" className="text-text-primary">Dietary Restrictions</Label>
                  <Textarea
                    id="dietary_restrictions"
                    value={formData.dietary_restrictions}
                    onChange={(e) => handleInputChange('dietary_restrictions', e.target.value)}
                    placeholder="List any dietary restrictions, preferences, or special needs..."
                    className="bg-white border-ui-border text-text-primary"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="can_be_met"
                      checked={formData.can_be_met_by_facility}
                      onCheckedChange={(checked) => handleInputChange('can_be_met_by_facility', checked)}
                    />
                    <Label htmlFor="can_be_met" className="text-text-primary">Care needs can be met by this facility</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dnr_active"
                      checked={formData.dnr_directive_active}
                      onCheckedChange={(checked) => handleInputChange('dnr_directive_active', checked)}
                    />
                    <Label htmlFor="dnr_active" className="text-text-primary">DNR directive is active and on file</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-ui-border">
            <Button
              variant="outline"
              className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading || !formData.patient_name}
              className="bg-brand-red hover:bg-brand-red/90 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              {loading ? 'Submitting...' : 'Submit Form'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
