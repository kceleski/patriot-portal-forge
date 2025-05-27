
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { NewAppointmentModal } from '@/components/calendar/NewAppointmentModal';
import { AppointmentDetailsModal } from '@/components/calendar/AppointmentDetailsModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

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

interface Appointment {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  appointment_type?: string;
  location_type?: string;
  video_link?: string;
  created_by: string;
}

export const CalendarPage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAppointments = async () => {
    try {
      const { data: appointments, error } = await supabase
        .from('appointments')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) throw error;

      const calendarEvents: CalendarEvent[] = (appointments as Appointment[]).map(appointment => ({
        id: appointment.id,
        title: appointment.title,
        start: new Date(appointment.start_time),
        end: new Date(appointment.end_time),
        description: appointment.description,
        appointment_type: appointment.appointment_type,
        location_type: appointment.location_type,
        video_link: appointment.video_link,
      }));

      setEvents(calendarEvents);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Error",
        description: "Failed to load appointments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedSlot({ start, end });
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseModals = () => {
    setSelectedSlot(null);
    setSelectedEvent(null);
  };

  const handleAppointmentCreated = () => {
    fetchAppointments();
    handleCloseModals();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-cream p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-secondary-off-white shadow-lg">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-primary-dark-blue">
                Calendar & Appointments
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={view === 'month' ? 'default' : 'outline'}
                  onClick={() => setView('month')}
                  className="bg-accent-gold hover:bg-accent-gold/80"
                >
                  Month
                </Button>
                <Button
                  variant={view === 'week' ? 'default' : 'outline'}
                  onClick={() => setView('week')}
                  className="bg-accent-gold hover:bg-accent-gold/80"
                >
                  Week
                </Button>
                <Button
                  variant={view === 'day' ? 'default' : 'outline'}
                  onClick={() => setView('day')}
                  className="bg-accent-gold hover:bg-accent-gold/80"
                >
                  Day
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[600px]">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable
                popup
                className="bg-white rounded-lg border shadow-sm"
                eventPropGetter={(event) => ({
                  style: {
                    backgroundColor: event.appointment_type === 'tour' ? '#8B5CF6' : 
                                   event.appointment_type === 'consultation' ? '#3B82F6' : '#10B981',
                    borderRadius: '4px',
                    border: 'none',
                    color: 'white',
                  },
                })}
              />
            </div>
          </CardContent>
        </Card>

        {selectedSlot && (
          <NewAppointmentModal
            isOpen={!!selectedSlot}
            onClose={handleCloseModals}
            startTime={selectedSlot.start}
            endTime={selectedSlot.end}
            onSuccess={handleAppointmentCreated}
          />
        )}

        {selectedEvent && (
          <AppointmentDetailsModal
            isOpen={!!selectedEvent}
            onClose={handleCloseModals}
            appointment={selectedEvent}
            onSuccess={handleAppointmentCreated}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
