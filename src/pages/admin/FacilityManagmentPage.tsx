// src/pages/admin/FacilityManagementPage.tsx

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Home, Plus, Search, Edit, Eye, Trash } from 'lucide-react';

const mockFacilities = [
  { id: 1, name: 'Sunrise Senior Living', city: 'Phoenix', type: 'Assisted Living', status: 'Active' },
  { id: 2, name: 'Golden Years Care', city: 'Scottsdale', type: 'Memory Care', status: 'Pending' },
  { id: 3, name: 'Peaceful Valley', city: 'Mesa', type: 'Skilled Nursing', status: 'Active' },
];

export default function FacilityManagementPage() {
  const [search, setSearch] = useState('');
  const [facilities, setFacilities] = useState(mockFacilities);

  const filtered = facilities.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-dark-gray flex items-center">
            <Home className="w-7 h-7 mr-2 text-primary-sky" /> Facility Management
          </h1>
          <p className="text-gray-600 mt-1">Manage all senior care facilities on your platform.</p>
        </div>
        <Button className="bg-primary-sky text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Facility
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Facilities</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by name or city"
                className="pl-10"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>Facilities registered with the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(facility => (
                <TableRow key={facility.id}>
                  <TableCell>{facility.name}</TableCell>
                  <TableCell>{facility.city}</TableCell>
                  <TableCell>{facility.type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${facility.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                      {facility.status}
                    </span>
                  </TableCell>
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
