// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as DocumentsAPI from './documents';
import { DocumentResponse, DocumentUploadParams, Documents, GenericDocument, Kbis } from './documents';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Individuals extends APIResource {
  documents: DocumentsAPI.Documents = new DocumentsAPI.Documents(this._client);

  /**
   * Create a new individual
   *
   * @example
   * ```ts
   * const individual = await client.individuals.create({
   *   workspace_id: 'wk_123',
   * });
   * ```
   */
  create(body: IndividualCreateParams, options?: RequestOptions): APIPromise<Individual> {
    return this._client.post('/individuals', { body, ...options });
  }

  /**
   * Get an individual by ID
   *
   * @example
   * ```ts
   * const individual = await client.individuals.retrieve(
   *   'individual_id',
   * );
   * ```
   */
  retrieve(
    individualID: string,
    query: IndividualRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Individual> {
    return this._client.get(path`/individuals/${individualID}`, { query, ...options });
  }

  /**
   * Update an individual by ID
   *
   * @example
   * ```ts
   * const individual = await client.individuals.update(
   *   'individual_id',
   *   { workspace_id: 'wk_123' },
   * );
   * ```
   */
  update(
    individualID: string,
    body: IndividualUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Individual> {
    return this._client.put(path`/individuals/${individualID}`, { body, ...options });
  }

  /**
   * Get all individuals
   *
   * @example
   * ```ts
   * const individuals = await client.individuals.list();
   * ```
   */
  list(
    query: IndividualListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<IndividualListResponse> {
    return this._client.get('/individuals', { query, ...options });
  }

  /**
   * Delete an individual by ID
   *
   * @example
   * ```ts
   * await client.individuals.delete('individual_id');
   * ```
   */
  delete(individualID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/individuals/${individualID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Represents a single individual record, including identification, status, and
 * associated metadata.
 */
export interface Individual {
  /**
   * Unique identifier of the individual.
   */
  id?: string;

  /**
   * List of AML (Anti-Money Laundering) suspicion entries linked to the individual.
   */
  aml_suspicions?: Array<Individual.AmlSuspicion>;

  /**
   * URL to authenticate the individual, usually for document signing or onboarding.
   */
  auth_url?: string;

  /**
   * Digital certificate associated with the individual, if any.
   */
  certificat?: Individual.Certificat;

  /**
   * List of verification or validation checks applied to the individual.
   */
  checks?: Array<Shared.Check>;

  /**
   * Timestamp of the individual's creation in ISO 8601 format.
   */
  created_at?: string;

  /**
   * All documents submitted or associated with the individual.
   */
  documents?: Array<DocumentsAPI.GenericDocument>;

  /**
   * Reference to the individual's identity document.
   */
  identity_card?: Individual.IdentityCard;

  /**
   * Internal sequential number or reference for the individual.
   */
  number?: number;

  /**
   * Personal details of the individual, such as name, date of birth, and contact
   * info.
   */
  person?: Individual.Person;

  /**
   * Admin or internal portal URL for viewing the individual's details.
   */
  portal_url?: string;

  /**
   * Custom key-value metadata fields associated with the individual.
   */
  properties?: Array<Individual.Property>;

  /**
   * Risk assessment associated with the individual.
   */
  risk?: Individual.Risk;

  /**
   * Optional identifier indicating the source of the individual record.
   */
  source_id?: string;

  /**
   * Current operational state in the workflow (e.g., WAITING, IN_PROGRESS,
   * COMPLETED).
   */
  state?: string;

  /**
   * Overall processing status of the individual (e.g., rejected, need_review,
   * approved).
   */
  status?: string;

  /**
   * List of tags assigned to the individual for categorization or metadata purposes.
   */
  tags?: Array<Individual.Tag>;

  /**
   * Technical metadata related to the request (e.g., QR code settings, language).
   */
  technical_data?: Individual.TechnicalData;

  /**
   * Public-facing webview URL for the individual’s identification process.
   */
  webview_url?: string;

  /**
   * Identifier of the workspace to which the individual belongs.
   */
  workspace_id?: string;
}

export namespace Individual {
  /**
   * Represents a record of suspicion raised during Anti-Money Laundering (AML)
   * screening. Includes metadata such as risk score, origin, and linked watchlist
   * types.
   */
  export interface AmlSuspicion {
    /**
     * Human-readable description or title for the suspicious finding.
     */
    caption?: string;

    /**
     * Indicates whether this suspicion has been manually reviewed or confirmed.
     */
    checked?: boolean;

    /**
     * Nature of the relationship between the entity and the suspicious activity (e.g.,
     * "linked", "associated").
     */
    relation?: string;

    /**
     * Version of the evaluation schema or rule engine used.
     */
    schema?: string;

    /**
     * Risk score between 0.0 and 1.0 indicating the severity of the suspicion.
     */
    score?: number;

    /**
     * URL identifying the source system or service providing this suspicion.
     */
    source?: string;

    /**
     * Watchlist category associated with the suspicion. Possible values include
     * Watchlist types like "PEP", "Sanctions", "RiskyEntity", or "Crime".
     */
    type?: 'Watchlist' | 'PEP' | 'Sanctions' | 'RiskyEntity' | 'Crime';
  }

  /**
   * Digital certificate associated with the individual, if any.
   */
  export interface Certificat {
    /**
     * Unique identifier for the certificate.
     */
    id?: string;

    /**
     * Timestamp when the certificate was created.
     */
    created_at?: string;

    /**
     * Name of the certificate file.
     */
    filename?: string;
  }

  /**
   * Reference to the individual's identity document.
   */
  export interface IdentityCard {
    /**
     * Unique identifier for the document.
     */
    id?: string;

    /**
     * Signed URL linking to the back image of the document.
     */
    back_document_signed_url?: string;

    /**
     * Place of birth as indicated on the document.
     */
    birth_place?: string;

    /**
     * Date of birth in DD/MM/YYYY format as shown on the document.
     */
    birthday?: string;

    /**
     * Country code issuing the document (ISO 3166-1 alpha-2).
     */
    country?: string;

    /**
     * Expiration date of the document, in YYYY-MM-DD format.
     */
    expiration_date?: string;

    /**
     * First name as shown on the document.
     */
    first_name?: string;

    /**
     * Signed URL linking to the front image of the document.
     */
    front_document_signed_url?: string;

    /**
     * Gender indicated on the document (e.g., "M" or "F").
     */
    gender?: string;

    /**
     * Date when the document was issued, in YYYY-MM-DD format.
     */
    issue_date?: string;

    /**
     * Last name as shown on the document.
     */
    last_name?: string;

    /**
     * First line of the Machine Readable Zone (MRZ) on the document.
     */
    mrz_line_1?: string;

    /**
     * Second line of the MRZ on the document.
     */
    mrz_line_2?: string;

    /**
     * Third line of the MRZ if applicable; otherwise null.
     */
    mrz_line_3?: string | null;

    /**
     * Type of document (e.g., passport, identity card).
     */
    type?: string;
  }

  /**
   * Personal details of the individual, such as name, date of birth, and contact
   * info.
   */
  export interface Person {
    /**
     * Date of birth, formatted as DD/MM/YYYY.
     */
    birthday?: string;

    /**
     * Email address of the individual.
     */
    email?: string;

    /**
     * Signed URL linking to the person’s face image.
     */
    face_image_signed_url?: string;

    /**
     * First (given) name of the person.
     */
    first_name?: string;

    /**
     * Full name of the person, typically concatenation of first and last names.
     */
    full_name?: string;

    /**
     * Gender of the individual (e.g., "M" for male, "F" for female).
     */
    gender?: string;

    /**
     * Last (family) name of the person.
     */
    last_name?: string;

    /**
     * Maiden name of the person, if applicable.
     */
    maiden_name?: string;

    /**
     * Contact phone number including country code.
     */
    phone_number?: string;
  }

  /**
   * Represents a generic property key-value pair with a specified type.
   */
  export interface Property {
    /**
     * Name/key of the property.
     */
    name?: string;

    /**
     * Data type of the property value.
     */
    type?: string;

    /**
     * Value associated with the property name.
     */
    value?: string;
  }

  /**
   * Risk assessment associated with the individual.
   */
  export interface Risk {
    /**
     * Risk category or code identifier.
     */
    code?: string;

    /**
     * Explanation or justification for the assigned risk.
     */
    reason?: string;

    /**
     * Numeric risk score between 0.0 and 1.0 indicating severity or confidence.
     */
    score?: number;
  }

  /**
   * Represents a key-value metadata tag that can be associated with entities such as
   * individuals or companies.
   */
  export interface Tag {
    /**
     * Name of the tag used to identify the metadata field.
     */
    key?: string;

    /**
     * Indicates whether the tag is private (not visible to external users).
     */
    private?: boolean;

    /**
     * Data type of the tag value (e.g., "string", "number", "boolean").
     */
    type?: string;

    /**
     * Value assigned to the tag.
     */
    value?: string;
  }

  /**
   * Technical metadata related to the request (e.g., QR code settings, language).
   */
  export interface TechnicalData {
    /**
     * Version number of the API used.
     */
    api_version?: number;

    /**
     * Timestamp when the request or process was approved.
     */
    approved_at?: string;

    /**
     * URL to receive callback data from the AML system.
     */
    callback_url?: string;

    /**
     * URL to receive notification updates about the processing status.
     */
    callback_url_notification?: string;

    /**
     * Flag to indicate if notifications are disabled.
     */
    disable_notification?: boolean;

    /**
     * Timestamp when notifications were disabled; null if never disabled.
     */
    disable_notification_date?: string | null;

    /**
     * Export format defined by the API (e.g., "json", "xml").
     */
    export_type?: string;

    /**
     * Timestamp when the process finished.
     */
    finished_at?: string;

    /**
     * IP address of the our system handling the request.
     */
    ip?: string;

    /**
     * Language preference used in the client workspace (e.g., "fra").
     */
    language?: string;

    /**
     * IP address of the end client (final user) captured.
     */
    location_ip?: string;

    /**
     * Timestamp indicating when the request or process needs review; null if none.
     */
    need_review_at?: string | null;

    /**
     * Flag indicating if notification confirmation is required or received.
     */
    notification_confirmation?: boolean;

    /**
     * Indicates whether QR code is enabled ("true" or "false").
     */
    qr_code?: string;

    /**
     * Flag indicating whether to include raw data in the response.
     */
    raw_data?: boolean;

    /**
     * Timestamp when the request or process was rejected; null if not rejected.
     */
    rejected_at?: string | null;

    /**
     * Duration of the user session in seconds.
     */
    session_duration?: number;

    /**
     * Timestamp when the process started.
     */
    started_at?: string;

    /**
     * Date/time of data transfer.
     */
    transfer_at?: string;

    /**
     * Mode of data transfer.
     */
    transfer_mode?: string;
  }
}

export type IndividualListResponse = Array<Individual>;

export interface IndividualCreateParams {
  /**
   * Unique identifier of the workspace where the individual is being registered.
   */
  workspace_id: string;

  /**
   * Personal information about the individual.
   */
  person?: IndividualCreateParams.Person;

  /**
   * Optional identifier for tracking the source system or integration from your
   * system.
   */
  source_id?: string;

  /**
   * Technical metadata related to the request or processing.
   */
  technical_data?: IndividualCreateParams.TechnicalData;
}

export namespace IndividualCreateParams {
  /**
   * Personal information about the individual.
   */
  export interface Person {
    /**
     * Date of birth in DD/MM/YYYY format.
     */
    birthday?: string;

    /**
     * Email address of the individual.
     */
    email?: string;

    /**
     * First name of the individual.
     */
    first_name?: string;

    /**
     * Gender of the individual (M for male, F for female).
     */
    gender?: 'M' | 'F';

    /**
     * Last name (family name) of the individual.
     */
    last_name?: string;

    /**
     * Maiden name, if applicable.
     */
    maiden_name?: string;

    /**
     * Phone number of the individual.
     */
    phone_number?: string;
  }

  /**
   * Technical metadata related to the request or processing.
   */
  export interface TechnicalData {
    /**
     * URL to call back upon completion of processing.
     */
    callback_url?: string;

    /**
     * URL for receive notifications about the processing state or status.
     */
    callback_url_notification?: string;

    /**
     * Preferred language for communication (e.g., "eng", "fra").
     */
    language?: string;

    /**
     * Flag indicating whether to include raw data in the response.
     */
    raw_data?: boolean;
  }
}

export interface IndividualRetrieveParams {
  /**
   * Include document information
   */
  document?: boolean;

  /**
   * Scope filter (id or scope)
   */
  scope?: string;
}

export interface IndividualUpdateParams {
  /**
   * Unique identifier of the workspace where the individual is being registered.
   */
  workspace_id: string;

  /**
   * Personal information about the individual.
   */
  person?: IndividualUpdateParams.Person;

  /**
   * Optional identifier for tracking the source system or integration from your
   * system.
   */
  source_id?: string;

  /**
   * Technical metadata related to the request or processing.
   */
  technical_data?: IndividualUpdateParams.TechnicalData;
}

export namespace IndividualUpdateParams {
  /**
   * Personal information about the individual.
   */
  export interface Person {
    /**
     * Date of birth in DD/MM/YYYY format.
     */
    birthday?: string;

    /**
     * Email address of the individual.
     */
    email?: string;

    /**
     * First name of the individual.
     */
    first_name?: string;

    /**
     * Gender of the individual (M for male, F for female).
     */
    gender?: 'M' | 'F';

    /**
     * Last name (family name) of the individual.
     */
    last_name?: string;

    /**
     * Maiden name, if applicable.
     */
    maiden_name?: string;

    /**
     * Phone number of the individual.
     */
    phone_number?: string;
  }

  /**
   * Technical metadata related to the request or processing.
   */
  export interface TechnicalData {
    /**
     * URL to call back upon completion of processing.
     */
    callback_url?: string;

    /**
     * URL for receive notifications about the processing state or status.
     */
    callback_url_notification?: string;

    /**
     * Preferred language for communication (e.g., "eng", "fra").
     */
    language?: string;

    /**
     * Flag indicating whether to include raw data in the response.
     */
    raw_data?: boolean;
  }
}

export interface IndividualListParams {
  /**
   * Filter individuals created before this date (format YYYY-MM-DD)
   */
  end_date?: string;

  /**
   * Number of results to return (between 1 and 100)
   */
  limit?: number;

  /**
   * Number of results to offset (must be ≥ 0)
   */
  offset?: number;

  /**
   * Filter by source ID
   */
  source_id?: string;

  /**
   * Filter individuals created after this date (format YYYY-MM-DD)
   */
  start_date?: string;

  /**
   * Filter by individual status (must be one of the allowed values)
   */
  state?:
    | 'VOID'
    | 'WAITING'
    | 'STARTED'
    | 'RUNNING'
    | 'PROCESSED'
    | 'FAILED'
    | 'ABORTED'
    | 'EXPIRED'
    | 'DELETED';

  /**
   * Filter by individual status (must be one of the allowed values)
   */
  status?: 'rejected' | 'need_review' | 'approved';

  /**
   * Filter by workspace ID
   */
  workspace_id?: string;
}

Individuals.Documents = Documents;

export declare namespace Individuals {
  export {
    type Individual as Individual,
    type IndividualListResponse as IndividualListResponse,
    type IndividualCreateParams as IndividualCreateParams,
    type IndividualRetrieveParams as IndividualRetrieveParams,
    type IndividualUpdateParams as IndividualUpdateParams,
    type IndividualListParams as IndividualListParams,
  };

  export {
    Documents as Documents,
    type DocumentResponse as DocumentResponse,
    type GenericDocument as GenericDocument,
    type Kbis as Kbis,
    type DocumentUploadParams as DocumentUploadParams,
  };
}
