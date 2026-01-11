import { createApi } from '@reduxjs/toolkit/query/react';
import graphqlBaseQuery from '@app/services/graphqlBaseQuery';

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: graphqlBaseQuery(),
  tagTypes: ['Categories', 'Subcategories', 'Roles', 'Users', 'Forms'],
  endpoints: () => ({}),
});
