import { ClientError } from 'graphql-request';

export interface GraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: Array<string | number>;
  extensions?: Record<string, unknown>;
}

export const handleGraphQLError = (error: unknown): string => {
  if (error instanceof ClientError) {
    if (error.response.errors && error.response.errors.length > 0) {
      return error.response.errors[0].message;
    }
    
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          return 'Unauthorized. Please login again.';
        case 403:
          return 'Access forbidden.';
        case 404:
          return 'Resource not found.';
        case 500:
          return 'Server error. Please try again later.';
        default:
          return `HTTP Error: ${error.response.status}`;
      }
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

export const isAuthError = (error: unknown): boolean => {
  if (error instanceof ClientError) {
    return error.response.status === 401;
  }
  return false;
};
