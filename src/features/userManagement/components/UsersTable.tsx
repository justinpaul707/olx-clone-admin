import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@app/features/userManagement/types';
import { UserStatus } from '@app/features/userManagement/types';
import { userManagementService } from '@app/features/userManagement/services/userManagementService';
import { Button } from '@app/components/ui/button';
import { Edit, Trash2, Power, PowerOff, Eye } from 'lucide-react';
import { DataTable } from '@app/components/ui/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { cn } from '@app/lib/utils';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onViewDetails: (user: User) => void;
  onChangeStatus: (user: User, status: UserStatus) => void;
  isLoading?: boolean;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onEdit,
  onDelete,
  onViewDetails,
  onChangeStatus,
  isLoading = false,
}) => {
  const navigate = useNavigate();

  const columns: ColumnDef<User>[] = [
    {
      id: 'user',
      header: 'User',
      cell: ({ row }) => {
        const user = row.original;
        const initials = userManagementService.getUserInitials(user);
        return (
          <div className="flex items-center gap-3">
            {user.profile?.avatar ? (
              <img
                src={user.profile.avatar}
                alt={user.profile.fullName}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
                {initials}
              </div>
            )}
            <div>
              <div className="font-medium text-gray-900">
                {user.profile?.fullName || 'N/A'}
              </div>
              {user.username && (
                <div className="text-sm text-gray-500">@{user.username}</div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div className="text-sm text-gray-700">{row.getValue('email')}</div>,
    },
    {
      header: 'Phone',
      accessorKey: 'phone', // Use accessorKey to get value easily if it exists
      cell: ({ row }) => (
        <span className="text-sm text-gray-700">{row.original.phone || 'N/A'}</span>
      ),
    },
    {
      header: 'Role',
      accessorKey: 'role',
      cell: ({ row }) => (
        <span className="inline-flex rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
          {row.original.role?.name || 'No Role'}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const user = row.original;
        const statusColor = userManagementService.getStatusColor(user.status);
        return (
          <span
            className={cn(
              'inline-flex rounded-md border px-2 py-1 text-xs font-medium',
              statusColor
            )}
          >
            {userManagementService.getStatusLabel(user.status)}
          </span>
        );
      },
    },
    {
      header: 'Properties',
      accessorKey: 'propertyCount',
      cell: ({ row }) => {
        return (
          <Button
            variant="link"
            className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800"
            onClick={() => navigate(`/users/${row.original.id}/properties`)}
          >
            {row.original.propertyCount || 0}
          </Button>
        );
      },
    },
    {
      header: 'Created',
      accessorKey: 'createdAt',
      cell: ({ row }) => (
        <span className="text-sm text-gray-700">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewDetails(user)}
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(user)}
              title="Edit User"
            >
              <Edit className="h-4 w-4" />
            </Button>
            {user.status === UserStatus.ACTIVE ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onChangeStatus(user, UserStatus.INACTIVE)}
                title="Deactivate"
                className="text-orange-600 hover:text-orange-700"
              >
                <PowerOff className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onChangeStatus(user, UserStatus.ACTIVE)}
                title="Activate"
                className="text-green-600 hover:text-green-700"
              >
                <Power className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(user)}
              title="Delete User"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      isLoading={isLoading}
      loadingMessage="Loading users..."
      emptyMessage="No users found"
    />
  );
};
