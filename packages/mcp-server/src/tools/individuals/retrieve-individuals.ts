// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dataleon-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dataleon from 'dataleon';

export const metadata: Metadata = {
  resource: 'individuals',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/individuals/{individual_id}',
  operationId: 'getIndividualById',
};

export const tool: Tool = {
  name: 'retrieve_individuals',
  description: 'Get an individual by ID',
  inputSchema: {
    type: 'object',
    properties: {
      individual_id: {
        type: 'string',
      },
      document: {
        type: 'boolean',
        description: 'Include document information',
      },
      scope: {
        type: 'string',
        description: 'Scope filter (id or scope)',
      },
    },
    required: ['individual_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Dataleon, args: Record<string, unknown> | undefined) => {
  const { individual_id, ...body } = args as any;
  return asTextContentResult(await client.individuals.retrieve(individual_id, body));
};

export default { metadata, tool, handler };
