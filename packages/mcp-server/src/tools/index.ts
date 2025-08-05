// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import create_individuals from './individuals/create-individuals';
import retrieve_individuals from './individuals/retrieve-individuals';
import update_individuals from './individuals/update-individuals';
import list_individuals from './individuals/list-individuals';
import delete_individuals from './individuals/delete-individuals';
import list_individuals_documents from './individuals/documents/list-individuals-documents';
import upload_individuals_documents from './individuals/documents/upload-individuals-documents';
import create_companies from './companies/create-companies';
import retrieve_companies from './companies/retrieve-companies';
import update_companies from './companies/update-companies';
import list_companies from './companies/list-companies';
import delete_companies from './companies/delete-companies';
import list_companies_documents from './companies/documents/list-companies-documents';
import upload_companies_documents from './companies/documents/upload-companies-documents';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_individuals);
addEndpoint(retrieve_individuals);
addEndpoint(update_individuals);
addEndpoint(list_individuals);
addEndpoint(delete_individuals);
addEndpoint(list_individuals_documents);
addEndpoint(upload_individuals_documents);
addEndpoint(create_companies);
addEndpoint(retrieve_companies);
addEndpoint(update_companies);
addEndpoint(list_companies);
addEndpoint(delete_companies);
addEndpoint(list_companies_documents);
addEndpoint(upload_companies_documents);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
