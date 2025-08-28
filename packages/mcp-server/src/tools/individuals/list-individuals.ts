// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@dataleon/dataleon-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dataleon from '@dataleon/dataleon';

export const metadata: Metadata = {
  resource: 'individuals',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/individuals',
  operationId: 'getAllIndividuals',
};

export const tool: Tool = {
  name: 'list_individuals',
  description: 'Get all individuals',
  inputSchema: {
    type: 'object',
    properties: {
      end_date: {
        type: 'string',
        description: 'Filter individuals created before this date (format YYYY-MM-DD)',
        format: 'date',
      },
      limit: {
        type: 'integer',
        description: 'Number of results to return (between 1 and 100)',
      },
      offset: {
        type: 'integer',
        description: 'Number of results to offset (must be ≥ 0)',
      },
      source_id: {
        type: 'string',
        description: 'Filter by source ID',
      },
      start_date: {
        type: 'string',
        description: 'Filter individuals created after this date (format YYYY-MM-DD)',
        format: 'date',
      },
      state: {
        type: 'string',
        description: 'Filter by individual status (must be one of the allowed values)',
        enum: [
          'VOID',
          'WAITING',
          'STARTED',
          'RUNNING',
          'PROCESSED',
          'FAILED',
          'ABORTED',
          'EXPIRED',
          'DELETED',
        ],
      },
      status: {
        type: 'string',
        description: 'Filter by individual status (must be one of the allowed values)',
        enum: ['rejected', 'need_review', 'approved'],
      },
      workspace_id: {
        type: 'string',
        description: 'Filter by workspace ID',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Dataleon, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.individuals.list(body));
};

export default { metadata, tool, handler };
