import { settingsApi } from '../../api/settingsApi';
import {
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_SUBCATEGORIES,
} from './queries';
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CREATE_SUBCATEGORY,
  UPDATE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
} from './mutations';
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
  GetCategoryResponse,
  GetSubcategoriesResponse,
  PaginationData,
  CategoryFilterInput,
} from '@app/features/settings/types';

export const categoriesApi = settingsApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<PaginationData<Category>, { filter?: CategoryFilterInput; offset?: number } | void>({
      query: (args) => ({
        document: GET_CATEGORIES,
        variables: {
          filter: args?.filter,
          offset: args?.offset,
        },
      }),
      transformResponse: (response: GetCategoriesResponse) => ({
        ...response.categories,
        data: response.categories.data.map((cat: any) => ({
          ...cat,
          id: cat._id || cat.id,
          order: cat.sortOrder,
        })),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: string }) => ({ type: 'Categories' as const, id })),
              { type: 'Categories', id: 'LIST' },
            ]
          : [{ type: 'Categories', id: 'LIST' }],
    }),

    getCategory: builder.query<Category, string>({
      query: (id) => ({
        document: GET_CATEGORY,
        variables: { id },
      }),
      transformResponse: (response: GetCategoryResponse) => ({
        ...response.category,
        id: response.category._id || response.category.id,
      }),
      providesTags: (_result, _error, id) => [{ type: 'Categories', id }],
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
        { type: 'Categories', id: 'LIST' },
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
  useGetCategoryQuery,
  useGetSubcategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} = categoriesApi;
