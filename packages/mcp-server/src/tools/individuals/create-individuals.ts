// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dataleon-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dataleon from 'dataleon';

export const metadata: Metadata = {
  resource: 'individuals',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/individuals',
  operationId: 'createIndividual',
};

export const tool: Tool = {
  name: 'create_individuals',
  description: 'Create a new individual',
  inputSchema: {
    type: 'object',
    properties: {
      workspace_id: {
        type: 'string',
        description: 'Unique identifier of the workspace where the individual is being registered.',
      },
      person: {
        type: 'object',
        description: 'Personal information about the individual.',
        properties: {
          birthday: {
            type: 'string',
            description: 'Date of birth in DD/MM/YYYY format.',
          },
          email: {
            type: 'string',
            description: 'Email address of the individual.',
          },
          first_name: {
            type: 'string',
            description: 'First name of the individual.',
          },
          gender: {
            type: 'string',
            description: 'Gender of the individual (M for male, F for female).',
            enum: ['M', 'F'],
          },
          last_name: {
            type: 'string',
            description: 'Last name (family name) of the individual.',
          },
          maiden_name: {
            type: 'string',
            description: 'Maiden name, if applicable.',
          },
          phone_number: {
            type: 'string',
            description: 'Phone number of the individual.',
          },
        },
      },
      source_id: {
        type: 'string',
        description: 'Optional identifier for tracking the source system or integration from your system.',
      },
      technical_data: {
        type: 'object',
        description: 'Technical metadata related to the request or processing.',
        properties: {
          active_aml_suspicions: {
            type: 'boolean',
            description:
              'Flag indicating whether there are active research AML (Anti-Money Laundering) suspicions for the individual when you apply for a new entry or get an existing one.',
          },
          callback_url: {
            type: 'string',
            description: 'URL to call back upon completion of processing.',
          },
          callback_url_notification: {
            type: 'string',
            description: 'URL for receive notifications about the processing state or status.',
          },
          language: {
            type: 'string',
            description: 'Preferred language for communication (e.g., "eng", "fra").',
          },
          raw_data: {
            type: 'boolean',
            description: 'Flag indicating whether to include raw data in the response.',
          },
        },
      },
    },
    required: ['workspace_id'],
  },
  annotations: {},
};

export const handler = async (client: Dataleon, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.individuals.create(body));
};

export default { metadata, tool, handler };
