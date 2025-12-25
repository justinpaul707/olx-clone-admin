import { gql } from 'graphql-request';

export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats($filters: DashboardFiltersInput) {
    dashboardStats(filters: $filters) {
      totalProperties
      totalUsers
      totalCategories
      totalRevenue
      activeListings
      pendingApprovals
    }
  }
`;

export const GET_PROPERTIES = gql`
  query GetProperties($page: Int, $limit: Int, $filters: PropertyFiltersInput) {
    properties(page: $page, limit: $limit, filters: $filters) {
      data {
        id
        title
        description
        price
        category {
          id
          name
        }
        user {
          id
          name
          email
        }
        status
        location {
          city
          state
          area
        }
        images
        createdAt
        updatedAt
      }
      total
      page
      limit
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      description
      propertiesCount
      isActive
      createdAt
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($page: Int, $limit: Int, $filters: UserFiltersInput) {
    users(page: $page, limit: $limit, filters: $filters) {
      data {
        id
        email
        fullName
        role
        isActive
        lastLogin
        createdAt
      }
      total
      page
      limit
    }
  }
`;

export const GET_PROPERTY_DETAILS = gql`
  query GetPropertyDetails($id: ID!) {
    property(id: $id) {
      id
      title
      description
      price
      category {
        id
        name
      }
      user {
        id
        name
        email
        phone
      }
      status
      location {
        city
        state
        area
      }
      images
      createdAt
      updatedAt
    }
  }
`;