// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

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
    fuzzy: 0.2,
    boost: {
      name: 3,
      endpoint: 2,
      summary: 2,
      qualified: 2,
      content: 1,
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
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  // Note: Language is accepted for interface consistency with remote search, but currently has no
  // effect since this local search only supports TypeScript docs.
  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex.search(query).map((hit) => ({ ...hit, _kind: 'prose' as const }));
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
          fullResults.push({
            method: m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
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
          this.indexProse(content, file.name);
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
