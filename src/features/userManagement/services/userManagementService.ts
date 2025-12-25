import type { User } from '@app/features/userManagement/types';
import { UserStatus } from '@app/features/userManagement/types';

export const userManagementService = {
  // Cache user data in session storage (optional, useful for quick access)
  cacheUserData: (users: User[]) => {
    try {
      sessionStorage.setItem('cached_users', JSON.stringify(users));
    } catch (error) {
      console.error('Failed to cache user data:', error);
    }
  },

  getCachedUserData: (): User[] | null => {
    try {
      const cached = sessionStorage.getItem('cached_users');
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Failed to retrieve cached user data:', error);
      return null;
    }
  },

  clearCachedUserData: () => {
    sessionStorage.removeItem('cached_users');
  },

  // Helper functions for user status
  isUserActive: (user: User): boolean => {
    return user.status === UserStatus.ACTIVE;
  },

  isUserInactive: (user: User): boolean => {
    return user.status === UserStatus.INACTIVE;
  },

  isUserSuspended: (user: User): boolean => {
    return user.status === UserStatus.SUSPENDED;
  },

  getStatusColor: (status: UserStatus): string => {
    switch (status) {
      case UserStatus.ACTIVE:
        return 'text-green-600 bg-green-50 border-green-200';
      case UserStatus.INACTIVE:
        return 'text-gray-600 bg-gray-50 border-gray-200';
      case UserStatus.SUSPENDED:
        return 'text-red-600 bg-red-50 border-red-200';
      case UserStatus.PENDING:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  },

  getStatusLabel: (status: UserStatus): string => {
    switch (status) {
      case UserStatus.ACTIVE:
        return 'Active';
      case UserStatus.INACTIVE:
        return 'Inactive';
      case UserStatus.SUSPENDED:
        return 'Suspended';
      case UserStatus.PENDING:
        return 'Pending';
      default:
        return 'Unknown';
    }
  },

  // Format user data for display
  formatUserForDisplay: (user: User) => {
    return {
      ...user,
      displayName: user.profile?.fullName || user.email,
      displayRole: user.role?.name || 'No Role',
      formattedCreatedAt: new Date(user.createdAt).toLocaleDateString(),
      formattedUpdatedAt: new Date(user.updatedAt).toLocaleDateString(),
      formattedLastLogin: user.lastLogin
        ? new Date(user.lastLogin).toLocaleDateString()
        : 'Never',
    };
  },

  // Validate user email format
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone number format (basic)
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    return phoneRegex.test(phone);
  },

  // Export users to CSV
  exportUsersToCSV: (users: User[]): void => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Role', 'Status', 'Property Count', 'Created At'];
    const rows = users.map(user => [
      user.id,
      user.profile?.fullName || '',
      user.email,
      user.phone || '',
      user.role?.name || '',
      user.status,
      user.propertyCount?.toString() || '0',
      new Date(user.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `users_export_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Get user initials for avatar
  getUserInitials: (user: User): string => {
    const name = user.profile?.fullName || user.email;
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  },

  // Check if user can be deleted (business logic)
  canDeleteUser: (user: User): { canDelete: boolean; reason?: string } => {
    // Prevent deletion of users with properties
    if (user.propertyCount && user.propertyCount > 0) {
      return {
        canDelete: false,
        reason: `User has ${user.propertyCount} active properties. Please reassign or delete them first.`,
      };
    }

    // Prevent deletion of admin users (you may want to add more checks)
    if (user.role?.name.toLowerCase() === 'admin' || user.role?.name.toLowerCase() === 'super admin') {
      return {
        canDelete: false,
        reason: 'Cannot delete admin users.',
      };
    }

    return { canDelete: true };
  },
};
