// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@dataleon/dataleon-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dataleon from '@dataleon/dataleon';

export const metadata: Metadata = {
  resource: 'individuals',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/individuals/{individual_id}',
  operationId: 'updateIndividual',
};

export const tool: Tool = {
  name: 'update_individuals',
  description: 'Update an individual by ID',
  inputSchema: {
    type: 'object',
    properties: {
      individual_id: {
        type: 'string',
      },
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
          nationality: {
            type: 'string',
            description: 'Nationality of the individual (ISO 3166-1 alpha-3 country code).',
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
          filtering_score_aml_suspicions: {
            type: 'number',
            description: 'Minimum filtering score (between 0 and 1) for AML suspicions to be considered.',
          },
          language: {
            type: 'string',
            description: 'Preferred language for communication (e.g., "eng", "fra").',
          },
          portal_steps: {
            type: 'array',
            description: 'List of steps to include in the portal workflow.',
            items: {
              type: 'string',
              enum: ['identity_verification', 'document_signing', 'proof_of_address', 'selfie', 'face_match'],
            },
          },
          raw_data: {
            type: 'boolean',
            description: 'Flag indicating whether to include raw data in the response.',
          },
        },
      },
    },
    required: ['individual_id', 'workspace_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Dataleon, args: Record<string, unknown> | undefined) => {
  const { individual_id, ...body } = args as any;
  try {
    return asTextContentResult(await client.individuals.update(individual_id, body));
  } catch (error) {
    if (error instanceof Dataleon.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
