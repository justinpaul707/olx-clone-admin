import { createApi } from '@reduxjs/toolkit/query/react';
import {
  GET_CATEGORIES,
  GET_SUBCATEGORIES,
} from '@app/features/settings/api/queries';
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CREATE_SUBCATEGORY,
  UPDATE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
} from '@app/features/settings/api/mutations';
import type {
  Category,
  Subcategory,
  CreateCategoryInput,
  UpdateCategoryInput,
  CreateSubcategoryInput,
  UpdateSubcategoryInput,
  DeleteCategoryInput,
  DeleteSubcategoryInput,
  CategoryMutationResponse,
  SubcategoryMutationResponse,
  GetCategoriesResponse,
  GetSubcategoriesResponse,
} from '@app/features/settings/types';
import graphqlBaseQuery from '@app/services/graphqlBaseQuery';

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: graphqlBaseQuery(),
  tagTypes: ['Categories', 'Subcategories'],
  endpoints: (builder) => ({
    // Queries
    getCategories: builder.query<Category[], void>({
      query: () => ({
        document: GET_CATEGORIES,
      }),
      transformResponse: (response: GetCategoriesResponse) => response.categories,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Categories' as const, id })),
              { type: 'Categories', id: 'LIST' },
            ]
          : [{ type: 'Categories', id: 'LIST' }],
    }),

    getSubcategories: builder.query<Subcategory[], string>({
      query: (categoryId) => ({
        document: GET_SUBCATEGORIES,
        variables: { categoryId },
      }),
      transformResponse: (response: GetSubcategoriesResponse) => response.subcategories,
      providesTags: (_result, _error, categoryId) => [{ type: 'Subcategories', id: categoryId }],
    }),

    // Mutations
    createCategory: builder.mutation<CategoryMutationResponse, CreateCategoryInput>({
      query: (input) => ({
        document: CREATE_CATEGORY,
        variables: input,
      }),
      invalidatesTags: ['Categories'],
    }),

    updateCategory: builder.mutation<CategoryMutationResponse, UpdateCategoryInput>({
      query: (input) => ({
        document: UPDATE_CATEGORY,
        variables: input,
      }),
      invalidatesTags: ['Categories'],
    }),

    deleteCategory: builder.mutation<CategoryMutationResponse, DeleteCategoryInput>({
      query: (input) => ({
        document: DELETE_CATEGORY,
        variables: input,
      }),
      invalidatesTags: ['Categories'],
    }),

    createSubcategory: builder.mutation<SubcategoryMutationResponse, CreateSubcategoryInput>({
      query: (input) => ({
        document: CREATE_SUBCATEGORY,
        variables: input,
      }),
      invalidatesTags: (_result, _error, { categoryId }) => [
        { type: 'Subcategories', id: categoryId },
        { type: 'Categories', id: 'LIST' }, // Should probably invalidate categories too if they hold subs
        'Categories'
      ],
    }),

    updateSubcategory: builder.mutation<SubcategoryMutationResponse, UpdateSubcategoryInput>({
      query: (input) => ({
        document: UPDATE_SUBCATEGORY,
        variables: input,
      }),
      invalidatesTags: (_result, _error, { categoryId }) => [
        { type: 'Subcategories', id: categoryId },
        'Categories'
      ],
    }),

    deleteSubcategory: builder.mutation<SubcategoryMutationResponse, DeleteSubcategoryInput & { categoryId: string }>({
      query: (input) => ({
        document: DELETE_SUBCATEGORY,
        variables: { id: input.id },
      }),
      invalidatesTags: (_result, _error, { categoryId }) => [
        { type: 'Subcategories', id: categoryId },
        'Categories'
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} = settingsApi;
