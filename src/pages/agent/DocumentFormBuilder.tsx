import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Plus, Save, Edit, Trash2, Download } from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'date' | 'number';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormTemplate {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  createdDate: string;
  lastModified: string;
}

const DocumentFormBuilder: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNewFormModalOpen, setIsNewFormModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [templates, setTemplates] = useState<FormTemplate[]>([
    {
      id: '1',
      name: 'Standard Intake Form',
      description: 'Basic client intake information form',
      fields: [
        { id: '1', type: 'text', label: 'Full Name', required: true },
        { id: '2', type: 'date', label: 'Date of Birth', required: true },
        { id: '3', type: 'textarea', label: 'Medical History', required: false },
        { id: '4', type: 'select', label: 'Care Level', required: true, options: ['Independent', 'Assisted', 'Memory Care', 'Skilled Nursing'] }
      ],
      createdDate: '2024-01-15',
      lastModified: '2024-01-20'
    }
  ]);

  const [newField, setNewField] = useState<Partial<FormField>>({
    type: 'text',
    label: '',
    required: false
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const parseDocument = () => {
    if (!uploadedFile) return;
    
    // Mock document parsing - in real implementation, this would use OCR/AI
    const mockFields: FormField[] = [
      { id: Date.now().toString(), type: 'text', label: 'Patient Name', required: true },
      { id: (Date.now() + 1).toString(), type: 'date', label: 'Assessment Date', required: true },
      { id: (Date.now() + 2).toString(), type: 'textarea', label: 'Clinical Notes', required: false },
      { id: (Date.now() + 3).toString(), type: 'checkbox', label: 'Consent for Treatment', required: true }
    ];

    const newTemplate: FormTemplate = {
      id: Date.now().toString(),
      name: uploadedFile.name.replace(/\.[^/.]+$/, "") + ' - Parsed Form',
      description: `Form generated from ${uploadedFile.name}`,
      fields: mockFields,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setTemplates([...templates, newTemplate]);
    setUploadedFile(null);
    setIsUploadModalOpen(false);
  };

  const addFieldToTemplate = (templateId: string) => {
    if (!newField.label) return;

    const field: FormField = {
      id: Date.now().toString(),
      type: newField.type as any,
      label: newField.label,
      placeholder: newField.placeholder,
      required: newField.required || false,
      options: newField.options
    };

    setTemplates(templates.map(template => 
      template.id === templateId 
        ? { ...template, fields: [...template.fields, field], lastModified: new Date().toISOString().split('T')[0] }
        : template
    ));

    setNewField({ type: 'text', label: '', required: false });
  };

  const removeField = (templateId: string, fieldId: string) => {
    setTemplates(templates.map(template =>
      template.id === templateId
        ? { ...template, fields: template.fields.filter(f => f.id !== fieldId) }
        : template
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-brand-navy mb-2">Document Form Builder</h1>
            <p className="text-gray-600 text-lg">Upload documents and create reusable form templates</p>
          </div>
          
          <div className="flex space-x-3">
            <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-brand-sky hover:bg-blue-600">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload & Parse Document
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Document for Parsing</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PDF, DOC, DOCX, JPG, PNG</p>
                    </label>
                  </div>
                  
                  {uploadedFile && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-green-800">File uploaded: {uploadedFile.name}</p>
                    </div>
                  )}
                  
                  <Button 
                    onClick={parseDocument} 
                    disabled={!uploadedFile}
                    className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-navy"
                  >
                    Parse Document & Create Form
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>
        </div>

        {/* Template List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{template.name}</CardTitle>
                    <p className="text-gray-600 mt-1">{template.description}</p>
                  </div>
                  <Badge variant="outline">{template.fields.length} fields</Badge>
                </div>
                <div className="text-sm text-gray-500">
                  Created: {new Date(template.createdDate).toLocaleDateString()} | 
                  Modified: {new Date(template.lastModified).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {template.fields.slice(0, 3).map((field) => (
                      <Badge key={field.id} variant="secondary">
                        {field.label}
                      </Badge>
                    ))}
                    {template.fields.length > 3 && (
                      <Badge variant="secondary">+{template.fields.length - 3} more</Badge>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedTemplate(template)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Form Builder Modal */}
        {selectedTemplate && (
          <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Form Template: {selectedTemplate.name}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Template Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Template Name</Label>
                    <Input value={selectedTemplate.name} />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input value={selectedTemplate.description} />
                  </div>
                </div>

                {/* Existing Fields */}
                <div>
                  <h4 className="font-semibold mb-3">Form Fields</h4>
                  <div className="space-y-3">
                    {selectedTemplate.fields.map((field) => (
                      <div key={field.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline">{field.type}</Badge>
                            <span className="font-medium">{field.label}</span>
                            {field.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                          </div>
                          {field.placeholder && (
                            <p className="text-sm text-gray-500 mt-1">Placeholder: {field.placeholder}</p>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => removeField(selectedTemplate.id, field.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add New Field */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Add New Field</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Field Type</Label>
                      <Select value={newField.type} onValueChange={(value) => setNewField({...newField, type: value as any})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text Input</SelectItem>
                          <SelectItem value="textarea">Text Area</SelectItem>
                          <SelectItem value="select">Dropdown</SelectItem>
                          <SelectItem value="checkbox">Checkbox</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Field Label</Label>
                      <Input 
                        value={newField.label || ''} 
                        onChange={(e) => setNewField({...newField, label: e.target.value})}
                        placeholder="Enter field label"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-4">
                    <Button 
                      onClick={() => addFieldToTemplate(selectedTemplate.id)}
                      disabled={!newField.label}
                      size="sm"
                      className="bg-brand-gold hover:bg-yellow-500 text-brand-navy"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Field
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                    Cancel
                  </Button>
                  <Button className="bg-brand-sky hover:bg-blue-600">
                    <Save className="h-4 w-4 mr-2" />
                    Save Template
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default DocumentFormBuilder;
