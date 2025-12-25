import { createApi } from '@reduxjs/toolkit/query/react';
import { 
  GET_DASHBOARD_STATS, 
  GET_PROPERTIES, 
  GET_CATEGORIES, 
  GET_USERS,
  GET_PROPERTY_DETAILS 
} from '@app/features/dashboard/api/queries';
import type { 
  DashboardStats,
  Property,
  Category,
  DashboardFilters,
  GetDashboardStatsResponse,
  GetPropertiesResponse,
  GetCategoriesResponse,
  GetUsersResponse
} from '@app/features/dashboard/types';
import graphqlBaseQuery from '@app/services/graphqlBaseQuery';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: graphqlBaseQuery(),
  tagTypes: ['DashboardStats', 'Properties', 'Categories', 'Users'],
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, DashboardFilters | void>({
      query: (filters) => ({
        document: GET_DASHBOARD_STATS,
        variables: { filters },
      }),
      transformResponse: (response: GetDashboardStatsResponse) => {
        return response.dashboardStats;
      },
      providesTags: ['DashboardStats'],
    }),
    
    getProperties: builder.query<GetPropertiesResponse['properties'], {
      page?: number;
      limit?: number;
      filters?: Record<string, unknown>;
    }>({
      query: ({ page = 1, limit = 10, filters }) => ({
        document: GET_PROPERTIES,
        variables: { page, limit, filters },
      }),
      transformResponse: (response: GetPropertiesResponse) => {
        return response.properties;
      },
      providesTags: ['Properties'],
    }),
    
    getPropertyDetails: builder.query<Property, string>({
      query: (id: string) => ({
        document: GET_PROPERTY_DETAILS,
        variables: { id },
      }),
      transformResponse: (response: { property: Property }) => {
        return response.property;
      },
      providesTags: (_result, _error, id) => [{ type: 'Properties', id }],
    }),
    
    getCategories: builder.query<Category[], void>({
      query: () => ({
        document: GET_CATEGORIES,
      }),
      transformResponse: (response: GetCategoriesResponse) => {
        return response.categories;
      },
      providesTags: ['Categories'],
    }),
    
    getUsers: builder.query<GetUsersResponse['users'], {
      page?: number;
      limit?: number;
      filters?: Record<string, unknown>;
    }>({
      query: ({ page = 1, limit = 10, filters }) => ({
        document: GET_USERS,
        variables: { page, limit, filters },
      }),
      transformResponse: (response: GetUsersResponse) => {
        return response.users;
      },
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetPropertiesQuery,
  useGetPropertyDetailsQuery,
  useGetCategoriesQuery,
  useGetUsersQuery,
} = dashboardApi;