// Dashboard related types
export interface DashboardStats {
  totalProperties: number;
  totalUsers: number;
  totalCategories: number;
  totalRevenue: number;
  activeListings: number;
  pendingApprovals: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  status: 'ACTIVE' | 'PENDING' | 'SOLD' | 'INACTIVE';
  location: {
    city: string;
    state: string;
    area: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  propertiesCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface DashboardFilters extends Record<string, unknown> {
  dateRange?: {
    from: string;
    to: string;
  };
  category?: string;
  status?: string;
  location?: string;
}

// API Response types
export interface GetDashboardStatsResponse {
  dashboardStats: DashboardStats;
}

export interface GetPropertiesResponse {
  properties: {
    data: Property[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface GetCategoriesResponse {
  categories: Category[];
}

export interface GetUsersResponse {
  users: {
    data: AdminUser[];
    total: number;
    page: number;
    limit: number;
  };
}

// Mutation types
export interface CreatePropertyRequest {
  title: string;
  description: string;
  price: number;
  categoryId: string;
  location: {
    city: string;
    state: string;
    area: string;
  };
  images: File[];
}

export interface UpdatePropertyRequest extends Partial<CreatePropertyRequest> {
  id: string;
  status?: Property['status'];
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  id: string;
  isActive?: boolean;
}
