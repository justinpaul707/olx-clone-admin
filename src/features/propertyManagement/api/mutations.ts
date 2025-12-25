import { gql } from 'graphql-request';

// Create a new property
export const CREATE_PROPERTY = gql`
  mutation CreateProperty(
    $title: String!
    $description: String!
    $price: Float!
    $currency: String
    $categoryId: ID!
    $subcategoryId: ID!
    $locationId: ID
    $ownerId: ID!
    $status: PropertyStatus
    $condition: PropertyCondition
    $isNegotiable: Boolean
    $specifications: JSON
  ) {
    createProperty(
      title: $title
      description: $description
      price: $price
      currency: $currency
      categoryId: $categoryId
      subcategoryId: $subcategoryId
      locationId: $locationId
      ownerId: $ownerId
      status: $status
      condition: $condition
      isNegotiable: $isNegotiable
      specifications: $specifications
    ) {
      success
      message
      data {
        property {
          id
          title
          description
          price
          currency
          status
          category {
            id
            name
          }
          subcategory {
            id
            name
          }
          location {
            id
            address
            city
            state
            country
          }
          owner {
            id
            fullName
            email
          }
          createdAt
          updatedAt
        }
      }
      errors
    }
  }
`;

// Update existing property
export const UPDATE_PROPERTY = gql`
  mutation UpdateProperty(
    $id: ID!
    $title: String
    $description: String
    $price: Float
    $currency: String
    $categoryId: ID
    $subcategoryId: ID
    $locationId: ID
    $status: PropertyStatus
    $condition: PropertyCondition
    $isNegotiable: Boolean
    $isFeatured: Boolean
    $specifications: JSON
  ) {
    updateProperty(
      id: $id
      title: $title
      description: $description
      price: $price
      currency: $currency
      categoryId: $categoryId
      subcategoryId: $subcategoryId
      locationId: $locationId
      status: $status
      condition: $condition
      isNegotiable: $isNegotiable
      isFeatured: $isFeatured
      specifications: $specifications
    ) {
      success
      message
      data {
        property {
          id
          title
          description
          price
          currency
          status
          category {
            id
            name
          }
          subcategory {
            id
            name
          }
          location {
            id
            address
            city
            state
          }
          owner {
            id
            fullName
          }
          isFeatured
          isNegotiable
          condition
          updatedAt
        }
      }
      errors
    }
  }
`;

// Delete a property
export const DELETE_PROPERTY = gql`
  mutation DeleteProperty($id: ID!) {
    deleteProperty(id: $id) {
      success
      message
      errors
    }
  }
`;

// Change property status
export const CHANGE_PROPERTY_STATUS = gql`
  mutation ChangePropertyStatus($id: ID!, $status: PropertyStatus!) {
    changePropertyStatus(id: $id, status: $status) {
      success
      message
      data {
        property {
          id
          status
          updatedAt
        }
      }
      errors
    }
  }
`;

// Bulk delete properties
export const BULK_DELETE_PROPERTIES = gql`
  mutation BulkDeleteProperties($ids: [ID!]!) {
    bulkDeleteProperties(ids: $ids) {
      success
      message
      deletedCount
      errors
    }
  }
`;

// Toggle featured status
export const TOGGLE_FEATURED = gql`
  mutation ToggleFeatured($id: ID!, $isFeatured: Boolean!) {
    toggleFeatured(id: $id, isFeatured: $isFeatured) {
      success
      message
      data {
        property {
          id
          isFeatured
          updatedAt
        }
      }
      errors
    }
  }
`;
