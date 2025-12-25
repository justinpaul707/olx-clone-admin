// Property Management types

export interface PropertyImage {
  id: string;
  url: string;
  isFeatured: boolean;
  order: number;
}

export interface PropertyLocation {
  id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyCategory {
  id: string;
  name: string;
  slug: string;
}

export interface PropertySubcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface PropertyOwner {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  status: PropertyStatus;
  category: PropertyCategory;
  subcategory: PropertySubcategory;
  location: PropertyLocation;
  owner: PropertyOwner;
  images: PropertyImage[];
  views: number;
  chats: number;
  favorites: number;
  isFeatured: boolean;
  isNegotiable: boolean;
  condition?: PropertyCondition;
  specifications?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  publishedAt?: string;
}

export enum PropertyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  SOLD = 'SOLD',
  EXPIRED = 'EXPIRED',
  REJECTED = 'REJECTED',
  DRAFT = 'DRAFT',
}

export enum PropertyCondition {
  NEW = 'NEW',
  LIKE_NEW = 'LIKE_NEW',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
}

export interface CreatePropertyInput {
  title: string;
  description: string;
  price: number;
  currency?: string;
  categoryId: string;
  subcategoryId: string;
  locationId?: string;
  ownerId: string;
  status?: PropertyStatus;
  condition?: PropertyCondition;
  isNegotiable?: boolean;
  specifications?: Record<string, unknown>;
}

export interface UpdatePropertyInput {
  id: string;
  title?: string;
  description?: string;
  price?: number;
  currency?: string;
  categoryId?: string;
  subcategoryId?: string;
  locationId?: string;
  status?: PropertyStatus;
  condition?: PropertyCondition;
  isNegotiable?: boolean;
  isFeatured?: boolean;
  specifications?: Record<string, unknown>;
}

export interface ChangePropertyStatusInput {
  id: string;
  status: PropertyStatus;
}

export interface DeletePropertyInput {
  id: string;
}

export interface PropertyListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: PropertyStatus;
  categoryId?: string;
  subcategoryId?: string;
  locationId?: string;
  ownerId?: string;
  city?: string;
  state?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: PropertyCondition;
  isFeatured?: boolean;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PropertyListResponse {
  properties: Property[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PropertyDetailsResponse {
  property: Property;
  relatedProperties: Property[];
}

export interface PropertyStats {
  totalProperties: number;
  activeProperties: number;
  inactiveProperties: number;
  soldProperties: number;
  pendingProperties: number;
  expiredProperties: number;
  totalValue: number;
  averagePrice: number;
}

// GraphQL Response types
export interface CreatePropertyMutationResponse {
  createProperty: {
    success: boolean;
    message: string;
    data?: {
      property: Property;
    };
    errors?: string[];
  };
}

export interface UpdatePropertyMutationResponse {
  updateProperty: {
    success: boolean;
    message: string;
    data?: {
      property: Property;
    };
    errors?: string[];
  };
}

export interface DeletePropertyMutationResponse {
  deleteProperty: {
    success: boolean;
    message: string;
    errors?: string[];
  };
}

export interface ChangePropertyStatusMutationResponse {
  changePropertyStatus: {
    success: boolean;
    message: string;
    data?: {
      property: Property;
    };
    errors?: string[];
  };
}

export interface BulkDeletePropertiesMutationResponse {
  bulkDeleteProperties: {
    success: boolean;
    message: string;
    deletedCount?: number;
    errors?: string[];
  };
}

export interface GetPropertiesQueryResponse {
  properties: PropertyListResponse;
}

export interface GetPropertyDetailsQueryResponse {
  propertyDetails: PropertyDetailsResponse;
}

export interface GetPropertyStatsQueryResponse {
  propertyStats: PropertyStats;
}

export interface GetCategoriesQueryResponse {
  categories: PropertyCategory[];
}

export interface GetSubcategoriesQueryResponse {
  subcategories: PropertySubcategory[];
}
