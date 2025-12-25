import { gql } from 'graphql-request';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $slug: String, $description: String, $icon: String, $isActive: Boolean) {
    createCategory(name: $name, slug: $slug, description: $description, icon: $icon, isActive: $isActive) {
      success
      message
      data {
        category {
          id
          name
          slug
          description
          icon
          isActive
        }
      }
      errors
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String, $slug: String, $description: String, $icon: String, $isActive: Boolean) {
    updateCategory(id: $id, name: $name, slug: $slug, description: $description, icon: $icon, isActive: $isActive) {
      success
      message
      data {
        category {
          id
          name
          slug
          description
          icon
          isActive
        }
      }
      errors
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
