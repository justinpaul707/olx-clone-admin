import React, { useState } from 'react';
import { Input } from '@app/components/ui/input';
import { Label } from '@app/components/ui/label';
import { Search, User as UserIcon, MapPin } from 'lucide-react';
import { useGetUsersQuery } from '@app/features/userManagement/api/userManagementApi';
import type { User } from '@app/features/userManagement/types';

interface OwnerLocationStepProps {
  formData: {
    ownerId: string;
    locationId: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  onChange: (field: string, value: any) => void;
}

export const OwnerLocationStep: React.FC<OwnerLocationStepProps> = ({ formData, onChange }) => {
  const [userSearch, setUserSearch] = useState('');
  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery({ 
    page: 1, 
    limit: 10,
    search: userSearch 
  });
  
  const users = usersData?.users || [];

  const selectedUser = users.find(u => u.id === formData.ownerId);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Owner Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <UserIcon className="h-5 w-5 text-brand-primary" />
          <h3 className="text-lg font-semibold text-gray-800">Property Owner</h3>
        </div>
        
        <div className="relative">
          <Label htmlFor="userSearch">Search Owner</Label>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="userSearch"
              placeholder="Search by name or email..."
              className="pl-9"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </div>
          
          {/* User List Dropdown / Selection Area */}
          <div className="mt-2 max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-sm">
            {isUsersLoading ? (
              <div className="p-4 text-center text-sm text-gray-500">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">No users found.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {users.map((user: User) => (
                  <div
                    key={user.id}
                    onClick={() => onChange('ownerId', user.id)}
                    className={`flex cursor-pointer items-center justify-between p-3 transition-colors hover:bg-gray-50 ${
                      formData.ownerId === user.id ? 'bg-brand-primary/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
                        {user.profile?.fullName?.[0] || user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.profile?.fullName || 'Unknown Name'}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    {formData.ownerId === user.id && (
                      <span className="text-xs font-semibold text-brand-primary">Selected</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {selectedUser && (
             <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                 <p className="text-sm text-green-800">
                   Selected Owner: <strong>{selectedUser.profile?.fullName || 'Unknown Name'}</strong> ({selectedUser.email})
                 </p>
             </div>
          )}
        </div>
      </div>

      {/* Location Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <MapPin className="h-5 w-5 text-brand-primary" />
          <h3 className="text-lg font-semibold text-gray-800">Location</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="e.g. 123 Main St"
              value={formData.address}
              onChange={(e) => onChange('address', e.target.value)}
            />
          </div>
          <div className="space-y-2">
             <Label htmlFor="city">City</Label>
             <Input
               id="city"
               placeholder="City"
               value={formData.city}
               onChange={(e) => onChange('city', e.target.value)}
             />
          </div>
          <div className="space-y-2">
             <Label htmlFor="state">State</Label>
             <Input
               id="state"
               placeholder="State"
               value={formData.state}
               onChange={(e) => onChange('state', e.target.value)}
             />
          </div>
          <div className="space-y-2">
             <Label htmlFor="zipCode">Zip Code</Label>
             <Input
               id="zipCode"
               placeholder="Zip Code"
               value={formData.zipCode}
               onChange={(e) => onChange('zipCode', e.target.value)}
             />
          </div>
          <div className="space-y-2">
             <Label htmlFor="country">Country</Label>
             <Input
               id="country"
               placeholder="Country"
               value={formData.country}
               onChange={(e) => onChange('country', e.target.value)}
             />
          </div>
        </div>
        <p className="text-xs text-gray-500 italic mt-2">
          * Location will be created or linked based on entered details.
        </p>
      </div>

    </div>
  );
};
