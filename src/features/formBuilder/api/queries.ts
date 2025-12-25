import { gql } from 'graphql-request';

export const GET_FORMS = gql`
  query GetForms(
    $page: Int
    $limit: Int
    $search: String
    $status: FormStatus
    $categoryId: ID
    $sortBy: String
    $sortOrder: String
  ) {
    forms(
      page: $page
      limit: $limit
      search: $search
      status: $status
      categoryId: $categoryId
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      forms {
        id
        name
        description
        category {
          id
          name
        }
        status
        version
        components {
          id
          type
          label
          name
          placeholder
          description
          required
          order
          validation {
            min
            max
            pattern
            message
          }
          options {
            label
            value
          }
          config
        }
        createdAt
        updatedAt
        publishedAt
      }
      totalCount
      totalPages
      currentPage
    }
  }
`;

export const GET_FORM = gql`
  query GetForm($id: ID!) {
    form(id: $id) {
      id
      name
      description
      category {
        id
        name
      }
      status
      version
      components {
        id
        type
        label
        name
        placeholder
        description
        required
        order
        validation {
          min
          max
          pattern
          message
        }
        options {
          label
          value
        }
        config
      }
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

export const GET_FORM_VERSIONS = gql`
  query GetFormVersions($formId: ID!) {
    formVersions(formId: $formId) {
      id
      formId
      version
      components {
        id
        type
        label
        name
        placeholder
        description
        required
        order
        validation {
          min
          max
          pattern
          message
        }
        options {
          label
          value
        }
        config
      }
      createdAt
      createdBy
    }
  }
`;
