import graphqlClient from "./graphqlClient";
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { RequestDocument, Variables } from 'graphql-request';


const graphqlBaseQuery = (): BaseQueryFn<
  { document: RequestDocument; variables?: Variables },
  unknown,
  unknown
> => {
  return async ({ document, variables }) => {
    try {
      const result = await graphqlClient.request(document, variables);
      return { data: result };
    } catch (error) {
      return { error };
    }
  };
};
export default graphqlBaseQuery;