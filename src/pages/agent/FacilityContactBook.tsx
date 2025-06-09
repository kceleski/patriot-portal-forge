
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Phone, Mail, Building, User, Edit, Trash2 } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  title: string;
  facility: string;
  phone: string;
  email: string;
  notes: string;
  lastContact: string;
  relationship: 'primary' | 'secondary' | 'billing';
}

const FacilityContactBook: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Admissions Director',
      facility: 'Sunset Senior Living',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@sunsetsenior.com',
      notes: 'Prefers email communication. Best to reach between 9-11 AM.',
      lastContact: '2024-01-15',
      relationship: 'primary'
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Clinical Director',
      facility: 'Golden Years Care Center',
      phone: '(555) 987-6543',
      email: 'michael.chen@goldenyears.com',
      notes: 'Very responsive. Handles all medical assessments.',
      lastContact: '2024-01-10',
      relationship: 'primary'
    }
  ]);

  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: '',
    title: '',
    facility: '',
    phone: '',
    email: '',
    notes: '',
    relationship: 'primary'
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.facility) {
      const contact: Contact = {
        id: Date.now().toString(),
        name: newContact.name!,
        title: newContact.title || '',
        facility: newContact.facility!,
        phone: newContact.phone || '',
        email: newContact.email || '',
        notes: newContact.notes || '',
        lastContact: new Date().toISOString().split('T')[0],
        relationship: newContact.relationship as any || 'primary'
      };
      setContacts([...contacts, contact]);
      setNewContact({
        name: '',
        title: '',
        facility: '',
        phone: '',
        email: '',
        notes: '',
        relationship: 'primary'
      });
      setIsAddContactOpen(false);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'primary': return 'bg-green-100 text-green-800';
      case 'secondary': return 'bg-blue-100 text-blue-800';
      case 'billing': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-brand-navy mb-2">Facility Contact Book</h1>
            <p className="text-gray-600 text-lg">Manage your facility relationships and contacts</p>
          </div>
          
          <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-gold hover:bg-yellow-500 text-brand-navy">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newContact.name || ''}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    placeholder="Contact name"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newContact.title || ''}
                    onChange={(e) => setNewContact({...newContact, title: e.target.value})}
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <Label htmlFor="facility">Facility *</Label>
                  <Input
                    id="facility"
                    value={newContact.facility || ''}
                    onChange={(e) => setNewContact({...newContact, facility: e.target.value})}
                    placeholder="Facility name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newContact.phone || ''}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email || ''}
                    onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newContact.notes || ''}
                    onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                    placeholder="Additional notes"
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddContact} className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-navy">
                  Add Contact
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search contacts, facilities, or titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <p className="text-gray-600">{contact.title}</p>
                  </div>
                  <Badge className={getRelationshipColor(contact.relationship)}>
                    {contact.relationship}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">{contact.facility}</span>
                  </div>
                  
                  {contact.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                  )}
                  
                  {contact.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{contact.email}</span>
                    </div>
                  )}
                  
                  {contact.notes && (
                    <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                      <strong>Notes:</strong> {contact.notes}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-3">
                    Last contact: {new Date(contact.lastContact).toLocaleDateString()}
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No contacts found</h3>
              <p className="text-gray-500">Try adjusting your search or add a new contact.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FacilityContactBook;
