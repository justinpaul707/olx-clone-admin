import { createApi } from '@reduxjs/toolkit/query/react';
import graphqlBaseQuery from '@app/services/graphqlBaseQuery';
import type { ReportData, ReportFilters } from '../types';
import { GET_REPORTS } from './queries';
import { EXPORT_REPORT } from './mutations';

export const reportsApi = createApi({
  reducerPath: 'reportsApi',
  baseQuery: graphqlBaseQuery(),
  endpoints: (builder) => ({
    getReports: builder.query<ReportData, ReportFilters>({
      query: (filters) => ({
        document: GET_REPORTS,
        variables: { filters },
      }),
    }),
    exportReport: builder.mutation<{ success: boolean; downloadUrl: string }, { filters: ReportFilters; format: 'csv' | 'pdf' }>({
      query: ({ filters, format }) => ({
        document: EXPORT_REPORT,
        variables: { filters, format },
      }),
    }),
  }),
});

export const { useGetReportsQuery, useExportReportMutation } = reportsApi;
