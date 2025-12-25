import React from 'react';
import { Button } from '@app/components/ui/button';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { Role } from '../types';

export const RoleManagementPage: React.FC = () => {
  // Mock data
  const roles: Role[] = [
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full access to all system resources',
      permissions: [],
      userCount: 3,
    },
    {
      id: '2',
      name: 'Content Manager',
      description: 'Can manage listings, categories, and content',
      permissions: [],
      userCount: 5,
    },
    {
        id: '3',
        name: 'Support Agent',
        description: 'Can view user data and manage tickets',
        permissions: [],
        userCount: 12,
      },
  ];

  return (
    <div className="space-y-6 p-6 bg-background-primary min-h-screen">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Role Management</h1>
          <p className="mt-1 text-text-secondary">Manage user roles and permissions</p>
        </div>
        <Button className="bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md">
           <Plus className="mr-2 h-4 w-4" />
           Create Role
        </Button>
      </div>

      <div className="bg-surface-base border border-border-primary rounded-lg shadow-sm">
          <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                      <th className="px-6 py-3">Role Name</th>
                      <th className="px-6 py-3">Description</th>
                      <th className="px-6 py-3">Users</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                  {roles.map((role) => (
                      <tr key={role.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{role.name}</td>
                          <td className="px-6 py-4 text-gray-500">{role.description}</td>
                          <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {role.userCount} users
                              </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                              <Button variant="ghost" size="sm">
                                  <Edit2 className="h-4 w-4 text-blue-600" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};
