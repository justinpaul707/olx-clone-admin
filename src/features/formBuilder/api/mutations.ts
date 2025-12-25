import { gql } from 'graphql-request';

export const CREATE_FORM = gql`
  mutation CreateForm($name: String!, $description: String, $categoryId: ID, $components: [ComponentInput!]) {
    createForm(input: { name: $name, description: $description, categoryId: $categoryId, components: $components }) {
      success
      message
      form {
        id
        name
        description
        categoryId
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
      }
      errors
    }
  }
`;

export const UPDATE_FORM = gql`
  mutation UpdateForm($id: ID!, $name: String, $description: String, $categoryId: ID) {
    updateForm(input: { id: $id, name: $name, description: $description, categoryId: $categoryId }) {
      success
      message
      form {
        id
        name
        description
        categoryId
        status
        version
        createdAt
        updatedAt
      }
      errors
    }
  }
`;

export const DELETE_FORM = gql`
  mutation DeleteForm($id: ID!) {
    deleteForm(input: { id: $id }) {
      success
      message
      errors
    }
  }
`;

export const ADD_COMPONENT = gql`
  mutation AddComponent($formId: ID!, $component: ComponentInput!) {
    addComponent(input: { formId: $formId, component: $component }) {
      success
      message
      component {
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
      errors
    }
  }
`;

export const UPDATE_COMPONENT = gql`
  mutation UpdateComponent($formId: ID!, $componentId: ID!, $component: ComponentUpdateInput!) {
    updateComponent(input: { formId: $formId, componentId: $componentId, component: $component }) {
      success
      message
      component {
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
      errors
    }
  }
`;

export const DELETE_COMPONENT = gql`
  mutation DeleteComponent($formId: ID!, $componentId: ID!) {
    deleteComponent(input: { formId: $formId, componentId: $componentId }) {
      success
      message
      errors
    }
  }
`;

export const REORDER_COMPONENTS = gql`
  mutation ReorderComponents($formId: ID!, $componentIds: [ID!]!) {
    reorderComponents(input: { formId: $formId, componentIds: $componentIds }) {
      success
      message
      errors
    }
  }
`;

export const PUBLISH_FORM = gql`
  mutation PublishForm($id: ID!) {
    publishForm(input: { id: $id }) {
      success
      message
      form {
        id
        status
        version
        publishedAt
      }
      errors
    }
  }
`;

export const SAVE_AS_DRAFT = gql`
  mutation SaveAsDraft($id: ID!) {
    saveAsDraft(input: { id: $id }) {
      success
      message
      form {
        id
        status
        updatedAt
      }
      errors
    }
  }
`;

export const ASSIGN_FORM_TO_CATEGORY = gql`
  mutation AssignFormToCategory($formId: ID!, $categoryId: ID!) {
    assignFormToCategory(input: { formId: $formId, categoryId: $categoryId }) {
      success
      message
      form {
        id
        categoryId
        category {
          id
          name
        }
      }
      errors
    }
  }
`;
