export interface Category {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  status?: string;
  sortOrder?: number;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
  isActive: boolean;
  order?: number;
}

export interface CreateCategoryInput {
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  isActive?: boolean;
}

export interface UpdateCategoryInput {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  icon?: string;
  isActive?: boolean;
}

export interface CreateSubcategoryInput {
  categoryId: string;
  name: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateSubcategoryInput {
  id: string;
  categoryId: string;
  name?: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
}

export interface DeleteCategoryInput {
  id: string;
}

export interface DeleteSubcategoryInput {
  id: string;
}

export interface CategoryFilterInput {
  search?: string;
  isActive?: boolean;
  status?: string;
}

export interface PaginationData<T> {
  data: T[];
  totalItems: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  errors?: any;
}

export interface GetCategoriesResponse {
  categories: PaginationData<Category>;
}

export interface GetCategoryResponse {
  category: Category;
}

export interface GetSubcategoriesResponse {
  subcategories: Subcategory[];
}

export interface CategoryMutationResponse {
  success: boolean;
  message: string;
  category?: Category;
  errors?: string[];
}

export interface SubcategoryMutationResponse {
  success: boolean;
  message: string;
  subcategory?: Subcategory;
  errors?: string[];
}

// Role Management Types
export interface Permission {
  id: string;
  code: string;
  description: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  userCount: number;
}

// Audit Log Types
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'failure';
}

// Security Types
export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number; // in minutes
  passwordPolicy: {
    minLength: number;
    requireSpecialChar: boolean;
    requireNumber: boolean;
    expirationDays: number;
  };
  loginHistory: {
    date: string;
    ip: string;
    device: string;
    status: 'success' | 'failure';
  }[];
}

