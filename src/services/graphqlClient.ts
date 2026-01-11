import { authService } from '@app/features/auth/services/authService';
import { GraphQLClient, ClientError } from 'graphql-request';
import type { RequestDocument, Variables } from 'graphql-request';

// Create a navigation function that can be called outside of React components
let navigateToLogin: (() => void) | null = null;

export const setNavigationHandler = (handler: () => void) => {
  navigateToLogin = handler;
};

const baseClient = new GraphQLClient(
  import.meta.env.SERVER_API_URL || 'http://localhost:3000/graphql',
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

// Create a wrapper with auth middleware
const graphqlClient = {
  async request<T, V extends Variables = Variables>(
    document: RequestDocument,
    variables?: V
  ): Promise<T> {
    try {
      if (variables) {
        return await baseClient.request(document, variables as any);
      } else {
        return await baseClient.request<T>(document);
      }
    } catch (error) {
      console.log('GraphQL Error caught in middleware:', error);
      
      if (error instanceof ClientError) {
        const isUnauthorized = 
          error.response.status === 401 ||
          (error.response.errors && 
           error.response.errors.some((err: { message: string; extensions?: { code?: string } }) => 
             err.message === "Unauthorized" || 
             err.message.includes("Unauthorized") ||
             err.extensions?.code === "UNAUTHENTICATED"
           ));

        if (isUnauthorized) {
           authService.clearAuthData();
          if (navigateToLogin) {
            navigateToLogin();
          }
        }
      }
      
      throw error;
    }
  },
  
  setHeader: (key: string, value: string) => {
    baseClient.setHeader(key, value);
  }
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    baseClient.setHeader('Authorization', `Bearer ${token}`);
  } else {
    baseClient.setHeader('Authorization', '');
  }
};

const token = localStorage.getItem('AUTH_TOKEN');
if (token) {
  setAuthToken(token);
}

export default graphqlClient;
