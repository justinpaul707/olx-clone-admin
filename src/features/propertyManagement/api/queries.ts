import { gql } from 'graphql-request';

// Get list of properties with filters and pagination
export const GET_PROPERTIES = gql`
  query GetProperties(
    $page: Int
    $limit: Int
    $search: String
    $status: PropertyStatus
    $categoryId: ID
    $subcategoryId: ID
    $locationId: ID
    $ownerId: ID
    $city: String
    $state: String
    $country: String
    $minPrice: Float
    $maxPrice: Float
    $condition: PropertyCondition
    $isFeatured: Boolean
    $startDate: String
    $endDate: String
    $sortBy: String
    $sortOrder: String
  ) {
    properties(
      page: $page
      limit: $limit
      search: $search
      status: $status
      categoryId: $categoryId
      subcategoryId: $subcategoryId
      locationId: $locationId
      ownerId: $ownerId
      city: $city
      state: $state
      country: $country
      minPrice: $minPrice
      maxPrice: $maxPrice
      condition: $condition
      isFeatured: $isFeatured
      startDate: $startDate
      endDate: $endDate
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      properties {
        id
        title
        description
        price
        currency
        status
        category {
          id
          name
          slug
        }
        subcategory {
          id
          name
          slug
        }
        location {
          id
          address
          city
          state
          country
          zipCode
        }
        owner {
          id
          fullName
          email
          phone
          avatar
        }
        images {
          id
          url
          isFeatured
          order
        }
        views
        chats
        favorites
        isFeatured
        isNegotiable
        condition
        createdAt
        updatedAt
        expiresAt
        publishedAt
      }
      totalCount
      totalPages
      currentPage
      hasNextPage
      hasPreviousPage
    }
  }
`;

// Get single property details
export const GET_PROPERTY_DETAILS = gql`
  query GetPropertyDetails($propertyId: ID!) {
    propertyDetails(id: $propertyId) {
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
          slug
        }
        subcategory {
          id
          name
          slug
          categoryId
        }
        location {
          id
          address
          city
          state
          country
          zipCode
          latitude
          longitude
        }
        owner {
          id
          fullName
          email
          phone
          avatar
        }
        images {
          id
          url
          isFeatured
          order
        }
        views
        chats
        favorites
        isFeatured
        isNegotiable
        condition
        specifications
        createdAt
        updatedAt
        expiresAt
        publishedAt
      }
      relatedProperties {
        id
        title
        price
        currency
        status
        images {
          id
          url
          isFeatured
        }
        location {
          city
          state
        }
      }
    }
  }
`;

// Get property statistics
export const GET_PROPERTY_STATS = gql`
  query GetPropertyStats {
    propertyStats {
      totalProperties
      activeProperties
      inactiveProperties
      soldProperties
      pendingProperties
      expiredProperties
      totalValue
      averagePrice
    }
  }
`;

// Get all available categories
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      slug
    }
  }
`;

// Get subcategories by category
export const GET_SUBCATEGORIES = gql`
  query GetSubcategories($categoryId: ID!) {
    subcategories(categoryId: $categoryId) {
      id
      name
      slug
      categoryId
    }
  }
`;

// Get all subcategories
export const GET_ALL_SUBCATEGORIES = gql`
  query GetAllSubcategories {
    allSubcategories {
      id
      name
      slug
      categoryId
    }
  }
`;
