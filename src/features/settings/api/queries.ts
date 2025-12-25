import { gql } from 'graphql-request';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      slug
      description
      icon
      isActive
      order
      subcategories {
        id
        name
        slug
        isActive
        order
      }
    }
  }
`;

export const GET_SUBCATEGORIES = gql`
  query GetSubcategories($categoryId: ID!) {
    subcategories(categoryId: $categoryId) {
      id
      name
      slug
      categoryId
      description
      isActive
      order
    }
  }
`;
