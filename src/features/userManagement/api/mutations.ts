import { gql } from 'graphql-request';

// Create a new user
export const CREATE_USER = gql`
  mutation CreateUser(
    $fullName: String!
    $email: String!
    $password: String!
    $phone: String
    $roleId: ID!
    $status: UserStatus
  ) {
    createUser(
      fullName: $fullName
      email: $email
      password: $password
      phone: $phone
      roleId: $roleId
      status: $status
    ) {
      success
      message
      data {
        user {
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
          createdAt
          updatedAt
        }
      }
      errors
    }
  }
`;

// Update existing user
export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $fullName: String
    $email: String
    $phone: String
    $roleId: ID
    $status: UserStatus
    $profile: UserProfileInput
  ) {
    updateUser(
      id: $id
      fullName: $fullName
      email: $email
      phone: $phone
      roleId: $roleId
      status: $status
      profile: $profile
    ) {
      success
      message
      data {
        user {
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
            address
            bio
          }
          updatedAt
        }
      }
      errors
    }
  }
`;

// Delete a user
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      success
      message
      errors
    }
  }
`;

// Change user status (Activate/Inactivate/Suspend)
export const CHANGE_USER_STATUS = gql`
  mutation ChangeUserStatus($id: ID!, $status: UserStatus!) {
    changeUserStatus(id: $id, status: $status) {
      success
      message
      data {
        user {
          id
          email
          status
          updatedAt
        }
      }
      errors
    }
  }
`;

// Bulk delete users
export const BULK_DELETE_USERS = gql`
  mutation BulkDeleteUsers($ids: [ID!]!) {
    bulkDeleteUsers(ids: $ids) {
      success
      message
      data {
        deletedCount
      }
      errors
    }
  }
`;

// Reset user password (admin action)
export const RESET_USER_PASSWORD = gql`
  mutation ResetUserPassword($userId: ID!, $newPassword: String!) {
    resetUserPassword(userId: $userId, newPassword: $newPassword) {
      success
      message
      errors
    }
  }
`;
