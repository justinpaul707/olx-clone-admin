import graphqlClient from "./graphqlClient";
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { RequestDocument, Variables } from 'graphql-request';


const graphqlBaseQuery = (): BaseQueryFn<
  { document: RequestDocument; variables?: Variables; isUpload?: boolean },
  unknown,
  unknown
> => {
  return async ({ document, variables, isUpload }) => {
    try {
      const result = isUpload 
        ? await graphqlClient.uploadRequest(document, variables || {})
        : await graphqlClient.request(document, variables);
      return { data: result };
    } catch (error) {
      return { error };
    }
  };
};
export default graphqlBaseQuery;