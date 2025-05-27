
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Video, Phone, Users } from 'lucide-react';
import moment from 'moment';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  appointment_type?: string;
  location_type?: string;
  video_link?: string;
}

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: CalendarEvent;
  onSuccess: () => void;
}

export const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  isOpen,
  onClose,
  appointment,
}) => {
  const getLocationIcon = () => {
    switch (appointment.location_type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getAppointmentTypeColor = () => {
    switch (appointment.appointment_type) {
      case 'tour':
        return 'bg-purple-100 text-purple-800';
      case 'consultation':
        return 'bg-blue-100 text-blue-800';
      case 'follow_up':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleJoinVideo = () => {
    if (appointment.video_link) {
      window.open(appointment.video_link, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Appointment Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">{appointment.title}</h3>
            {appointment.description && (
              <p className="text-gray-600 mt-1">{appointment.description}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm">
              {moment(appointment.start).format('MMMM D, YYYY [at] h:mm A')} - {moment(appointment.end).format('h:mm A')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {getLocationIcon()}
            <span className="text-sm capitalize">
              {appointment.location_type?.replace('_', ' ')}
            </span>
          </div>

          {appointment.appointment_type && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <Badge className={getAppointmentTypeColor()}>
                {appointment.appointment_type.replace('_', ' ')}
              </Badge>
            </div>
          )}

          {appointment.video_link && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 mb-2">Video meeting available</p>
              <Button
                onClick={handleJoinVideo}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Video className="h-4 w-4 mr-2" />
                Join Video Call
              </Button>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
