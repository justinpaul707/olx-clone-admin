import { gql } from 'graphql-request';

export const GET_REPORTS = gql`
  query GetReports($filters: ReportFiltersInput!) {
    reports(filters: $filters) {
      performance {
        date
        revenue
        newListings
        activeUsers
        totalTransactions
      }
      summary {
        totalRevenue
        totalListings
        totalUsers
        growth
      }
      comparison {
        metric
        currentPeriod
        previousPeriod
        changePercentage
      }
    }
  }
`;
