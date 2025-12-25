import { createApi } from '@reduxjs/toolkit/query/react';
import { GET_FORMS, GET_FORM, GET_FORM_VERSIONS } from '@app/features/formBuilder/api/queries';
import {
  CREATE_FORM,
  UPDATE_FORM,
  DELETE_FORM,
  ADD_COMPONENT,
  UPDATE_COMPONENT,
  DELETE_COMPONENT,
  REORDER_COMPONENTS,
  PUBLISH_FORM,
  SAVE_AS_DRAFT,
  ASSIGN_FORM_TO_CATEGORY,
} from '@app/features/formBuilder/api/mutations';
import type {
  Form,
  FormVersion,
  CreateFormInput,
  UpdateFormInput,
  AddComponentInput,
  UpdateComponentInput,
  DeleteComponentInput,
  ReorderComponentsInput,
  PublishFormInput,
  AssignFormToCategoryInput,
  FormMutationResponse,
  ComponentMutationResponse,
  GetFormsResponse,
  GetFormResponse,
  GetFormVersionsResponse,
  FormListParams,
} from '@app/features/formBuilder/types';
import graphqlBaseQuery from '@app/services/graphqlBaseQuery';

export const formBuilderApi = createApi({
  reducerPath: 'formBuilderApi',
  baseQuery: graphqlBaseQuery(),
  tagTypes: ['Forms', 'Form', 'FormVersions'],
  endpoints: (builder) => ({
    // Queries
    getForms: builder.query<GetFormsResponse, FormListParams>({
      query: (params) => ({
        document: GET_FORMS,
        variables: params,
      }),
      transformResponse: (response: { forms: GetFormsResponse }) => response.forms,
      providesTags: (result) =>
        result
          ? [
              ...result.forms.map(({ id }) => ({ type: 'Forms' as const, id })),
              { type: 'Forms', id: 'LIST' },
            ]
          : [{ type: 'Forms', id: 'LIST' }],
    }),

    getForm: builder.query<Form, string>({
      query: (id) => ({
        document: GET_FORM,
        variables: { id },
      }),
      transformResponse: (response: GetFormResponse) => response.form,
      providesTags: (_result, _error, id) => [{ type: 'Form', id }],
    }),

    getFormVersions: builder.query<FormVersion[], string>({
      query: (formId) => ({
        document: GET_FORM_VERSIONS,
        variables: { formId },
      }),
      transformResponse: (response: GetFormVersionsResponse) => response.versions,
      providesTags: (_result, _error, formId) => [{ type: 'FormVersions', id: formId }],
    }),

    // Mutations
    createForm: builder.mutation<FormMutationResponse, CreateFormInput>({
      query: (input) => ({
        document: CREATE_FORM,
        variables: input,
      }),
      invalidatesTags: [{ type: 'Forms', id: 'LIST' }],
    }),

    updateForm: builder.mutation<FormMutationResponse, UpdateFormInput>({
      query: (input) => ({
        document: UPDATE_FORM,
        variables: input,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Form', id },
        { type: 'Forms', id: 'LIST' },
      ],
    }),

    deleteForm: builder.mutation<FormMutationResponse, { id: string }>({
      query: (input) => ({
        document: DELETE_FORM,
        variables: input,
      }),
      invalidatesTags: [{ type: 'Forms', id: 'LIST' }],
    }),

    addComponent: builder.mutation<ComponentMutationResponse, AddComponentInput>({
      query: (input) => ({
        document: ADD_COMPONENT,
        variables: input,
      }),
      invalidatesTags: (_result, _error, { formId }) => [
        { type: 'Form', id: formId },
        { type: 'Forms', id: 'LIST' },
      ],
    }),

    updateComponent: builder.mutation<ComponentMutationResponse, UpdateComponentInput>({
      query: (input) => ({
        document: UPDATE_COMPONENT,
        variables: input,
      }),
      invalidatesTags: (_result, _error, { formId }) => [
        { type: 'Form', id: formId },
        { type: 'Forms', id: 'LIST' },
      ],
    }),

    deleteComponent: builder.mutation<FormMutationResponse, DeleteComponentInput>({
      query: (input) => ({
        document: DELETE_COMPONENT,
        variables: input,
      }),
      invalidatesTags: (_result, _error, { formId }) => [
        { type: 'Form', id: formId },
        { type: 'Forms', id: 'LIST' },
      ],
    }),

    reorderComponents: builder.mutation<FormMutationResponse, ReorderComponentsInput>({
      query: (input) => ({
        document: REORDER_COMPONENTS,
        variables: input,
      }),
      invalidatesTags: (_result, _error, { formId }) => [
        { type: 'Form', id: formId },
      ],
    }),

    publishForm: builder.mutation<FormMutationResponse, PublishFormInput>({
      query: (input) => ({
        document: PUBLISH_FORM,
        variables: input,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Form', id },
        { type: 'Forms', id: 'LIST' },
        { type: 'FormVersions', id },
      ],
    }),

    saveAsDraft: builder.mutation<FormMutationResponse, { id: string }>({
      query: (input) => ({
        document: SAVE_AS_DRAFT,
        variables: input,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Form', id },
        { type: 'Forms', id: 'LIST' },
      ],
    }),

    assignFormToCategory: builder.mutation<FormMutationResponse, AssignFormToCategoryInput>({
      query: (input) => ({
        document: ASSIGN_FORM_TO_CATEGORY,
        variables: input,
      }),
      invalidatesTags: (_result, _error, { formId }) => [
        { type: 'Form', id: formId },
        { type: 'Forms', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useGetFormVersionsQuery,
  useCreateFormMutation,
  useUpdateFormMutation,
  useDeleteFormMutation,
  useAddComponentMutation,
  useUpdateComponentMutation,
  useDeleteComponentMutation,
  useReorderComponentsMutation,
  usePublishFormMutation,
  useSaveAsDraftMutation,
  useAssignFormToCategoryMutation,
} = formBuilderApi;
