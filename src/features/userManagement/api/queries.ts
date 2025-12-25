import { gql } from 'graphql-request';

// Get list of users with filters and pagination
export const GET_USERS = gql`
  query GetUsers(
    $page: Int
    $limit: Int
    $search: String
    $status: UserStatus
    $roleId: ID
    $sortBy: String
    $sortOrder: String
  ) {
    users(
      page: $page
      limit: $limit
      search: $search
      status: $status
      roleId: $roleId
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      users {
        id
        email
        phone
        username
        status
        role {
          id
          name
        }
        profile {
          id
          fullName
          avatar
          phone
        }
        propertyCount
        createdAt
        updatedAt
        lastLogin
      }
      totalCount
      totalPages
      currentPage
      hasNextPage
      hasPreviousPage
    }
  }
`;

// Get single user details with property count
export const GET_USER_DETAILS = gql`
  query GetUserDetails($userId: ID!) {
    userDetails(id: $userId) {
      user {
        id
        email
        phone
        username
        status
        role {
          id
          name
          permissions
        }
        profile {
          id
          fullName
          avatar
          phone
          address
          bio
          profileCompletionScore
        }
        propertyCount
        createdAt
        updatedAt
        lastLogin
      }
      propertyCount
    }
  }
`;

// Get user property count
export const GET_USER_PROPERTY_COUNT = gql`
  query GetUserPropertyCount($userId: ID!) {
    userPropertyCount(userId: $userId) {
      userId
      totalProperties
      activeProperties
      inactiveProperties
      soldProperties
    }
  }
`;

// Get all available roles for user creation/editing
export const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
      name
      permissions
    }
  }
`;
