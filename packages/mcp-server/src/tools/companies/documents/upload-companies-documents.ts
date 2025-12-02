// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@dataleon/dataleon-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@dataleon/dataleon-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dataleon from '@dataleon/dataleon';

export const metadata: Metadata = {
  resource: 'companies.documents',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/companies/{company_id}/documents',
  operationId: 'updatecompaniesdocumentsupload',
};

export const tool: Tool = {
  name: 'upload_companies_documents',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpload documents to an company\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/generic_document',\n  $defs: {\n    generic_document: {\n      type: 'object',\n      description: 'Represents a general document with metadata, verification checks, and extracted data.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier of the document.'\n        },\n        checks: {\n          type: 'array',\n          description: 'List of verification checks performed on the document.',\n          items: {\n            $ref: '#/$defs/check'\n          }\n        },\n        created_at: {\n          type: 'string',\n          description: 'Timestamp when the document was created or uploaded.',\n          format: 'date-time'\n        },\n        document_type: {\n          type: 'string',\n          description: 'Type/category of the document.'\n        },\n        name: {\n          type: 'string',\n          description: 'Name or label for the document.'\n        },\n        signed_url: {\n          type: 'string',\n          description: 'Signed URL for accessing the document file.'\n        },\n        state: {\n          type: 'string',\n          description: 'Current processing state of the document (e.g., WAITING, PROCESSED).'\n        },\n        status: {\n          type: 'string',\n          description: 'Status of the document reception or approval.'\n        },\n        tables: {\n          type: 'array',\n          description: 'List of tables extracted from the document, each containing operations.',\n          items: {\n            type: 'object',\n            properties: {\n              operation: {\n                type: 'array',\n                description: 'List of operations or actions associated with the table.',\n                items: {\n                  type: 'object',\n                  additionalProperties: true\n                }\n              }\n            }\n          }\n        },\n        values: {\n          type: 'array',\n          description: 'Extracted key-value pairs from the document, including confidence scores.',\n          items: {\n            type: 'object',\n            properties: {\n              confidence: {\n                type: 'number',\n                description: 'Confidence score (between 0 and 1) for the extracted value.'\n              },\n              name: {\n                type: 'string',\n                description: 'Name or label of the extracted field.'\n              },\n              value: {\n                type: 'array',\n                description: 'List of integer values related to the field (e.g., bounding box coordinates).',\n                items: {\n                  type: 'integer'\n                }\n              }\n            }\n          }\n        }\n      }\n    },\n    check: {\n      type: 'object',\n      description: 'Represents a verification check result.',\n      properties: {\n        masked: {\n          type: 'boolean',\n          description: 'Indicates whether the result or data is masked/hidden.'\n        },\n        message: {\n          type: 'string',\n          description: 'Additional message or explanation about the check result.'\n        },\n        name: {\n          type: 'string',\n          description: 'Name or type of the check performed.'\n        },\n        validate: {\n          type: 'boolean',\n          description: 'Result of the check, true if passed.'\n        },\n        weight: {\n          type: 'integer',\n          description: 'Importance or weight of the check, often used in scoring.'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      company_id: {
        type: 'string',
      },
      document_type: {
        type: 'string',
        description: 'Filter by document type for upload (must be one of the allowed values)',
        enum: [
          'liasse_fiscale',
          'amortised_loan_schedule',
          'invoice',
          'receipt',
          'company_statuts',
          'registration_company_certificate',
          'kbis',
          'rib',
          'livret_famille',
          'birth_certificate',
          'payslip',
          'social_security_card',
          'vehicle_registration_certificate',
          'carte_grise',
          'criminal_record_extract',
          'proof_of_address',
          'identity_card_front',
          'identity_card_back',
          'driver_license_front',
          'driver_license_back',
          'identity_document',
          'driver_license',
          'passport',
          'tax',
          'certificate_of_incorporation',
          'certificate_of_good_standing',
          'lcb_ft_lab_aml_policies',
          'niu_entreprise',
          'financial_statements',
          'rccm',
          'proof_of_source_funds',
          'organizational_chart',
          'risk_policies',
        ],
      },
      file: {
        type: 'string',
        description: 'File to upload (required)',
      },
      url: {
        type: 'string',
        description: 'URL of the file to upload (either `file` or `url` is required)',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['company_id', 'document_type'],
  },
  annotations: {},
};

export const handler = async (client: Dataleon, args: Record<string, unknown> | undefined) => {
  const { company_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.companies.documents.upload(company_id, body)),
    );
  } catch (error) {
    if (error instanceof Dataleon.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
