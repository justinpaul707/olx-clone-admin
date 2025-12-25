import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  CHANGE_USER_STATUS,
  BULK_DELETE_USERS,
  RESET_USER_PASSWORD,
} from '@app/features/userManagement/api/mutations';
import {
  GET_USERS,
  GET_USER_DETAILS,
  GET_USER_PROPERTY_COUNT,
  GET_ROLES,
} from '@app/features/userManagement/api/queries';
import type {
  CreateUserInput,
  CreateUserMutationResponse,
  UpdateUserInput,
  UpdateUserMutationResponse,
  DeleteUserInput,
  DeleteUserMutationResponse,
  ChangeUserStatusInput,
  ChangeUserStatusMutationResponse,
  UserListParams,
  GetUsersQueryResponse,
  GetUserDetailsQueryResponse,
  UserRole,
} from '@app/features/userManagement/types';
import graphqlBaseQuery from '@app/services/graphqlBaseQuery';

export const userManagementApi = createApi({
  reducerPath: 'userManagementApi',
  baseQuery: graphqlBaseQuery(),
  tagTypes: ['Users', 'UserDetails', 'Roles'],
  endpoints: (builder) => ({
    // Queries
    getUsers: builder.query<GetUsersQueryResponse['users'], UserListParams>({
      query: (params: UserListParams) => ({
        document: GET_USERS,
        variables: params,
      }),
      transformResponse: (response: GetUsersQueryResponse) => response.users,
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),

    getUserDetails: builder.query<GetUserDetailsQueryResponse['userDetails'], string>({
      query: (userId: string) => ({
        document: GET_USER_DETAILS,
        variables: { userId },
      }),
      transformResponse: (response: GetUserDetailsQueryResponse) => response.userDetails,
      providesTags: (result, error, userId) => [{ type: 'UserDetails', id: userId }],
    }),

    getUserPropertyCount: builder.query<any, string>({
      query: (userId: string) => ({
        document: GET_USER_PROPERTY_COUNT,
        variables: { userId },
      }),
      providesTags: (result, error, userId) => [{ type: 'UserDetails', id: userId }],
    }),

    getRoles: builder.query<UserRole[], void>({
      query: () => ({
        document: GET_ROLES,
      }),
      transformResponse: (response: { roles: UserRole[] }) => response.roles,
      providesTags: [{ type: 'Roles', id: 'LIST' }],
    }),

    // Mutations
    createUser: builder.mutation<
      CreateUserMutationResponse['createUser'],
      CreateUserInput
    >({
      query: (userData: CreateUserInput) => ({
        document: CREATE_USER,
        variables: userData,
      }),
      transformResponse: (response: CreateUserMutationResponse) => response.createUser,
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),

    updateUser: builder.mutation<
      UpdateUserMutationResponse['updateUser'],
      UpdateUserInput
    >({
      query: (userData: UpdateUserInput) => ({
        document: UPDATE_USER,
        variables: userData,
      }),
      transformResponse: (response: UpdateUserMutationResponse) => response.updateUser,
      invalidatesTags: (result, error, { id }) => [
        { type: 'Users', id },
        { type: 'UserDetails', id },
        { type: 'Users', id: 'LIST' },
      ],
    }),

    deleteUser: builder.mutation<
      DeleteUserMutationResponse['deleteUser'],
      DeleteUserInput
    >({
      query: ({ id }: DeleteUserInput) => ({
        document: DELETE_USER,
        variables: { id },
      }),
      transformResponse: (response: DeleteUserMutationResponse) => response.deleteUser,
      invalidatesTags: (result, error, { id }) => [
        { type: 'Users', id },
        { type: 'UserDetails', id },
        { type: 'Users', id: 'LIST' },
      ],
    }),

    changeUserStatus: builder.mutation<
      ChangeUserStatusMutationResponse['changeUserStatus'],
      ChangeUserStatusInput
    >({
      query: (data: ChangeUserStatusInput) => ({
        document: CHANGE_USER_STATUS,
        variables: data,
      }),
      transformResponse: (response: ChangeUserStatusMutationResponse) =>
        response.changeUserStatus,
      invalidatesTags: (result, error, { id }) => [
        { type: 'Users', id },
        { type: 'UserDetails', id },
        { type: 'Users', id: 'LIST' },
      ],
    }),

    bulkDeleteUsers: builder.mutation<any, string[]>({
      query: (ids: string[]) => ({
        document: BULK_DELETE_USERS,
        variables: { ids },
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),

    resetUserPassword: builder.mutation<any, { userId: string; newPassword: string }>({
      query: (data) => ({
        document: RESET_USER_PASSWORD,
        variables: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
  useGetUserPropertyCountQuery,
  useGetRolesQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useChangeUserStatusMutation,
  useBulkDeleteUsersMutation,
  useResetUserPasswordMutation,
} = userManagementApi;
