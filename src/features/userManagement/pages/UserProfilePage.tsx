import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '@app/features/userManagement/api/userManagementApi';
import { useAppDispatch, useAppSelector } from '@app/app/store/store';
import {
  setProfileEditing,
  updateProfileField,
  setAvatarPreview,
  initializeProfileForm,
  resetProfileEdit,
} from '@app/features/userManagement/store/userManagementSlice';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { Card } from '@app/components/ui/card';
import { ArrowLeft, Loader2, Save, Camera, MapPin, Briefcase, Calendar, Shield, Activity, Mail, Phone, User as UserIcon, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { cn } from '@app/lib/utils';
import type { UpdateUserInput } from '@app/features/userManagement/types';

export const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: userDetailsData, isLoading, error } = useGetUserDetailsQuery(userId!, {
    skip: !userId,
  });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const { isEditing, formData, avatarPreview } = useAppSelector((state) => state.userManagement.profileEdit);

  const user = userDetailsData?.user;
  const propertyCount = userDetailsData?.propertyCount || 0;

  React.useEffect(() => {
    if (user) {
      dispatch(initializeProfileForm(user));
    }
    return () => {
      dispatch(resetProfileEdit());
    };
  }, [user, dispatch]);

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateProfileField({ field, value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setAvatarPreview(reader.result as string));
        dispatch(updateProfileField({ field: 'profile.avatar', value: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.id) return;

    try {
      const result = await updateUser(formData as UpdateUserInput).unwrap();
      if (result.success) {
        toast.success(result.message || 'Profile updated successfully');
        dispatch(setProfileEditing(false));
        dispatch(setAvatarPreview(null));
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    } catch (error: any) {
      toast.error(error?.message || 'An error occurred while updating profile');
    }
  };

  const handleCancel = () => {
    dispatch(setProfileEditing(false));
    dispatch(setAvatarPreview(null));
    if (user) {
      dispatch(initializeProfileForm(user));
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-primary">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-primary">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary">User Not Found</h2>
          <p className="mt-2 text-text-secondary">The user you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/user-list')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  const initials = user.profile?.fullName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-background-primary p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/user-list')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
          {!isEditing ? (
            <Button onClick={() => dispatch(setProfileEditing(true))} className="bg-brand-primary text-white hover:bg-brand-primary/90">
              <UserIcon className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleCancel} disabled={isUpdating}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isUpdating} className="bg-brand-primary text-white hover:bg-brand-primary/90">
                <Save className="mr-2 h-4 w-4" />
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </div>

        {/* Profile Header Card */}
        <Card className="mb-6 overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-brand-primary via-purple-600 to-pink-500 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8">
            {/* Avatar Section */}
            <div className="relative -mt-20 mb-6 flex items-end justify-between">
              <div className="relative group">
                {avatarPreview || user.profile?.avatar ? (
                  <img
                    src={avatarPreview || user.profile?.avatar}
                    alt={user.profile?.fullName || 'User'}
                    className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-xl"
                  />
                ) : (
                  <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-brand-primary to-purple-600 text-5xl font-bold text-white shadow-xl">
                    {initials}
                  </div>
                )}
                {isEditing && (
                  <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Camera className="h-8 w-8 text-white" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </label>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex gap-4 pb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">{propertyCount}</div>
                  <div className="text-sm text-text-secondary">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">{user.profile?.profileCompletionScore || 0}%</div>
                  <div className="text-sm text-text-secondary">Complete</div>
                </div>
              </div>
            </div>

            {/* Name and Role */}
            <div className="mb-6">
              {isEditing ? (
                <Input
                  value={formData.fullName || ''}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="mb-2 text-3xl font-bold"
                  placeholder="Full Name"
                />
              ) : (
                <h1 className="text-3xl font-bold text-text-primary">{user.profile?.fullName || 'N/A'}</h1>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                  <Shield className="h-3 w-3" />
                  {user.role?.name || 'No Role'}
                </span>
                <span className={cn(
                  'inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium',
                  user.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                )}>
                  <Activity className="h-3 w-3" />
                  {user.status}
                </span>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-text-secondary">Profile Completion</span>
                <span className="font-bold text-brand-primary">{user.profile?.profileCompletionScore || 0}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-primary to-purple-600 transition-all duration-500"
                  style={{ width: `${user.profile?.profileCompletionScore || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Details Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="mb-4 flex items-center text-xl font-bold text-text-primary">
              <Mail className="mr-2 h-5 w-5 text-brand-primary" />
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-text-secondary">Email</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Email address"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-text-primary">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {user.email}
                  </div>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-text-secondary">Phone</label>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Phone number"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-text-primary">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {user.phone || 'Not provided'}
                  </div>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-text-secondary">Username</label>
                <div className="flex items-center gap-2 text-text-primary">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  @{user.username || 'Not set'}
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Details */}
          <Card className="p-6">
            <h2 className="mb-4 flex items-center text-xl font-bold text-text-primary">
              <MapPin className="mr-2 h-5 w-5 text-brand-primary" />
              Location & Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-text-secondary">Address</label>
                {isEditing ? (
                  <textarea
                    value={formData.profile?.address || ''}
                    onChange={(e) => handleInputChange('profile.address', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    rows={3}
                    placeholder="Enter full address"
                  />
                ) : (
                  <p className="text-text-primary">{user.profile?.address || 'Not provided'}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Bio */}
          <Card className="p-6 md:col-span-2">
            <h2 className="mb-4 flex items-center text-xl font-bold text-text-primary">
              <Briefcase className="mr-2 h-5 w-5 text-brand-primary" />
              About
            </h2>
            <div>
              <label className="mb-1 block text-sm font-medium text-text-secondary">Bio</label>
              {isEditing ? (
                <textarea
                  value={formData.profile?.bio || ''}
                  onChange={(e) => handleInputChange('profile.bio', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-text-primary">{user.profile?.bio || 'No bio provided'}</p>
              )}
            </div>
          </Card>

          {/* Account Activity */}
          <Card className="p-6">
            <h2 className="mb-4 flex items-center text-xl font-bold text-text-primary">
              <Calendar className="mr-2 h-5 w-5 text-brand-primary" />
              Account Activity
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-text-secondary">Member Since</span>
                <span className="font-medium text-text-primary">
                  {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-text-secondary">Last Updated</span>
                <span className="font-medium text-text-primary">
                  {new Date(user.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              {user.lastLogin && (
                <div className="flex justify-between rounded-lg bg-gray-50 p-3">
                  <span className="text-sm text-text-secondary">Last Login</span>
                  <span className="font-medium text-text-primary">
                    {new Date(user.lastLogin).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Permissions */}
          {user.role?.permissions && user.role.permissions.length > 0 && (
            <Card className="p-6">
              <h2 className="mb-4 flex items-center text-xl font-bold text-text-primary">
                <Shield className="mr-2 h-5 w-5 text-brand-primary" />
                Permissions
              </h2>
              <div className="flex flex-wrap gap-2">
                {user.role.permissions.map((permission, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
