import React, { useState } from 'react';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useChangeUserStatusMutation,
} from '@app/features/userManagement/api/userManagementApi';
import { setPage, setSearchQuery } from '@app/features/userManagement/store/userManagementSlice';
import { useAppDispatch, useAppSelector } from '@app/app/store/store';
import { UsersTable } from '@app/features/userManagement/components/UsersTable';
import { CreateUserModal } from '@app/features/userManagement/components/CreateUserModal';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import CustomPagination from '@app/components/pagination/CustomPagination';
import type { User } from '@app/features/userManagement/types';
import { UserStatus } from '@app/features/userManagement/types';
import { userManagementService } from '@app/features/userManagement/services/userManagementService';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useAlertModal } from '@app/hooks/useAlertModal';
import { AlertModal } from '@app/components/containers/AlertModal/AlertModal';

export const UserManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const alert = useAlertModal();

  const { filters } = useAppSelector((state) => state.userManagement);
  const { data: usersData, isLoading, refetch } = useGetUsersQuery(filters);
  const [deleteUser] = useDeleteUserMutation();
  const [changeStatus] = useChangeUserStatusMutation();

  const users = usersData?.users || [];
  const totalCount = usersData?.totalCount || 0;
  const totalPages = usersData?.totalPages || 0;
  const currentPage = usersData?.currentPage || 1;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    dispatch(setSearchQuery(value));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleEdit = (user: User) => {
    navigate(`/users/${user.id}/edit`);
  };

  const handleViewDetails = (user: User) => {
    navigate(`/users/${user.id}`);
  };

  const confirmDelete = (user: User) => {
    const canDelete = userManagementService.canDeleteUser(user);
    if (!canDelete.canDelete) {
      toast.error(canDelete.reason);
      return;
    }

    alert.show({
      title: 'Delete User',
      message: `Are you sure you want to delete ${user.profile?.fullName || user.email}? This action cannot be undone.`,
      variant: 'danger',
      confirmText: 'Delete',
      onConfirm: async () => {
        alert.setLoading(true);
        try {
          const result = await deleteUser({ id: user.id }).unwrap();
          if (result.success) {
            toast.success(result.message || 'User deleted successfully');
            alert.hide();
          } else {
            toast.error(result.message || 'Failed to delete user');
          }
        } catch (error: any) {
          toast.error(error?.message || 'An error occurred while deleting user');
        } finally {
          alert.setLoading(false);
        }
      },
    });
  };

  const handleStatusChange = (user: User, status: UserStatus) => {
    alert.show({
      title: 'Change User Status',
      message: `Are you sure you want to ${userManagementService.getStatusLabel(status).toLowerCase()} ${user.profile?.fullName || user.email}?`,
      variant: 'warning',
      confirmText: 'Confirm',
      onConfirm: async () => {
        alert.setLoading(true);
        try {
          const result = await changeStatus({ id: user.id, status }).unwrap();
          if (result.success) {
            toast.success(result.message || 'User status updated successfully');
            alert.hide();
          } else {
            toast.error(result.message || 'Failed to update user status');
          }
        } catch (error: any) {
          toast.error(error?.message || 'An error occurred while updating status');
        } finally {
          alert.setLoading(false);
        }
      },
    });
  };

  const handleExport = () => {
    userManagementService.exportUsersToCSV(users);
    toast.success('Users exported successfully');
  };

  return (
    <div className="space-y-6 p-6 bg-background-primary">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">User Management</h1>
          <p className="mt-1 text-text-secondary">Manage user accounts and permissions</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search users by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border-primary bg-surface-base p-4">
          <div className="text-sm font-medium text-text-secondary">
            Total Users
          </div>
          <div className="mt-2 text-2xl font-bold text-text-primary">
            {totalCount}
          </div>
        </div>
        <div className="rounded-lg border border-border-primary bg-surface-base p-4">
          <div className="text-sm font-medium text-text-secondary">
            Active Users
          </div>
          <div className="mt-2 text-2xl font-bold text-status-success">
            {users.filter((u) => u.status === UserStatus.ACTIVE).length}
          </div>
        </div>
        <div className="rounded-lg border border-border-primary bg-surface-base p-4">
          <div className="text-sm font-medium text-text-secondary">
            Inactive Users
          </div>
          <div className="mt-2 text-2xl font-bold text-text-secondary">
            {users.filter((u) => u.status === UserStatus.INACTIVE).length}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <UsersTable
        users={users}
        onEdit={handleEdit}
        onDelete={confirmDelete}
        onViewDetails={handleViewDetails}
        onChangeStatus={handleStatusChange}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {/* Alert Modal */}
      <AlertModal
        isOpen={alert.isOpen}
        onClose={alert.hide}
        onConfirm={alert.onConfirm}
        title={alert.title}
        message={alert.message}
        variant={alert.variant}
        confirmText={alert.confirmText}
        cancelText={alert.cancelText}
        isLoading={alert.isLoading}
      />
    </div>
  );
};
