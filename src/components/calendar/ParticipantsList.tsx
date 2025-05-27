
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';

interface Participant {
  email: string;
  name?: string;
}

interface ParticipantsListProps {
  participants: Participant[];
  onChange: (participants: Participant[]) => void;
}

export const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  onChange,
}) => {
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');

  const addParticipant = () => {
    if (newEmail.trim()) {
      const newParticipant: Participant = {
        email: newEmail.trim(),
        name: newName.trim() || undefined,
      };
      onChange([...participants, newParticipant]);
      setNewEmail('');
      setNewName('');
    }
  };

  const removeParticipant = (index: number) => {
    onChange(participants.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Label>Participants</Label>
      
      {participants.length > 0 && (
        <div className="space-y-2">
          {participants.map((participant, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <div className="flex-1">
                <div className="font-medium">{participant.name || 'No name'}</div>
                <div className="text-sm text-gray-600">{participant.email}</div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeParticipant(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2 p-3 border rounded-lg bg-gray-50">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              placeholder="Participant name (optional)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Participant email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addParticipant}
          disabled={!newEmail.trim()}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Participant
        </Button>
      </div>
    </div>
  );
};
