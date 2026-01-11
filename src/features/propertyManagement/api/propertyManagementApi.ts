import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CREATE_PROPERTY,
  UPDATE_PROPERTY,
  DELETE_PROPERTY,
  CHANGE_PROPERTY_STATUS,
  BULK_DELETE_PROPERTIES,
  TOGGLE_FEATURED,
} from '@app/features/propertyManagement/api/mutations';
import {
  GET_PROPERTIES,
  GET_PROPERTY_DETAILS,
  GET_PROPERTY_STATS,
  GET_CATEGORIES,
  GET_SUBCATEGORIES,
  GET_ALL_SUBCATEGORIES,
} from '@app/features/propertyManagement/api/queries';
import type {
  CreatePropertyInput,
  CreatePropertyMutationResponse,
  UpdatePropertyInput,
  UpdatePropertyMutationResponse,
  DeletePropertyInput,
  DeletePropertyMutationResponse,
  ChangePropertyStatusInput,
  ChangePropertyStatusMutationResponse,
  PropertyListParams,
  GetPropertiesQueryResponse,
  GetPropertyDetailsQueryResponse,
  GetPropertyStatsQueryResponse,
  GetCategoriesQueryResponse,
  GetSubcategoriesQueryResponse,
  PropertyCategory,
  PropertySubcategory,
  BulkDeletePropertiesMutationResponse,
} from '@app/features/propertyManagement/types';
import graphqlBaseQuery from '@app/services/graphqlBaseQuery';

export const propertyManagementApi = createApi({
  reducerPath: 'propertyManagementApi',
  baseQuery: graphqlBaseQuery(),
  tagTypes: ['Properties', 'PropertyDetails', 'PropertyStats', 'Categories', 'Subcategories'],
  endpoints: (builder) => ({
    // Queries
    getProperties: builder.query<GetPropertiesQueryResponse['properties'], PropertyListParams>({
      query: (params: PropertyListParams) => ({
        document: GET_PROPERTIES,
        variables: params,
      }),
      transformResponse: (response: GetPropertiesQueryResponse) => response.properties,
      providesTags: (result) =>
        result
          ? [
              ...result.properties.map(({ id }) => ({ type: 'Properties' as const, id })),
              { type: 'Properties', id: 'LIST' },
            ]
          : [{ type: 'Properties', id: 'LIST' }],
    }),

    getPropertyDetails: builder.query<GetPropertyDetailsQueryResponse['propertyDetails'], string>({
      query: (propertyId: string) => ({
        document: GET_PROPERTY_DETAILS,
        variables: { propertyId },
      }),
      transformResponse: (response: GetPropertyDetailsQueryResponse) => response.propertyDetails,
      providesTags: (_result, _error, propertyId) => [{ type: 'PropertyDetails', id: propertyId }],
    }),

    getPropertyStats: builder.query<GetPropertyStatsQueryResponse['propertyStats'], void>({
      query: () => ({
        document: GET_PROPERTY_STATS,
      }),
      transformResponse: (response: GetPropertyStatsQueryResponse) => response.propertyStats,
      providesTags: [{ type: 'PropertyStats', id: 'STATS' }],
    }),

    getCategories: builder.query<PropertyCategory[], void>({
      query: () => ({
        document: GET_CATEGORIES,
      }),
      transformResponse: (response: GetCategoriesQueryResponse) => response.categories,
      providesTags: [{ type: 'Categories', id: 'LIST' }],
    }),

    getSubcategories: builder.query<PropertySubcategory[], string>({
      query: (categoryId: string) => ({
        document: GET_SUBCATEGORIES,
        variables: { categoryId },
      }),
      transformResponse: (response: GetSubcategoriesQueryResponse) => response.subcategories,
      providesTags: (_result, _error, categoryId) => [{ type: 'Subcategories', id: categoryId }],
    }),

    getAllSubcategories: builder.query<PropertySubcategory[], void>({
      query: () => ({
        document: GET_ALL_SUBCATEGORIES,
      }),
      transformResponse: (response: GetSubcategoriesQueryResponse) => response.subcategories,
      providesTags: [{ type: 'Subcategories', id: 'ALL' }],
    }),

    // Mutations
    createProperty: builder.mutation<
      CreatePropertyMutationResponse['createProperty'],
      CreatePropertyInput
    >({
      query: (propertyData: CreatePropertyInput) => ({
        document: CREATE_PROPERTY,
        variables: propertyData,
      }),
      transformResponse: (response: CreatePropertyMutationResponse) => response.createProperty,
      invalidatesTags: [
        { type: 'Properties', id: 'LIST' },
        { type: 'PropertyStats', id: 'STATS' },
      ],
    }),

    updateProperty: builder.mutation<
      UpdatePropertyMutationResponse['updateProperty'],
      UpdatePropertyInput
    >({
      query: (propertyData: UpdatePropertyInput) => ({
        document: UPDATE_PROPERTY,
        variables: propertyData,
      }),
      transformResponse: (response: UpdatePropertyMutationResponse) => response.updateProperty,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Properties', id: 'LIST' },
        { type: 'Properties', id },
        { type: 'PropertyDetails', id },
        { type: 'PropertyStats', id: 'STATS' },
      ],
    }),

    deleteProperty: builder.mutation<
      DeletePropertyMutationResponse['deleteProperty'],
      DeletePropertyInput
    >({
      query: (input: DeletePropertyInput) => ({
        document: DELETE_PROPERTY,
        variables: input,
      }),
      transformResponse: (response: DeletePropertyMutationResponse) => response.deleteProperty,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Properties', id: 'LIST' },
        { type: 'Properties', id },
        { type: 'PropertyDetails', id },
        { type: 'PropertyStats', id: 'STATS' },
      ],
    }),

    changePropertyStatus: builder.mutation<
      ChangePropertyStatusMutationResponse['changePropertyStatus'],
      ChangePropertyStatusInput
    >({
      query: (input: ChangePropertyStatusInput) => ({
        document: CHANGE_PROPERTY_STATUS,
        variables: input,
      }),
      transformResponse: (response: ChangePropertyStatusMutationResponse) =>
        response.changePropertyStatus,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Properties', id: 'LIST' },
        { type: 'Properties', id },
        { type: 'PropertyDetails', id },
        { type: 'PropertyStats', id: 'STATS' },
      ],
    }),

    bulkDeleteProperties: builder.mutation<
      BulkDeletePropertiesMutationResponse['bulkDeleteProperties'],
      { ids: string[] }
    >({
      query: (input: { ids: string[] }) => ({
        document: BULK_DELETE_PROPERTIES,
        variables: input,
      }),
      transformResponse: (response: BulkDeletePropertiesMutationResponse) =>
        response.bulkDeleteProperties,
      invalidatesTags: [
        { type: 'Properties', id: 'LIST' },
        { type: 'PropertyStats', id: 'STATS' },
      ],
    }),

    toggleFeatured: builder.mutation<any, { id: string; isFeatured: boolean }>({
      query: (input: { id: string; isFeatured: boolean }) => ({
        document: TOGGLE_FEATURED,
        variables: input,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Properties', id: 'LIST' },
        { type: 'Properties', id },
        { type: 'PropertyDetails', id },
      ],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyDetailsQuery,
  useGetPropertyStatsQuery,
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
  useGetAllSubcategoriesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useChangePropertyStatusMutation,
  useBulkDeletePropertiesMutation,
  useToggleFeaturedMutation,
} = propertyManagementApi;
