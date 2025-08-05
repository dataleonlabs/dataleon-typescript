// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dataleon-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dataleon from 'dataleon';

export const metadata: Metadata = {
  resource: 'companies',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/companies/{company_id}',
  operationId: 'getCompanyById',
};

export const tool: Tool = {
  name: 'retrieve_companies',
  description: 'Get a company by ID',
  inputSchema: {
    type: 'object',
    properties: {
      company_id: {
        type: 'string',
      },
      document: {
        type: 'boolean',
        description: 'Include document signed url',
      },
      scope: {
        type: 'string',
        description: 'Scope filter (id or scope)',
      },
    },
    required: ['company_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Dataleon, args: Record<string, unknown> | undefined) => {
  const { company_id, ...body } = args as any;
  return asTextContentResult(await client.companies.retrieve(company_id, body));
};

export default { metadata, tool, handler };
