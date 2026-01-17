import { gql } from 'graphql-request';

export const GET_CATEGORIES = gql`
  query GetCategories($filter: CategoryFilterInput, $offset: Int) {
    categories(filter: $filter, offset: $offset) {
      data {
        _id
        name
        slug
        description
        imageUrl
        isActive
        status
        sortOrder
        createdAt
        updatedAt
      }
      totalItems
      perPage
      currentPage
      totalPages
      hasNextPage
      hasPreviousPage
      errors
    }
  }
`;


export const GET_CATEGORY = gql`
  query GetCategory($id: ID) {
    category(id: $id) {
      _id
      name
      slug
      description
      imageUrl
      isActive    
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
