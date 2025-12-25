import { gql } from 'graphql-request';

// Example query for getting user profile
export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    userProfile(id: $userId) {
      id
      email
      phone
      profile {
        fullName
        avatar
      }
      role {
        id
        name
      }
    }
  }
`;
