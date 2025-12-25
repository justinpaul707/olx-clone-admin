import React from 'react';
import type { User } from '@app/features/userManagement/types';
import { userManagementService } from '@app/features/userManagement/services/userManagementService';
import { Button } from '@app/components/ui/button';
import { Card } from '@app/components/ui/card';
import { Mail, Phone, Calendar, Package, Edit, Power, PowerOff } from 'lucide-react';
import { cn } from '@app/lib/utils';

interface UserDetailsCardProps {
  user: User;
  propertyCount?: number;
  onEdit: () => void;
  onChangeStatus: () => void;
  isLoading?: boolean;
}

export const UserDetailsCard: React.FC<UserDetailsCardProps> = ({
  user,
  propertyCount = 0,
  onEdit,
  onChangeStatus,
  isLoading = false,
}) => {
  const statusColor = userManagementService.getStatusColor(user.status);
  const statusLabel = userManagementService.getStatusLabel(user.status);
  const initials = userManagementService.getUserInitials(user);
  const isActive = userManagementService.isUserActive(user);

  return (
    <Card className="overflow-hidden">
      {/* Header with background */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

      {/* User Info */}
      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 mb-4">
          {user.profile?.avatar ? (
            <img
              src={user.profile.avatar}
              alt={user.profile.fullName}
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-3xl font-bold text-blue-700 shadow-lg">
              {initials}
            </div>
          )}
          <span
            className={cn(
              'absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white',
              isActive ? 'bg-green-500' : 'bg-gray-400'
            )}
          ></span>
        </div>

        {/* Name and Role */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{user.profile?.fullName || 'N/A'}</h2>
          {user.username && <p className="text-gray-600">@{user.username}</p>}
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex rounded-md bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700">
              {user.role?.name || 'No Role'}
            </span>
            <span
              className={cn(
                'inline-flex rounded-md border px-3 py-1 text-sm font-medium',
                statusColor
              )}
            >
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="h-5 w-5 text-gray-400" />
            <span>{user.email}</span>
          </div>
          {user.phone && (
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="h-5 w-5 text-gray-400" />
              <span>{user.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-gray-700">
            <Package className="h-5 w-5 text-gray-400" />
            <span>{propertyCount} Properties</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm text-gray-600">Created</div>
            <div className="mt-1 font-semibold text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm text-gray-600">Last Updated</div>
            <div className="mt-1 font-semibold text-gray-900">
              {new Date(user.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {user.lastLogin && (
          <div className="mb-6 flex items-center gap-3 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Last login: {new Date(user.lastLogin).toLocaleString()}</span>
          </div>
        )}

        {/* Bio */}
        {user.profile?.bio && (
          <div className="mb-6">
            <h3 className="mb-2 font-semibold text-gray-900">About</h3>
            <p className="text-gray-700">{user.profile.bio}</p>
          </div>
        )}

        {/* Address */}
        {user.profile?.address && (
          <div className="mb-6">
            <h3 className="mb-2 font-semibold text-gray-900">Address</h3>
            <p className="text-gray-700">{user.profile.address}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={onEdit} disabled={isLoading} className="flex-1">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          <Button
            onClick={onChangeStatus}
            disabled={isLoading}
            variant={isActive ? 'outline' : 'default'}
            className={cn(!isActive && 'bg-green-600 hover:bg-green-700')}
          >
            {isActive ? (
              <>
                <PowerOff className="mr-2 h-4 w-4" />
                Deactivate
              </>
            ) : (
              <>
                <Power className="mr-2 h-4 w-4" />
                Activate
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};
