// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@dataleon/dataleon-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dataleon from '@dataleon/dataleon';

export const metadata: Metadata = {
  resource: 'companies',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/companies/{company_id}',
  operationId: 'deleteCompany',
};

export const tool: Tool = {
  name: 'delete_companies',
  description: 'Delete a company by ID',
  inputSchema: {
    type: 'object',
    properties: {
      company_id: {
        type: 'string',
      },
    },
    required: ['company_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Dataleon, args: Record<string, unknown> | undefined) => {
  const { company_id, ...body } = args as any;
  const response = await client.companies.delete(company_id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
