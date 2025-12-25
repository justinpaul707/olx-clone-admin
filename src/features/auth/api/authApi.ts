import { createApi } from '@reduxjs/toolkit/query/react';
import { LOGIN_USER, SIGNUP_USER } from '@app/features/auth/api/mutations';
import { GET_USER_PROFILE } from '@app/features/auth/api/queries';
import type { LoginData, LoginMutationResponse, SignupRequest, SignupMutationResponse, User } from '@app/features/auth/types';
import graphqlBaseQuery from '@app/services/graphqlBaseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: graphqlBaseQuery(),
  tagTypes: ['Auth', 'User'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginMutationResponse['login'], LoginData>({
      query: (credentials: LoginData) => ({
        document: LOGIN_USER,
        variables: credentials,
      }),
      transformResponse: (response: LoginMutationResponse) => {
        return response.login;
      },
      invalidatesTags: ['Auth'],
    }),
    signup: builder.mutation<SignupMutationResponse['signup'], SignupRequest>({
      query: (userData: SignupRequest) => ({
        document: SIGNUP_USER,
        variables: userData,
      }),
      transformResponse: (response: SignupMutationResponse) => response.signup,
      invalidatesTags: ['Auth'],
    }),
    logoutUser: builder.mutation<boolean, void>({
      queryFn: async () => {
        return { data: true };
      },
      invalidatesTags: ['Auth', 'User'],
    }),
    getUserProfile: builder.query<{ user: User }, string>({
      query: (userId: string) => ({
        document: GET_USER_PROFILE,
        variables: { userId },
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutUserMutation,
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
} = authApi;


