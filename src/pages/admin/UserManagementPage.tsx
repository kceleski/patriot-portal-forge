// src/pages/admin/UserManagementPage.tsx

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Users, Plus, Search, Edit, Eye, Trash } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Jane Doe', role: 'Admin', email: 'jane@example.com', lastLogin: '1 hour ago' },
  { id: 2, name: 'Robert Smith', role: 'Facility Manager', email: 'robert@facility.com', lastLogin: 'Yesterday' },
  { id: 3, name: 'Amy Lee', role: 'Agent', email: 'amy.lee@agency.com', lastLogin: '2 days ago' },
];

export default function UserManagementPage() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(mockUsers);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray flex items-center">
            <Users className="w-7 h-7 mr-2 text-primary-sky" /> User Management
          </h1>
          <p className="text-gray-600 mt-1">Manage users, their roles, and access across your platform.</p>
        </div>
        <Button className="bg-primary-sky text-white">
          <Plus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Users</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by name or email"
                className="pl-10"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>All users with platform access</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                    <Button variant="destructive" size="sm"><Trash className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
