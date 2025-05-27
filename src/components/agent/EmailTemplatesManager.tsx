
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit, Plus, Send, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

const EmailTemplatesManager = () => {
  const { user, profile } = useAuth();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    body: ''
  });

  useEffect(() => {
    if (user) {
      fetchTemplates();
      fetchClients();
    }
  }, [user]);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('agent_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to fetch templates');
    }
  };

  const fetchClients = async () => {
    try {
      // This would fetch clients from your clients table
      // For now, using mock data
      setClients([
        { id: '1', first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' },
        { id: '2', first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com' }
      ]);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const createTemplate = async () => {
    if (!formData.name || !formData.subject || !formData.body) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('email_templates')
        .insert({
          agent_id: user?.id,
          name: formData.name,
          subject: formData.subject,
          body: formData.body
        });

      if (error) throw error;

      toast.success('Template created successfully');
      setIsCreateOpen(false);
      setFormData({ name: '', subject: '', body: '' });
      fetchTemplates();
    } catch (error) {
      console.error('Error creating template:', error);
      toast.error('Failed to create template');
    } finally {
      setLoading(false);
    }
  };

  const updateTemplate = async () => {
    if (!selectedTemplate || !formData.name || !formData.subject || !formData.body) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('email_templates')
        .update({
          name: formData.name,
          subject: formData.subject,
          body: formData.body
        })
        .eq('id', selectedTemplate.id);

      if (error) throw error;

      toast.success('Template updated successfully');
      setIsEditOpen(false);
      setSelectedTemplate(null);
      setFormData({ name: '', subject: '', body: '' });
      fetchTemplates();
    } catch (error) {
      console.error('Error updating template:', error);
      toast.error('Failed to update template');
    } finally {
      setLoading(false);
    }
  };

  const deleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', templateId);

      if (error) throw error;

      toast.success('Template deleted successfully');
      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template');
    }
  };

  const openEditDialog = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setFormData({
      name: template.name,
      subject: template.subject,
      body: template.body
    });
    setIsEditOpen(true);
  };

  const openSendDialog = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setIsSendOpen(true);
  };

  const openPreviewDialog = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const replacePlaceholders = (text: string, client: Client | null) => {
    if (!client) return text;
    
    return text
      .replace(/\{\{client_name\}\}/g, `${client.first_name} ${client.last_name}`)
      .replace(/\{\{first_name\}\}/g, client.first_name)
      .replace(/\{\{last_name\}\}/g, client.last_name)
      .replace(/\{\{email\}\}/g, client.email)
      .replace(/\{\{agent_name\}\}/g, `${profile?.first_name || ''} ${profile?.last_name || ''}`)
      .replace(/\{\{contact_name\}\}/g, `${profile?.first_name || ''} ${profile?.last_name || ''}`)
      .replace(/\{\{facility_name\}\}/g, 'Sample Facility Name');
  };

  const sendEmail = async () => {
    if (!selectedTemplate || !selectedClient) {
      toast.error('Please select a template and client');
      return;
    }

    setLoading(true);
    try {
      // This would integrate with your email service
      // For now, just showing success message
      toast.success('Email sent successfully');
      setIsSendOpen(false);
      setSelectedTemplate(null);
      setSelectedClient(null);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email Templates</h2>
          <p className="text-gray-600">Manage your email templates for client communication</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary-sky hover:bg-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Email Template</DialogTitle>
              <DialogDescription>
                Create a new email template with placeholders like {`{{client_name}}`}, {`{{agent_name}}`}, etc.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Initial Consultation Follow-up"
                />
              </div>
              <div>
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g., Following up on your care consultation"
                />
              </div>
              <div>
                <Label htmlFor="body">Email Body</Label>
                <Textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Dear {{client_name}}, Thank you for..."
                  className="min-h-[200px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createTemplate} disabled={loading}>
                {loading ? 'Creating...' : 'Create Template'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription>{template.subject}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {template.body.substring(0, 150)}...
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openPreviewDialog(template)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(template)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary-red hover:bg-red-600"
                    onClick={() => openSendDialog(template)}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteTemplate(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Template Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Email Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editName">Template Name</Label>
              <Input
                id="editName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editSubject">Email Subject</Label>
              <Input
                id="editSubject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editBody">Email Body</Label>
              <Textarea
                id="editBody"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={updateTemplate} disabled={loading}>
              {loading ? 'Updating...' : 'Update Template'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Email Dialog */}
      <Dialog open={isSendOpen} onOpenChange={setIsSendOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>
              Select a client to send this email template to
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select Client</Label>
              <Select 
                value={selectedClient?.id || ''} 
                onValueChange={(value) => {
                  const client = clients.find(c => c.id === value);
                  setSelectedClient(client || null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a client..." />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.first_name} {client.last_name} ({client.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedTemplate && selectedClient && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-2">Email Preview:</h4>
                <div className="space-y-2">
                  <div>
                    <strong>Subject:</strong> {replacePlaceholders(selectedTemplate.subject, selectedClient)}
                  </div>
                  <div>
                    <strong>Body:</strong>
                    <div className="mt-1 p-2 bg-white rounded text-sm">
                      {replacePlaceholders(selectedTemplate.body, selectedClient)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSendOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendEmail} disabled={loading || !selectedClient}>
              {loading ? 'Sending...' : 'Send Email'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div>
                <strong>Template Name:</strong> {selectedTemplate.name}
              </div>
              <div>
                <strong>Subject:</strong> {selectedTemplate.subject}
              </div>
              <div>
                <strong>Body:</strong>
                <div className="mt-1 p-4 bg-gray-50 rounded text-sm whitespace-pre-wrap">
                  {selectedTemplate.body}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Available placeholders:</strong> {`{{client_name}}`}, {`{{first_name}}`}, {`{{last_name}}`}, {`{{email}}`}, {`{{agent_name}}`}, {`{{contact_name}}`}, {`{{facility_name}}`}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailTemplatesManager;
