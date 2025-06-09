
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users, User, Briefcase, Building } from 'lucide-react';
import { useTempAuth } from '@/contexts/TempAuthContext';

interface TempLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TempLoginModal: React.FC<TempLoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useTempAuth();

  const handleUserTypeLogin = (userType: string) => {
    login(userType);
    onClose();
  };

  const userTypes = [
    { type: 'family', label: 'Family/Client', icon: Users, color: 'bg-brand-red' },
    { type: 'healthcare', label: 'Healthcare Professional', icon: User, color: 'bg-brand-sky' },
    { type: 'agent', label: 'Placement Agent', icon: Briefcase, color: 'bg-brand-gold' },
    { type: 'facility', label: 'Facility Manager', icon: Building, color: 'bg-brand-navy' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Choose Your Portal
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {userTypes.map(({ type, label, icon: Icon, color }) => (
            <Button
              key={type}
              onClick={() => handleUserTypeLogin(type)}
              className={`w-full h-16 ${color} hover:opacity-90 text-white flex items-center justify-start space-x-4 text-lg`}
            >
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TempLoginModal;
