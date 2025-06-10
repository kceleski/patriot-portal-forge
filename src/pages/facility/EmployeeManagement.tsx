
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Mail, Phone, Shield, Edit, Trash2, Search } from 'lucide-react';

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@facility.com',
      phone: '(555) 123-4567',
      role: 'Placement Specialist',
      status: 'Active',
      department: 'Admissions',
      hireDate: '2023-01-15',
      lastLogin: '2024-12-13 09:30 AM'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@facility.com',
      phone: '(555) 234-5678',
      role: 'Care Coordinator',
      status: 'Active',
      department: 'Care Services',
      hireDate: '2022-08-20',
      lastLogin: '2024-12-13 08:45 AM'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@facility.com',
      phone: '(555) 345-6789',
      role: 'Marketing Manager',
      status: 'Active',
      department: 'Marketing',
      hireDate: '2023-03-10',
      lastLogin: '2024-12-12 04:20 PM'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@facility.com',
      phone: '(555) 456-7890',
      role: 'Admin Assistant',
      status: 'Inactive',
      department: 'Administration',
      hireDate: '2023-06-01',
      lastLogin: '2024-12-10 02:15 PM'
    }
  ];

  const departments = ['All', 'Admissions', 'Care Services', 'Marketing', 'Administration', 'Nursing'];
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray">Employee Management</h1>
          <p className="text-gray-600 mt-2">Manage your facility staff and their portal access.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            Import Employees
          </Button>
          <Button className="bg-primary-red hover:bg-red-600">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary-sky" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{employees.length}</p>
                <p className="text-gray-600">Total Employees</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">
                  {employees.filter(e => e.status === 'Active').length}
                </p>
                <p className="text-gray-600">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-accent-gold" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">{departments.length - 1}</p>
                <p className="text-gray-600">Departments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary-red" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-text-dark-gray">
                  {employees.filter(e => e.role.includes('Specialist')).length}
                </p>
                <p className="text-gray-600">Specialists</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>Search and filter your facility employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDepartment(dept)}
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>

          {/* Employee List */}
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-sky rounded-full flex items-center justify-center text-white font-semibold">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark-gray">{employee.name}</h4>
                    <p className="text-sm text-gray-600">{employee.role} • {employee.department}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <Mail className="h-3 w-3 mr-1" />
                        {employee.email}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Phone className="h-3 w-3 mr-1" />
                        {employee.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <Badge className={employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {employee.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">Last login: {employee.lastLogin}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Configure what each role can access in the portal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-text-dark-gray mb-3">Placement Specialist</h4>
              <ul className="space-y-2 text-sm">
                <li>✅ View and edit resident information</li>
                <li>✅ Access intake documents</li>
                <li>✅ Manage tour scheduling</li>
                <li>✅ View facility analytics</li>
                <li>❌ Manage employees</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-text-dark-gray mb-3">Care Coordinator</h4>
              <ul className="space-y-2 text-sm">
                <li>✅ View resident care plans</li>
                <li>✅ Access medical records</li>
                <li>✅ Schedule appointments</li>
                <li>❌ View financial data</li>
                <li>❌ Manage employees</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-text-dark-gray mb-3">Administrator</h4>
              <ul className="space-y-2 text-sm">
                <li>✅ Full access to all modules</li>
                <li>✅ Manage employees</li>
                <li>✅ View financial reports</li>
                <li>✅ Configure facility settings</li>
                <li>✅ Manage contracts</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeManagement;
