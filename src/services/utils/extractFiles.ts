/**
 * Builds FormData for GraphQL multipart request
 * Following the GraphQL Multipart Request Specification
 */
export const buildGraphQLFormData = (query: string, variables: any): FormData => {
  const formData = new FormData();
  const files: File[] = [];
  const map: Record<string, string[]> = {};

  // Replace files with null and build map
  const processVariables = (obj: any, path: string): any => {
    if (obj instanceof File) {
      const index = files.length;
      files.push(obj);
      map[index] = [path];
      return null;
    }

    if (Array.isArray(obj)) {
      return obj.map((item, i) => processVariables(item, `${path}.${i}`));
    }

    if (obj && typeof obj === 'object' && obj.constructor === Object) {
      const result: any = {};
      for (const key in obj) {
        result[key] = processVariables(obj[key], `${path}.${key}`);
      }
      return result;
    }

    return obj;
  };

  const processedVariables = processVariables(variables, 'variables');

  formData.append('operations', JSON.stringify({
    query,
    variables: processedVariables,
  }));

  formData.append('map', JSON.stringify(map));

  files.forEach((file, index) => {
    formData.append(index.toString(), file);
  });

  return formData;
};
