// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'create',
    endpoint: '/individuals',
    httpMethod: 'post',
    summary: 'Create a new individual',
    description: 'Create a new individual',
    stainlessPath: '(resource) individuals > (method) create',
    qualified: 'client.individuals.create',
    params: [
      'workspace_id: string;',
      "person?: { birthday?: string; email?: string; first_name?: string; gender?: 'M' | 'F'; last_name?: string; maiden_name?: string; nationality?: string; phone_number?: string; };",
      'source_id?: string;',
      "technical_data?: { active_aml_suspicions?: boolean; callback_url?: string; callback_url_notification?: string; filtering_score_aml_suspicions?: number; language?: string; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; raw_data?: boolean; };",
    ],
    response:
      '{ id?: string; aml_suspicions?: object[]; auth_url?: string; certificat?: object; checks?: check[]; created_at?: string; documents?: generic_document[]; identity_card?: object; number?: number; person?: object; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; state?: string; status?: string; tags?: object[]; technical_data?: object; webview_url?: string; workspace_id?: string; }',
    markdown:
      "## create\n\n`client.individuals.create(workspace_id: string, person?: { birthday?: string; email?: string; first_name?: string; gender?: 'M' | 'F'; last_name?: string; maiden_name?: string; nationality?: string; phone_number?: string; }, source_id?: string, technical_data?: { active_aml_suspicions?: boolean; callback_url?: string; callback_url_notification?: string; filtering_score_aml_suspicions?: number; language?: string; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; raw_data?: boolean; }): { id?: string; aml_suspicions?: object[]; auth_url?: string; certificat?: object; checks?: check[]; created_at?: string; documents?: generic_document[]; identity_card?: object; number?: number; person?: object; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; state?: string; status?: string; tags?: object[]; technical_data?: object; webview_url?: string; workspace_id?: string; }`\n\n**post** `/individuals`\n\nCreate a new individual\n\n### Parameters\n\n- `workspace_id: string`\n  Unique identifier of the workspace where the individual is being registered.\n\n- `person?: { birthday?: string; email?: string; first_name?: string; gender?: 'M' | 'F'; last_name?: string; maiden_name?: string; nationality?: string; phone_number?: string; }`\n  Personal information about the individual.\n  - `birthday?: string`\n    Date of birth in DD/MM/YYYY format.\n  - `email?: string`\n    Email address of the individual.\n  - `first_name?: string`\n    First name of the individual.\n  - `gender?: 'M' | 'F'`\n    Gender of the individual (M for male, F for female).\n  - `last_name?: string`\n    Last name (family name) of the individual.\n  - `maiden_name?: string`\n    Maiden name, if applicable.\n  - `nationality?: string`\n    Nationality of the individual (ISO 3166-1 alpha-3 country code).\n  - `phone_number?: string`\n    Phone number of the individual.\n\n- `source_id?: string`\n  Optional identifier for tracking the source system or integration from your system.\n\n- `technical_data?: { active_aml_suspicions?: boolean; callback_url?: string; callback_url_notification?: string; filtering_score_aml_suspicions?: number; language?: string; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; raw_data?: boolean; }`\n  Technical metadata related to the request or processing.\n  - `active_aml_suspicions?: boolean`\n    Flag indicating whether there are active research AML (Anti-Money Laundering) suspicions for the individual when you apply for a new entry or get an existing one.\n  - `callback_url?: string`\n    URL to call back upon completion of processing.\n  - `callback_url_notification?: string`\n    URL for receive notifications about the processing state or status.\n  - `filtering_score_aml_suspicions?: number`\n    Minimum filtering score (between 0 and 1) for AML suspicions to be considered.\n  - `language?: string`\n    Preferred language for communication (e.g., \"eng\", \"fra\").\n  - `portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]`\n    List of steps to include in the portal workflow.\n  - `raw_data?: boolean`\n    Flag indicating whether to include raw data in the response.\n\n### Returns\n\n- `{ id?: string; aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]; auth_url?: string; certificat?: { id?: string; created_at?: string; filename?: string; }; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; created_at?: string; documents?: { id?: string; checks?: check[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: object[]; values?: object[]; }[]; identity_card?: { id?: string; back_document_signed_url?: string; birth_place?: string; birthday?: string; country?: string; entitlement_date?: string; expiration_date?: string; first_name?: string; front_document_signed_url?: string; gender?: string; issue_date?: string; last_name?: string; mrz_line_1?: string; mrz_line_2?: string; mrz_line_3?: string; type?: string; }; number?: number; person?: { birthday?: string; email?: string; face_image_signed_url?: string; first_name?: string; full_name?: string; gender?: string; last_name?: string; maiden_name?: string; nationality?: string; phone_number?: string; }; portal_url?: string; properties?: { name?: string; type?: string; value?: string; }[]; risk?: { code?: string; reason?: string; score?: number; }; source_id?: string; state?: string; status?: string; tags?: { key?: string; private?: boolean; type?: string; value?: string; }[]; technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }; webview_url?: string; workspace_id?: string; }`\n  Represents a single individual record, including identification, status, and associated metadata.\n\n  - `id?: string`\n  - `aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]`\n  - `auth_url?: string`\n  - `certificat?: { id?: string; created_at?: string; filename?: string; }`\n  - `checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]`\n  - `created_at?: string`\n  - `documents?: { id?: string; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: { operation?: object[]; }[]; values?: { confidence?: number; name?: string; value?: number[]; }[]; }[]`\n  - `identity_card?: { id?: string; back_document_signed_url?: string; birth_place?: string; birthday?: string; country?: string; entitlement_date?: string; expiration_date?: string; first_name?: string; front_document_signed_url?: string; gender?: string; issue_date?: string; last_name?: string; mrz_line_1?: string; mrz_line_2?: string; mrz_line_3?: string; type?: string; }`\n  - `number?: number`\n  - `person?: { birthday?: string; email?: string; face_image_signed_url?: string; first_name?: string; full_name?: string; gender?: string; last_name?: string; maiden_name?: string; nationality?: string; phone_number?: string; }`\n  - `portal_url?: string`\n  - `properties?: { name?: string; type?: string; value?: string; }[]`\n  - `risk?: { code?: string; reason?: string; score?: number; }`\n  - `source_id?: string`\n  - `state?: string`\n  - `status?: string`\n  - `tags?: { key?: string; private?: boolean; type?: string; value?: string; }[]`\n  - `technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }`\n  - `webview_url?: string`\n  - `workspace_id?: string`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nconst individual = await client.individuals.create({ workspace_id: 'wk_123' });\n\nconsole.log(individual);\n```",
    perLanguage: {
      typescript: {
        method: 'client.individuals.create',
        example:
          "import Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst individual = await client.individuals.create({ workspace_id: 'wk_123' });\n\nconsole.log(individual.id);",
      },
      python: {
        method: 'individuals.create',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\nindividual = client.individuals.create(\n    workspace_id="wk_123",\n)\nprint(individual.id)',
      },
      java: {
        method: 'individuals().create',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.individuals.Individual;\nimport com.dataleon.api.models.individuals.IndividualCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        IndividualCreateParams params = IndividualCreateParams.builder()\n            .workspaceId("wk_123")\n            .build();\n        Individual individual = client.individuals().create(params);\n    }\n}',
      },
      go: {
        method: 'client.Individuals.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tindividual, err := client.Individuals.New(context.TODO(), dataleon.IndividualNewParams{\n\t\tWorkspaceID: "wk_123",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", individual.ID)\n}\n',
      },
      ruby: {
        method: 'individuals.create',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\nindividual = dataleon.individuals.create(workspace_id: "wk_123")\n\nputs(individual)',
      },
      php: {
        method: 'individuals->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$individual = $client->individuals->create(\n  workspaceID: 'wk_123',\n  person: [\n    'birthday' => '15/05/1985',\n    'email' => 'john.doe@example.com',\n    'firstName' => 'John',\n    'gender' => 'M',\n    'lastName' => 'Doe',\n    'maidenName' => 'John Doe',\n    'nationality' => 'FRA',\n    'phoneNumber' => '+33 1 23 45 67 89',\n  ],\n  sourceID: 'ID54410069066',\n  technicalData: [\n    'activeAmlSuspicions' => false,\n    'callbackURL' => 'https://example.com/callback',\n    'callbackURLNotification' => 'https://example.com/notify',\n    'filteringScoreAmlSuspicions' => 0.75,\n    'language' => 'fra',\n    'portalSteps' => ['identity_verification', 'selfie', 'face_match'],\n    'rawData' => true,\n  ],\n);\n\nvar_dump($individual);",
      },
      csharp: {
        method: 'Individuals.Create',
        example:
          'IndividualCreateParams parameters = new() { WorkspaceID = "wk_123" };\n\nvar individual = await client.Individuals.Create(parameters);\n\nConsole.WriteLine(individual);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/individuals \\\n    -H \'Content-Type: application/json\' \\\n    -H "Api-Key: $DATALEON_API_KEY" \\\n    -d \'{\n          "workspace_id": "wk_123",\n          "source_id": "ID54410069066"\n        }\'',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/individuals',
    httpMethod: 'get',
    summary: 'Get all individuals',
    description: 'Get all individuals',
    stainlessPath: '(resource) individuals > (method) list',
    qualified: 'client.individuals.list',
    params: [
      'end_date?: string;',
      'limit?: number;',
      'offset?: number;',
      'source_id?: string;',
      'start_date?: string;',
      'state?: string;',
      "status?: 'rejected' | 'need_review' | 'approved';",
      'workspace_id?: string;',
    ],
    response:
      '{ id?: string; aml_suspicions?: object[]; auth_url?: string; certificat?: object; checks?: check[]; created_at?: string; documents?: generic_document[]; identity_card?: object; number?: number; person?: object; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; state?: string; status?: string; tags?: object[]; technical_data?: object; webview_url?: string; workspace_id?: string; }[]',
    markdown:
      "## list\n\n`client.individuals.list(end_date?: string, limit?: number, offset?: number, source_id?: string, start_date?: string, state?: string, status?: 'rejected' | 'need_review' | 'approved', workspace_id?: string): object[]`\n\n**get** `/individuals`\n\nGet all individuals\n\n### Parameters\n\n- `end_date?: string`\n  Filter individuals created before this date (format YYYY-MM-DD)\n\n- `limit?: number`\n  Number of results to return (between 1 and 100)\n\n- `offset?: number`\n  Number of results to offset (must be ≥ 0)\n\n- `source_id?: string`\n  Filter by source ID\n\n- `start_date?: string`\n  Filter individuals created after this date (format YYYY-MM-DD)\n\n- `state?: string`\n  Filter by individual status (must be one of the allowed values)\n\n- `status?: 'rejected' | 'need_review' | 'approved'`\n  Filter by individual status (must be one of the allowed values)\n\n- `workspace_id?: string`\n  Filter by workspace ID\n\n### Returns\n\n- `{ id?: string; aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]; auth_url?: string; certificat?: { id?: string; created_at?: string; filename?: string; }; checks?: object[]; created_at?: string; documents?: object[]; identity_card?: { id?: string; back_document_signed_url?: string; birth_place?: string; birthday?: string; country?: string; entitlement_date?: string; expiration_date?: string; first_name?: string; front_document_signed_url?: string; gender?: string; issue_date?: string; last_name?: string; mrz_line_1?: string; mrz_line_2?: string; mrz_line_3?: string; type?: string; }; number?: number; person?: { birthday?: string; email?: string; face_image_signed_url?: string; first_name?: string; full_name?: string; gender?: string; last_name?: string; maiden_name?: string; nationality?: string; phone_number?: string; }; portal_url?: string; properties?: { name?: string; type?: string; value?: string; }[]; risk?: { code?: string; reason?: string; score?: number; }; source_id?: string; state?: string; status?: string; tags?: { key?: string; private?: boolean; type?: string; value?: string; }[]; technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }; webview_url?: string; workspace_id?: string; }[]`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nconst individuals = await client.individuals.list();\n\nconsole.log(individuals);\n```",
    perLanguage: {
      typescript: {
        method: 'client.individuals.list',
        example:
          "import Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst individuals = await client.individuals.list();\n\nconsole.log(individuals);",
      },
      python: {
        method: 'individuals.list',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\nindividuals = client.individuals.list()\nprint(individuals)',
      },
      java: {
        method: 'individuals().list',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.individuals.Individual;\nimport com.dataleon.api.models.individuals.IndividualListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        List<Individual> individuals = client.individuals().list();\n    }\n}',
      },
      go: {
        method: 'client.Individuals.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tindividuals, err := client.Individuals.List(context.TODO(), dataleon.IndividualListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", individuals)\n}\n',
      },
      ruby: {
        method: 'individuals.list',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\nindividuals = dataleon.individuals.list\n\nputs(individuals)',
      },
      php: {
        method: 'individuals->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$individuals = $client->individuals->list(\n  endDate: '2019-12-27',\n  limit: 1,\n  offset: 0,\n  sourceID: 'source_id',\n  startDate: '2019-12-27',\n  state: 'VOID',\n  status: 'rejected',\n  workspaceID: 'workspace_id',\n);\n\nvar_dump($individuals);",
      },
      csharp: {
        method: 'Individuals.List',
        example:
          'IndividualListParams parameters = new();\n\nvar individuals = await client.Individuals.List(parameters);\n\nConsole.WriteLine(individuals);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/individuals \\\n    -H "Api-Key: $DATALEON_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/individuals/{individual_id}',
    httpMethod: 'get',
    summary: 'Get an individual by ID',
    description: 'Get an individual by ID',
    stainlessPath: '(resource) individuals > (method) retrieve',
    qualified: 'client.individuals.retrieve',
    params: ['individual_id: string;', 'document?: boolean;', 'scope?: string;'],
    response:
      '{ id?: string; aml_suspicions?: object[]; auth_url?: string; certificat?: object; checks?: check[]; created_at?: string; documents?: generic_document[]; identity_card?: object; number?: number; person?: object; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; state?: string; status?: string; tags?: object[]; technical_data?: object; webview_url?: string; workspace_id?: string; }',
    markdown:
      "## retrieve\n\n`client.individuals.retrieve(individual_id: string, document?: boolean, scope?: string): { id?: string; aml_suspicions?: object[]; auth_url?: string; certificat?: object; checks?: check[]; created_at?: string; documents?: generic_document[]; identity_card?: object; number?: number; person?: object; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; state?: string; status?: string; tags?: object[]; technical_data?: object; webview_url?: string; workspace_id?: string; }`\n\n**get** `/individuals/{individual_id}`\n\nGet an individual by ID\n\n### Parameters\n\n- `individual_id: string`\n\n- `document?: boolean`\n  Include document information\n\n- `scope?: string`\n  Scope filter (id or scope)\n\n### Returns\n\n- `{ id?: string; aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]; auth_url?: string; certificat?: { id?: string; created_at?: string; filename?: string; }; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; created_at?: string; documents?: { id?: string; checks?: check[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: object[]; values?: object[]; }[]; identity_card?: { id?: string; back_document_signed_url?: string; birth_place?: string; birthday?: string; country?: string; entitlement_date?: string; expiration_date?: string; first_name?: string; front_document_signed_url?: string; gender?: string; issue_date?: string; last_name?: string; mrz_line_1?: string; mrz_line_2?: string; mrz_line_3?: string; type?: string; }; number?: number; person?: { birthday?: string; email?: string; face_image_signed_url?: string; first_name?: string; full_name?: string; gender?: string; last_name?: string; maiden_name?: string; nationality?: string; phone_number?: string; }; portal_url?: string; properties?: { name?: string; type?: string; value?: string; }[]; risk?: { code?: string; reason?: string; score?: number; }; source_id?: string; state?: string; status?: string; tags?: { key?: string; private?: boolean; type?: string; value?: string; }[]; technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }; webview_url?: string; workspace_id?: string; }`\n  Represents a single individual record, including identification, status, and associated metadata.\n\n  - `id?: string`\n  - `aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]`\n  - `auth_url?: string`\n  - `certificat?: { id?: string; created_at?: string; filename?: string; }`\n  - `checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]`\n  - `created_at?: string`\n  - `documents?: { id?: string; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: { operation?: object[]; }[]; values?: { confidence?: number; name?: string; value?: number[]; }[]; }[]`\n  - `identity_card?: { id?: string; back_document_signed_url?: string; birth_place?: string; birthday?: string; country?: string; entitlement_date?: string; expiration_date?: string; first_name?: string; front_document_signed_url?: string; gender?: string; issue_date?: string; last_name?: string; mrz_line_1?: string; mrz_line_2?: string; mrz_line_3?: string; type?: string; }`\n  - `number?: number`\n  - `person?: { birthday?: string; email?: string; face_image_signed_url?: string; first_name?: string; full_name?: string; gender?: string; last_name?: string; maiden_name?: string; nationality?: string; phone_number?: string; }`\n  - `portal_url?: string`\n  - `properties?: { name?: string; type?: string; value?: string; }[]`\n  - `risk?: { code?: string; reason?: string; score?: number; }`\n  - `source_id?: string`\n  - `state?: string`\n  - `status?: string`\n  - `tags?: { key?: string; private?: boolean; type?: string; value?: string; }[]`\n  - `technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }`\n  - `webview_url?: string`\n  - `workspace_id?: string`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nconst individual = await client.individuals.retrieve('individual_id');\n\nconsole.log(individual);\n```",
    perLanguage: {
      typescript: {
        method: 'client.individuals.retrieve',
        example:
          "import Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst individual = await client.individuals.retrieve('individual_id');\n\nconsole.log(individual.id);",
      },
      python: {
        method: 'individuals.retrieve',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\nindividual = client.individuals.retrieve(\n    individual_id="individual_id",\n)\nprint(individual.id)',
      },
      java: {
        method: 'individuals().retrieve',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.individuals.Individual;\nimport com.dataleon.api.models.individuals.IndividualRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        Individual individual = client.individuals().retrieve("individual_id");\n    }\n}',
      },
      go: {
        method: 'client.Individuals.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tindividual, err := client.Individuals.Get(\n\t\tcontext.TODO(),\n\t\t"individual_id",\n\t\tdataleon.IndividualGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", individual.ID)\n}\n',
      },
      ruby: {
        method: 'individuals.retrieve',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\nindividual = dataleon.individuals.retrieve("individual_id")\n\nputs(individual)',
      },
      php: {
        method: 'individuals->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$individual = $client->individuals->retrieve(\n  'individual_id', document: true, scope: 'scope'\n);\n\nvar_dump($individual);",
      },
      csharp: {
        method: 'Individuals.Retrieve',
        example:
          'IndividualRetrieveParams parameters = new() { IndividualID = "individual_id" };\n\nvar individual = await client.Individuals.Retrieve(parameters);\n\nConsole.WriteLine(individual);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/individuals/$INDIVIDUAL_ID \\\n    -H "Api-Key: $DATALEON_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/individuals/{individual_id}',
    httpMethod: 'put',
    summary: 'Update an individual by ID',
    description: 'Update an individual by ID',
    stainlessPath: '(resource) individuals > (method) update',
    qualified: 'client.individuals.update',
    params: [
      'individual_id: string;',
      'workspace_id: string;',
      "person?: { birthday?: string; email?: string; first_name?: string; gender?: 'M' | 'F'; last_name?: string; maiden_name?: string; nationality?: string; phone_number?: string; };",
      'source_id?: string;',
      "technical_data?: { active_aml_suspicions?: boolean; callback_url?: string; callback_url_notification?: string; filtering_score_aml_suspicions?: number; language?: string; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; raw_data?: boolean; };",
    ],
    response:
      '{ id?: string; aml_suspicions?: object[]; auth_url?: string; certificat?: object; checks?: check[]; created_at?: string; documents?: generic_document[]; identity_card?: object; number?: number; person?: object; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; state?: string; status?: string; tags?: object[]; technical_data?: object; webview_url?: string; workspace_id?: string; }',
    markdown:
      "## update\n\n`client.individuals.update(individual_id: string, workspace_id: string, person?: { birthday?: string; email?: string; first_name?: string; gender?: 'M' | 'F'; last_name?: string; maiden_name?: string; nationality?: string; phone_number?: string; }, source_id?: string, technical_data?: { active_aml_suspicions?: boolean; callback_url?: string; callback_url_notification?: string; filtering_score_aml_suspicions?: number; language?: string; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; raw_data?: boolean; }): { id?: string; aml_suspicions?: object[]; auth_url?: string; certificat?: object; checks?: check[]; created_at?: string; documents?: generic_document[]; identity_card?: object; number?: number; person?: object; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; state?: string; status?: string; tags?: object[]; technical_data?: object; webview_url?: string; workspace_id?: string; }`\n\n**put** `/individuals/{individual_id}`\n\nUpdate an individual by ID\n\n### Parameters\n\n- `individual_id: string`\n\n- `workspace_id: string`\n  Unique identifier of the workspace where the individual is being registered.\n\n- `person?: { birthday?: string; email?: string; first_name?: string; gender?: 'M' | 'F'; last_name?: string; maiden_name?: string; nationality?: string; phone_number?: string; }`\n  Personal information about the individual.\n  - `birthday?: string`\n    Date of birth in DD/MM/YYYY format.\n  - `email?: string`\n    Email address of the individual.\n  - `first_name?: string`\n    First name of the individual.\n  - `gender?: 'M' | 'F'`\n    Gender of the individual (M for male, F for female).\n  - `last_name?: string`\n    Last name (family name) of the individual.\n  - `maiden_name?: string`\n    Maiden name, if applicable.\n  - `nationality?: string`\n    Nationality of the individual (ISO 3166-1 alpha-3 country code).\n  - `phone_number?: string`\n    Phone number of the individual.\n\n- `source_id?: string`\n  Optional identifier for tracking the source system or integration from your system.\n\n- `technical_data?: { active_aml_suspicions?: boolean; callback_url?: string; callback_url_notification?: string; filtering_score_aml_suspicions?: number; language?: string; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; raw_data?: boolean; }`\n  Technical metadata related to the request or processing.\n  - `active_aml_suspicions?: boolean`\n    Flag indicating whether there are active research AML (Anti-Money Laundering) suspicions for the individual when you apply for a new entry or get an existing one.\n  - `callback_url?: string`\n    URL to call back upon completion of processing.\n  - `callback_url_notification?: string`\n    URL for receive notifications about the processing state or status.\n  - `filtering_score_aml_suspicions?: number`\n    Minimum filtering score (between 0 and 1) for AML suspicions to be considered.\n  - `language?: string`\n    Preferred language for communication (e.g., \"eng\", \"fra\").\n  - `portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]`\n    List of steps to include in the portal workflow.\n  - `raw_data?: boolean`\n    Flag indicating whether to include raw data in the response.\n\n### Returns\n\n- `{ id?: string; aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]; auth_url?: string; certificat?: { id?: string; created_at?: string; filename?: string; }; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; created_at?: string; documents?: { id?: string; checks?: check[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: object[]; values?: object[]; }[]; identity_card?: { id?: string; back_document_signed_url?: string; birth_place?: string; birthday?: string; country?: string; entitlement_date?: string; expiration_date?: string; first_name?: string; front_document_signed_url?: string; gender?: string; issue_date?: string; last_name?: string; mrz_line_1?: string; mrz_line_2?: string; mrz_line_3?: string; type?: string; }; number?: number; person?: { birthday?: string; email?: string; face_image_signed_url?: string; first_name?: string; full_name?: string; gender?: string; last_name?: string; maiden_name?: string; nationality?: string; phone_number?: string; }; portal_url?: string; properties?: { name?: string; type?: string; value?: string; }[]; risk?: { code?: string; reason?: string; score?: number; }; source_id?: string; state?: string; status?: string; tags?: { key?: string; private?: boolean; type?: string; value?: string; }[]; technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }; webview_url?: string; workspace_id?: string; }`\n  Represents a single individual record, including identification, status, and associated metadata.\n\n  - `id?: string`\n  - `aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]`\n  - `auth_url?: string`\n  - `certificat?: { id?: string; created_at?: string; filename?: string; }`\n  - `checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]`\n  - `created_at?: string`\n  - `documents?: { id?: string; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: { operation?: object[]; }[]; values?: { confidence?: number; name?: string; value?: number[]; }[]; }[]`\n  - `identity_card?: { id?: string; back_document_signed_url?: string; birth_place?: string; birthday?: string; country?: string; entitlement_date?: string; expiration_date?: string; first_name?: string; front_document_signed_url?: string; gender?: string; issue_date?: string; last_name?: string; mrz_line_1?: string; mrz_line_2?: string; mrz_line_3?: string; type?: string; }`\n  - `number?: number`\n  - `person?: { birthday?: string; email?: string; face_image_signed_url?: string; first_name?: string; full_name?: string; gender?: string; last_name?: string; maiden_name?: string; nationality?: string; phone_number?: string; }`\n  - `portal_url?: string`\n  - `properties?: { name?: string; type?: string; value?: string; }[]`\n  - `risk?: { code?: string; reason?: string; score?: number; }`\n  - `source_id?: string`\n  - `state?: string`\n  - `status?: string`\n  - `tags?: { key?: string; private?: boolean; type?: string; value?: string; }[]`\n  - `technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }`\n  - `webview_url?: string`\n  - `workspace_id?: string`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nconst individual = await client.individuals.update('individual_id', { workspace_id: 'wk_123' });\n\nconsole.log(individual);\n```",
    perLanguage: {
      typescript: {
        method: 'client.individuals.update',
        example:
          "import Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst individual = await client.individuals.update('individual_id', { workspace_id: 'wk_123' });\n\nconsole.log(individual.id);",
      },
      python: {
        method: 'individuals.update',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\nindividual = client.individuals.update(\n    individual_id="individual_id",\n    workspace_id="wk_123",\n)\nprint(individual.id)',
      },
      java: {
        method: 'individuals().update',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.individuals.Individual;\nimport com.dataleon.api.models.individuals.IndividualUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        IndividualUpdateParams params = IndividualUpdateParams.builder()\n            .individualId("individual_id")\n            .workspaceId("wk_123")\n            .build();\n        Individual individual = client.individuals().update(params);\n    }\n}',
      },
      go: {
        method: 'client.Individuals.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tindividual, err := client.Individuals.Update(\n\t\tcontext.TODO(),\n\t\t"individual_id",\n\t\tdataleon.IndividualUpdateParams{\n\t\t\tWorkspaceID: "wk_123",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", individual.ID)\n}\n',
      },
      ruby: {
        method: 'individuals.update',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\nindividual = dataleon.individuals.update("individual_id", workspace_id: "wk_123")\n\nputs(individual)',
      },
      php: {
        method: 'individuals->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$individual = $client->individuals->update(\n  'individual_id',\n  workspaceID: 'wk_123',\n  person: [\n    'birthday' => '15/05/1985',\n    'email' => 'john.doe@example.com',\n    'firstName' => 'John',\n    'gender' => 'M',\n    'lastName' => 'Doe',\n    'maidenName' => 'John Doe',\n    'nationality' => 'FRA',\n    'phoneNumber' => '+33 1 23 45 67 89',\n  ],\n  sourceID: 'ID54410069066',\n  technicalData: [\n    'activeAmlSuspicions' => false,\n    'callbackURL' => 'https://example.com/callback',\n    'callbackURLNotification' => 'https://example.com/notify',\n    'filteringScoreAmlSuspicions' => 0.75,\n    'language' => 'fra',\n    'portalSteps' => ['identity_verification', 'selfie', 'face_match'],\n    'rawData' => true,\n  ],\n);\n\nvar_dump($individual);",
      },
      csharp: {
        method: 'Individuals.Update',
        example:
          'IndividualUpdateParams parameters = new()\n{\n    IndividualID = "individual_id",\n    WorkspaceID = "wk_123",\n};\n\nvar individual = await client.Individuals.Update(parameters);\n\nConsole.WriteLine(individual);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/individuals/$INDIVIDUAL_ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Api-Key: $DATALEON_API_KEY" \\\n    -d \'{\n          "workspace_id": "wk_123",\n          "source_id": "ID54410069066"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/individuals/{individual_id}',
    httpMethod: 'delete',
    summary: 'Delete an individual by ID',
    description: 'Delete an individual by ID',
    stainlessPath: '(resource) individuals > (method) delete',
    qualified: 'client.individuals.delete',
    params: ['individual_id: string;'],
    markdown:
      "## delete\n\n`client.individuals.delete(individual_id: string): void`\n\n**delete** `/individuals/{individual_id}`\n\nDelete an individual by ID\n\n### Parameters\n\n- `individual_id: string`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nawait client.individuals.delete('individual_id')\n```",
    perLanguage: {
      typescript: {
        method: 'client.individuals.delete',
        example:
          "import Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.individuals.delete('individual_id');",
      },
      python: {
        method: 'individuals.delete',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\nclient.individuals.delete(\n    "individual_id",\n)',
      },
      java: {
        method: 'individuals().delete',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.individuals.IndividualDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        client.individuals().delete("individual_id");\n    }\n}',
      },
      go: {
        method: 'client.Individuals.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Individuals.Delete(context.TODO(), "individual_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'individuals.delete',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\nresult = dataleon.individuals.delete("individual_id")\n\nputs(result)',
      },
      php: {
        method: 'individuals->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->individuals->delete('individual_id');\n\nvar_dump($result);",
      },
      csharp: {
        method: 'Individuals.Delete',
        example:
          'IndividualDeleteParams parameters = new() { IndividualID = "individual_id" };\n\nawait client.Individuals.Delete(parameters);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/individuals/$INDIVIDUAL_ID \\\n    -X DELETE \\\n    -H "Api-Key: $DATALEON_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/individuals/{individual_id}/documents',
    httpMethod: 'get',
    summary: 'Get documents to an individuals',
    description: 'Get documents to an individuals',
    stainlessPath: '(resource) individuals.documents > (method) list',
    qualified: 'client.individuals.documents.list',
    params: ['individual_id: string;'],
    response:
      '{ documents?: { id?: string; document_type?: string; filename?: string; name?: string; signed_url?: string; state?: string; status?: string; workspace_id?: string; }[]; total_document?: number; }',
    markdown:
      "## list\n\n`client.individuals.documents.list(individual_id: string): { documents?: object[]; total_document?: number; }`\n\n**get** `/individuals/{individual_id}/documents`\n\nGet documents to an individuals\n\n### Parameters\n\n- `individual_id: string`\n\n### Returns\n\n- `{ documents?: { id?: string; document_type?: string; filename?: string; name?: string; signed_url?: string; state?: string; status?: string; workspace_id?: string; }[]; total_document?: number; }`\n\n  - `documents?: { id?: string; document_type?: string; filename?: string; name?: string; signed_url?: string; state?: string; status?: string; workspace_id?: string; }[]`\n  - `total_document?: number`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nconst documentResponse = await client.individuals.documents.list('individual_id');\n\nconsole.log(documentResponse);\n```",
    perLanguage: {
      typescript: {
        method: 'client.individuals.documents.list',
        example:
          "import Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst documentResponse = await client.individuals.documents.list('individual_id');\n\nconsole.log(documentResponse.documents);",
      },
      python: {
        method: 'individuals.documents.list',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\ndocument_response = client.individuals.documents.list(\n    "individual_id",\n)\nprint(document_response.documents)',
      },
      java: {
        method: 'individuals().documents().list',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.individuals.documents.DocumentListParams;\nimport com.dataleon.api.models.individuals.documents.DocumentResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        DocumentResponse documentResponse = client.individuals().documents().list("individual_id");\n    }\n}',
      },
      go: {
        method: 'client.Individuals.Documents.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdocumentResponse, err := client.Individuals.Documents.List(context.TODO(), "individual_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", documentResponse.Documents)\n}\n',
      },
      ruby: {
        method: 'individuals.documents.list',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\ndocument_response = dataleon.individuals.documents.list("individual_id")\n\nputs(document_response)',
      },
      php: {
        method: 'individuals->documents->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$documentResponse = $client->individuals->documents->list('individual_id');\n\nvar_dump($documentResponse);",
      },
      csharp: {
        method: 'Individuals.Documents.List',
        example:
          'DocumentListParams parameters = new() { IndividualID = "individual_id" };\n\nvar documentResponse = await client.Individuals.Documents.List(parameters);\n\nConsole.WriteLine(documentResponse);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/individuals/$INDIVIDUAL_ID/documents \\\n    -H "Api-Key: $DATALEON_API_KEY"',
      },
    },
  },
  {
    name: 'upload',
    endpoint: '/individuals/{individual_id}/documents',
    httpMethod: 'post',
    summary: 'Upload documents to an individual',
    description: 'Upload documents to an individual',
    stainlessPath: '(resource) individuals.documents > (method) upload',
    qualified: 'client.individuals.documents.upload',
    params: ['individual_id: string;', 'document_type: string;', 'file?: string;', 'url?: string;'],
    response:
      '{ id?: string; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: { operation?: object[]; }[]; values?: { confidence?: number; name?: string; value?: number[]; }[]; }',
    markdown:
      "## upload\n\n`client.individuals.documents.upload(individual_id: string, document_type: string, file?: string, url?: string): { id?: string; checks?: check[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: object[]; values?: object[]; }`\n\n**post** `/individuals/{individual_id}/documents`\n\nUpload documents to an individual\n\n### Parameters\n\n- `individual_id: string`\n\n- `document_type: string`\n  Filter by document type for upload (must be one of the allowed values)\n\n- `file?: string`\n  File to upload (required)\n\n- `url?: string`\n  URL of the file to upload (either `file` or `url` is required)\n\n### Returns\n\n- `{ id?: string; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: { operation?: object[]; }[]; values?: { confidence?: number; name?: string; value?: number[]; }[]; }`\n  Represents a general document with metadata, verification checks, and extracted data.\n\n  - `id?: string`\n  - `checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]`\n  - `created_at?: string`\n  - `document_type?: string`\n  - `name?: string`\n  - `signed_url?: string`\n  - `state?: string`\n  - `status?: string`\n  - `tables?: { operation?: object[]; }[]`\n  - `values?: { confidence?: number; name?: string; value?: number[]; }[]`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nconst genericDocument = await client.individuals.documents.upload('individual_id', { document_type: 'liasse_fiscale' });\n\nconsole.log(genericDocument);\n```",
    perLanguage: {
      typescript: {
        method: 'client.individuals.documents.upload',
        example:
          "import fs from 'fs';\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst genericDocument = await client.individuals.documents.upload('individual_id', {\n  document_type: 'liasse_fiscale',\n});\n\nconsole.log(genericDocument.id);",
      },
      python: {
        method: 'individuals.documents.upload',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\ngeneric_document = client.individuals.documents.upload(\n    individual_id="individual_id",\n    document_type="liasse_fiscale",\n)\nprint(generic_document.id)',
      },
      java: {
        method: 'individuals().documents().upload',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.individuals.documents.DocumentUploadParams;\nimport com.dataleon.api.models.individuals.documents.GenericDocument;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        DocumentUploadParams params = DocumentUploadParams.builder()\n            .individualId("individual_id")\n            .documentType(DocumentUploadParams.DocumentType.LIASSE_FISCALE)\n            .build();\n        GenericDocument genericDocument = client.individuals().documents().upload(params);\n    }\n}',
      },
      go: {
        method: 'client.Individuals.Documents.Upload',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tgenericDocument, err := client.Individuals.Documents.Upload(\n\t\tcontext.TODO(),\n\t\t"individual_id",\n\t\tdataleon.IndividualDocumentUploadParams{\n\t\t\tDocumentType: dataleon.IndividualDocumentUploadParamsDocumentTypeLiasseFiscale,\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", genericDocument.ID)\n}\n',
      },
      ruby: {
        method: 'individuals.documents.upload',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\ngeneric_document = dataleon.individuals.documents.upload("individual_id", document_type: :liasse_fiscale)\n\nputs(generic_document)',
      },
      php: {
        method: 'individuals->documents->upload',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$genericDocument = $client->individuals->documents->upload(\n  'individual_id',\n  documentType: 'liasse_fiscale',\n  file: FileParam::fromString('Example data', filename: uniqid('file-upload-', true)),\n  url: 'https://example.com/sample.pdf',\n);\n\nvar_dump($genericDocument);",
      },
      csharp: {
        method: 'Individuals.Documents.Upload',
        example:
          'DocumentUploadParams parameters = new()\n{\n    IndividualID = "individual_id",\n    DocumentType = DocumentType.LiasseFiscale,\n};\n\nvar genericDocument = await client.Individuals.Documents.Upload(parameters);\n\nConsole.WriteLine(genericDocument);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/individuals/$INDIVIDUAL_ID/documents \\\n    -H \'Content-Type: multipart/form-data\' \\\n    -H "Api-Key: $DATALEON_API_KEY" \\\n    -F document_type=liasse_fiscale \\\n    -F url=https://example.com/sample.pdf',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/companies',
    httpMethod: 'post',
    summary: 'Create a new company',
    description: 'Create a new company',
    stainlessPath: '(resource) companies > (method) create',
    qualified: 'client.companies.create',
    params: [
      'company: { name: string; address?: string; commercial_name?: string; country?: string; email?: string; employer_identification_number?: string; legal_form?: string; phone_number?: string; registration_date?: string; registration_id?: string; share_capital?: string; status?: string; tax_identification_number?: string; type?: string; website_url?: string; };',
      'workspace_id: string;',
      'source_id?: string;',
      "technical_data?: { active_aml_suspicions?: boolean; callback_url?: string; callback_url_notification?: string; filtering_score_aml_suspicions?: number; language?: string; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; raw_data?: boolean; };",
    ],
    response:
      '{ aml_suspicions?: object[]; certificat?: object; checks?: check[]; company?: object; documents?: generic_document[]; members?: object[]; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; technical_data?: object; webview_url?: string; }',
    markdown:
      "## create\n\n`client.companies.create(company: { name: string; address?: string; commercial_name?: string; country?: string; email?: string; employer_identification_number?: string; legal_form?: string; phone_number?: string; registration_date?: string; registration_id?: string; share_capital?: string; status?: string; tax_identification_number?: string; type?: string; website_url?: string; }, workspace_id: string, source_id?: string, technical_data?: { active_aml_suspicions?: boolean; callback_url?: string; callback_url_notification?: string; filtering_score_aml_suspicions?: number; language?: string; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; raw_data?: boolean; }): { aml_suspicions?: object[]; certificat?: object; checks?: check[]; company?: object; documents?: generic_document[]; members?: object[]; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; technical_data?: object; webview_url?: string; }`\n\n**post** `/companies`\n\nCreate a new company\n\n### Parameters\n\n- `company: { name: string; address?: string; commercial_name?: string; country?: string; email?: string; employer_identification_number?: string; legal_form?: string; phone_number?: string; registration_date?: string; registration_id?: string; share_capital?: string; status?: string; tax_identification_number?: string; type?: string; website_url?: string; }`\n  Main information about the company being registered.\n  - `name: string`\n    Legal name of the company.\n  - `address?: string`\n    Registered address of the company.\n  - `commercial_name?: string`\n    Commercial or trade name of the company, if different from the legal name.\n  - `country?: string`\n    ISO 3166-1 alpha-2 country code of company registration (e.g., \"FR\" for France).\n  - `email?: string`\n    Contact email address for the company.\n  - `employer_identification_number?: string`\n    Employer Identification Number (EIN) or equivalent.\n  - `legal_form?: string`\n    Legal structure of the company (e.g., SARL, SAS).\n  - `phone_number?: string`\n    Contact phone number for the company.\n  - `registration_date?: string`\n    Date of official company registration in YYYY-MM-DD format.\n  - `registration_id?: string`\n    Official company registration identifier.\n  - `share_capital?: string`\n    Declared share capital of the company, usually in euros.\n  - `status?: string`\n    Current status of the company (e.g., active, inactive).\n  - `tax_identification_number?: string`\n    National tax identifier (e.g., VAT or TIN).\n  - `type?: string`\n    Type of company, such as \"main\" or \"affiliated\".\n  - `website_url?: string`\n    Company’s official website URL.\n\n- `workspace_id: string`\n  Unique identifier of the workspace in which the company is being created.\n\n- `source_id?: string`\n  Optional identifier to track the origin of the request or integration from your system.\n\n- `technical_data?: { active_aml_suspicions?: boolean; callback_url?: string; callback_url_notification?: string; filtering_score_aml_suspicions?: number; language?: string; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; raw_data?: boolean; }`\n  Technical metadata and callback configuration.\n  - `active_aml_suspicions?: boolean`\n    Flag indicating whether there are active research AML (Anti-Money Laundering) suspicions for the company when you apply for a new entry or get an existing one.\n  - `callback_url?: string`\n    URL to receive a callback once the company is processed.\n  - `callback_url_notification?: string`\n    URL to receive notifications about the processing state and status.\n  - `filtering_score_aml_suspicions?: number`\n    Minimum filtering score (between 0 and 1) for AML suspicions to be considered.\n  - `language?: string`\n    Preferred language for responses or notifications (e.g., \"eng\", \"fra\").\n  - `portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]`\n    List of steps to include in the portal workflow.\n  - `raw_data?: boolean`\n    Flag indicating whether to include raw data in the response.\n\n### Returns\n\n- `{ aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]; certificat?: { id?: string; created_at?: string; filename?: string; }; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; company?: { address?: string; closure_date?: string; commercial_name?: string; contact?: { department?: string; email?: string; first_name?: string; last_name?: string; phone_number?: string; }; country?: string; email?: string; employees?: number; employer_identification_number?: string; insolvency_exists?: boolean; insolvency_ongoing?: boolean; legal_form?: string; name?: string; phone_number?: string; registration_date?: string; registration_id?: string; share_capital?: string; status?: string; tax_identification_number?: string; type?: string; website_url?: string; }; documents?: { id?: string; checks?: check[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: object[]; values?: object[]; }[]; members?: { id?: string; address?: string; birthday?: string; birthplace?: string; country?: string; documents?: object[]; email?: string; first_name?: string; is_beneficial_owner?: boolean; is_delegator?: boolean; last_name?: string; liveness_verification?: boolean; name?: string; ownership_percentage?: number; phone_number?: string; postal_code?: string; registration_id?: string; relation?: string; roles?: string; source?: 'gouve' | 'user' | 'company'; state?: string; status?: string; type?: 'person' | 'company'; workspace_id?: string; }[]; portal_url?: string; properties?: { name?: string; type?: string; value?: string; }[]; risk?: { code?: string; reason?: string; score?: number; }; source_id?: string; technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }; webview_url?: string; }`\n\n  - `aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]`\n  - `certificat?: { id?: string; created_at?: string; filename?: string; }`\n  - `checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]`\n  - `company?: { address?: string; closure_date?: string; commercial_name?: string; contact?: { department?: string; email?: string; first_name?: string; last_name?: string; phone_number?: string; }; country?: string; email?: string; employees?: number; employer_identification_number?: string; insolvency_exists?: boolean; insolvency_ongoing?: boolean; legal_form?: string; name?: string; phone_number?: string; registration_date?: string; registration_id?: string; share_capital?: string; status?: string; tax_identification_number?: string; type?: string; website_url?: string; }`\n  - `documents?: { id?: string; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: { operation?: object[]; }[]; values?: { confidence?: number; name?: string; value?: number[]; }[]; }[]`\n  - `members?: { id?: string; address?: string; birthday?: string; birthplace?: string; country?: string; documents?: { id?: string; checks?: object[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: { operation?: object[]; }[]; values?: { confidence?: number; name?: string; value?: number[]; }[]; }[]; email?: string; first_name?: string; is_beneficial_owner?: boolean; is_delegator?: boolean; last_name?: string; liveness_verification?: boolean; name?: string; ownership_percentage?: number; phone_number?: string; postal_code?: string; registration_id?: string; relation?: string; roles?: string; source?: 'gouve' | 'user' | 'company'; state?: string; status?: string; type?: 'person' | 'company'; workspace_id?: string; }[]`\n  - `portal_url?: string`\n  - `properties?: { name?: string; type?: string; value?: string; }[]`\n  - `risk?: { code?: string; reason?: string; score?: number; }`\n  - `source_id?: string`\n  - `technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }`\n  - `webview_url?: string`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nconst companyRegistration = await client.companies.create({\n  company: { name: 'ACME Corp' },\n  workspace_id: 'wk_123',\n});\n\nconsole.log(companyRegistration);\n```",
    perLanguage: {
      typescript: {
        method: 'client.companies.create',
        example:
          "import Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst companyRegistration = await client.companies.create({\n  company: { name: 'ACME Corp' },\n  workspace_id: 'wk_123',\n});\n\nconsole.log(companyRegistration.source_id);",
      },
      python: {
        method: 'companies.create',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\ncompany_registration = client.companies.create(\n    company={\n        "name": "ACME Corp"\n    },\n    workspace_id="wk_123",\n)\nprint(company_registration.source_id)',
      },
      java: {
        method: 'companies().create',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.companies.CompanyCreateParams;\nimport com.dataleon.api.models.companies.CompanyRegistration;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        CompanyCreateParams params = CompanyCreateParams.builder()\n            .company(CompanyCreateParams.Company.builder()\n                .name("ACME Corp")\n                .build())\n            .workspaceId("wk_123")\n            .build();\n        CompanyRegistration companyRegistration = client.companies().create(params);\n    }\n}',
      },
      go: {
        method: 'client.Companies.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcompanyRegistration, err := client.Companies.New(context.TODO(), dataleon.CompanyNewParams{\n\t\tCompany: dataleon.CompanyNewParamsCompany{\n\t\t\tName: "ACME Corp",\n\t\t},\n\t\tWorkspaceID: "wk_123",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", companyRegistration.SourceID)\n}\n',
      },
      ruby: {
        method: 'companies.create',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\ncompany_registration = dataleon.companies.create(company: {name: "ACME Corp"}, workspace_id: "wk_123")\n\nputs(company_registration)',
      },
      php: {
        method: 'companies->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$companyRegistration = $client->companies->create(\n  company: [\n    'name' => 'ACME Corp',\n    'address' => '123 rue Exemple, Paris',\n    'commercialName' => 'ACME',\n    'country' => 'FR',\n    'email' => 'info@acme.fr',\n    'employerIdentificationNumber' => 'EIN123456',\n    'legalForm' => 'SARL',\n    'phoneNumber' => '+33 1 23 45 67 89',\n    'registrationDate' => '2010-05-15',\n    'registrationID' => 'RCS123456',\n    'shareCapital' => '100000',\n    'status' => 'active',\n    'taxIdentificationNumber' => 'FR123456789',\n    'type' => 'main',\n    'websiteURL' => 'https://acme.fr',\n  ],\n  workspaceID: 'wk_123',\n  sourceID: 'ID54410069066',\n  technicalData: [\n    'activeAmlSuspicions' => false,\n    'callbackURL' => 'https://example.com/callback',\n    'callbackURLNotification' => 'https://example.com/notify',\n    'filteringScoreAmlSuspicions' => 0.75,\n    'language' => 'fra',\n    'portalSteps' => ['identity_verification', 'document_signing'],\n    'rawData' => true,\n  ],\n);\n\nvar_dump($companyRegistration);",
      },
      csharp: {
        method: 'Companies.Create',
        example:
          'CompanyCreateParams parameters = new()\n{\n    Company = new()\n    {\n        Name = "ACME Corp",\n        Address = "123 rue Exemple, Paris",\n        CommercialName = "ACME",\n        Country = "FR",\n        Email = "info@acme.fr",\n        EmployerIdentificationNumber = "EIN123456",\n        LegalForm = "SARL",\n        PhoneNumber = "+33 1 23 45 67 89",\n        RegistrationDate = "2010-05-15",\n        RegistrationID = "RCS123456",\n        ShareCapital = "100000",\n        Status = "active",\n        TaxIdentificationNumber = "FR123456789",\n        Type = "main",\n        WebsiteUrl = "https://acme.fr",\n    },\n    WorkspaceID = "wk_123",\n};\n\nvar companyRegistration = await client.Companies.Create(parameters);\n\nConsole.WriteLine(companyRegistration);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/companies \\\n    -H \'Content-Type: application/json\' \\\n    -H "Api-Key: $DATALEON_API_KEY" \\\n    -d \'{\n          "company": {\n            "name": "ACME Corp"\n          },\n          "workspace_id": "wk_123",\n          "source_id": "ID54410069066"\n        }\'',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/companies',
    httpMethod: 'get',
    summary: 'Get all companies',
    description: 'Get all companies',
    stainlessPath: '(resource) companies > (method) list',
    qualified: 'client.companies.list',
    params: [
      'end_date?: string;',
      'limit?: number;',
      'offset?: number;',
      'source_id?: string;',
      'start_date?: string;',
      'state?: string;',
      "status?: 'rejected' | 'need_review' | 'approved';",
      'workspace_id?: string;',
    ],
    response:
      '{ aml_suspicions?: object[]; certificat?: object; checks?: check[]; company?: object; documents?: generic_document[]; members?: object[]; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; technical_data?: object; webview_url?: string; }[]',
    markdown:
      "## list\n\n`client.companies.list(end_date?: string, limit?: number, offset?: number, source_id?: string, start_date?: string, state?: string, status?: 'rejected' | 'need_review' | 'approved', workspace_id?: string): object[]`\n\n**get** `/companies`\n\nGet all companies\n\n### Parameters\n\n- `end_date?: string`\n  Filter companies created before this date (format YYYY-MM-DD)\n\n- `limit?: number`\n  Number of results to return (between 1 and 100)\n\n- `offset?: number`\n  Number of results to skip (must be ≥ 0)\n\n- `source_id?: string`\n  Filter by source ID\n\n- `start_date?: string`\n  Filter companies created after this date (format YYYY-MM-DD)\n\n- `state?: string`\n  Filter by company state (must be one of the allowed values)\n\n- `status?: 'rejected' | 'need_review' | 'approved'`\n  Filter by individual status (must be one of the allowed values)\n\n- `workspace_id?: string`\n  Filter by workspace ID\n\n### Returns\n\n- `{ aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]; certificat?: { id?: string; created_at?: string; filename?: string; }; checks?: object[]; company?: { address?: string; closure_date?: string; commercial_name?: string; contact?: object; country?: string; email?: string; employees?: number; employer_identification_number?: string; insolvency_exists?: boolean; insolvency_ongoing?: boolean; legal_form?: string; name?: string; phone_number?: string; registration_date?: string; registration_id?: string; share_capital?: string; status?: string; tax_identification_number?: string; type?: string; website_url?: string; }; documents?: object[]; members?: { id?: string; address?: string; birthday?: string; birthplace?: string; country?: string; documents?: generic_document[]; email?: string; first_name?: string; is_beneficial_owner?: boolean; is_delegator?: boolean; last_name?: string; liveness_verification?: boolean; name?: string; ownership_percentage?: number; phone_number?: string; postal_code?: string; registration_id?: string; relation?: string; roles?: string; source?: 'gouve' | 'user' | 'company'; state?: string; status?: string; type?: 'person' | 'company'; workspace_id?: string; }[]; portal_url?: string; properties?: { name?: string; type?: string; value?: string; }[]; risk?: { code?: string; reason?: string; score?: number; }; source_id?: string; technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }; webview_url?: string; }[]`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nconst companyRegistrations = await client.companies.list();\n\nconsole.log(companyRegistrations);\n```",
    perLanguage: {
      typescript: {
        method: 'client.companies.list',
        example:
          "import Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst companyRegistrations = await client.companies.list();\n\nconsole.log(companyRegistrations);",
      },
      python: {
        method: 'companies.list',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\ncompany_registrations = client.companies.list()\nprint(company_registrations)',
      },
      java: {
        method: 'companies().list',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.companies.CompanyListParams;\nimport com.dataleon.api.models.companies.CompanyRegistration;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        List<CompanyRegistration> companyRegistrations = client.companies().list();\n    }\n}',
      },
      go: {
        method: 'client.Companies.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcompanyRegistrations, err := client.Companies.List(context.TODO(), dataleon.CompanyListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", companyRegistrations)\n}\n',
      },
      ruby: {
        method: 'companies.list',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\ncompany_registrations = dataleon.companies.list\n\nputs(company_registrations)',
      },
      php: {
        method: 'companies->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$companyRegistrations = $client->companies->list(\n  endDate: '2019-12-27',\n  limit: 1,\n  offset: 0,\n  sourceID: 'source_id',\n  startDate: '2019-12-27',\n  state: 'VOID',\n  status: 'rejected',\n  workspaceID: 'workspace_id',\n);\n\nvar_dump($companyRegistrations);",
      },
      csharp: {
        method: 'Companies.List',
        example:
          'CompanyListParams parameters = new();\n\nvar companyRegistrations = await client.Companies.List(parameters);\n\nConsole.WriteLine(companyRegistrations);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/companies \\\n    -H "Api-Key: $DATALEON_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/companies/{company_id}',
    httpMethod: 'get',
    summary: 'Get a company by ID',
    description: 'Get a company by ID',
    stainlessPath: '(resource) companies > (method) retrieve',
    qualified: 'client.companies.retrieve',
    params: ['company_id: string;', 'document?: boolean;', 'scope?: string;'],
    response:
      '{ aml_suspicions?: object[]; certificat?: object; checks?: check[]; company?: object; documents?: generic_document[]; members?: object[]; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; technical_data?: object; webview_url?: string; }',
    markdown:
      "## retrieve\n\n`client.companies.retrieve(company_id: string, document?: boolean, scope?: string): { aml_suspicions?: object[]; certificat?: object; checks?: check[]; company?: object; documents?: generic_document[]; members?: object[]; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; technical_data?: object; webview_url?: string; }`\n\n**get** `/companies/{company_id}`\n\nGet a company by ID\n\n### Parameters\n\n- `company_id: string`\n\n- `document?: boolean`\n  Include document signed url\n\n- `scope?: string`\n  Scope filter (id or scope)\n\n### Returns\n\n- `{ aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]; certificat?: { id?: string; created_at?: string; filename?: string; }; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; company?: { address?: string; closure_date?: string; commercial_name?: string; contact?: { department?: string; email?: string; first_name?: string; last_name?: string; phone_number?: string; }; country?: string; email?: string; employees?: number; employer_identification_number?: string; insolvency_exists?: boolean; insolvency_ongoing?: boolean; legal_form?: string; name?: string; phone_number?: string; registration_date?: string; registration_id?: string; share_capital?: string; status?: string; tax_identification_number?: string; type?: string; website_url?: string; }; documents?: { id?: string; checks?: check[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: object[]; values?: object[]; }[]; members?: { id?: string; address?: string; birthday?: string; birthplace?: string; country?: string; documents?: object[]; email?: string; first_name?: string; is_beneficial_owner?: boolean; is_delegator?: boolean; last_name?: string; liveness_verification?: boolean; name?: string; ownership_percentage?: number; phone_number?: string; postal_code?: string; registration_id?: string; relation?: string; roles?: string; source?: 'gouve' | 'user' | 'company'; state?: string; status?: string; type?: 'person' | 'company'; workspace_id?: string; }[]; portal_url?: string; properties?: { name?: string; type?: string; value?: string; }[]; risk?: { code?: string; reason?: string; score?: number; }; source_id?: string; technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }; webview_url?: string; }`\n\n  - `aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]`\n  - `certificat?: { id?: string; created_at?: string; filename?: string; }`\n  - `checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]`\n  - `company?: { address?: string; closure_date?: string; commercial_name?: string; contact?: { department?: string; email?: string; first_name?: string; last_name?: string; phone_number?: string; }; country?: string; email?: string; employees?: number; employer_identification_number?: string; insolvency_exists?: boolean; insolvency_ongoing?: boolean; legal_form?: string; name?: string; phone_number?: string; registration_date?: string; registration_id?: string; share_capital?: string; status?: string; tax_identification_number?: string; type?: string; website_url?: string; }`\n  - `documents?: { id?: string; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: { operation?: object[]; }[]; values?: { confidence?: number; name?: string; value?: number[]; }[]; }[]`\n  - `members?: { id?: string; address?: string; birthday?: string; birthplace?: string; country?: string; documents?: { id?: string; checks?: object[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: { operation?: object[]; }[]; values?: { confidence?: number; name?: string; value?: number[]; }[]; }[]; email?: string; first_name?: string; is_beneficial_owner?: boolean; is_delegator?: boolean; last_name?: string; liveness_verification?: boolean; name?: string; ownership_percentage?: number; phone_number?: string; postal_code?: string; registration_id?: string; relation?: string; roles?: string; source?: 'gouve' | 'user' | 'company'; state?: string; status?: string; type?: 'person' | 'company'; workspace_id?: string; }[]`\n  - `portal_url?: string`\n  - `properties?: { name?: string; type?: string; value?: string; }[]`\n  - `risk?: { code?: string; reason?: string; score?: number; }`\n  - `source_id?: string`\n  - `technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }`\n  - `webview_url?: string`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nconst companyRegistration = await client.companies.retrieve('company_id');\n\nconsole.log(companyRegistration);\n```",
    perLanguage: {
      typescript: {
        method: 'client.companies.retrieve',
        example:
          "import Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst companyRegistration = await client.companies.retrieve('company_id');\n\nconsole.log(companyRegistration.source_id);",
      },
      python: {
        method: 'companies.retrieve',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\ncompany_registration = client.companies.retrieve(\n    company_id="company_id",\n)\nprint(company_registration.source_id)',
      },
      java: {
        method: 'companies().retrieve',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.companies.CompanyRegistration;\nimport com.dataleon.api.models.companies.CompanyRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        CompanyRegistration companyRegistration = client.companies().retrieve("company_id");\n    }\n}',
      },
      go: {
        method: 'client.Companies.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcompanyRegistration, err := client.Companies.Get(\n\t\tcontext.TODO(),\n\t\t"company_id",\n\t\tdataleon.CompanyGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", companyRegistration.SourceID)\n}\n',
      },
      ruby: {
        method: 'companies.retrieve',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\ncompany_registration = dataleon.companies.retrieve("company_id")\n\nputs(company_registration)',
      },
      php: {
        method: 'companies->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$companyRegistration = $client->companies->retrieve(\n  'company_id', document: true, scope: 'scope'\n);\n\nvar_dump($companyRegistration);",
      },
      csharp: {
        method: 'Companies.Retrieve',
        example:
          'CompanyRetrieveParams parameters = new() { CompanyID = "company_id" };\n\nvar companyRegistration = await client.Companies.Retrieve(parameters);\n\nConsole.WriteLine(companyRegistration);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/companies/$COMPANY_ID \\\n    -H "Api-Key: $DATALEON_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/companies/{company_id}',
    httpMethod: 'put',
    summary: 'Update a company by ID',
    description: 'Update a company by ID',
    stainlessPath: '(resource) companies > (method) update',
    qualified: 'client.companies.update',
    params: [
      'company_id: string;',
      'company: { name: string; address?: string; commercial_name?: string; country?: string; email?: string; employer_identification_number?: string; legal_form?: string; phone_number?: string; registration_date?: string; registration_id?: string; share_capital?: string; status?: string; tax_identification_number?: string; type?: string; website_url?: string; };',
      'workspace_id: string;',
      'source_id?: string;',
      "technical_data?: { active_aml_suspicions?: boolean; callback_url?: string; callback_url_notification?: string; filtering_score_aml_suspicions?: number; language?: string; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; raw_data?: boolean; };",
    ],
    response:
      '{ aml_suspicions?: object[]; certificat?: object; checks?: check[]; company?: object; documents?: generic_document[]; members?: object[]; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; technical_data?: object; webview_url?: string; }',
    markdown:
      "## update\n\n`client.companies.update(company_id: string, company: { name: string; address?: string; commercial_name?: string; country?: string; email?: string; employer_identification_number?: string; legal_form?: string; phone_number?: string; registration_date?: string; registration_id?: string; share_capital?: string; status?: string; tax_identification_number?: string; type?: string; website_url?: string; }, workspace_id: string, source_id?: string, technical_data?: { active_aml_suspicions?: boolean; callback_url?: string; callback_url_notification?: string; filtering_score_aml_suspicions?: number; language?: string; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; raw_data?: boolean; }): { aml_suspicions?: object[]; certificat?: object; checks?: check[]; company?: object; documents?: generic_document[]; members?: object[]; portal_url?: string; properties?: object[]; risk?: object; source_id?: string; technical_data?: object; webview_url?: string; }`\n\n**put** `/companies/{company_id}`\n\nUpdate a company by ID\n\n### Parameters\n\n- `company_id: string`\n\n- `company: { name: string; address?: string; commercial_name?: string; country?: string; email?: string; employer_identification_number?: string; legal_form?: string; phone_number?: string; registration_date?: string; registration_id?: string; share_capital?: string; status?: string; tax_identification_number?: string; type?: string; website_url?: string; }`\n  Main information about the company being registered.\n  - `name: string`\n    Legal name of the company.\n  - `address?: string`\n    Registered address of the company.\n  - `commercial_name?: string`\n    Commercial or trade name of the company, if different from the legal name.\n  - `country?: string`\n    ISO 3166-1 alpha-2 country code of company registration (e.g., \"FR\" for France).\n  - `email?: string`\n    Contact email address for the company.\n  - `employer_identification_number?: string`\n    Employer Identification Number (EIN) or equivalent.\n  - `legal_form?: string`\n    Legal structure of the company (e.g., SARL, SAS).\n  - `phone_number?: string`\n    Contact phone number for the company.\n  - `registration_date?: string`\n    Date of official company registration in YYYY-MM-DD format.\n  - `registration_id?: string`\n    Official company registration identifier.\n  - `share_capital?: string`\n    Declared share capital of the company, usually in euros.\n  - `status?: string`\n    Current status of the company (e.g., active, inactive).\n  - `tax_identification_number?: string`\n    National tax identifier (e.g., VAT or TIN).\n  - `type?: string`\n    Type of company, such as \"main\" or \"affiliated\".\n  - `website_url?: string`\n    Company’s official website URL.\n\n- `workspace_id: string`\n  Unique identifier of the workspace in which the company is being created.\n\n- `source_id?: string`\n  Optional identifier to track the origin of the request or integration from your system.\n\n- `technical_data?: { active_aml_suspicions?: boolean; callback_url?: string; callback_url_notification?: string; filtering_score_aml_suspicions?: number; language?: string; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; raw_data?: boolean; }`\n  Technical metadata and callback configuration.\n  - `active_aml_suspicions?: boolean`\n    Flag indicating whether there are active research AML (Anti-Money Laundering) suspicions for the company when you apply for a new entry or get an existing one.\n  - `callback_url?: string`\n    URL to receive a callback once the company is processed.\n  - `callback_url_notification?: string`\n    URL to receive notifications about the processing state and status.\n  - `filtering_score_aml_suspicions?: number`\n    Minimum filtering score (between 0 and 1) for AML suspicions to be considered.\n  - `language?: string`\n    Preferred language for responses or notifications (e.g., \"eng\", \"fra\").\n  - `portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]`\n    List of steps to include in the portal workflow.\n  - `raw_data?: boolean`\n    Flag indicating whether to include raw data in the response.\n\n### Returns\n\n- `{ aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]; certificat?: { id?: string; created_at?: string; filename?: string; }; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; company?: { address?: string; closure_date?: string; commercial_name?: string; contact?: { department?: string; email?: string; first_name?: string; last_name?: string; phone_number?: string; }; country?: string; email?: string; employees?: number; employer_identification_number?: string; insolvency_exists?: boolean; insolvency_ongoing?: boolean; legal_form?: string; name?: string; phone_number?: string; registration_date?: string; registration_id?: string; share_capital?: string; status?: string; tax_identification_number?: string; type?: string; website_url?: string; }; documents?: { id?: string; checks?: check[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: object[]; values?: object[]; }[]; members?: { id?: string; address?: string; birthday?: string; birthplace?: string; country?: string; documents?: object[]; email?: string; first_name?: string; is_beneficial_owner?: boolean; is_delegator?: boolean; last_name?: string; liveness_verification?: boolean; name?: string; ownership_percentage?: number; phone_number?: string; postal_code?: string; registration_id?: string; relation?: string; roles?: string; source?: 'gouve' | 'user' | 'company'; state?: string; status?: string; type?: 'person' | 'company'; workspace_id?: string; }[]; portal_url?: string; properties?: { name?: string; type?: string; value?: string; }[]; risk?: { code?: string; reason?: string; score?: number; }; source_id?: string; technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }; webview_url?: string; }`\n\n  - `aml_suspicions?: { caption?: string; country?: string; gender?: string; relation?: string; schema?: string; score?: number; source?: string; status?: 'true_positive' | 'false_positive' | 'pending'; type?: 'crime' | 'sanction' | 'pep' | 'adverse_news' | 'other'; }[]`\n  - `certificat?: { id?: string; created_at?: string; filename?: string; }`\n  - `checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]`\n  - `company?: { address?: string; closure_date?: string; commercial_name?: string; contact?: { department?: string; email?: string; first_name?: string; last_name?: string; phone_number?: string; }; country?: string; email?: string; employees?: number; employer_identification_number?: string; insolvency_exists?: boolean; insolvency_ongoing?: boolean; legal_form?: string; name?: string; phone_number?: string; registration_date?: string; registration_id?: string; share_capital?: string; status?: string; tax_identification_number?: string; type?: string; website_url?: string; }`\n  - `documents?: { id?: string; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: { operation?: object[]; }[]; values?: { confidence?: number; name?: string; value?: number[]; }[]; }[]`\n  - `members?: { id?: string; address?: string; birthday?: string; birthplace?: string; country?: string; documents?: { id?: string; checks?: object[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: { operation?: object[]; }[]; values?: { confidence?: number; name?: string; value?: number[]; }[]; }[]; email?: string; first_name?: string; is_beneficial_owner?: boolean; is_delegator?: boolean; last_name?: string; liveness_verification?: boolean; name?: string; ownership_percentage?: number; phone_number?: string; postal_code?: string; registration_id?: string; relation?: string; roles?: string; source?: 'gouve' | 'user' | 'company'; state?: string; status?: string; type?: 'person' | 'company'; workspace_id?: string; }[]`\n  - `portal_url?: string`\n  - `properties?: { name?: string; type?: string; value?: string; }[]`\n  - `risk?: { code?: string; reason?: string; score?: number; }`\n  - `source_id?: string`\n  - `technical_data?: { active_aml_suspicions?: boolean; api_version?: number; approved_at?: string; approved_by?: string; callback_url?: string; callback_url_notification?: string; disable_notification?: boolean; disable_notification_date?: string; export_type?: string; filtering_score_aml_suspicions?: number; finished_at?: string; ip?: string; language?: string; location_ip?: string; need_review_at?: string; need_review_by?: string; notification_confirmation?: boolean; portal_steps?: 'identity_verification' | 'document_signing' | 'proof_of_address' | 'selfie' | 'face_match'[]; qr_code?: string; raw_data?: boolean; rejected_at?: string; rejected_by?: string; session_duration?: number; started_at?: string; transfer_at?: string; transfer_mode?: string; }`\n  - `webview_url?: string`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nconst companyRegistration = await client.companies.update('company_id', {\n  company: { name: 'ACME Corp' },\n  workspace_id: 'wk_123',\n});\n\nconsole.log(companyRegistration);\n```",
    perLanguage: {
      typescript: {
        method: 'client.companies.update',
        example:
          "import Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst companyRegistration = await client.companies.update('company_id', {\n  company: { name: 'ACME Corp' },\n  workspace_id: 'wk_123',\n});\n\nconsole.log(companyRegistration.source_id);",
      },
      python: {
        method: 'companies.update',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\ncompany_registration = client.companies.update(\n    company_id="company_id",\n    company={\n        "name": "ACME Corp"\n    },\n    workspace_id="wk_123",\n)\nprint(company_registration.source_id)',
      },
      java: {
        method: 'companies().update',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.companies.CompanyRegistration;\nimport com.dataleon.api.models.companies.CompanyUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        CompanyUpdateParams params = CompanyUpdateParams.builder()\n            .companyId("company_id")\n            .company(CompanyUpdateParams.Company.builder()\n                .name("ACME Corp")\n                .build())\n            .workspaceId("wk_123")\n            .build();\n        CompanyRegistration companyRegistration = client.companies().update(params);\n    }\n}',
      },
      go: {
        method: 'client.Companies.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcompanyRegistration, err := client.Companies.Update(\n\t\tcontext.TODO(),\n\t\t"company_id",\n\t\tdataleon.CompanyUpdateParams{\n\t\t\tCompany: dataleon.CompanyUpdateParamsCompany{\n\t\t\t\tName: "ACME Corp",\n\t\t\t},\n\t\t\tWorkspaceID: "wk_123",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", companyRegistration.SourceID)\n}\n',
      },
      ruby: {
        method: 'companies.update',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\ncompany_registration = dataleon.companies.update("company_id", company: {name: "ACME Corp"}, workspace_id: "wk_123")\n\nputs(company_registration)',
      },
      php: {
        method: 'companies->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$companyRegistration = $client->companies->update(\n  'company_id',\n  company: [\n    'name' => 'ACME Corp',\n    'address' => '123 rue Exemple, Paris',\n    'commercialName' => 'ACME',\n    'country' => 'FR',\n    'email' => 'info@acme.fr',\n    'employerIdentificationNumber' => 'EIN123456',\n    'legalForm' => 'SARL',\n    'phoneNumber' => '+33 1 23 45 67 89',\n    'registrationDate' => '2010-05-15',\n    'registrationID' => 'RCS123456',\n    'shareCapital' => '100000',\n    'status' => 'active',\n    'taxIdentificationNumber' => 'FR123456789',\n    'type' => 'main',\n    'websiteURL' => 'https://acme.fr',\n  ],\n  workspaceID: 'wk_123',\n  sourceID: 'ID54410069066',\n  technicalData: [\n    'activeAmlSuspicions' => false,\n    'callbackURL' => 'https://example.com/callback',\n    'callbackURLNotification' => 'https://example.com/notify',\n    'filteringScoreAmlSuspicions' => 0.75,\n    'language' => 'fra',\n    'portalSteps' => ['identity_verification', 'document_signing'],\n    'rawData' => true,\n  ],\n);\n\nvar_dump($companyRegistration);",
      },
      csharp: {
        method: 'Companies.Update',
        example:
          'CompanyUpdateParams parameters = new()\n{\n    CompanyID = "company_id",\n    Company = new()\n    {\n        Name = "ACME Corp",\n        Address = "123 rue Exemple, Paris",\n        CommercialName = "ACME",\n        Country = "FR",\n        Email = "info@acme.fr",\n        EmployerIdentificationNumber = "EIN123456",\n        LegalForm = "SARL",\n        PhoneNumber = "+33 1 23 45 67 89",\n        RegistrationDate = "2010-05-15",\n        RegistrationID = "RCS123456",\n        ShareCapital = "100000",\n        Status = "active",\n        TaxIdentificationNumber = "FR123456789",\n        Type = "main",\n        WebsiteUrl = "https://acme.fr",\n    },\n    WorkspaceID = "wk_123",\n};\n\nvar companyRegistration = await client.Companies.Update(parameters);\n\nConsole.WriteLine(companyRegistration);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/companies/$COMPANY_ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Api-Key: $DATALEON_API_KEY" \\\n    -d \'{\n          "company": {\n            "name": "ACME Corp"\n          },\n          "workspace_id": "wk_123",\n          "source_id": "ID54410069066"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/companies/{company_id}',
    httpMethod: 'delete',
    summary: 'Delete a company by ID',
    description: 'Delete a company by ID',
    stainlessPath: '(resource) companies > (method) delete',
    qualified: 'client.companies.delete',
    params: ['company_id: string;'],
    markdown:
      "## delete\n\n`client.companies.delete(company_id: string): void`\n\n**delete** `/companies/{company_id}`\n\nDelete a company by ID\n\n### Parameters\n\n- `company_id: string`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nawait client.companies.delete('company_id')\n```",
    perLanguage: {
      typescript: {
        method: 'client.companies.delete',
        example:
          "import Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.companies.delete('company_id');",
      },
      python: {
        method: 'companies.delete',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\nclient.companies.delete(\n    "company_id",\n)',
      },
      java: {
        method: 'companies().delete',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.companies.CompanyDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        client.companies().delete("company_id");\n    }\n}',
      },
      go: {
        method: 'client.Companies.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Companies.Delete(context.TODO(), "company_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'companies.delete',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\nresult = dataleon.companies.delete("company_id")\n\nputs(result)',
      },
      php: {
        method: 'companies->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->companies->delete('company_id');\n\nvar_dump($result);",
      },
      csharp: {
        method: 'Companies.Delete',
        example:
          'CompanyDeleteParams parameters = new() { CompanyID = "company_id" };\n\nawait client.Companies.Delete(parameters);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/companies/$COMPANY_ID \\\n    -X DELETE \\\n    -H "Api-Key: $DATALEON_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/companies/{company_id}/documents',
    httpMethod: 'get',
    summary: 'Get documents to an company',
    description: 'Get documents to an company',
    stainlessPath: '(resource) companies.documents > (method) list',
    qualified: 'client.companies.documents.list',
    params: ['company_id: string;'],
    response:
      '{ documents?: { id?: string; document_type?: string; filename?: string; name?: string; signed_url?: string; state?: string; status?: string; workspace_id?: string; }[]; total_document?: number; }',
    markdown:
      "## list\n\n`client.companies.documents.list(company_id: string): { documents?: object[]; total_document?: number; }`\n\n**get** `/companies/{company_id}/documents`\n\nGet documents to an company\n\n### Parameters\n\n- `company_id: string`\n\n### Returns\n\n- `{ documents?: { id?: string; document_type?: string; filename?: string; name?: string; signed_url?: string; state?: string; status?: string; workspace_id?: string; }[]; total_document?: number; }`\n\n  - `documents?: { id?: string; document_type?: string; filename?: string; name?: string; signed_url?: string; state?: string; status?: string; workspace_id?: string; }[]`\n  - `total_document?: number`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nconst documentResponse = await client.companies.documents.list('company_id');\n\nconsole.log(documentResponse);\n```",
    perLanguage: {
      typescript: {
        method: 'client.companies.documents.list',
        example:
          "import Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst documentResponse = await client.companies.documents.list('company_id');\n\nconsole.log(documentResponse.documents);",
      },
      python: {
        method: 'companies.documents.list',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\ndocument_response = client.companies.documents.list(\n    "company_id",\n)\nprint(document_response.documents)',
      },
      java: {
        method: 'companies().documents().list',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.companies.documents.DocumentListParams;\nimport com.dataleon.api.models.individuals.documents.DocumentResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        DocumentResponse documentResponse = client.companies().documents().list("company_id");\n    }\n}',
      },
      go: {
        method: 'client.Companies.Documents.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdocumentResponse, err := client.Companies.Documents.List(context.TODO(), "company_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", documentResponse.Documents)\n}\n',
      },
      ruby: {
        method: 'companies.documents.list',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\ndocument_response = dataleon.companies.documents.list("company_id")\n\nputs(document_response)',
      },
      php: {
        method: 'companies->documents->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$documentResponse = $client->companies->documents->list('company_id');\n\nvar_dump($documentResponse);",
      },
      csharp: {
        method: 'Companies.Documents.List',
        example:
          'DocumentListParams parameters = new() { CompanyID = "company_id" };\n\nvar documentResponse = await client.Companies.Documents.List(parameters);\n\nConsole.WriteLine(documentResponse);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/companies/$COMPANY_ID/documents \\\n    -H "Api-Key: $DATALEON_API_KEY"',
      },
    },
  },
  {
    name: 'upload',
    endpoint: '/companies/{company_id}/documents',
    httpMethod: 'post',
    summary: 'Upload documents to an company',
    description: 'Upload documents to an company',
    stainlessPath: '(resource) companies.documents > (method) upload',
    qualified: 'client.companies.documents.upload',
    params: ['company_id: string;', 'document_type: string;', 'file?: string;', 'url?: string;'],
    response:
      '{ id?: string; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: { operation?: object[]; }[]; values?: { confidence?: number; name?: string; value?: number[]; }[]; }',
    markdown:
      "## upload\n\n`client.companies.documents.upload(company_id: string, document_type: string, file?: string, url?: string): { id?: string; checks?: check[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: object[]; values?: object[]; }`\n\n**post** `/companies/{company_id}/documents`\n\nUpload documents to an company\n\n### Parameters\n\n- `company_id: string`\n\n- `document_type: string`\n  Filter by document type for upload (must be one of the allowed values)\n\n- `file?: string`\n  File to upload (required)\n\n- `url?: string`\n  URL of the file to upload (either `file` or `url` is required)\n\n### Returns\n\n- `{ id?: string; checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]; created_at?: string; document_type?: string; name?: string; signed_url?: string; state?: string; status?: string; tables?: { operation?: object[]; }[]; values?: { confidence?: number; name?: string; value?: number[]; }[]; }`\n  Represents a general document with metadata, verification checks, and extracted data.\n\n  - `id?: string`\n  - `checks?: { masked?: boolean; message?: string; name?: string; validate?: boolean; weight?: number; }[]`\n  - `created_at?: string`\n  - `document_type?: string`\n  - `name?: string`\n  - `signed_url?: string`\n  - `state?: string`\n  - `status?: string`\n  - `tables?: { operation?: object[]; }[]`\n  - `values?: { confidence?: number; name?: string; value?: number[]; }[]`\n\n### Example\n\n```typescript\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\nconst genericDocument = await client.companies.documents.upload('company_id', { document_type: 'liasse_fiscale' });\n\nconsole.log(genericDocument);\n```",
    perLanguage: {
      typescript: {
        method: 'client.companies.documents.upload',
        example:
          "import fs from 'fs';\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst genericDocument = await client.companies.documents.upload('company_id', {\n  document_type: 'liasse_fiscale',\n});\n\nconsole.log(genericDocument.id);",
      },
      python: {
        method: 'companies.documents.upload',
        example:
          'import os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\ngeneric_document = client.companies.documents.upload(\n    company_id="company_id",\n    document_type="liasse_fiscale",\n)\nprint(generic_document.id)',
      },
      java: {
        method: 'companies().documents().upload',
        example:
          'package com.dataleon.api.example;\n\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.companies.documents.DocumentUploadParams;\nimport com.dataleon.api.models.individuals.documents.GenericDocument;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DataleonClient client = DataleonOkHttpClient.fromEnv();\n\n        DocumentUploadParams params = DocumentUploadParams.builder()\n            .companyId("company_id")\n            .documentType(DocumentUploadParams.DocumentType.LIASSE_FISCALE)\n            .build();\n        GenericDocument genericDocument = client.companies().documents().upload(params);\n    }\n}',
      },
      go: {
        method: 'client.Companies.Documents.Upload',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tgenericDocument, err := client.Companies.Documents.Upload(\n\t\tcontext.TODO(),\n\t\t"company_id",\n\t\tdataleon.CompanyDocumentUploadParams{\n\t\t\tDocumentType: dataleon.CompanyDocumentUploadParamsDocumentTypeLiasseFiscale,\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", genericDocument.ID)\n}\n',
      },
      ruby: {
        method: 'companies.documents.upload',
        example:
          'require "dataleon"\n\ndataleon = Dataleon::Client.new(api_key: "My API Key")\n\ngeneric_document = dataleon.companies.documents.upload("company_id", document_type: :liasse_fiscale)\n\nputs(generic_document)',
      },
      php: {
        method: 'companies->documents->upload',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$genericDocument = $client->companies->documents->upload(\n  'company_id',\n  documentType: 'liasse_fiscale',\n  file: FileParam::fromString('Example data', filename: uniqid('file-upload-', true)),\n  url: 'https://example.com/sample.pdf',\n);\n\nvar_dump($genericDocument);",
      },
      csharp: {
        method: 'Companies.Documents.Upload',
        example:
          'DocumentUploadParams parameters = new()\n{\n    CompanyID = "company_id",\n    DocumentType = DocumentType.LiasseFiscale,\n};\n\nvar genericDocument = await client.Companies.Documents.Upload(parameters);\n\nConsole.WriteLine(genericDocument);',
      },
      http: {
        example:
          'curl https://inference.eu-west-1.dataleon.ai/companies/$COMPANY_ID/documents \\\n    -H \'Content-Type: multipart/form-data\' \\\n    -H "Api-Key: $DATALEON_API_KEY" \\\n    -F document_type=liasse_fiscale \\\n    -F url=https://example.com/sample.pdf',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'csharp',
    content:
      '# Dataleon C# API Library\n\nThe Dataleon C# SDK provides convenient access to the [Dataleon REST API](https://docs.dataleon.ai) from applications written in   C#.\n\n## Installation\n\n```bash\ngit clone git@github.com:dataleonlabs/dataleon-csharp.git\ndotnet add reference dataleon-csharp/src/Dataleon\n```\n\n## Requirements\n\nThis library requires .NET Standard 2.0 or later.\n\n## Usage\n\nSee the [`examples`](examples) directory for complete and runnable examples.\n\n```csharp\nDataleonClient client = new();\n\nIndividualCreateParams parameters = new() { WorkspaceID = "wk_123" };\n\nvar individual = await client.Individuals.Create(parameters);\n\nConsole.WriteLine(individual);\n```',
  },
  {
    language: 'go',
    content:
      '# Dataleon Go API Library\n\n<a href="https://pkg.go.dev/github.com/dataleonlabs/dataleon-go"><img src="https://pkg.go.dev/badge/github.com/dataleonlabs/dataleon-go.svg" alt="Go Reference"></a>\n\nThe Dataleon Go library provides convenient access to the [Dataleon REST API](https://docs.dataleon.ai)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dataleon MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40dataleon%2Fdataleon-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBkYXRhbGVvbi9kYXRhbGVvbi1tY3AiXSwiZW52Ijp7IkRBVEFMRU9OX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40dataleon%2Fdataleon-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40dataleon%2Fdataleon-mcp%22%5D%2C%22env%22%3A%7B%22DATALEON_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/dataleonlabs/dataleon-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/dataleonlabs/dataleon-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dataleonlabs/dataleon-go"\n\t"github.com/dataleonlabs/dataleon-go/option"\n)\n\nfunc main() {\n\tclient := dataleon.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("DATALEON_API_KEY")\n\t)\n\tindividual, err := client.Individuals.New(context.TODO(), dataleon.IndividualNewParams{\n\t\tWorkspaceID: "wk_123",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", individual.ID)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Individuals.New(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/dataleonlabs/dataleon-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Individuals.New(context.TODO(), dataleon.IndividualNewParams{\n\tWorkspaceID: "wk_123",\n})\nif err != nil {\n\tvar apierr *dataleon.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/individuals": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Individuals.New(\n\tctx,\n\tdataleon.IndividualNewParams{\n\t\tWorkspaceID: "wk_123",\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n```go\n// A file from the file system\nfile, err := os.Open("/path/to/file")\ndataleon.IndividualDocumentUploadParams{\n\tDocumentType: dataleon.IndividualDocumentUploadParamsDocumentTypeLiasseFiscale,\n\tFile:         file,\n}\n\n// A file from a string\ndataleon.IndividualDocumentUploadParams{\n\tDocumentType: dataleon.IndividualDocumentUploadParamsDocumentTypeLiasseFiscale,\n\tFile:         strings.NewReader("my file contents"),\n}\n\n// With a custom filename and contentType\ndataleon.IndividualDocumentUploadParams{\n\tDocumentType: dataleon.IndividualDocumentUploadParamsDocumentTypeLiasseFiscale,\n\tFile:         dataleon.File(strings.NewReader(`{"hello": "foo"}`), "file.go", "application/json"),\n}\n```\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := dataleon.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Individuals.New(\n\tcontext.TODO(),\n\tdataleon.IndividualNewParams{\n\t\tWorkspaceID: "wk_123",\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nindividual, err := client.Individuals.New(\n\tcontext.TODO(),\n\tdataleon.IndividualNewParams{\n\t\tWorkspaceID: "wk_123",\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", individual)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dataleonlabs/dataleon-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'java',
    content:
      '# Dataleon Java API Library\n\n<!-- x-release-please-start-version -->\n[![Maven Central](https://img.shields.io/maven-central/v/com.dataleon.api/dataleon-java)](https://central.sonatype.com/artifact/com.dataleon.api/dataleon-java/0.0.1)\n[![javadoc](https://javadoc.io/badge2/com.dataleon.api/dataleon-java/0.0.1/javadoc.svg)](https://javadoc.io/doc/com.dataleon.api/dataleon-java/0.0.1)\n<!-- x-release-please-end -->\n\nThe Dataleon Java SDK provides convenient access to the [Dataleon REST API](https://docs.dataleon.ai)   from applications written in Java.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dataleon MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40dataleon%2Fdataleon-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBkYXRhbGVvbi9kYXRhbGVvbi1tY3AiXSwiZW52Ijp7IkRBVEFMRU9OX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40dataleon%2Fdataleon-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40dataleon%2Fdataleon-mcp%22%5D%2C%22env%22%3A%7B%22DATALEON_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n<!-- x-release-please-start-version -->\n\nThe REST API documentation can be found on [docs.dataleon.ai](https://docs.dataleon.ai). Javadocs are available on [javadoc.io](https://javadoc.io/doc/com.dataleon.api/dataleon-java/0.0.1).\n\n<!-- x-release-please-end -->\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n### Gradle\n\n~~~kotlin\nimplementation("com.dataleon.api:dataleon-java:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>com.dataleon.api</groupId>\n  <artifactId>dataleon-java</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```java\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.individuals.Individual;\nimport com.dataleon.api.models.individuals.IndividualCreateParams;\n\n// Configures using the `dataleon.apiKey` and `dataleon.baseUrl` system properties\n// Or configures using the `DATALEON_API_KEY` and `DATALEON_BASE_URL` environment variables\nDataleonClient client = DataleonOkHttpClient.fromEnv();\n\nIndividualCreateParams params = IndividualCreateParams.builder()\n    .workspaceId("wk_123")\n    .build();\nIndividual individual = client.individuals().create(params);\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```java\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\n\n// Configures using the `dataleon.apiKey` and `dataleon.baseUrl` system properties\n// Or configures using the `DATALEON_API_KEY` and `DATALEON_BASE_URL` environment variables\nDataleonClient client = DataleonOkHttpClient.fromEnv();\n```\n\nOr manually:\n\n```java\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\n\nDataleonClient client = DataleonOkHttpClient.builder()\n    .apiKey("My API Key")\n    .build();\n```\n\nOr using a combination of the two approaches:\n\n```java\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\n\nDataleonClient client = DataleonOkHttpClient.builder()\n    // Configures using the `dataleon.apiKey` and `dataleon.baseUrl` system properties\n    // Or configures using the `DATALEON_API_KEY` and `DATALEON_BASE_URL` environment variables\n    .fromEnv()\n    .apiKey("My API Key")\n    .build();\n```\n\nSee this table for the available options:\n\n| Setter    | System property    | Environment variable | Required | Default value                               |\n| --------- | ------------------ | -------------------- | -------- | ------------------------------------------- |\n| `apiKey`  | `dataleon.apiKey`  | `DATALEON_API_KEY`   | true     | -                                           |\n| `baseUrl` | `dataleon.baseUrl` | `DATALEON_BASE_URL`  | true     | `"https://inference.eu-west-1.dataleon.ai"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```java\nimport com.dataleon.api.client.DataleonClient;\n\nDataleonClient clientWithOptions = client.withOptions(optionsBuilder -> {\n    optionsBuilder.baseUrl("https://example.com");\n    optionsBuilder.maxRetries(42);\n});\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Dataleon API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Java class.\n\nFor example, `client.individuals().create(...)` should be called with an instance of `IndividualCreateParams`, and it     will return an instance of `Individual`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```java\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport com.dataleon.api.models.individuals.Individual;\nimport com.dataleon.api.models.individuals.IndividualCreateParams;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `dataleon.apiKey` and `dataleon.baseUrl` system properties\n// Or configures using the `DATALEON_API_KEY` and `DATALEON_BASE_URL` environment variables\nDataleonClient client = DataleonOkHttpClient.fromEnv();\n\nIndividualCreateParams params = IndividualCreateParams.builder()\n    .workspaceId("wk_123")\n    .build();\nCompletableFuture<Individual> individual = client.async().individuals().create(params);\n```\n\nOr create an asynchronous client from the beginning:\n\n```java\nimport com.dataleon.api.client.DataleonClientAsync;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClientAsync;\nimport com.dataleon.api.models.individuals.Individual;\nimport com.dataleon.api.models.individuals.IndividualCreateParams;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `dataleon.apiKey` and `dataleon.baseUrl` system properties\n// Or configures using the `DATALEON_API_KEY` and `DATALEON_BASE_URL` environment variables\nDataleonClientAsync client = DataleonOkHttpClientAsync.fromEnv();\n\nIndividualCreateParams params = IndividualCreateParams.builder()\n    .workspaceId("wk_123")\n    .build();\nCompletableFuture<Individual> individual = client.individuals().create(params);\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods return `CompletableFuture`s.\n\n\n\n## File uploads\n\nThe SDK defines methods that accept files.\n\nTo upload a file, pass a [`Path`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Path.html):\n\n```java\nimport com.dataleon.api.models.individuals.documents.DocumentUploadParams;\nimport com.dataleon.api.models.individuals.documents.GenericDocument;\nimport java.nio.file.Paths;\n\nDocumentUploadParams params = DocumentUploadParams.builder()\n    .individualId("individual_id")\n    .documentType(DocumentUploadParams.DocumentType.LIASSE_FISCALE)\n    .file(Paths.get("/path/to/file"))\n    .build();\nGenericDocument genericDocument = client.individuals().documents().upload(params);\n```\n\nOr an arbitrary [`InputStream`](https://docs.oracle.com/javase/8/docs/api/java/io/InputStream.html):\n\n```java\nimport com.dataleon.api.models.individuals.documents.DocumentUploadParams;\nimport com.dataleon.api.models.individuals.documents.GenericDocument;\nimport java.net.URL;\n\nDocumentUploadParams params = DocumentUploadParams.builder()\n    .individualId("individual_id")\n    .documentType(DocumentUploadParams.DocumentType.LIASSE_FISCALE)\n    .file(new URL("https://example.com//path/to/file").openStream())\n    .build();\nGenericDocument genericDocument = client.individuals().documents().upload(params);\n```\n\nOr a `byte[]` array:\n\n```java\nimport com.dataleon.api.models.individuals.documents.DocumentUploadParams;\nimport com.dataleon.api.models.individuals.documents.GenericDocument;\n\nDocumentUploadParams params = DocumentUploadParams.builder()\n    .individualId("individual_id")\n    .documentType(DocumentUploadParams.DocumentType.LIASSE_FISCALE)\n    .file("content".getBytes())\n    .build();\nGenericDocument genericDocument = client.individuals().documents().upload(params);\n```\n\nNote that when passing a non-`Path` its filename is unknown so it will not be included in the request.     To manually set a filename, pass a [`MultipartField`](dataleon-java-core/src/main/kotlin/com/dataleon/api/core/Values.kt):\n\n```java\nimport com.dataleon.api.core.MultipartField;\nimport com.dataleon.api.models.individuals.documents.DocumentUploadParams;\nimport com.dataleon.api.models.individuals.documents.GenericDocument;\nimport java.io.InputStream;\nimport java.net.URL;\n\nDocumentUploadParams params = DocumentUploadParams.builder()\n    .individualId("individual_id")\n    .documentType(DocumentUploadParams.DocumentType.LIASSE_FISCALE)\n    .file(MultipartField.<InputStream>builder()\n        .value(new URL("https://example.com//path/to/file").openStream())\n        .filename("/path/to/file")\n        .build())\n    .build();\nGenericDocument genericDocument = client.individuals().documents().upload(params);\n```\n\n\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Java classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```java\nimport com.dataleon.api.core.http.Headers;\nimport com.dataleon.api.core.http.HttpResponseFor;\nimport com.dataleon.api.models.individuals.Individual;\nimport com.dataleon.api.models.individuals.IndividualCreateParams;\n\nIndividualCreateParams params = IndividualCreateParams.builder()\n    .workspaceId("wk_123")\n    .build();\nHttpResponseFor<Individual> individual = client.individuals().withRawResponse().create(params);\n\nint statusCode = individual.statusCode();\nHeaders headers = individual.headers();\n```\n\nYou can still deserialize the response into an instance of a Java class if needed:\n\n```java\nimport com.dataleon.api.models.individuals.Individual;\n\nIndividual parsedIndividual = individual.parse();\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`DataleonServiceException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/DataleonServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/UnexpectedStatusCodeException.kt) |\n\n- [`DataleonIoException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/DataleonIoException.kt): I/O networking errors.\n\n- [`DataleonRetryableException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/DataleonRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`DataleonInvalidDataException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/DataleonInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`DataleonException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/DataleonException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n\n\n## Logging\n\nThe SDK uses the standard   [OkHttp logging interceptor](https://github.com/square/okhttp/tree/master/okhttp-logging-interceptor).\n\nEnable logging by setting the `DATALEON_LOG` environment variable to   `info`:\n\n```sh\nexport DATALEON_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport DATALEON_LOG=debug\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `dataleon-java-core` is published with a     [configuration file](dataleon-java-core/src/main/resources/META-INF/proguard/dataleon-java-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`DataleonOkHttpClient`](dataleon-java-client-okhttp/src/main/kotlin/com/dataleon/api/client/okhttp/DataleonOkHttpClient.kt) or     [`DataleonOkHttpClientAsync`](dataleon-java-client-okhttp/src/main/kotlin/com/dataleon/api/client/okhttp/DataleonOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```java\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\n\nDataleonClient client = DataleonOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build();\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```java\nimport com.dataleon.api.models.individuals.Individual;\n\nIndividual individual = client.individuals().create(\n  params, RequestOptions.builder().timeout(Duration.ofSeconds(30)).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport java.time.Duration;\n\nDataleonClient client = DataleonOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build();\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```java\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport java.net.InetSocketAddress;\nimport java.net.Proxy;\n\nDataleonClient client = DataleonOkHttpClient.builder()\n    .fromEnv()\n    .proxy(new Proxy(\n      Proxy.Type.HTTP, new InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build();\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```java\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\nimport java.time.Duration;\n\nDataleonClient client = DataleonOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build();\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```java\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\n\nDataleonClient client = DataleonOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build();\n```\n\n\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `dataleon-java-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`DataleonClient`](dataleon-java-core/src/main/kotlin/com/dataleon/api/client/DataleonClient.kt), [`DataleonClientAsync`](dataleon-java-core/src/main/kotlin/com/dataleon/api/client/DataleonClientAsync.kt),             [`DataleonClientImpl`](dataleon-java-core/src/main/kotlin/com/dataleon/api/client/DataleonClientImpl.kt), and [`DataleonClientAsyncImpl`](dataleon-java-core/src/main/kotlin/com/dataleon/api/client/DataleonClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `dataleon-java-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`DataleonOkHttpClient`](dataleon-java-client-okhttp/src/main/kotlin/com/dataleon/api/client/okhttp/DataleonOkHttpClient.kt) and [`DataleonOkHttpClientAsync`](dataleon-java-client-okhttp/src/main/kotlin/com/dataleon/api/client/okhttp/DataleonOkHttpClientAsync.kt), which             provide a way to construct [`DataleonClientImpl`](dataleon-java-core/src/main/kotlin/com/dataleon/api/client/DataleonClientImpl.kt) and             [`DataleonClientAsyncImpl`](dataleon-java-core/src/main/kotlin/com/dataleon/api/client/DataleonClientAsyncImpl.kt), respectively, using OkHttp\n- `dataleon-java`\n  - Depends on and exposes the APIs of both `dataleon-java-core` and `dataleon-java-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`dataleon-java` dependency](#installation) with `dataleon-java-core`\n2. Copy `dataleon-java-client-okhttp`\'s [`OkHttpClient`](dataleon-java-client-okhttp/src/main/kotlin/com/dataleon/api/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`DataleonClientImpl`](dataleon-java-core/src/main/kotlin/com/dataleon/api/client/DataleonClientImpl.kt) or [`DataleonClientAsyncImpl`](dataleon-java-core/src/main/kotlin/com/dataleon/api/client/DataleonClientAsyncImpl.kt), similarly to        [`DataleonOkHttpClient`](dataleon-java-client-okhttp/src/main/kotlin/com/dataleon/api/client/okhttp/DataleonOkHttpClient.kt) or [`DataleonOkHttpClientAsync`](dataleon-java-client-okhttp/src/main/kotlin/com/dataleon/api/client/okhttp/DataleonOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`dataleon-java` dependency](#installation) with `dataleon-java-core`\n2. Write a class that implements the [`HttpClient`](dataleon-java-core/src/main/kotlin/com/dataleon/api/core/http/HttpClient.kt) interface\n3. Construct [`DataleonClientImpl`](dataleon-java-core/src/main/kotlin/com/dataleon/api/client/DataleonClientImpl.kt) or [`DataleonClientAsyncImpl`](dataleon-java-core/src/main/kotlin/com/dataleon/api/client/DataleonClientAsyncImpl.kt), similarly to        [`DataleonOkHttpClient`](dataleon-java-client-okhttp/src/main/kotlin/com/dataleon/api/client/okhttp/DataleonOkHttpClient.kt) or [`DataleonOkHttpClientAsync`](dataleon-java-client-okhttp/src/main/kotlin/com/dataleon/api/client/okhttp/DataleonOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```java\nimport com.dataleon.api.core.JsonValue;\nimport com.dataleon.api.models.individuals.IndividualCreateParams;\n\nIndividualCreateParams params = IndividualCreateParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build();\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set undocumented parameters on _nested_ headers, query params, or body classes, call the         `putAdditionalProperty` method on the nested class:\n\n```java\nimport com.dataleon.api.core.JsonValue;\nimport com.dataleon.api.models.individuals.IndividualCreateParams;\n\nIndividualCreateParams params = IndividualCreateParams.builder()\n    .person(IndividualCreateParams.Person.builder()\n        .putAdditionalProperty("secretProperty", JsonValue.from("42"))\n        .build())\n    .build();\n```\n\nThese properties can be accessed on the nested built object later using the         `_additionalProperties()` method.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](dataleon-java-core/src/main/kotlin/com/dataleon/api/core/Values.kt) object to its setter:\n\n```java\nimport com.dataleon.api.core.JsonValue;\nimport com.dataleon.api.models.individuals.IndividualCreateParams;\n\nIndividualCreateParams params = IndividualCreateParams.builder()\n    .workspaceId(JsonValue.from(42))\n    .build();\n```\n\nThe most straightforward way to create a [`JsonValue`](dataleon-java-core/src/main/kotlin/com/dataleon/api/core/Values.kt) is using its       `from(...)` method:\n\n```java\nimport com.dataleon.api.core.JsonValue;\nimport java.util.List;\nimport java.util.Map;\n\n// Create primitive JSON values\nJsonValue nullValue = JsonValue.from(null);\nJsonValue booleanValue = JsonValue.from(true);\nJsonValue numberValue = JsonValue.from(42);\nJsonValue stringValue = JsonValue.from("Hello World!");\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nJsonValue arrayValue = JsonValue.from(List.of(\n  "Hello", "World"\n));\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nJsonValue objectValue = JsonValue.from(Map.of(\n  "a", 1,\n  "b", 2\n));\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nJsonValue complexValue = JsonValue.from(Map.of(\n  "a", List.of(\n    1, 2\n  ),\n  "b", List.of(\n    3, 4\n  )\n));\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](dataleon-java-core/src/main/kotlin/com/dataleon/api/core/Values.kt):\n\n```java\nimport com.dataleon.api.core.JsonMissing;\nimport com.dataleon.api.models.individuals.IndividualCreateParams;\n\nIndividualCreateParams params = IndividualCreateParams.builder()\n    .workspaceId(JsonMissing.of())\n    .build();\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```java\nimport com.dataleon.api.core.JsonValue;\nimport java.util.Map;\n\nMap<String, JsonValue> additionalProperties = client.individuals().create(params)._additionalProperties();\nJsonValue secretPropertyValue = additionalProperties.get("secretProperty");\n\nString result = secretPropertyValue.accept(new JsonValue.Visitor<>() {\n    @Override\n    public String visitNull() {\n        return "It\'s null!";\n    }\n\n    @Override\n    public String visitBoolean(boolean value) {\n        return "It\'s a boolean!";\n    }\n\n    @Override\n    public String visitNumber(Number value) {\n        return "It\'s a number!";\n    }\n\n    // Other methods include `visitMissing`, `visitString`, `visitArray`, and `visitObject`\n    // The default implementation of each unimplemented method delegates to `visitDefault`, which throws by default, but can also be overridden\n});\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```java\nimport com.dataleon.api.core.JsonField;\nimport java.util.Optional;\n\nJsonField<String> workspaceId = client.individuals().create(params)._workspaceId();\n\nif (workspaceId.isMissing()) {\n  // The property is absent from the JSON response\n} else if (workspaceId.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  Optional<String> jsonString = workspaceId.asString();\n\n  // Try to deserialize into a custom type\n  MyClass myObject = workspaceId.asUnknown().orElseThrow().convert(MyClass.class);\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`DataleonInvalidDataException`](dataleon-java-core/src/main/kotlin/com/dataleon/api/errors/DataleonInvalidDataException.kt) only if you directly access the property.\n\nIf you would prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```java\nimport com.dataleon.api.models.individuals.Individual;\n\nIndividual individual = client.individuals().create(params).validate();\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```java\nimport com.dataleon.api.models.individuals.Individual;\n\nIndividual individual = client.individuals().create(\n  params, RequestOptions.builder().responseValidation(true).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.dataleon.api.client.DataleonClient;\nimport com.dataleon.api.client.okhttp.DataleonOkHttpClient;\n\nDataleonClient client = DataleonOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build();\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nJava `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dataleonlabs/dataleon-java/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'php',
    content:
      "# Dataleon PHP API Library\n\nThe Dataleon PHP library provides convenient access to the Dataleon REST API from any PHP 8.1.0+ application.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n```\ncomposer require \"dataleon/dataleon 0.0.1\"\n```\n<!-- x-release-please-end -->\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(apiKey: getenv('DATALEON_API_KEY') ?: 'My API Key');\n\n$individual = $client->individuals->create(workspaceID: 'wk_123');\n\nvar_dump($individual->id);\n```",
  },
  {
    language: 'python',
    content:
      '# Dataleon Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/dataleon.svg?label=pypi%20(stable))](https://pypi.org/project/dataleon/)\n\nThe Dataleon Python library provides convenient access to the Dataleon REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dataleon MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40dataleon%2Fdataleon-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBkYXRhbGVvbi9kYXRhbGVvbi1tY3AiXSwiZW52Ijp7IkRBVEFMRU9OX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40dataleon%2Fdataleon-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40dataleon%2Fdataleon-mcp%22%5D%2C%22env%22%3A%7B%22DATALEON_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.dataleon.ai](https://docs.dataleon.ai). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install dataleon\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom dataleon import Dataleon\n\nclient = Dataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\n\nindividual = client.individuals.create(\n    workspace_id="wk_123",\n)\nprint(individual.id)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `DATALEON_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncDataleon` instead of `Dataleon` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom dataleon import AsyncDataleon\n\nclient = AsyncDataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  individual = await client.individuals.create(\n      workspace_id="wk_123",\n  )\n  print(individual.id)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install dataleon[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom dataleon import DefaultAioHttpClient\nfrom dataleon import AsyncDataleon\n\nasync def main() -> None:\n  async with AsyncDataleon(\n    api_key=os.environ.get("DATALEON_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    individual = await client.individuals.create(\n        workspace_id="wk_123",\n    )\n    print(individual.id)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom dataleon import Dataleon\n\nclient = Dataleon()\n\nindividual = client.individuals.create(\n    workspace_id="wk_123",\n    person={},\n)\nprint(individual.person)\n```\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed as `bytes`, or a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance or a tuple of `(filename, contents, media type)`.\n\n```python\nfrom pathlib import Path\nfrom dataleon import Dataleon\n\nclient = Dataleon()\n\nclient.individuals.documents.upload(\n    individual_id="individual_id",\n    document_type="liasse_fiscale",\n    file=Path("/path/to/file"),\n)\n```\n\nThe async client uses the exact same interface. If you pass a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance, the file contents will be read asynchronously automatically.\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `dataleon.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `dataleon.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `dataleon.APIError`.\n\n```python\nimport dataleon\nfrom dataleon import Dataleon\n\nclient = Dataleon()\n\ntry:\n    client.individuals.create(\n        workspace_id="wk_123",\n    )\nexcept dataleon.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept dataleon.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept dataleon.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom dataleon import Dataleon\n\n# Configure the default for all requests:\nclient = Dataleon(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).individuals.create(\n    workspace_id="wk_123",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom dataleon import Dataleon\n\n# Configure the default for all requests:\nclient = Dataleon(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Dataleon(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).individuals.create(\n    workspace_id="wk_123",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `DATALEON_LOG` to `info`.\n\n```shell\n$ export DATALEON_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom dataleon import Dataleon\n\nclient = Dataleon()\nresponse = client.individuals.with_raw_response.create(\n    workspace_id="wk_123",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nindividual = response.parse()  # get the object that `individuals.create()` would have returned\nprint(individual.id)\n```\n\nThese methods return an [`APIResponse`](https://github.com/dataleonlabs/dataleon-python/tree/main/src/dataleon/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/dataleonlabs/dataleon-python/tree/main/src/dataleon/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.individuals.with_streaming_response.create(\n    workspace_id="wk_123",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom dataleon import Dataleon, DefaultHttpxClient\n\nclient = Dataleon(\n    # Or use the `DATALEON_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom dataleon import Dataleon\n\nwith Dataleon() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dataleonlabs/dataleon-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport dataleon\nprint(dataleon.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'ruby',
    content:
      '# Dataleon Ruby API library\n\nThe Dataleon Ruby library provides convenient access to the Dataleon REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/dataleonlabs/dataleon-ruby#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dataleon MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40dataleon%2Fdataleon-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBkYXRhbGVvbi9kYXRhbGVvbi1tY3AiXSwiZW52Ijp7IkRBVEFMRU9OX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40dataleon%2Fdataleon-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40dataleon%2Fdataleon-mcp%22%5D%2C%22env%22%3A%7B%22DATALEON_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/dataleon).\n\nThe REST API documentation can be found on [docs.dataleon.ai](https://docs.dataleon.ai).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "dataleon", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "dataleon"\n\ndataleon = Dataleon::Client.new(\n  api_key: ENV["DATALEON_API_KEY"] # This is the default and can be omitted\n)\n\nindividual = dataleon.individuals.create(workspace_id: "wk_123")\n\nputs(individual.id)\n```\n\n\n\n\n\n### File uploads\n\nRequest parameters that correspond to file uploads can be passed as raw contents, a [`Pathname`](https://rubyapi.org/3.2/o/pathname) instance, [`StringIO`](https://rubyapi.org/3.2/o/stringio), or more.\n\n```ruby\nrequire "pathname"\n\n# Use `Pathname` to send the filename and/or avoid paging a large file into memory:\ngeneric_document = dataleon.individuals.documents.upload(file: Pathname("/path/to/file"))\n\n# Alternatively, pass file contents or a `StringIO` directly:\ngeneric_document = dataleon.individuals.documents.upload(file: File.read("/path/to/file"))\n\n# Or, to control the filename and/or content type:\nfile = Dataleon::FilePart.new(File.read("/path/to/file"), filename: "/path/to/file", content_type: "…")\ngeneric_document = dataleon.individuals.documents.upload(file: file)\n\nputs(generic_document.id)\n```\n\nNote that you can also pass a raw `IO` descriptor, but this disables retries, as the library can\'t be sure if the descriptor is a file or pipe (which cannot be rewound).\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `Dataleon::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  individual = dataleon.individuals.create(workspace_id: "wk_123")\nrescue Dataleon::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue Dataleon::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue Dataleon::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\ndataleon = Dataleon::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\ndataleon.individuals.create(workspace_id: "wk_123", request_options: {max_retries: 5})\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\ndataleon = Dataleon::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\ndataleon.individuals.create(workspace_id: "wk_123", request_options: {timeout: 5})\n```\n\nOn timeout, `Dataleon::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `Dataleon::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\nindividual =\n  dataleon.individuals.create(\n    workspace_id: "wk_123",\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(individual[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `Dataleon::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `Dataleon::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\ndataleon.individuals.create(workspace_id: "wk_123")\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\ndataleon.individuals.create(workspace_id: "wk_123")\n\n# You can also splat a full Params class:\nparams = Dataleon::IndividualCreateParams.new(workspace_id: "wk_123")\ndataleon.individuals.create(**params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :VOID\nputs(Dataleon::IndividualListParams::State::VOID)\n\n# Revealed type: `T.all(Dataleon::IndividualListParams::State, Symbol)`\nT.reveal_type(Dataleon::IndividualListParams::State::VOID)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\n# Using the enum constants preserves the tagged type information:\ndataleon.individuals.list(\n  state: Dataleon::IndividualListParams::State::VOID,\n  # …\n)\n\n# Literal values are also permissible:\ndataleon.individuals.list(\n  state: :VOID,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/dataleonlabs/dataleon-ruby/tree/main/CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Dataleon TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@dataleon/dataleon.svg?label=npm%20(stable))](https://npmjs.org/package/@dataleon/dataleon) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@dataleon/dataleon)\n\nThis library provides convenient access to the Dataleon REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.dataleon.ai](https://docs.dataleon.ai). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dataleon MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40dataleon%2Fdataleon-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBkYXRhbGVvbi9kYXRhbGVvbi1tY3AiXSwiZW52Ijp7IkRBVEFMRU9OX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40dataleon%2Fdataleon-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40dataleon%2Fdataleon-mcp%22%5D%2C%22env%22%3A%7B%22DATALEON_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @dataleon/dataleon\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst individual = await client.individuals.create({ workspace_id: 'wk_123' });\n\nconsole.log(individual.id);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  apiKey: process.env['DATALEON_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Dataleon.IndividualCreateParams = { workspace_id: 'wk_123' };\nconst individual: Dataleon.Individual = await client.individuals.create(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed in many different forms:\n- `File` (or an object with the same structure)\n- a `fetch` `Response` (or an object with the same structure)\n- an `fs.ReadStream`\n- the return value of our `toFile` helper\n\n```ts\nimport fs from 'fs';\nimport Dataleon, { toFile } from '@dataleon/dataleon';\n\nconst client = new Dataleon();\n\n// If you have access to Node `fs` we recommend using `fs.createReadStream()`:\nawait client.individuals.documents.upload('individual_id', {\n  document_type: 'liasse_fiscale',\n  file: fs.createReadStream('/path/to/file'),\n});\n\n// Or if you have the web `File` API you can pass a `File` instance:\nawait client.individuals.documents.upload('individual_id', {\n  document_type: 'liasse_fiscale',\n  file: new File(['my bytes'], 'file'),\n});\n\n// You can also pass a `fetch` `Response`:\nawait client.individuals.documents.upload('individual_id', {\n  document_type: 'liasse_fiscale',\n  file: await fetch('https://somesite/file'),\n});\n\n// Finally, if none of the above are convenient, you can use our `toFile` helper:\nawait client.individuals.documents.upload('individual_id', {\n  document_type: 'liasse_fiscale',\n  file: await toFile(Buffer.from('my bytes'), 'file'),\n});\nawait client.individuals.documents.upload('individual_id', {\n  document_type: 'liasse_fiscale',\n  file: await toFile(new Uint8Array([0, 1, 2]), 'file'),\n});\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst individual = await client.individuals\n  .create({ workspace_id: 'wk_123' })\n  .catch(async (err) => {\n    if (err instanceof Dataleon.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Dataleon({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.individuals.create({ workspace_id: 'wk_123' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Dataleon({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.individuals.create({ workspace_id: 'wk_123' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Dataleon();\n\nconst response = await client.individuals.create({ workspace_id: 'wk_123' }).asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: individual, response: raw } = await client.individuals\n  .create({ workspace_id: 'wk_123' })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(individual.id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `DATALEON_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Dataleon from '@dataleon/dataleon';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Dataleon({\n  logger: logger.child({ name: 'Dataleon' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.individuals.create({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Dataleon from '@dataleon/dataleon';\nimport fetch from 'my-fetch';\n\nconst client = new Dataleon({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Dataleon from '@dataleon/dataleon';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Dataleon({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Dataleon from '@dataleon/dataleon';\n\nconst client = new Dataleon({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Dataleon from 'npm:@dataleon/dataleon';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Dataleon({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dataleonlabs/dataleon-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
