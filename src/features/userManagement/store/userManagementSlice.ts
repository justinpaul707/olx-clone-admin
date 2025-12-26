import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, UserListParams, UpdateUserInput } from '@app/features/userManagement/types';
import { UserStatus } from '@app/features/userManagement/types';

interface UserManagementState {
  selectedUsers: string[];
  filters: UserListParams;
  selectedUser: User | null;
  isFilterOpen: boolean;
  profileEdit: {
    isEditing: boolean;
    formData: Partial<UpdateUserInput>;
    avatarPreview: string | null;
  };
}

const initialState: UserManagementState = {
  selectedUsers: [],
  filters: {
    page: 1,
    limit: 10,
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  selectedUser: null,
  isFilterOpen: false,
  profileEdit: {
    isEditing: false,
    formData: {},
    avatarPreview: null,
  },
};

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    setSelectedUsers(state, action: PayloadAction<string[]>) {
      state.selectedUsers = action.payload;
    },
    toggleUserSelection(state, action: PayloadAction<string>) {
      const userId = action.payload;
      const index = state.selectedUsers.indexOf(userId);
      if (index > -1) {
        state.selectedUsers.splice(index, 1);
      } else {
        state.selectedUsers.push(userId);
      }
    },
    clearSelectedUsers(state) {
      state.selectedUsers = [];
    },
    setFilters(state, action: PayloadAction<Partial<UserListParams>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
      state.filters.page = 1; // Reset to first page on search
    },
    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.filters.limit = action.payload;
      state.filters.page = 1; // Reset to first page on page size change
    },
    setStatusFilter(state, action: PayloadAction<UserStatus | undefined>) {
      state.filters.status = action.payload;
      state.filters.page = 1;
    },
    setRoleFilter(state, action: PayloadAction<string | undefined>) {
      state.filters.roleId = action.payload;
      state.filters.page = 1;
    },
    setSorting(state, action: PayloadAction<{ sortBy: string; sortOrder: 'asc' | 'desc' }>) {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.sortOrder = action.payload.sortOrder;
    },
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    },
    toggleFilterPanel(state) {
      state.isFilterOpen = !state.isFilterOpen;
    },
    setFilterPanelOpen(state, action: PayloadAction<boolean>) {
      state.isFilterOpen = action.payload;
    },
    setProfileEditing(state, action: PayloadAction<boolean>) {
      state.profileEdit.isEditing = action.payload;
    },
    setProfileFormData(state, action: PayloadAction<Partial<UpdateUserInput>>) {
      state.profileEdit.formData = { ...state.profileEdit.formData, ...action.payload };
    },
    updateProfileField(state, action: PayloadAction<{ field: string; value: any }>) {
      const { field, value } = action.payload;
      if (field.startsWith('profile.')) {
        const profileField = field.split('.')[1];
        state.profileEdit.formData.profile = {
          ...state.profileEdit.formData.profile,
          [profileField]: value,
        };
      } else {
        (state.profileEdit.formData as any)[field] = value;
      }
    },
    setAvatarPreview(state, action: PayloadAction<string | null>) {
      state.profileEdit.avatarPreview = action.payload;
    },
    initializeProfileForm(state, action: PayloadAction<User>) {
      const user = action.payload;
      state.profileEdit.formData = {
        id: user.id,
        fullName: user.profile?.fullName,
        email: user.email,
        phone: user.phone,
        profile: {
          bio: user.profile?.bio,
          address: user.profile?.address,
          avatar: user.profile?.avatar,
        },
      };
    },
    resetProfileEdit(state) {
      state.profileEdit = initialState.profileEdit;
    },
  },
});

export const {
  setSelectedUsers,
  toggleUserSelection,
  clearSelectedUsers,
  setFilters,
  resetFilters,
  setSearchQuery,
  setPage,
  setPageSize,
  setStatusFilter,
  setRoleFilter,
  setSorting,
  setSelectedUser,
  toggleFilterPanel,
  setFilterPanelOpen,
  setProfileEditing,
  setProfileFormData,
  updateProfileField,
  setAvatarPreview,
  initializeProfileForm,
  resetProfileEdit,
} = userManagementSlice.actions;

export default userManagementSlice.reducer;
