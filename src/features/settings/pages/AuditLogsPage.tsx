import React from 'react';
import { Button } from '@app/components/ui/button';
import { Search, Filter, Download } from 'lucide-react';
import { Input } from '@app/components/ui/input';
import type { AuditLog } from '../types';

export const AuditLogsPage: React.FC = () => {
  // Mock Data
  const logs: AuditLog[] = [
      {
          id: '1',
          userId: 'user-123',
          userName: 'Justin Paul',
          action: 'LOGIN',
          resource: 'Auth',
          details: 'User logged in successfully',
          ipAddress: '192.168.1.1',
          timestamp: '2025-12-22T08:30:00Z',
          status: 'success'
      },
      {
        id: '2',
        userId: 'user-123',
        userName: 'Justin Paul',
        action: 'DELETE_PROPERTY',
        resource: 'Property',
        resourceId: 'prop-456',
        details: 'Deleted property "Luxury Villa"',
        ipAddress: '192.168.1.1',
        timestamp: '2025-12-22T09:15:00Z',
        status: 'success'
    },
    {
        id: '3',
        userId: 'user-999',
        userName: 'Unknown',
        action: 'LOGIN_FAILURE',
        resource: 'Auth',
        details: 'Invalid password attempt',
        ipAddress: '203.0.113.5',
        timestamp: '2025-12-21T14:20:00Z',
        status: 'failure'
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-background-primary min-h-screen">
      <div className="flex items-center justify-between">
         <div>
           <h1 className="text-3xl font-bold text-text-primary">Audit Logs</h1>
           <p className="mt-1 text-text-secondary">Track admin activities and system events</p>
         </div>
         <Button variant="outline">
             <Download className="mr-2 h-4 w-4" />
             Export Logs
         </Button>
       </div>

       {/* Search & Filter */}
       <div className="flex gap-4 mb-6">
           <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
               <Input placeholder="Search by user, action, or details..." className="pl-10" />
           </div>
           <Button variant="outline">
               <Filter className="mr-2 h-4 w-4" />
               Filters
           </Button>
       </div>

       {/* Logs Table */}
       <div className="bg-surface-base border border-border-primary rounded-lg shadow-sm overflow-hidden">
           <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                   <tr>
                       <th className="px-6 py-3">Timestamp</th>
                       <th className="px-6 py-3">User</th>
                       <th className="px-6 py-3">Action</th>
                       <th className="px-6 py-3">Resource</th>
                       <th className="px-6 py-3">Details</th>
                       <th className="px-6 py-3">IP Address</th>
                       <th className="px-6 py-3">Status</th>
                   </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                   {logs.map((log) => (
                       <tr key={log.id} className="hover:bg-gray-50">
                           <td className="px-6 py-4 text-gray-500">{new Date(log.timestamp).toLocaleString()}</td>
                           <td className="px-6 py-4 font-medium text-gray-900">
                               <div>{log.userName}</div>
                               <div className="text-xs text-gray-500">{log.userId}</div>
                           </td>
                           <td className="px-6 py-4">
                               <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-800 border">
                                   {log.action}
                               </span>
                           </td>
                           <td className="px-6 py-4 text-gray-600">{log.resource}</td>
                           <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={log.details}>
                               {log.details}
                           </td>
                           <td className="px-6 py-4 text-gray-500 font-mono text-xs">{log.ipAddress}</td>
                           <td className="px-6 py-4">
                               <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                   log.status === 'success' 
                                   ? 'bg-green-100 text-green-800' 
                                   : 'bg-red-100 text-red-800'
                               }`}>
                                   {log.status.toUpperCase()}
                               </span>
                           </td>
                       </tr>
                   ))}
               </tbody>
           </table>
       </div>
    </div>
  );
};
