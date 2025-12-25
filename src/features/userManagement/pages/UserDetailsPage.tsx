import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserDetailsQuery, useChangeUserStatusMutation } from '@app/features/userManagement/api/userManagementApi';
import { UserDetailsCard } from '@app/features/userManagement/components/UserDetailsCard';
import { Button } from '@app/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { UserStatus } from '@app/features/userManagement/types';
import { toast } from 'react-toastify';
import { userManagementService } from '@app/features/userManagement/services/userManagementService';

export const UserDetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data: userDetailsData, isLoading, error } = useGetUserDetailsQuery(userId!, {
    skip: !userId,
  });
  const [changeStatus, { isLoading: isChangingStatus }] = useChangeUserStatusMutation();

  const user = userDetailsData?.user;
  const propertyCount = userDetailsData?.propertyCount || 0;

  const handleEdit = () => {
    navigate(`/users/${userId}/edit`);
  };

  const handleChangeStatus = async () => {
    if (!user) return;

    const newStatus = userManagementService.isUserActive(user)
      ? UserStatus.INACTIVE
      : UserStatus.ACTIVE;

    const statusLabel = userManagementService.getStatusLabel(newStatus);

    if (
      window.confirm(
        `Are you sure you want to ${statusLabel.toLowerCase()} ${
          user.profile?.fullName || user.email
        }?`
      )
    ) {
      try {
        const result = await changeStatus({ id: user.id, status: newStatus }).unwrap();
        if (result.success) {
          toast.success(result.message || 'User status updated successfully');
        } else {
          toast.error(result.message || 'Failed to update user status');
        }
      } catch (error: any) {
        toast.error(error?.message || 'An error occurred while updating status');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">User Not Found</h2>
          <p className="mt-2 text-gray-600">The user you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/users')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/users')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>

        {/* User Details Card */}
        <UserDetailsCard
          user={user}
          propertyCount={propertyCount}
          onEdit={handleEdit}
          onChangeStatus={handleChangeStatus}
          isLoading={isChangingStatus}
        />

        {/* Additional Info Sections */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Role Permissions */}
          {user.role?.permissions && user.role.permissions.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Role Permissions</h3>
              <div className="space-y-2">
                {user.role.permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-700"
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                    {permission}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Completion */}
          {user.profile?.profileCompletionScore !== undefined && (
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Profile Completion</h3>
              <div className="space-y-3">
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${user.profile.profileCompletionScore}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {user.profile.profileCompletionScore}% Complete
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
