
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react';
import { ParticipantsList } from './ParticipantsList';
import FeatureGate from '@/components/FeatureGate';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  onAppointmentCreated: () => void;
}

interface Participant {
  email: string;
  name?: string;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onAppointmentCreated,
}) => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: selectedDate ? selectedDate.toISOString().slice(0, 16) : '',
    end_time: '',
    appointment_type: '',
    location_type: '',
    location: '',
    video_link: '',
  });

  const generateVideoLink = () => {
    if (formData.location_type === 'video') {
      const meetingId = Math.random().toString(36).substring(2, 15);
      const videoLink = `${window.location.origin}/meeting/${meetingId}`;
      setFormData({ ...formData, video_link: videoLink });
    }
  };

  const handleLocationTypeChange = (value: string) => {
    setFormData({ ...formData, location_type: value });
    if (value === 'video') {
      generateVideoLink();
    } else {
      setFormData({ ...formData, video_link: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.start_time || !formData.end_time || !formData.appointment_type) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Create the appointment
      const appointmentData = {
        title: formData.title,
        description: formData.description,
        start_time: formData.start_time,
        end_time: formData.end_time,
        appointment_type: formData.appointment_type,
        location_type: formData.location_type,
        location: formData.location,
        video_link: formData.video_link,
        created_by: user?.id,
      };

      const { data: appointment, error: appointmentError } = await supabase
        .from('appointments')
        .insert(appointmentData)
        .select()
        .single();

      if (appointmentError) throw appointmentError;

      // Add participants
      if (participants.length > 0) {
        const participantData = participants.map(participant => ({
          appointment_id: appointment.id,
          participant_email: participant.email,
          participant_name: participant.name,
        }));

        const { error: participantError } = await supabase
          .from('appointment_participants')
          .insert(participantData);

        if (participantError) throw participantError;
      }

      toast.success('Appointment created successfully');
      onAppointmentCreated();
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        appointment_type: '',
        location_type: '',
        location: '',
        video_link: '',
      });
      setParticipants([]);
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('Failed to create appointment');
    } finally {
      setLoading(false);
    }
  };

  const isVideoOptionAvailable = () => {
    return profile?.user_type === 'healthcare' && 
           (profile?.subscription_tier === 'Elevate' || profile?.subscription_tier === 'Pinnacle');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Create New Appointment
          </DialogTitle>
          <DialogDescription>
            Schedule a new appointment with clients or team members
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Initial Consultation"
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional details about the appointment..."
                className="min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="start_time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Start Time *
              </Label>
              <Input
                id="start_time"
                type="datetime-local"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="end_time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                End Time *
              </Label>
              <Input
                id="end_time"
                type="datetime-local"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="appointment_type">Appointment Type *</Label>
              <Select value={formData.appointment_type} onValueChange={(value) => setFormData({ ...formData, appointment_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="tour">Facility Tour</SelectItem>
                  <SelectItem value="follow_up">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location_type" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location Type
              </Label>
              <Select value={formData.location_type} onValueChange={handleLocationTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_person">In Person</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <FeatureGate
                    requiredUserType="healthcare"
                    requiredTier={['Elevate', 'Pinnacle']}
                    fallback={null}
                  >
                    <SelectItem value="video">Video Conference</SelectItem>
                  </FeatureGate>
                </SelectContent>
              </Select>
            </div>

            {formData.location_type === 'in_person' && (
              <div className="col-span-2">
                <Label htmlFor="location">Location Address</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter the meeting location..."
                />
              </div>
            )}

            {formData.location_type === 'video' && formData.video_link && (
              <div className="col-span-2">
                <Label>Video Meeting Link</Label>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    Video link generated: <span className="font-mono">{formData.video_link}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Participants
            </Label>
            <ParticipantsList participants={participants} onChange={setParticipants} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-primary-sky hover:bg-blue-600">
              {loading ? 'Creating...' : 'Create Appointment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
