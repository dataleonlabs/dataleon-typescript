// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@dataleon/dataleon-mcp/filtering';
import { Metadata, asTextContentResult } from '@dataleon/dataleon-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dataleon from '@dataleon/dataleon';

export const metadata: Metadata = {
  resource: 'individuals.documents',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/individuals/{individual_id}/documents',
  operationId: 'getindividualsdocumentsupload',
};

export const tool: Tool = {
  name: 'list_individuals_documents',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet documents to an individuals\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/document_response',\n  $defs: {\n    document_response: {\n      type: 'object',\n      properties: {\n        documents: {\n          type: 'array',\n          description: 'List of documents associated with the response.',\n          items: {\n            type: 'object',\n            description: 'Represents a document stored and processed by the system, such as an identity card or a PDF contract.\\n',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'Unique identifier of the document.'\n              },\n              document_type: {\n                type: 'string',\n                description: 'Functional type of the document (e.g., identity document, invoice).'\n              },\n              filename: {\n                type: 'string',\n                description: 'Original filename of the uploaded document.'\n              },\n              name: {\n                type: 'string',\n                description: 'Human-readable name of the document.'\n              },\n              signed_url: {\n                type: 'string',\n                description: 'Secure URL to access the document.'\n              },\n              state: {\n                type: 'string',\n                description: 'Processing state of the document (e.g., WAITING, STARTED, RUNNING, PROCESSED).'\n              },\n              status: {\n                type: 'string',\n                description: 'Validation status of the document (e.g., need_review, approved, rejected).'\n              },\n              workspace_id: {\n                type: 'string',\n                description: 'Identifier of the workspace to which the document belongs.'\n              }\n            }\n          }\n        },\n        total_document: {\n          type: 'integer',\n          description: 'Total number of documents available in the response.'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      individual_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['individual_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Dataleon, args: Record<string, unknown> | undefined) => {
  const { individual_id, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.individuals.documents.list(individual_id)),
  );
};

export default { metadata, tool, handler };
