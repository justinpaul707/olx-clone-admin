import { gql } from 'graphql-request';

export const EXPORT_REPORT = gql`
  mutation ExportReport($filters: ReportFiltersInput!, $format: String!) {
    exportReport(filters: $filters, format: $format) {
      success
      downloadUrl
      message
    }
  }
`;
