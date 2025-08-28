// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@dataleon/dataleon-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dataleon from '@dataleon/dataleon';

export const metadata: Metadata = {
  resource: 'individuals',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/individuals/{individual_id}',
  operationId: 'deleteIndividual',
};

export const tool: Tool = {
  name: 'delete_individuals',
  description: 'Delete an individual by ID',
  inputSchema: {
    type: 'object',
    properties: {
      individual_id: {
        type: 'string',
      },
    },
    required: ['individual_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Dataleon, args: Record<string, unknown> | undefined) => {
  const { individual_id, ...body } = args as any;
  const response = await client.individuals.delete(individual_id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
