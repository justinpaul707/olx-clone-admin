import { gql } from 'graphql-request';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      success
      errors
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: CategoryUpdateInput!) {
    updateCategory(id: $id, input: $input) {
      success
      message
      errors
      data {
        _id
        name
        imageUrl
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      success
      message
      errors
    }
  }
`;

export const CREATE_SUBCATEGORY = gql`
  mutation CreateSubcategory($categoryId: ID!, $name: String!, $slug: String, $description: String, $isActive: Boolean) {
    createSubcategory(categoryId: $categoryId, name: $name, slug: $slug, description: $description, isActive: $isActive) {
      success
      message
      data {
        subcategory {
          id
          name
          slug
          categoryId
          description
          isActive
        }
      }
      errors
    }
  }
`;

export const UPDATE_SUBCATEGORY = gql`
  mutation UpdateSubcategory($id: ID!, $categoryId: ID!, $name: String, $slug: String, $description: String, $isActive: Boolean) {
    updateSubcategory(id: $id, categoryId: $categoryId, name: $name, slug: $slug, description: $description, isActive: $isActive) {
      success
      message
      data {
        subcategory {
          id
          name
          slug
          categoryId
          description
          isActive
        }
      }
      errors
    }
  }
`;

export const DELETE_SUBCATEGORY = gql`
  mutation DeleteSubcategory($id: ID!) {
    deleteSubcategory(id: $id) {
      success
      message
      errors
    }
  }
`;
