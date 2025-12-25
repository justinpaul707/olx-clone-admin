// User Management types
export interface UserProfile {
  id: string;
  fullName: string;
  avatar?: string;
  phone?: string;
  address?: string;
  bio?: string;
  profileCompletionScore?: number;
}

export interface UserRole {
  id: string;
  name: string;
  permissions?: string[];
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  username?: string;
  status: UserStatus;
  role: UserRole;
  profile: UserProfile;
  propertyCount?: number;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
}

export interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  roleId: string;
  status?: UserStatus;
}

export interface UpdateUserInput {
  id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  roleId?: string;
  status?: UserStatus;
  profile?: Partial<UserProfile>;
}

export interface ChangeUserStatusInput {
  id: string;
  status: UserStatus;
}

export interface DeleteUserInput {
  id: string;
}

export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: UserStatus;
  roleId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UserListResponse {
  users: User[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface UserDetailsResponse {
  user: User;
  propertyCount: number;
}

// GraphQL Response types
export interface CreateUserMutationResponse {
  createUser: {
    success: boolean;
    message: string;
    data?: {
      user: User;
    };
    errors?: string[];
  };
}

export interface UpdateUserMutationResponse {
  updateUser: {
    success: boolean;
    message: string;
    data?: {
      user: User;
    };
    errors?: string[];
  };
}

export interface DeleteUserMutationResponse {
  deleteUser: {
    success: boolean;
    message: string;
    errors?: string[];
  };
}

export interface ChangeUserStatusMutationResponse {
  changeUserStatus: {
    success: boolean;
    message: string;
    data?: {
      user: User;
    };
    errors?: string[];
  };
}

export interface GetUsersQueryResponse {
  users: UserListResponse;
}

export interface GetUserDetailsQueryResponse {
  userDetails: UserDetailsResponse;
}
