// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@dataleon/dataleon-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dataleon from '@dataleon/dataleon';

export const metadata: Metadata = {
  resource: 'companies',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/companies',
  operationId: 'createCompany',
};

export const tool: Tool = {
  name: 'create_companies',
  description: 'Create a new company',
  inputSchema: {
    type: 'object',
    properties: {
      company: {
        type: 'object',
        description: 'Main information about the company being registered.',
        properties: {
          name: {
            type: 'string',
            description: 'Legal name of the company.',
          },
          address: {
            type: 'string',
            description: 'Registered address of the company.',
          },
          commercial_name: {
            type: 'string',
            description: 'Commercial or trade name of the company, if different from the legal name.',
          },
          country: {
            type: 'string',
            description: 'ISO 3166-1 alpha-2 country code of company registration (e.g., "FR" for France).',
          },
          email: {
            type: 'string',
            description: 'Contact email address for the company.',
          },
          employer_identification_number: {
            type: 'string',
            description: 'Employer Identification Number (EIN) or equivalent.',
          },
          legal_form: {
            type: 'string',
            description: 'Legal structure of the company (e.g., SARL, SAS).',
          },
          phone_number: {
            type: 'string',
            description: 'Contact phone number for the company.',
          },
          registration_date: {
            type: 'string',
            description: 'Date of official company registration in YYYY-MM-DD format.',
          },
          registration_id: {
            type: 'string',
            description: 'Official company registration identifier.',
          },
          share_capital: {
            type: 'string',
            description: 'Declared share capital of the company, usually in euros.',
          },
          status: {
            type: 'string',
            description: 'Current status of the company (e.g., active, inactive).',
          },
          tax_identification_number: {
            type: 'string',
            description: 'National tax identifier (e.g., VAT or TIN).',
          },
          type: {
            type: 'string',
            description: 'Type of company, such as "main" or "affiliated".',
          },
          website_url: {
            type: 'string',
            description: 'Company’s official website URL.',
          },
        },
        required: ['name'],
      },
      workspace_id: {
        type: 'string',
        description: 'Unique identifier of the workspace in which the company is being created.',
      },
      source_id: {
        type: 'string',
        description:
          'Optional identifier to track the origin of the request or integration from your system.',
      },
      technical_data: {
        type: 'object',
        description: 'Technical metadata and callback configuration.',
        properties: {
          active_aml_suspicions: {
            type: 'boolean',
            description:
              'Flag indicating whether there are active research AML (Anti-Money Laundering) suspicions for the company when you apply for a new entry or get an existing one.',
          },
          callback_url: {
            type: 'string',
            description: 'URL to receive a callback once the company is processed.',
          },
          callback_url_notification: {
            type: 'string',
            description: 'URL to receive notifications about the processing state and status.',
          },
          filtering_score_aml_suspicions: {
            type: 'number',
            description: 'Minimum filtering score (between 0 and 1) for AML suspicions to be considered.',
          },
          language: {
            type: 'string',
            description: 'Preferred language for responses or notifications (e.g., "eng", "fra").',
          },
          raw_data: {
            type: 'boolean',
            description: 'Flag indicating whether to include raw data in the response.',
          },
        },
      },
    },
    required: ['company', 'workspace_id'],
  },
  annotations: {},
};

export const handler = async (client: Dataleon, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.companies.create(body));
};

export default { metadata, tool, handler };
