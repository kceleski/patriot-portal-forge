
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ParticipantsList } from './ParticipantsList';
import { FeatureGate } from '@/components/FeatureGate';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  startTime: Date;
  endTime: Date;
  onSuccess: () => void;
}

interface Participant {
  email: string;
  name?: string;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  startTime,
  endTime,
  onSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [appointmentType, setAppointmentType] = useState<string>('');
  const [locationType, setLocationType] = useState<string>('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      // Generate video link if video appointment
      let videoLink = null;
      if (locationType === 'video') {
        videoLink = `https://meet.${window.location.hostname}/room/${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      }

      // Create appointment
      const { data: appointment, error: appointmentError } = await supabase
        .from('appointments')
        .insert({
          title,
          description,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          appointment_type: appointmentType,
          location_type: locationType,
          video_link: videoLink,
          created_by: user.id,
          status: 'scheduled'
        })
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

      toast({
        title: "Success",
        description: "Appointment created successfully",
      });

      onSuccess();
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast({
        title: "Error",
        description: "Failed to create appointment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setAppointmentType('');
    setLocationType('');
    setParticipants([]);
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="datetime-local"
                value={startTime.toISOString().slice(0, 16)}
                onChange={(e) => {
                  const newStart = new Date(e.target.value);
                  if (newStart < endTime) {
                    // Update startTime - this would need to be passed up to parent
                  }
                }}
              />
            </div>
            <div>
              <Label htmlFor="end-time">End Time</Label>
              <Input
                id="end-time"
                type="datetime-local"
                value={endTime.toISOString().slice(0, 16)}
                onChange={(e) => {
                  const newEnd = new Date(e.target.value);
                  if (newEnd > startTime) {
                    // Update endTime - this would need to be passed up to parent
                  }
                }}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="appointment-type">Appointment Type</Label>
            <Select value={appointmentType} onValueChange={setAppointmentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="tour">Tour</SelectItem>
                <SelectItem value="follow_up">Follow Up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location-type">Location Type</Label>
            <Select value={locationType} onValueChange={setLocationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select location type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in_person">In Person</SelectItem>
                <FeatureGate 
                  requiredTier="elevate" 
                  userType="professional"
                  fallback={null}
                >
                  <SelectItem value="video">Video Call</SelectItem>
                </FeatureGate>
                <SelectItem value="phone">Phone Call</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ParticipantsList
            participants={participants}
            onChange={setParticipants}
          />

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !title.trim() || !appointmentType || !locationType}
              className="bg-accent-gold hover:bg-accent-gold/80"
            >
              {loading ? 'Creating...' : 'Create Appointment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
