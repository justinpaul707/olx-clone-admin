import { gql } from 'graphql-request';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      data {
        token
        user {
          id
          email
          phone
          role {
            id
            name
          }
          profile {
            fullName
          }
        }
      }
      errors
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation Signup($fullName: String!, $email: String!, $password: String!) {
    signup(fullName: $fullName, email: $email, password: $password) {
      success
      message
      errors 
      data {
        user {      
          id    
          email
          phone
          status
          profile {
            id
            fullName
            profileCompletionScore
          }
        }
      }
    }
  }
`;