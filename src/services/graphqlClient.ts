import { authService } from '@app/features/auth/services/authService';
import { GraphQLClient, ClientError } from 'graphql-request';
import type { RequestDocument, Variables } from 'graphql-request';
import { buildGraphQLFormData } from './utils/extractFiles';

let navigateToLogin: (() => void) | null = null;

export const setNavigationHandler = (handler: () => void) => {
  navigateToLogin = handler;
};

const baseClient = new GraphQLClient(
  import.meta.env.VITE_SERVER_API_URL || '',
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

const handleAuthError = (error: unknown) => {
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
};

const graphqlClient = {
  async request<T, V extends Variables = Variables>(
    document: RequestDocument,
    variables?: V
  ): Promise<T> {
    try {
      if (variables) {
        return await baseClient.request(document, variables as any);
      }
      return await baseClient.request<T>(document);
    } catch (error) {
      console.log('GraphQL Error:', error);
      handleAuthError(error);
      throw error;
    }
  },
  
  setHeader: (key: string, value: string) => {
    baseClient.setHeader(key, value);
  },

  async uploadRequest<T, V extends Variables = Variables>(
    document: RequestDocument,
    variables: V
  ): Promise<T> {
    try {
      const query = typeof document === 'string' 
        ? document 
        : (document as any).loc?.source?.body || document;

      const formData = buildGraphQLFormData(query, variables);

      const url = import.meta.env.VITE_SERVER_API_URL || '';
      const token = localStorage.getItem('AUTH_TOKEN');
      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      const result = await response.json();
      
      if (result.errors) {
        throw new ClientError(result, { query, variables }); 
      }
      
      return result.data;
    } catch (error) {
      console.error('Upload error:', error);
      handleAuthError(error);
      throw error;
    }
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
